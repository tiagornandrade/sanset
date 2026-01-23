<!-- markdownlint-disable -->
# Sanset | Consultoria em Inteligência Agêntica

Site institucional para consultoria especializada em agentes autônomos e inteligência agêntica para startups. Single Page Application moderna construída com React, TypeScript e Vite.

## 🚀 Visão Geral

Sanset oferece consultoria customizada em inteligência agêntica, ajudando startups a transformar suas operações através de agentes autônomos. O site apresenta nossa metodologia, projetos realizados e permite que clientes agendem consultas iniciais.

## 🛠️ Stack Tecnológico

- **Framework**: React 19.2.3
- **Linguagem**: TypeScript 5.8.2
- **Build Tool**: Vite 6.2.0
- **Styling**: Tailwind CSS (via CDN)
- **Roteamento**: Hash-based routing (client-side)
- **Deploy**: Google Cloud Run via GitHub Actions
- **CI/CD**: GitHub Actions com Workload Identity Federation

## 📁 Estrutura do Projeto

```text
sanset/
├── pages/              # Componentes de página
│   ├── Home.tsx        # Página inicial
│   ├── Cases.tsx       # Projetos e case studies
│   ├── Solutions.tsx   # Metodologia
│   ├── Contact.tsx     # Formulário de contato
│   └── CONTEXT.md      # Documentação de padrões
├── components/         # Componentes reutilizáveis
│   ├── Layout.tsx      # Layout principal (nav, footer)
│   └── CONTEXT.md      # Documentação de padrões
├── docs/               # Documentação do projeto
│   ├── deploy/         # Documentação de deploy
│   ├── development/    # Guias de desenvolvimento
│   └── CONTEXT.md      # Documentação de padrões
├── scripts/            # Scripts de automação
│   └── CONTEXT.md      # Documentação de padrões
├── types.ts            # Definições de tipos TypeScript
├── constants.tsx       # Constantes e dados estáticos
├── App.tsx             # Componente raiz e roteamento
├── index.tsx           # Entry point
├── index.html          # HTML base
└── CONTEXT.md          # Contexto geral do projeto
```

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd sanset

# Instale as dependências
npm install
```

### Desenvolvimento Local

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# A aplicação estará disponível em http://localhost:3000
```

### Build para Produção

```bash
# Crie o build de produção
npm run build

# Preview do build
npm run preview
```

## 📄 Páginas

- **Home** (`#home`): Landing page com hero, estatísticas e features
- **Metodologia** (`#infrastructure`): Apresentação das 3 fases da consultoria
- **Projetos** (`#reports`): Case studies de projetos realizados
- **Contato** (`#consultancy`): Formulário de contato com validação

## 🎨 Design System

### Cores

- **Primary**: `#4ade80` (Green-400) - Cor principal/accent
- **Background Dark**: `#020402` - Fundo principal
- **Card Dark**: `#0a0c0a` - Fundo de cards

### Tipografia

- **Sans**: Plus Jakarta Sans (UI, títulos)
- **Mono**: JetBrains Mono (código, dados técnicos)

### Componentes Visuais

- Glass Cards com backdrop-blur
- Neural Grid background pattern
- Glow Aura effects
- Phosphor text effects

## 🔧 Configuração

### Formulário de Contato

O formulário está configurado para usar Formspree. Para configurar:

1. Crie uma conta em [Formspree](https://formspree.io)
2. Obtenha seu Form ID
3. Substitua `YOUR_FORM_ID` em `pages/Contact.tsx` linha 78

Veja mais detalhes em [docs/development/FORM_SETUP.md](./docs/development/FORM_SETUP.md)

### Variáveis de Ambiente

Atualmente não há variáveis de ambiente necessárias para desenvolvimento local. O formulário usa Formspree que não requer configuração local.

## 🚀 Deploy

O projeto está configurado para deploy automático no Google Cloud Run via GitHub Actions.

### Pré-requisitos

- Projeto GCP configurado
- Billing habilitado (necessário para Artifact Registry)
- Workload Identity Federation configurado

### Processo de Deploy

1. **Configure o billing** (veja [docs/deploy/BILLING_REQUIREMENT.md](./docs/deploy/BILLING_REQUIREMENT.md))
2. **Configure os secrets no GitHub**:
   - `WIF_PROVIDER`
   - `WIF_SERVICE_ACCOUNT`
3. **Faça push para `main`** ou execute o workflow manualmente

Veja o checklist completo em [docs/deploy/DEPLOY_CHECKLIST.md](./docs/deploy/DEPLOY_CHECKLIST.md)

### Scripts de Automação

Scripts úteis na pasta `scripts/`:

- `setup-wif.sh` - Configura Workload Identity Federation
- `enable-required-apis.sh` - Habilita APIs do GCP
- `get-wif-config.sh` - Obtém configuração do WIF

## 📚 Documentação

- **[CONTEXT.md](./CONTEXT.md)**: Contexto geral do projeto
- **[docs/README.md](./docs/README.md)**: Índice da documentação
- **[docs/development/TODO.md](./docs/development/TODO.md)**: Checklist de implementação
- **[docs/deploy/DEPLOY_CHECKLIST.md](./docs/deploy/DEPLOY_CHECKLIST.md)**: Checklist de deploy

### Documentação por Pasta

Cada pasta principal contém um arquivo `CONTEXT.md` com padrões e convenções:

- `pages/CONTEXT.md` - Padrões de páginas
- `components/CONTEXT.md` - Padrões de componentes
- `scripts/CONTEXT.md` - Padrões de scripts
- `docs/CONTEXT.md` - Padrões de documentação

## ✨ Features

- ✅ Design moderno e responsivo
- ✅ Navegação hash-based (SPA)
- ✅ Menu mobile funcional
- ✅ Formulário de contato com validação
- ✅ Acessibilidade (ARIA labels, keyboard navigation)
- ✅ SEO otimizado (meta tags, Open Graph)
- ✅ Deploy automatizado via CI/CD

## 🎯 Próximos Passos

Veja o [TODO.md](./docs/development/TODO.md) para itens pendentes e melhorias planejadas.

## 📝 Convenções

- **Código**: Inglês (variáveis, funções, comentários)
- **UI**: Português brasileiro (labels, mensagens)
- **Commits**: Inglês
- **Documentação**: Português brasileiro

## 🤝 Contribuindo

1. Siga os padrões documentados nos arquivos `CONTEXT.md`
2. Mantenha a consistência de código e design
3. Teste localmente antes de fazer push
4. Documente mudanças significativas

## 📄 Licença

Este projeto é privado.

## 🔗 Links

- **Site**: [sanset.io](https://sanset.io) (quando em produção)
- **Email**: <growth@sanset.io>
- **Localização**: Salvador | Atendimento Remoto

---

Desenvolvido com ❤️ para transformar operações através de inteligência agêntica.
