# Checklist de Implementação - Sanset

## 🔴 Crítico (Bloqueia funcionalidades principais)

### 1. Formulário de Contato ✅

- [x] **Backend/API para envio de formulário**
  - Implementado com Formspree (ver [FORM_SETUP.md](./FORM_SETUP.md) para configuração)
  - Fácil adaptação para EmailJS, SendGrid ou API customizada
- [x] **Validação de campos do formulário**
  - Validação de email com regex
  - Campos obrigatórios (Nome, Email, Empresa)
  - Feedback visual de erros por campo
- [x] **Loading state durante envio**
  - Spinner e texto "Enviando..." durante envio
  - Botão desabilitado durante envio
- [x] **Mensagem de sucesso/erro**
  - Mensagens de sucesso/erro com feedback visual
  - Auto-dismiss após 5 segundos
  - **⚠️ Ação necessária**: Configurar Formspree ID em `pages/Contact.tsx` linha 76

### 2. Menu Mobile Hamburger ✅

- [x] **Funcionalidade do botão hamburger**
  - Menu dropdown funcional com overlay
  - Estado de abertura/fechamento implementado
  - Fecha automaticamente ao navegar
  - Previne scroll do body quando aberto
  - Ícone muda entre menu/close

### 3. Arquivo CSS Referenciado ✅

- [x] **Removida referência ao `/index.css`**
  - Referência removida de `index.html`
  - Estilos já estão inline no HTML

## 🟡 Importante (Melhora UX/SEO)

### 4. SEO e Meta Tags ✅

- [x] **Título do HTML atualizado**
  - Agora: "Sanset | Consultoria em Inteligência Agêntica para Startups"
- [x] **Meta description**
  - Adicionada description otimizada
- [x] **Open Graph tags** (og:title, og:description, og:image, og:url)
- [x] **Twitter Card tags** (twitter:card, twitter:title, etc)
- [ ] **Favicon** (ícone do site) - Referência adicionada, arquivo precisa ser criado

### 5. Links e Navegação ✅

- [x] **Links do Footer atualizados**
  - "Privacidade" e "Compliance" agora apontam para `/privacidade` e `/compliance`
  - **⚠️ Ação necessária**: Criar páginas ou configurar redirects
- [x] **Email clicável no footer**
  - `contato@sanset.io` agora é link `mailto:`
  - Email na página de contato também é clicável
- [ ] **Scroll to top button**
  - Botão para voltar ao topo em páginas longas (nice to have)

### 6. Acessibilidade ✅

- [x] **ARIA labels** em botões principais e elementos interativos
- [x] **Keyboard navigation** - Navegação por teclado funcional
- [x] **Focus states** visíveis - Ring de foco adicionado nos botões
- [x] **ARIA labels em imagens** - Imagens dos cases têm role="img" e aria-label
- [x] **Validação de formulário acessível** - aria-required, aria-invalid, aria-describedby
- [ ] **Contraste de cores** - Verificar WCAG (recomendado teste com ferramenta)

### 7. Tratamento de Erros

- [ ] **Error boundaries** (React)
- [ ] **Página 404** customizada
- [ ] **Tratamento de erros de rede** (se houver API calls)

## 🟢 Melhorias (Nice to have)

### 8. Analytics e Tracking

- [ ] **Google Analytics** ou similar
- [ ] **Event tracking** (cliques em CTAs, envio de formulário)
- [ ] **Heatmaps** (opcional - Hotjar, etc)

### 9. Performance

- [ ] **Lazy loading** de imagens
- [ ] **Code splitting** (React.lazy para páginas)
- [ ] **Otimização de imagens** (WebP, compressão)
- [ ] **Service Worker** para PWA (opcional)

### 10. Animações e Transições

- [ ] **Page transitions** suaves entre rotas
- [ ] **Scroll animations** (fade-in, slide-in)
- [ ] **Loading skeletons** (se houver carregamento de dados)

### 11. Internacionalização (i18n)

- [ ] **Suporte a múltiplos idiomas** (se necessário)
- [ ] **Detecção de idioma do navegador**

### 12. Testes

- [ ] **Testes unitários** (Jest, Vitest)
- [ ] **Testes E2E** (Playwright, Cypress)
- [ ] **Testes de acessibilidade** (axe-core)

### 13. Documentação

- [ ] **README atualizado** com instruções de setup
- [ ] **Documentação de componentes**
- [ ] **Guia de contribuição** (se open source)

### 14. Integrações

- [ ] **CRM integration** (se necessário para leads)
- [ ] **Email marketing** (Mailchimp, SendGrid)
- [ ] **Calendar integration** (Calendly, Google Calendar)

## 📝 Notas Técnicas

### Arquivos que precisam de atenção

1. `pages/Contact.tsx` - Formulário sem backend
2. `components/Layout.tsx` - Menu mobile não funcional
3. `index.html` - Título desatualizado, CSS faltando
4. `components/Layout.tsx` - Links do footer com `#`

### Dependências que podem ser adicionadas

- Formulário: `react-hook-form`, `zod` (validação)
- Notificações: `react-hot-toast`, `sonner`
- Animações: `framer-motion` (opcional)
- Analytics: `@vercel/analytics` ou Google Analytics
