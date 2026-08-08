import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import { randomUUID } from 'crypto';
import { Resend } from 'resend';
import { Storage } from '@google-cloud/storage';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, '..', 'dist');
const app = express();
const isProd = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || (isProd ? 8080 : 3001);

const FROM_EMAIL = process.env.CONSULTANCY_FROM_EMAIL || 'Sanset <onboarding@resend.dev>';
const TO_EMAIL = process.env.CONSULTANCY_TO_EMAIL || 'contato@sanset.io';

const GCS_BUCKET_NAME = process.env.GCS_BUCKET_NAME || '';
const GCS_RESEARCH_CSV = process.env.GCS_RESEARCH_CSV || 'research/responses.csv';
const GCS_RESEARCH_EXCEL_CSV = process.env.GCS_RESEARCH_EXCEL_CSV === 'true';

let _storage = null;
function getStorage() {
  if (!_storage) _storage = new Storage();
  return _storage;
}

const RESEARCH_COLUMNS = [
  'id', 'submitted_at',
  'area', 'nivel', 'rotina', 'sistemas', 'atraso', 'eliminar',
  'agente', 'confianca', 'obstaculo',
  'open_answer', 'email',
];

function escapeCsv(value, forceQuote = false) {
  const str = String(value ?? '');
  if (forceQuote || /[",\n\r]/.test(str)) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

function buildCsvRow(fields, forceQuoteAll = false) {
  return RESEARCH_COLUMNS
    .map((col) => escapeCsv(fields[col], forceQuoteAll))
    .join(',');
}

async function appendCsvRow(bucketName, filePath, rowLine, headerLine, maxRetries = 6) {
  const bucket = getStorage().bucket(bucketName);
  const file = bucket.file(filePath);

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const [exists] = await file.exists();
    let existing = '';
    let generation = undefined;

    if (exists) {
      const [metadata] = await file.getMetadata();
      generation = Number(metadata.generation);
      const [buf] = await file.download();
      existing = buf.toString('utf-8');
    }

    let nextContent;
    if (!exists || existing.trim() === '') {
      nextContent = headerLine + '\n' + rowLine + '\n';
    } else {
      const base = existing.endsWith('\n') ? existing : existing + '\n';
      nextContent = base + rowLine + '\n';
    }

    try {
      await file.save(Buffer.from(nextContent, 'utf-8'), {
        contentType: 'text/csv',
        resumable: false,
        preconditionOpts: generation !== undefined ? { ifGenerationMatch: generation } : {},
      });
      return;
    } catch (err) {
      const code = err.code || err.status || err.statusCode;
      if ((code === 412 || code === 304) && attempt < maxRetries - 1) {
        await new Promise((r) => setTimeout(r, 50 * 2 ** attempt));
        continue;
      }
      throw err;
    }
  }
}

app.use(express.json());

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '');
}

app.post('/api/consultancy', async (req, res) => {
  const { type, name, email, company, interest, message } = req.body || {};
  const isMentoria = type === 'mentoria';

  if (!name || !String(name).trim()) {
    return res.status(400).json({ error: 'Nome é obrigatório' });
  }
  if (!email || !String(email).trim()) {
    return res.status(400).json({ error: 'Email é obrigatório' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }
  if (!isMentoria && (!company || !String(company).trim())) {
    return res.status(400).json({ error: 'Empresa é obrigatória' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return res.status(503).json({ error: 'Serviço de email não configurado' });
  }

  const subject = isMentoria
    ? `[Mentoria] Interesse - ${String(name).trim()}`
    : `Nova consulta inicial - ${String(company).trim()}`;
  const html = `
    <h2>${isMentoria ? 'Nova solicitação de mentoria (pessoa física)' : 'Nova solicitação de consulta inicial'}</h2>
    <p><strong>Tipo:</strong> ${isMentoria ? 'Mentoria' : 'Consultoria (empresa)'}</p>
    <p><strong>Nome:</strong> ${escapeHtml(String(name).trim())}</p>
    <p><strong>Email:</strong> ${escapeHtml(String(email).trim())}</p>
    ${isMentoria ? '' : `<p><strong>Empresa:</strong> ${escapeHtml(String(company).trim())}</p>`}
    ${company && String(company).trim() && isMentoria ? `<p><strong>Onde atua:</strong> ${escapeHtml(String(company).trim())}</p>` : ''}
    <p><strong>${isMentoria ? 'Trilha de interesse' : 'Área de interesse'}:</strong> ${escapeHtml(String(interest || '').trim() || '—')}</p>
    <p><strong>Mensagem:</strong></p>
    <p>${escapeHtml(String(message || '').trim() || '(Sem mensagem)')}</p>
  `;

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: String(email).trim(),
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      const isSandbox = error.statusCode === 403 && error.name === 'validation_error';
      const message = isSandbox
        ? 'Em modo de teste o Resend só envia para o email da sua conta. Defina CONSULTANCY_TO_EMAIL no .env (ex.: contato@sanset.io) ou verifique seu domínio em resend.com/domains.'
        : 'Erro ao enviar. Tente novamente.';
      return res.status(502).json({ error: message });
    }

    return res.status(200).json({ ok: true, id: data?.id });
  } catch (err) {
    console.error('Consultancy API error:', err);
    return res.status(500).json({ error: 'Erro ao enviar. Tente novamente.' });
  }
});

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(text).replace(/[&<>"']/g, (c) => map[c]);
}

app.post('/api/research', async (req, res) => {
  try {
    const answers = (req.body && typeof req.body.answers === 'object') ? req.body.answers : {};
    const openAnswer = String((req.body && req.body.openAnswer) || '').trim();
    const email = String((req.body && req.body.email) || '').trim();

    if (email && !validateEmail(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }
    const hasAnyAnswer = Object.keys(answers).length > 0 || openAnswer.length > 0;
    if (!hasAnyAnswer) {
      return res.status(400).json({ error: 'Nenhuma resposta informada' });
    }
    if (!GCS_BUCKET_NAME) {
      console.error('GCS_BUCKET_NAME is not set — cannot save research response');
      return res.status(503).json({ error: 'Armazenamento não configurado' });
    }

    const fields = {
      id: randomUUID(),
      submitted_at: new Date().toISOString(),
      area: answers.area || '',
      nivel: answers.nivel || '',
      rotina: answers.rotina || '',
      sistemas: answers.sistemas || '',
      atraso: answers.atraso || '',
      eliminar: answers.eliminar || '',
      agente: answers.agente || '',
      confianca: answers.confianca || '',
      obstaculo: answers.obstaculo || '',
      open_answer: openAnswer,
      email,
    };

    const rowLine = buildCsvRow(fields, GCS_RESEARCH_EXCEL_CSV);
    const headerLine = buildCsvRow(
      Object.fromEntries(RESEARCH_COLUMNS.map((c) => [c, c])),
      GCS_RESEARCH_EXCEL_CSV,
    );

    await appendCsvRow(GCS_BUCKET_NAME, GCS_RESEARCH_CSV, rowLine, headerLine);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Research API error:', err);
    return res.status(500).json({ error: 'Erro ao salvar resposta. Tente novamente.' });
  }
});

if (existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server → http://localhost:${PORT}`);
});
