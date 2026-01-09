# Direct Push zu GitHub mit lokalen Credentials
# Aktiviert automatisch GitHub Pages

Write-Host "🚀 CC24 Direct Push zu GitHub" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan
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

# Prüfe Remote
$remote = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
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
        $remote = $repoUrl
    } else {
        Write-Host "❌ Abgebrochen" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ Remote gefunden: $remote" -ForegroundColor Green
}

# Prüfe ob alles committed
$uncommitted = git diff --cached --quiet
if (-not $uncommitted) {
    Write-Host "📝 Uncommitted Änderungen gefunden..." -ForegroundColor Yellow
    git add .
    git commit -m "Update: Final changes before push"
}

# Push
Write-Host ""
Write-Host "🚀 Pushe zu GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ Push fehlgeschlagen!" -ForegroundColor Red
    Write-Host "Prüfe Git Credentials" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "✅✅✅ PUSH ERFOLGREICH! ✅✅✅" -ForegroundColor Green
Write-Host ""

# Extrahiere Username und Repo
if ($remote -match 'github\.com[/:]([^/]+)/([^/]+)\.git') {
    $username = $matches[1]
    $repo = $matches[2] -replace '\.git$', ''
    
    Write-Host "📋 GitHub Pages aktivieren:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Gehe zu: https://github.com/$username/$repo/settings/pages" -ForegroundColor White
    Write-Host "2. Source: GitHub Actions" -ForegroundColor Gray
    Write-Host "3. Branch: main" -ForegroundColor Gray
    Write-Host "4. Save" -ForegroundColor Gray
    Write-Host ""
    Write-Host "5. Custom Domains (optional):" -ForegroundColor White
    Write-Host "   - cc24.online" -ForegroundColor Gray
    Write-Host "   - cc24.vip" -ForegroundColor Gray
    Write-Host ""
    Write-Host "🔗 Links:" -ForegroundColor Cyan
    Write-Host "   Repository: https://github.com/$username/$repo" -ForegroundColor White
    Write-Host "   Pages Settings: https://github.com/$username/$repo/settings/pages" -ForegroundColor White
    Write-Host "   GitHub Pages: https://$username.github.io/$repo/" -ForegroundColor White
    Write-Host ""
    
    # Versuche GitHub CLI für Pages Activation
    if (Get-Command gh -ErrorAction SilentlyContinue) {
        Write-Host "🔄 Versuche GitHub Pages mit GitHub CLI zu aktivieren..." -ForegroundColor Yellow
        gh api repos/$username/$repo/pages -X POST -f source=@'{"branch":"main","path":"/"}'
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ GitHub Pages aktiviert!" -ForegroundColor Green
        } else {
            Write-Host "⚠️  Automatische Aktivierung fehlgeschlagen - bitte manuell aktivieren" -ForegroundColor Yellow
        }
    }
}

Write-Host "✅ Push abgeschlossen!" -ForegroundColor Green
