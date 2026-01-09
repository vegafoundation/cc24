# DNS Records & Deployment Guide

## 🌐 DNS Records für CC24.ONLINE & CC24.VIP

### Option 1: Vercel Deployment (EMPFOHLEN)

Vercel ist die einfachste Lösung für Next.js-Apps mit automatischem SSL.

#### DNS Records für CC24.ONLINE

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

#### DNS Records für CC24.VIP

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**Vercel IP-Adressen (können sich ändern):**
- `76.76.21.21` (Haupt-IP)
- `76.76.21.22` (Backup)

**Alternative:** CNAME auf `cname.vercel-dns.com` (wenn A-Record nicht funktioniert)

### Option 2: Eigenes Hosting (VPS/Server)

#### DNS Records (Cloudflare/Namecheap/etc.)

**CC24.ONLINE:**
```
Type: A
Name: @
Value: [DEINE_SERVER_IP]
TTL: Auto

Type: A
Name: www
Value: [DEINE_SERVER_IP]
TTL: Auto
```

**CC24.VIP:**
```
Type: A
Name: @
Value: [DEINE_SERVER_IP]
TTL: Auto

Type: A
Name: www
Value: [DEINE_SERVER_IP]
TTL: Auto
```

### Option 3: Cloudflare (CDN + DNS)

**CC24.ONLINE:**
```
Type: A
Name: @
Value: [SERVER_IP]
Proxy: ✅ (Orange Cloud aktiviert)

Type: CNAME
Name: www
Value: cc24.online
Proxy: ✅
```

**CC24.VIP:**
```
Type: A
Name: @
Value: [SERVER_IP]
Proxy: ✅ (Orange Cloud aktiviert)

Type: CNAME
Name: www
Value: cc24.vip
Proxy: ✅
```

## 🚀 Deployment-Optionen

### Option A: Vercel (EMPFOHLEN - Einfachste Lösung)

#### Vorteile:
- ✅ Automatisches SSL (Let's Encrypt)
- ✅ Automatisches Deployment bei Git Push
- ✅ CDN weltweit
- ✅ Next.js optimiert
- ✅ Kostenlos für kleine Projekte

#### Schritt-für-Schritt:

**1. Vercel Account erstellen:**
- Gehe zu https://vercel.com
- Sign Up mit GitHub/GitLab/Bitbucket

**2. Projekt importieren:**
```bash
# Installiere Vercel CLI
npm i -g vercel

# Login
vercel login

# Im Projekt-Verzeichnis
cd C:\VRBS\ENTERPRISE\CarCompany24\CC24

# Deploy
vercel
```

**3. Domains verbinden:**
- Vercel Dashboard → Project → Settings → Domains
- `cc24.online` hinzufügen
- `cc24.vip` hinzufügen

**4. DNS Records setzen:**
- Gehe zu deinem Domain-Provider (z.B. Namecheap, GoDaddy)
- Setze die DNS Records wie oben beschrieben
- Warte 5-60 Minuten auf Propagation

**5. Environment Variables:**
```env
# CC24.ONLINE Projekt
NEXT_PUBLIC_DOMAIN=online
NEXT_PUBLIC_API_URL=https://api.cc24.online
NEXT_PUBLIC_GA_ID_ONLINE=G-XXXXXXXXXX

# CC24.VIP Projekt
NEXT_PUBLIC_DOMAIN=vip
NEXT_PUBLIC_API_URL=https://api.cc24.vip
NEXT_PUBLIC_GA_ID_VIP=G-YYYYYYYYYY
```

### Option B: Eigenes Hosting (VPS/Server)

#### Voraussetzungen:
- VPS/Server (z.B. Hetzner, DigitalOcean, AWS)
- Node.js 20+ installiert
- Nginx oder Apache
- SSL-Zertifikat (Let's Encrypt)

#### Setup:

**1. Server vorbereiten:**
```bash
# Node.js installieren
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2 installieren (Process Manager)
sudo npm install -g pm2
```

**2. Projekt deployen:**
```bash
# Repository klonen
git clone [DEIN_REPO] /var/www/cc24
cd /var/www/cc24

# Dependencies installieren
npm install
npm run build

# Mit PM2 starten
pm2 start npm --name "cc24" -- start
pm2 save
pm2 startup
```

**3. Nginx konfigurieren:**
```nginx
# /etc/nginx/sites-available/cc24.online
server {
    listen 80;
    server_name cc24.online www.cc24.online;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**4. SSL mit Let's Encrypt:**
```bash
# Certbot installieren
sudo apt install certbot python3-certbot-nginx

# SSL-Zertifikat erstellen
sudo certbot --nginx -d cc24.online -d www.cc24.online
sudo certbot --nginx -d cc24.vip -d www.cc24.vip
```

### Option C: Docker auf eigenem Server

**1. docker-compose.prod.yml erstellen:**
```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=https://api.cc24.online
    restart: always

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
    restart: always
```

**2. Starten:**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 📋 DNS Provider-spezifische Anleitungen

### Namecheap

1. Login → Domain List → Manage
2. Advanced DNS
3. Add New Record:
   - Type: A Record
   - Host: @
   - Value: 76.76.21.21
   - TTL: Automatic
4. Add New Record:
   - Type: CNAME Record
   - Host: www
   - Value: cname.vercel-dns.com
   - TTL: Automatic

### GoDaddy

1. My Products → Domains → Manage DNS
2. Add:
   - Type: A
   - Name: @
   - Value: 76.76.21.21
   - TTL: 600
3. Add:
   - Type: CNAME
   - Name: www
   - Value: cname.vercel-dns.com
   - TTL: 600

### Cloudflare

1. DNS → Records
2. Add Record:
   - Type: A
   - Name: @
   - IPv4: 76.76.21.21
   - Proxy: Off (für Vercel) oder On (für eigenen Server)
3. Add Record:
   - Type: CNAME
   - Name: www
   - Target: cname.vercel-dns.com
   - Proxy: Off

## 🔍 DNS Propagation prüfen

### Tools:
- https://dnschecker.org
- https://www.whatsmydns.net
- `nslookup cc24.online` (Windows CMD)
- `dig cc24.online` (Linux/Mac)

### Wartezeit:
- Normal: 5-60 Minuten
- Maximum: 24-48 Stunden
- Cloudflare: Sofort (wenn bereits in Cloudflare)

## ✅ Deployment-Checklist

### Vor Deployment:
- [ ] Code getestet (`npm run build`)
- [ ] Environment Variables vorbereitet
- [ ] Domain-Provider Account bereit
- [ ] Vercel Account erstellt (wenn Vercel)

### Nach DNS-Setup:
- [ ] DNS Records gesetzt
- [ ] DNS Propagation geprüft
- [ ] SSL-Zertifikat aktiv (automatisch bei Vercel)
- [ ] Website erreichbar: https://cc24.online
- [ ] Website erreichbar: https://cc24.vip
- [ ] Domain-Erkennung funktioniert
- [ ] Analytics funktioniert

## 🎯 Empfohlene Strategie

**Für schnelles Setup:**
1. ✅ **Vercel** für Frontend (kostenlos, einfach)
2. ✅ **Railway/Render** für Backend (kostenlos für Start)
3. ✅ **Cloudflare** für DNS (kostenlos, schnelle Propagation)

**Für Production:**
1. ✅ **Vercel Pro** für Frontend (bessere Performance)
2. ✅ **Eigener VPS** für Backend (mehr Kontrolle)
3. ✅ **Cloudflare Pro** für DNS (bessere Security)

## 📞 Support

Bei Problemen:
1. DNS Propagation prüfen
2. Vercel Logs checken
3. Browser Console prüfen
4. SSL-Zertifikat Status prüfen

---

**Status:** ✅ DNS-Records bereit für Deployment
