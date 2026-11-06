// Pruebas de integración de la API contra una BD PostgreSQL real (TEST_DATABASE_URL).
import test, { before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { config } from '../src/config.js';
import { crearPool } from '../src/db.js';
import { crearApp } from '../src/app.js';
import { reiniciarBD } from '../src/bd/reiniciar.js';

const pool = crearPool(config.testDatabaseUrl);
const app = crearApp(pool, { zonaHoraria: config.zonaHoraria });
const api = () => request(app);

before(() => reiniciarBD(pool));
beforeEach(() => reiniciarBD(pool)); // BD limpia en cada prueba
after(() => pool.end());

test('GET /api/catalogos devuelve listas y estados', async () => {
  const { body } = await api().get('/api/catalogos').expect(200);
  assert.ok(body.ubicaciones.length >= 8);
  assert.deepEqual(body.categorias.map((c) => c.clave).sort(), ['audiovisual', 'electrica', 'limpieza', 'mobiliario', 'otra']);
  assert.ok(body.responsables.length >= 3);
  assert.deepEqual(body.estados, ['nueva', 'asignada', 'en_proceso', 'resuelta']);
});
