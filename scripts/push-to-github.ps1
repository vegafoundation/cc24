# Push to GitHub Script
# Bereitet Repository für GitHub Pages vor und pusht Code

Write-Host "🚀 CC24 GitHub Push Script" -ForegroundColor Cyan
Write-Host "===========================" -ForegroundColor Cyan
Write-Host ""

# Prüfe ob Git installiert ist
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git ist nicht installiert!" -ForegroundColor Red
    exit 1
}

# Prüfe ob im richtigen Verzeichnis
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Bitte im CC24 Projekt-Verzeichnis ausführen!" -ForegroundColor Red
    exit 1
}

# Prüfe ob Git initialisiert ist
if (-not (Test-Path ".git")) {
    Write-Host "📦 Initialisiere Git-Repository..." -ForegroundColor Yellow
    git init
    git branch -M main
}

# Prüfe ob Remote existiert
$remote = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "⚠️  Kein GitHub Remote gefunden!" -ForegroundColor Yellow
    Write-Host ""
    $repoUrl = Read-Host "GitHub Repository URL eingeben (z.B. https://github.com/USERNAME/enterprise.git)"
    
    if ($repoUrl) {
        git remote add origin $repoUrl
        Write-Host "✅ Remote hinzugefügt: $repoUrl" -ForegroundColor Green
    } else {
        Write-Host "❌ Keine URL eingegeben. Abgebrochen." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ Remote gefunden: $remote" -ForegroundColor Green
}

Write-Host ""
Write-Host "📝 Änderungen hinzufügen..." -ForegroundColor Yellow
git add .

Write-Host ""
$commitMessage = Read-Host "Commit-Message (Enter für Standard)"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Update: CC24 Website - Multi-Domain Support"
}

Write-Host "💾 Committe Änderungen..." -ForegroundColor Yellow
git commit -m $commitMessage

Write-Host ""
Write-Host "🚀 Pushe zu GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Erfolgreich zu GitHub gepusht!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Nächste Schritte:" -ForegroundColor Cyan
    Write-Host "1. GitHub Repository → Settings → Pages" -ForegroundColor White
    Write-Host "2. Source: GitHub Actions aktivieren" -ForegroundColor White
    Write-Host "3. Custom Domains hinzufügen (cc24.online, cc24.vip)" -ForegroundColor White
    Write-Host "4. DNS Records setzen (siehe DNS_RECORDS.txt)" -ForegroundColor White
    Write-Host "5. Warte auf GitHub Actions Deployment (2-5 Min)" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "❌ Push fehlgeschlagen!" -ForegroundColor Red
    Write-Host "Prüfe die Fehlermeldung oben." -ForegroundColor Yellow
}
