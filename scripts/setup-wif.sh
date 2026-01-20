#!/bin/bash

# Script to setup Workload Identity Federation for GitHub Actions
# Usage: ./scripts/setup-wif.sh

set -e

PROJECT_ID="intendra-deployments"
POOL_ID="github-pool"
PROVIDER_ID="github-provider"
SERVICE_ACCOUNT_NAME="github-actions-sa"
REPO="tiagornandrade/sanset"  # Update with your actual GitHub repo

echo "🚀 Setting up Workload Identity Federation for GitHub Actions"
echo "Project: $PROJECT_ID"
echo "Repository: $REPO"
echo ""

# Get project number
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format="value(projectNumber)")
echo "📊 Project Number: $PROJECT_NUMBER"
echo ""

# Step 0: Enable required APIs
echo "🔌 Step 0: Enabling required APIs..."
REQUIRED_APIS=(
    "iamcredentials.googleapis.com"
    "cloudbuild.googleapis.com"
    "run.googleapis.com"
    "containerregistry.googleapis.com"
    "storage-api.googleapis.com"
    "iam.googleapis.com"
)

for api in "${REQUIRED_APIS[@]}"; do
    if gcloud services enable $api --project=$PROJECT_ID --quiet 2>/dev/null; then
        echo "  ✅ $api enabled"
    else
        echo "  ⚠️  $api may already be enabled"
    fi
done
echo ""

# Step 1: Create Workload Identity Pool
echo "📦 Step 1: Creating Workload Identity Pool..."
if gcloud iam workload-identity-pools describe $POOL_ID \
    --location=global \
    --project=$PROJECT_ID &>/dev/null; then
    echo "✅ Pool '$POOL_ID' already exists"
else
    gcloud iam workload-identity-pools create $POOL_ID \
        --project=$PROJECT_ID \
        --location="global" \
        --display-name="GitHub Actions Pool"
    echo "✅ Pool '$POOL_ID' created"
fi
echo ""

# Step 2: Create OIDC Provider
echo "🔐 Step 2: Creating OIDC Provider..."
if gcloud iam workload-identity-pools providers describe $PROVIDER_ID \
    --workload-identity-pool=$POOL_ID \
    --location=global \
    --project=$PROJECT_ID &>/dev/null; then
    echo "✅ Provider '$PROVIDER_ID' already exists"
else
    gcloud iam workload-identity-pools providers create-oidc $PROVIDER_ID \
        --project=$PROJECT_ID \
        --location="global" \
        --workload-identity-pool=$POOL_ID \
        --display-name="GitHub Provider" \
        --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository" \
        --attribute-condition="assertion.repository=='$REPO'" \
        --issuer-uri="https://token.actions.githubusercontent.com"
    echo "✅ Provider '$PROVIDER_ID' created"
fi
echo ""

# Step 3: Create Service Account
echo "👤 Step 3: Creating Service Account..."
if gcloud iam service-accounts describe $SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com \
    --project=$PROJECT_ID &>/dev/null; then
    echo "✅ Service Account '$SERVICE_ACCOUNT_NAME' already exists"
else
    gcloud iam service-accounts create $SERVICE_ACCOUNT_NAME \
        --project=$PROJECT_ID \
        --display-name="GitHub Actions Service Account"
    echo "✅ Service Account '$SERVICE_ACCOUNT_NAME' created"
    # Wait a moment for service account to be fully available
    echo "  ⏳ Waiting for service account to be fully available..."
    sleep 3
fi
echo ""

# Step 4: Grant necessary permissions
echo "🔑 Step 4: Granting permissions to Service Account..."

# Cloud Build permissions
echo "  - Granting Cloud Build Editor role..."
if gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/cloudbuild.builds.editor" \
    --quiet 2>/dev/null; then
    echo "  ✅ Cloud Build Editor role granted"
else
    echo "  ⚠️  Failed to grant role (may already be granted or need retry)"
fi

# Cloud Run Admin permissions
echo "  - Granting Cloud Run Admin role..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/run.admin" \
    --condition=None \
    --quiet || echo "  ⚠️  Role may already be granted"

# Service Account User permissions
echo "  - Granting Service Account User role..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/iam.serviceAccountUser" \
    --condition=None \
    --quiet || echo "  ⚠️  Role may already be granted"

# Storage Admin permissions (for Container Registry)
echo "  - Granting Storage Admin role..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/storage.admin" \
    --condition=None \
    --quiet || echo "  ⚠️  Role may already be granted"

echo "✅ Permissions granted"
echo ""

# Step 5: Allow the provider to impersonate the service account
echo "🔗 Step 5: Linking Provider to Service Account..."
gcloud iam service-accounts add-iam-policy-binding \
    $SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com \
    --project=$PROJECT_ID \
    --role="roles/iam.workloadIdentityUser" \
    --member="principalSet://iam.googleapis.com/projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/$POOL_ID/attribute.repository/$REPO" \
    --quiet || echo "  ⚠️  Binding may already exist"
echo "✅ Provider linked to Service Account"
echo ""

# Step 6: Output the values
WIF_PROVIDER="projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/$POOL_ID/providers/$PROVIDER_ID"
WIF_SERVICE_ACCOUNT="$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Setup Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 Add these secrets to GitHub:"
echo ""
echo "1. Go to: https://github.com/$REPO/settings/secrets/actions"
echo ""
echo "2. Add New Secret:"
echo "   Name: WIF_PROVIDER"
echo "   Value: $WIF_PROVIDER"
echo ""
echo "3. Add New Secret:"
echo "   Name: WIF_SERVICE_ACCOUNT"
echo "   Value: $WIF_SERVICE_ACCOUNT"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Values to copy:"
echo ""
echo "WIF_PROVIDER=$WIF_PROVIDER"
echo "WIF_SERVICE_ACCOUNT=$WIF_SERVICE_ACCOUNT"
echo ""
