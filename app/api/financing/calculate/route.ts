import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { kaufpreis, Anzahlung, laufzeit, sollzinssatz } = body

    // Validierung
    if (!kaufpreis || !Anzahlung || !laufzeit || !sollzinssatz) {
      return NextResponse.json(
        { error: 'Alle Felder sind erforderlich' },
        { status: 400 }
      )
    }

    const nettodarlehensbetrag = kaufpreis - Anzahlung

    if (nettodarlehensbetrag <= 0) {
      return NextResponse.json(
        { error: 'Anzahlung darf nicht größer als Kaufpreis sein' },
        { status: 400 }
      )
    }

    // Monatlicher Zinssatz
    const monatlicherZins = sollzinssatz / 100 / 12

    // Annuitätenformel
    const q = 1 + monatlicherZins
    const qn = Math.pow(q, laufzeit)
    const monatlicheRate = nettodarlehensbetrag * (qn * (q - 1)) / (qn - 1)

    const gesamtbetrag = monatlicheRate * laufzeit + Anzahlung

    // Effektiver Jahreszins (vereinfacht)
    const effektiverJahreszins = sollzinssatz * 1.026

    return NextResponse.json({
      nettodarlehensbetrag: Math.round(nettodarlehensbetrag * 100) / 100,
      monatlicheRate: Math.round(monatlicheRate * 100) / 100,
      gesamtbetrag: Math.round(gesamtbetrag * 100) / 100,
      effektiverJahreszins: Math.round(effektiverJahreszins * 100) / 100,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Fehler bei der Berechnung' },
      { status: 500 }
    )
  }
}
