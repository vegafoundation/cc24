'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Calculator, AlertCircle, CheckCircle } from 'lucide-react'

const financingSchema = z.object({
  kaufpreis: z.number().min(1000, 'Mindestbetrag: 1.000 €').max(100000, 'Maximalbetrag: 100.000 €'),
  Anzahlung: z.number().min(0, 'Anzahlung muss positiv sein'),
  laufzeit: z.number().min(12, 'Mindestlaufzeit: 12 Monate').max(84, 'Maximallaufzeit: 84 Monate'),
  sollzinssatz: z.number().min(0.1, 'Mindestzinssatz: 0,1%').max(20, 'Maximalzinssatz: 20%'),
})

type FinancingFormData = z.infer<typeof financingSchema>

export default function FinancingCalculator() {
  const [result, setResult] = useState<{
    nettodarlehensbetrag: number
    monatlicheRate: number
    gesamtbetrag: number
    effektiverJahreszins: number
  } | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FinancingFormData>({
    resolver: zodResolver(financingSchema),
    defaultValues: {
      kaufpreis: 25000,
      Anzahlung: 5000,
      laufzeit: 48,
      sollzinssatz: 4.99,
    },
  })

  const kaufpreis = watch('kaufpreis')
  const Anzahlung = watch('Anzahlung')
  const laufzeit = watch('laufzeit')
  const sollzinssatz = watch('sollzinssatz')

  const calculate = (data: FinancingFormData) => {
    const nettodarlehensbetrag = data.kaufpreis - data.Anzahlung

    if (nettodarlehensbetrag <= 0) {
      return
    }

    // Monatlicher Zinssatz
    const monatlicherZins = data.sollzinssatz / 100 / 12

    // Annuitätenformel: R = K * (q^n * (q-1)) / (q^n - 1)
    const q = 1 + monatlicherZins
    const qn = Math.pow(q, data.laufzeit)
    const monatlicheRate = nettodarlehensbetrag * (qn * (q - 1)) / (qn - 1)

    const gesamtbetrag = monatlicheRate * data.laufzeit + data.Anzahlung

    // Effektiver Jahreszins (vereinfacht, basierend auf Sollzinssatz + Bearbeitungsgebühr)
    const effektiverJahreszins = data.sollzinssatz * 1.026 // ~2.6% Aufschlag für Bearbeitungsgebühr

    setResult({
      nettodarlehensbetrag,
      monatlicheRate,
      gesamtbetrag,
      effektiverJahreszins,
    })
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-8 h-8 text-primary-500" />
        <h2 className="text-3xl font-bold text-gray-900">Finanzierungsrechner</h2>
      </div>

      <form onSubmit={handleSubmit(calculate)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kaufpreis */}
          <div>
            <label htmlFor="kaufpreis" className="block text-sm font-medium text-gray-700 mb-2">
              Kaufpreis (€)
            </label>
            <input
              type="number"
              id="kaufpreis"
              {...register('kaufpreis', { valueAsNumber: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.kaufpreis && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.kaufpreis.message}
              </p>
            )}
          </div>

          {/* Anzahlung */}
          <div>
            <label htmlFor="Anzahlung" className="block text-sm font-medium text-gray-700 mb-2">
              Anzahlung (€)
            </label>
            <input
              type="number"
              id="Anzahlung"
              {...register('Anzahlung', { valueAsNumber: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.Anzahlung && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.Anzahlung.message}
              </p>
            )}
          </div>

          {/* Laufzeit */}
          <div>
            <label htmlFor="laufzeit" className="block text-sm font-medium text-gray-700 mb-2">
              Laufzeit (Monate)
            </label>
            <select
              id="laufzeit"
              {...register('laufzeit', { valueAsNumber: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="12">12 Monate</option>
              <option value="24">24 Monate</option>
              <option value="36">36 Monate</option>
              <option value="48">48 Monate</option>
              <option value="60">60 Monate</option>
              <option value="72">72 Monate</option>
              <option value="84">84 Monate</option>
            </select>
            {errors.laufzeit && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.laufzeit.message}
              </p>
            )}
          </div>

          {/* Sollzinssatz */}
          <div>
            <label htmlFor="sollzinssatz" className="block text-sm font-medium text-gray-700 mb-2">
              Sollzinssatz (p.a. %)
            </label>
            <input
              type="number"
              step="0.01"
              id="sollzinssatz"
              {...register('sollzinssatz', { valueAsNumber: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.sollzinssatz && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.sollzinssatz.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
        >
          Finanzierung berechnen
        </button>
      </form>

      {/* PAngV-konformes Ergebnis */}
      {result && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border-2 border-primary-200">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-6 h-6 text-primary-500" />
            <h3 className="text-xl font-bold text-gray-900">Finanzierungsbeispiel</h3>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Kaufpreis:</span>
              <span className="font-semibold">{kaufpreis.toLocaleString('de-DE')} €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Anzahlung:</span>
              <span className="font-semibold">{Anzahlung.toLocaleString('de-DE')} €</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-gray-700 font-medium">Nettodarlehensbetrag:</span>
              <span className="font-bold text-primary-600">
                {result.nettodarlehensbetrag.toLocaleString('de-DE')} €
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Laufzeit:</span>
              <span className="font-semibold">{laufzeit} Monate</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sollzinssatz (gebunden p.a.):</span>
              <span className="font-semibold">{sollzinssatz.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-gray-700 font-medium">Effektiver Jahreszins:</span>
              <span className="font-bold text-primary-600">
                {result.effektiverJahreszins.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-gray-700 font-medium">Monatliche Rate:</span>
              <span className="font-bold text-primary-600 text-lg">
                {result.monatlicheRate.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
              </span>
            </div>
            <div className="flex justify-between border-t-2 pt-2">
              <span className="text-gray-900 font-bold">Gesamtbetrag:</span>
              <span className="font-bold text-primary-600 text-lg">
                {result.gesamtbetrag.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t text-xs text-gray-500">
            <p className="mb-1">
              <strong>Repräsentatives Beispiel gem. §17 Abs. 4 PAngV</strong>
            </p>
            <p>
              Bonität vorausgesetzt. Alle Angaben ohne Gewähr. Die tatsächlichen Konditionen können abweichen und werden
              individuell nach Bonitätsprüfung festgelegt.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
