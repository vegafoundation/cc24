# 🐳 Docker Deployment - GitHub Container Registry

## ✅ Fix: Docker Hub → GitHub Container Registry

**Problem:** Docker Hub Credentials fehlten  
**Lösung:** Umstellung auf GitHub Container Registry (ghcr.io)

## 🔧 Änderungen

### Vorher (Docker Hub)
```yaml
- name: Login to Docker Hub
  uses: docker/login-action@v3
  with:
    username: ${{ secrets.DOCKER_USERNAME }}
    password: ${{ secrets.DOCKER_PASSWORD }}
```

### Nachher (GitHub Container Registry)
```yaml
- name: Log in to GitHub Container Registry
  uses: docker/login-action@v3
  with:
    registry: ghcr.io
    username: ${{ github.actor }}
    password: ${{ secrets.GITHUB_TOKEN }}
```

## 📦 Image Details

### Registry
- **Registry:** `ghcr.io`
- **Image:** `ghcr.io/vegafoundation/cc24/cc24-demo`
- **Tags:** Automatisch generiert (branch, sha, semver, latest)

### Tags
- `main` - Latest from main branch
- `main-<sha>` - Specific commit
- `v1.0.0` - Semantic version tags
- `latest` - Latest stable (main branch)

## 🚀 Verwendung

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

### GitHub Token
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

- ✅ Workflow umgestellt auf ghcr.io
- ✅ GITHUB_TOKEN automatisch verfügbar
- ✅ Keine zusätzlichen Secrets nötig
- ✅ Build sollte jetzt erfolgreich sein

---

**Letzte Aktualisierung:** 2026-01-09  
**Status:** ✅ Fix implementiert
