# 🚀 QUICK PUSH - Sofort zu GitHub

## ⚡ Schnellste Methode

### 1. GitHub Repository erstellen
```
https://github.com/new
- Name: enterprise
- Public
- Create
```

### 2. Push ausführen

**Option A: Mit Script (Empfohlen)**
```powershell
cd C:\VRBS\ENTERPRISE\CarCompany24\CC24
.\scripts\direct-push.ps1
```
Das Script fragt nach der Repository URL und pusht automatisch!

**Option B: Manuell**
```powershell
cd C:\VRBS\ENTERPRISE\CarCompany24\CC24

# Remote hinzufügen (ersetze USERNAME)
git remote add origin https://github.com/USERNAME/enterprise.git

# Pushen
git push -u origin main
```

### 3. GitHub Pages aktivieren
```
1. Gehe zu: https://github.com/USERNAME/enterprise/settings/pages
2. Source: GitHub Actions
3. Branch: main
4. Save
```

## ✅ Fertig!

Nach dem Push:
- Repository: `https://github.com/USERNAME/enterprise`
- GitHub Pages: `https://USERNAME.github.io/enterprise/`
