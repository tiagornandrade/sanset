<!-- markdownlint-disable -->
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Formulário de contato com validação completa de campos
- Estados de loading, sucesso e erro no formulário
- Menu mobile hamburger funcional com overlay
- Integração com Formspree para envio de formulários
- Validação de email com regex
- Feedback visual de erros por campo
- ARIA labels em todos os elementos interativos
- Focus states visíveis para navegação por teclado
- Meta tags SEO (Open Graph, Twitter Cards)
- Documentação completa em arquivos CONTEXT.md
- README.md atualizado com informações do projeto
- Organização da pasta docs/ em categorias (deploy, development)
- Sistema de roteamento hash-based funcional
- Scroll to top automático ao navegar entre páginas

### Changed

- Reposicionamento do site de "produto" para "consultoria"
- Linguagem técnica reduzida em favor de foco em resultados de negócio
- Cases de projetos reformulados para narrativa mais genérica e realista
- Tamanhos de fonte aumentados para melhor legibilidade
- Links do footer atualizados (precisam de páginas)
- Email no footer agora é clicável (mailto:)
- Localização atualizada para "Salvador | Atendimento Remoto"
- Título HTML atualizado para refletir consultoria
- Navegação renomeada: "Stack Agêntica" → "Metodologia", "Growth Logs" → "Projetos"
- CTAs atualizados para linguagem consultiva

### Fixed

- Referência ao arquivo index.css inexistente removida
- Menu mobile hamburger agora abre/fecha corretamente
- Prevenção de scroll do body quando menu mobile está aberto
- Imagens dos cases agora carregam corretamente
- Fallback visual melhorado para imagens que não carregam
- Opacidade e grayscale das imagens ajustados para melhor visibilidade

### Improved

- Acessibilidade geral do site (ARIA labels, keyboard navigation)
- Legibilidade com tamanhos de fonte maiores
- Organização da documentação em estrutura hierárquica
- Padrões de código documentados em CONTEXT.md
- Feedback visual em formulários e interações

## [0.1.0] - 2024-01-22

### Added

- Estrutura inicial do projeto
- Páginas: Home, Cases, Solutions, Contact
- Componente Layout com navegação e footer
- Sistema de design com Tailwind CSS
- Configuração de deploy para Google Cloud Run
- Scripts de automação para GCP
- Documentação de deploy e desenvolvimento

[Unreleased]: https://github.com/tiagornandrade/sanset/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/tiagornandrade/sanset/releases/tag/v0.1.0
