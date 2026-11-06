// Uso: npm run db:init            (esquema + catálogos)
//      npm run db:init -- --demo  (además, incidencias de ejemplo)
// OJO: borra todo el esquema public de la BD en DATABASE_URL.
import { config } from '../src/config.js';
import { crearPool } from '../src/db.js';
import { reiniciarBD } from '../src/bd/reiniciar.js';

const pool = crearPool(config.databaseUrl);
const demo = process.argv.includes('--demo');
try {
  await reiniciarBD(pool, { demo });
  console.log(`BD lista${demo ? ' (con datos de demostración)' : ''}.`);
} catch (e) {
  console.error('No se pudo inicializar la BD:', e.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
