# CC24 Demo - Versions-Vergleich Script
# Vergleicht verschiedene Versionen miteinander

param(
    [Parameter(Mandatory=$true)]
    [string]$Version1,
    
    [Parameter(Mandatory=$true)]
    [string]$Version2,
    
    [string]$File = ""
)

$repoRoot = Join-Path $PSScriptRoot ".."

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "CC24 Demo - Versions-Vergleich" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Vergleiche: $Version1 ↔ $Version2" -ForegroundColor Yellow
Write-Host ""

Push-Location $repoRoot

if ($File) {
    # Spezifische Datei vergleichen
    Write-Host "📄 Vergleiche Datei: $File" -ForegroundColor Cyan
    git diff $Version1 $Version2 -- $File
} else {
    # Gesamten Unterschied anzeigen
    Write-Host "📊 Gesamter Unterschied:" -ForegroundColor Cyan
    git diff --stat $Version1 $Version2
    
    Write-Host ""
    Write-Host "📝 Detaillierter Unterschied:" -ForegroundColor Cyan
    git diff $Version1 $Version2
}

Pop-Location

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
