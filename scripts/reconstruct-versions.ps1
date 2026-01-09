# CC24 Demo - Versions-Rekonstruktion Script
# Rekonstruiert alle Versionen aus der Git-Historie

$ErrorActionPreference = "Stop"
$versionsDir = Join-Path $PSScriptRoot "..\versions"

# Versions-Definitionen
$versions = @(
    @{
        Hash = "8d0d4e3"
        Name = "v1-initial"
        Description = "Initial: CC24 Demo - Vollständig reaktive und responsive Website mit Multi-Deployment"
    },
    @{
        Hash = "395b4fd"
        Name = "v2-full-features"
        Description = "Restore: Vollständige Version mit allen Features - FinancingCalculator, OfferForm, Unternehmensdaten, SVGs"
    },
    @{
        Hash = "aa8acfd"
        Name = "v3-vehicle-detail-fix"
        Description = "Fix: VehicleDetailClient Actions Buttons korrigiert"
    },
    @{
        Hash = "5baa987"
        Name = "v4-multi-deployment"
        Description = "Perfect: Multi-Deployment Setup - Domain Config, Updated Navigation/Footer, Docker Workflow"
    },
    @{
        Hash = "ccc15b8"
        Name = "v5-enterprise"
        Description = "Restore: Vollständige Enterprise Version 3d88e0f - Multi-Domain, VAVSR, All Features Complete"
    },
    @{
        Hash = "6214510"
        Name = "v6-nextjs-config-fix"
        Description = "Fix: Next.js Config für Vercel - Conditional Output"
    },
    @{
        Hash = "c43f8e7"
        Name = "v7-initial-platform"
        Description = "Restore: Initiale CarCompany24 Platform mit PixelAG Showroom, Animated Intro, SVG Icons"
    },
    @{
        Hash = "b672336"
        Name = "v8-modular"
        Description = "Improve: CarCompany24 Platform - Modular Structure, TypeScript Types, Performance Optimizations"
    },
    @{
        Hash = "85c11ee"
        Name = "v9-current"
        Description = "Fix: Remove duplicate Icons definition - FINAL VERSION"
    }
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "CC24 Demo - Versions-Rekonstruktion" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Versions-Verzeichnis erstellen
if (-not (Test-Path $versionsDir)) {
    New-Item -ItemType Directory -Path $versionsDir -Force | Out-Null
    Write-Host "✅ Versions-Verzeichnis erstellt: $versionsDir" -ForegroundColor Green
}

$repoRoot = Join-Path $PSScriptRoot ".."

foreach ($version in $versions) {
    Write-Host ""
    Write-Host "📦 Rekonstruiere Version: $($version.Name)" -ForegroundColor Yellow
    Write-Host "   Hash: $($version.Hash)" -ForegroundColor Gray
    Write-Host "   Beschreibung: $($version.Description)" -ForegroundColor Gray
    
    $versionDir = Join-Path $versionsDir $version.Name
    
    if (Test-Path $versionDir) {
        Write-Host "   ⚠️  Verzeichnis existiert bereits, überspringe..." -ForegroundColor Yellow
        continue
    }
    
    New-Item -ItemType Directory -Path $versionDir -Force | Out-Null
    
    Push-Location $repoRoot
    
    try {
        # Wichtige Dateien für diese Version extrahieren
        $importantFiles = @(
            "app/page.tsx",
            "app/layout.tsx",
            "components/CarCompany24Platform.tsx",
            "components/sections/Hero.tsx",
            "components/sections/VehicleShowcase.tsx",
            "components/sections/Financing.tsx",
            "components/sections/Contact.tsx",
            "components/financing/FinancingCalculator.tsx",
            "components/contact/OfferForm.tsx",
            "app/fahrzeuge/[id]/page.tsx",
            "app/fahrzeuge/[id]/VehicleDetailClient.tsx",
            "next.config.js",
            "package.json",
            "lib/design-tokens.ts",
            "components/icons/CC24Icons.tsx",
            "components/platform/AnimatedIntro.tsx"
        )
        
        # Git checkout für diese Version
        $checkoutOutput = git checkout $version.Hash 2>&1
        if ($LASTEXITCODE -ne 0) {
            Write-Host "   ❌ Fehler beim Checkout: $checkoutOutput" -ForegroundColor Red
            continue
        }
        
        # Dateien kopieren
        $copiedCount = 0
        foreach ($file in $importantFiles) {
            $sourcePath = Join-Path $repoRoot $file
            if (Test-Path $sourcePath) {
                $destDir = Join-Path $versionDir (Split-Path $file -Parent)
                if (-not (Test-Path $destDir)) {
                    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
                }
                Copy-Item $sourcePath (Join-Path $versionDir $file) -Force
                $copiedCount++
            }
        }
        
        # Version-Info speichern
        $versionInfo = @{
            Hash = $version.Hash
            Name = $version.Name
            Description = $version.Description
            Date = (git log -1 --format=%ci $version.Hash)
            Author = (git log -1 --format=%an $version.Hash)
            FilesCopied = $copiedCount
        } | ConvertTo-Json -Depth 10
        
        $versionInfo | Out-File (Join-Path $versionDir "version-info.json") -Encoding UTF8
        
        Write-Host "   ✅ Version rekonstruiert: $copiedCount Dateien kopiert" -ForegroundColor Green
        
    } catch {
        Write-Host "   ❌ Fehler: $_" -ForegroundColor Red
    } finally {
        # Zurück zu main
        git checkout main 2>&1 | Out-Null
        Pop-Location
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ Versions-Rekonstruktion abgeschlossen!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Alle Versionen gespeichert in: $versionsDir" -ForegroundColor Cyan
Write-Host ""
