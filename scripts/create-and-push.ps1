# Create GitHub Repository und Push
# Nutzt .env Datei für Credentials

Write-Host "🚀 CC24 - Create Repository & Push" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

# Lade .env Datei
$envPath = "C:\VRBS\ENTERPRISE\ENTERPRISEROOT_extracted\.env"
if (Test-Path $envPath) {
    Write-Host "✅ .env Datei gefunden" -ForegroundColor Green
    Get-Content $envPath | ForEach-Object {
        if ($_ -match '^\s*([^#][^=]*)=(.*)$') {
            $key = $matches[1].Trim()
            $value = $matches[2].Trim()
            [Environment]::SetEnvironmentVariable($key, $value, "Process")
        }
    }
} else {
    Write-Host "⚠️  .env Datei nicht gefunden, verwende Standard-Werte" -ForegroundColor Yellow
}

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

# GitHub Username/Token aus .env oder fragen
$githubUser = $env:GITHUB_USERNAME -or $env:GITHUB_USER
$githubToken = $env:GITHUB_TOKEN -or $env:GITHUB_PAT

if (-not $githubUser) {
    $githubUser = Read-Host "GitHub Username"
}

if (-not $githubToken) {
    Write-Host ""
    Write-Host "⚠️  GitHub Token nicht in .env gefunden" -ForegroundColor Yellow
    Write-Host "   Erstelle Personal Access Token: https://github.com/settings/tokens" -ForegroundColor Gray
    Write-Host "   Benötigte Berechtigungen: repo, workflow" -ForegroundColor Gray
    $githubToken = Read-Host "GitHub Personal Access Token" -AsSecureString
    $githubToken = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
        [Runtime.InteropServices.Marshal]::SecureStringToBSTR($githubToken)
    )
}

# Repository Name
$repoName = "enterprise"
if ($env:GITHUB_REPO) {
    $repoName = $env:GITHUB_REPO
}

Write-Host ""
Write-Host "📋 Repository Details:" -ForegroundColor Yellow
Write-Host "   Username: $githubUser" -ForegroundColor Gray
Write-Host "   Repository: $repoName" -ForegroundColor Gray
Write-Host ""

# Prüfe ob Remote existiert
$remote = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Remote bereits vorhanden: $remote" -ForegroundColor Green
    $useExisting = Read-Host "Bestehendes Remote verwenden? (j/n)"
    if ($useExisting -ne "j" -and $useExisting -ne "J") {
        git remote remove origin
        $remote = $null
    }
}

# Erstelle Repository via GitHub API
if (-not $remote) {
    Write-Host ""
    Write-Host "🔄 Erstelle GitHub Repository..." -ForegroundColor Yellow
    
    $headers = @{
        "Authorization" = "token $githubToken"
        "Accept" = "application/vnd.github.v3+json"
    }
    
    $body = @{
        name = $repoName
        description = "CC24 Fullstack Website - VAVSR Showroom, Multi-Domain Support"
        private = $false
        auto_init = $false
    } | ConvertTo-Json
    
    try {
        $response = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method Post -Headers $headers -Body $body -ContentType "application/json"
        Write-Host "✅ Repository erstellt: $($response.html_url)" -ForegroundColor Green
        
        # Remote hinzufügen
        $repoUrl = "https://$githubUser`:$githubToken@github.com/$githubUser/$repoName.git"
        git remote add origin $repoUrl
        Write-Host "✅ Remote hinzugefügt" -ForegroundColor Green
    } catch {
        Write-Host "❌ Fehler beim Erstellen des Repositories: $_" -ForegroundColor Red
        Write-Host ""
        Write-Host "Manuelle Alternative:" -ForegroundColor Yellow
        Write-Host "1. Gehe zu: https://github.com/new" -ForegroundColor Gray
        Write-Host "2. Repository Name: $repoName" -ForegroundColor Gray
        Write-Host "3. Public" -ForegroundColor Gray
        Write-Host "4. Create" -ForegroundColor Gray
        Write-Host ""
        $repoUrl = Read-Host "GitHub Repository URL (z.B. https://github.com/$githubUser/$repoName.git)"
        if ($repoUrl) {
            git remote add origin $repoUrl
        } else {
            exit 1
        }
    }
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

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅✅✅ PUSH ERFOLGREICH! ✅✅✅" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "📋 GitHub Pages aktivieren:" -ForegroundColor Yellow
    Write-Host "   1. Gehe zu: https://github.com/$githubUser/$repoName/settings/pages" -ForegroundColor White
    Write-Host "   2. Source: GitHub Actions" -ForegroundColor Gray
    Write-Host "   3. Branch: main" -ForegroundColor Gray
    Write-Host "   4. Save" -ForegroundColor Gray
    Write-Host ""
    Write-Host "🔗 Links:" -ForegroundColor Cyan
    Write-Host "   Repository: https://github.com/$githubUser/$repoName" -ForegroundColor White
    Write-Host "   Pages Settings: https://github.com/$githubUser/$repoName/settings/pages" -ForegroundColor White
    Write-Host "   GitHub Pages: https://$githubUser.github.io/$repoName/" -ForegroundColor White
    Write-Host ""
    
    # Öffne Browser für Pages Settings
    Start-Process "https://github.com/$githubUser/$repoName/settings/pages"
    
} else {
    Write-Host ""
    Write-Host "❌ Push fehlgeschlagen!" -ForegroundColor Red
    Write-Host "Prüfe Git Credentials oder Token" -ForegroundColor Yellow
}
