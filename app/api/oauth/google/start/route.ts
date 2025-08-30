import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function GET(request: Request) {
  const urlIn = new URL(request.url)
  const popup = urlIn.searchParams.get('popup') === '1'
  const h = headers()
  const host = h.get('x-forwarded-host') || h.get('host')
  const proto = h.get('x-forwarded-proto') || 'https'
  const base = `${proto}://${host}`
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  if (!clientId) {
    return NextResponse.redirect(`${base}/settings?google=missing_client_id`)
  }
  const redirectUri = `${base}/api/oauth/google/callback`
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: 'openid email profile https://www.googleapis.com/auth/calendar.readonly',
    access_type: 'offline',
    include_granted_scopes: 'true',
    prompt: 'consent',
    state: popup ? 'popup' : 'normal'
  })
  const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  return NextResponse.redirect(url)
}
