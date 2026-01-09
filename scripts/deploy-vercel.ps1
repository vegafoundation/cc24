# Vercel Deployment Script für CC24.ONLINE & CC24.VIP
# PowerShell Script

Write-Host "🚀 CC24 Deployment Script" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

# Prüfe ob Vercel CLI installiert ist
if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Vercel CLI nicht gefunden!" -ForegroundColor Red
    Write-Host "Installiere mit: npm i -g vercel" -ForegroundColor Yellow
    npm i -g vercel
}

# Prüfe ob im richtigen Verzeichnis
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Bitte im CC24 Projekt-Verzeichnis ausführen!" -ForegroundColor Red
    exit 1
}

Write-Host "📦 Installiere Dependencies..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "🔨 Erstelle Production Build..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build fehlgeschlagen!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Build erfolgreich!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Deployment-Optionen:" -ForegroundColor Cyan
Write-Host "1. Preview Deployment (testen)" -ForegroundColor White
Write-Host "2. Production Deployment (cc24.online)" -ForegroundColor White
Write-Host "3. Production Deployment (cc24.vip)" -ForegroundColor White
Write-Host "4. Beide Domains deployen" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Wähle Option (1-4)"

switch ($choice) {
    "1" {
        Write-Host "🚀 Preview Deployment..." -ForegroundColor Yellow
        vercel
    }
    "2" {
        Write-Host "🚀 Production Deployment für CC24.ONLINE..." -ForegroundColor Yellow
        Write-Host "⚠️  Stelle sicher, dass cc24.online in Vercel verbunden ist!" -ForegroundColor Yellow
        vercel --prod
    }
    "3" {
        Write-Host "🚀 Production Deployment für CC24.VIP..." -ForegroundColor Yellow
        Write-Host "⚠️  Stelle sicher, dass cc24.vip in Vercel verbunden ist!" -ForegroundColor Yellow
        vercel --prod
    }
    "4" {
        Write-Host "🚀 Production Deployment für beide Domains..." -ForegroundColor Yellow
        vercel --prod
    }
    default {
        Write-Host "❌ Ungültige Option!" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "✅ Deployment abgeschlossen!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Nächste Schritte:" -ForegroundColor Cyan
Write-Host "1. Prüfe DNS Records (siehe docs/DNS_DEPLOYMENT.md)" -ForegroundColor White
Write-Host "2. Warte auf DNS Propagation (5-60 Min)" -ForegroundColor White
Write-Host "3. Teste https://cc24.online und https://cc24.vip" -ForegroundColor White
Write-Host "4. Prüfe SSL-Zertifikate (automatisch bei Vercel)" -ForegroundColor White
