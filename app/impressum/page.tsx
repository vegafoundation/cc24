import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum | CarCompany24 GmbH',
  description: 'Impressum und rechtliche Angaben der CarCompany24 GmbH',
}

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Impressum</h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Angaben gemäß § 5 TMG</h2>
              <address className="not-italic text-gray-700">
                CarCompany24 GmbH<br />
                Adolf-Hoyer-Straße 12<br />
                37079 Göttingen<br />
                Deutschland
              </address>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Kontakt</h2>
              <p className="text-gray-700">
                Telefon: +49 (0) 551 / XXX-XXXX<br />
                E-Mail: info@carcompany24-gmbh.de
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Geschäftsführung</h2>
              <p className="text-gray-700">
                Hatice Yagmur<br />
                Xhulja Yagmur
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Registereintrag</h2>
              <p className="text-gray-700">
                Handelsregister: HRB 206118<br />
                Registergericht: Amtsgericht Göttingen
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Umsatzsteuer-ID</h2>
              <p className="text-gray-700">
                Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
                DE 33615454
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Verantwortlich für den Inhalt</h2>
              <p className="text-gray-700">
                CarCompany24 GmbH<br />
                Adolf-Hoyer-Straße 12<br />
                37079 Göttingen
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
