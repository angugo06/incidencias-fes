// Reglas del ciclo de vida. Fuente única de verdad de los estados.

export const ESTADOS = ['nueva', 'asignada', 'en_proceso', 'resuelta'];

// Una incidencia admite (re)asignación solo antes de iniciar el trabajo
export const admiteAsignacion = (estado) => estado === 'nueva' || estado === 'asignada';
