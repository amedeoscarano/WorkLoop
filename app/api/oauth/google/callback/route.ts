import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  if (state === 'popup') {
    const html = `<!doctype html><html><body><script>
      document.cookie = 'google_connected=1; path=/; SameSite=Lax';
      if (window.opener) { window.opener.postMessage({ type: 'oauth', provider: 'google', status: 'connected' }, '*'); }
      window.close();
    </script><p>Google connected. You can close this window.</p></body></html>`
    return new Response(html, { headers: { 'Content-Type': 'text/html' } })
  }
  const redirect = '/settings?google=connected'
  const res = NextResponse.redirect(redirect)
  if (code) {
    res.cookies.set('google_connected', '1', { path: '/', httpOnly: false, sameSite: 'lax' })
  }
  return res
}
