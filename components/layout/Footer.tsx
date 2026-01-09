import Link from 'next/link'
import { Car, MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Car className="w-6 h-6 text-primary-500" />
              <span className="text-xl font-bold">
                <span className="text-primary-500">Car</span>
                <span>Company</span>
                <span className="text-primary-500">24</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Ihr zuverlässiger Partner für Gebrauchtwagen in Göttingen. 
              Finanzierung auch bei negativer Schufa möglich.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-primary-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Schnellzugriff</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Startseite
                </Link>
              </li>
              <li>
                <Link href="/fahrzeuge" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Fahrzeuge
                </Link>
              </li>
              <li>
                <Link href="/finanzierung" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Finanzierung
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">
                  Adolf-Hoyer-Straße 12<br />
                  37079 Göttingen
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <a href="tel:+49" className="text-gray-400 hover:text-primary-500 transition-colors">
                  +49 (0) 551 / XXX-XXXX
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <a
                  href="mailto:info@carcompany24-gmbh.de"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  info@carcompany24-gmbh.de
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Rechtliches</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/datenschutz" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="/impressum" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/agb" className="text-gray-400 hover:text-primary-500 transition-colors">
                  AGB
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} CarCompany24 GmbH. Alle Rechte vorbehalten. | HRB 206118, Amtsgericht Göttingen
          </p>
        </div>
      </div>
    </footer>
  )
}
