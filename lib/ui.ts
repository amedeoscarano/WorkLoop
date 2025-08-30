export function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(' ')
}

// Opens an OAuth popup window and returns a promise that resolves
// when the popup posts a message back (or is closed).
export function openOAuthPopup(url: string, features = 'width=600,height=700'): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('No window'))
    const popup = window.open(url, 'oauth_popup', features)
    if (!popup) return reject(new Error('Popup blocked'))

    const onMessage = (ev: MessageEvent) => {
      // Accept any origin for demo purposes; lock this down in production
      const data: any = ev.data
      if (
        data &&
        data.type === 'oauth' &&
        (data.provider === 'google' || data.provider === 'linkedin')
      ) {
        window.removeEventListener('message', onMessage)
        try {
          popup.close()
        } catch {}
        resolve()
      }
    }
    window.addEventListener('message', onMessage)

    const timer = setInterval(() => {
      if (popup.closed) {
        clearInterval(timer)
        window.removeEventListener('message', onMessage)
        resolve()
      }
    }, 500)
  })
}
