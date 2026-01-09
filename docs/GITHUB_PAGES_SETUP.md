# GitHub Pages Deployment - CC24.ONLINE & CC24.VIP

## 🚀 GitHub Pages Setup

### Schritt 1: GitHub Repository erstellen

1. Gehe zu https://github.com/new
2. Repository Name: `enterprise` (oder dein gewünschter Name)
3. Description: "CC24 Fullstack Website - Multi-Domain Support"
4. Public oder Private
5. **WICHTIG:** NICHT README, .gitignore oder License hinzufügen
6. Create repository

### Schritt 2: Lokales Repository vorbereiten

```bash
# Im Projekt-Verzeichnis
cd C:\VRBS\ENTERPRISE\CarCompany24\CC24

# Git initialisieren (falls nicht vorhanden)
git init
git branch -M main

# Alles hinzufügen
git add .

# Ersten Commit erstellen
git commit -m "Initial commit: CC24 Fullstack Website - Multi-Domain Support für CC24.ONLINE und CC24.VIP"
```

### Schritt 3: Mit GitHub verbinden

```bash
# Remote hinzufügen (ersetze [USERNAME] mit deinem GitHub Username)
git remote add origin https://github.com/[USERNAME]/enterprise.git

# Code pushen
git push -u origin main
```

### Schritt 4: GitHub Pages aktivieren

1. Gehe zu deinem GitHub Repository
2. Settings → Pages
3. Source: **GitHub Actions**
4. Branch: `main`
5. Save

### Schritt 5: GitHub Actions Workflow

Der Workflow ist bereits in `.github/workflows/deploy-pages.yml` vorhanden.

**Automatisch nach Push:**
- Build wird ausgeführt
- Statischer Export erstellt
- Deployment zu GitHub Pages

### Schritt 6: DNS Records für GitHub Pages

#### Option A: GitHub Pages Subdomain

**CC24.ONLINE:**
```
Type: CNAME
Name: @
Value: [USERNAME].github.io
TTL: Automatic
```

**CC24.VIP:**
```
Type: CNAME
Name: @
Value: [USERNAME].github.io
TTL: Automatic
```

#### Option B: Custom Domain (Empfohlen)

1. **GitHub Repository → Settings → Pages**
2. Custom domain hinzufügen: `cc24.online`
3. Custom domain hinzufügen: `cc24.vip`
4. GitHub erstellt automatisch `CNAME` Dateien

**DNS Records:**
```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153

Type: CNAME
Name: www
Value: [USERNAME].github.io
```

**GitHub Pages IPs (2024):**
- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

### Schritt 7: Environment Variables (Optional)

**GitHub Repository → Settings → Secrets and variables → Actions:**

```
NEXT_PUBLIC_DOMAIN=online
NEXT_PUBLIC_API_URL=https://api.cc24.online
NEXT_PUBLIC_GA_ID_ONLINE=G-XXXXXXXXXX
```

### Schritt 8: Verifizierung

Nach dem ersten Push:
1. Warte 2-5 Minuten auf GitHub Actions
2. Prüfe Actions Tab → Deploy to GitHub Pages
3. Website sollte erreichbar sein:
   - https://[USERNAME].github.io/enterprise/ (wenn basePath gesetzt)
   - Oder https://cc24.online (wenn Custom Domain)

## 🔧 GitHub Pages Konfiguration

### BasePath für Subfolder

Wenn Repository `enterprise` heißt und CC24 im Unterordner ist:

```javascript
// next.config.js
basePath: '/enterprise/CC24',
assetPrefix: '/enterprise/CC24',
```

### Custom Domain Setup

1. GitHub erstellt automatisch `public/CNAME` Dateien
2. DNS Records setzen (siehe oben)
3. Warte auf DNS Propagation
4. SSL wird automatisch aktiviert

## 📊 GitHub Actions Workflow

Der Workflow (`.github/workflows/deploy-pages.yml`):
- ✅ Läuft automatisch bei Push zu `main`
- ✅ Build Next.js App
- ✅ Statischer Export
- ✅ Deployment zu GitHub Pages

## 🔄 Updates deployen

```bash
# Änderungen committen
git add .
git commit -m "Update: Beschreibung der Änderungen"

# Pushen (triggert automatisches Deployment)
git push origin main
```

## ✅ Deployment-Checklist

- [ ] GitHub Repository erstellt
- [ ] Code gepusht
- [ ] GitHub Pages aktiviert (GitHub Actions)
- [ ] Erster Deployment erfolgreich
- [ ] Custom Domains hinzugefügt (optional)
- [ ] DNS Records gesetzt
- [ ] SSL aktiv (automatisch bei Custom Domain)
- [ ] Website erreichbar

## 🆘 Troubleshooting

### GitHub Actions fehlgeschlagen
- Prüfe Actions Tab → Logs
- `npm run build` lokal testen
- Environment Variables prüfen

### Website zeigt 404
- BasePath in `next.config.js` prüfen
- GitHub Pages Source prüfen (muss GitHub Actions sein)

### Custom Domain funktioniert nicht
- DNS Records prüfen (dnschecker.org)
- CNAME Datei in `public/` prüfen
- Warte auf DNS Propagation (bis zu 24h)

---

**Status:** ✅ GitHub Pages Ready
