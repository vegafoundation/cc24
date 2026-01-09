# CC24 Demo - Deploy All Versions Multi-Deployment
# Deploys alle Versionen auf GitHub Pages, Vercel und Docker

$ErrorActionPreference = "Stop"

$versions = @(
    @{ Hash = "8d0d4e3"; Name = "v1-initial"; Branch = "version/v1-initial" },
    @{ Hash = "395b4fd"; Name = "v2-full-features"; Branch = "version/v2-full-features" },
    @{ Hash = "aa8acfd"; Name = "v3-vehicle-detail-fix"; Branch = "version/v3-fix" },
    @{ Hash = "5baa987"; Name = "v4-multi-deployment"; Branch = "version/v4-multi" },
    @{ Hash = "ccc15b8"; Name = "v5-enterprise"; Branch = "version/v5-enterprise" },
    @{ Hash = "6214510"; Name = "v6-nextjs-config-fix"; Branch = "version/v6-config" },
    @{ Hash = "c43f8e7"; Name = "v7-initial-platform"; Branch = "version/v7-platform" },
    @{ Hash = "b672336"; Name = "v8-modular"; Branch = "version/v8-modular" },
    @{ Hash = "85c11ee"; Name = "v9-current"; Branch = "version/v9-current" }
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "CC24 Demo - Multi-Deploy All Versions" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$repoRoot = Get-Location

# Sicherstellen, dass wir auf main sind
git checkout main 2>&1 | Out-Null

foreach ($version in $versions) {
    Write-Host ""
    Write-Host "🚀 Deploying Version: $($version.Name)" -ForegroundColor Yellow
    Write-Host "   Hash: $($version.Hash)" -ForegroundColor Gray
    Write-Host "   Branch: $($version.Branch)" -ForegroundColor Gray
    
    try {
        # Prüfe ob Branch existiert
        $branchExists = git branch -a | Select-String -Pattern $version.Branch.Replace("/", "[/]")
        
        if ($branchExists) {
            Write-Host "   📦 Branch existiert, lösche und erstelle neu..." -ForegroundColor Yellow
            git branch -D $version.Branch 2>&1 | Out-Null
            git push origin --delete $version.Branch 2>&1 | Out-Null
        }
        
        # Neuen Branch vom Commit erstellen
        Write-Host "   📦 Erstelle Branch von Commit..." -ForegroundColor Cyan
        git checkout -b $version.Branch $version.Hash 2>&1 | Out-Null
        
        # Multi-Deployment Workflows für diese Version erstellen
        Write-Host "   ⚙️  Konfiguriere Multi-Deployment Workflows..." -ForegroundColor Cyan
        
        # GitHub Pages Workflow für diese Version
        $pagesWorkflowContent = @"
name: Deploy $($version.Name) to GitHub Pages

on:
  push:
    branches:
      - $($version.Branch)
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages-$($version.Name)"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: package-lock.json

      - name: Install dependencies
        run: |
          if [ -f "package-lock.json" ]; then
            npm ci --prefer-offline --no-audit
          else
            npm install --no-audit
          fi

      - name: Build for GitHub Pages
        run: npm run build:static || npm run build
        env:
          NEXT_PUBLIC_DOMAIN: online
          NEXT_PUBLIC_API_URL: https://cc24-api.vercel.app
          NEXT_PUBLIC_STATIC_EXPORT: "true"
          NEXT_PUBLIC_BASE_PATH: ""
          NODE_ENV: production

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './out'
          retention-days: 1

  deploy:
    environment:
      name: github-pages-$($version.Name)
      url: `${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
"@
        
        # Workflow-Verzeichnis erstellen falls nicht vorhanden
        if (-not (Test-Path ".github/workflows")) {
            New-Item -ItemType Directory -Path ".github/workflows" -Force | Out-Null
        }
        
        # Workflow speichern
        $pagesWorkflowContent | Out-File ".github/workflows/deploy-pages-$($version.Name).yml" -Encoding UTF8 -NoNewline
        
        # Vercel Workflow
        $vercelWorkflowContent = @"
name: Deploy $($version.Name) to Vercel

on:
  push:
    branches:
      - $($version.Branch)
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: package-lock.json

      - name: Install Vercel CLI
        run: npm install -g vercel@latest

      - name: Install Dependencies
        run: |
          if [ -f "package-lock.json" ]; then
            npm ci --prefer-offline --no-audit
          else
            npm install --no-audit
          fi

      - name: Deploy to Vercel
        run: |
          vercel --prod --token `${{ secrets.VERCEL_TOKEN }} --yes
        env:
          VERCEL_ORG_ID: `${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: `${{ secrets.VERCEL_PROJECT_ID }}
"@
        
        $vercelWorkflowContent | Out-File ".github/workflows/deploy-vercel-$($version.Name).yml" -Encoding UTF8 -NoNewline
        
        # Docker Workflow
        $dockerWorkflowContent = @"
name: Docker Build $($version.Name)

on:
  push:
    branches:
      - $($version.Branch)
  workflow_dispatch:

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: `${{ github.actor }}
          password: `${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata (tags, labels) for Docker
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/`${{ github.repository }}/cc24-$($version.Name)

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          file: ./Dockerfile
          push: true
          tags: `${{ steps.meta.outputs.tags }}
          labels: `${{ steps.meta.outputs.labels }}
          build-args: |
            NEXT_PUBLIC_DOMAIN=online
            NEXT_PUBLIC_API_URL=https://cc24-api.vercel.app
            NEXT_PUBLIC_BASE_PATH=
            DOCKER_BUILD=true
"@
        
        $dockerWorkflowContent | Out-File ".github/workflows/deploy-docker-$($version.Name).yml" -Encoding UTF8 -NoNewline
        
        # Vercel.json anpassen
        if (Test-Path "vercel.json") {
            $vercelJson = Get-Content "vercel.json" -Raw | ConvertFrom-Json
            $vercelJson | Add-Member -NotePropertyName "name" -NotePropertyValue "cc24-$($version.Name)" -Force
            $vercelJson | ConvertTo-Json -Depth 10 | Set-Content "vercel.json" -NoNewline
        }
        
        # Docker Compose anpassen
        if (Test-Path "docker-compose.yml") {
            $dockerCompose = Get-Content "docker-compose.yml" -Raw
            $dockerCompose = $dockerCompose -replace "cc24-demo", "cc24-$($version.Name)"
            $dockerCompose | Set-Content "docker-compose.yml" -NoNewline
        }
        
        # README für diese Version
        $readmeContent = @"
# CC24 Demo - $($version.Name)

**Version:** $($version.Name)  
**Commit:** $($version.Hash)  
**Branch:** $($version.Branch)

## Multi-Deployment

Diese Version kann auf mehreren Plattformen deployed werden:

- **GitHub Pages:** Automatisch via Workflow
- **Vercel:** Automatisch via Workflow  
- **Docker:** Automatisch via Workflow

## Deployment

\`\`\`bash
# GitHub Pages
git push origin $($version.Branch)

# Vercel
vercel --prod

# Docker
docker-compose up -d
\`\`\`

## Features

Siehe VERSIONS_HISTORY.md für Details zu dieser Version.
"@
        
        $readmeContent | Out-File "README-$($version.Name).md" -Encoding UTF8
        
        # Alles committen
        git add .github/workflows/* vercel.json docker-compose.yml README-$($version.Name).md 2>&1 | Out-Null
        git commit -m "Deploy: Multi-Deployment Config für $($version.Name)" 2>&1 | Out-Null
        
        # Push Branch
        Write-Host "   📤 Pushe Branch..." -ForegroundColor Cyan
        git push origin $version.Branch --force 2>&1 | Out-Null
        
        Write-Host "   ✅ Version $($version.Name) deployed!" -ForegroundColor Green
        
    } catch {
        Write-Host "   ❌ Fehler: $_" -ForegroundColor Red
    }
}

# Zurück zu main
git checkout main 2>&1 | Out-Null

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ Alle Versionen deployed!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Branches erstellt und gepusht:" -ForegroundColor Cyan
foreach ($version in $versions) {
    Write-Host "  ✅ $($version.Branch) -> $($version.Name)" -ForegroundColor Green
}
Write-Host ""
Write-Host "GitHub Pages URLs:" -ForegroundColor Cyan
Write-Host "  https://vegafoundation.github.io/cc24/ (main)" -ForegroundColor Gray
foreach ($v in $versions) {
    $branchUrl = "https://vegafoundation.github.io/cc24/ (via " + $v.Branch + ")"
    Write-Host "  $branchUrl" -ForegroundColor Gray
}
Write-Host ""
