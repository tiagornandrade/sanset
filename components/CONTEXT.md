<!-- markdownlint-disable -->
# Contexto - Componentes (Components)

## 🧩 Visão Geral

A pasta `components/` contém componentes React reutilizáveis que são usados em múltiplas páginas ou que compõem a estrutura base da aplicação.

## 📁 Estrutura

```text
components/
├── Layout.tsx      # Layout principal (nav, footer, mobile menu)
└── context.md      # Este arquivo
```

## 🎨 Padrões de Componentes

### Estrutura Padrão

```typescript
import React from 'react';
import { Type } from '../types';

interface ComponentProps {
  // Props tipadas
  prop: string;
  optional?: boolean;
}

const Component: React.FC<ComponentProps> = ({ prop, optional }) => {
  // Hooks no topo
  const [state, setState] = useState();
  
  // Effects
  useEffect(() => {
    // ...
  }, []);
  
  // Handlers
  const handleClick = () => {
    // ...
  };
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default Component;
```

## 📄 Componentes Existentes

### Layout.tsx

**Propósito**: Layout principal da aplicação (wrapper de todas as páginas)

**Responsabilidades**:

- Navegação principal (desktop)
- Menu mobile hamburger
- Footer
- Bottom navigation (mobile)
- Gerenciamento de estado do menu mobile

**Props**:

```typescript
interface LayoutProps {
  children: React.ReactNode;      // Conteúdo da página atual
  currentPage: Page;              // Página ativa para highlight
  onPageChange: (page: Page) => void; // Função de navegação
}
```

**Estados**:

- `isMobileMenuOpen`: Controla visibilidade do menu mobile

**Features**:

- Menu hamburger funcional com overlay
- Previne scroll do body quando menu aberto
- Fecha menu ao navegar
- Navegação bottom para mobile
- Footer com links e informações

**Padrões**:

- Nav sticky no topo (`sticky top-0 z-50`)
- Backdrop blur para nav e menu
- Transições suaves
- ARIA labels para acessibilidade

## 🎨 Padrões Visuais

### Navegação

- **Links ativos**: `text-primary` (verde)
- **Links inativos**: `text-gray-500`
- **Hover**: `hover:text-white`
- **Tracking**: `tracking-[0.2em]` para uppercase

### Menu Mobile

- **Overlay**: `fixed inset-0 top-16` com backdrop blur
- **Items**: Cards clicáveis com ícones
- **Estado ativo**: Background verde com borda
- **CTA**: Botão destacado no final

### Footer

- **Layout**: Grid responsivo (1 col mobile, 2+ desktop)
- **Links**: Hover com cor primary
- **Copyright**: Texto pequeno no final
- **Sections**: Tecnologia, Contato

## 🔄 Padrões de Estado

### Menu Mobile

```typescript
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// Fecha ao mudar página
useEffect(() => {
  setIsMobileMenuOpen(false);
}, [currentPage]);

// Previne scroll quando aberto
useEffect(() => {
  if (isMobileMenuOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}, [isMobileMenuOpen]);
```

## 📱 Responsividade

### Breakpoints

- **Mobile**: `< md` (menu hamburger, bottom nav)
- **Desktop**: `md+` (nav horizontal, footer completo)

### Classes Responsivas

```typescript
// Esconder em mobile, mostrar em desktop
className="hidden md:flex"

// Esconder em desktop, mostrar em mobile
className="md:hidden"
```

## 🎯 Acessibilidade

### ARIA Labels

- Todos os botões têm `aria-label`
- Menu tem `aria-expanded` e `aria-controls`
- Links têm `aria-current="page"` quando ativos

### Navegação por Teclado

- Todos os elementos são focáveis
- Tab order lógico
- Focus states visíveis

## 🔧 Boas Práticas

1. **Props tipadas**: Sempre usar interfaces TypeScript
2. **Estado local**: Usar `useState` para estado do componente
3. **Effects**: Limpar side effects (scroll, event listeners)
4. **Performance**: Evitar re-renders desnecessários
5. **Acessibilidade**: ARIA labels, semantic HTML

## 📝 Notas

- Layout é renderizado no `App.tsx` envolvendo todas as páginas
- Estado de página é gerenciado no `App.tsx`, não no Layout
- Menu mobile fecha automaticamente ao navegar
- Footer é fixo em todas as páginas

## 🚀 Adicionar Novos Componentes

### Checklist

1. Criar arquivo `ComponentName.tsx` na pasta `components/`
2. Definir interface de props
3. Implementar componente funcional
4. Adicionar ARIA labels
5. Testar responsividade
6. Documentar no `context.md` se necessário

### Exemplo

```typescript
// components/Button.tsx
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary' 
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 ${
        variant === 'primary' 
          ? 'bg-primary text-background-dark' 
          : 'bg-white/5 border border-white/10'
      }`}
      aria-label={label}
    >
      {label}
    </button>
  );
};

export default Button;
```
