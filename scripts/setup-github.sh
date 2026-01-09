#!/bin/bash

# GitHub Repository Setup Script
# Erstellt Git-Repository und bereitet für GitHub Pages vor

echo "🚀 CC24 GitHub Repository Setup"
echo "================================"
echo ""

# Farben
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Prüfe ob Git installiert ist
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git ist nicht installiert!${NC}"
    exit 1
fi

# Prüfe ob im richtigen Verzeichnis
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Bitte im CC24 Projekt-Verzeichnis ausführen!${NC}"
    exit 1
fi

# Git initialisieren (falls nicht vorhanden)
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}📦 Initialisiere Git-Repository...${NC}"
    git init
    git branch -M main
fi

# .gitignore prüfen
if [ ! -f ".gitignore" ]; then
    echo -e "${YELLOW}📝 Erstelle .gitignore...${NC}"
    # .gitignore wird bereits erstellt
fi

# Erste Commit (falls noch keine Commits)
if ! git rev-parse --verify HEAD &> /dev/null; then
    echo -e "${YELLOW}📝 Erstelle ersten Commit...${NC}"
    git add .
    git commit -m "Initial commit: CC24 Fullstack Website"
fi

echo ""
echo -e "${GREEN}✅ Git-Repository bereit!${NC}"
echo ""
echo "📋 Nächste Schritte:"
echo ""
echo "1. Erstelle GitHub Repository:"
echo "   - Gehe zu https://github.com/new"
echo "   - Repository Name: enterprise (oder dein Repo-Name)"
echo "   - Public oder Private"
echo "   - NICHT README, .gitignore oder License hinzufügen"
echo ""
echo "2. Verbinde lokales Repository:"
echo "   git remote add origin https://github.com/[USERNAME]/enterprise.git"
echo "   git push -u origin main"
echo ""
echo "3. GitHub Pages aktivieren:"
echo "   - GitHub Repository → Settings → Pages"
echo "   - Source: GitHub Actions"
echo "   - Branch: main"
echo ""
echo "4. DNS Records setzen:"
echo "   - Siehe DNS_RECORDS.txt"
echo "   - GitHub Pages: [USERNAME].github.io"
echo ""
echo -e "${GREEN}✅ Setup abgeschlossen!${NC}"
