import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | CarCompany24 GmbH',
  description: 'Datenschutzerklärung gemäß DSGVO für CarCompany24 GmbH',
}

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Datenschutzerklärung</h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Verantwortlicher</h2>
              <p className="text-gray-700 mb-4">
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:
              </p>
              <address className="not-italic text-gray-700">
                CarCompany24 GmbH<br />
                Adolf-Hoyer-Straße 12<br />
                37079 Göttingen<br />
                Deutschland
              </address>
              <p className="text-gray-700 mt-4">
                E-Mail: info@carcompany24-gmbh.de<br />
                Telefon: +49 (0) 551 / XXX-XXXX
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Datenerfassung</h2>
              <p className="text-gray-700 mb-4">
                Wir erheben und verarbeiten personenbezogene Daten nur, soweit dies zur Erfüllung
                unserer Leistungen erforderlich ist oder Sie uns diese Daten freiwillig zur Verfügung stellen.
              </p>
              <p className="text-gray-700">
                Folgende Daten können erhoben werden:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>Name und Kontaktdaten (E-Mail, Telefon)</li>
                <li>Fahrzeugpräferenzen</li>
                <li>Finanzierungsdaten (bei Finanzierungsanfrage)</li>
                <li>IP-Adresse und Browser-Informationen (technisch notwendig)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Zweck der Datenverarbeitung</h2>
              <p className="text-gray-700 mb-4">
                Ihre Daten werden zu folgenden Zwecken verarbeitet:
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Bearbeitung Ihrer Anfragen und Kontaktaufnahme</li>
                <li>Durchführung von Finanzierungsprüfungen</li>
                <li>Erfüllung vertraglicher Verpflichtungen</li>
                <li>Marketing (nur mit Ihrer Einwilligung)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Ihre Rechte</h2>
              <p className="text-gray-700 mb-4">
                Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Auskunft über gespeicherte Daten</li>
                <li>Berichtigung unrichtiger Daten</li>
                <li>Löschung Ihrer Daten</li>
                <li>Einschränkung der Verarbeitung</li>
                <li>Widerspruch gegen die Verarbeitung</li>
                <li>Datenübertragbarkeit</li>
                <li>Beschwerde bei einer Aufsichtsbehörde</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Kontakt</h2>
              <p className="text-gray-700">
                Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:
              </p>
              <p className="text-gray-700 mt-2">
                E-Mail: info@carcompany24-gmbh.de
              </p>
            </section>

            <p className="text-sm text-gray-500 mt-8">
              Stand: {new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
