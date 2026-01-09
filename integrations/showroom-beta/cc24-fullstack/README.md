# 🚗 CC24 Virtual Showroom

> **Open Source Alternative zu Pixel24/GAD24**
> 
> Professionelle 360° Virtual Showrooms für Autohäuser - Selbst gehostet, keine monatlichen Kosten!

![CC24 Virtual Showroom](https://img.shields.io/badge/Version-1.0.0-00D4D4?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Node](https://img.shields.io/badge/Node-20+-339933?style=for-the-badge&logo=nodedotjs)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python)

---

## ✨ Features

| Feature | CC24 | Pixel24/GAD24 |
|---------|------|---------------|
| **360° Frames** | 36 (smooth) | 16 (choppy) |
| **Verarbeitung** | ~30 Sek/Bild | 8-24 Stunden |
| **Kosten** | €0 (self-hosted) | €39-200/Monat |
| **Eigene Backgrounds** | ✅ Unlimited | ❌ Vorgegeben |
| **DSGVO** | ✅ 100% lokal | ⚠️ Cloud |
| **GPU Support** | ✅ Optional | ❌ Cloud only |
| **Open Source** | ✅ MIT License | ❌ Proprietär |

---

## 🚀 Quick Start

### Option 1: Mit Docker (Empfohlen)

```bash
# 1. Repository klonen
git clone https://github.com/carcompany24/cc24-showroom.git
cd cc24-showroom

# 2. Starten
chmod +x start.sh
./start.sh

# Oder direkt mit Docker Compose:
docker-compose up -d
```

**Fertig!** Öffne http://localhost:3000

### Option 2: Manuell (Entwicklung)

```bash
# Terminal 1: Backend
cd backend
npm install
npm run dev

# Terminal 2: ML Worker (für Hintergrund-Entfernung)
cd ml-worker
pip install -r requirements.txt
python app.py

# Terminal 3: Frontend
cd frontend
npm install
npm run dev
```

---

## 📁 Projektstruktur

```
cc24-fullstack/
├── frontend/               # React Frontend
│   ├── src/
│   │   └── App.jsx        # Haupt-Komponente
│   ├── package.json
│   └── vite.config.js
│
├── backend/                # Node.js API
│   ├── server.js          # Express Server
│   └── package.json
│
├── ml-worker/             # Python ML Service
│   ├── app.py             # FastAPI + Rembg
│   └── requirements.txt
│
├── docker/                # Docker Configs
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   └── Dockerfile.ml-worker
│
├── docker-compose.yml     # Full Stack Setup
├── .env.example           # Environment Template
├── start.sh              # Startup Script
└── README.md
```

---

## 📸 Foto-Anleitung

### Minimum 8 Fotos für 360° Showroom:

```
     315°        0°        45°
       ↖️         🚗         ↗️
        
  270° ⬅️                   ➡️ 90°
        
       ↙️         🔙         ↘️
     225°       180°       135°
```

| # | Winkel | Position |
|---|--------|----------|
| 1 | 0° | Front |
| 2 | 45° | Front-Rechts |
| 3 | 90° | Rechte Seite |
| 4 | 135° | Heck-Rechts |
| 5 | 180° | Heck |
| 6 | 225° | Heck-Links |
| 7 | 270° | Linke Seite |
| 8 | 315° | Front-Links |

### Tipps für beste Ergebnisse:

- 📏 **Kamera-Höhe**: Radnaben-Höhe
- 📐 **Abstand**: 3-5 Meter zum Fahrzeug
- ☀️ **Licht**: Gleichmäßig, kein direktes Sonnenlicht
- 🎨 **Hintergrund**: Wird automatisch entfernt

---

## 🔌 API Endpoints

### Upload

```bash
# Einzelbild
POST /api/upload
Content-Type: multipart/form-data
Body: { file, vehicleId, angle }

# Batch Upload
POST /api/upload/batch
Body: { files[], vehicleId }
```

### Processing

```bash
# Background entfernen
POST /api/process/remove-background
Body: { imageId, model: "u2net" }

# 360° generieren
POST /api/process/generate-360
Body: { vehicleId, background, frames }
```

### Showroom

```bash
# Abrufen
GET /api/showroom/:vehicleId

# Exportieren
GET /api/showroom/:vehicleId/export?platform=mobilede
```

---

## 🎨 Verfügbare Backgrounds

| ID | Name | Vorschau |
|----|------|----------|
| `studio_white` | Studio Weiß | ⬜ Clean Look |
| `studio_dark` | Studio Dunkel | ⬛ Premium Feel |
| `showroom_cyan` | CC24 Showroom | 🔵 Cyber Look |
| `showroom_luxury` | Luxus Gold | 🟡 High-End |
| `outdoor_sunset` | Sonnenuntergang | 🟠 Warm |
| `outdoor_nature` | Natur Grün | 🟢 Fresh |

---

## ⚙️ Konfiguration

### .env Datei

```env
# API
PORT=8000

# Frontend
VITE_API_URL=http://localhost:8000

# Redis
REDIS_URL=redis://localhost:6379

# ML Worker
ML_WORKER_URL=http://localhost:8001
REMBG_MODEL=u2net  # oder birefnet-general

# Storage
UPLOAD_DIR=./uploads
PROCESSED_DIR=./processed
```

### ML Modelle

| Modell | Qualität | Geschwindigkeit | VRAM |
|--------|----------|-----------------|------|
| `u2netp` | ⭐⭐ | ⚡⚡⚡ | 0.5GB |
| `u2net` | ⭐⭐⭐ | ⚡⚡ | 1GB |
| `isnet-general-use` | ⭐⭐⭐⭐ | ⚡ | 2GB |
| `birefnet-general` | ⭐⭐⭐⭐⭐ | ⚡ | 3GB |

---

## 🐳 Production Deployment

### Mit Docker Compose

```bash
docker-compose -f docker-compose.yml up -d
```

### Mit GPU Support

```bash
# In docker-compose.yml uncomment:
# deploy:
#   resources:
#     reservations:
#       devices:
#         - driver: nvidia
#           count: 1
#           capabilities: [gpu]

docker-compose up -d
```

---

## 📊 Performance

- **Upload**: ~1-2 Sek pro Bild
- **Background Removal**: ~3-5 Sek (CPU), ~0.5 Sek (GPU)
- **360° Generation**: ~10-30 Sek (je nach Bildanzahl)
- **Concurrent Users**: 50+ (mit Redis Queue)

---

## 🔒 Sicherheit & DSGVO

- ✅ Alle Bilder werden lokal verarbeitet
- ✅ Keine Cloud-Uploads
- ✅ Automatische Kennzeichen-Erkennung
- ✅ Daten bleiben auf eigenem Server
- ✅ Einfache Löschung möglich

---

## 📄 Lizenz

MIT License - Frei für kommerzielle Nutzung

---

## 🤝 Credits

- **rembg** - Background Removal
- **Sharp** - Image Processing
- **BullMQ** - Job Queue
- **React** - Frontend
- **FastAPI** - ML Worker

---

**Made with ❤️ by CarCompany24 GmbH, Göttingen**

*Besser als Pixel24 - Open Source & Self-Hosted*
