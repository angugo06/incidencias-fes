// Rutas de /api/incidencias: registrar, listar, detalle, asignar, cambiar estado.
import { Router } from 'express';
import { ErrorApi, noEncontrada, conflicto } from '../errores.js';
import { ESTADOS, puedeTransitar, transicionesDesde, admiteAsignacion } from '../estados.js';
import {
  hoy, validarId, validarNuevaIncidencia,
  validarAsignacion, validarCambioEstado,
} from '../validacion.js';

const LIMITE_LISTA = 200;

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

// Id de la URL -> número, o 400
function leerId(req) {
  const id = validarId(req.params.id);
  if (!id) throw new ErrorApi(400, 'id_invalido', 'El id debe ser un entero positivo');
  return id;
}

function exigirValido({ valor, errores }) {
  if (Object.keys(errores).length) throw new ErrorApi(400, 'validacion', 'Datos inválidos', errores);
  return valor;
}

// Incidencia + línea de tiempo + transiciones permitidas (o null si no existe)
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
    transiciones_permitidas: transicionesDesde(inc.estado), // cambios manuales de estado
    puede_asignar: admiteAsignacion(inc.estado),
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

// Bloquea la fila para evitar cambios concurrentes
async function bloquear(client, id) {
  const { rows } = await client.query(
    'SELECT id, estado, responsable_id FROM incidencias WHERE id = $1 FOR UPDATE',
    [id],
  );
  if (!rows.length) throw noEncontrada();
  return rows[0];
}

export function rutasIncidencias(pool, { zonaHoraria }) {
  const r = Router();

  // Listar de la más reciente a la más antigua
  r.get('/', async (req, res) => {
    const sql = `${SELECT_BASE} ORDER BY i.creada_en DESC, i.id DESC LIMIT ${LIMITE_LISTA}`;
    const { rows } = await pool.query(sql);
    res.json({ total: rows.length, datos: rows });
  });

  // Registrar
  r.post('/', async (req, res) => {
    const d = exigirValido(validarNuevaIncidencia(req.body, hoy(zonaHoraria)));
    // El catálogo debe existir y la ubicación estar activa
    const [u, c] = await Promise.all([
      pool.query('SELECT 1 FROM ubicaciones WHERE id = $1 AND activa', [d.ubicacion_id]),
      pool.query('SELECT 1 FROM categorias WHERE id = $1', [d.categoria_id]),
    ]);
    const detalles = {};
    if (!u.rowCount) detalles.ubicacion_id = 'La ubicación no existe o está inactiva';
    if (!c.rowCount) detalles.categoria_id = 'La categoría no existe';
    if (Object.keys(detalles).length) throw new ErrorApi(422, 'catalogo_invalido', 'Catálogo inválido', detalles);

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

  // Detalle + seguimiento
  r.get('/:id', async (req, res) => {
    const det = await obtenerDetalle(pool, leerId(req));
    if (!det) throw noEncontrada();
    res.json(det);
  });

  // Asignar (o reasignar) responsable
  r.patch('/:id/asignacion', async (req, res) => {
    const id = leerId(req);
    const { responsable_id } = exigirValido(validarAsignacion(req.body));
    await enTransaccion(pool, async (client) => {
      const actual = await bloquear(client, id);
      if (!admiteAsignacion(actual.estado))
        throw conflicto('estado_no_asignable', 'Solo se asigna una incidencia nueva o asignada');
      if (actual.responsable_id === responsable_id)
        throw conflicto('sin_cambios', 'La incidencia ya está asignada a esa persona');
      const resp = await client.query('SELECT nombre FROM responsables WHERE id = $1 AND activo', [responsable_id]);
      if (!resp.rowCount)
        throw new ErrorApi(422, 'catalogo_invalido', 'Catálogo inválido', {
          responsable_id: 'El responsable no existe o está inactivo',
        });
      await client.query(
        `UPDATE incidencias SET estado = 'asignada', responsable_id = $2, actualizada_en = now() WHERE id = $1`,
        [id, responsable_id],
      );
      await client.query(
        `INSERT INTO seguimiento (incidencia_id, tipo, estado_anterior, estado_nuevo, responsable_id, texto)
         VALUES ($1,'asignacion',$2,'asignada',$3,$4)`,
        [id, actual.estado, responsable_id, `Asignada a ${resp.rows[0].nombre}`],
      );
    });
    res.json(await obtenerDetalle(pool, id));
  });

  // Cambiar estado (solo transiciones permitidas)
  r.patch('/:id/estado', async (req, res) => {
    const id = leerId(req);
    const { estado, comentario } = exigirValido(validarCambioEstado(req.body, ESTADOS));
    await enTransaccion(pool, async (client) => {
      const actual = await bloquear(client, id);
      if (!puedeTransitar(actual.estado, estado))
        throw conflicto(
          'transicion_invalida',
          estado === 'asignada'
            ? 'Para asignar usa la asignación de responsable'
            : `No se puede pasar de «${actual.estado}» a «${estado}»`,
        );
      await client.query('UPDATE incidencias SET estado = $2, actualizada_en = now() WHERE id = $1', [id, estado]);
      await client.query(
        `INSERT INTO seguimiento (incidencia_id, tipo, estado_anterior, estado_nuevo, texto)
         VALUES ($1,'estado',$2,$3,$4)`,
        [id, actual.estado, estado, comentario],
      );
    });
    res.json(await obtenerDetalle(pool, id));
  });

  return r;
}
