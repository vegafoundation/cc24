import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, privacyAccepted, marketingAccepted } = body

    // Validierung
    if (!name || !email || !message || !privacyAccepted) {
      return NextResponse.json(
        { error: 'Alle Pflichtfelder müssen ausgefüllt sein' },
        { status: 400 }
      )
    }

    // TODO: E-Mail versenden oder in Datenbank speichern
    // Beispiel: await sendEmail({ name, email, phone, message })

    // Logging für Debugging
    console.log('Contact form submission:', {
      name,
      email,
      phone,
      messageLength: message.length,
      privacyAccepted,
      marketingAccepted,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: 'Nachricht erfolgreich gesendet',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Fehler beim Senden der Nachricht' },
      { status: 500 }
    )
  }
}
