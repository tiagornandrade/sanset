#!/bin/bash

# Quick script to enable Artifact Registry API
# Usage: ./scripts/enable-artifact-registry.sh
#
# NOTE: This API requires billing to be enabled on the project.
# If you get a billing error, enable billing first:
# https://console.cloud.google.com/billing?project=intendra-deployments

set -e

PROJECT_ID="intendra-deployments"

echo "🔧 Enabling Artifact Registry API for project: $PROJECT_ID"
echo ""
echo "ℹ️  Note: This API requires billing to be enabled on the project."
echo "   If you encounter a billing error, enable it here:"
echo "   https://console.cloud.google.com/billing?project=$PROJECT_ID"
echo ""

if gcloud services enable artifactregistry.googleapis.com --project=$PROJECT_ID; then
    echo "✅ Artifact Registry API enabled successfully!"
    echo ""
    echo "⏳ Wait 2-3 minutes for the API to propagate, then retry the workflow."
else
    echo ""
    echo "❌ Failed to enable API. Common causes:"
    echo "   1. Billing is not enabled for the project"
    echo "   2. Insufficient permissions"
    echo ""
    echo "💡 To enable billing:"
    echo "   https://console.cloud.google.com/billing?project=$PROJECT_ID"
fi

echo ""
