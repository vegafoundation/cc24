import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware für Domain-spezifische Konfiguration
 * Unterstützt CC24.ONLINE und CC24.VIP
 */
export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const url = request.nextUrl.clone()

  // Domain-spezifische Redirects (optional)
  // if (hostname.includes('www.')) {
  //   url.hostname = hostname.replace('www.', '')
  //   return NextResponse.redirect(url)
  // }

  // Domain-spezifische Headers
  const response = NextResponse.next()
  
  // Setze Domain-Header für Client-seitige Erkennung
  if (hostname.includes('cc24.online')) {
    response.headers.set('x-domain', 'online')
  } else if (hostname.includes('cc24.vip')) {
    response.headers.set('x-domain', 'vip')
  } else {
    response.headers.set('x-domain', 'local')
  }

  // Security Headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // CSP Header (Content Security Policy)
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
  )

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
