# Master Push Script - CC24 v1.0.0 FULLSTACK
# VAVSR vollständig integriert mit ML Worker

Write-Host "🚀 CC24 v1.0.0 MASTER PUSH - FULLSTACK" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

Write-Host "✅ VAVSR Features:" -ForegroundColor Green
Write-Host "   - 360° Showroom mit 8-Bild Sequenz" -ForegroundColor Gray
Write-Host "   - ML Background Removal (Rembg, BiRefNet, U2Net)" -ForegroundColor Gray
Write-Host "   - FastAPI Backend Integration" -ForegroundColor Gray
Write-Host "   - Docker Compose mit ML Worker" -ForegroundColor Gray
Write-Host "   - Multi-Domain Support (CC24.ONLINE & CC24.VIP)" -ForegroundColor Gray
Write-Host "   - GitHub Pages Ready" -ForegroundColor Gray
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

# Prüfe Commit
$lastCommit = git log --oneline -1 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Letzter Commit:" -ForegroundColor Green
    Write-Host "   $lastCommit" -ForegroundColor Gray
    Write-Host ""
} else {
    Write-Host "⚠️  Noch kein Commit vorhanden!" -ForegroundColor Yellow
    Write-Host "   Erstelle Master Commit..." -ForegroundColor Yellow
    git add .
    git commit -m "MASTER: CC24 v1.0.0 FULLSTACK - VAVSR vollständig integriert"
}

# Prüfe Remote
$remote = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "⚠️  Kein GitHub Remote gefunden!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📋 Erstelle GitHub Repository:" -ForegroundColor White
    Write-Host "   1. Gehe zu: https://github.com/new" -ForegroundColor Gray
    Write-Host "   2. Repository Name: enterprise (oder cc24-demo)" -ForegroundColor Gray
    Write-Host "   3. Public (für GitHub Pages)" -ForegroundColor Gray
    Write-Host "   4. Create repository" -ForegroundColor Gray
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
Write-Host "🚀 Pushe MASTER zu GitHub..." -ForegroundColor Yellow
Write-Host "   (VAVSR FULLSTACK mit ML Worker)" -ForegroundColor Gray
Write-Host ""

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅✅✅ MASTER PUSH ERFOLGREICH! ✅✅✅" -ForegroundColor Green
    Write-Host ""
    
    # Extrahiere Username und Repo
    if ($remote -match 'github\.com[/:]([^/]+)/([^/]+)\.git') {
        $username = $matches[1]
        $repo = $matches[2] -replace '\.git$', ''
        
        Write-Host "🎉 CC24 v1.0.0 FULLSTACK ist jetzt auf GitHub!" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "📋 GitHub Pages aktivieren:" -ForegroundColor Yellow
        Write-Host "   1. Gehe zu: https://github.com/$username/$repo/settings/pages" -ForegroundColor White
        Write-Host "   2. Source: GitHub Actions" -ForegroundColor Gray
        Write-Host "   3. Branch: main" -ForegroundColor Gray
        Write-Host "   4. Save" -ForegroundColor Gray
        Write-Host ""
        Write-Host "   5. Custom Domains:" -ForegroundColor White
        Write-Host "      - cc24.online" -ForegroundColor Gray
        Write-Host "      - cc24.vip" -ForegroundColor Gray
        Write-Host ""
        Write-Host "🔗 Links:" -ForegroundColor Cyan
        Write-Host "   Repository: https://github.com/$username/$repo" -ForegroundColor White
        Write-Host "   GitHub Pages: https://$username.github.io/$repo/" -ForegroundColor White
        Write-Host "   (Nach DNS: https://cc24.online und https://cc24.vip)" -ForegroundColor Gray
        Write-Host ""
        Write-Host "🐳 Docker Deployment:" -ForegroundColor Cyan
        Write-Host "   docker-compose up -d" -ForegroundColor White
        Write-Host "   - Frontend: http://localhost:3000" -ForegroundColor Gray
        Write-Host "   - Backend: http://localhost:8000" -ForegroundColor Gray
        Write-Host "   - ML Worker: http://localhost:8001" -ForegroundColor Gray
        Write-Host ""
        Write-Host "✅ Status: MASTER PUSH abgeschlossen, GitHub Pages muss aktiviert werden" -ForegroundColor Green
    }
} else {
    Write-Host ""
    Write-Host "❌ Push fehlgeschlagen!" -ForegroundColor Red
    Write-Host "Prüfe Git Credentials oder Repository-URL" -ForegroundColor Yellow
}
