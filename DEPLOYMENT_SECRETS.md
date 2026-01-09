# 🔐 Deployment Secrets Configuration

## 📋 Required GitHub Secrets

### Vercel Secrets
```
VERCEL_TOKEN          - Vercel API Token (from vercel.com/account/tokens)
VERCEL_ORG_ID         - Vercel Organization ID (from vercel.com/settings)
VERCEL_PROJECT_ID     - Vercel Project ID (from project settings)
```

**How to get:**
1. Go to https://vercel.com/account/tokens
2. Create new token → Copy `VERCEL_TOKEN`
3. Go to https://vercel.com/settings → Copy `VERCEL_ORG_ID`
4. Go to project settings → Copy `VERCEL_PROJECT_ID`

### Railway Secrets
```
RAILWAY_TOKEN         - Railway API Token (from railway.app/account/tokens)
RAILWAY_PROJECT_ID    - Railway Project ID (from project settings)
RAILWAY_SERVICE_ID    - Railway Service ID (from service settings)
```

**How to get:**
1. Go to https://railway.app/account/tokens
2. Create new token → Copy `RAILWAY_TOKEN`
3. Go to project settings → Copy `RAILWAY_PROJECT_ID`
4. Go to service settings → Copy `RAILWAY_SERVICE_ID`

### Docker Hub Secrets (Optional)
```
DOCKERHUB_USERNAME    - Docker Hub username
DOCKERHUB_PASSWORD    - Docker Hub password or access token
```

**How to get:**
1. Go to https://hub.docker.com/settings/security
2. Create access token → Use as `DOCKERHUB_PASSWORD`

## 🔧 Setting Secrets in GitHub

### Via GitHub Web UI:
1. Go to Repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add each secret with name and value
4. Click **Add secret**

### Via GitHub CLI:
```bash
gh secret set VERCEL_TOKEN --body "your-token"
gh secret set VERCEL_ORG_ID --body "your-org-id"
gh secret set VERCEL_PROJECT_ID --body "your-project-id"
gh secret set RAILWAY_TOKEN --body "your-token"
gh secret set RAILWAY_PROJECT_ID --body "your-project-id"
gh secret set RAILWAY_SERVICE_ID --body "your-service-id"
```

## 📊 Workflow Requirements

### Deploy to Vercel
- ✅ Requires: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
- ✅ Auto-deploys on push to `main`
- ✅ Manual trigger: `workflow_dispatch`

### Deploy to Railway
- ✅ Requires: `RAILWAY_TOKEN`, `RAILWAY_PROJECT_ID`, `RAILWAY_SERVICE_ID`
- ✅ Auto-deploys on push to `main`
- ✅ Manual trigger: `workflow_dispatch`
- ⚠️ Optional: Only runs if `RAILWAY_TOKEN` is set

### Deploy to Docker
- ✅ Requires: `GITHUB_TOKEN` (automatic)
- ✅ Optional: `DOCKERHUB_USERNAME`, `DOCKERHUB_PASSWORD` (for Docker Hub)
- ✅ Auto-deploys on push to `main` or tags `v*`
- ✅ Manual trigger: `workflow_dispatch`

### Deploy All
- ✅ Runs all deployments in parallel
- ✅ Requires all secrets for full deployment
- ✅ Continues even if one fails

## 🎯 Quick Setup

### Minimal Setup (GitHub Pages + Docker)
```bash
# No secrets needed for GitHub Pages
# GITHUB_TOKEN is automatic for Docker (GHCR)
```

### Full Setup (All Platforms)
```bash
# Set all secrets:
gh secret set VERCEL_TOKEN --body "..."
gh secret set VERCEL_ORG_ID --body "..."
gh secret set VERCEL_PROJECT_ID --body "..."
gh secret set RAILWAY_TOKEN --body "..."
gh secret set RAILWAY_PROJECT_ID --body "..."
gh secret set RAILWAY_SERVICE_ID --body "..."
```

## ✅ Verification

### Check Secrets:
```bash
gh secret list
```

### Test Deployment:
```bash
# Trigger manual deployment
gh workflow run "Deploy All (Vercel + Railway + Docker)"
```

## 🔗 Links

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Railway CLI Documentation](https://docs.railway.app/develop/cli)
- [Docker Hub Documentation](https://docs.docker.com/docker-hub/)

---

**Status:** ✅ Ready for configuration  
**Last Updated:** 2026-01-09
