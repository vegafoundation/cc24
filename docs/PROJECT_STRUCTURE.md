# CarCompany24 - Projektstruktur

## 📋 Vollständige Übersicht

### Frontend (Next.js 14 App Router)

```
app/
├── layout.tsx                 # Root Layout mit Metadata
├── page.tsx                   # Homepage
├── globals.css                # Globale Styles
├── finanzierung/
│   └── page.tsx              # Finanzierungsrechner Seite
├── fahrzeuge/
│   ├── page.tsx             # Fahrzeugübersicht
│   └── [id]/
│       └── page.tsx         # Fahrzeug-Detailseite mit Schema.org
├── datenschutz/
│   └── page.tsx             # GDPR Datenschutzerklärung
└── api/
    ├── financing/
    │   └── calculate/
    │       └── route.ts     # Finanzierungs-API
    └── contact/
        └── route.ts         # Kontaktformular-API
```

### Komponenten

```
components/
├── CarCompany24Loader.tsx    # Loading-Animation
├── sections/
│   ├── Hero.tsx             # Hero-Sektion
│   ├── TrustSignals.tsx     # Vertrauenssignale
│   ├── VehicleShowcase.tsx  # Fahrzeug-Showcase
│   ├── Services.tsx         # Leistungen
│   ├── Financing.tsx        # Finanzierungs-Sektion
│   └── Contact.tsx          # Kontakt-Sektion
├── vehicles/
│   └── Vehicle360Viewer.tsx # 360° Viewer Komponente
├── financing/
│   └── FinancingCalculator.tsx # PAngV-konformer Rechner
├── forms/
│   └── ContactForm.tsx      # GDPR-konformes Kontaktformular
└── upload/
    └── VehicleUpload.tsx    # Uppy-basiertes Upload-System
```

### Backend (FastAPI)

```
backend/
├── main.py                   # FastAPI Application
├── requirements.txt          # Python Dependencies
├── Dockerfile               # Backend Docker Image
└── services/                # (Zukünftig)
    ├── image_processing.py  # Bildverarbeitung
    └── mobile_de_sync.py    # Mobile.de Synchronisation
```

### Utilities & Libraries

```
lib/
├── utils.ts                  # Helper Functions
└── mobile-de-api.ts         # Mobile.de API Client
```

### Konfiguration

```
├── package.json              # NPM Dependencies
├── tsconfig.json            # TypeScript Config
├── tailwind.config.js       # Tailwind CSS Config
├── next.config.js           # Next.js Config
├── docker-compose.yml       # Docker Compose Setup
├── Dockerfile               # Frontend Docker Image
└── .env.example            # Environment Variables Template
```

## 🎯 Implementierte Features

### ✅ Abgeschlossen

1. **Projektstruktur**
   - Next.js 14 App Router Setup
   - TypeScript Konfiguration
   - Tailwind CSS Integration

2. **UI Komponenten**
   - CarCompany24Loader (animierter Loader)
   - Hero-Sektion mit Trust-Badges
   - Responsive Design
   - Moderne UI mit Framer Motion

3. **Finanzierungsrechner**
   - PAngV-konforme Berechnung
   - Vollständige Compliance-Anzeige
   - Client- und Server-seitige API

4. **360° Viewer**
   - js-cloudimage-360-view Integration
   - Fallback zu Canvas-basiertem Viewer
   - Touch-Support für Mobile

5. **Upload-System**
   - Uppy Integration
   - TUS Protocol Support
   - 16-72 Bild Upload für 360° Sequenzen

6. **GDPR Compliance**
   - Datenschutzerklärung
   - Consent-Management in Formularen
   - Opt-in für Marketing

7. **SEO**
   - Schema.org Markup für Fahrzeuge
   - Meta-Tags optimiert
   - Structured Data

8. **Backend API**
   - FastAPI Setup
   - Finanzierungs-Berechnung
   - Upload-Endpoints
   - CORS konfiguriert

### 🚧 In Entwicklung / TODO

1. **Mobile.de API Integration**
   - API-Zugang beantragen
   - Synchronisation implementieren
   - Automatische Updates

2. **Bildverarbeitung**
   - Rembg Integration für Background Removal
   - License Plate Blurring
   - Image Optimization Pipeline

3. **Datenbank**
   - Fahrzeug-Datenbank Schema
   - User Management
   - Analytics

4. **Erweiterte Features**
   - WhatsApp Business Integration
   - Trade-in Valuation Tool
   - Loyalty Program

## 🔐 Sicherheit & Compliance

- ✅ GDPR-konforme Formulare
- ✅ PAngV-konformer Finanzierungsrechner
- ✅ Datenschutzerklärung
- ✅ Secure API Endpoints
- ✅ Input Validation (Zod)

## 📊 Performance

- ✅ Next.js Image Optimization
- ✅ Code Splitting
- ✅ Lazy Loading
- ✅ CDN-ready (imgproxy Integration vorbereitet)

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Docker
```bash
docker-compose up -d
```

## 📝 Nächste Schritte

1. Mobile.de API-Zugang beantragen
2. Datenbank-Schema erstellen
3. Bildverarbeitungs-Pipeline implementieren
4. Testing & QA
5. Production Deployment
