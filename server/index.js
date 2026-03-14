import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import { Resend } from 'resend';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, '..', 'dist');
const app = express();
const isProd = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || (isProd ? 8080 : 3001);

const FROM_EMAIL = process.env.CONSULTANCY_FROM_EMAIL || 'Sanset <onboarding@resend.dev>';
const TO_EMAIL = process.env.CONSULTANCY_TO_EMAIL || 'contato@sanset.io';

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

if (existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server → http://localhost:${PORT}`);
});
