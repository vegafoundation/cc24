import React, { useState, useEffect } from 'react';

const CarCompany24Website = () => {
  const [scrollY, setScrollY] = useState(0);

  return (
    <div className="font-sans bg-white text-gray-900 min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-slate-900/98 shadow-xl">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-blue-500 flex items-center justify-center">
              <div className="w-3 h-3 bg-blue-500 rotate-45" />
            </div>
            <span className="text-lg font-bold text-white">CAR</span>
            <span className="text-lg font-bold text-blue-500">COMPANY</span>
            <span className="text-lg font-extrabold text-amber-500">24</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm">
            {['Fahrzeuge', 'Finanzierung', 'Kontakt'].map((item) => (
              <a key={item} href="#" className="text-white/80 hover:text-blue-400 font-medium">{item}</a>
            ))}
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
            Termin
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16 pb-12 px-4">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/4 left-1/5 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/5 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-4xl w-full text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1.5 rounded-full text-xs font-semibold mb-6">
            ✓ Über 500 geprüfte Fahrzeuge
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
            Ihr Partner für<br/>
            <span className="text-blue-500">Gebrauchtwagen & Finanzierung</span>
          </h1>
          
          <p className="text-base md:text-lg text-white/60 mb-8 max-w-xl mx-auto">
            Qualitätsfahrzeuge mit Garantie • Flexible Finanzierung ab 0%
          </p>
          
          {/* Search Box */}
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10 mb-8 max-w-2xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <select className="p-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm">
                <option>Alle Marken</option>
                <option>BMW</option>
                <option>Mercedes</option>
                <option>Audi</option>
              </select>
              <select className="p-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm">
                <option>Preis bis</option>
                <option>€25.000</option>
                <option>€50.000</option>
              </select>
              <select className="p-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm">
                <option>Fahrzeugtyp</option>
                <option>Limousine</option>
                <option>SUV</option>
              </select>
              <button className="p-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-1">
                🔍 Suchen
              </button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {[
              { num: '15+', label: 'Jahre' },
              { num: '5.000+', label: 'Verkäufe' },
              { num: '98%', label: 'Zufrieden' },
              { num: '4.9★', label: 'Google' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.num}</div>
                <div className="text-xs text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="flex flex-wrap justify-center gap-2 p-4 bg-gray-50 border-b border-gray-200">
        {[
          { icon: '🛡️', text: 'TÜV geprüft' },
          { icon: '✅', text: '12 Mon. Garantie' },
          { icon: '💰', text: 'Bestpreis' },
          { icon: '🚗', text: 'Probefahrt' },
        ].map((b, i) => (
          <div key={i} className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm text-sm">
            <span>{b.icon}</span>
            <span className="font-medium text-gray-700">{b.text}</span>
          </div>
        ))}
      </div>

      {/* Featured Vehicles */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Aktuelle Angebote</h2>
              <p className="text-gray-500 text-sm">Handverlesene Qualitätsfahrzeuge</p>
            </div>
            <button className="text-blue-500 font-semibold text-sm hover:underline">
              Alle ansehen →
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { brand: 'BMW', model: '320d Touring', year: '2022', km: '45.000', price: '38.900', monthly: '389', color: '#1C69D4' },
              { brand: 'Mercedes', model: 'C 200 AMG', year: '2021', km: '52.000', price: '42.500', monthly: '425', color: '#333' },
              { brand: 'Audi', model: 'A4 Avant quattro', year: '2023', km: '28.000', price: '46.900', monthly: '469', color: '#BB0A21' },
              { brand: 'VW', model: 'Tiguan 4Motion', year: '2022', km: '38.000', price: '34.900', monthly: '349', color: '#00437A' },
            ].map((v, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-32 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${v.color}15, ${v.color}05)` }}>
                  <div className="absolute top-2 left-2 flex gap-1">
                    <span className="bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">TÜV</span>
                    <span className="bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">Garantie</span>
                  </div>
                  <span className="text-4xl">🚗</span>
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-xs font-bold uppercase" style={{ color: v.color }}>{v.brand}</span>
                    <span className="text-xs text-gray-400">{v.year}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-2">{v.model}</h3>
                  <div className="flex gap-3 text-xs text-gray-500 mb-3">
                    <span>📏 {v.km} km</span>
                    <span>⛽ Diesel</span>
                  </div>
                  <div className="border-t border-gray-100 pt-2">
                    <div className="text-xl font-bold text-gray-900">€{v.price}</div>
                    <div className="text-xs text-gray-500">ab €{v.monthly}/Monat</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <button className="bg-blue-500 text-white py-1.5 rounded text-xs font-semibold">Details</button>
                    <button className="border border-blue-500 text-blue-500 py-1.5 rounded text-xs font-semibold">Probefahrt</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Unsere Leistungen</h2>
            <p className="text-gray-500 text-sm">Alles aus einer Hand</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🚗', title: 'Kaufen', desc: '500+ Fahrzeuge', color: '#0A84FF' },
              { icon: '💰', title: 'Verkaufen', desc: 'Bestpreis Garantie', color: '#30D158' },
              { icon: '🏦', title: 'Finanzierung', desc: 'Ab 0% Zinsen', color: '#FF9F0A' },
              { icon: '🛡️', title: 'Versicherung', desc: 'Bis 50% sparen', color: '#BF5AF2' },
            ].map((s, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-2xl mb-3" style={{ background: `${s.color}15` }}>
                  {s.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{s.title}</h3>
                <p className="text-xs text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <FinancingCalculator />

      {/* Testimonials */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Kundenstimmen</h2>
            <p className="text-gray-500 text-sm">5.000+ zufriedene Kunden</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[
              { name: 'Michael K.', role: 'BMW Käufer', text: 'Super Beratung und schnelle Abwicklung. Sehr empfehlenswert!' },
              { name: 'Sandra M.', role: 'Mercedes Käuferin', text: 'Von Anfrage bis Zulassung alles perfekt. Kompetentes Team!' },
              { name: 'Thomas B.', role: 'Audi Verkäufer', text: 'Fairer Preis, Geld am nächsten Tag. Top Service!' },
            ].map((t, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-xl">
                <div className="text-amber-400 mb-2">★★★★★</div>
                <p className="text-gray-600 text-sm italic mb-3">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg max-w-xs mx-auto">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">G</div>
            <span className="text-xl font-bold">4.9</span>
            <span className="text-amber-400">★★★★★</span>
            <span className="text-gray-500 text-xs">847 Bewertungen</span>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 px-4 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Kontakt</h2>
              <p className="text-white/60 mb-6 text-sm">Fragen? Wir sind für Sie da.</p>
              
              <div className="space-y-4 text-sm">
                {[
                  { icon: '📍', text: 'Musterstraße 123, 80331 München' },
                  { icon: '📞', text: '089 / 123 456 789' },
                  { icon: '✉️', text: 'info@carcompany24.de' },
                  { icon: '🕒', text: 'Mo-Fr: 9-18 | Sa: 10-14' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/80">
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <h3 className="font-semibold mb-4">Schnellanfrage</h3>
              <form className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="Name" className="p-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 text-sm" />
                  <input type="tel" placeholder="Telefon" className="p-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 text-sm" />
                </div>
                <input type="email" placeholder="E-Mail" className="w-full p-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 text-sm" />
                <select className="w-full p-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm">
                  <option>Interesse an...</option>
                  <option>Fahrzeug kaufen</option>
                  <option>Fahrzeug verkaufen</option>
                  <option>Finanzierung</option>
                </select>
                <textarea placeholder="Nachricht" rows="3" className="w-full p-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 text-sm resize-none" />
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors">
                  Senden →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pb-6 border-b border-white/10 mb-6">
            <div className="flex items-baseline">
              <span className="text-lg font-bold">CAR</span>
              <span className="text-lg font-bold text-blue-500">COMPANY</span>
              <span className="text-lg font-extrabold text-amber-500">24</span>
            </div>
            <div className="flex gap-6 text-sm text-white/60">
              <a href="#" className="hover:text-white">Impressum</a>
              <a href="#" className="hover:text-white">Datenschutz</a>
              <a href="#" className="hover:text-white">AGB</a>
            </div>
          </div>
          <div className="text-center text-white/40 text-sm">
            <p>© 2025 CarCompany24. Powered by <span className="text-blue-500 font-semibold">VEGA Foundation</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Financing Calculator Component
const FinancingCalculator = () => {
  const [vehiclePrice, setVehiclePrice] = useState(30000);
  const [downPayment, setDownPayment] = useState(5000);
  const [duration, setDuration] = useState(48);
  const [interestRate, setInterestRate] = useState(3.99);

  const calculateMonthlyRate = () => {
    const principal = vehiclePrice - downPayment;
    const monthlyInterest = interestRate / 100 / 12;
    if (interestRate === 0) return principal / duration;
    return principal * (monthlyInterest * Math.pow(1 + monthlyInterest, duration)) / (Math.pow(1 + monthlyInterest, duration) - 1);
  };

  const monthlyRate = calculateMonthlyRate();
  const totalPayment = monthlyRate * duration + downPayment;
  const totalInterest = totalPayment - vehiclePrice;

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Finanzierungsrechner</h2>
          <p className="text-gray-500 text-sm">Berechnen Sie Ihre Rate</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-200">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Inputs */}
            <div className="space-y-5">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold text-gray-900 text-sm">Fahrzeugpreis</label>
                  <span className="text-blue-500 font-bold text-sm">€{vehiclePrice.toLocaleString('de-DE')}</span>
                </div>
                <input type="range" min="5000" max="100000" step="1000" value={vehiclePrice} onChange={(e) => setVehiclePrice(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold text-gray-900 text-sm">Anzahlung</label>
                  <span className="text-blue-500 font-bold text-sm">€{downPayment.toLocaleString('de-DE')}</span>
                </div>
                <input type="range" min="0" max={vehiclePrice * 0.5} step="500" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold text-gray-900 text-sm">Laufzeit</label>
                  <span className="text-blue-500 font-bold text-sm">{duration} Monate</span>
                </div>
                <input type="range" min="12" max="84" step="6" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold text-gray-900 text-sm">Zinssatz</label>
                  <span className="text-blue-500 font-bold text-sm">{interestRate}%</span>
                </div>
                <input type="range" min="0" max="10" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500" />
              </div>
            </div>
            
            {/* Results */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-center pb-4 mb-4 border-b border-gray-200">
                <div className="text-gray-500 text-sm mb-1">Monatliche Rate</div>
                <div className="text-4xl font-bold text-blue-500">
                  €{Math.round(monthlyRate).toLocaleString('de-DE')}
                  <span className="text-base font-semibold text-gray-400">/Mo</span>
                </div>
              </div>
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Fahrzeugpreis</span>
                  <span>€{vehiclePrice.toLocaleString('de-DE')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Anzahlung</span>
                  <span>- €{downPayment.toLocaleString('de-DE')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Kreditbetrag</span>
                  <span>€{(vehiclePrice - downPayment).toLocaleString('de-DE')}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="font-semibold">Gesamtbetrag</span>
                  <span className="font-bold">€{Math.round(totalPayment).toLocaleString('de-DE')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Zinskosten</span>
                  <span className="text-red-500">€{Math.round(totalInterest).toLocaleString('de-DE')}</span>
                </div>
              </div>
              
              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors text-sm">
                💬 Angebot anfordern
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarCompany24Website;
