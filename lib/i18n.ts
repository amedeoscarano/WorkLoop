type Dict = Record<string, string>

const it: Dict = {
  'cta.goToRooms': 'Vai alle stanze',
  'cta.login': 'Accedi',
  'rooms.filters.all': 'tutte',
  'rooms.filters.public': 'pubbliche',
  'rooms.filters.private': 'private',
  'rooms.joinNext': 'Entra nella prossima stanza attiva',
  'rooms.empty': 'Nessuna stanza attiva',
  'rooms.error': 'Impossibile caricare. Riprova',
  'room.goal.placeholder': 'Scrivi un goal per iniziare',
  'room.helper.goalRequired': 'Scrivi un goal per iniziare',
  'room.completed.title': 'Sessione completata',
  'login.title': 'Accedi',
  'login.email': 'Continua con Email',
  'login.google': 'Continua con Google',
  'schedule.title': 'Calendario',
  'billing.upgrade': 'Upgrade',
  'billing.benefit.private': 'Stanze private',
  'billing.benefit.video': 'Accesso video (fase 2)',
  'billing.benefit.support': 'Supporto prioritario',
}

export function t(key: keyof typeof it): string { return it[key] || key }

