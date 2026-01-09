# Vercel Deployment Script für Windows PowerShell

Write-Host "🚀 CC24 Demo - Vercel Deployment" -ForegroundColor Cyan
Write-Host ""

# Prüfe ob Vercel CLI installiert ist
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelInstalled) {
    Write-Host "❌ Vercel CLI nicht gefunden!" -ForegroundColor Red
    Write-Host "📦 Installiere Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

# Wechsle ins cc24.demo Verzeichnis
Set-Location $PSScriptRoot\..

Write-Host "📁 Aktuelles Verzeichnis: $(Get-Location)" -ForegroundColor Green
Write-Host ""

# Prüfe ob .vercel Ordner existiert
if (Test-Path ".vercel") {
    Write-Host "✅ Vercel Projekt bereits initialisiert" -ForegroundColor Green
    Write-Host "🚀 Starte Production Deployment..." -ForegroundColor Cyan
    vercel --prod
} else {
    Write-Host "🆕 Initialisiere neues Vercel Projekt..." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📝 Bitte folgende Fragen beantworten:" -ForegroundColor Cyan
    Write-Host "   - Link zu bestehendem Projekt? N" -ForegroundColor Gray
    Write-Host "   - Projektname: cc24-demo" -ForegroundColor Gray
    Write-Host "   - Verzeichnis: ." -ForegroundColor Gray
    Write-Host ""
    vercel
}

Write-Host ""
Write-Host "✅ Deployment abgeschlossen!" -ForegroundColor Green
Write-Host "🌐 URL: https://cc24-demo.vercel.app" -ForegroundColor Cyan
