#!/bin/bash

# Script to fix Service Usage permissions for GitHub Actions Service Account
# This allows the service account to enable APIs automatically
# Usage: ./scripts/fix-service-usage-permissions.sh

set -e

PROJECT_ID="intendra-deployments"
SERVICE_ACCOUNT_NAME="github-actions-sa"
SERVICE_ACCOUNT_EMAIL="$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com"

echo "🔧 Fixing Service Usage permissions for Service Account..."
echo "Service Account: $SERVICE_ACCOUNT_EMAIL"
echo ""

# Grant Service Usage Admin role (allows enabling APIs)
echo "1️⃣ Granting Service Usage Admin role..."
if gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT_EMAIL" \
    --role="roles/serviceusage.serviceUsageAdmin" \
    --quiet; then
    echo "  ✅ Service Usage Admin role granted"
else
    echo "  ⚠️  Role may already be granted"
fi
echo ""

# Grant Service Usage Consumer role (required for using services)
echo "2️⃣ Granting Service Usage Consumer role..."
if gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT_EMAIL" \
    --role="roles/serviceusage.serviceUsageConsumer" \
    --quiet; then
    echo "  ✅ Service Usage Consumer role granted"
else
    echo "  ⚠️  Role may already be granted"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Service Usage permissions fixed!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Granted roles:"
echo "  ✅ roles/serviceusage.serviceUsageAdmin (allows enabling APIs)"
echo "  ✅ roles/serviceusage.serviceUsageConsumer (allows using services)"
echo ""
echo "💡 The service account can now enable APIs automatically when needed."
echo ""
