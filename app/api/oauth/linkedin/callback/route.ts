import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const res = NextResponse.redirect('/onboarding?linkedin=connected')
  if (code) {
    res.cookies.set('linkedin_connected', '1', { path: '/', httpOnly: false, sameSite: 'lax' })
  }
  return res
}

