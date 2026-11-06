// Rutas de /api/incidencias: registrar.
import { Router } from 'express';

// Columnas comunes de listado y detalle
const SELECT_BASE = `
  SELECT i.id, i.folio, i.descripcion, i.estado, i.fecha_incidencia, i.creada_en, i.actualizada_en,
         u.id AS ubicacion_id, u.nombre AS ubicacion,
         c.id AS categoria_id, c.clave AS categoria_clave, c.nombre AS categoria,
         r.id AS responsable_id, r.nombre AS responsable
    FROM incidencias i
    JOIN ubicaciones u ON u.id = i.ubicacion_id
    JOIN categorias  c ON c.id = i.categoria_id
    LEFT JOIN responsables r ON r.id = i.responsable_id`;

// Incidencia + línea de tiempo (o null si no existe)
async function obtenerDetalle(db, id) {
  const { rows } = await db.query(`${SELECT_BASE} WHERE i.id = $1`, [id]);
  if (!rows.length) return null;
  const seg = await db.query(
    `SELECT s.id, s.tipo, s.estado_anterior, s.estado_nuevo, s.texto, s.creado_en,
            r.nombre AS responsable
       FROM seguimiento s LEFT JOIN responsables r ON r.id = s.responsable_id
      WHERE s.incidencia_id = $1 ORDER BY s.creado_en, s.id`,
    [id],
  );
  const inc = rows[0];
  return {
    ...inc,
    seguimiento: seg.rows,
  };
}

// Ejecuta fn dentro de una transacción
async function enTransaccion(pool, fn) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const out = await fn(client);
    await client.query('COMMIT');
    return out;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

export function rutasIncidencias(pool, { zonaHoraria }) {
  const r = Router();

  // Registrar
  r.post('/', async (req, res) => {
    const d = req.body;
    const id = await enTransaccion(pool, async (client) => {
      const ins = await client.query(
        `INSERT INTO incidencias (ubicacion_id, categoria_id, descripcion, fecha_incidencia)
         VALUES ($1,$2,$3,$4) RETURNING id`,
        [d.ubicacion_id, d.categoria_id, d.descripcion, d.fecha_incidencia],
      );
      await client.query(
        `INSERT INTO seguimiento (incidencia_id, tipo, estado_nuevo, texto)
         VALUES ($1,'registro','nueva','Incidencia registrada')`,
        [ins.rows[0].id],
      );
      return ins.rows[0].id;
    });
    res.status(201).json(await obtenerDetalle(pool, id));
  });

  return r;
}
