// Sample data from the Nible Mobile prototype (Barbería Central).

export const ST = {
  confirmed: { label: 'Confirmada', bg: '#E4EAFB', fg: '#25409C', accent: '#3E62D8' },
  pending: { label: 'Pendiente', bg: '#FBF0D5', fg: '#E0A21A', accent: '#E0A21A' },
  done: { label: 'Completada', bg: '#E3F4EB', fg: '#2FA36B', accent: '#2FA36B' },
} as const;

export const TODAY = [
  { time: '09:00', client: 'Rodrigo Vaca', service: 'Corte + barba', dur: '45 min', price: '60', st: 'done' },
  { time: '10:30', client: 'Camila Mendoza', service: 'Corte clásico', dur: '30 min', price: '45', st: 'confirmed' },
  { time: '11:15', client: 'Diego Paz', service: 'Perfilado de barba', dur: '20 min', price: '30', st: 'pending' },
  { time: '15:00', client: 'Sergio Landívar', service: 'Corte + barba', dur: '45 min', price: '60', st: 'confirmed' },
] as const;

export const SERVICES = [
  { id: 's1', icon: 'scissor', name: 'Corte clásico', dur: '30 min', price: '45' },
  { id: 's2', icon: 'scissor', name: 'Corte + barba', dur: '45 min', price: '60' },
  { id: 's3', icon: 'magic-star', name: 'Perfilado de barba', dur: '20 min', price: '30' },
  { id: 's4', icon: 'flash', name: 'Corte niño', dur: '25 min', price: '35' },
];

export const DAYS = [
  { weekday: 'lun', day: 12, free: true }, { weekday: 'mar', day: 13, free: true },
  { weekday: 'mié', day: 14, free: true }, { weekday: 'jue', day: 15, free: false },
  { weekday: 'vie', day: 16, free: true }, { weekday: 'sáb', day: 17, free: true },
];

export const SLOTS = ['09:00', '09:45', '10:30', '11:15', '12:00', '15:00', '15:45', '16:30', '17:15'];
export const TAKEN = ['12:00', '15:45'];
