import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const redirect = url.searchParams.get('state') === 'from_onboarding' ? '/onboarding?google=connected' : '/settings?google=connected'
  const res = NextResponse.redirect(redirect)
  if (code) {
    res.cookies.set('google_connected', '1', { path: '/', httpOnly: false, sameSite: 'lax' })
  }
  return res
}

