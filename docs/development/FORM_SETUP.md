# Configuração do Formulário de Contato

O formulário de contato está implementado com validação completa e feedback visual. Atualmente está configurado para usar **Formspree**, mas pode ser facilmente adaptado para outras soluções.

## Opções de Backend

### 1. Formspree (Atual - Recomendado para começar)

- **Gratuito**: Até 50 envios/mês
- **Setup**: Criar conta em <https://formspree.io>
- **Configuração**: Substituir `YOUR_FORM_ID` em `pages/Contact.tsx` pelo ID do seu formulário

```typescript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  // ...
});
```

### 2. EmailJS

- **Gratuito**: Até 200 envios/mês
- **Setup**:
  1. Criar conta em <https://www.emailjs.com>
  2. Configurar serviço de email (Gmail, Outlook, etc)
  3. Instalar: `npm install @emailjs/browser`
  4. Substituir lógica de envio

### 3. SendGrid / Mailgun

- **Pago**: Mais robusto para produção
- Requer backend próprio ou serverless function

### 4. Google Forms (Alternativa simples)

- Usar Google Forms e embed via iframe
- Menos controle visual, mas zero configuração

## Funcionalidades Implementadas

✅ **Validação de campos**

- Nome obrigatório
- Email obrigatório e validação de formato
- Empresa obrigatória
- Mensagem opcional

✅ **Feedback visual**

- Estados de erro por campo
- Loading state durante envio
- Mensagem de sucesso
- Mensagem de erro

✅ **Acessibilidade**

- ARIA labels
- Validação HTML5
- Navegação por teclado
- Screen reader friendly

## Próximos Passos

1. Escolher solução de backend
2. Configurar credenciais/IDs
3. Testar envio de formulário
4. Configurar notificações de email
5. (Opcional) Adicionar analytics para tracking de conversões
