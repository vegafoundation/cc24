# Script zum Erstellen von Platzhalter-Bildern für Entwicklung
# Erstellt einfache farbige Platzhalter-Bilder mit Text

$ErrorActionPreference = "Stop"

Write-Host "=== Erstelle Platzhalter-Bilder ===" -ForegroundColor Cyan

$targetPath = "C:\VRBS\ENTERPRISE\CC24\public\images"

# Prüfe ob ImageMagick installiert ist
$magick = Get-Command magick -ErrorAction SilentlyContinue

if (-not $magick) {
    Write-Host "ImageMagick nicht gefunden!" -ForegroundColor Yellow
    Write-Host "Bitte installieren Sie ImageMagick oder verwenden Sie echte Bilder." -ForegroundColor Yellow
    Write-Host "Download: https://imagemagick.org/script/download.php" -ForegroundColor Yellow
    exit
}

Write-Host "ImageMagick gefunden - erstelle Platzhalter..." -ForegroundColor Green

# Erstelle Platzhalter-Bilder
$placeholders = @(
    @{
        Path = "$targetPath\vehicles\exterior\placeholder.jpg"
        Text = "Fahrzeug\nAußenansicht"
        Size = "1920x1080"
        Color = "2A9D8F"
    },
    @{
        Path = "$targetPath\vehicles\interior\placeholder.jpg"
        Text = "Fahrzeug\nInnenansicht"
        Size = "1920x1080"
        Color = "E63946"
    },
    @{
        Path = "$targetPath\hero\hero-background.jpg"
        Text = "CarCompany24\nHero Background"
        Size = "1920x1080"
        Color = "1a1a2e"
    },
    @{
        Path = "$targetPath\logo\logo-placeholder.png"
        Text = "CC24"
        Size = "512x512"
        Color = "E63946"
    }
)

foreach ($placeholder in $placeholders) {
    $dir = Split-Path $placeholder.Path -Parent
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    
    Write-Host "Erstelle: $($placeholder.Path)" -ForegroundColor Gray
    
    # Erstelle Bild mit ImageMagick
    $magickArgs = @(
        "-size", $placeholder.Size,
        "xc:#$($placeholder.Color)",
        "-pointsize", "72",
        "-fill", "white",
        "-gravity", "center",
        "-annotate", "+0+0", $placeholder.Text,
        $placeholder.Path
    )
    
    & magick @magickArgs
    
    if (Test-Path $placeholder.Path) {
        Write-Host "  ✓ Erfolgreich erstellt" -ForegroundColor Green
    } else {
        Write-Host "  ✗ Fehler beim Erstellen" -ForegroundColor Red
    }
}

Write-Host "`n✓ Platzhalter-Bilder erstellt!" -ForegroundColor Green
