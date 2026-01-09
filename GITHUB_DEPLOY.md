# 🚀 GitHub Pages Deployment - Schritt für Schritt

## ✅ Schnellstart

### 1. GitHub Repository erstellen

```
1. Gehe zu: https://github.com/new
2. Repository Name: enterprise (oder dein Name)
3. Public oder Private
4. NICHT README, .gitignore oder License hinzufügen
5. Create repository
```

### 2. Code pushen

**PowerShell Script (Empfohlen):**
```powershell
cd C:\VRBS\ENTERPRISE\CarCompany24\CC24
.\scripts\push-to-github.ps1
```

**Oder manuell:**
```bash
git init
git add .
git commit -m "Initial commit: CC24 Website"
git remote add origin https://github.com/[USERNAME]/enterprise.git
git push -u origin main
```

### 3. GitHub Pages aktivieren

```
1. GitHub Repository → Settings → Pages
2. Source: GitHub Actions
3. Branch: main
4. Save
```

### 4. Custom Domains

```
1. GitHub Repository → Settings → Pages
2. Custom domain: cc24.online
3. Custom domain: cc24.vip
4. GitHub erstellt automatisch CNAME Dateien
```

### 5. DNS Records setzen

**Bei deinem Domain-Provider (Namecheap, GoDaddy, etc.):**

**CC24.ONLINE:**
- 4x A Records (@ → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153)
- 1x CNAME (www → [USERNAME].github.io)

**CC24.VIP:**
- 4x A Records (@ → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153)
- 1x CNAME (www → [USERNAME].github.io)

### 6. Warten & Testen

- **GitHub Actions:** 2-5 Minuten
- **DNS Propagation:** 5-60 Minuten
- **SSL:** Automatisch nach DNS

**Teste:**
- https://cc24.online
- https://cc24.vip

## 📋 DNS Records (Kopierbar)

### CC24.ONLINE

```
A Record: @ → 185.199.108.153
A Record: @ → 185.199.109.153
A Record: @ → 185.199.110.153
A Record: @ → 185.199.111.153
CNAME: www → [USERNAME].github.io
```

### CC24.VIP

```
A Record: @ → 185.199.108.153
A Record: @ → 185.199.109.153
A Record: @ → 185.199.110.153
A Record: @ → 185.199.111.153
CNAME: www → [USERNAME].github.io
```

## 🔄 Updates

```bash
git add .
git commit -m "Update: Beschreibung"
git push origin main
```

Automatisches Deployment via GitHub Actions!

---

**Status:** ✅ Ready für GitHub Pages
