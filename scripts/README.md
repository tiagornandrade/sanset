<!-- markdownlint-disable -->
# Scripts de Configuração

Scripts auxiliares para configurar o deploy no Cloud Run.

## Scripts Disponíveis

### 1. `setup-wif.sh`

Configuração completa do Workload Identity Federation para GitHub Actions.

**O que faz:**

- Habilita APIs necessárias
- Cria Workload Identity Pool
- Cria OIDC Provider
- Cria Service Account
- Concede permissões necessárias
- Vincula Provider à Service Account

**Uso:**

```bash
./scripts/setup-wif.sh
```

### 2. `enable-required-apis.sh`

Habilita todas as APIs necessárias para Cloud Build e Cloud Run.

**Uso:**

```bash
./scripts/enable-required-apis.sh
```

### 3. `fix-cloudbuild-role.sh`

Corrige a role Cloud Build Editor caso tenha falhado durante o setup.

**Uso:**

```bash
./scripts/fix-cloudbuild-role.sh
```

### 4. `get-wif-config.sh`

Obtém os valores de WIF_PROVIDER e WIF_SERVICE_ACCOUNT já configurados.

**Uso:**

```bash
./scripts/get-wif-config.sh
```

### 5. `enable-artifact-registry.sh`

Habilita a API do Artifact Registry (necessária para Container Registry/GCR).

**⚠️ Requer billing habilitado no projeto**

**Uso:**

```bash
./scripts/enable-artifact-registry.sh
```

### 6. `fix-service-usage-permissions.sh`

Corrige permissões de Service Usage para permitir que a service account habilite APIs automaticamente.

**O que faz:**
- Concede Service Usage Admin role (permite habilitar APIs)
- Concede Service Usage Consumer role (permite usar serviços)

**Uso:**

```bash
./scripts/fix-service-usage-permissions.sh
```

### 7. `fix-cloudbuild-permissions.sh`

Corrige permissões do Cloud Build, incluindo acesso ao bucket e uso de serviços.

**O que faz:**

- Concede Service Usage Admin role (permite habilitar APIs)
- Concede Service Usage Consumer role
- Concede Cloud Build Builder role
- Concede Storage Admin role
- Concede Cloud Build Editor role
- Concede permissão para usar Cloud Build service account

**Uso:**

```bash
./scripts/fix-cloudbuild-permissions.sh
```

## Troubleshooting

### Erro: "IAM Service Account Credentials API has not been used"

**Solução:** Execute `./scripts/enable-required-apis.sh`

### Erro: "Service account does not exist"

**Solução:** Aguarde alguns segundos após criar a service account e execute novamente, ou execute `./scripts/fix-cloudbuild-role.sh`

### Erro: "Permission denied" no Cloud Build

**Solução:** Verifique se a role Cloud Build Editor foi concedida: `./scripts/fix-cloudbuild-role.sh`

### Erro: "The user is forbidden from accessing the bucket [PROJECT_cloudbuild]"

**Solução:** Execute `./scripts/fix-cloudbuild-permissions.sh` para corrigir todas as permissões do Cloud Build, incluindo acesso ao bucket e uso de serviços.

### Erro: "Artifact Registry API has not been used" ou "Billing account for project is not found"

**Solução:**

1. Habilite o billing no projeto: <https://console.cloud.google.com/billing?project=intendra-deployments>
2. Execute `./scripts/enable-artifact-registry.sh` ou `./scripts/enable-required-apis.sh`

**Nota:** O Artifact Registry (usado pelo Container Registry) requer billing habilitado no projeto.

### Erro: "Permission denied to enable service [run.googleapis.com]"

**Solução:** Execute `./scripts/fix-service-usage-permissions.sh` para conceder a role Service Usage Admin, que permite que a service account habilite APIs automaticamente.

## Ordem Recomendada de Execução

1. Primeira vez:

   ```bash
   ./scripts/setup-wif.sh
   ```

2. Se houver erro de API:

   ```bash
   ./scripts/enable-required-apis.sh
   ```

3. Se houver erro de permissão do Cloud Build:

   ```bash
   ./scripts/fix-cloudbuild-role.sh
   ```

4. Se houver erro de acesso ao bucket do Cloud Build:

   ```bash
   ./scripts/fix-cloudbuild-permissions.sh
   ```

5. Para obter os valores dos secrets:

   ```bash
   ./scripts/get-wif-config.sh
   ```
