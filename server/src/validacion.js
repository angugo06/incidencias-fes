// Validación de entrada. Cada función devuelve { valor, errores }.
// "errores" es un objeto { campo: mensaje }; vacío = válido.

export const DESCRIPCION_MIN = 10;
export const DESCRIPCION_MAX = 1000;
export const COMENTARIO_MAX = 500;

const esEnteroPositivo = (v) => Number.isInteger(v) && v > 0;

// Fecha de hoy (YYYY-MM-DD) en la zona horaria dada
export function hoy(zona = 'America/Mexico_City', ahora = new Date()) {
  return ahora.toLocaleDateString('en-CA', { timeZone: zona });
}

// ¿Es una fecha real con formato YYYY-MM-DD?
export function esFechaValida(texto) {
  if (typeof texto !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(texto)) return false;
  const d = new Date(`${texto}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === texto;
}

export function validarId(texto) {
  return /^\d+$/.test(texto) && Number(texto) > 0 ? Number(texto) : null;
}

export function validarNuevaIncidencia(body = {}, fechaHoy = hoy()) {
  const errores = {};
  const { ubicacion_id, categoria_id, fecha_incidencia } = body;
  const descripcion = typeof body.descripcion === 'string' ? body.descripcion.trim() : '';

  if (!esEnteroPositivo(ubicacion_id)) errores.ubicacion_id = 'Elige una ubicación';
  if (!esEnteroPositivo(categoria_id)) errores.categoria_id = 'Elige una categoría';

  if (descripcion.length < DESCRIPCION_MIN)
    errores.descripcion = `La descripción necesita al menos ${DESCRIPCION_MIN} caracteres`;
  else if (descripcion.length > DESCRIPCION_MAX)
    errores.descripcion = `La descripción admite máximo ${DESCRIPCION_MAX} caracteres`;

  if (!esFechaValida(fecha_incidencia)) errores.fecha_incidencia = 'Indica una fecha válida (AAAA-MM-DD)';
  else if (fecha_incidencia > fechaHoy) errores.fecha_incidencia = 'La fecha no puede ser futura';

  return { valor: { ubicacion_id, categoria_id, descripcion, fecha_incidencia }, errores };
}

export function validarAsignacion(body = {}) {
  const errores = {};
  if (!esEnteroPositivo(body.responsable_id)) errores.responsable_id = 'Elige un responsable';
  return { valor: { responsable_id: body.responsable_id }, errores };
}

export function validarCambioEstado(body = {}, estadosValidos) {
  const errores = {};
  if (!estadosValidos.includes(body.estado)) errores.estado = 'Estado no válido';
  const comentario = typeof body.comentario === 'string' ? body.comentario.trim() : '';
  if (comentario.length > COMENTARIO_MAX) errores.comentario = `Máximo ${COMENTARIO_MAX} caracteres`;
  return { valor: { estado: body.estado, comentario: comentario || null }, errores };
}
