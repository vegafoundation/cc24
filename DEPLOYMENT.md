# 🚀 Deployment Guide - CC24.ONLINE & CC24.VIP

## DNS Records für Deployment

### 🌐 Vercel (Empfohlen)

#### CC24.ONLINE DNS Records:

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600 (oder Automatic)

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (oder Automatic)
```

#### CC24.VIP DNS Records:

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600 (oder Automatic)

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (oder Automatic)
```

**Wichtig:** Die IP `76.76.21.21` ist die aktuelle Vercel IP. Diese kann sich ändern. 
**Besser:** Verwende die CNAME-Methode (siehe unten).

### 🔄 Alternative: CNAME-Methode (Besser)

Wenn dein DNS-Provider CNAME für Root-Domain unterstützt:

#### CC24.ONLINE:
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
TTL: Automatic
```

#### CC24.VIP:
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
TTL: Automatic
```

## 📋 Schritt-für-Schritt Deployment

### Option 1: Vercel (Einfachste Methode)

#### 1. Vercel Account erstellen
- Gehe zu https://vercel.com
- Sign Up (kostenlos mit GitHub/Email)

#### 2. Projekt deployen

```bash
# Im Projekt-Verzeichnis
cd C:\VRBS\ENTERPRISE\CarCompany24\CC24

# Vercel CLI installieren
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

**Fragen während Deployment:**
- Set up and deploy? **Yes**
- Which scope? **Dein Account**
- Link to existing project? **No**
- Project name? **cc24-online** (oder cc24-vip)
- Directory? **.**
- Override settings? **No**

#### 3. Domains in Vercel verbinden

1. Vercel Dashboard → Project → Settings → Domains
2. Add Domain: `cc24.online`
3. Add Domain: `cc24.vip`
4. Kopiere die angezeigten DNS-Records

#### 4. DNS Records bei Domain-Provider setzen

**Gehe zu deinem Domain-Provider (Namecheap, GoDaddy, etc.):**

**Für CC24.ONLINE:**
- A Record: `@` → `76.76.21.21`
- CNAME: `www` → `cname.vercel-dns.com`

**Für CC24.VIP:**
- A Record: `@` → `76.76.21.21`
- CNAME: `www` → `cname.vercel-dns.com`

#### 5. Environment Variables setzen

**Vercel Dashboard → Settings → Environment Variables:**

**CC24.ONLINE:**
```env
NEXT_PUBLIC_DOMAIN=online
NEXT_PUBLIC_API_URL=https://api.cc24.online
NEXT_PUBLIC_GA_ID_ONLINE=G-XXXXXXXXXX
```

**CC24.VIP:**
```env
NEXT_PUBLIC_DOMAIN=vip
NEXT_PUBLIC_API_URL=https://api.cc24.vip
NEXT_PUBLIC_GA_ID_VIP=G-YYYYYYYYYY
```

#### 6. Warten auf DNS Propagation

- **Normal:** 5-60 Minuten
- **Maximum:** 24-48 Stunden
- **Prüfen:** https://dnschecker.org

#### 7. Verifizierung

✅ **Teste die Websites:**
- https://cc24.online
- https://cc24.vip

✅ **SSL sollte automatisch aktiv sein** (Vercel)

✅ **Domain-Erkennung testen:**
- CC24.ONLINE sollte Cyan-Farben zeigen
- CC24.VIP sollte Gold-Farben zeigen

### Option 2: Eigenes Hosting (VPS/Server)

#### Voraussetzungen:
- VPS mit öffentlicher IP
- Node.js 20+ installiert
- Nginx installiert
- Domain zeigt auf Server-IP

#### Setup:

**1. Server vorbereiten:**
```bash
# Node.js installieren
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2 installieren
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

# /etc/nginx/sites-available/cc24.vip
server {
    listen 80;
    server_name cc24.vip www.cc24.vip;

    location / {
        proxy_pass http://localhost:3001;
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
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d cc24.online -d www.cc24.online
sudo certbot --nginx -d cc24.vip -d www.cc24.vip
```

**5. DNS Records:**
```
Type: A
Name: @
Value: [DEINE_SERVER_IP]

Type: A
Name: www
Value: [DEINE_SERVER_IP]
```

## 🔍 DNS Propagation prüfen

### Online Tools:
- https://dnschecker.org
- https://www.whatsmydns.net
- https://mxtoolbox.com/DNSLookup.aspx

### Command Line:
```bash
# Windows
nslookup cc24.online
nslookup cc24.vip

# Linux/Mac
dig cc24.online
dig cc24.vip
```

## ✅ Deployment-Checklist

### Vor Deployment:
- [ ] Code getestet (`npm run build` erfolgreich)
- [ ] Environment Variables vorbereitet
- [ ] Domain-Provider Account bereit
- [ ] Vercel Account erstellt (wenn Vercel)

### Nach DNS-Setup:
- [ ] DNS Records gesetzt
- [ ] DNS Propagation geprüft (dnschecker.org)
- [ ] SSL-Zertifikat aktiv
- [ ] Website erreichbar: https://cc24.online
- [ ] Website erreichbar: https://cc24.vip
- [ ] Domain-Erkennung funktioniert (Farben)
- [ ] Analytics funktioniert
- [ ] Sitemap erreichbar: /sitemap.xml
- [ ] Robots.txt erreichbar: /robots.txt

## 🎯 Empfohlene Deployment-Strategie

### Für schnelles Setup (Empfohlen):
1. ✅ **Vercel** für Frontend
   - Kostenlos für kleine Projekte
   - Automatisches SSL
   - CDN weltweit
   - Einfaches Setup

2. ✅ **Railway/Render** für Backend
   - Kostenlos für Start
   - Automatisches Deployment
   - PostgreSQL inklusive

3. ✅ **Cloudflare** für DNS (optional)
   - Kostenlos
   - Schnelle Propagation
   - DDoS Protection

### Für Production:
1. ✅ **Vercel Pro** für Frontend
   - Bessere Performance
   - Mehr Bandbreite
   - Priority Support

2. ✅ **Eigener VPS** für Backend
   - Mehr Kontrolle
   - Bessere Performance
   - Eigene Datenbank

## 📞 Support & Troubleshooting

### Häufige Probleme:

**1. Domain zeigt "Not Found"**
- Lösung: DNS Records prüfen, auf Propagation warten

**2. SSL-Zertifikat fehlt**
- Lösung: Bei Vercel automatisch, warte 5-10 Min nach DNS

**3. Falsche Domain-Konfiguration**
- Lösung: Environment Variable `NEXT_PUBLIC_DOMAIN` prüfen

**4. Build fehlschlägt**
- Lösung: `npm run build` lokal testen, Logs prüfen

## 🚀 Quick Deploy Commands

```bash
# Vercel Deployment
vercel --prod

# Mit Environment Variables
vercel --prod --env NEXT_PUBLIC_DOMAIN=online

# Preview Deployment
vercel

# Logs ansehen
vercel logs
```

---

**Status:** ✅ Ready für Production Deployment

**DNS Records:** ✅ Bereit
**SSL:** ✅ Automatisch (Vercel)
**Deployment:** ✅ Einfach mit Vercel
