// Errores de la API y su formato de respuesta único: { error: { codigo, mensaje, detalles } }.

export class ErrorApi extends Error {
  constructor(status, codigo, mensaje, detalles) {
    super(mensaje);
    this.status = status;
    this.codigo = codigo;
    this.detalles = detalles;
  }
}

// Atajos de uso común
export const noEncontrada = () => new ErrorApi(404, 'no_encontrada', 'Incidencia no encontrada');
export const conflicto = (codigo, mensaje) => new ErrorApi(409, codigo, mensaje);

// Middleware final: convierte cualquier error en JSON
// eslint-disable-next-line no-unused-vars
export function manejarErrores(err, req, res, next) {
  if (err instanceof ErrorApi) {
    return res
      .status(err.status)
      .json({ error: { codigo: err.codigo, mensaje: err.message, detalles: err.detalles } });
  }
  // JSON mal formado en el cuerpo
  if (err.type === 'entity.parse.failed') {
    return res
      .status(400)
      .json({ error: { codigo: 'json_invalido', mensaje: 'El cuerpo no es JSON válido' } });
  }
  console.error(err);
  res.status(500).json({ error: { codigo: 'error_interno', mensaje: 'Error interno del servidor' } });
}
