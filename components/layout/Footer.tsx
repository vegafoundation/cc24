import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-vega-cyan/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-display font-bold text-vega-cyan mb-4">
              CarCompany24
            </h3>
            <p className="text-gray-400 text-sm">
              Premium Gebrauchtwagenhandel mit integrierter Finanzierung.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/" className="hover:text-vega-cyan transition">
                  Startseite
                </Link>
              </li>
              <li>
                <Link href="/fahrzeuge" className="hover:text-vega-cyan transition">
                  Fahrzeuge
                </Link>
              </li>
              <li>
                <Link href="/finanzierung" className="hover:text-vega-cyan transition">
                  Finanzierung
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Rechtliches</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/impressum" className="hover:text-vega-cyan transition">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="hover:text-vega-cyan transition">
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <strong className="text-white">CarCompany24 GmbH</strong>
              </li>
              <li>Musterstraße 123</li>
              <li>12345 Musterstadt</li>
              <li className="mt-2">Email: info@carcompany24.de</li>
              <li>Tel: +49 (0) XXX XXX XXX</li>
              <li>USt-IdNr.: DE XXXXXXXX</li>
              <li>HRB: XXXXX</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} CarCompany24 GmbH. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  )
}
