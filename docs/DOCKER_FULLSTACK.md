# 🐳 CC24 Fullstack Docker Deployment

Vollständige Docker-Deployment-Lösung für CC24 mit allen Services.

## 📦 Services

| Service | Port | Beschreibung |
|---------|------|--------------|
| **Frontend** | 3000 | Next.js 14 Web Application |
| **Backend** | 8000 | FastAPI REST API |
| **ML Worker** | 8001 | Background Removal Service |
| **PostgreSQL** | 5432 | Primary Database |
| **Redis** | 6379 | Cache & Queue |
| **Nginx** | 80/443 | Reverse Proxy (Production) |

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/vegafoundation/cc24.git
cd cc24
```

### 2. Environment Configuration

```bash
cp .env.example .env
# Bearbeite .env mit deinen Einstellungen
```

### 3. Start All Services

```bash
# Development (ohne Nginx)
docker-compose -f docker-compose.fullstack.yml up -d

# Production (mit Nginx)
docker-compose -f docker-compose.fullstack.yml --profile production up -d
```

### 4. Verify Deployment

```bash
# Status prüfen
docker-compose -f docker-compose.fullstack.yml ps

# Logs anzeigen
docker-compose -f docker-compose.fullstack.yml logs -f
```

## 🔗 Access Points

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| API Docs | http://localhost:8000/docs |
| Health Check | http://localhost:8000/api/health |
| ML Worker | http://localhost:8001 |

## 🛠️ Configuration

### Environment Variables

| Variable | Default | Beschreibung |
|----------|---------|--------------|
| `POSTGRES_USER` | cc24_user | Database username |
| `POSTGRES_PASSWORD` | cc24_password | Database password |
| `POSTGRES_PORT` | 5432 | PostgreSQL port |
| `REDIS_PORT` | 6379 | Redis port |
| `BACKEND_PORT` | 8000 | Backend API port |
| `FRONTEND_PORT` | 3000 | Frontend port |
| `ML_WORKER_PORT` | 8001 | ML Worker port |
| `NEXT_PUBLIC_DOMAIN` | online | Domain type (online/vip) |
| `NEXT_PUBLIC_API_URL` | http://localhost:8000 | Backend API URL |

## 📊 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    🌐 NGINX (Production)                    │
│                    Port: 80 / 443                           │
└─────────────────────────────────────────────────────────────┘
                              │
         ┌────────────────────┴────────────────────┐
         │                                         │
         ▼                                         ▼
┌─────────────────┐                    ┌─────────────────────┐
│    Frontend     │                    │      Backend        │
│   (Next.js)     │◄──────────────────►│     (FastAPI)       │
│   Port: 3000    │                    │     Port: 8000      │
└─────────────────┘                    └─────────────────────┘
                                                  │
                           ┌──────────────────────┼──────────────────────┐
                           │                      │                      │
                           ▼                      ▼                      ▼
                  ┌─────────────┐        ┌─────────────┐        ┌─────────────┐
                  │  PostgreSQL │        │    Redis    │        │  ML Worker  │
                  │  Port: 5432 │        │ Port: 6379  │        │ Port: 8001  │
                  └─────────────┘        └─────────────┘        └─────────────┘
```

## 🔧 Commands

### Start Services

```bash
# Alle Services starten
docker-compose -f docker-compose.fullstack.yml up -d

# Einzelnen Service starten
docker-compose -f docker-compose.fullstack.yml up -d backend

# Mit Build
docker-compose -f docker-compose.fullstack.yml up -d --build
```

### Stop Services

```bash
# Alle Services stoppen
docker-compose -f docker-compose.fullstack.yml down

# Mit Volume-Löschung (ACHTUNG: Datenverlust!)
docker-compose -f docker-compose.fullstack.yml down -v
```

### Logs

```bash
# Alle Logs
docker-compose -f docker-compose.fullstack.yml logs -f

# Spezifischer Service
docker-compose -f docker-compose.fullstack.yml logs -f backend
```

### Database

```bash
# PostgreSQL Console
docker-compose -f docker-compose.fullstack.yml exec postgres psql -U cc24_user -d cc24

# Backup erstellen
docker-compose -f docker-compose.fullstack.yml exec postgres pg_dump -U cc24_user cc24 > backup.sql

# Backup wiederherstellen
docker-compose -f docker-compose.fullstack.yml exec -T postgres psql -U cc24_user cc24 < backup.sql
```

### Rebuild

```bash
# Einzelnen Service neu bauen
docker-compose -f docker-compose.fullstack.yml build backend

# Alle Services neu bauen
docker-compose -f docker-compose.fullstack.yml build --no-cache
```

## 🔐 Production Checklist

- [ ] Starke Passwörter in `.env` setzen
- [ ] SSL-Zertifikate für Nginx konfigurieren
- [ ] Firewall-Regeln einrichten
- [ ] Backup-Strategie implementieren
- [ ] Monitoring einrichten
- [ ] Rate Limiting aktivieren

## 🐛 Troubleshooting

### Container startet nicht

```bash
# Logs prüfen
docker-compose -f docker-compose.fullstack.yml logs backend

# Container Status
docker-compose -f docker-compose.fullstack.yml ps
```

### Database Connection Fehler

```bash
# Prüfen ob PostgreSQL läuft
docker-compose -f docker-compose.fullstack.yml exec postgres pg_isready

# Database erstellen falls nicht existiert
docker-compose -f docker-compose.fullstack.yml exec postgres createdb -U cc24_user cc24
```

### Port bereits belegt

```bash
# Ports in .env ändern
BACKEND_PORT=8080
FRONTEND_PORT=3001
```

## 📚 Weitere Dokumentation

- [Fullstack Setup Guide](docs/FULLSTACK_SETUP.md)
- [API Documentation](http://localhost:8000/docs)
- [Deployment Guide](docs/DEPLOYMENT.md)

---

**Status:** ✅ Production Ready  
**Version:** 2.0.0  
**Powered by:** VEGA Enterprise Wisdom
