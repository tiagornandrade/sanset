# Contexto - Documentação (Docs)

## 📚 Visão Geral

A pasta `docs/` contém toda a documentação técnica do projeto, organizada por categorias para facilitar navegação e manutenção.

## 📁 Estrutura

```text
docs/
├── README.md                    # Índice principal
├── context.md                   # Este arquivo
├── deploy/                      # Documentação de deploy
│   ├── DEPLOY_CHECKLIST.md     # Checklist completo
│   └── BILLING_REQUIREMENT.md  # Requisitos de billing
└── development/                # Documentação de desenvolvimento
    ├── TODO.md                 # Checklist de implementação
    └── FORM_SETUP.md           # Configuração do formulário
```

## 🎯 Organização

### Por Categoria

- **Deploy**: Tudo relacionado a infraestrutura, CI/CD, Cloud Run
- **Development**: Guias de desenvolvimento, configuração, TODOs

### Por Tipo

- **Checklists**: Listas de verificação passo a passo
- **Guias**: Instruções detalhadas de configuração
- **Requirements**: Requisitos e pré-condições

## 📄 Documentos Principais

### README.md

**Propósito**: Índice principal e ponto de entrada da documentação

**Conteúdo**:

- Estrutura da documentação
- Links para documentos importantes
- Início rápido
- Convenções de marcação

### deploy/DEPLOY_CHECKLIST.md

**Propósito**: Checklist completo para deploy no Cloud Run

**Seções**:

- Status da configuração
- APIs habilitadas
- Workload Identity Federation
- Secrets do GitHub
- Troubleshooting

**Quando usar**: Antes e durante o processo de deploy

### deploy/BILLING_REQUIREMENT.md

**Propósito**: Explicar requisitos e configuração de billing

**Conteúdo**:

- Por que billing é necessário
- Como habilitar
- Custos estimados
- Alternativas (se houver)

**Quando usar**: Quando encontrar erros relacionados a billing

### development/TODO.md

**Propósito**: Checklist de implementação e melhorias

**Organização**:

- 🔴 Crítico
- 🟡 Importante
- 🟢 Nice to have

**Status**: Usa checkboxes para rastrear progresso

**Quando usar**: Para planejar desenvolvimento e rastrear tarefas

### development/FORM_SETUP.md

**Propósito**: Guia de configuração do formulário de contato

**Conteúdo**:

- Opções de backend (Formspree, EmailJS, etc.)
- Funcionalidades implementadas
- Próximos passos

**Quando usar**: Ao configurar ou alterar o formulário

## 📝 Padrões de Documentação

### Formato

- **Markdown**: Todos os documentos em `.md`
- **Emojis**: Usados para categorização visual (🔴, 🟡, 🟢, ✅, ⚠️)
- **Links**: Relativos para navegação entre documentos

### Estrutura de Documentos

```markdown
# Título Principal

## Seção Principal

### Subseção

- Lista de itens
- Com checkboxes quando aplicável

**Destaque**: Para informações importantes

`código` para comandos e exemplos
```

### Convenções de Marcação

- **Checkboxes**: `- [ ]` para pendente, `- [x]` para concluído
- **Status**: Emojis de status (✅, ⚠️, 🔴, 🟡, 🟢)
- **Links**: `[texto](./caminho/arquivo.md)`
- **Código**: Blocos de código com syntax highlighting

## 🔗 Referências Cruzadas

### Como Referenciar

```markdown
# Dentro de docs/
[Documento](./deploy/DEPLOY_CHECKLIST.md)
[Documento](./development/TODO.md)

# De fora de docs/
[Documento](./docs/deploy/DEPLOY_CHECKLIST.md)
```

### Links Úteis

- Links externos para documentação oficial
- Links para consoles (GCP, GitHub)
- Links para serviços externos (Formspree, etc.)

## 🎨 Padrões Visuais

### Hierarquia

- **# Título**: Título principal do documento
- **## Seção**: Seções principais
- **### Subseção**: Subseções
- **#### Detalhe**: Detalhes específicos

### Destaques

- **Bold**: Para ênfase importante
- **Code**: Para comandos, variáveis, paths
- **Italic**: Para notas e observações

### Listas

- **Ordenadas**: Para passos sequenciais
- **Não ordenadas**: Para itens gerais
- **Checkboxes**: Para checklists

## 🔄 Manutenção

### Quando Atualizar

- **TODO.md**: Após completar tarefas
- **DEPLOY_CHECKLIST.md**: Após mudanças na infraestrutura
- **FORM_SETUP.md**: Após mudanças no formulário
- **README.md**: Após adicionar novos documentos

### Boas Práticas

1. **Manter atualizado**: Documentação desatualizada é pior que nenhuma
2. **Links funcionais**: Verificar links regularmente
3. **Exemplos claros**: Incluir exemplos práticos
4. **Troubleshooting**: Documentar problemas comuns e soluções

## 📚 Adicionar Nova Documentação

### Checklist

1. Decidir categoria (deploy ou development)
2. Criar arquivo `.md` na pasta apropriada
3. Seguir estrutura padrão
4. Adicionar links no `README.md`
5. Referenciar de outros documentos se relevante
6. Atualizar `context.md` se necessário

### Exemplo

```markdown
# Novo Documento

## Visão Geral

Descrição do propósito do documento.

## Conteúdo

Detalhes e instruções.

## Referências

- [Outro documento](./outro.md)
- [Link externo](https://exemplo.com)
```

## 🔍 Navegação

### Do README Principal

1. Ler `README.md` para visão geral
2. Navegar para categoria relevante
3. Abrir documento específico
4. Seguir links para documentos relacionados

### Busca Rápida

- **Deploy**: Ver `deploy/DEPLOY_CHECKLIST.md`
- **Desenvolvimento**: Ver `development/TODO.md`
- **Formulário**: Ver `development/FORM_SETUP.md`
- **Billing**: Ver `deploy/BILLING_REQUIREMENT.md`
