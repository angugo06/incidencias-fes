// Pruebas de integración de la API contra una BD PostgreSQL real (TEST_DATABASE_URL).
import test, { before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { config } from '../src/config.js';
import { crearPool } from '../src/db.js';
import { crearApp } from '../src/app.js';
import { reiniciarBD } from '../src/bd/reiniciar.js';
import { hoy } from '../src/validacion.js';

const pool = crearPool(config.testDatabaseUrl);
const app = crearApp(pool, { zonaHoraria: config.zonaHoraria });
const api = () => request(app);

const nueva = (extra = {}) => ({
  ubicacion_id: 1,
  categoria_id: 2,
  descripcion: 'El HDMI del salón no funciona',
  fecha_incidencia: hoy(config.zonaHoraria),
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

test('POST rechaza datos incompletos con detalle por campo (400)', async () => {
  const { body } = await api().post('/api/incidencias').send({ descripcion: 'corta' }).expect(400);
  assert.equal(body.error.codigo, 'validacion');
  assert.ok(body.error.detalles.ubicacion_id);
  assert.ok(body.error.detalles.descripcion);
});

test('POST rechaza fecha futura', async () => {
  const { body } = await api().post('/api/incidencias').send(nueva({ fecha_incidencia: '2999-01-01' })).expect(400);
  assert.ok(body.error.detalles.fecha_incidencia);
});

test('POST rechaza ubicación o categoría inexistente (422)', async () => {
  const { body } = await api().post('/api/incidencias').send(nueva({ ubicacion_id: 999, categoria_id: 999 })).expect(422);
  assert.equal(body.error.codigo, 'catalogo_invalido');
  assert.ok(body.error.detalles.ubicacion_id && body.error.detalles.categoria_id);
});

test('POST rechaza ubicación inactiva', async () => {
  await pool.query('UPDATE ubicaciones SET activa = false WHERE id = 1');
  await api().post('/api/incidencias').send(nueva()).expect(422);
});

test('POST con JSON roto devuelve 400', async () => {
  const { body } = await api().post('/api/incidencias').set('Content-Type', 'application/json').send('{mal').expect(400);
  assert.equal(body.error.codigo, 'json_invalido');
});

// ---- Listar y filtrar (HU-04/09)
test('GET lista de la más reciente a la más antigua', async () => {
  const a = await crear();
  const b = await crear();
  const { body } = await api().get('/api/incidencias').expect(200);
  assert.equal(body.total, 2);
  assert.deepEqual(body.datos.map((i) => i.folio), [b.folio, a.folio]);
  assert.ok(body.datos[0].ubicacion && body.datos[0].categoria);
});

// ---- Detalle (HU-05)
test('GET detalle incluye seguimiento', async () => {
  const a = await crear();
  const { body } = await api().get(`/api/incidencias/${a.id}`).expect(200);
  assert.equal(body.folio, a.folio);
  assert.ok(Array.isArray(body.seguimiento));
});

test('GET detalle: 404 si no existe y 400 si el id no es válido', async () => {
  await api().get('/api/incidencias/999').expect(404);
  await api().get('/api/incidencias/abc').expect(400);
});

test('ruta /api desconocida devuelve 404 JSON', async () => {
  const { body } = await api().get('/api/nada').expect(404);
  assert.equal(body.error.codigo, 'ruta_no_encontrada');
});

test('la BD impide estado asignada sin responsable', async () => {
  const a = await crear();
  await assert.rejects(pool.query("UPDATE incidencias SET estado = 'asignada' WHERE id = $1", [a.id]));
});
