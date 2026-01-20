#!/bin/bash

# Script to fix Cloud Build Editor role for GitHub Actions Service Account
# Usage: ./scripts/fix-cloudbuild-role.sh

set -e

PROJECT_ID="intendra-deployments"
SERVICE_ACCOUNT_NAME="github-actions-sa"

echo "🔧 Fixing Cloud Build Editor role..."
echo ""

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/cloudbuild.builds.editor"

echo ""
echo "✅ Cloud Build Editor role granted successfully!"
