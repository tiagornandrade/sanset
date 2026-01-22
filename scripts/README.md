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

### 5. `fix-cloudbuild-permissions.sh`

Corrige permissões do Cloud Build, incluindo acesso ao bucket e uso de serviços.

**O que faz:**

- Concede Service Usage Consumer role
- Concede Cloud Build Builder role
- Concede Storage Admin role
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
