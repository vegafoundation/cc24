# Docker Deployment Script für Windows PowerShell

Write-Host "🐳 CC24 Demo - Docker Deployment" -ForegroundColor Cyan
Write-Host ""

# Prüfe ob Docker installiert ist
$dockerInstalled = Get-Command docker -ErrorAction SilentlyContinue
if (-not $dockerInstalled) {
    Write-Host "❌ Docker nicht gefunden!" -ForegroundColor Red
    Write-Host "📥 Installiere Docker Desktop: https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
    exit 1
}

# Prüfe ob Docker läuft
$dockerRunning = docker info 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker läuft nicht!" -ForegroundColor Red
    Write-Host "🚀 Starte Docker Desktop..." -ForegroundColor Yellow
    exit 1
}

# Wechsle ins Root Verzeichnis
$rootDir = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
Set-Location $rootDir

Write-Host "📁 Aktuelles Verzeichnis: $(Get-Location)" -ForegroundColor Green
Write-Host ""

# Prüfe ob .env Datei existiert
if (-not (Test-Path ".env")) {
    Write-Host "📝 Erstelle .env Datei..." -ForegroundColor Yellow
    @"
NEXT_PUBLIC_DOMAIN=online
NEXT_PUBLIC_API_URL=https://cc24-api.vercel.app
NEXT_PUBLIC_BASE_PATH=
NEXT_PUBLIC_GA_ID_ONLINE=
NEXT_PUBLIC_GA_ID_VIP=
"@ | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "✅ .env Datei erstellt" -ForegroundColor Green
    Write-Host "⚠️  Bitte .env Datei anpassen!" -ForegroundColor Yellow
}

# Stoppe bestehende Container
Write-Host "🛑 Stoppe bestehende Container..." -ForegroundColor Yellow
docker-compose -f docker-compose.demo.yml down 2>$null

# Baue und starte Container
Write-Host "🏗️  Baue Docker Image..." -ForegroundColor Cyan
docker-compose -f docker-compose.demo.yml build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build erfolgreich!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 Starte Container..." -ForegroundColor Cyan
    docker-compose -f docker-compose.demo.yml up -d
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Container gestartet!" -ForegroundColor Green
        Write-Host "🌐 URL: http://localhost:3000" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "📊 Container Status:" -ForegroundColor Yellow
        docker-compose -f docker-compose.demo.yml ps
        Write-Host ""
        Write-Host "📝 Logs ansehen: docker-compose -f docker-compose.demo.yml logs -f" -ForegroundColor Gray
        Write-Host "🛑 Stoppen: docker-compose -f docker-compose.demo.yml down" -ForegroundColor Gray
    } else {
        Write-Host "❌ Fehler beim Starten der Container!" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Build fehlgeschlagen!" -ForegroundColor Red
}
