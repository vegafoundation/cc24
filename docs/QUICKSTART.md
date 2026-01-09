# CarCompany24 - Quick Start Guide

## 🚀 Schnellstart

### Voraussetzungen

- Node.js 20+ installiert
- Python 3.11+ installiert (für Backend)
- npm oder yarn

### Installation

```bash
# 1. Dependencies installieren
npm install

# 2. Environment-Variablen konfigurieren
cp .env.example .env
# Bearbeiten Sie .env mit Ihren API-Keys

# 3. Development Server starten
npm run dev
```

Die Website ist dann unter `http://localhost:3000` erreichbar.

### Backend starten

```bash
cd backend

# Virtual Environment erstellen
python -m venv venv

# Aktivieren (Windows)
venv\Scripts\activate

# Aktivieren (Linux/Mac)
source venv/bin/activate

# Dependencies installieren
pip install -r requirements.txt

# Server starten
uvicorn main:app --reload
```

Backend API ist dann unter `http://localhost:8000` erreichbar.

## 📁 Projektstruktur

```
CC24/
├── app/                    # Next.js App Router
│   ├── (routes)/          # Route-Gruppen
│   ├── api/               # API Routes
│   ├── fahrzeuge/         # Fahrzeugseiten
│   ├── finanzierung/      # Finanzierungsrechner
│   └── layout.tsx         # Root Layout
├── components/            # React Komponenten
│   ├── sections/         # Seiten-Sektionen
│   ├── vehicles/         # Fahrzeug-Komponenten
│   ├── financing/        # Finanzierungs-Komponenten
│   ├── forms/            # Formulare
│   └── upload/           # Upload-Komponenten
├── lib/                   # Utilities & Helpers
├── public/                # Statische Assets
├── backend/               # Python Backend
│   ├── main.py          # FastAPI App
│   └── requirements.txt # Python Dependencies
└── config/                # Konfigurationsdateien
```

## 🔧 Konfiguration

### Mobile.de API

1. Kontaktieren Sie `service@team.mobile.de` mit:
   - Ihrer Mobile.de Kundennummer
   - Firmenname: CarCompany24 GmbH

2. Tragen Sie die erhaltenen Credentials in `.env` ein:
```env
MOBILE_DE_API_USERNAME=ihr-username
MOBILE_DE_API_PASSWORD=ihr-password
MOBILE_DE_API_SANDBOX=true  # false für Production
```

### Bildverarbeitung

Für AI Background Removal benötigen Sie:
- Python 3.11+
- Rembg installiert: `pip install rembg[gpu]`

## 🐳 Docker Deployment

```bash
# Alle Services starten
docker-compose up -d

# Logs anzeigen
docker-compose logs -f

# Services stoppen
docker-compose down
```

## 📝 Wichtige Features

- ✅ **360° Viewer**: 36-Frame-Sequenzen für Fahrzeuge
- ✅ **PAngV Finanzierungsrechner**: Vollständig konform
- ✅ **Mobile.de Integration**: Automatische Inventar-Synchronisation
- ✅ **GDPR-konform**: Datenschutzerklärung und Consent-Management
- ✅ **SEO-optimiert**: Schema.org Markup für Fahrzeuge
- ✅ **Responsive Design**: Optimiert für alle Geräte

## 🔗 Wichtige Links

- [Mobile.de Seller API Docs](https://services.mobile.de/docs/seller-api.html)
- [PAngV Gesetzestext](https://www.gesetze-im-internet.de/pangv/)
- [Schema.org Automotive](https://schema.org/docs/automotive.html)

## 📞 Support

Bei Fragen wenden Sie sich an:
- E-Mail: info@carcompany24-gmbh.de
- Telefon: +49 (0) 551 / XXX-XXXX
