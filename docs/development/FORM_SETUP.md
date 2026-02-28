<!-- markdownlint-disable -->
# Configuração do Formulário de Consulta Inicial

O formulário de agendamento de consulta inicial envia os dados para a API interna (`POST /api/consultancy`), que usa **Resend** para enviar o email para a equipe.

## Backend: Resend

- **Site**: <https://resend.com>
- **Dashboard / API Keys**: <https://resend.com/api-keys>
- O email é enviado para `contato@sanset.io` (configurável via `CONSULTANCY_TO_EMAIL`).

### Variáveis de ambiente

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `RESEND_API_KEY` | Sim | API key do Resend (criar em resend.com/api-keys). |
| `CONSULTANCY_FROM_EMAIL` | Não | Remetente. Padrão: `Sanset <onboarding@resend.dev>` (domínio de teste do Resend). Em produção, use um email do seu domínio verificado (ex.: `consultoria@sanset.io`). |
| `CONSULTANCY_TO_EMAIL` | Não | Destinatário. Padrão: `contato@sanset.io`. Em modo de teste do Resend (sem domínio verificado), só é possível enviar para o email da sua conta. |

### Desenvolvimento local

1. Crie uma conta em [Resend](https://resend.com) e gere uma API key.
2. Crie um arquivo `.env` na raiz do projeto (não versionado):

   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxx
   ```
   O destinatário padrão é `contato@sanset.io`; para outro email, defina `CONSULTANCY_TO_EMAIL`.

3. Suba frontend e API de uma vez (recomendado):

   ```bash
   npm run dev:all
   ```

   Ou em dois terminais: `npm run dev:server` (porta 3001) e `npm run dev` (porta 3000).

O Vite faz proxy de `/api` para `http://localhost:3001`, então o formulário envia para a API local.

### Produção (Cloud Run)

Defina no serviço do Cloud Run:

- **Variáveis de ambiente**: `RESEND_API_KEY` (e, se quiser, `CONSULTANCY_FROM_EMAIL`, `CONSULTANCY_TO_EMAIL`).
- Preferir **Secret Manager** para `RESEND_API_KEY` em vez de variável de ambiente em texto.

Domínio Resend: para enviar de um email próprio (ex.: `consultoria@sanset.io`), verifique o domínio em [Resend Domains](https://resend.com/domains) e use esse endereço em `CONSULTANCY_FROM_EMAIL`.

## Funcionalidades do formulário

- Validação: nome, email e empresa obrigatórios; email válido.
- Estados de loading, sucesso e erro com mensagem do servidor.
- Acessibilidade: ARIA, validação HTML5, navegação por teclado.

## Fluxo técnico

1. Frontend (`pages/Contact.tsx`) envia `POST /api/consultancy` com JSON: `name`, `email`, `company`, `interest`, `message`.
2. Servidor (`server/index.js`) valida o body, monta o email em HTML e chama `resend.emails.send()`.
3. O destinatário recebe o email e o `reply-to` é o email do lead para resposta direta.
