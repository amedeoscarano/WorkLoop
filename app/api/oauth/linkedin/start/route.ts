import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function GET() {
  const h = headers()
  const host = h.get('x-forwarded-host') || h.get('host')
  const proto = h.get('x-forwarded-proto') || 'https'
  const base = `${proto}://${host}`
  const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID
  if (!clientId) {
    return NextResponse.redirect(`${base}/login?linkedin=missing_client_id`)
  }
  const redirectUri = `${base}/api/oauth/linkedin/callback`
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'r_liteprofile r_emailaddress',
    state: 'wl_demo'
  })
  const url = `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`
  return NextResponse.redirect(url)
}

