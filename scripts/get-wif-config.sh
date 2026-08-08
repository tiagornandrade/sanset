#!/bin/bash

# Script to get Workload Identity Federation configuration values
# Usage: ./scripts/get-wif-config.sh

set -e

PROJECT_ID="intendra-deployments"
REPO="otiagonavarro/sanset"  # Update with your actual GitHub repo

echo "🔍 Searching for Workload Identity Pools in project: $PROJECT_ID"
echo ""

# Get project number
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format="value(projectNumber)")
echo "📊 Project Number: $PROJECT_NUMBER"
echo ""

# List all workload identity pools
echo "📋 Listing Workload Identity Pools..."
POOLS=$(gcloud iam workload-identity-pools list --location=global --project=$PROJECT_ID --format="value(name)" 2>/dev/null || echo "")

if [ -z "$POOLS" ]; then
    echo "❌ No Workload Identity Pools found."
    echo ""
    echo "💡 You need to create a Workload Identity Pool first."
    echo "   Run the setup commands provided in the workflow documentation."
    exit 1
fi

echo "Found pools:"
echo "$POOLS" | while read -r pool; do
    POOL_ID=$(basename $pool)
    echo "  - $POOL_ID"
done
echo ""

# Try to find GitHub-related pools
GITHUB_POOL=$(echo "$POOLS" | grep -i "github\|pool" | head -n1 || echo "")

if [ -z "$GITHUB_POOL" ]; then
    echo "⚠️  No GitHub-related pool found. Using first pool:"
    GITHUB_POOL=$(echo "$POOLS" | head -n1)
fi

POOL_ID=$(basename $GITHUB_POOL)
echo "🔑 Using Pool: $POOL_ID"
echo ""

# List providers in the pool
echo "📋 Listing Providers in pool..."
PROVIDERS=$(gcloud iam workload-identity-pools providers list \
    --workload-identity-pool=$POOL_ID \
    --location=global \
    --project=$PROJECT_ID \
    --format="value(name)" 2>/dev/null || echo "")

if [ -z "$PROVIDERS" ]; then
    echo "❌ No providers found in pool $POOL_ID"
    echo ""
    echo "💡 You need to create a provider first."
    exit 1
fi

GITHUB_PROVIDER=$(echo "$PROVIDERS" | head -n1)
PROVIDER_ID=$(basename $GITHUB_PROVIDER)
echo "🔑 Using Provider: $PROVIDER_ID"
echo ""

# Construct WIF_PROVIDER
WIF_PROVIDER="projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/$POOL_ID/providers/$PROVIDER_ID"
echo "✅ WIF_PROVIDER:"
echo "   $WIF_PROVIDER"
echo ""

# Find service accounts
echo "📋 Searching for Service Accounts..."
SERVICE_ACCOUNTS=$(gcloud iam service-accounts list --project=$PROJECT_ID --format="value(email)" 2>/dev/null || echo "")

if [ -z "$SERVICE_ACCOUNTS" ]; then
    echo "❌ No service accounts found."
    echo ""
    echo "💡 You need to create a service account first."
    exit 1
fi

echo "Found service accounts:"
echo "$SERVICE_ACCOUNTS" | while read -r sa; do
    echo "  - $sa"
done
echo ""

# Try to find GitHub-related service account
GITHUB_SA=$(echo "$SERVICE_ACCOUNTS" | grep -i "github\|actions" | head -n1 || echo "")

if [ -z "$GITHUB_SA" ]; then
    echo "⚠️  No GitHub-related service account found. Using first SA:"
    GITHUB_SA=$(echo "$SERVICE_ACCOUNTS" | head -n1)
fi

echo "✅ WIF_SERVICE_ACCOUNT:"
echo "   $GITHUB_SA"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 Add these secrets to GitHub:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Go to: https://github.com/$REPO/settings/secrets/actions"
echo ""
echo "2. Add New Secret:"
echo "   Name: WIF_PROVIDER"
echo "   Value: $WIF_PROVIDER"
echo ""
echo "3. Add New Secret:"
echo "   Name: WIF_SERVICE_ACCOUNT"
echo "   Value: $GITHUB_SA"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
