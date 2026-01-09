# Deployment Guide - CC24.ONLINE & CC24.VIP

## 🚀 Production Deployment

### Voraussetzungen

- ✅ Domains gesichert: `cc24.online` und `cc24.vip`
- ✅ Vercel Account (oder alternativer Hosting-Provider)
- ✅ Backend API (Railway, Render, oder eigene Server)

## 📦 Deployment-Optionen

### Option 1: Vercel (Empfohlen für Frontend)

#### 1. Vercel-Projekt erstellen

```bash
# Installiere Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

#### 2. Domains verbinden

**Für CC24.ONLINE:**
1. Vercel Dashboard → Project Settings → Domains
2. `cc24.online` hinzufügen
3. `www.cc24.online` hinzufügen (optional)

**Für CC24.VIP:**
1. Neues Vercel-Projekt erstellen
2. `cc24.vip` hinzufügen
3. `www.cc24.vip` hinzufügen (optional)

#### 3. Environment Variables

**CC24.ONLINE:**
```env
NEXT_PUBLIC_DOMAIN=online
NEXT_PUBLIC_API_URL=https://api.cc24.online
NEXT_PUBLIC_BACKEND_URL=https://api.cc24.online
```

**CC24.VIP:**
```env
NEXT_PUBLIC_DOMAIN=vip
NEXT_PUBLIC_API_URL=https://api.cc24.vip
NEXT_PUBLIC_BACKEND_URL=https://api.cc24.vip
```

### Option 2: Docker Production

```bash
# Production Build
docker-compose -f docker-compose.prod.yml build

# Starten
docker-compose -f docker-compose.prod.yml up -d
```

### Option 3: Eigenes Hosting

#### Build erstellen

```bash
npm run build
npm start
```

## 🔧 Backend Deployment

### Railway (Empfohlen)

1. **Projekt erstellen:**
   - Railway Dashboard → New Project
   - GitHub Repository verbinden

2. **Environment Variables:**
```env
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
ENVIRONMENT=production
```

3. **Deploy:**
   - Automatisch bei Git Push

### Render

1. **New Web Service**
2. **Build Command:** `cd backend && pip install -r requirements.txt`
3. **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`

## 🌐 DNS Konfiguration

### CC24.ONLINE

```
A Record: @ → Vercel IP
CNAME: www → cname.vercel-dns.com
```

### CC24.VIP

```
A Record: @ → Vercel IP
CNAME: www → cname.vercel-dns.com
```

## 🔒 SSL-Zertifikate

- **Vercel:** Automatisch (Let's Encrypt)
- **Eigenes Hosting:** Certbot oder Cloudflare

## 📊 Monitoring

### Analytics Setup

1. **Google Analytics 4**
   - Property für CC24.ONLINE
   - Property für CC24.VIP

2. **Vercel Analytics**
   - Automatisch aktiviert

### Error Tracking

- **Sentry** (optional)
- **Vercel Error Logs**

## ✅ Pre-Deployment Checklist

- [ ] Environment Variables gesetzt
- [ ] Database migriert
- [ ] SSL-Zertifikate aktiv
- [ ] DNS konfiguriert
- [ ] Analytics eingerichtet
- [ ] Error Tracking aktiv
- [ ] Performance getestet
- [ ] SEO-Metadaten geprüft
- [ ] Sitemap generiert
- [ ] Robots.txt konfiguriert

## 🚨 Post-Deployment

1. **Health Checks:**
   - https://cc24.online/api/health
   - https://cc24.vip/api/health

2. **SEO Prüfung:**
   - Google Search Console
   - Sitemap submit
   - Robots.txt prüfen

3. **Performance:**
   - Lighthouse Score
   - Core Web Vitals

## 📝 Nächste Schritte

1. ✅ Domains gesichert
2. ⏳ DNS konfigurieren
3. ⏳ Vercel Deployment
4. ⏳ Backend Deployment
5. ⏳ SSL aktivieren
6. ⏳ Analytics einrichten
7. ⏳ Monitoring setup

---

**Status:** ✅ Deployment-Ready
