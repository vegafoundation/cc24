# 🚀 Push Instructions - CC24 v1.0.0

## Automatischer Push zu GitHub

### Option 1: Auto-Push Script (Empfohlen)

```powershell
cd C:\VRBS\ENTERPRISE\CarCompany24\CC24
.\scripts\auto-push-github.ps1
```

Das Script:
- ✅ Prüft Git Status
- ✅ Erstellt Commit (falls nötig)
- ✅ Fragt nach GitHub Repository URL
- ✅ Pusht automatisch
- ✅ Zeigt GitHub Pages Links

### Option 2: Manueller Push

**1. GitHub Repository erstellen:**
- Gehe zu: https://github.com/new
- Repository Name: `enterprise` oder `cc24-demo`
- Public (für GitHub Pages)
- Create repository

**2. Remote hinzufügen:**
```bash
git remote add origin https://github.com/[USERNAME]/[REPO].git
```

**3. Pushen:**
```bash
git push -u origin main
```

## GitHub Pages aktivieren

**Nach dem Push:**

1. Gehe zu: `https://github.com/[USERNAME]/[REPO]/settings/pages`
2. **Source:** GitHub Actions
3. **Branch:** main
4. **Save**

**Custom Domains:**
1. In Pages Settings → Custom domain
2. `cc24.online` hinzufügen
3. `cc24.vip` hinzufügen

## DNS Records

Siehe `DNS_RECORDS.txt` für alle DNS-Konfigurationen.

**GitHub Pages IPs (alle 4 müssen gesetzt werden):**
- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

## Links nach Deployment

**GitHub Repository:**
```
https://github.com/[USERNAME]/[REPO]
```

**GitHub Pages (vor DNS):**
```
https://[USERNAME].github.io/[REPO]/
```

**Nach DNS Setup:**
```
https://cc24.online
https://cc24.vip
```

---

**Status:** ✅ Ready für Push
