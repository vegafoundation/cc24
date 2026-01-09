# Bild-Setup Anleitung für CarCompany24

## 📁 Bildstruktur

Alle Bilder müssen im `public/images/` Verzeichnis platziert werden:

```
public/images/
├── vehicles/
│   ├── exterior/          # Außenansichten
│   │   ├── vehicle-1-1.jpg
│   │   ├── vehicle-1-2.jpg
│   │   └── ...
│   ├── interior/          # Innenansichten
│   │   ├── vehicle-1-interior-1.jpg
│   │   └── ...
│   └── 360/              # 360° Sequenzen
│       └── [fahrzeug-id]/
│           ├── frame-01.jpg
│           ├── frame-02.jpg
│           └── ... (bis frame-36.jpg)
├── hero/
│   └── hero-background.jpg
└── logo/
    ├── logo.svg
    └── logo.png
```

## 🖼️ Bildanforderungen

### Fahrzeugbilder

#### Exterior (Außenansichten)
- **Anzahl**: 8-12 Bilder pro Fahrzeug
- **Auflösung**: Mindestens 1920x1080px
- **Format**: JPG (empfohlen) oder WebP
- **Benennung**: `vehicle-[id]-[nummer].jpg`
  - Beispiel: `vehicle-1-1.jpg`, `vehicle-1-2.jpg`, etc.

#### Interior (Innenansichten)
- **Anzahl**: 6-10 Bilder pro Fahrzeug
- **Auflösung**: Mindestens 1920x1080px
- **Format**: JPG (empfohlen) oder WebP
- **Benennung**: `vehicle-[id]-interior-[nummer].jpg`
  - Beispiel: `vehicle-1-interior-1.jpg`

#### 360° Sequenzen
- **Anzahl**: 36 Bilder pro Fahrzeug (Standard)
- **Auflösung**: Mindestens 1920x1080px
- **Format**: JPG (empfohlen)
- **Benennung**: `frame-01.jpg` bis `frame-36.jpg`
- **Struktur**: Jedes Fahrzeug in eigenem Ordner
  ```
  360/
  └── 1/
      ├── frame-01.jpg
      ├── frame-02.jpg
      └── ... (bis frame-36.jpg)
  ```

### Hero-Bilder
- **Auflösung**: 1920x1080px oder höher
- **Format**: JPG oder WebP
- **Dateiname**: `hero-background.jpg`

### Logo
- **Formate**: SVG (empfohlen) oder PNG mit transparentem Hintergrund
- **Auflösung**: Mindestens 512x512px für PNG
- **Dateinamen**: `logo.svg`, `logo.png`

## 📝 Verwendung in Code

### Komponenten verwenden bereits die Bildstruktur:

```tsx
// VehicleShowcase.tsx
image: '/images/vehicles/exterior/bmw-320d-2018.jpg'

// Vehicle360Viewer
images={generate360ImageUrls(vehicleId)}

// Hero.tsx
src="/images/hero/hero-background.jpg"
```

## 🔧 Bild-Upload

### Manuell
1. Bilder in die entsprechenden Ordner kopieren
2. Dateinamen gemäß Konvention benennen
3. Bilder optimieren (Komprimierung, Größe)

### Automatisch (Upload-System)
Das Uppy-basierte Upload-System unterstützt:
- Drag & Drop
- Mehrfach-Upload
- Automatische Benennung
- Validierung

## 🎨 Bildoptimierung

### Empfohlene Tools
- **ImageMagick** oder **Sharp** für Batch-Verarbeitung
- **TinyPNG** oder **Squoosh** für Komprimierung
- **GIMP** oder **Photoshop** für Bearbeitung

### Optimierungseinstellungen
- **JPG Qualität**: 85-90%
- **WebP Qualität**: 80-85%
- **Maximale Dateigröße**: 2-5MB pro Bild
- **Responsive**: Mehrere Größen generieren (optional)

## 📦 Beispiel-Bilder hinzufügen

Wenn Sie Beispiel-Bilder aus den CC24.zip Dateien haben:

1. **ZIP-Dateien extrahieren**:
   ```powershell
   Expand-Archive -Path "CC24.zip" -DestinationPath "extracted"
   ```

2. **Bilder finden und kopieren**:
   ```powershell
   # Beispiel: Alle JPG-Dateien finden
   Get-ChildItem -Path "extracted" -Recurse -Include *.jpg,*.jpeg,*.png
   ```

3. **In richtige Ordner kopieren**:
   ```powershell
   Copy-Item "extracted\*.jpg" "public\images\vehicles\exterior\"
   ```

## ✅ Checkliste

- [ ] `public/images/` Verzeichnisstruktur erstellt
- [ ] Fahrzeugbilder in `vehicles/exterior/` platziert
- [ ] Innenansichten in `vehicles/interior/` platziert
- [ ] 360° Sequenzen in `vehicles/360/[id]/` platziert
- [ ] Hero-Bild in `hero/` platziert
- [ ] Logo-Dateien in `logo/` platziert
- [ ] Alle Bilder optimiert und komprimiert
- [ ] Dateinamen gemäß Konvention benannt

## 🚀 Nächste Schritte

Nach dem Hinzufügen der Bilder:
1. Website im Browser testen
2. Bilder auf korrekte Anzeige prüfen
3. Fallback-Bilder für fehlende Bilder bereitstellen
4. Performance testen (Ladezeiten)
