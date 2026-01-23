# Contexto do Projeto Sanset

## 📋 Visão Geral

Sanset é um site institucional para uma consultoria especializada em Inteligência Agêntica para startups. O projeto é uma Single Page Application (SPA) construída com React, TypeScript e Vite.

## 🏗️ Arquitetura

### Stack Tecnológico

- **Framework**: React 19.2.3
- **Linguagem**: TypeScript 5.8.2
- **Build Tool**: Vite 6.2.0
- **Styling**: Tailwind CSS (via CDN)
- **Roteamento**: Hash-based routing (client-side)
- **Deploy**: Google Cloud Run via GitHub Actions

### Estrutura de Pastas

```text
sanset/
├── pages/          # Componentes de página (Home, Cases, Solutions, Contact)
├── components/     # Componentes reutilizáveis (Layout)
├── docs/           # Documentação do projeto
├── scripts/        # Scripts de automação e deploy
├── types.ts        # Definições de tipos TypeScript
├── constants.tsx   # Constantes e dados estáticos
├── App.tsx         # Componente raiz e roteamento
├── index.tsx       # Entry point da aplicação
└── index.html      # HTML base com configuração Tailwind
```

## 🎨 Padrões de Design

### Sistema de Cores

- **Primary**: `#4ade80` (Green-400) - Cor principal/accent
- **Background Dark**: `#020402` - Fundo principal
- **Card Dark**: `#0a0c0a` - Fundo de cards
- **Text**: Hierarquia de cinzas (`gray-300`, `gray-400`, `gray-500`, `gray-600`)

### Tipografia

- **Sans**: Plus Jakarta Sans (UI, títulos)
- **Mono**: JetBrains Mono (código, dados técnicos)
- **Tamanhos**: Sistema baseado em Tailwind (text-xs, text-sm, text-base, etc.)

### Componentes Visuais

- **Glass Cards**: Cards com backdrop-blur e bordas sutis
- **Neural Grid**: Background pattern com grid de pontos
- **Glow Aura**: Efeito de brilho radial
- **Phosphor Text**: Texto com text-shadow para efeito neon

## 🔄 Padrões de Código

### Convenções de Nomenclatura

- **Componentes**: PascalCase (`Home.tsx`, `Layout.tsx`)
- **Arquivos**: kebab-case para configs (`vite.config.ts`)
- **Variáveis/Funções**: camelCase
- **Constantes**: UPPER_SNAKE_CASE ou objetos exportados

### Estrutura de Componentes

```typescript
// 1. Imports
import React from 'react';
import { Type } from '../types';

// 2. Interface de Props
interface ComponentProps {
  prop: string;
}

// 3. Componente
const Component: React.FC<ComponentProps> = ({ prop }) => {
  // Hooks
  // Handlers
  // Render
  return <div>...</div>;
};

export default Component;
```

### Roteamento

- **Sistema**: Hash-based routing (`#home`, `#infrastructure`, etc.)
- **Navegação**: Função `onNavigate` passada via props
- **Estado**: Gerenciado no `App.tsx` com `useState` e `useEffect`

### Estado e Dados

- **Estado Local**: `useState` para estado de componente
- **Dados Estáticos**: `constants.tsx` (NAV_ITEMS, CASE_STUDIES, IMAGES)
- **Tipos**: Centralizados em `types.ts`

## 🎯 Padrões de Acessibilidade

- **ARIA Labels**: Todos os botões e elementos interativos
- **Keyboard Navigation**: Suporte completo
- **Focus States**: Ring de foco visível
- **Semantic HTML**: Uso correto de elementos semânticos
- **Alt Text**: Imagens com descrições adequadas

## 📱 Responsividade

- **Mobile First**: Design pensado primeiro para mobile
- **Breakpoints**: Tailwind padrão (sm, md, lg)
- **Menu Mobile**: Hamburger menu com overlay
- **Bottom Nav**: Navegação inferior para mobile

## 🔧 Configurações Importantes

### Vite

- Porta: 3000
- Host: 0.0.0.0 (para Docker)
- Aliases: `@` aponta para raiz

### Tailwind

- Configurado via CDN no `index.html`
- Dark mode: `class` strategy
- Cores customizadas definidas inline

### TypeScript

- Strict mode habilitado
- Path aliases configurados
- Tipos exportados de `types.ts`

## 🚀 Deploy

- **Plataforma**: Google Cloud Run
- **CI/CD**: GitHub Actions
- **Build**: Docker + Nginx
- **Documentação**: Ver `docs/deploy/`

## 📝 Convenções de Commit

- Mensagens em inglês
- Formato: `type: description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `chore`

## 🔗 Links Úteis

- [Documentação](./docs/README.md)
- [TODO](./docs/development/TODO.md)
- [Deploy Checklist](./docs/deploy/DEPLOY_CHECKLIST.md)
