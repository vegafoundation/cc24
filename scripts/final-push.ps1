# Final Push Script - CC24 v1.0.0
# Automatischer Push zu GitHub mit lokalen Credentials

Write-Host "🚀 CC24 v1.0.0 - Final Push zu GitHub" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
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

# Prüfe ob committed
$hasCommits = git rev-parse --verify HEAD 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "📝 Erstelle Commit..." -ForegroundColor Yellow
    git add .
    git commit -m "v1.0.0: CC24 Kunden-Demo Fullstack - Multi-Domain Support für CC24.ONLINE und CC24.VIP mit GitHub Pages Deployment"
}

# Prüfe Remote
$remote = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "⚠️  Kein GitHub Remote gefunden!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📋 Erstelle zuerst ein GitHub Repository:" -ForegroundColor White
    Write-Host "   1. Gehe zu: https://github.com/new" -ForegroundColor Gray
    Write-Host "   2. Repository Name: enterprise (oder cc24-demo)" -ForegroundColor Gray
    Write-Host "   3. Public (für GitHub Pages)" -ForegroundColor Gray
    Write-Host "   4. NICHT README, .gitignore oder License hinzufügen" -ForegroundColor Gray
    Write-Host "   5. Create repository" -ForegroundColor Gray
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

# Push
Write-Host ""
Write-Host "🚀 Pushe zu GitHub..." -ForegroundColor Yellow
Write-Host "   (Verwendet lokale Git Credentials)" -ForegroundColor Gray
Write-Host ""

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅✅✅ ERFOLGREICH GEPUSHT! ✅✅✅" -ForegroundColor Green
    Write-Host ""
    
    # Extrahiere Username und Repo
    if ($remote -match 'github\.com[/:]([^/]+)/([^/]+)\.git') {
        $username = $matches[1]
        $repo = $matches[2] -replace '\.git$', ''
        
        Write-Host "🎉 CC24 v1.0.0 ist jetzt auf GitHub!" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "📋 GitHub Pages aktivieren:" -ForegroundColor Yellow
        Write-Host "   1. Gehe zu: https://github.com/$username/$repo/settings/pages" -ForegroundColor White
        Write-Host "   2. Source: GitHub Actions" -ForegroundColor Gray
        Write-Host "   3. Branch: main" -ForegroundColor Gray
        Write-Host "   4. Save" -ForegroundColor Gray
        Write-Host ""
        Write-Host "   5. Custom Domains hinzufügen:" -ForegroundColor White
        Write-Host "      - cc24.online" -ForegroundColor Gray
        Write-Host "      - cc24.vip" -ForegroundColor Gray
        Write-Host ""
        Write-Host "🔗 Links:" -ForegroundColor Cyan
        Write-Host "   Repository: https://github.com/$username/$repo" -ForegroundColor White
        Write-Host "   GitHub Pages: https://$username.github.io/$repo/" -ForegroundColor White
        Write-Host "   (Nach DNS: https://cc24.online und https://cc24.vip)" -ForegroundColor Gray
        Write-Host ""
        Write-Host "✅ Deployment Status: Code gepusht, GitHub Pages muss aktiviert werden" -ForegroundColor Green
    }
} else {
    Write-Host ""
    Write-Host "❌ Push fehlgeschlagen!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Mögliche Ursachen:" -ForegroundColor Yellow
    Write-Host "   - Falsche Repository URL" -ForegroundColor Gray
    Write-Host "   - Keine Git Credentials konfiguriert" -ForegroundColor Gray
    Write-Host "   - Kein Zugriff auf Repository" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Lösung:" -ForegroundColor Yellow
    Write-Host "   git config --global user.name 'Dein Name'" -ForegroundColor Gray
    Write-Host "   git config --global user.email 'deine@email.com'" -ForegroundColor Gray
    Write-Host "   Oder verwende GitHub Personal Access Token" -ForegroundColor Gray
}
