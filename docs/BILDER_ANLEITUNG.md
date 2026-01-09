# 📸 Bilder-Verwaltung für CarCompany24

## ✅ Was wurde implementiert

Die Website ist jetzt vollständig für die Verwendung von Bildern konfiguriert:

### 📁 Bildstruktur erstellt
- `public/images/vehicles/exterior/` - Außenansichten
- `public/images/vehicles/interior/` - Innenansichten  
- `public/images/vehicles/360/` - 360° Sequenzen
- `public/images/hero/` - Hero-Bilder
- `public/images/logo/` - Logo-Dateien

### 🔧 Komponenten aktualisiert
- ✅ `VehicleShowcase` - verwendet echte Bildpfade mit Fallback
- ✅ `Vehicle360Viewer` - unterstützt 360° Sequenzen
- ✅ `Hero` - unterstützt Hintergrundbilder
- ✅ `ImageWithFallback` - neue Komponente für Fehlerbehandlung

### 📝 Utilities erstellt
- `lib/image-utils.ts` - Helper-Funktionen für Bild-URLs
- `scripts/extract-images.ps1` - Script zum Extrahieren aus ZIP-Dateien
- `scripts/setup-placeholder-images.ps1` - Script für Platzhalter-Bilder

## 🚀 So verwenden Sie die Bilder

### Option 1: Bilder aus ZIP-Dateien extrahieren

```powershell
cd C:\VRBS\ENTERPRISE\CC24
.\scripts\extract-images.ps1
```

Dieses Script:
- Findet CC24.zip und CC24V3.zip im ENTERPRISE Ordner
- Extrahiert alle Bilder
- Organisiert sie automatisch in die richtigen Ordner
- Benennt sie nach Konvention um

### Option 2: Bilder manuell hinzufügen

1. **Fahrzeugbilder** in `public/images/vehicles/exterior/` kopieren
   - Benennung: `vehicle-1-1.jpg`, `vehicle-1-2.jpg`, etc.
   
2. **360° Sequenzen** in `public/images/vehicles/360/[id]/` kopieren
   - Benennung: `frame-01.jpg` bis `frame-36.jpg`
   - Jedes Fahrzeug in eigenem Ordner

3. **Hero-Bild** als `public/images/hero/hero-background.jpg`

4. **Logo** in `public/images/logo/` als `logo.svg` oder `logo.png`

### Option 3: Platzhalter-Bilder erstellen

```powershell
cd C:\VRBS\ENTERPRISE\CC24
.\scripts\setup-placeholder-images.ps1
```

**Voraussetzung**: ImageMagick muss installiert sein

## 📋 Bildanforderungen

### Fahrzeugbilder
- **Format**: JPG, PNG oder WebP
- **Auflösung**: Mindestens 1920x1080px
- **Größe**: Max. 5MB pro Bild
- **Qualität**: 85-90% für JPG

### 360° Sequenzen
- **Anzahl**: 36 Bilder pro Fahrzeug
- **Auflösung**: Mindestens 1920x1080px
- **Benennung**: `frame-01.jpg` bis `frame-36.jpg`
- **Ordnerstruktur**: `360/[fahrzeug-id]/frame-XX.jpg`

## 🎯 Aktuelle Bildpfade in Code

Die Komponenten verwenden folgende Pfade:

```typescript
// VehicleShowcase
image: '/images/vehicles/exterior/bmw-320d-2018.jpg'
fallbackImage: '/images/vehicles/exterior/placeholder.jpg'

// Vehicle360Viewer
images: ['/images/vehicles/360/1/frame-01.jpg', ...]

// Hero
src: '/images/hero/hero-background.jpg'
```

## 🔍 Bilder testen

1. **Development Server starten**:
   ```bash
   npm run dev
   ```

2. **Im Browser prüfen**:
   - Öffnen Sie `http://localhost:3000`
   - Prüfen Sie ob Bilder korrekt angezeigt werden
   - Prüfen Sie Fallback-Bilder bei fehlenden Dateien

3. **Browser Console prüfen**:
   - Fehlende Bilder werden in der Console angezeigt
   - Fallback-Bilder werden automatisch geladen

## 📦 Beispiel-Bilder hinzufügen

Wenn Sie Beispiel-Bilder haben:

1. **ZIP-Dateien extrahieren** (falls vorhanden):
   ```powershell
   Expand-Archive -Path "C:\VRBS\ENTERPRISE\CC24.zip" -DestinationPath "extracted"
   ```

2. **Bilder finden**:
   ```powershell
   Get-ChildItem -Path "extracted" -Recurse -Include *.jpg,*.png
   ```

3. **In richtige Ordner kopieren**:
   ```powershell
   Copy-Item "extracted\*.jpg" "C:\VRBS\ENTERPRISE\CC24\public\images\vehicles\exterior\"
   ```

## ✅ Checkliste

- [ ] Bildverzeichnisse erstellt (`public/images/`)
- [ ] Bilder aus ZIP-Dateien extrahiert (falls vorhanden)
- [ ] Bilder in richtige Ordner kopiert
- [ ] Dateinamen gemäß Konvention benannt
- [ ] Platzhalter-Bilder erstellt (falls keine echten Bilder)
- [ ] Website im Browser getestet
- [ ] Fallback-Bilder funktionieren

## 🆘 Hilfe

### Bilder werden nicht angezeigt?
1. Prüfen Sie die Browser-Console auf Fehler
2. Prüfen Sie ob Dateipfade korrekt sind
3. Prüfen Sie ob Bilder im `public/` Ordner sind
4. Prüfen Sie Next.js Server-Logs

### Platzhalter-Bilder erstellen
Falls ImageMagick nicht installiert ist, können Sie auch einfache Platzhalter manuell erstellen oder Online-Tools verwenden.

## 📚 Weitere Informationen

- Siehe `IMAGE_SETUP.md` für detaillierte Anleitung
- Siehe `public/images/README.md` für Ordnerstruktur
- Next.js Image Optimization: https://nextjs.org/docs/app/api-reference/components/image
