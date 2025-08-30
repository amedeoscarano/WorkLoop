/* eslint-disable @next/next/no-page-custom-font */
import './globals.css'
import React from 'react'
import type { Metadata } from 'next'
import { Providers, PwaProvider } from './providers'
import Link from 'next/link'
import { InstallPrompt } from './(pwa)/installPrompt'
import { OfflineBanner } from './OfflineBanner'

export const metadata: Metadata = {
  title: 'Workloop',
  description: 'Coworking digitale con sessioni 25/50 e obiettivi chiari.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 font-[Inter,ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,'Apple Color Emoji','Segoe UI Emoji']">
        {/* PWA: Register service worker */}
        <PwaProvider />
        <OfflineBanner />
        <header className="border-b border-slate-200 dark:border-slate-800">
          <nav className="w-full px-6 md:px-12 py-3 flex items-center justify-between">
            <Link className="font-semibold" href="/">
              Workloop
            </Link>
            <div className="flex items-center gap-3 text-sm">
              <Link className="hover:underline" href="/rooms">
                Stanze
              </Link>
              <Link className="hover:underline" href="/settings">
                Impostazioni
              </Link>
              <Link className="hover:underline" href="/billing">
                Abbonamento
              </Link>
              <Link className="hover:underline" href="/login">
                Login
              </Link>
            </div>
          </nav>
        </header>
        <Providers>
          <main role="main" className="w-full px-6 md:px-12 py-6">
            {children}
          </main>
          <footer className="w-full px-6 md:px-12 py-8 text-sm text-slate-500">
            <div className="flex items-center justify-between">
              <p>© {new Date().getFullYear()} Workloop</p>
              <div className="space-x-4">
                <Link className="hover:underline" href="/legal/privacy">
                  Privacy
                </Link>
                <Link className="hover:underline" href="/legal/terms">
                  Termini
                </Link>
              </div>
            </div>
          </footer>
        </Providers>
        <InstallPrompt />
      </body>
    </html>
  )
}
