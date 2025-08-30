Flow dettagliati

Onboarding (3 step)

1. Nickname → valida non vuoto
2. Fuso orario (default auto) → salva
3. Goal tipico → salva → /rooms

Join stanza

- Click RoomCard
- Se private e utente Free → Paywall → /billing
- Altrimenti /room/:id e subscribe realtime (stub)

Start timer

- Richiede goal → blocca se assente
- Broadcast session.started (stub)
- Timer sincronizzato; TICK → 0 → COMPLETE

Fine sessione

- Stato completed → modale feedback → streak/badge (stub)

Join next active room

- Cerca sessioni running e con capacità, ordina per startedAt desc

State machine
IDLE → SCHEDULED → RUNNING → BREAK → COMPLETED|ABORTED → REWARD
