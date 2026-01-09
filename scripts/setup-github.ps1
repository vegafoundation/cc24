# GitHub Repository Setup Script (PowerShell)
# Erstellt Git-Repository und bereitet für GitHub Pages vor

Write-Host "🚀 CC24 GitHub Repository Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Prüfe ob Git installiert ist
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git ist nicht installiert!" -ForegroundColor Red
    Write-Host "Installiere Git von: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# Prüfe ob im richtigen Verzeichnis
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Bitte im CC24 Projekt-Verzeichnis ausführen!" -ForegroundColor Red
    exit 1
}

# Git initialisieren (falls nicht vorhanden)
if (-not (Test-Path ".git")) {
    Write-Host "📦 Initialisiere Git-Repository..." -ForegroundColor Yellow
    git init
    git branch -M main
}

# Erste Commit (falls noch keine Commits)
$hasCommits = git rev-parse --verify HEAD 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "📝 Erstelle ersten Commit..." -ForegroundColor Yellow
    git add .
    git commit -m "Initial commit: CC24 Fullstack Website - Multi-Domain Support für CC24.ONLINE und CC24.VIP"
}

Write-Host ""
Write-Host "✅ Git-Repository bereit!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Nächste Schritte:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Erstelle GitHub Repository:" -ForegroundColor White
Write-Host "   - Gehe zu https://github.com/new" -ForegroundColor Gray
Write-Host "   - Repository Name: enterprise (oder dein Repo-Name)" -ForegroundColor Gray
Write-Host "   - Public oder Private" -ForegroundColor Gray
Write-Host "   - NICHT README, .gitignore oder License hinzufügen" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Verbinde lokales Repository:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/[USERNAME]/enterprise.git" -ForegroundColor Gray
Write-Host "   git push -u origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "3. GitHub Pages aktivieren:" -ForegroundColor White
Write-Host "   - GitHub Repository → Settings → Pages" -ForegroundColor Gray
Write-Host "   - Source: GitHub Actions" -ForegroundColor Gray
Write-Host "   - Branch: main" -ForegroundColor Gray
Write-Host ""
Write-Host "4. DNS Records setzen:" -ForegroundColor White
Write-Host "   - Siehe DNS_RECORDS.txt" -ForegroundColor Gray
Write-Host "   - GitHub Pages: [USERNAME].github.io" -ForegroundColor Gray
Write-Host ""
Write-Host "✅ Setup abgeschlossen!" -ForegroundColor Green
