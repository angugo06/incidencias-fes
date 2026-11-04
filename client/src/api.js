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

// Convierte {estado, categoria} en query string, omitiendo vacíos
const qs = (filtros = {}) => {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(filtros)) if (v) p.set(k, v);
  const s = p.toString();
  return s ? `?${s}` : '';
};

export const api = {
  catalogos: () => pedir('GET', '/catalogos'),
  listar: (filtros) => pedir('GET', `/incidencias${qs(filtros)}`),
  detalle: (id) => pedir('GET', `/incidencias/${id}`),
  registrar: (datos) => pedir('POST', '/incidencias', datos),
  asignar: (id, responsable_id) => pedir('PATCH', `/incidencias/${id}/asignacion`, { responsable_id }),
  cambiarEstado: (id, estado, comentario) =>
    pedir('PATCH', `/incidencias/${id}/estado`, { estado, comentario }),
  comentar: (id, texto) => pedir('POST', `/incidencias/${id}/comentarios`, { texto }),
};
