# CC24 Demo - CarCompany24 Fullstack Webdemo

Vollständige **reaktive und responsive** Next.js 14 Webdemo für CarCompany24 mit VAVSR (VEGA Automotive Virtual Showroom) Integration.

## 🚀 Features

### ✅ Reaktive Features
- **useState & useEffect** - Dynamische State-Verwaltung
- **API Integration** - Live-Daten von Mobile.de
- **Interaktive Komponenten** - Viewer360, VAVSR Showroom
- **Loading States** - Spinner und Ladeanzeigen
- **Error Handling** - Fehlerbehandlung mit Fallbacks
- **Real-time Updates** - Automatische Datenaktualisierung

### ✅ Responsive Design
- **Mobile-First** - Optimiert für alle Bildschirmgrößen
- **Breakpoints** - sm, md, lg, xl (Tailwind CSS)
- **Mobile Navigation** - Hamburger Menu für Mobile
- **Responsive Grids** - Automatische Layout-Anpassung
- **Touch-Friendly** - Optimiert für Touch-Geräte
- **Flexible Images** - Responsive Bilder mit Next.js Image

### ✅ Technologie-Stack
- ✅ Next.js 14 mit App Router
- ✅ TypeScript
- ✅ Tailwind CSS mit VEGA Design System
- ✅ Framer Motion Animationen
- ✅ VAVSR - 360° Virtual Showroom
- ✅ React Query für State Management
- ✅ Axios für API Calls

## 📁 Struktur

```
cc24.demo/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root Layout
│   ├── page.tsx            # Homepage (reaktiv)
│   ├── fahrzeuge/          # Fahrzeuge Seiten (dynamisch)
│   ├── vavsr/              # VAVSR Showroom (interaktiv)
│   └── admin/              # Admin Panel
├── components/             # React Komponenten
│   ├── layout/             # Navigation (responsive), Footer
│   ├── sections/           # Hero, Services, etc. (reaktiv)
│   ├── vavsr/              # VAVSR Komponenten (interaktiv)
│   └── animations/         # ParticleBackground (animiert)
├── lib/                    # Utilities & API (reaktiv)
├── public/                 # Statische Assets
└── scripts/                # Deployment Scripts
```

## 🛠️ Installation

```bash
npm install
```

## 🚀 Development

```bash
npm run dev
```

Die Website läuft auf `http://localhost:3000` mit **Hot Reload** und **Fast Refresh**.

## 📦 Build

```bash
# Standard Build (reaktiv)
npm run build

# Static Export (nur für GitHub Pages)
npm run build:static
```

## 🌐 Multi-Deployment

### Vercel (Empfohlen - Reaktiv)
- Automatisch via GitHub Actions
- Workflow: `.github/workflows/deploy-vercel.yml`
- **Vollständig reaktiv** - Alle Features funktionieren

### GitHub Pages (Statisch)
- Automatisch via GitHub Actions
- Workflow: `.github/workflows/deploy-pages.yml`
- **Eingeschränkt** - Nur statische Seiten

### Docker (Reaktiv)
```bash
docker-compose up --build
```
- Läuft auf Port 3000
- **Vollständig reaktiv**

## 🎨 Reaktive Features im Detail

### 1. VehicleShowcase
- ✅ Live API Calls zu Mobile.de
- ✅ Loading States mit Spinner
- ✅ Error Handling mit Fallbacks
- ✅ Responsive Grid (1 Spalte Mobile, 3 Spalten Desktop)

### 2. VAVSR Showroom
- ✅ Interaktiver 360° Viewer
- ✅ Drag & Drop Navigation
- ✅ Background Selector
- ✅ Auto-Rotate Feature
- ✅ Touch-Gesten für Mobile

### 3. Navigation
- ✅ Mobile Hamburger Menu
- ✅ Smooth Transitions
- ✅ Responsive Breakpoints

### 4. VehicleDetailClient
- ✅ Dynamische Datenladung
- ✅ Bildergalerie mit Interaktion
- ✅ Responsive Layout

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)
- **Large Desktop**: > 1280px (xl)

## 📝 License

Private - CarCompany24 GmbH
