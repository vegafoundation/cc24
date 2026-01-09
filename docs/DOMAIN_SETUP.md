# Domain Setup - CC24.ONLINE & CC24.VIP

## 🌐 Multi-Domain Konfiguration

Die Website unterstützt mehrere Domains mit unterschiedlichen Konfigurationen:

- **CC24.ONLINE** - Online-Fokus, schnelle Transaktionen
- **CC24.VIP** - Premium-Fokus, exklusive Fahrzeuge
- **Localhost** - Development

## 🔧 Domain-Konfiguration

### Domain-spezifische Einstellungen

Die Konfigurationen sind in `lib/domains.ts` definiert:

```typescript
export const DOMAIN_CONFIGS = {
  online: {
    domain: 'cc24.online',
    name: 'CarCompany24.ONLINE',
    primaryColor: '#00D4D4',
    // ...
  },
  vip: {
    domain: 'cc24.vip',
    name: 'CarCompany24.VIP',
    primaryColor: '#D4AF37',
    // ...
  }
}
```

## 🚀 Deployment Setup

### Vercel Deployment

1. **CC24.ONLINE Projekt erstellen:**
```bash
vercel --prod --name cc24-online
```

2. **CC24.VIP Projekt erstellen:**
```bash
vercel --prod --name cc24-vip
```

3. **Domains verbinden:**
   - In Vercel Dashboard: Settings → Domains
   - `cc24.online` hinzufügen
   - `cc24.vip` hinzufügen

### Environment Variables

Für jede Domain separate Environment Variables setzen:

**CC24.ONLINE:**
```env
NEXT_PUBLIC_DOMAIN=online
NEXT_PUBLIC_API_URL=https://api.cc24.online
```

**CC24.VIP:**
```env
NEXT_PUBLIC_DOMAIN=vip
NEXT_PUBLIC_API_URL=https://api.cc24.vip
```

## 📊 SEO Konfiguration

### Domain-spezifische Metadata

Die Metadata wird automatisch basierend auf der Domain generiert:

- **CC24.ONLINE:** Fokus auf "Online kaufen", "Schnelle Finanzierung"
- **CC24.VIP:** Fokus auf "Premium", "Exklusiv", "Luxus"

### Sitemap

Automatische Sitemap-Generierung für beide Domains:
- `https://cc24.online/sitemap.xml`
- `https://cc24.vip/sitemap.xml`

### Robots.txt

Domain-spezifische Robots.txt in `public/robots.txt`

## 🎨 Design-Anpassungen

### Farben

- **CC24.ONLINE:** Cyan (#00D4D4) + Emerald (#00FF88)
- **CC24.VIP:** Gold (#D4AF37) + Gold (#FFD700)

### Features

- **CC24.ONLINE:** Online-Fokus, schnelle Transaktionen
- **CC24.VIP:** Premium-Fokus, exklusive Beratung

## 🔍 Domain-Erkennung

Die Domain wird automatisch erkannt:

```typescript
import { getDomainConfig } from '@/lib/domains'

const config = getDomainConfig()
// Gibt die passende Konfiguration zurück
```

## 📝 Nächste Schritte

1. ✅ Domains gesichert (CC24.ONLINE, CC24.VIP)
2. ⏳ DNS-Konfiguration
3. ⏳ SSL-Zertifikate (automatisch via Vercel)
4. ⏳ Production Deployment
5. ⏳ Google Search Console Setup
6. ⏳ Analytics Integration

---

**Status:** ✅ Multi-Domain Support implementiert
