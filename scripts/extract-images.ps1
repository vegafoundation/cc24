# Script zum Extrahieren und Organisieren von Bildern aus CC24 ZIP-Dateien
# Verwendung: .\scripts\extract-images.ps1

$ErrorActionPreference = "Stop"

Write-Host "=== CarCompany24 Bild-Extraktion ===" -ForegroundColor Cyan

# Pfade definieren
$enterprisePath = "C:\VRBS\ENTERPRISE"
$zipFiles = @("CC24.zip", "CC24V3.zip")
$extractPath = "$enterprisePath\CC24_extracted"
$targetPath = "$enterprisePath\CC24\public\images"

# Prüfe ob ZIP-Dateien existieren
$foundZips = @()
foreach ($zip in $zipFiles) {
    $zipPath = Join-Path $enterprisePath $zip
    if (Test-Path $zipPath) {
        $foundZips += $zipPath
        Write-Host "✓ Gefunden: $zip" -ForegroundColor Green
    }
}

if ($foundZips.Count -eq 0) {
    Write-Host "Keine ZIP-Dateien gefunden!" -ForegroundColor Yellow
    Write-Host "Bitte stellen Sie sicher, dass CC24.zip oder CC24V3.zip im ENTERPRISE Ordner vorhanden sind." -ForegroundColor Yellow
    exit
}

# Erstelle Zielverzeichnisse
Write-Host "`nErstelle Zielverzeichnisse..." -ForegroundColor Cyan
$directories = @(
    "$targetPath\vehicles\exterior",
    "$targetPath\vehicles\interior",
    "$targetPath\vehicles\360",
    "$targetPath\hero",
    "$targetPath\logo"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "  ✓ Erstellt: $dir" -ForegroundColor Gray
    }
}

# Extrahiere ZIP-Dateien
Write-Host "`nExtrahiere ZIP-Dateien..." -ForegroundColor Cyan
foreach ($zipPath in $foundZips) {
    $zipName = Split-Path $zipPath -Leaf
    $extractDir = Join-Path $extractPath $zipName.Replace('.zip', '')
    
    Write-Host "  Extrahiere: $zipName" -ForegroundColor Yellow
    try {
        Expand-Archive -Path $zipPath -DestinationPath $extractDir -Force
        Write-Host "  ✓ Erfolgreich extrahiert" -ForegroundColor Green
    } catch {
        Write-Host "  ✗ Fehler beim Extrahieren: $_" -ForegroundColor Red
    }
}

# Finde alle Bilder
Write-Host "`nSuche nach Bildern..." -ForegroundColor Cyan
$imageExtensions = @("*.jpg", "*.jpeg", "*.png", "*.webp", "*.gif", "*.svg")
$allImages = @()

foreach ($ext in $imageExtensions) {
    $images = Get-ChildItem -Path $extractPath -Recurse -Include $ext -ErrorAction SilentlyContinue
    $allImages += $images
}

Write-Host "  Gefunden: $($allImages.Count) Bilder" -ForegroundColor Green

# Organisiere Bilder
Write-Host "`nOrganisiere Bilder..." -ForegroundColor Cyan

$vehicleCounter = 1
$heroCounter = 0
$logoCounter = 0

foreach ($image in $allImages) {
    $fileName = $image.Name.ToLower()
    $filePath = $image.FullName
    
    # Bestimme Ziel basierend auf Dateiname
    $target = $null
    
    if ($fileName -match "logo|brand|marke") {
        $target = Join-Path "$targetPath\logo" $image.Name
        $logoCounter++
    }
    elseif ($fileName -match "hero|header|banner|haupt") {
        $target = Join-Path "$targetPath\hero" $image.Name
        if ($heroCounter -eq 0) {
            # Erste Hero-Bild als hero-background.jpg umbenennen
            $target = Join-Path "$targetPath\hero" "hero-background.jpg"
        }
        $heroCounter++
    }
    elseif ($fileName -match "interior|innen|cockpit|dashboard") {
        $newName = "vehicle-$vehicleCounter-interior-$($image.Name)"
        $target = Join-Path "$targetPath\vehicles\interior" $newName
    }
    elseif ($fileName -match "360|spin|dreh|rotation") {
        # 360° Sequenzen - in eigenen Ordner
        $vehicle360Dir = Join-Path "$targetPath\vehicles\360" $vehicleCounter
        if (-not (Test-Path $vehicle360Dir)) {
            New-Item -ItemType Directory -Path $vehicle360Dir -Force | Out-Null
        }
        # Extrahiere Frame-Nummer aus Dateiname falls vorhanden
        if ($fileName -match "(\d+)") {
            $frameNum = $matches[1].PadLeft(2, '0')
            $target = Join-Path $vehicle360Dir "frame-$frameNum.jpg"
        } else {
            $target = Join-Path $vehicle360Dir $image.Name
        }
    }
    else {
        # Standard: Exterior
        $newName = "vehicle-$vehicleCounter-$($image.Name)"
        $target = Join-Path "$targetPath\vehicles\exterior" $newName
    }
    
    if ($target) {
        try {
            Copy-Item -Path $filePath -Destination $target -Force
            Write-Host "  ✓ Kopiert: $($image.Name) -> $target" -ForegroundColor Gray
        } catch {
            Write-Host "  ✗ Fehler: $($image.Name) - $_" -ForegroundColor Red
        }
    }
}

# Zusammenfassung
Write-Host "`n=== Zusammenfassung ===" -ForegroundColor Cyan
Write-Host "Extrahierte ZIP-Dateien: $($foundZips.Count)" -ForegroundColor Green
Write-Host "Gefundene Bilder: $($allImages.Count)" -ForegroundColor Green
Write-Host "Kopierte Bilder:" -ForegroundColor Green
Write-Host "  - Exterior: $vehicleCounter" -ForegroundColor Gray
Write-Host "  - Interior: $($allImages.Count - $vehicleCounter - $heroCounter - $logoCounter)" -ForegroundColor Gray
Write-Host "  - Hero: $heroCounter" -ForegroundColor Gray
Write-Host "  - Logo: $logoCounter" -ForegroundColor Gray

Write-Host "`n✓ Bilder erfolgreich organisiert!" -ForegroundColor Green
Write-Host "Zielverzeichnis: $targetPath" -ForegroundColor Yellow

# Aufräumen
$cleanup = Read-Host "`nExtrahierte Dateien löschen? (j/n)"
if ($cleanup -eq "j" -or $cleanup -eq "J") {
    Remove-Item -Path $extractPath -Recurse -Force
    Write-Host "✓ Aufgeräumt" -ForegroundColor Green
}

Write-Host "`nFertig! Bilder sind jetzt in $targetPath verfügbar." -ForegroundColor Cyan
