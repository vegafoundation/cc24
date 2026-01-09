# 🐳 Docker Deployment - Multi-Registry Support

## 📦 Supported Registries

The workflow supports pushing to:
1. **GitHub Container Registry (ghcr.io)** - Default, no additional secrets needed
2. **Docker Hub** - Optional, supports custom image names (e.g., `anlaetan/vega`)

---

## 🚀 Docker Hub Push - Custom Image Names

### Setup for Docker Hub (e.g., `anlaetan/vega:tagname`)

To push to Docker Hub with a custom image name, configure these repository secrets:

**Required Secrets (GitHub Settings → Secrets → Actions):**

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username | `anlaetan` |
| `DOCKERHUB_PASSWORD` | Docker Hub access token | `dckr_pat_xxx...` |
| `DOCKERHUB_IMAGE` | Full image name (optional) | `anlaetan/vega` |

### Option 1: Automatic Push (Recommended)

After setting up secrets, the workflow automatically pushes on:
- Push to `main` branch → `anlaetan/vega:main`, `anlaetan/vega:latest`
- Push tag `v1.0.0` → `anlaetan/vega:1.0.0`

### Option 2: Manual Push with Custom Tag

1. Go to **Actions** → **Deploy to Docker (Multi-Registry)**
2. Click **Run workflow**
3. Enter:
   - `dockerhub_image`: `anlaetan/vega`
   - `tag`: `tagname` (your custom tag)
4. Click **Run workflow**

This will push: `docker push anlaetan/vega:tagname`

### Pull the Image

```bash
# Pull latest
docker pull anlaetan/vega:latest

# Pull specific tag
docker pull anlaetan/vega:tagname

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_DOMAIN=online \
  -e NEXT_PUBLIC_API_URL=https://cc24-api.vercel.app \
  anlaetan/vega:tagname
```

---

## 🔐 Getting Docker Hub Access Token

1. Go to [Docker Hub](https://hub.docker.com) → Account Settings → Security
2. Click **New Access Token**
3. Name: `github-actions`
4. Permissions: **Read, Write, Delete**
5. Copy the token and save it as `DOCKERHUB_PASSWORD` secret

---

## 📋 GitHub Container Registry (Default)

### Registry
- **Registry:** `ghcr.io`
- **Image:** `ghcr.io/vegafoundation/cc24/cc24-demo`
- **Tags:** Automatisch generiert (branch, sha, semver, latest)

### Tags
- `main` - Latest from main branch
- `main-<sha>` - Specific commit
- `v1.0.0` - Semantic version tags
- `latest` - Latest stable (main branch)

### Pull Image
```bash
docker pull ghcr.io/vegafoundation/cc24/cc24-demo:main
```

### Run Container
```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_DOMAIN=online \
  -e NEXT_PUBLIC_API_URL=https://cc24-api.vercel.app \
  ghcr.io/vegafoundation/cc24/cc24-demo:main
```

### Docker Compose
```yaml
services:
  cc24-demo:
    image: ghcr.io/vegafoundation/cc24/cc24-demo:main
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_DOMAIN=online
      - NEXT_PUBLIC_API_URL=https://cc24-api.vercel.app
```

## 🔐 Authentication

### GitHub Token (GHCR)
- Automatisch verfügbar via `GITHUB_TOKEN`
- Keine zusätzlichen Secrets nötig
- Berechtigung: `packages: write`

### Public Access
- Images sind standardmäßig privat
- Für öffentlichen Zugriff: Package Settings → Change visibility

## 📊 Build Features

### Buildx
- Multi-platform support
- Build caching (GitHub Actions Cache)
- Optimized builds

### Cache
- `cache-from: type=gha` - GitHub Actions Cache
- `cache-to: type=gha,mode=max` - Maximale Cache-Nutzung

## 🔗 Links

- **GitHub Packages:** https://github.com/vegafoundation/cc24/pkgs/container/cc24-demo
- **Workflow:** `.github/workflows/deploy-docker.yml`
- **Dockerfile:** `./Dockerfile`

## ✅ Status

- ✅ Workflow supports ghcr.io (default)
- ✅ Workflow supports Docker Hub with custom image names
- ✅ Manual workflow_dispatch with custom image and tag
- ✅ GITHUB_TOKEN automatically available for GHCR
- ✅ Docker Hub requires DOCKERHUB_USERNAME and DOCKERHUB_PASSWORD secrets

---

**Letzte Aktualisierung:** 2026-01-09  
**Status:** ✅ Multi-Registry support implemented
