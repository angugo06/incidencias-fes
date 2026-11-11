// Cliente HTTP de la API. Lanza ErrorApi con { codigo, detalles } cuando el servidor responde error.

export class ErrorApi extends Error {
  constructor(status, codigo, mensaje, detalles = {}) {
    super(mensaje);
    this.status = status;
    this.codigo = codigo;
    this.detalles = detalles; // { campo: mensaje }
  }
}

async function pedir(metodo, ruta, cuerpo) {
  let resp;
  try {
    resp = await fetch(`/api${ruta}`, {
      method: metodo,
      headers: cuerpo ? { 'Content-Type': 'application/json' } : undefined,
      body: cuerpo ? JSON.stringify(cuerpo) : undefined,
    });
  } catch {
    throw new ErrorApi(0, 'red', 'No se pudo conectar con el servidor');
  }
  const datos = await resp.json().catch(() => null);
  if (!resp.ok) {
    const e = datos?.error;
    throw new ErrorApi(resp.status, e?.codigo ?? 'error', e?.mensaje ?? 'Error inesperado', e?.detalles);
  }
  return datos;
}

export const api = {
  catalogos: () => pedir('GET', '/catalogos'),
  listar: () => pedir('GET', '/incidencias'),
  detalle: (id) => pedir('GET', `/incidencias/${id}`),
  registrar: (datos) => pedir('POST', '/incidencias', datos),
};
