# Bilder-Verzeichnis

## Struktur

```
public/images/
├── vehicles/          # Fahrzeugbilder
│   ├── 360/         # 360° Sequenzen (36 Bilder pro Fahrzeug)
│   ├── exterior/    # Außenansichten
│   └── interior/    # Innenansichten
├── hero/             # Hero-Sektion Bilder
├── logo/             # Logo und Branding
└── gallery/          # Galerie-Bilder
```

## Verwendung

### Fahrzeugbilder
- Platzieren Sie Fahrzeugbilder in `vehicles/exterior/` oder `vehicles/interior/`
- Für 360° Sequenzen: 36 Bilder pro Fahrzeug in `vehicles/360/[fahrzeug-id]/`
- Benennung: `fahrzeug-[id]-[nummer].jpg` (z.B. `fahrzeug-1-01.jpg` bis `fahrzeug-1-36.jpg`)

### Hero-Bilder
- Hauptbilder für die Hero-Sektion in `hero/`
- Empfohlene Größe: 1920x1080px

### Logo
- Logo-Dateien in `logo/`
- Formate: SVG (empfohlen), PNG mit transparentem Hintergrund

## Bildformate
- **Empfohlen**: JPG für Fotos, PNG für Logos, WebP für optimierte Bilder
- **Maximale Größe**: 5MB pro Bild
- **Auflösung**: Mindestens 1920x1080px für Fahrzeugbilder
