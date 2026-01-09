# Quick Deploy Script für GitHub Pages
# Alles-in-einem Script für schnelles Deployment

Write-Host "🚀 CC24 Quick Deploy - GitHub Pages" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Prüfe Git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git nicht installiert!" -ForegroundColor Red
    exit 1
}

# Prüfe Verzeichnis
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Bitte im CC24 Verzeichnis ausführen!" -ForegroundColor Red
    exit 1
}

# Git initialisieren
if (-not (Test-Path ".git")) {
    Write-Host "📦 Initialisiere Git..." -ForegroundColor Yellow
    git init
    git branch -M main
}

# Remote prüfen
$remote = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "⚠️  Kein GitHub Remote gefunden!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Erstelle zuerst ein GitHub Repository:" -ForegroundColor White
    Write-Host "1. Gehe zu: https://github.com/new" -ForegroundColor Gray
    Write-Host "2. Repository Name: enterprise" -ForegroundColor Gray
    Write-Host "3. Create repository" -ForegroundColor Gray
    Write-Host ""
    $repoUrl = Read-Host "GitHub Repository URL (z.B. https://github.com/USERNAME/enterprise.git)"
    
    if ($repoUrl) {
        git remote add origin $repoUrl
        Write-Host "✅ Remote hinzugefügt" -ForegroundColor Green
    } else {
        Write-Host "❌ Abgebrochen" -ForegroundColor Red
        exit 1
    }
}

# Alles hinzufügen
Write-Host ""
Write-Host "📝 Änderungen hinzufügen..." -ForegroundColor Yellow
git add .

# Commit
$hasChanges = git diff --cached --quiet
if (-not $hasChanges) {
    $commitMsg = Read-Host "Commit-Message (Enter für Standard)"
    if ([string]::IsNullOrWhiteSpace($commitMsg)) {
        $commitMsg = "Deploy: CC24 Website - Multi-Domain Support für CC24.ONLINE und CC24.VIP"
    }
    git commit -m $commitMsg
} else {
    Write-Host "ℹ️  Keine Änderungen zum Committen" -ForegroundColor Gray
}

# Push
Write-Host ""
Write-Host "🚀 Pushe zu GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Erfolgreich gepusht!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Nächste Schritte:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. GitHub Pages aktivieren:" -ForegroundColor White
    Write-Host "   Repository → Settings → Pages" -ForegroundColor Gray
    Write-Host "   Source: GitHub Actions" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Custom Domains hinzufügen:" -ForegroundColor White
    Write-Host "   Settings → Pages → Custom domain" -ForegroundColor Gray
    Write-Host "   - cc24.online" -ForegroundColor Gray
    Write-Host "   - cc24.vip" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3. DNS Records setzen:" -ForegroundColor White
    Write-Host "   Siehe: DNS_RECORDS.txt" -ForegroundColor Gray
    Write-Host "   Alle 4 GitHub Pages IPs als A-Records" -ForegroundColor Gray
    Write-Host ""
    Write-Host "4. Warten:" -ForegroundColor White
    Write-Host "   - GitHub Actions: 2-5 Minuten" -ForegroundColor Gray
    Write-Host "   - DNS Propagation: 5-60 Minuten" -ForegroundColor Gray
    Write-Host ""
    Write-Host "✅ Deployment gestartet!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "❌ Push fehlgeschlagen!" -ForegroundColor Red
    Write-Host "Prüfe die Fehlermeldung oben." -ForegroundColor Yellow
}
