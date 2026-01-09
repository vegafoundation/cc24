import React, { useState, useEffect } from 'react';

// ============================================
// CARCOMPANY24 - Professional Automotive Website
// Gebrauchtwagen & Finanzierung
// ============================================

const CarCompany24Website = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans bg-white text-gray-900 min-h-screen">
      <Navigation scrolled={scrolled} />
      <HeroSection />
      <TrustBadges />
      <FeaturedVehicles />
      <ServicesSection />
      <FinancingCalculator />
      <WhyChooseUs />
      <Testimonials />
      <ContactSection />
      <Footer />
    </div>
  );
};

// ============================================
// NAVIGATION
// ============================================
const Navigation = ({ scrolled }) => {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
      scrolled ? 'bg-slate-900/98 shadow-xl' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center">
            <div className="w-4 h-4 bg-blue-500 rotate-45" />
          </div>
          <div className="flex items-baseline">
            <span className="text-xl font-bold text-white">CAR</span>
            <span className="text-xl font-bold text-blue-500">COMPANY</span>
            <span className="text-xl font-extrabold text-amber-500 ml-0.5">24</span>
          </div>
        </div>
        
        <div className="hidden md:flex gap-8">
          {['Fahrzeuge', 'Finanzierung', 'Ankauf', 'Service', 'Kontakt'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-white/90 hover:text-blue-400 font-medium transition-colors">
              {item}
            </a>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <a href="tel:+4989123456789" className="hidden md:flex items-center gap-2 text-white font-semibold">
            📞 089 / 123 456 789
          </a>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors">
            Termin
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
  const [searchParams, setSearchParams] = useState({ brand: '', priceMax: '', type: '' });

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-16 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/5 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 max-w-6xl w-full text-center">
        <div className="inline-flex items-center gap-2 bg-green-500/15 text-green-400 px-4 py-2 rounded-full text-sm font-semibold mb-8">
          <span>✓</span> Über 500 geprüfte Fahrzeuge
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          Ihr Partner für<br/>
          <span className="text-blue-500">Gebrauchtwagen & Finanzierung</span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto">
          Qualitätsfahrzeuge mit Garantie • Flexible Finanzierung ab 0% • Express-Zulassung
        </p>
        
        {/* Search Box */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-left">
              <label className="block text-white/50 text-sm mb-2 font-medium">Marke</label>
              <select className="w-full p-3.5 bg-white/10 border border-white/20 rounded-lg text-white">
                <option value="">Alle Marken</option>
                <option>Audi</option>
                <option>BMW</option>
                <option>Mercedes-Benz</option>
                <option>Volkswagen</option>
              </select>
            </div>
            <div className="text-left">
              <label className="block text-white/50 text-sm mb-2 font-medium">Preis bis</label>
              <select className="w-full p-3.5 bg-white/10 border border-white/20 rounded-lg text-white">
                <option value="">Kein Limit</option>
                <option>€15.000</option>
                <option>€25.000</option>
                <option>€35.000</option>
                <option>€50.000</option>
              </select>
            </div>
            <div className="text-left">
              <label className="block text-white/50 text-sm mb-2 font-medium">Fahrzeugtyp</label>
              <select className="w-full p-3.5 bg-white/10 border border-white/20 rounded-lg text-white">
                <option value="">Alle Typen</option>
                <option>Limousine</option>
                <option>Kombi</option>
                <option>SUV</option>
                <option>Kleinwagen</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full p-3.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
                🔍 Suchen
              </button>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {[
            { num: '15+', label: 'Jahre Erfahrung' },
            { num: '5.000+', label: 'Verkaufte Fahrzeuge' },
            { num: '98%', label: 'Zufriedene Kunden' },
            { num: '4.9★', label: 'Google Bewertung' },
          ].map((stat, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="hidden md:block w-px h-12 bg-white/20" />}
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.num}</div>
                <div className="text-sm text-white/50 mt-1">{stat.label}</div>
              </div>
            </React.Fragment>
          ))}
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
    { icon: '🛡️', title: 'TÜV geprüft', sub: 'Alle Fahrzeuge' },
    { icon: '✅', title: '12 Monate', sub: 'Garantie' },
    { icon: '💰', title: 'Bestpreis', sub: 'Garantie' },
    { icon: '🚗', title: 'Probefahrt', sub: 'Kostenlos' },
    { icon: '📋', title: 'Historie', sub: 'Transparent' },
    { icon: '🔧', title: 'Werkstatt', sub: 'Vor Ort' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 p-6 bg-gray-50 border-b border-gray-200">
      {badges.map((b, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-sm">
          <span className="text-2xl">{b.icon}</span>
          <div>
            <div className="font-semibold text-gray-900 text-sm">{b.title}</div>
            <div className="text-xs text-gray-500">{b.sub}</div>
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
    { brand: 'BMW', model: '320d xDrive Touring', year: 2022, km: 45000, fuel: 'Diesel', power: '190 PS', price: 38900, monthly: 389, badges: ['TÜV Neu', 'Garantie'], color: '#1C69D4' },
    { brand: 'Mercedes', model: 'C 200 AMG Line', year: 2021, km: 52000, fuel: 'Benzin', power: '204 PS', price: 42500, monthly: 425, badges: ['1. Hand', 'LED'], color: '#333' },
    { brand: 'Audi', model: 'A4 Avant 40 TDI quattro', year: 2023, km: 28000, fuel: 'Diesel', power: '204 PS', price: 46900, monthly: 469, badges: ['Werksgarantie', 'Matrix LED'], color: '#BB0A21' },
    { brand: 'VW', model: 'Tiguan 2.0 TDI 4Motion', year: 2022, km: 38000, fuel: 'Diesel', power: '150 PS', price: 34900, monthly: 349, badges: ['R-Line', 'Panorama'], color: '#00437A' },
  ];

  return (
    <section className="py-16 px-6 bg-white" id="fahrzeuge">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Aktuelle Fahrzeugangebote</h2>
            <p className="text-gray-500">Handverlesene Qualitätsfahrzeuge mit Garantie</p>
          </div>
          <button className="border-2 border-blue-500 text-blue-500 hover:bg-blue-50 px-5 py-2.5 rounded-lg font-semibold transition-colors">
            Alle 500+ ansehen →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((v, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-44 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${v.color}15, ${v.color}05)` }}>
                <div className="absolute top-3 left-3 flex gap-1.5">
                  {v.badges.map((badge, j) => (
                    <span key={j} className="bg-black/70 text-white text-xs px-2 py-1 rounded-md font-medium">{badge}</span>
                  ))}
                </div>
                <span className="text-5xl">🚗</span>
                <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center text-xl hover:bg-white transition-colors">♡</button>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold uppercase tracking-wide" style={{ color: v.color }}>{v.brand}</span>
                  <span className="text-xs text-gray-500">{v.year}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3 text-lg leading-tight">{v.model}</h3>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[
                    { icon: '📏', val: `${v.km.toLocaleString('de-DE')} km` },
                    { icon: '⛽', val: v.fuel },
                    { icon: '⚡', val: v.power },
                    { icon: '⚙️', val: 'Automatik' },
                  ].map((spec, j) => (
                    <span key={j} className="flex items-center gap-1.5 text-sm text-gray-500">
                      <span>{spec.icon}</span> {spec.val}
                    </span>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-4 mb-4">
                  <div className="text-2xl font-bold text-gray-900">€{v.price.toLocaleString('de-DE')}</div>
                  <div className="text-sm text-gray-500">oder ab <strong>€{v.monthly}/Monat</strong></div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors">Details</button>
                  <button className="border-2 border-blue-500 text-blue-500 hover:bg-blue-50 py-2.5 rounded-lg text-sm font-semibold transition-colors">Probefahrt</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SERVICES SECTION
// ============================================
const ServicesSection = () => {
  const services = [
    { icon: '🚗', title: 'Fahrzeug kaufen', desc: 'Über 500 geprüfte Gebrauchtwagen mit Garantie.', features: ['TÜV geprüft', '12 Monate Garantie', 'Finanzierung möglich'], color: '#0A84FF' },
    { icon: '💰', title: 'Fahrzeug verkaufen', desc: 'Bestpreis für Ihr Fahrzeug. Schnelle Abwicklung.', features: ['Kostenlose Bewertung', 'Sofortankauf', 'Auszahlung in 24h'], color: '#30D158' },
    { icon: '🏦', title: 'Finanzierung', desc: 'Flexible Lösungen ab 0% Zinsen.', features: ['Ab 0% Zinsen', 'Flexible Laufzeiten', 'Schnelle Zusage'], color: '#FF9F0A' },
    { icon: '🛡️', title: 'Versicherung', desc: 'Günstige KFZ-Versicherungen im Vergleich.', features: ['Alle Anbieter', 'Bis 50% sparen', 'Sofort-Deckung'], color: '#BF5AF2' },
  ];

  return (
    <section className="py-16 px-6 bg-gray-50" id="service">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Unsere Leistungen</h2>
          <p className="text-gray-500">Alles rund ums Auto – aus einer Hand</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border-2 border-gray-100 hover:border-current hover:-translate-y-1 transition-all duration-300" style={{ '--tw-border-opacity': 1 }}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-5" style={{ background: `${s.color}15` }}>
                {s.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">{s.desc}</p>
              <ul className="space-y-2 mb-5">
                {s.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                    <span style={{ color: s.color }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-2.5 rounded-lg text-white font-semibold transition-colors hover:opacity-90" style={{ background: s.color }}>
                Mehr erfahren →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// FINANCING CALCULATOR
// ============================================
const FinancingCalculator = () => {
  const [calcMode, setCalcMode] = useState('kredit');
  const [vehiclePrice, setVehiclePrice] = useState(30000);
  const [downPayment, setDownPayment] = useState(5000);
  const [duration, setDuration] = useState(48);
  const [interestRate, setInterestRate] = useState(3.99);
  const [balloonPayment, setBalloonPayment] = useState(10000);

  const calculateMonthlyRate = () => {
    const principal = vehiclePrice - downPayment - (calcMode === 'ballon' ? balloonPayment : 0);
    const monthlyInterest = interestRate / 100 / 12;
    if (interestRate === 0) return principal / duration;
    return principal * (monthlyInterest * Math.pow(1 + monthlyInterest, duration)) / (Math.pow(1 + monthlyInterest, duration) - 1);
  };

  const monthlyRate = calculateMonthlyRate();
  const totalPayment = (monthlyRate * duration) + downPayment + (calcMode === 'ballon' ? balloonPayment : 0);
  const totalInterest = totalPayment - vehiclePrice;

  const SliderInput = ({ label, value, onChange, min, max, step, displayValue }) => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <label className="font-semibold text-gray-900">{label}</label>
        <span className="text-blue-500 font-bold">{displayValue}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
      />
      <div className="flex justify-between text-xs text-gray-400 mt-2">
        <span>{typeof min === 'number' && min >= 1000 ? `€${min.toLocaleString('de-DE')}` : min}</span>
        <span>{typeof max === 'number' && max >= 1000 ? `€${max.toLocaleString('de-DE')}` : max}</span>
      </div>
    </div>
  );

  return (
    <section className="py-16 px-6 bg-white" id="finanzierung">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Finanzierungsrechner</h2>
          <p className="text-gray-500">Berechnen Sie Ihre individuelle Rate</p>
        </div>
        
        <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200">
          {/* Mode Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { id: 'kredit', label: 'Klassischer Kredit', icon: '💳' },
              { id: 'ballon', label: 'Ballonfinanzierung', icon: '🎈' },
              { id: 'leasing', label: 'Leasing', icon: '📋' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCalcMode(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-colors ${
                  calcMode === tab.id ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Inputs */}
            <div>
              <SliderInput label="Fahrzeugpreis" value={vehiclePrice} onChange={setVehiclePrice} min={5000} max={150000} step={1000} displayValue={`€${vehiclePrice.toLocaleString('de-DE')}`} />
              <SliderInput label="Anzahlung" value={downPayment} onChange={setDownPayment} min={0} max={vehiclePrice * 0.5} step={500} displayValue={`€${downPayment.toLocaleString('de-DE')}`} />
              <SliderInput label="Laufzeit" value={duration} onChange={setDuration} min={12} max={84} step={6} displayValue={`${duration} Monate`} />
              {calcMode === 'ballon' && (
                <SliderInput label="Schlussrate" value={balloonPayment} onChange={setBalloonPayment} min={0} max={vehiclePrice * 0.4} step={500} displayValue={`€${balloonPayment.toLocaleString('de-DE')}`} />
              )}
              <SliderInput label="Effektiver Jahreszins" value={interestRate} onChange={setInterestRate} min={0} max={12} step={0.01} displayValue={`${interestRate}%`} />
            </div>
            
            {/* Results */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="text-center pb-6 mb-6 border-b border-gray-100">
                <div className="text-gray-500 mb-2">Ihre monatliche Rate</div>
                <div className="text-5xl font-bold text-blue-500">
                  €{Math.round(monthlyRate).toLocaleString('de-DE')}
                  <span className="text-lg font-semibold text-gray-400 ml-1">/Monat</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Fahrzeugpreis</span>
                  <span>€{vehiclePrice.toLocaleString('de-DE')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Anzahlung</span>
                  <span>- €{downPayment.toLocaleString('de-DE')}</span>
                </div>
                {calcMode === 'ballon' && (
                  <div className="flex justify-between text-gray-600">
                    <span>Schlussrate</span>
                    <span>- €{balloonPayment.toLocaleString('de-DE')}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Kreditbetrag</span>
                  <span>€{(vehiclePrice - downPayment - (calcMode === 'ballon' ? balloonPayment : 0)).toLocaleString('de-DE')}</span>
                </div>
                <div className="flex justify-between pt-3 mt-3 border-t border-gray-100">
                  <span className="font-semibold">Gesamtbetrag</span>
                  <span className="font-bold">€{Math.round(totalPayment).toLocaleString('de-DE')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Zinskosten</span>
                  <span className="text-red-500">€{Math.round(totalInterest).toLocaleString('de-DE')}</span>
                </div>
              </div>
              
              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold transition-colors">
                💬 Unverbindliches Angebot anfordern
              </button>
              
              <p className="text-xs text-gray-400 text-center mt-4">
                * Beispielrechnung. Bonität vorausgesetzt.
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
    { num: '01', title: 'Geprüfte Qualität', text: 'Jedes Fahrzeug durchläuft eine 150-Punkte-Inspektion.' },
    { num: '02', title: 'Faire Preise', text: 'Transparente Preisgestaltung. Bestpreis-Garantie.' },
    { num: '03', title: 'Flexible Finanzierung', text: 'Maßgeschneiderte Lösungen. Online-Zusage in Minuten.' },
    { num: '04', title: 'Rundum-Service', text: 'Von Probefahrt bis Zulassung – wir kümmern uns.' },
  ];

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Warum CarCompany24?</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Seit über 15 Jahren sind wir Ihr verlässlicher Partner für Gebrauchtwagen. 
              Qualität, Transparenz und Kundenzufriedenheit stehen bei uns an erster Stelle.
            </p>
            <div className="space-y-6">
              {reasons.map((r, i) => (
                <div key={i} className="flex gap-4">
                  <div className="text-3xl font-bold text-blue-500/30 w-12">{r.num}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{r.title}</h4>
                    <p className="text-gray-500 text-sm">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <span className="text-6xl">🏢</span>
              <p className="mt-4 text-gray-500">Unser Standort in München</p>
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
    { name: 'Michael K.', role: 'BMW 320d Käufer', text: 'Super Beratung und faires Angebot. Die Finanzierung wurde schnell abgewickelt. Sehr empfehlenswert!', rating: 5 },
    { name: 'Sandra M.', role: 'Mercedes Käuferin', text: 'Von der Anfrage bis zur Zulassung alles perfekt. Das Team ist kompetent und freundlich.', rating: 5 },
    { name: 'Thomas B.', role: 'Audi A4 Verkäufer', text: 'Habe meinen Audi zum fairen Preis verkauft. Geld war am nächsten Tag auf dem Konto.', rating: 5 },
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Das sagen unsere Kunden</h2>
          <p className="text-gray-500">Über 5.000 zufriedene Kunden vertrauen uns</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-2xl">
              <div className="text-amber-400 text-xl mb-4 tracking-wider">{'★'.repeat(t.rating)}</div>
              <p className="text-gray-600 italic mb-6 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-lg">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-center gap-3 p-4 bg-gray-50 rounded-xl max-w-md mx-auto">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">G</div>
          <span className="text-2xl font-bold">4.9</span>
          <span className="text-amber-400 tracking-wider">★★★★★</span>
          <span className="text-gray-500 text-sm">847 Bewertungen</span>
        </div>
      </div>
    </section>
  );
};

// ============================================
// CONTACT SECTION
// ============================================
const ContactSection = () => {
  return (
    <section className="py-16 px-6 bg-slate-900 text-white" id="kontakt">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Kontaktieren Sie uns</h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? 
              Wir sind für Sie da.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: '📍', title: 'Standort', text: 'Musterstraße 123, 80331 München' },
                { icon: '📞', title: 'Telefon', text: '089 / 123 456 789' },
                { icon: '✉️', title: 'E-Mail', text: 'info@carcompany24.de' },
                { icon: '🕒', title: 'Öffnungszeiten', text: 'Mo-Fr: 9-18 Uhr | Sa: 10-14 Uhr' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 text-white/80">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <strong className="text-white">{item.title}</strong><br/>
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl font-semibold mb-6">Schnellanfrage</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Name *" className="w-full p-3.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40" />
                <input type="tel" placeholder="Telefon" className="w-full p-3.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40" />
              </div>
              <input type="email" placeholder="E-Mail *" className="w-full p-3.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40" />
              <select className="w-full p-3.5 bg-white/10 border border-white/20 rounded-lg text-white">
                <option value="">Interesse an...</option>
                <option>Fahrzeug kaufen</option>
                <option>Fahrzeug verkaufen</option>
                <option>Finanzierung</option>
                <option>Probefahrt</option>
              </select>
              <textarea placeholder="Ihre Nachricht..." rows="4" className="w-full p-3.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 resize-none" />
              <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg font-semibold transition-colors">
                Anfrage senden →
              </button>
              <p className="text-xs text-white/40 text-center">* Pflichtfelder</p>
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
    <footer className="bg-slate-950 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-baseline mb-4">
              <span className="text-xl font-bold text-white">CAR</span>
              <span className="text-xl font-bold text-blue-500">COMPANY</span>
              <span className="text-xl font-extrabold text-amber-500 ml-0.5">24</span>
            </div>
            <p className="text-white/50 text-sm mb-4">Ihr Premium Automotive Partner seit 2009</p>
            <div className="flex gap-3">
              {['📘', '📷', '🎥', '💼'].map((icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                  {icon}
                </a>
              ))}
            </div>
          </div>
          
          {[
            { title: 'Services', links: ['Fahrzeuge kaufen', 'Fahrzeug verkaufen', 'Finanzierung', 'Versicherung'] },
            { title: 'Unternehmen', links: ['Über uns', 'Karriere', 'Partner', 'Presse'] },
            { title: 'Rechtliches', links: ['Impressum', 'Datenschutz', 'AGB', 'Widerruf'] },
          ].map((section, i) => (
            <div key={i}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <div className="space-y-2">
                {section.links.map((link, j) => (
                  <a key={j} href="#" className="block text-white/50 hover:text-white text-sm transition-colors">{link}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center text-white/40 text-sm">
          <p>© 2025 CarCompany24. Alle Rechte vorbehalten.</p>
          <p className="mt-2">Powered by <span className="text-blue-500 font-semibold">VEGA Foundation</span></p>
        </div>
      </div>
    </footer>
  );
};

export default CarCompany24Website;
