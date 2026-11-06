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

const nueva = (extra = {}) => ({
  ubicacion_id: 1,
  categoria_id: 2,
  descripcion: 'El HDMI del salón no funciona',
  fecha_incidencia: new Date().toLocaleDateString('en-CA', { timeZone: config.zonaHoraria }),
  ...extra,
});
const crear = async (extra) => (await api().post('/api/incidencias').send(nueva(extra))).body;

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

// ---- Registrar (HU-02/03)
test('POST registra: folio, estado nueva y primer evento', async () => {
  const { body } = await api().post('/api/incidencias').send(nueva()).expect(201);
  assert.match(body.folio, /^INC-\d{4}-0001$/);
  assert.equal(body.estado, 'nueva');
  assert.equal(body.responsable, null);
  assert.equal(body.seguimiento.length, 1);
  assert.equal(body.seguimiento[0].tipo, 'registro');
});

test('los folios son consecutivos', async () => {
  const a = await crear();
  const b = await crear();
  assert.match(a.folio, /-0001$/);
  assert.match(b.folio, /-0002$/);
});

test('POST con JSON roto devuelve 400', async () => {
  const { body } = await api().post('/api/incidencias').set('Content-Type', 'application/json').send('{mal').expect(400);
  assert.equal(body.error.codigo, 'json_invalido');
});

test('ruta /api desconocida devuelve 404 JSON', async () => {
  const { body } = await api().get('/api/nada').expect(404);
  assert.equal(body.error.codigo, 'ruta_no_encontrada');
});

test('la BD impide estado asignada sin responsable', async () => {
  const a = await crear();
  await assert.rejects(pool.query("UPDATE incidencias SET estado = 'asignada' WHERE id = $1", [a.id]));
});
