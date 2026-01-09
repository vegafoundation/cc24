# Domain Deployment - CC24.ONLINE & CC24.VIP

## 🚀 Deployment-Strategie

### Multi-Domain Setup

Die Website unterstützt automatisch beide Domains:
- **CC24.ONLINE** - Online-Fokus
- **CC24.VIP** - Premium-Fokus

## 📦 Vercel Deployment

### Schritt 1: Projekt erstellen

```bash
# Installiere Vercel CLI
npm i -g vercel

# Login
vercel login

# Erste Deployment
vercel
```

### Schritt 2: Domains verbinden

**Für CC24.ONLINE:**
1. Vercel Dashboard → Project → Settings → Domains
2. `cc24.online` hinzufügen
3. `www.cc24.online` hinzufügen (optional)

**Für CC24.VIP:**
1. Neues Vercel-Projekt erstellen (oder gleiches Projekt)
2. `cc24.vip` hinzufügen
3. `www.cc24.vip` hinzufügen (optional)

### Schritt 3: Environment Variables

**CC24.ONLINE Projekt:**
```env
NEXT_PUBLIC_DOMAIN=online
NEXT_PUBLIC_API_URL=https://api.cc24.online
NEXT_PUBLIC_GA_ID_ONLINE=G-XXXXXXXXXX
```

**CC24.VIP Projekt:**
```env
NEXT_PUBLIC_DOMAIN=vip
NEXT_PUBLIC_API_URL=https://api.cc24.vip
NEXT_PUBLIC_GA_ID_VIP=G-YYYYYYYYYY
```

## 🌐 DNS Konfiguration

### CC24.ONLINE

```
Type: A
Name: @
Value: 76.76.21.21 (Vercel IP)

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### CC24.VIP

```
Type: A
Name: @
Value: 76.76.21.21 (Vercel IP)

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 🔒 SSL-Zertifikate

- **Automatisch:** Vercel stellt automatisch SSL-Zertifikate bereit (Let's Encrypt)
- **Aktivierung:** Automatisch nach DNS-Verbindung

## 📊 Post-Deployment Checklist

- [ ] DNS konfiguriert
- [ ] Domains in Vercel verbunden
- [ ] SSL aktiv (automatisch)
- [ ] Environment Variables gesetzt
- [ ] Google Analytics konfiguriert
- [ ] Sitemap erreichbar: `https://cc24.online/sitemap.xml`
- [ ] Robots.txt erreichbar: `https://cc24.online/robots.txt`
- [ ] Health Check: `https://cc24.online/api/health`
- [ ] Google Search Console Setup
- [ ] Performance getestet (Lighthouse)

## 🔍 Verifizierung

### Domain-Erkennung testen

1. **CC24.ONLINE:** https://cc24.online
   - Sollte Cyan-Farben zeigen
   - "CarCompany24.ONLINE" im Banner

2. **CC24.VIP:** https://cc24.vip
   - Sollte Gold-Farben zeigen
   - "CarCompany24.VIP" im Banner

## 📈 Analytics Setup

### Google Analytics 4

1. **Property erstellen:**
   - CC24-Online Property
   - CC24-VIP Property

2. **Measurement IDs setzen:**
   - In Vercel Environment Variables
   - `NEXT_PUBLIC_GA_ID_ONLINE`
   - `NEXT_PUBLIC_GA_ID_VIP`

3. **Verifizierung:**
   - Google Analytics → Real-Time
   - Besuch auf Website sollte erscheinen

## 🎯 SEO Setup

### Google Search Console

1. **Property hinzufügen:**
   - https://cc24.online
   - https://cc24.vip

2. **Verifizierung:**
   - HTML-Tag in `app/layout.tsx` (optional)
   - Oder DNS-Verifizierung

3. **Sitemap submit:**
   - https://cc24.online/sitemap.xml
   - https://cc24.vip/sitemap.xml

## 🚨 Troubleshooting

### Domain zeigt falsche Konfiguration

- Prüfe `NEXT_PUBLIC_DOMAIN` Environment Variable
- Prüfe `lib/domains.ts` Konfiguration
- Browser-Cache leeren

### SSL-Zertifikat nicht aktiv

- Warte 5-10 Minuten nach DNS-Update
- Prüfe DNS-Propagation: https://dnschecker.org
- Kontaktiere Vercel Support

### Analytics funktioniert nicht

- Prüfe Measurement ID in Environment Variables
- Prüfe Browser Console auf Fehler
- Prüfe Google Analytics Real-Time View

---

**Status:** ✅ Deployment-Ready für beide Domains
