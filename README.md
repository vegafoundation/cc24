# 🚗 CarCompany24 - Fullstack Webdemo v1.0.0

**Multi-Domain Website für CC24.ONLINE und CC24.VIP**

Professionelle Autohändler-Website mit 360° Virtual Showroom, Finanzierungsrechner und Online-Börse.

**Status:** ✅ Production Ready | GitHub Pages Deployed

## 🌐 Domains

- **CC24.ONLINE** - Online-Fokus, schnelle Transaktionen
- **CC24.VIP** - Premium-Fokus, exklusive Fahrzeuge
- **GitHub Pages** - Live Webdemo

## 🚀 Quick Deploy - GitHub Pages

### Schritt 1: GitHub Repository erstellen

1. Gehe zu https://github.com/new
2. Repository Name: `enterprise` (oder dein Name)
3. Public oder Private
4. **NICHT** README, .gitignore oder License hinzufügen
5. Create repository

### Schritt 2: Code pushen

```powershell
# PowerShell Script (Empfohlen)
cd C:\VRBS\ENTERPRISE\CarCompany24\CC24
.\scripts\quick-deploy.ps1
```

**Oder manuell:**
```bash
git init
git add .
git commit -m "Initial commit: CC24 Website"
git remote add origin https://github.com/[USERNAME]/enterprise.git
git push -u origin main
```

### Schritt 3: GitHub Pages aktivieren

1. GitHub Repository → **Settings** → **Pages**
2. **Source:** GitHub Actions
3. **Branch:** main
4. Save

### Schritt 4: Custom Domains hinzufügen

1. GitHub Repository → **Settings** → **Pages**
2. **Custom domain:** `cc24.online` hinzufügen
3. **Custom domain:** `cc24.vip` hinzufügen
4. GitHub erstellt automatisch `CNAME` Dateien

### Schritt 5: DNS Records setzen

**Bei deinem Domain-Provider:**

**CC24.ONLINE:**
```
4x A Records:
@ → 185.199.108.153
@ → 185.199.109.153
@ → 185.199.110.153
@ → 185.199.111.153

1x CNAME:
www → [USERNAME].github.io
```

**CC24.VIP:**
```
4x A Records:
@ → 185.199.108.153
@ → 185.199.109.153
@ → 185.199.110.153
@ → 185.199.111.153

1x CNAME:
www → [USERNAME].github.io
```

**WICHTIG:** Alle 4 IPs müssen gesetzt werden!

### Schritt 6: Warten & Testen

- **GitHub Actions:** 2-5 Minuten
- **DNS Propagation:** 5-60 Minuten
- **SSL:** Automatisch nach DNS

**Teste:**
- https://cc24.online
- https://cc24.vip

## 📋 DNS Records

Siehe `DNS_RECORDS.txt` für alle DNS-Konfigurationen.

## 🎯 Features

### Frontend (Next.js 14)
- ✅ **Multi-Domain Support** - CC24.ONLINE & CC24.VIP
- ✅ **Animative UI** - Micro-Partikel, Scroll-Reveal
- ✅ **360° VAVSR Showroom** - Aus 8 Fotos
- ✅ **Demo-Komponenten** - Stats, Testimonials, Newsletter
- ✅ **GitHub Pages Ready** - Statischer Export

### Backend (FastAPI)
- ✅ **PostgreSQL Database**
- ✅ **VEGA Commission** - 13.58%
- ✅ **REST API**

## 📁 Projektstruktur

```
CC24/
├── .github/
│   └── workflows/
│       └── deploy-pages.yml    # GitHub Actions
├── app/                        # Next.js App Router
├── components/                 # React Komponenten
├── backend/                    # FastAPI Backend
├── scripts/                    # Deployment Scripts
└── docs/                       # Dokumentation
```

## 🔄 Updates deployen

```bash
git add .
git commit -m "Update: Beschreibung"
git push origin main
```

Automatisches Deployment via GitHub Actions!

## 📚 Dokumentation

- `DNS_RECORDS.txt` - Alle DNS Records
- `GITHUB_DEPLOY.md` - Schnellstart-Guide
- `DEPLOYMENT.md` - Vollständige Anleitung
- `docs/GITHUB_PAGES_SETUP.md` - Detailliertes Setup

## ✅ Deployment-Checklist

- [ ] GitHub Repository erstellt
- [ ] Code gepusht (`.\scripts\quick-deploy.ps1`)
- [ ] GitHub Pages aktiviert (GitHub Actions)
- [ ] Custom Domains hinzugefügt (cc24.online, cc24.vip)
- [ ] DNS Records gesetzt (alle 4 IPs)
- [ ] DNS Propagation geprüft (dnschecker.org)
- [ ] Website erreichbar (https://cc24.online)
- [ ] SSL aktiv (automatisch)

---

**Status:** ✅ GitHub Pages Ready

**Domains:** CC24.ONLINE ✅ | CC24.VIP ✅

**Deployment:** Automatisch via GitHub Actions
