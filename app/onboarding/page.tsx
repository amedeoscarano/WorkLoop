'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function OnboardingPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const nameFromGoogle = (session?.user?.name || '').trim()
  const [nome, setNome] = React.useState(nameFromGoogle.split(' ')[0] || '')
  const [cognome, setCognome] = React.useState(nameFromGoogle.split(' ').slice(1).join(' ') || '')
  const [posizione, setPosizione] = React.useState('')
  const [motivo, setMotivo] = React.useState('')
  const startStep = nameFromGoogle ? 2 : 1
  const [step, setStep] = React.useState(startStep)

  function next() {
    setStep((s) => Math.min(3, s + 1))
  }
  function prev() {
    setStep((s) => Math.max(1, s - 1))
  }
  function finish() {
    router.push('/rooms')
  }

  return (
    <section className="max-w-xl mx-auto">
      <h2 className="text-xl font-semibold">Onboarding</h2>
      {/* Onboarding steps: Email path (Name/Surname) or Google path (skip step 1) */}
      <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
        {step === 1 && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm">Nome</label>
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded-lg border"
                placeholder="Es. Amedeo"
              />
            </div>
            <div>
              <label className="block text-sm">Cognome</label>
              <input
                value={cognome}
                onChange={(e) => setCognome(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded-lg border"
                placeholder="Es. Rossi"
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="w-full px-3 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
                disabled={!nome.trim() || !cognome.trim()}
                onClick={next}
              >
                Continua
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <label className="block text-sm">Posizione lavorativa</label>
            <select
              value={posizione}
              onChange={(e) => setPosizione(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-lg border"
            >
              <option value="">Seleziona…</option>
              <option>Studente</option>
              <option>Freelancer</option>
              <option>Dipendente</option>
              <option>Manager</option>
              <option>Founder</option>
            </select>
            <div className="mt-4 flex justify-between gap-2">
              {startStep === 1 && (
                <button className="px-3 py-2 rounded-lg border" onClick={prev}>
                  Indietro
                </button>
              )}
              <button
                className="px-3 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
                disabled={!posizione}
                onClick={next}
              >
                Continua
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <label className="block text-sm">Motivo per entrare</label>
            <select
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-lg border"
            >
              <option value="">Seleziona…</option>
              <option>Neurodivergenza</option>
              <option>Lavoro</option>
              <option>Buddy</option>
              <option>Mentor</option>
              <option>Formazione</option>
              <option>Pausa con amici</option>
            </select>
            <div className="mt-4 flex justify-between gap-2">
              <button className="px-3 py-2 rounded-lg border" onClick={prev}>
                Indietro
              </button>
              <button
                className="px-3 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
                disabled={!motivo}
                onClick={finish}
              >
                Finisci e vai alle stanze
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
