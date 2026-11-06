// Etiquetas y formato de fechas para mostrar datos.

export const ETIQUETA_ESTADO = {
  nueva: 'Nueva',
  asignada: 'Asignada',
  en_proceso: 'En proceso',
  resuelta: 'Resuelta',
};

// "2026-11-04" o ISO -> "04/11/2026" (sin desfase de zona para fechas puras)
export function fechaCorta(valor) {
  if (!valor) return '';
  const solo = String(valor).slice(0, 10);
  const [a, m, d] = solo.split('-');
  return `${d}/${m}/${a}`;
}

// Fecha de hoy local en formato AAAA-MM-DD (para el input date)
export function hoyLocal(ahora = new Date()) {
  const p = (n) => String(n).padStart(2, '0');
  return `${ahora.getFullYear()}-${p(ahora.getMonth() + 1)}-${p(ahora.getDate())}`;
}

export function resumir(texto, max = 80) {
  return texto.length > max ? `${texto.slice(0, max - 1)}…` : texto;
}
