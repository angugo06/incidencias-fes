// GET /api/catalogos — listas para los selectores del formulario.
import { Router } from 'express';
import { ESTADOS } from '../estados.js';

export function rutasCatalogos(pool) {
  const r = Router();

  r.get('/', async (req, res) => {
    const [ubicaciones, categorias, responsables] = await Promise.all([
      pool.query('SELECT id, nombre, tipo FROM ubicaciones WHERE activa ORDER BY nombre'),
      pool.query('SELECT id, clave, nombre FROM categorias ORDER BY nombre'),
      pool.query('SELECT id, nombre FROM responsables WHERE activo ORDER BY nombre'),
    ]);
    res.json({
      ubicaciones: ubicaciones.rows,
      categorias: categorias.rows,
      responsables: responsables.rows,
      estados: ESTADOS,
    });
  });

  return r;
}
