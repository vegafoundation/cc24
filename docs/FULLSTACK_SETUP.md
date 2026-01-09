# Fullstack Setup Guide

## 🚀 Vollständige Fullstack-Installation

### Voraussetzungen

- **Node.js 20+** ([Download](https://nodejs.org/))
- **Python 3.11+** ([Download](https://www.python.org/))
- **Docker & Docker Compose** ([Download](https://www.docker.com/))
- **PostgreSQL 16** (optional, wenn nicht via Docker)
- **Git**

### Schritt 1: Repository klonen

```bash
cd C:\VRBS\ENTERPRISE\CarCompany24\CC24
```

### Schritt 2: Frontend Dependencies

```bash
npm install
```

### Schritt 3: Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
cd ..
```

### Schritt 4: Environment Variables

```bash
cp .env.example .env
```

Bearbeite `.env` mit deinen Einstellungen:

```env
DATABASE_URL=postgresql://cc24_user:cc24_password@localhost:5432/cc24_db
REDIS_URL=redis://localhost:6379
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Schritt 5: Database Setup

#### Option A: Mit Docker (empfohlen)

```bash
docker-compose up -d postgres
```

Warte bis PostgreSQL bereit ist, dann:

```bash
# Database Schema initialisieren
docker-compose exec postgres psql -U cc24_user -d cc24_db -f /docker-entrypoint-initdb.d/01-schema.sql
```

#### Option B: Manuell

1. PostgreSQL installieren und starten
2. Database erstellen:
```sql
CREATE DATABASE cc24_db;
CREATE USER cc24_user WITH PASSWORD 'cc24_password';
GRANT ALL PRIVILEGES ON DATABASE cc24_db TO cc24_user;
```

3. Schema importieren:
```bash
psql -U cc24_user -d cc24_db -f toolsets/cc24-database-schema.sql
```

### Schritt 6: Redis Setup

#### Option A: Mit Docker

```bash
docker-compose up -d redis
```

#### Option B: Manuell

```bash
# Windows (mit Chocolatey)
choco install redis-64

# Oder Download von https://redis.io/download
```

### Schritt 7: Services starten

#### Option A: Alles mit Docker (empfohlen)

```bash
docker-compose up -d
```

Services:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/api/docs
- PostgreSQL: localhost:5432
- Redis: localhost:6379

#### Option B: Manuell

**Terminal 1 - Backend:**
```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Schritt 8: Verifizierung

1. **Frontend:** http://localhost:3000
2. **Backend Health:** http://localhost:8000/api/health
3. **API Docs:** http://localhost:8000/api/docs

## 🔧 Development Workflow

### Frontend Development

```bash
npm run dev          # Development Server
npm run build        # Production Build
npm run start        # Production Server
npm run lint         # Linting
npm run type-check   # TypeScript Check
```

### Backend Development

```bash
cd backend
uvicorn main:app --reload    # Development mit Auto-Reload
python -m pytest            # Tests (wenn vorhanden)
```

### Database Migrations

```bash
# Mit Alembic (wenn konfiguriert)
cd backend
alembic upgrade head
```

## 📊 Database Management

### PostgreSQL Console

```bash
docker-compose exec postgres psql -U cc24_user -d cc24_db
```

### Backup

```bash
docker-compose exec postgres pg_dump -U cc24_user cc24_db > backup.sql
```

### Restore

```bash
docker-compose exec -T postgres psql -U cc24_user cc24_db < backup.sql
```

## 🐳 Docker Commands

```bash
# Services starten
docker-compose up -d

# Services stoppen
docker-compose down

# Logs anzeigen
docker-compose logs -f

# Service neu starten
docker-compose restart backend

# Volumes löschen (ACHTUNG: Datenverlust!)
docker-compose down -v
```

## 🔍 Troubleshooting

### Port bereits belegt

```bash
# Windows: Port prüfen
netstat -ano | findstr :3000
netstat -ano | findstr :8000

# Port beenden
taskkill /PID <PID> /F
```

### Database Connection Error

1. Prüfe ob PostgreSQL läuft: `docker-compose ps`
2. Prüfe DATABASE_URL in `.env`
3. Prüfe Firewall-Einstellungen

### Module nicht gefunden

```bash
# Frontend
rm -rf node_modules package-lock.json
npm install

# Backend
cd backend
pip install -r requirements.txt --force-reinstall
```

## 📚 Nächste Schritte

1. **Bilder hinzufügen:** Siehe `docs/BILDER_ANLEITUNG.md`
2. **VAVSR konfigurieren:** Siehe `docs/VAVSR_INTEGRATION.md`
3. **API testen:** http://localhost:8000/api/docs
4. **Production Build:** `npm run build`

## 🚀 Production Deployment

Siehe `docs/DEPLOYMENT.md` für Production-Setup.

---

**Status:** ✅ Fullstack-Setup komplett
