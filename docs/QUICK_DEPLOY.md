# 🚀 Quick Deploy Guide - CC24.ONLINE & CC24.VIP

## Schnellste Deployment-Methode (Vercel)

### Schritt 1: Vercel Account erstellen

1. Gehe zu https://vercel.com
2. Sign Up (kostenlos)
3. Verbinde mit GitHub/GitLab (optional, aber empfohlen)

### Schritt 2: Projekt deployen

```bash
# Im Projekt-Verzeichnis
cd C:\VRBS\ENTERPRISE\CarCompany24\CC24

# Vercel CLI installieren (falls nicht vorhanden)
npm i -g vercel

# Login
vercel login

# Erste Deployment
vercel
```

**Während des Deployments:**
- Project Name: `cc24-online` (oder `cc24-vip`)
- Directory: `.` (aktuelles Verzeichnis)
- Build Command: `npm run build`
- Output Directory: `.next`

### Schritt 3: Domains verbinden

**Im Vercel Dashboard:**

1. Gehe zu deinem Projekt
2. Settings → Domains
3. Add Domain:
   - `cc24.online`
   - `cc24.vip`
   - `www.cc24.online` (optional)
   - `www.cc24.vip` (optional)

### Schritt 4: DNS Records setzen

**Gehe zu deinem Domain-Provider (z.B. Namecheap, GoDaddy):**

#### Für CC24.ONLINE:

```
Type: A
Host: @
Value: 76.76.21.21
TTL: Automatic

Type: CNAME
Host: www
Value: cname.vercel-dns.com
TTL: Automatic
```

#### Für CC24.VIP:

```
Type: A
Host: @
Value: 76.76.21.21
TTL: Automatic

Type: CNAME
Host: www
Value: cname.vercel-dns.com
TTL: Automatic
```

### Schritt 5: Environment Variables

**Im Vercel Dashboard → Settings → Environment Variables:**

**Für CC24.ONLINE Projekt:**
```
NEXT_PUBLIC_DOMAIN=online
NEXT_PUBLIC_API_URL=https://api.cc24.online
NEXT_PUBLIC_GA_ID_ONLINE=G-XXXXXXXXXX
```

**Für CC24.VIP Projekt:**
```
NEXT_PUBLIC_DOMAIN=vip
NEXT_PUBLIC_API_URL=https://api.cc24.vip
NEXT_PUBLIC_GA_ID_VIP=G-YYYYYYYYYY
```

### Schritt 6: Warten auf DNS Propagation

- **Normal:** 5-60 Minuten
- **Prüfen:** https://dnschecker.org
- **Testen:** https://cc24.online und https://cc24.vip

### Schritt 7: Verifizierung

✅ **Website erreichbar:**
- https://cc24.online
- https://cc24.vip

✅ **SSL aktiv:**
- Automatisch von Vercel (Let's Encrypt)

✅ **Domain-Erkennung:**
- CC24.ONLINE zeigt Cyan-Farben
- CC24.VIP zeigt Gold-Farben

## 🔄 Updates deployen

```bash
# Automatisch bei Git Push (wenn GitHub verbunden)
git push origin main

# Oder manuell
vercel --prod
```

## 📊 Monitoring

### Vercel Dashboard:
- Analytics
- Performance Metrics
- Error Logs
- Deployment History

### Google Analytics:
- Separate Properties für ONLINE und VIP
- Real-Time Tracking

## 🆘 Troubleshooting

### Domain zeigt "Not Found"
- DNS Records prüfen
- Warte auf Propagation (bis zu 24h)
- Vercel Dashboard → Domains prüfen

### SSL-Zertifikat fehlt
- Automatisch nach DNS-Propagation
- Warte 5-10 Minuten
- Vercel Support kontaktieren

### Falsche Domain-Konfiguration
- Environment Variable `NEXT_PUBLIC_DOMAIN` prüfen
- Browser-Cache leeren
- Incognito-Modus testen

---

**Status:** ✅ Ready für Deployment
