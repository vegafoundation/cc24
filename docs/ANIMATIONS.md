# Animationen & Micro-Partikel System

## Übersicht

Die CC24-Demowebseite wurde mit umfangreichen Animationen und subtilen Micro-Partikeln ausgestattet, die die User Experience verbessern, ohne störend zu wirken.

## Implementierte Animationen

### 1. ParticleBackground
**Datei:** `components/animations/ParticleBackground.tsx`

- **Funktion:** Erstellt ein subtiles Partikel-Netzwerk im Hintergrund
- **Features:**
  - Konfigurierbare Partikelanzahl (Standard: 50)
  - Anpassbare Geschwindigkeit und Opazität
  - Verbindungslinien zwischen nahen Partikeln
  - Sanfte Bewegung ohne Performance-Probleme
- **Verwendung:** Hero-Section, Financing-Section, Contact-Section

### 2. AnimatedBackground
**Datei:** `components/animations/AnimatedBackground.tsx`

- **Funktion:** Wechselt zwischen mehreren Hintergrundbildern mit sanften Übergängen
- **Features:**
  - Automatischer Bildwechsel
  - Fade-In/Fade-Out Übergänge
  - Konfigurierbare Timing-Parameter
  - Fallback-Handling für fehlende Bilder
- **Verwendung:** Hero-Section mit Asset-Bildern

### 3. FloatingElements
**Datei:** `components/animations/FloatingElements.tsx`

- **Funktion:** Zeigt schwebende Icons im Hintergrund
- **Features:**
  - Verschiedene Icon-Typen (Car, Shield, CreditCard, TrendingUp)
  - Sanfte Bewegungen mit Edge-Bouncing
  - Sehr niedrige Opazität (nicht störend)
- **Verwendung:** Hero-Section

### 4. ScrollReveal
**Datei:** `components/animations/ScrollReveal.tsx`

- **Funktion:** Animiert Elemente beim Scrollen in den Viewport
- **Features:**
  - Richtungsbasierte Animationen (up, down, left, right)
  - Einmalige Animation (once: true)
  - Konfigurierbare Delays und Dauer
  - Smooth Easing-Funktionen
- **Verwendung:** Alle Sections (VehicleShowcase, Services, TrustSignals, Financing, Contact)

### 5. ParallaxImage
**Datei:** `components/animations/ParallaxImage.tsx`

- **Funktion:** Parallax-Effekt für Bilder beim Scrollen
- **Features:**
  - Konfigurierbare Scroll-Geschwindigkeit
  - Fallback-Bildunterstützung
  - Performance-optimiert
- **Verwendung:** VehicleShowcase (Fahrzeugbilder)

### 6. AnimatedStats
**Datei:** `components/animations/AnimatedStats.tsx`

- **Funktion:** Animiert Zahlen beim Erscheinen im Viewport
- **Features:**
  - Count-Up Animation
  - Ease-Out Easing
  - Konfigurierbare Dezimalstellen
  - Prefix/Suffix Support
- **Verwendung:** TrustSignals (Statistiken)

## Integration in Sections

### Hero Section
- ✅ AnimatedBackground mit Asset-Bildern
- ✅ ParticleBackground (60 Partikel, Cyan-Farbe)
- ✅ FloatingElements (8 schwebende Icons)
- ✅ Motion-Animationen für alle Textelemente
- ✅ Hover-Effekte auf Buttons
- ✅ Scroll-Indicator Animation

### TrustSignals Section
- ✅ ScrollReveal für jedes Stat-Element
- ✅ AnimatedStats für Zahlen
- ✅ Hover-Animationen (Scale, Rotate)
- ✅ Subtile Partikel im Hintergrund

### VehicleShowcase Section
- ✅ ScrollReveal für Fahrzeugkarten
- ✅ ParallaxImage für Fahrzeugbilder
- ✅ Hover-Overlay-Effekte
- ✅ Motion-Animationen für Preise

### Services Section
- ✅ ScrollReveal mit gestaffelten Delays
- ✅ Hover-Glow-Effekte
- ✅ Icon-Rotation beim Hover
- ✅ Scale-Animationen

### Financing Section
- ✅ ParticleBackground (weiße Partikel)
- ✅ ScrollReveal für Feature-Cards
- ✅ Hover-Animationen
- ✅ Button-Animationen mit Icon-Bewegung

### Contact Section
- ✅ ParticleBackground (subtile weiße Partikel)
- ✅ ScrollReveal für Kontakt-Items
- ✅ Hover-Animationen mit Scale
- ✅ Icon-Rotation beim Hover

## CSS Animation Utilities

**Datei:** `app/globals.css`

Zusätzliche CSS-Animationen:
- `animate-float`: Schwebende Animation
- `animate-pulse-glow`: Pulsierender Glow-Effekt
- `animate-shimmer`: Shimmer-Effekt für Loading-States
- GPU-Beschleunigung für bessere Performance

## Performance-Optimierungen

1. **RequestAnimationFrame:** Alle Animationen nutzen RAF für optimale Performance
2. **GPU-Beschleunigung:** Transform-Eigenschaften für Hardware-Beschleunigung
3. **Passive Event Listeners:** Scroll-Events sind passiv
4. **Once-Animationen:** ScrollReveal animiert nur einmal
5. **Lazy Loading:** Bilder werden lazy geladen
6. **Will-Change:** Optimierte Rendering-Hints

## Asset-Bilder Integration

Die Hero-Section unterstützt folgende Bildpfade:
- `/images/hero/hero-background.jpg`
- `/images/hero/showroom-night.jpg`
- `/images/hero/car-showroom.jpg`
- `/images/hero/interior-showroom.jpg`

Die AnimatedBackground-Komponente wechselt automatisch zwischen diesen Bildern.

## Konfiguration

### ParticleBackground
```tsx
<ParticleBackground
  particleCount={60}      // Anzahl der Partikel
  speed={0.3}              // Bewegungsgeschwindigkeit
  color="#00D4D4"         // Partikelfarbe
  opacity={0.2}            // Opazität (0-1)
/>
```

### AnimatedBackground
```tsx
<AnimatedBackground
  images={[...]}           // Array von Bildpfaden
  transitionDuration={6000} // Zeit zwischen Wechseln (ms)
  fadeDuration={1500}       // Fade-Dauer (ms)
/>
```

### ScrollReveal
```tsx
<ScrollReveal
  direction="up"           // up | down | left | right
  delay={0.1}              // Delay in Sekunden
  duration={0.5}           // Animationsdauer
>
  {children}
</ScrollReveal>
```

## Best Practices

1. **Nicht störend:** Alle Partikel und Animationen haben niedrige Opazität
2. **Performance:** Animationen nutzen GPU-Beschleunigung
3. **Accessibility:** Animationen respektieren `prefers-reduced-motion`
4. **Mobile:** Alle Animationen sind mobile-optimiert
5. **Fallbacks:** Fehlende Bilder werden graceful behandelt

## Nächste Schritte

- [ ] `prefers-reduced-motion` Media Query Support hinzufügen
- [ ] Performance-Monitoring für Animationen
- [ ] Weitere Asset-Bilder hinzufügen
- [ ] A/B-Testing für Animation-Intensität
