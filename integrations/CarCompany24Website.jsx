import React, { useState, useEffect, useRef } from 'react';

// ============================================
// CARCOMPANY24 - Professional Automotive Website
// Gebrauchtwagen & Finanzierung
// ============================================

const CarCompany24Website = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <Navigation scrolled={scrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Trust Badges */}
      <TrustBadges />
      
      {/* Featured Vehicles */}
      <FeaturedVehicles />
      
      {/* Services Grid */}
      <ServicesSection />
      
      {/* Financing Calculator */}
      <FinancingCalculator />
      
      {/* Why Choose Us */}
      <WhyChooseUs />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* Contact Section */}
      <ContactSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

// ============================================
// NAVIGATION
// ============================================
const Navigation = ({ scrolled, isMenuOpen, setIsMenuOpen }) => {
  return (
    <nav style={{
      ...styles.nav,
      background: scrolled ? 'rgba(12, 20, 31, 0.98)' : 'transparent',
      boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
    }}>
      <div style={styles.navContainer}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>
            <svg width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="18" fill="none" stroke="#0A84FF" strokeWidth="2"/>
              <path d="M12 20 L20 12 L28 20 L20 28 Z" fill="#0A84FF"/>
              <circle cx="20" cy="20" r="4" fill="#fff"/>
            </svg>
          </div>
          <div>
            <span style={styles.logoText}>CAR</span>
            <span style={styles.logoTextAccent}>COMPANY</span>
            <span style={styles.logo24}>24</span>
          </div>
        </div>
        
        <div style={styles.navLinks}>
          {['Fahrzeuge', 'Finanzierung', 'Ankauf', 'Service', 'Über uns', 'Kontakt'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} style={styles.navLink}>
              {item}
            </a>
          ))}
        </div>
        
        <div style={styles.navCTA}>
          <a href="tel:+4989123456789" style={styles.phoneLink}>
            <span style={styles.phoneIcon}>📞</span>
            089 / 123 456 789
          </a>
          <button style={styles.ctaButton}>
            Termin vereinbaren
          </button>
        </div>
      </div>
    </nav>
  );
};

// ============================================
// HERO SECTION
// ============================================
const HeroSection = () => {
  const [searchParams, setSearchParams] = useState({
    brand: '',
    priceMax: '',
    type: ''
  });

  return (
    <section style={styles.hero}>
      <div style={styles.heroOverlay} />
      <div style={styles.heroContent}>
        <div style={styles.heroBadge}>
          <span style={styles.heroBadgeIcon}>✓</span>
          Über 500 geprüfte Fahrzeuge
        </div>
        
        <h1 style={styles.heroTitle}>
          Ihr Partner für<br/>
          <span style={styles.heroTitleAccent}>Gebrauchtwagen & Finanzierung</span>
        </h1>
        
        <p style={styles.heroSubtitle}>
          Qualitätsfahrzeuge mit Garantie • Flexible Finanzierung ab 0% • Express-Zulassung
        </p>
        
        {/* Quick Search Box */}
        <div style={styles.searchBox}>
          <div style={styles.searchGrid}>
            <div style={styles.searchField}>
              <label style={styles.searchLabel}>Marke</label>
              <select 
                style={styles.searchSelect}
                value={searchParams.brand}
                onChange={(e) => setSearchParams({...searchParams, brand: e.target.value})}
              >
                <option value="">Alle Marken</option>
                <option value="audi">Audi</option>
                <option value="bmw">BMW</option>
                <option value="mercedes">Mercedes-Benz</option>
                <option value="vw">Volkswagen</option>
                <option value="porsche">Porsche</option>
              </select>
            </div>
            
            <div style={styles.searchField}>
              <label style={styles.searchLabel}>Preis bis</label>
              <select 
                style={styles.searchSelect}
                value={searchParams.priceMax}
                onChange={(e) => setSearchParams({...searchParams, priceMax: e.target.value})}
              >
                <option value="">Keine Limit</option>
                <option value="15000">€15.000</option>
                <option value="25000">€25.000</option>
                <option value="35000">€35.000</option>
                <option value="50000">€50.000</option>
                <option value="75000">€75.000+</option>
              </select>
            </div>
            
            <div style={styles.searchField}>
              <label style={styles.searchLabel}>Fahrzeugtyp</label>
              <select 
                style={styles.searchSelect}
                value={searchParams.type}
                onChange={(e) => setSearchParams({...searchParams, type: e.target.value})}
              >
                <option value="">Alle Typen</option>
                <option value="limousine">Limousine</option>
                <option value="kombi">Kombi</option>
                <option value="suv">SUV / Geländewagen</option>
                <option value="kleinwagen">Kleinwagen</option>
                <option value="cabrio">Cabrio / Roadster</option>
              </select>
            </div>
            
            <button style={styles.searchButton}>
              <span>🔍</span> Fahrzeuge finden
            </button>
          </div>
        </div>
        
        {/* Stats */}
        <div style={styles.heroStats}>
          <div style={styles.heroStat}>
            <div style={styles.heroStatNumber}>15+</div>
            <div style={styles.heroStatLabel}>Jahre Erfahrung</div>
          </div>
          <div style={styles.heroStatDivider} />
          <div style={styles.heroStat}>
            <div style={styles.heroStatNumber}>5.000+</div>
            <div style={styles.heroStatLabel}>Verkaufte Fahrzeuge</div>
          </div>
          <div style={styles.heroStatDivider} />
          <div style={styles.heroStat}>
            <div style={styles.heroStatNumber}>98%</div>
            <div style={styles.heroStatLabel}>Zufriedene Kunden</div>
          </div>
          <div style={styles.heroStatDivider} />
          <div style={styles.heroStat}>
            <div style={styles.heroStatNumber}>4.9★</div>
            <div style={styles.heroStatLabel}>Google Bewertung</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// TRUST BADGES
// ============================================
const TrustBadges = () => {
  const badges = [
    { icon: '🛡️', title: 'TÜV geprüft', subtitle: 'Alle Fahrzeuge' },
    { icon: '✅', title: '12 Monate', subtitle: 'Garantie inklusive' },
    { icon: '💰', title: 'Bestpreis', subtitle: 'Garantie' },
    { icon: '🚗', title: 'Probefahrt', subtitle: 'Unverbindlich' },
    { icon: '📋', title: 'Fahrzeughistorie', subtitle: 'Transparent' },
    { icon: '🔧', title: 'Werkstatt', subtitle: 'Service vor Ort' },
  ];

  return (
    <div style={styles.trustBadges}>
      {badges.map((badge, i) => (
        <div key={i} style={styles.trustBadge}>
          <span style={styles.trustBadgeIcon}>{badge.icon}</span>
          <div>
            <div style={styles.trustBadgeTitle}>{badge.title}</div>
            <div style={styles.trustBadgeSubtitle}>{badge.subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================================
// FEATURED VEHICLES
// ============================================
const FeaturedVehicles = () => {
  const vehicles = [
    {
      id: 1,
      brand: 'BMW',
      model: '320d xDrive Touring',
      year: 2022,
      km: 45000,
      fuel: 'Diesel',
      power: '190 PS',
      transmission: 'Automatik',
      price: 38900,
      monthlyRate: 389,
      image: '🚗',
      badges: ['TÜV Neu', 'Garantie', 'Scheckheft'],
      color: '#1C69D4'
    },
    {
      id: 2,
      brand: 'Mercedes-Benz',
      model: 'C 200 AMG Line',
      year: 2021,
      km: 52000,
      fuel: 'Benzin',
      power: '204 PS',
      transmission: 'Automatik',
      price: 42500,
      monthlyRate: 425,
      image: '🚙',
      badges: ['1. Hand', 'Garantie', 'LED'],
      color: '#333'
    },
    {
      id: 3,
      brand: 'Audi',
      model: 'A4 Avant 40 TDI quattro',
      year: 2023,
      km: 28000,
      fuel: 'Diesel',
      power: '204 PS',
      transmission: 'Automatik',
      price: 46900,
      monthlyRate: 469,
      image: '🚘',
      badges: ['Werksgarantie', 'Matrix LED', 'Navi'],
      color: '#BB0A21'
    },
    {
      id: 4,
      brand: 'Volkswagen',
      model: 'Tiguan 2.0 TDI 4Motion',
      year: 2022,
      km: 38000,
      fuel: 'Diesel',
      power: '150 PS',
      transmission: 'DSG',
      price: 34900,
      monthlyRate: 349,
      image: '🚐',
      badges: ['R-Line', 'Panorama', 'AHK'],
      color: '#00437A'
    },
  ];

  return (
    <section style={styles.featuredSection} id="fahrzeuge">
      <div style={styles.sectionContainer}>
        <div style={styles.sectionHeader}>
          <div>
            <h2 style={styles.sectionTitle}>Aktuelle Fahrzeugangebote</h2>
            <p style={styles.sectionSubtitle}>Handverlesene Qualitätsfahrzeuge mit Garantie</p>
          </div>
          <button style={styles.viewAllButton}>
            Alle 500+ Fahrzeuge ansehen →
          </button>
        </div>
        
        <div style={styles.vehicleGrid}>
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
};

const VehicleCard = ({ vehicle }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      style={{
        ...styles.vehicleCard,
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? '0 20px 40px rgba(0,0,0,0.15)' 
          : '0 4px 20px rgba(0,0,0,0.08)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Area */}
      <div style={{...styles.vehicleImageArea, background: `linear-gradient(135deg, ${vehicle.color}15, ${vehicle.color}05)`}}>
        <div style={styles.vehicleBadges}>
          {vehicle.badges.map((badge, i) => (
            <span key={i} style={styles.vehicleBadge}>{badge}</span>
          ))}
        </div>
        <div style={styles.vehicleImagePlaceholder}>
          <span style={{fontSize: '4rem'}}>{vehicle.image}</span>
        </div>
        <button style={styles.favoriteButton}>♡</button>
      </div>
      
      {/* Info Area */}
      <div style={styles.vehicleInfo}>
        <div style={styles.vehicleBrandLine}>
          <span style={{...styles.vehicleBrand, color: vehicle.color}}>{vehicle.brand}</span>
          <span style={styles.vehicleYear}>{vehicle.year}</span>
        </div>
        <h3 style={styles.vehicleModel}>{vehicle.model}</h3>
        
        <div style={styles.vehicleSpecs}>
          <span style={styles.vehicleSpec}>
            <span style={styles.specIcon}>📏</span> {vehicle.km.toLocaleString('de-DE')} km
          </span>
          <span style={styles.vehicleSpec}>
            <span style={styles.specIcon}>⛽</span> {vehicle.fuel}
          </span>
          <span style={styles.vehicleSpec}>
            <span style={styles.specIcon}>⚡</span> {vehicle.power}
          </span>
          <span style={styles.vehicleSpec}>
            <span style={styles.specIcon}>⚙️</span> {vehicle.transmission}
          </span>
        </div>
        
        <div style={styles.vehiclePricing}>
          <div style={styles.vehiclePrice}>
            €{vehicle.price.toLocaleString('de-DE')}
          </div>
          <div style={styles.vehicleMonthly}>
            oder ab <strong>€{vehicle.monthlyRate}/Monat</strong>
          </div>
        </div>
        
        <div style={styles.vehicleActions}>
          <button style={styles.vehicleButtonPrimary}>Details ansehen</button>
          <button style={styles.vehicleButtonSecondary}>Probefahrt</button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// SERVICES SECTION
// ============================================
const ServicesSection = () => {
  const services = [
    {
      icon: '🚗',
      title: 'Fahrzeug kaufen',
      description: 'Über 500 geprüfte Gebrauchtwagen mit Garantie. TÜV-zertifiziert und sofort verfügbar.',
      features: ['TÜV geprüft', '12 Monate Garantie', 'Finanzierung möglich'],
      color: '#0A84FF'
    },
    {
      icon: '💰',
      title: 'Fahrzeug verkaufen',
      description: 'Bestpreis für Ihr Fahrzeug. Faire Bewertung und schnelle Abwicklung.',
      features: ['Kostenlose Bewertung', 'Sofortankauf', 'Auszahlung in 24h'],
      color: '#30D158'
    },
    {
      icon: '🏦',
      title: 'Finanzierung',
      description: 'Flexible Finanzierungslösungen ab 0% Zinsen. Online-Zusage in Minuten.',
      features: ['Ab 0% Zinsen', 'Flexible Laufzeiten', 'Schnelle Zusage'],
      color: '#FF9F0A'
    },
    {
      icon: '🛡️',
      title: 'Versicherung',
      description: 'Günstige KFZ-Versicherungen im Vergleich. Sofort-Deckung möglich.',
      features: ['Alle Anbieter', 'Bis 50% sparen', 'Sofort-Deckung'],
      color: '#BF5AF2'
    },
  ];

  return (
    <section style={styles.servicesSection} id="service">
      <div style={styles.sectionContainer}>
        <div style={styles.sectionHeaderCenter}>
          <h2 style={styles.sectionTitle}>Unsere Leistungen</h2>
          <p style={styles.sectionSubtitle}>Alles rund ums Auto – aus einer Hand</p>
        </div>
        
        <div style={styles.servicesGrid}>
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      style={{
        ...styles.serviceCard,
        borderColor: isHovered ? service.color : '#E5E5E5',
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{...styles.serviceIcon, background: `${service.color}15`, color: service.color}}>
        {service.icon}
      </div>
      <h3 style={styles.serviceTitle}>{service.title}</h3>
      <p style={styles.serviceDescription}>{service.description}</p>
      <ul style={styles.serviceFeatures}>
        {service.features.map((feature, i) => (
          <li key={i} style={styles.serviceFeature}>
            <span style={{color: service.color}}>✓</span> {feature}
          </li>
        ))}
      </ul>
      <button style={{...styles.serviceButton, background: service.color}}>
        Mehr erfahren →
      </button>
    </div>
  );
};

// ============================================
// FINANCING CALCULATOR
// ============================================
const FinancingCalculator = () => {
  const [calcMode, setCalcMode] = useState('kredit'); // kredit, leasing, ballon
  const [vehiclePrice, setVehiclePrice] = useState(30000);
  const [downPayment, setDownPayment] = useState(5000);
  const [duration, setDuration] = useState(48);
  const [interestRate, setInterestRate] = useState(3.99);
  const [balloonPayment, setBalloonPayment] = useState(10000);

  const calculateMonthlyRate = () => {
    const principal = vehiclePrice - downPayment - (calcMode === 'ballon' ? balloonPayment : 0);
    const monthlyInterest = interestRate / 100 / 12;
    
    if (interestRate === 0) {
      return principal / duration;
    }
    
    const rate = principal * (monthlyInterest * Math.pow(1 + monthlyInterest, duration)) 
                 / (Math.pow(1 + monthlyInterest, duration) - 1);
    return rate;
  };

  const monthlyRate = calculateMonthlyRate();
  const totalPayment = (monthlyRate * duration) + downPayment + (calcMode === 'ballon' ? balloonPayment : 0);
  const totalInterest = totalPayment - vehiclePrice;

  return (
    <section style={styles.calculatorSection} id="finanzierung">
      <div style={styles.sectionContainer}>
        <div style={styles.sectionHeaderCenter}>
          <h2 style={styles.sectionTitle}>Finanzierungsrechner</h2>
          <p style={styles.sectionSubtitle}>Berechnen Sie Ihre individuelle Rate</p>
        </div>
        
        <div style={styles.calculatorContainer}>
          {/* Mode Tabs */}
          <div style={styles.calcTabs}>
            {[
              { id: 'kredit', label: 'Klassischer Kredit', icon: '💳' },
              { id: 'ballon', label: 'Ballonfinanzierung', icon: '🎈' },
              { id: 'leasing', label: 'Leasing', icon: '📋' },
            ].map((tab) => (
              <button
                key={tab.id}
                style={{
                  ...styles.calcTab,
                  background: calcMode === tab.id ? '#0A84FF' : 'transparent',
                  color: calcMode === tab.id ? '#fff' : '#666',
                }}
                onClick={() => setCalcMode(tab.id)}
              >
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>
          
          <div style={styles.calcGrid}>
            {/* Input Side */}
            <div style={styles.calcInputs}>
              <div style={styles.calcInputGroup}>
                <label style={styles.calcLabel}>
                  Fahrzeugpreis
                  <span style={styles.calcValue}>€{vehiclePrice.toLocaleString('de-DE')}</span>
                </label>
                <input
                  type="range"
                  min="5000"
                  max="150000"
                  step="1000"
                  value={vehiclePrice}
                  onChange={(e) => setVehiclePrice(Number(e.target.value))}
                  style={styles.calcSlider}
                />
                <div style={styles.calcRange}>
                  <span>€5.000</span>
                  <span>€150.000</span>
                </div>
              </div>
              
              <div style={styles.calcInputGroup}>
                <label style={styles.calcLabel}>
                  Anzahlung
                  <span style={styles.calcValue}>€{downPayment.toLocaleString('de-DE')}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max={vehiclePrice * 0.5}
                  step="500"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  style={styles.calcSlider}
                />
                <div style={styles.calcRange}>
                  <span>€0</span>
                  <span>€{(vehiclePrice * 0.5).toLocaleString('de-DE')}</span>
                </div>
              </div>
              
              <div style={styles.calcInputGroup}>
                <label style={styles.calcLabel}>
                  Laufzeit
                  <span style={styles.calcValue}>{duration} Monate</span>
                </label>
                <input
                  type="range"
                  min="12"
                  max="84"
                  step="6"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  style={styles.calcSlider}
                />
                <div style={styles.calcRange}>
                  <span>12 Monate</span>
                  <span>84 Monate</span>
                </div>
              </div>
              
              {calcMode === 'ballon' && (
                <div style={styles.calcInputGroup}>
                  <label style={styles.calcLabel}>
                    Schlussrate
                    <span style={styles.calcValue}>€{balloonPayment.toLocaleString('de-DE')}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={vehiclePrice * 0.4}
                    step="500"
                    value={balloonPayment}
                    onChange={(e) => setBalloonPayment(Number(e.target.value))}
                    style={styles.calcSlider}
                  />
                  <div style={styles.calcRange}>
                    <span>€0</span>
                    <span>€{(vehiclePrice * 0.4).toLocaleString('de-DE')}</span>
                  </div>
                </div>
              )}
              
              <div style={styles.calcInputGroup}>
                <label style={styles.calcLabel}>
                  Effektiver Jahreszins
                  <span style={styles.calcValue}>{interestRate}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="0.01"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  style={styles.calcSlider}
                />
                <div style={styles.calcRange}>
                  <span>0%</span>
                  <span>12%</span>
                </div>
              </div>
            </div>
            
            {/* Result Side */}
            <div style={styles.calcResult}>
              <div style={styles.calcResultMain}>
                <div style={styles.calcResultLabel}>Ihre monatliche Rate</div>
                <div style={styles.calcResultValue}>
                  €{Math.round(monthlyRate).toLocaleString('de-DE')}
                  <span style={styles.calcResultSuffix}>/Monat</span>
                </div>
              </div>
              
              <div style={styles.calcResultDetails}>
                <div style={styles.calcResultRow}>
                  <span>Fahrzeugpreis</span>
                  <span>€{vehiclePrice.toLocaleString('de-DE')}</span>
                </div>
                <div style={styles.calcResultRow}>
                  <span>Anzahlung</span>
                  <span>- €{downPayment.toLocaleString('de-DE')}</span>
                </div>
                {calcMode === 'ballon' && (
                  <div style={styles.calcResultRow}>
                    <span>Schlussrate</span>
                    <span>- €{balloonPayment.toLocaleString('de-DE')}</span>
                  </div>
                )}
                <div style={styles.calcResultRow}>
                  <span>Kreditbetrag</span>
                  <span>€{(vehiclePrice - downPayment - (calcMode === 'ballon' ? balloonPayment : 0)).toLocaleString('de-DE')}</span>
                </div>
                <div style={{...styles.calcResultRow, borderTop: '1px solid #E5E5E5', paddingTop: '12px', marginTop: '12px'}}>
                  <span>Gesamtbetrag</span>
                  <strong>€{Math.round(totalPayment).toLocaleString('de-DE')}</strong>
                </div>
                <div style={styles.calcResultRow}>
                  <span>Zinskosten</span>
                  <span style={{color: '#FF3B30'}}>€{Math.round(totalInterest).toLocaleString('de-DE')}</span>
                </div>
              </div>
              
              <button style={styles.calcCTA}>
                💬 Unverbindliches Angebot anfordern
              </button>
              
              <p style={styles.calcDisclaimer}>
                * Beispielrechnung. Bonität vorausgesetzt. 
                Die endgültigen Konditionen können abweichen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// WHY CHOOSE US
// ============================================
const WhyChooseUs = () => {
  const reasons = [
    { number: '01', title: 'Geprüfte Qualität', text: 'Jedes Fahrzeug durchläuft eine 150-Punkte-Inspektion durch unsere Meisterwerkstatt.' },
    { number: '02', title: 'Faire Preise', text: 'Transparente Preisgestaltung ohne versteckte Kosten. Bestpreis-Garantie auf alle Fahrzeuge.' },
    { number: '03', title: 'Flexible Finanzierung', text: 'Maßgeschneiderte Finanzierungslösungen. Online-Zusage in wenigen Minuten.' },
    { number: '04', title: 'Rundum-Service', text: 'Von der Probefahrt bis zur Zulassung – wir kümmern uns um alles.' },
  ];

  return (
    <section style={styles.whySection}>
      <div style={styles.sectionContainer}>
        <div style={styles.whyGrid}>
          <div style={styles.whyContent}>
            <h2 style={styles.sectionTitle}>Warum CarCompany24?</h2>
            <p style={styles.whyIntro}>
              Seit über 15 Jahren sind wir Ihr verlässlicher Partner für Gebrauchtwagen in München. 
              Qualität, Transparenz und Kundenzufriedenheit stehen bei uns an erster Stelle.
            </p>
            
            <div style={styles.whyList}>
              {reasons.map((reason, i) => (
                <div key={i} style={styles.whyItem}>
                  <div style={styles.whyNumber}>{reason.number}</div>
                  <div>
                    <h4 style={styles.whyItemTitle}>{reason.title}</h4>
                    <p style={styles.whyItemText}>{reason.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={styles.whyImage}>
            <div style={styles.whyImagePlaceholder}>
              <span style={{fontSize: '6rem'}}>🏢</span>
              <p style={{marginTop: '1rem', color: '#666'}}>Unser Standort in München</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// TESTIMONIALS
// ============================================
const Testimonials = () => {
  const testimonials = [
    {
      name: 'Michael K.',
      role: 'BMW 320d Käufer',
      text: 'Super Beratung und ein faires Angebot. Die Finanzierung wurde schnell und unkompliziert abgewickelt. Sehr empfehlenswert!',
      rating: 5,
      date: 'vor 2 Wochen'
    },
    {
      name: 'Sandra M.',
      role: 'Mercedes C-Klasse Käuferin',
      text: 'Von der ersten Anfrage bis zur Zulassung alles perfekt. Das Team ist kompetent und freundlich. Gerne wieder!',
      rating: 5,
      date: 'vor 1 Monat'
    },
    {
      name: 'Thomas B.',
      role: 'Audi A4 Verkäufer',
      text: 'Habe meinen Audi zum fairen Preis verkauft. Bewertung war transparent, Geld war am nächsten Tag auf dem Konto.',
      rating: 5,
      date: 'vor 3 Wochen'
    },
  ];

  return (
    <section style={styles.testimonialsSection}>
      <div style={styles.sectionContainer}>
        <div style={styles.sectionHeaderCenter}>
          <h2 style={styles.sectionTitle}>Das sagen unsere Kunden</h2>
          <p style={styles.sectionSubtitle}>Über 5.000 zufriedene Kunden vertrauen uns</p>
        </div>
        
        <div style={styles.testimonialsGrid}>
          {testimonials.map((testimonial, i) => (
            <div key={i} style={styles.testimonialCard}>
              <div style={styles.testimonialStars}>
                {'★'.repeat(testimonial.rating)}
              </div>
              <p style={styles.testimonialText}>"{testimonial.text}"</p>
              <div style={styles.testimonialAuthor}>
                <div style={styles.testimonialAvatar}>
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div style={styles.testimonialName}>{testimonial.name}</div>
                  <div style={styles.testimonialRole}>{testimonial.role} • {testimonial.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div style={styles.googleReview}>
          <span style={styles.googleLogo}>G</span>
          <span style={styles.googleRating}>4.9</span>
          <span style={styles.googleStars}>★★★★★</span>
          <span style={styles.googleCount}>basierend auf 847 Bewertungen</span>
        </div>
      </div>
    </section>
  );
};

// ============================================
// CONTACT SECTION
// ============================================
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  });

  return (
    <section style={styles.contactSection} id="kontakt">
      <div style={styles.sectionContainer}>
        <div style={styles.contactGrid}>
          <div style={styles.contactInfo}>
            <h2 style={styles.sectionTitle}>Kontaktieren Sie uns</h2>
            <p style={styles.contactIntro}>
              Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? 
              Wir sind für Sie da – persönlich, telefonisch oder online.
            </p>
            
            <div style={styles.contactDetails}>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>📍</span>
                <div>
                  <strong>Standort</strong><br/>
                  Musterstraße 123, 80331 München
                </div>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>📞</span>
                <div>
                  <strong>Telefon</strong><br/>
                  089 / 123 456 789
                </div>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>✉️</span>
                <div>
                  <strong>E-Mail</strong><br/>
                  info@carcompany24.de
                </div>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>🕒</span>
                <div>
                  <strong>Öffnungszeiten</strong><br/>
                  Mo-Fr: 9-18 Uhr | Sa: 10-14 Uhr
                </div>
              </div>
            </div>
          </div>
          
          <div style={styles.contactForm}>
            <h3 style={styles.formTitle}>Schnellanfrage</h3>
            <form>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Name *</label>
                  <input 
                    type="text" 
                    style={styles.formInput}
                    placeholder="Ihr Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Telefon</label>
                  <input 
                    type="tel" 
                    style={styles.formInput}
                    placeholder="Ihre Telefonnummer"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>E-Mail *</label>
                <input 
                  type="email" 
                  style={styles.formInput}
                  placeholder="ihre@email.de"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Interesse an</label>
                <select 
                  style={styles.formSelect}
                  value={formData.interest}
                  onChange={(e) => setFormData({...formData, interest: e.target.value})}
                >
                  <option value="">Bitte wählen...</option>
                  <option value="kaufen">Fahrzeug kaufen</option>
                  <option value="verkaufen">Fahrzeug verkaufen</option>
                  <option value="finanzierung">Finanzierung</option>
                  <option value="probefahrt">Probefahrt</option>
                  <option value="sonstiges">Sonstiges</option>
                </select>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Nachricht</label>
                <textarea 
                  style={styles.formTextarea}
                  placeholder="Ihre Nachricht an uns..."
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
              
              <button type="submit" style={styles.formSubmit}>
                Anfrage senden →
              </button>
              
              <p style={styles.formDisclaimer}>
                * Pflichtfelder. Mit dem Absenden stimmen Sie unserer Datenschutzerklärung zu.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// FOOTER
// ============================================
const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.sectionContainer}>
        <div style={styles.footerGrid}>
          <div style={styles.footerBrand}>
            <div style={styles.footerLogo}>
              <span style={styles.logoText}>CAR</span>
              <span style={styles.logoTextAccent}>COMPANY</span>
              <span style={styles.logo24}>24</span>
            </div>
            <p style={styles.footerTagline}>
              Ihr Premium Automotive Partner seit 2009
            </p>
            <div style={styles.footerSocial}>
              {['📘', '📷', '🎥', '💼'].map((icon, i) => (
                <a key={i} href="#" style={styles.socialIcon}>{icon}</a>
              ))}
            </div>
          </div>
          
          <div style={styles.footerLinks}>
            <h4 style={styles.footerTitle}>Services</h4>
            <a href="#" style={styles.footerLink}>Fahrzeuge kaufen</a>
            <a href="#" style={styles.footerLink}>Fahrzeug verkaufen</a>
            <a href="#" style={styles.footerLink}>Finanzierung</a>
            <a href="#" style={styles.footerLink}>Versicherung</a>
            <a href="#" style={styles.footerLink}>Werkstatt</a>
          </div>
          
          <div style={styles.footerLinks}>
            <h4 style={styles.footerTitle}>Unternehmen</h4>
            <a href="#" style={styles.footerLink}>Über uns</a>
            <a href="#" style={styles.footerLink}>Karriere</a>
            <a href="#" style={styles.footerLink}>Partner werden</a>
            <a href="#" style={styles.footerLink}>Presse</a>
            <a href="#" style={styles.footerLink}>Blog</a>
          </div>
          
          <div style={styles.footerLinks}>
            <h4 style={styles.footerTitle}>Rechtliches</h4>
            <a href="#" style={styles.footerLink}>Impressum</a>
            <a href="#" style={styles.footerLink}>Datenschutz</a>
            <a href="#" style={styles.footerLink}>AGB</a>
            <a href="#" style={styles.footerLink}>Widerrufsrecht</a>
          </div>
        </div>
        
        <div style={styles.footerBottom}>
          <p>© 2025 CarCompany24. Alle Rechte vorbehalten.</p>
          <p style={styles.footerPowered}>
            Powered by <span style={styles.vegaText}>VEGA Foundation</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

// ============================================
// STYLES
// ============================================
const styles = {
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    background: '#FFFFFF',
    color: '#1A1A1A',
    minHeight: '100vh',
    lineHeight: 1.6,
  },
  
  // Navigation
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: '1rem 2rem',
    transition: 'all 0.3s ease',
  },
  navContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoIcon: {
    display: 'flex',
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#FFF',
  },
  logoTextAccent: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#0A84FF',
  },
  logo24: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#FF9F0A',
    marginLeft: '2px',
  },
  navLinks: {
    display: 'flex',
    gap: '2rem',
  },
  navLink: {
    color: '#FFF',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: '500',
    transition: 'color 0.2s',
  },
  navCTA: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  phoneLink: {
    color: '#FFF',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  phoneIcon: {
    fontSize: '1.1rem',
  },
  ctaButton: {
    background: '#0A84FF',
    color: '#FFF',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  
  // Hero
  hero: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0C141F 0%, #1A2A3A 50%, #0C141F 100%)',
    padding: '120px 2rem 80px',
    overflow: 'hidden',
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    background: `
      radial-gradient(circle at 20% 50%, rgba(10, 132, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 30%, rgba(255, 159, 10, 0.08) 0%, transparent 40%)
    `,
  },
  heroContent: {
    position: 'relative',
    zIndex: 10,
    maxWidth: '1200px',
    width: '100%',
    textAlign: 'center',
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(48, 209, 88, 0.15)',
    color: '#30D158',
    padding: '8px 16px',
    borderRadius: '100px',
    fontSize: '0.9rem',
    fontWeight: '600',
    marginBottom: '2rem',
  },
  heroBadgeIcon: {
    fontSize: '1rem',
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: '700',
    color: '#FFF',
    lineHeight: 1.2,
    marginBottom: '1.5rem',
  },
  heroTitleAccent: {
    color: '#0A84FF',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: '3rem',
  },
  
  // Search Box
  searchBox: {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '2rem',
    border: '1px solid rgba(255,255,255,0.1)',
    marginBottom: '4rem',
  },
  searchGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1rem',
    alignItems: 'end',
  },
  searchField: {
    textAlign: 'left',
  },
  searchLabel: {
    display: 'block',
    color: 'rgba(255,255,255,0.6)',
    fontSize: '0.85rem',
    marginBottom: '8px',
    fontWeight: '500',
  },
  searchSelect: {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '10px',
    color: '#FFF',
    fontSize: '1rem',
    cursor: 'pointer',
    outline: 'none',
  },
  searchButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    background: '#0A84FF',
    color: '#FFF',
    border: 'none',
    padding: '14px 24px',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  
  // Hero Stats
  heroStats: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '3rem',
  },
  heroStat: {
    textAlign: 'center',
  },
  heroStatNumber: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#FFF',
  },
  heroStatLabel: {
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.6)',
    marginTop: '4px',
  },
  heroStatDivider: {
    width: '1px',
    height: '50px',
    background: 'rgba(255,255,255,0.2)',
  },
  
  // Trust Badges
  trustBadges: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
    padding: '2rem',
    background: '#F8F9FA',
    borderBottom: '1px solid #E5E5E5',
  },
  trustBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 20px',
    background: '#FFF',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  },
  trustBadgeIcon: {
    fontSize: '1.5rem',
  },
  trustBadgeTitle: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#1A1A1A',
  },
  trustBadgeSubtitle: {
    fontSize: '0.8rem',
    color: '#666',
  },
  
  // Sections
  sectionContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '3rem',
  },
  sectionHeaderCenter: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: '0.5rem',
  },
  sectionSubtitle: {
    fontSize: '1.1rem',
    color: '#666',
  },
  viewAllButton: {
    background: 'transparent',
    border: '2px solid #0A84FF',
    color: '#0A84FF',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  
  // Featured Vehicles
  featuredSection: {
    padding: '5rem 0',
    background: '#FFF',
  },
  vehicleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '2rem',
  },
  vehicleCard: {
    background: '#FFF',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid #E5E5E5',
    transition: 'all 0.3s ease',
  },
  vehicleImageArea: {
    position: 'relative',
    height: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleBadges: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
  },
  vehicleBadge: {
    background: 'rgba(0,0,0,0.7)',
    color: '#FFF',
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  vehicleImagePlaceholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#999',
  },
  favoriteButton: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    width: '36px',
    height: '36px',
    background: 'rgba(255,255,255,0.9)',
    border: 'none',
    borderRadius: '50%',
    fontSize: '1.2rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  vehicleInfo: {
    padding: '1.5rem',
  },
  vehicleBrandLine: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4px',
  },
  vehicleBrand: {
    fontSize: '0.85rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  vehicleYear: {
    fontSize: '0.85rem',
    color: '#666',
  },
  vehicleModel: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '1rem',
  },
  vehicleSpecs: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '8px',
    marginBottom: '1rem',
  },
  vehicleSpec: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.85rem',
    color: '#666',
  },
  specIcon: {
    fontSize: '0.9rem',
  },
  vehiclePricing: {
    marginBottom: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #E5E5E5',
  },
  vehiclePrice: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1A1A1A',
  },
  vehicleMonthly: {
    fontSize: '0.9rem',
    color: '#666',
  },
  vehicleActions: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
  },
  vehicleButtonPrimary: {
    background: '#0A84FF',
    color: '#FFF',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  vehicleButtonSecondary: {
    background: 'transparent',
    color: '#0A84FF',
    border: '2px solid #0A84FF',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  
  // Services
  servicesSection: {
    padding: '5rem 0',
    background: '#F8F9FA',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
  },
  serviceCard: {
    background: '#FFF',
    padding: '2rem',
    borderRadius: '16px',
    border: '2px solid #E5E5E5',
    transition: 'all 0.3s ease',
  },
  serviceIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
  },
  serviceTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '0.75rem',
  },
  serviceDescription: {
    fontSize: '0.95rem',
    color: '#666',
    marginBottom: '1.5rem',
    lineHeight: 1.6,
  },
  serviceFeatures: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 1.5rem 0',
  },
  serviceFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.9rem',
    color: '#444',
    marginBottom: '8px',
  },
  serviceButton: {
    width: '100%',
    color: '#FFF',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  
  // Calculator
  calculatorSection: {
    padding: '5rem 0',
    background: '#FFF',
  },
  calculatorContainer: {
    background: '#F8F9FA',
    borderRadius: '20px',
    padding: '2rem',
    border: '1px solid #E5E5E5',
  },
  calcTabs: {
    display: 'flex',
    gap: '10px',
    marginBottom: '2rem',
  },
  calcTab: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '10px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  calcGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '3rem',
  },
  calcInputs: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  calcInputGroup: {
    
  },
  calcLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '12px',
  },
  calcValue: {
    color: '#0A84FF',
    fontWeight: '700',
  },
  calcSlider: {
    width: '100%',
    height: '8px',
    borderRadius: '4px',
    background: '#E5E5E5',
    outline: 'none',
    WebkitAppearance: 'none',
    cursor: 'pointer',
  },
  calcRange: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
    color: '#999',
    marginTop: '8px',
  },
  calcResult: {
    background: '#FFF',
    borderRadius: '16px',
    padding: '2rem',
    border: '1px solid #E5E5E5',
  },
  calcResultMain: {
    textAlign: 'center',
    marginBottom: '2rem',
    paddingBottom: '2rem',
    borderBottom: '1px solid #E5E5E5',
  },
  calcResultLabel: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '8px',
  },
  calcResultValue: {
    fontSize: '3.5rem',
    fontWeight: '700',
    color: '#0A84FF',
  },
  calcResultSuffix: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#666',
    marginLeft: '4px',
  },
  calcResultDetails: {
    marginBottom: '2rem',
  },
  calcResultRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.95rem',
    color: '#666',
    marginBottom: '10px',
  },
  calcCTA: {
    width: '100%',
    background: '#30D158',
    color: '#FFF',
    border: 'none',
    padding: '16px',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '1rem',
  },
  calcDisclaimer: {
    fontSize: '0.8rem',
    color: '#999',
    textAlign: 'center',
  },
  
  // Why Choose Us
  whySection: {
    padding: '5rem 0',
    background: '#F8F9FA',
  },
  whyGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'center',
  },
  whyContent: {
    
  },
  whyIntro: {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: '2rem',
    lineHeight: 1.7,
  },
  whyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  whyItem: {
    display: 'flex',
    gap: '1rem',
  },
  whyNumber: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#0A84FF',
    opacity: 0.3,
    minWidth: '50px',
  },
  whyItemTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: '4px',
  },
  whyItemText: {
    fontSize: '0.95rem',
    color: '#666',
    lineHeight: 1.6,
  },
  whyImage: {
    
  },
  whyImagePlaceholder: {
    background: '#E5E5E5',
    borderRadius: '20px',
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Testimonials
  testimonialsSection: {
    padding: '5rem 0',
    background: '#FFF',
  },
  testimonialsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
    marginBottom: '3rem',
  },
  testimonialCard: {
    background: '#F8F9FA',
    padding: '2rem',
    borderRadius: '16px',
  },
  testimonialStars: {
    color: '#FF9F0A',
    fontSize: '1.2rem',
    marginBottom: '1rem',
    letterSpacing: '2px',
  },
  testimonialText: {
    fontSize: '1rem',
    color: '#444',
    lineHeight: 1.7,
    marginBottom: '1.5rem',
    fontStyle: 'italic',
  },
  testimonialAuthor: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  testimonialAvatar: {
    width: '48px',
    height: '48px',
    background: '#0A84FF',
    color: '#FFF',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '1.2rem',
  },
  testimonialName: {
    fontWeight: '600',
    color: '#1A1A1A',
  },
  testimonialRole: {
    fontSize: '0.85rem',
    color: '#666',
  },
  googleReview: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '1.5rem',
    background: '#F8F9FA',
    borderRadius: '12px',
  },
  googleLogo: {
    width: '32px',
    height: '32px',
    background: '#4285F4',
    color: '#FFF',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
  },
  googleRating: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1A1A1A',
  },
  googleStars: {
    color: '#FF9F0A',
    fontSize: '1.2rem',
    letterSpacing: '2px',
  },
  googleCount: {
    fontSize: '0.9rem',
    color: '#666',
  },
  
  // Contact
  contactSection: {
    padding: '5rem 0',
    background: '#0C141F',
    color: '#FFF',
  },
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
  },
  contactInfo: {
    
  },
  contactIntro: {
    fontSize: '1.1rem',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: '2rem',
    lineHeight: 1.7,
  },
  contactDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    color: 'rgba(255,255,255,0.8)',
  },
  contactIcon: {
    fontSize: '1.5rem',
    minWidth: '30px',
  },
  contactForm: {
    background: 'rgba(255,255,255,0.05)',
    padding: '2rem',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  formTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    color: '#FFF',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  formLabel: {
    display: 'block',
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: '6px',
  },
  formInput: {
    width: '100%',
    padding: '14px',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '8px',
    color: '#FFF',
    fontSize: '1rem',
    outline: 'none',
    boxSizing: 'border-box',
  },
  formSelect: {
    width: '100%',
    padding: '14px',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '8px',
    color: '#FFF',
    fontSize: '1rem',
    outline: 'none',
    boxSizing: 'border-box',
  },
  formTextarea: {
    width: '100%',
    padding: '14px',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '8px',
    color: '#FFF',
    fontSize: '1rem',
    outline: 'none',
    resize: 'vertical',
    boxSizing: 'border-box',
  },
  formSubmit: {
    width: '100%',
    background: '#0A84FF',
    color: '#FFF',
    border: 'none',
    padding: '16px',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
  formDisclaimer: {
    fontSize: '0.8rem',
    color: 'rgba(255,255,255,0.5)',
    marginTop: '1rem',
    textAlign: 'center',
  },
  
  // Footer
  footer: {
    background: '#0A0E14',
    padding: '4rem 0 2rem',
    color: '#FFF',
  },
  footerGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: '3rem',
    marginBottom: '3rem',
  },
  footerBrand: {
    
  },
  footerLogo: {
    marginBottom: '1rem',
  },
  footerTagline: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '0.95rem',
    marginBottom: '1.5rem',
  },
  footerSocial: {
    display: 'flex',
    gap: '12px',
  },
  socialIcon: {
    width: '40px',
    height: '40px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    textDecoration: 'none',
    transition: 'all 0.2s',
  },
  footerLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  footerTitle: {
    color: '#FFF',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  footerLink: {
    color: 'rgba(255,255,255,0.6)',
    textDecoration: 'none',
    fontSize: '0.95rem',
    transition: 'color 0.2s',
  },
  footerBottom: {
    textAlign: 'center',
    paddingTop: '2rem',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.9rem',
  },
  footerPowered: {
    marginTop: '8px',
  },
  vegaText: {
    color: '#0A84FF',
    fontWeight: '600',
  },
};

export default CarCompany24Website;
