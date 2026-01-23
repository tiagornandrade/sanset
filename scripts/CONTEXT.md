# Contexto - Scripts

## 🔧 Visão Geral

A pasta `scripts/` contém scripts de automação para configuração, deploy e manutenção do projeto. Todos os scripts são executáveis via bash e focados em operações do Google Cloud Platform (GCP).

## 📁 Estrutura

```text
scripts/
├── enable-artifact-registry.sh      # Habilita Artifact Registry API
├── enable-required-apis.sh         # Habilita todas as APIs necessárias
├── fix-cloudbuild-permissions.sh    # Corrige permissões do Cloud Build
├── fix-cloudbuild-role.sh          # Adiciona role Cloud Build Editor
├── fix-service-usage-permissions.sh # Corrige permissões de Service Usage
├── get-wif-config.sh                # Obtém configuração do Workload Identity
├── setup-wif.sh                     # Configura Workload Identity Federation
├── README.md                        # Documentação dos scripts
└── context.md                      # Este arquivo
```

## 🎯 Padrões de Scripts

### Estrutura Padrão

```bash
#!/bin/bash

# Descrição do script
# Uso: ./script-name.sh [opcional-args]

set -e  # Para em caso de erro

# Variáveis
PROJECT_ID="intendra-deployments"
REGION="us-central1"

# Funções auxiliares
function log_info() {
  echo "ℹ️  $1"
}

function log_success() {
  echo "✅ $1"
}

function log_error() {
  echo "❌ $1" >&2
}

# Validações
if [ -z "$PROJECT_ID" ]; then
  log_error "PROJECT_ID não definido"
  exit 1
fi

# Lógica principal
# ...

log_success "Script concluído"
```

### Convenções

- **Shebang**: `#!/bin/bash`
- **Error handling**: `set -e` para parar em erros
- **Logging**: Funções `log_info`, `log_success`, `log_error`
- **Validações**: Verificar variáveis antes de usar
- **Comentários**: Documentar propósito e uso

## 📄 Scripts Específicos

### enable-required-apis.sh

**Propósito**: Habilita todas as APIs do GCP necessárias para o projeto

**APIs habilitadas**:

- IAM Service Account Credentials
- Cloud Build
- Cloud Run
- Container Registry
- Artifact Registry
- Cloud Storage
- IAM

**Uso**:

```bash
./scripts/enable-required-apis.sh
```

**Notas**:

- Requer billing habilitado para Artifact Registry
- Pode falhar silenciosamente se API já estiver habilitada

### enable-artifact-registry.sh

**Propósito**: Habilita especificamente a API Artifact Registry

**Uso**:

```bash
./scripts/enable-artifact-registry.sh
```

**Requisitos**:

- Billing habilitado no projeto
- Permissões de Service Usage Admin

### setup-wif.sh

**Propósito**: Configura Workload Identity Federation para GitHub Actions

**O que faz**:

1. Cria Workload Identity Pool
2. Cria OIDC Provider
3. Cria Service Account
4. Concede permissões necessárias
5. Configura binding

**Uso**:

```bash
./scripts/setup-wif.sh
```

**Output**: Valores para secrets do GitHub

### get-wif-config.sh

**Propósito**: Obtém e exibe configuração atual do WIF

**Uso**:

```bash
./scripts/get-wif-config.sh
```

**Output**: Provider e Service Account para usar como secrets

### fix-cloudbuild-role.sh

**Propósito**: Adiciona role Cloud Build Editor à service account

**Uso**:

```bash
./scripts/fix-cloudbuild-role.sh
```

**Quando usar**: Quando Cloud Build falha por falta de permissões

### fix-cloudbuild-permissions.sh

**Propósito**: Corrige permissões gerais do Cloud Build

**Uso**:

```bash
./scripts/fix-cloudbuild-permissions.sh
```

### fix-service-usage-permissions.sh

**Propósito**: Corrige permissões de Service Usage API

**Uso**:

```bash
./scripts/fix-service-usage-permissions.sh
```

## 🔐 Variáveis de Ambiente

### Comuns

- `PROJECT_ID`: ID do projeto GCP (padrão: `intendra-deployments`)
- `REGION`: Região do GCP (padrão: `us-central1`)
- `SERVICE_ACCOUNT`: Nome da service account

### Como Definir

```bash
# Opção 1: Exportar antes de executar
export PROJECT_ID="meu-projeto"
./scripts/enable-required-apis.sh

# Opção 2: Definir no script
PROJECT_ID="meu-projeto"
```

## 🚨 Tratamento de Erros

### Padrões

```bash
# Verificar se comando foi bem-sucedido
if ! gcloud services enable "$api" --project="$PROJECT_ID"; then
  log_error "Falha ao habilitar $api"
  exit 1
fi

# Verificar se recurso existe
if ! gcloud ... list --filter="NAME:$name" | grep -q "$name"; then
  log_info "$name não existe, criando..."
  # criar recurso
fi
```

## 📝 Logging

### Níveis

- **Info** (`ℹ️`): Informações gerais
- **Success** (`✅`): Operação bem-sucedida
- **Error** (`❌`): Erro (redirecionado para stderr)

### Exemplo

```bash
log_info "Iniciando configuração..."
log_success "API habilitada com sucesso"
log_error "Falha ao criar recurso"
```

## 🔄 Dependências Entre Scripts

### Ordem Recomendada

1. `enable-required-apis.sh` - Habilita APIs básicas
2. `setup-wif.sh` - Configura autenticação
3. `fix-cloudbuild-role.sh` - Corrige permissões
4. `get-wif-config.sh` - Obtém secrets para GitHub

### Dependências

- `setup-wif.sh` requer APIs habilitadas
- `fix-*.sh` requerem service account criada
- Todos requerem `gcloud` CLI configurado

## 🛠️ Ferramentas Necessárias

### Pré-requisitos

- `gcloud` CLI instalado e configurado
- Autenticação: `gcloud auth login`
- Projeto padrão: `gcloud config set project PROJECT_ID`
- Permissões adequadas no projeto

### Verificar Instalação

```bash
# Verificar gcloud
gcloud --version

# Verificar autenticação
gcloud auth list

# Verificar projeto
gcloud config get-value project
```

## 📚 Documentação Adicional

- [README.md](./README.md) - Documentação detalhada dos scripts
- [Deploy Checklist](../docs/deploy/DEPLOY_CHECKLIST.md) - Checklist de deploy
- [Billing Requirement](../docs/deploy/BILLING_REQUIREMENT.md) - Requisitos de billing

## 🔧 Boas Práticas

1. **Sempre validar**: Verificar variáveis e pré-requisitos
2. **Logging claro**: Usar funções de log padronizadas
3. **Error handling**: `set -e` e verificações explícitas
4. **Idempotência**: Scripts devem poder rodar múltiplas vezes
5. **Documentação**: Comentar propósito e uso

## 🚀 Adicionar Novo Script

### Checklist

1. Criar arquivo `.sh` na pasta `scripts/`
2. Adicionar shebang `#!/bin/bash`
3. Implementar `set -e` e funções de log
4. Validar variáveis e pré-requisitos
5. Documentar no `README.md`
6. Testar em ambiente seguro
7. Adicionar referência no `context.md` se necessário
