# Auto-Push zu GitHub mit lokalen Credentials
# Erstellt Repository und pusht automatisch

Write-Host "🚀 CC24 Auto-Push zu GitHub" -ForegroundColor Cyan
Write-Host "============================" -ForegroundColor Cyan
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

# Git initialisieren falls nötig
if (-not (Test-Path ".git")) {
    Write-Host "📦 Initialisiere Git..." -ForegroundColor Yellow
    git init
    git branch -M main
}

# Prüfe ob bereits committed
$hasCommits = git rev-parse --verify HEAD 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "📝 Erstelle ersten Commit..." -ForegroundColor Yellow
    git add .
    git commit -m "v1.0.0: CC24 Kunden-Demo Fullstack - Multi-Domain Support für CC24.ONLINE und CC24.VIP mit GitHub Pages Deployment"
}

# Prüfe Remote
$remote = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "⚠️  Kein GitHub Remote gefunden!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Erstelle zuerst ein GitHub Repository:" -ForegroundColor White
    Write-Host "1. Gehe zu: https://github.com/new" -ForegroundColor Gray
    Write-Host "2. Repository Name: enterprise (oder cc24-demo)" -ForegroundColor Gray
    Write-Host "3. Public (für GitHub Pages)" -ForegroundColor Gray
    Write-Host "4. Create repository" -ForegroundColor Gray
    Write-Host ""
    $repoUrl = Read-Host "GitHub Repository URL (z.B. https://github.com/USERNAME/enterprise.git)"
    
    if ($repoUrl) {
        git remote add origin $repoUrl
        Write-Host "✅ Remote hinzugefügt" -ForegroundColor Green
    } else {
        Write-Host "❌ Abgebrochen" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ Remote gefunden: $remote" -ForegroundColor Green
}

# Push
Write-Host ""
Write-Host "🚀 Pushe zu GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Erfolgreich gepusht!" -ForegroundColor Green
    Write-Host ""
    
    # Extrahiere Username und Repo aus URL
    if ($remote -match 'github\.com[/:]([^/]+)/([^/]+)\.git') {
        $username = $matches[1]
        $repo = $repoName = $matches[2] -replace '\.git$', ''
        
        Write-Host "📋 GitHub Pages Setup:" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "1. Gehe zu: https://github.com/$username/$repo/settings/pages" -ForegroundColor White
        Write-Host "2. Source: GitHub Actions" -ForegroundColor Gray
        Write-Host "3. Branch: main" -ForegroundColor Gray
        Write-Host "4. Save" -ForegroundColor Gray
        Write-Host ""
        Write-Host "5. Custom Domains hinzufügen:" -ForegroundColor White
        Write-Host "   - cc24.online" -ForegroundColor Gray
        Write-Host "   - cc24.vip" -ForegroundColor Gray
        Write-Host ""
        Write-Host "🌐 Links:" -ForegroundColor Cyan
        Write-Host "   Repository: https://github.com/$username/$repo" -ForegroundColor White
        Write-Host "   GitHub Pages: https://$username.github.io/$repo/" -ForegroundColor White
        Write-Host "   (Nach DNS Setup: https://cc24.online und https://cc24.vip)" -ForegroundColor Gray
    }
} else {
    Write-Host ""
    Write-Host "❌ Push fehlgeschlagen!" -ForegroundColor Red
    Write-Host "Prüfe Git Credentials oder Repository-URL" -ForegroundColor Yellow
}
