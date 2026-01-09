# CC24 Projektstruktur

## 📁 Saubere Projektorganisation

```
CC24/
├── app/                          # Next.js App Router
│   ├── api/                     # API Routes
│   ├── boerse/                  # Börsen-Plattform
│   ├── fahrzeuge/               # Fahrzeugseiten
│   ├── finanzierung/            # Finanzierungsrechner
│   ├── vavsr/                   # VAVSR Showroom
│   └── ...
│
├── components/                   # React Komponenten
│   ├── boerse/                  # Börsen-Komponenten
│   ├── financing/               # Finanzierungs-Komponenten
│   ├── layout/                  # Layout-Komponenten
│   ├── sections/                # Seiten-Sektionen
│   ├── ui/                      # UI-Komponenten
│   ├── upload/                  # Upload-Komponenten
│   ├── vehicles/                # Fahrzeug-Komponenten
│   └── vavsr/                   # VAVSR Komponenten
│
├── backend/                      # Python Backend
│   ├── services/                # Backend Services
│   ├── main.py                  # FastAPI App
│   └── requirements.txt         # Python Dependencies
│
├── lib/                          # Utilities & Helpers
│   ├── image-utils.ts           # Bild-Utilities
│   ├── mobile-de-api.ts         # Mobile.de API Client
│   └── utils.ts                 # Allgemeine Utilities
│
├── public/                       # Statische Assets
│   └── images/                  # Bilder
│       ├── vehicles/            # Fahrzeugbilder
│       ├── hero/                # Hero-Bilder
│       └── logo/                # Logos
│
├── scripts/                      # Scripts & Tools
│   ├── extract-images.ps1      # Bild-Extraktion
│   └── setup-placeholder-images.ps1
│
├── docs/                         # Dokumentation
│   ├── BILDER_ANLEITUNG.md
│   ├── IMAGE_SETUP.md
│   ├── PROJECT_STRUCTURE.md
│   ├── QUICKSTART.md
│   └── VAVSR_INTEGRATION.md
│
├── integrations/                 # Externe Integrationen
│   ├── showroom-beta/           # VAVSR Showroom Beta
│   └── *.jsx                    # Legacy Komponenten
│
├── archives/                     # Archivierte Dateien
│   ├── CC24-original.zip
│   ├── CC24V3.zip
│   └── cc24-virtual-showroom-fullstack.zip
│
├── docker-compose.yml            # Docker Setup
├── Dockerfile                    # Frontend Docker
├── next.config.js               # Next.js Config
├── package.json                 # NPM Dependencies
├── tailwind.config.js           # Tailwind Config
├── tsconfig.json                # TypeScript Config
└── README.md                    # Haupt-Dokumentation
```

## 🎯 Hauptkomponenten

### 1. Website (Next.js)
- **Pfad:** `app/`
- **Framework:** Next.js 14 App Router
- **Styling:** Tailwind CSS
- **Features:** Homepage, Fahrzeuge, Finanzierung, Börse, VAVSR

### 2. Börsen-Plattform
- **Pfad:** `app/boerse/`
- **Features:** Fahrzeugsuche, Dealer Dashboard, Finanzierung
- **Komponenten:** `components/boerse/`

### 3. VAVSR Showroom
- **Pfad:** `app/vavsr/`
- **Features:** 360° Showroom aus 8 Fotos
- **Komponenten:** `components/vavsr/`
- **Integration:** `integrations/showroom-beta/`

### 4. Backend API
- **Pfad:** `backend/`
- **Framework:** FastAPI (Python)
- **Services:** Bildverarbeitung, Finanzierung, Mobile.de Sync

## 📦 Integrationen

### Showroom Beta
- **Pfad:** `integrations/showroom-beta/`
- **Inhalt:** Vollständige Showroom-Beta (Frontend + Backend + ML-Worker)
- **Status:** Validiert und integriert

## 🗄️ Archive

- **Pfad:** `archives/`
- **Inhalt:** Original ZIP-Dateien und Backups
- **Zweck:** Referenz und Wiederherstellung

## 📚 Dokumentation

- **Pfad:** `docs/`
- **Inhalt:** Alle Markdown-Dokumentationen
- **Zweck:** Zentrale Dokumentation

## 🚀 Quick Start

```bash
# Dependencies installieren
npm install

# Development Server
npm run dev

# Backend starten
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## 🔧 Konfiguration

- **Environment:** `.env` (siehe `.env.example`)
- **Next.js:** `next.config.js`
- **TypeScript:** `tsconfig.json`
- **Tailwind:** `tailwind.config.js`

## 📝 Wichtige Dateien

- `README.md` - Haupt-Dokumentation
- `docs/QUICKSTART.md` - Schnellstart-Anleitung
- `docs/VAVSR_INTEGRATION.md` - VAVSR Integration Guide
- `package.json` - NPM Dependencies
- `docker-compose.yml` - Docker Setup

---

**Status:** ✅ Sauber strukturiert und organisiert
