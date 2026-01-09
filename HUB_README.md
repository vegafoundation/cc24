# 🎯 CC24 Demo Hub - Präsentations- & Entwicklungshub

## Übersicht

Der CC24 Demo Hub ist eine zentrale Präsentations- und Entwicklungsumgebung, die alle 9 Versionen der CC24 Demo sammelt und präsentiert.

## 🚀 Zugriff

**Live Hub:** `/hub` oder `https://cc24.online/hub`

## 📋 Features

### Präsentation
- ✅ Übersicht aller 9 Versionen
- ✅ Detaillierte Feature-Listen
- ✅ Status-Anzeige (Stable, Current)
- ✅ Filter-Funktionen
- ✅ Interaktive Karten

### Entwicklung
- ✅ Direkte Links zu GitHub Branches
- ✅ Commit-Links
- ✅ Compare-Funktionen
- ✅ Deployment-Links (GitHub Pages, Vercel, Docker)

### Deployment-Optionen
- ✅ **GitHub Pages** - Statische Website
- ✅ **Vercel** - Serverless Deployment
- ✅ **Docker** - Container-Images

## 📊 Versionen im Hub

1. **v1-initial** - Initial Setup
2. **v2-full-features** - Vollständige Features
3. **v3-fix** - VehicleDetailClient Fix
4. **v4-multi** - Multi-Deployment
5. **v5-enterprise** - Enterprise Version
6. **v6-config** - Next.js Config Fix
7. **v7-platform** - Initiale Platform
8. **v8-modular** - Modular Structure
9. **v9-current** - Current (Final)

## 🔗 Links

### GitHub
- **Repository:** https://github.com/vegafoundation/cc24
- **Branches:** https://github.com/vegafoundation/cc24/branches
- **Actions:** https://github.com/vegafoundation/cc24/actions

### Dokumentation
- **Versionshistorie:** `/VERSIONS_HISTORY.md`
- **Detaillierte Übersicht:** `/VERSIONS_DETAILED.md`
- **Hub README:** `/HUB_README.md`

### Scripts
- **Rekonstruieren:** `/scripts/reconstruct-versions.ps1`
- **Vergleichen:** `/scripts/compare-versions.ps1`
- **Deploy All:** `/scripts/deploy-all-versions.ps1`

## 🎨 Design

- **Dark Theme** - Modernes Dark-Design
- **Gradient Backgrounds** - Cyan zu Emerald
- **Responsive** - Mobile-first Design
- **Interactive** - Hover-Effekte und Animationen

## 📱 Features im Detail

### Filter
- **Alle** - Zeigt alle Versionen
- **Stable** - Nur stabile Versionen
- **Current** - Nur aktuelle Version

### Version-Karten
- **Header** - Name, Status, Beschreibung
- **Info** - Branch, Commit-Hash, Datum
- **Features** - Feature-Liste
- **Actions** - Code, Commit, Compare Links
- **Deployment** - GitHub Pages, Vercel, Docker Links (bei Klick)

### Stats
- Anzahl Versionen
- Anzahl Stable
- Deployment-Optionen
- Production Ready Status

## 🛠️ Entwicklung

### Lokal starten:
```bash
npm run dev
# Dann zu http://localhost:3000/hub navigieren
```

### Build:
```bash
npm run build
npm start
```

## 📝 Notizen

- Der Hub ist vollständig client-side gerendert
- Alle Links öffnen in neuen Tabs
- GitHub-Links verwenden die vegafoundation Organisation
- Docker Images sind im GitHub Container Registry

---

**Erstellt:** 2026-01-09  
**Status:** ✅ Production Ready  
**Version:** 1.0.0
