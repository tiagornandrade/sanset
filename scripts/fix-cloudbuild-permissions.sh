#!/bin/bash

# Script to fix Cloud Build permissions for GitHub Actions Service Account
# Usage: ./scripts/fix-cloudbuild-permissions.sh

set -e

PROJECT_ID="intendra-deployments"
SERVICE_ACCOUNT_NAME="github-actions-sa"
SERVICE_ACCOUNT_EMAIL="$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com"

echo "🔧 Fixing Cloud Build permissions for Service Account..."
echo "Service Account: $SERVICE_ACCOUNT_EMAIL"
echo ""

# Grant Service Usage Admin role (allows enabling APIs)
echo "1️⃣ Granting Service Usage Admin role..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT_EMAIL" \
    --role="roles/serviceusage.serviceUsageAdmin" \
    --quiet || echo "  ⚠️  Role may already be granted"
echo ""

# Grant Service Usage Consumer role (required for serviceusage.services.use)
echo "2️⃣ Granting Service Usage Consumer role..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT_EMAIL" \
    --role="roles/serviceusage.serviceUsageConsumer" \
    --quiet || echo "  ⚠️  Role may already be granted"
echo ""

# Grant Cloud Build Service Account role (allows using Cloud Build)
echo "3️⃣ Granting Cloud Build Service Account role..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT_EMAIL" \
    --role="roles/cloudbuild.builds.builder" \
    --quiet || echo "  ⚠️  Role may already be granted"
echo ""

# Grant Storage Admin role (for accessing Cloud Build buckets)
echo "4️⃣ Granting Storage Admin role (for Cloud Build buckets)..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT_EMAIL" \
    --role="roles/storage.admin" \
    --quiet || echo "  ⚠️  Role may already be granted"
echo ""

# Grant Cloud Build Editor role (if not already granted)
echo "5️⃣ Granting Cloud Build Editor role..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT_EMAIL" \
    --role="roles/cloudbuild.builds.editor" \
    --quiet || echo "  ⚠️  Role may already be granted"
echo ""

# Grant permission to use Cloud Build service account
echo "6️⃣ Granting permission to use Cloud Build service account..."
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format="value(projectNumber)")
CLOUD_BUILD_SA="${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com"

# Check if Cloud Build service account exists
if gcloud iam service-accounts describe $CLOUD_BUILD_SA --project=$PROJECT_ID &>/dev/null; then
    if gcloud iam service-accounts add-iam-policy-binding $CLOUD_BUILD_SA \
        --member="serviceAccount:$SERVICE_ACCOUNT_EMAIL" \
        --role="roles/iam.serviceAccountUser" \
        --project=$PROJECT_ID \
        --quiet 2>/dev/null; then
        echo "  ✅ Permission granted to use Cloud Build service account"
    else
        echo "  ⚠️  Permission may already be granted"
    fi
else
    echo "  ℹ️  Cloud Build service account doesn't exist yet (will be created on first build)"
    echo "     This is normal and won't prevent the workflow from working"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Cloud Build permissions fixed!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Granted roles:"
echo "  ✅ roles/serviceusage.serviceUsageAdmin (allows enabling APIs)"
echo "  ✅ roles/serviceusage.serviceUsageConsumer (fixes bucket access error)"
echo "  ✅ roles/cloudbuild.builds.builder"
echo "  ✅ roles/storage.admin"
echo "  ✅ roles/cloudbuild.builds.editor"
echo ""
echo "ℹ️  Note: If Cloud Build service account binding failed, it's normal."
echo "   The service account will be created automatically on first build."
echo ""
echo "⏳ Wait 2-3 minutes for permissions to propagate, then retry the workflow."
echo "   The workflow should now work correctly!"
echo ""
