# Contexto - Páginas (Pages)

## 📄 Visão Geral

A pasta `pages/` contém os componentes principais de cada página/rota da aplicação. Cada arquivo representa uma página completa da SPA.

## 📁 Estrutura

```text
pages/
├── Home.tsx        # Página inicial (hero, stats, features)
├── Cases.tsx       # Página de projetos/case studies
├── Solutions.tsx   # Página de metodologia/soluções
├── Contact.tsx     # Página de contato com formulário
└── context.md      # Este arquivo
```

## 🎨 Padrões de Página

### Estrutura Padrão

```typescript
import React from 'react';
import { Page } from '../types';

interface PageProps {
  onNavigate?: (page: Page) => void; // Opcional, usado quando há navegação
}

const PageComponent: React.FC<PageProps> = ({ onNavigate }) => {
  return (
    <div className="pb-32"> {/* Padding bottom padrão */}
      {/* Seções da página */}
    </div>
  );
};

export default PageComponent;
```

### Seções Comuns

1. **Header Section**: Título principal e subtítulo
2. **Content Sections**: Conteúdo principal com espaçamento `space-y-24`
3. **CTA Sections**: Call-to-actions com botões de navegação

### Classes CSS Padrão

- **Container**: `max-w-7xl mx-auto px-8` ou `max-w-6xl mx-auto px-6`
- **Spacing**: `py-24`, `pb-32`, `space-y-8`, `gap-16`
- **Typography**: Hierarquia clara (h1, h2, h3, p)
- **Colors**: `text-white`, `text-gray-400`, `text-primary`

## 📄 Páginas Específicas

### Home.tsx

**Propósito**: Landing page principal

**Seções**:

1. Hero section com título e CTAs
2. Stats section (4 métricas)
3. Features section com descrição e terminal mockup

**Props**: `onNavigate: (page: Page) => void`

**Padrões**:

- Hero centralizado com `text-center`
- Stats em grid responsivo
- Features em layout flex (texto + visual)

### Cases.tsx

**Propósito**: Exibir case studies/projetos

**Dados**: Usa `CASE_STUDIES` de `constants.tsx`

**Estrutura**:

- Header com título
- Loop de cases com layout alternado (left/right)
- Cada case: tags, título, desafio, solução, resultado, imagem

**Padrões**:

- Layout alternado: `lg:flex-row` e `lg:flex-row-reverse`
- Imagens com fallback grayscale/opacity
- Métricas grandes e destacadas

### Solutions.tsx

**Propósito**: Apresentar metodologia de consultoria

**Estrutura**:

- Header centralizado
- Grid de 3 cards (Fases da metodologia)
- CTA section no final

**Dados**: Array local `frameworks` com 3 fases

**Padrões**:

- Cards com `glass-card` class
- Tags em uppercase com tracking-widest
- Entregáveis em lista com bullets

### Contact.tsx

**Propósito**: Formulário de contato

**Funcionalidades**:

- Validação de campos
- Estados de loading/success/error
- Integração com Formspree (configurável)

**Estrutura**:

- Layout 2 colunas (texto + formulário)
- Formulário com validação
- Feedback visual de estados

**Padrões**:

- Formulário com `onSubmit` handler
- Validação com estados de erro por campo
- Mensagens de feedback com auto-dismiss

## 🔄 Navegação

### Como Navegar Entre Páginas

```typescript
// Receber função de navegação via props
const MyPage: React.FC<PageProps> = ({ onNavigate }) => {
  const handleClick = () => {
    onNavigate?.(Page.CONSULTANCY);
  };
  
  return <button onClick={handleClick}>Ir para Contato</button>;
};
```

### Páginas Disponíveis

- `Page.HOME` - Página inicial
- `Page.INFRASTRUCTURE` - Metodologia
- `Page.REPORTS` - Projetos
- `Page.CONSULTANCY` - Contato

## 🎨 Padrões Visuais

### Títulos

- **H1 Principal**: `text-4xl md:text-6xl` ou `text-5xl md:text-8xl`
- **H2 Seção**: `text-3xl` ou `text-4xl md:text-6xl`
- **H3 Card**: `text-2xl` ou `text-3xl`

### Espaçamento

- **Entre seções**: `space-y-24` ou `mt-40`
- **Padding vertical**: `py-24` ou `pt-24 pb-16`
- **Gap entre elementos**: `gap-16` ou `gap-8`

### Cards e Containers

- **Glass Card**: `glass-card` class (backdrop-blur, border)
- **Borders**: `border border-white/10` ou `border-white/5`
- **Rounded**: `rounded-xl` ou `rounded-[2rem]`

## 📱 Responsividade

### Breakpoints

- **Mobile**: < 768px (padrão)
- **Tablet**: md (768px+)
- **Desktop**: lg (1024px+)

### Padrões Responsivos

```typescript
// Grid responsivo
className="grid grid-cols-1 md:grid-cols-3 gap-8"

// Texto responsivo
className="text-4xl md:text-6xl"

// Layout flex responsivo
className="flex flex-col md:flex-row"
```

## 🔧 Boas Práticas

1. **Sempre usar TypeScript**: Tipar props e estados
2. **Componentes funcionais**: Usar hooks, não classes
3. **Acessibilidade**: ARIA labels, semantic HTML
4. **Performance**: Lazy loading de imagens quando possível
5. **Consistência**: Seguir padrões visuais estabelecidos

## 📝 Notas

- Todas as páginas são renderizadas no `App.tsx` via switch
- Navegação via hash routing (`window.location.hash`)
- Scroll to top automático ao navegar
- Estado de página gerenciado no `App.tsx`
