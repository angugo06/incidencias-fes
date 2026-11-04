// Borra y recrea el esquema, luego carga seed (y opcionalmente demo).
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const leer = (nombre) => fs.readFile(fileURLToPath(new URL(`../../../db/${nombre}`, import.meta.url)), 'utf8');

export async function reiniciarBD(pool, { demo = false } = {}) {
  await pool.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');
  await pool.query(await leer('schema.sql'));
  await pool.query(await leer('seed.sql'));
  if (demo) await pool.query(await leer('seed_demo.sql'));
}
