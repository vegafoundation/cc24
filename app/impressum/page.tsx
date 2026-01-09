import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum | CarCompany24',
  description: 'Impressum und rechtliche Informationen',
}

export default function ImpressumPage() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-display font-bold mb-8 bg-gradient-to-r from-vega-cyan to-vega-emerald bg-clip-text text-transparent">
          Impressum
        </h1>
        
        <div className="bg-gray-800 rounded-lg p-8 space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Angaben gemäß § 5 TMG</h2>
            <p className="mb-2">
              <strong>CarCompany24 GmbH</strong>
            </p>
            <p className="mb-2">
              Musterstraße 123<br />
              12345 Musterstadt
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Kontakt</h2>
            <p className="mb-2">
              Telefon: +49 (0) XXX XXX XXX<br />
              E-Mail: info@carcompany24.de
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Registereintrag</h2>
            <p className="mb-2">
              Eintragung im Handelsregister.<br />
              Registergericht: Amtsgericht Musterstadt<br />
              Registernummer: HRB XXXXX
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Umsatzsteuer-ID</h2>
            <p className="mb-2">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              DE XXXXXXXX
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Geschäftsführung</h2>
            <p className="mb-2">
              Max Mustermann
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p className="mb-2">
              Max Mustermann<br />
              Musterstraße 123<br />
              12345 Musterstadt
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}


export const metadata: Metadata = {
  title: 'Impressum | CarCompany24',
  description: 'Impressum und rechtliche Angaben',
}

export default function ImpressumPage() {
  return (
    <div className="min-h-screen pt-20 pb-20 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-display font-bold mb-8 bg-gradient-to-r from-vega-cyan to-vega-emerald bg-clip-text text-transparent">
          Impressum
        </h1>
        
        <div className="bg-gray-800 rounded-lg p-8 space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Angaben gemäß § 5 TMG</h2>
            <p className="mb-2">
              <strong>CarCompany24 GmbH</strong>
            </p>
            <p className="mb-2">Musterstraße 123</p>
            <p className="mb-2">12345 Musterstadt</p>
            <p className="mb-4">Deutschland</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Kontakt</h2>
            <p className="mb-2">Telefon: +49 (0) XXX XXX XXX</p>
            <p className="mb-2">E-Mail: info@carcompany24.de</p>
            <p className="mb-4">Website: www.carcompany24.de</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Geschäftsführung</h2>
            <p className="mb-4">Max Mustermann</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Handelsregister</h2>
            <p className="mb-2">Registergericht: Amtsgericht Musterstadt</p>
            <p className="mb-4">Registernummer: HRB 12345</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Umsatzsteuer-ID</h2>
            <p className="mb-4">Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE123456789</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Verantwortlich für den Inhalt</h2>
            <p className="mb-2">Max Mustermann</p>
            <p className="mb-2">Musterstraße 123</p>
            <p className="mb-4">12345 Musterstadt</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Haftungsausschluss</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Haftung für Inhalte</h3>
                <p>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Haftung für Links</h3>
                <p>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
