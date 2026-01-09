# 🚀 SOFORT PUSH - Anleitung

## Schritt 1: GitHub Repository erstellen

1. Gehe zu: **https://github.com/new**
2. Repository Name: `enterprise` (oder `cc24-demo`)
3. **Public** (für GitHub Pages)
4. **NICHT** README, .gitignore oder License hinzufügen
5. **Create repository**

## Schritt 2: Remote hinzufügen und pushen

```powershell
cd C:\VRBS\ENTERPRISE\CarCompany24\CC24

# Remote hinzufügen (ersetze USERNAME und REPO)
git remote add origin https://github.com/USERNAME/enterprise.git

# Pushen
git push -u origin main
```

## Schritt 3: GitHub Pages aktivieren

1. Gehe zu: `https://github.com/USERNAME/enterprise/settings/pages`
2. **Source:** GitHub Actions
3. **Branch:** main
4. **Save**

## Automatisch mit Script

```powershell
.\scripts\direct-push.ps1
```

Das Script führt dich durch den gesamten Prozess!
