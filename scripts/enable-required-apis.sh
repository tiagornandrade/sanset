#!/bin/bash

# Script to enable all required APIs for Cloud Build and Cloud Run
# Usage: ./scripts/enable-required-apis.sh

set -e

PROJECT_ID="intendra-deployments"

echo "🔧 Enabling required APIs for project: $PROJECT_ID"
echo ""

# List of required APIs
APIS=(
    "iamcredentials.googleapis.com"           # IAM Service Account Credentials API
    "cloudbuild.googleapis.com"               # Cloud Build API
    "run.googleapis.com"                      # Cloud Run API
    "containerregistry.googleapis.com"        # Container Registry API
    "storage-api.googleapis.com"              # Cloud Storage API
    "storage-component.googleapis.com"        # Cloud Storage Component API
    "iam.googleapis.com"                      # Identity and Access Management API
)

echo "📋 Enabling APIs..."
echo ""

for api in "${APIS[@]}"; do
    echo "  - Enabling $api..."
    if gcloud services enable $api --project=$PROJECT_ID 2>/dev/null; then
        echo "    ✅ $api enabled"
    else
        echo "    ⚠️  $api may already be enabled or failed"
    fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ API enablement complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "⏳ Note: It may take a few minutes for APIs to fully propagate."
echo "   If you still see errors, wait 2-3 minutes and retry."
echo ""
