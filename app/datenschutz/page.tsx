import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | CarCompany24',
  description: 'Datenschutzerklärung gemäß DSGVO',
}

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-display font-bold mb-8 bg-gradient-to-r from-vega-cyan to-vega-emerald bg-clip-text text-transparent">
          Datenschutzerklärung
        </h1>
        
        <div className="bg-gray-800 rounded-lg p-8 space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Datenschutz auf einen Blick</h2>
            <h3 className="text-xl font-semibold text-white mb-2 mt-4">Allgemeine Hinweise</h3>
            <p className="mb-4">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, 
              wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Verantwortliche Stelle</h2>
            <p className="mb-2">
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
            </p>
            <p className="mb-4">
              <strong>CarCompany24 GmbH</strong><br />
              Musterstraße 123<br />
              12345 Musterstadt<br />
              E-Mail: info@carcompany24.de<br />
              Telefon: +49 (0) XXX XXX XXX
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Datenerfassung auf dieser Website</h2>
            <h3 className="text-xl font-semibold text-white mb-2 mt-4">Kontaktformular</h3>
            <p className="mb-4">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular 
              inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von 
              Anschlussfragen bei uns gespeichert.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Ihre Rechte</h2>
            <p className="mb-2">Sie haben jederzeit das Recht:</p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li>Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu erhalten</li>
              <li>Berichtigung unrichtiger Daten zu verlangen</li>
              <li>Löschung Ihrer bei uns gespeicherten Daten zu verlangen</li>
              <li>Einschränkung der Datenverarbeitung zu verlangen</li>
              <li>Widerspruch gegen die Verarbeitung Ihrer Daten einzulegen</li>
              <li>Datenübertragbarkeit zu verlangen</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
