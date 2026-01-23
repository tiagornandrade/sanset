# 💳 Requisito de Billing para Deploy

## ⚠️ Situação Atual

O deploy para Cloud Run requer que o **billing esteja habilitado** no projeto GCP porque:

1. **Container Registry (GCR)** agora usa **Artifact Registry** por baixo
2. **Artifact Registry** é um serviço pago que requer billing ativo
3. Sem billing, não é possível fazer push de imagens Docker

## 🔧 Solução: Habilitar Billing

### Passo 1: Acessar o Console de Billing

Acesse diretamente:
**<https://console.cloud.google.com/billing?project=intendra-deployments>**

Ou via navegação:

1. Acesse: <https://console.cloud.google.com>
2. Selecione o projeto: `intendra-deployments`
3. Vá em: **Billing** → **Link a billing account**

### Passo 2: Vincular Conta de Billing

1. Se você já tem uma conta de billing:
   - Selecione a conta existente
   - Clique em **Set Account**

2. Se você não tem uma conta de billing:
   - Clique em **Create Billing Account**
   - Preencha os dados de pagamento
   - Vincule ao projeto

### Passo 3: Habilitar a API

Após habilitar o billing, execute:

```bash
gcloud services enable artifactregistry.googleapis.com --project=intendra-deployments
```

Ou use o script:

```bash
./scripts/enable-artifact-registry.sh
```

### Passo 4: Aguardar Propagação

Aguarde **2-3 minutos** para a API se propagar completamente.

## 💰 Custos

### Container Registry / Artifact Registry

- **Armazenamento**: ~$0.10 por GB/mês
- **Transferência**: Primeiros 10GB/mês são gratuitos
- **Para projetos pequenos**: Geralmente fica dentro do free tier

### Cloud Run

- **Requisições**: Primeiros 2 milhões/mês são gratuitos
- **CPU/Memória**: Cobrado apenas quando em execução
- **Para projetos pequenos**: Muito econômico, pode ser quase gratuito

## 🔄 Alternativas (sem billing)

Infelizmente, **não há alternativas viáveis** para fazer deploy no Cloud Run sem billing, pois:

- Cloud Run requer um registry de imagens (GCR/Artifact Registry)
- Ambos requerem billing
- Não é possível usar registries externos (Docker Hub) diretamente com Cloud Run

## ✅ Após Habilitar Billing

Uma vez que o billing esteja habilitado:

1. ✅ Execute `./scripts/enable-artifact-registry.sh`
2. ✅ Aguarde 2-3 minutos
3. ✅ Teste o workflow novamente no GitHub Actions
4. ✅ O deploy deve funcionar normalmente

## 📝 Checklist

- [ ] Billing habilitado no projeto
- [ ] Artifact Registry API habilitada
- [ ] Aguardou 2-3 minutos para propagação
- [ ] Workflow testado novamente

## 🆘 Ajuda

Se precisar de ajuda para habilitar o billing:

1. **Documentação oficial**: <https://cloud.google.com/billing/docs/how-to/modify-project>
2. **Suporte GCP**: <https://cloud.google.com/support>
