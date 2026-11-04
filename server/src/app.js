// Construye la app Express. Recibe el pool para poder probarla con otra BD.
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { rutasCatalogos } from './rutas/catalogos.js';
import { rutasIncidencias } from './rutas/incidencias.js';
import { manejarErrores, ErrorApi } from './errores.js';

const CLIENT_DIST = fileURLToPath(new URL('../../client/dist', import.meta.url));

export function crearApp(pool, opciones = { zonaHoraria: 'America/Mexico_City' }) {
  const app = express();
  app.use(express.json({ limit: '50kb' }));

  app.get('/api/salud', async (req, res) => {
    await pool.query('SELECT 1');
    res.json({ ok: true });
  });
  app.use('/api/catalogos', rutasCatalogos(pool));
  app.use('/api/incidencias', rutasIncidencias(pool, opciones));
  // Rutas /api desconocidas -> 404 JSON
  app.use('/api', (req, res, next) => next(new ErrorApi(404, 'ruta_no_encontrada', 'Ruta no encontrada')));

  // Producción: sirve el cliente compilado (npm run build) si existe
  if (fs.existsSync(CLIENT_DIST)) {
    app.use(express.static(CLIENT_DIST));
    app.get('/{*ruta}', (req, res) => res.sendFile(path.join(CLIENT_DIST, 'index.html')));
  }

  app.use(manejarErrores);
  return app;
}
