'use client'
import { signIn } from 'next-auth/react'

export default function LoginPage() {
  return (
    <section className="max-w-md">
      <h2 className="text-xl font-semibold">Accedi</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Scegli un metodo per iniziare.
      </p>
      <div className="mt-4 space-y-2">
        <button
          onClick={() => {
            const email = prompt('Inserisci email')
            if (email)
              signIn('credentials', {
                email,
                name: email.split('@')[0],
                callbackUrl: '/onboarding',
              })
          }}
          className="w-full px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800"
        >
          Continua con Email
        </button>
        <button
          onClick={() => signIn('google', { callbackUrl: '/onboarding' })}
          className="w-full px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500"
        >
          Continua con Google
        </button>
      </div>
    </section>
  )
}
