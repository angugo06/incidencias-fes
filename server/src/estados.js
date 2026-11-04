// Reglas del ciclo de vida. Fuente única de verdad de los estados.
//
//   nueva ──(asignar)──▶ asignada ──▶ en_proceso ──▶ resuelta
//
// nueva→asignada solo ocurre al asignar un responsable (ver rutas/incidencias.js);
// aquí van únicamente los cambios manuales de estado.

export const ESTADOS = ['nueva', 'asignada', 'en_proceso', 'resuelta'];

const CAMBIOS_MANUALES = {
  nueva: [],
  asignada: ['en_proceso'],
  en_proceso: ['resuelta'],
  resuelta: [],
};

// Estados a los que se puede pasar a mano desde "desde"
export const transicionesDesde = (desde) => CAMBIOS_MANUALES[desde] ?? [];

export const puedeTransitar = (desde, hacia) => transicionesDesde(desde).includes(hacia);

// Una incidencia admite (re)asignación solo antes de iniciar el trabajo
export const admiteAsignacion = (estado) => estado === 'nueva' || estado === 'asignada';
