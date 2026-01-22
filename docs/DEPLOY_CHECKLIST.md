# ✅ Checklist de Deploy - Cloud Run

## Status da Configuração

### ⚠️ Billing (REQUERIDO)

- [ ] **Billing habilitado no projeto** - **CRÍTICO**
  - Acesse: <https://console.cloud.google.com/billing?project=intendra-deployments>
  - Veja mais detalhes em: [BILLING_REQUIREMENT.md](./BILLING_REQUIREMENT.md)

### ✅ APIs Habilitadas

- [x] `iamcredentials.googleapis.com` - IAM Service Account Credentials API
- [x] `cloudbuild.googleapis.com` - Cloud Build API (já estava habilitada)
- [x] `run.googleapis.com` - Cloud Run API (já estava habilitada)
- [x] `containerregistry.googleapis.com` - Container Registry API (já estava habilitada)
- [ ] `artifactregistry.googleapis.com` - Artifact Registry API (requer billing)
- [x] `storage-api.googleapis.com` - Cloud Storage API
- [x] `storage-component.googleapis.com` - Cloud Storage Component API
- [x] `iam.googleapis.com` - Identity and Access Management API

### ✅ Workload Identity Federation

- [x] Workload Identity Pool criado: `github-pool`
- [x] OIDC Provider criado: `github-provider`
- [x] Service Account criada: `github-actions-sa@intendra-deployments.iam.gserviceaccount.com`
- [x] Permissões concedidas:
  - [x] Cloud Run Admin
  - [x] Service Account User
  - [x] Storage Admin
  - [ ] Cloud Build Editor (verificar se foi concedida)

### ⚠️ Secrets do GitHub (AÇÃO NECESSÁRIA)

Você precisa adicionar os seguintes secrets no GitHub:

1. Acesse: <https://github.com/tiagornandrade/sanset/settings/secrets/actions>

2. Adicione o secret `WIF_PROVIDER`:

   ```text
   projects/642702967156/locations/global/workloadIdentityPools/github-pool/providers/github-provider
   ```

3. Adicione o secret `WIF_SERVICE_ACCOUNT`:

   ```text
   github-actions-sa@intendra-deployments.iam.gserviceaccount.com
   ```

### 🔧 Verificações Finais

Execute para garantir que tudo está configurado:

```bash
# 1. Verificar se Cloud Build Editor role foi concedida
./scripts/fix-cloudbuild-role.sh

# 2. Obter valores dos secrets (para confirmar)
./scripts/get-wif-config.sh
```

## 🚀 Como Testar

### Opção 1: Push para main/master

```bash
git push origin main
```

### Opção 2: Executar manualmente no GitHub

1. Vá para: <https://github.com/tiagornandrade/sanset/actions>
2. Selecione o workflow "Deploy to Cloud Run"
3. Clique em "Run workflow"

## 📋 Arquivos de Configuração

- ✅ `.github/workflows/deploy-cloud-run.yml` - Workflow do GitHub Actions
- ✅ `cloudbuild.yaml` - Configuração do Cloud Build
- ✅ `Dockerfile` - Build da aplicação
- ✅ `nginx.conf` - Configuração do servidor web
- ✅ `.dockerignore` - Otimização do build

## 🐛 Troubleshooting

### Erro: "IAM Service Account Credentials API has not been used"

✅ **Resolvido** - API foi habilitada

### Erro: "Permission denied" no Cloud Build

Execute: `./scripts/fix-cloudbuild-role.sh`

### Erro: "Service account does not exist"

Aguarde alguns minutos e tente novamente, ou verifique se a service account foi criada corretamente.

### Erro: "Workload Identity Provider not found"

Verifique se os secrets `WIF_PROVIDER` e `WIF_SERVICE_ACCOUNT` foram adicionados corretamente no GitHub.

### Erro: "Artifact Registry API has not been used" ou "Billing account not found"

**Solução:**

1. Habilite o billing no projeto: <https://console.cloud.google.com/billing?project=intendra-deployments>
2. Execute `./scripts/enable-artifact-registry.sh`
3. Veja detalhes completos em: [BILLING_REQUIREMENT.md](./BILLING_REQUIREMENT.md)

## 📝 Próximos Passos

1. ⚠️ **Habilitar billing no projeto** (CRÍTICO - veja [BILLING_REQUIREMENT.md](./BILLING_REQUIREMENT.md))
2. ⚠️ **Habilitar Artifact Registry API** (após billing)
3. ⚠️ **Adicionar secrets no GitHub** (CRÍTICO)
4. ⚠️ Verificar role Cloud Build Editor
5. 🚀 Fazer push ou executar workflow manualmente
6. 🎉 Acompanhar o deploy no GitHub Actions
