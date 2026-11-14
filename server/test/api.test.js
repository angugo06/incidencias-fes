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

test('filtros por estado y por categoría, solos y combinados', async () => {
  const a = await crear({ categoria_id: 1 }); // electrica
  await crear({ categoria_id: 2 }); // audiovisual
  await api().patch(`/api/incidencias/${a.id}/asignacion`).send({ responsable_id: 1 }).expect(200);

  const porEstado = (await api().get('/api/incidencias?estado=asignada').expect(200)).body;
  assert.equal(porEstado.total, 1);
  const porCat = (await api().get('/api/incidencias?categoria=audiovisual').expect(200)).body;
  assert.equal(porCat.total, 1);
  assert.equal(porCat.datos[0].estado, 'nueva');
  const combo = (await api().get('/api/incidencias?estado=nueva&categoria=electrica').expect(200)).body;
  assert.equal(combo.total, 0);
  const vacio = (await api().get('/api/incidencias?estado=&categoria=').expect(200)).body;
  assert.equal(vacio.total, 2);
});

test('filtros inválidos devuelven 400', async () => {
  await api().get('/api/incidencias?estado=cualquiera').expect(400);
  await api().get('/api/incidencias?categoria=a;b').expect(400);
});

// ---- Detalle (HU-05)
test('GET detalle incluye seguimiento y transiciones', async () => {
  const a = await crear();
  const { body } = await api().get(`/api/incidencias/${a.id}`).expect(200);
  assert.equal(body.folio, a.folio);
  assert.deepEqual(body.transiciones_permitidas, []);
  assert.ok(Array.isArray(body.seguimiento));
});

test('GET detalle: 404 si no existe y 400 si el id no es válido', async () => {
  await api().get('/api/incidencias/999').expect(404);
  await api().get('/api/incidencias/abc').expect(400);
});

// ---- Asignar (HU-06)
test('asignar pasa a asignada y deja evento', async () => {
  const a = await crear();
  const { body } = await api().patch(`/api/incidencias/${a.id}/asignacion`).send({ responsable_id: 2 }).expect(200);
  assert.equal(body.estado, 'asignada');
  assert.equal(body.responsable_id, 2);
  assert.deepEqual(body.transiciones_permitidas, ['en_proceso']);
  assert.equal(body.seguimiento.at(-1).tipo, 'asignacion');
});

test('reasignar a otra persona es válido; a la misma da 409', async () => {
  const a = await crear();
  await api().patch(`/api/incidencias/${a.id}/asignacion`).send({ responsable_id: 1 }).expect(200);
  await api().patch(`/api/incidencias/${a.id}/asignacion`).send({ responsable_id: 1 }).expect(409);
  const { body } = await api().patch(`/api/incidencias/${a.id}/asignacion`).send({ responsable_id: 3 }).expect(200);
  assert.equal(body.responsable_id, 3);
});

test('asignar valida responsable y estado', async () => {
  const a = await crear();
  await api().patch(`/api/incidencias/${a.id}/asignacion`).send({}).expect(400);
  await api().patch(`/api/incidencias/${a.id}/asignacion`).send({ responsable_id: 999 }).expect(422);
  await api().patch('/api/incidencias/999/asignacion').send({ responsable_id: 1 }).expect(404);
  await api().patch(`/api/incidencias/${a.id}/asignacion`).send({ responsable_id: 1 }).expect(200);
  await api().patch(`/api/incidencias/${a.id}/estado`).send({ estado: 'en_proceso' }).expect(200);
  // en proceso ya no se reasigna
  const r = await api().patch(`/api/incidencias/${a.id}/asignacion`).send({ responsable_id: 2 }).expect(409);
  assert.equal(r.body.error.codigo, 'estado_no_asignable');
});

// ---- Cambiar estado (HU-07)
test('flujo completo hasta resuelta con comentario', async () => {
  const a = await crear();
  await api().patch(`/api/incidencias/${a.id}/asignacion`).send({ responsable_id: 1 }).expect(200);
  await api().patch(`/api/incidencias/${a.id}/estado`).send({ estado: 'en_proceso' }).expect(200);
  const { body } = await api().patch(`/api/incidencias/${a.id}/estado`).send({ estado: 'resuelta', comentario: 'Se cambió el cable' }).expect(200);
  assert.equal(body.estado, 'resuelta');
  assert.deepEqual(body.transiciones_permitidas, []);
  const ultimo = body.seguimiento.at(-1);
  assert.equal(ultimo.tipo, 'estado');
  assert.equal(ultimo.estado_anterior, 'en_proceso');
  assert.equal(ultimo.texto, 'Se cambió el cable');
});

test('transiciones inválidas devuelven 409 y no cambian nada', async () => {
  const a = await crear();
  // nueva -> en_proceso (salto) y nueva -> asignada (debe usarse la asignación)
  await api().patch(`/api/incidencias/${a.id}/estado`).send({ estado: 'en_proceso' }).expect(409);
  const r = await api().patch(`/api/incidencias/${a.id}/estado`).send({ estado: 'asignada' }).expect(409);
  assert.equal(r.body.error.codigo, 'transicion_invalida');
  const det = (await api().get(`/api/incidencias/${a.id}`)).body;
  assert.equal(det.estado, 'nueva');
  assert.equal(det.seguimiento.length, 1);
});

test('estado desconocido devuelve 400', async () => {
  const a = await crear();
  await api().patch(`/api/incidencias/${a.id}/estado`).send({ estado: 'volando' }).expect(400);
});

// ---- Seguimiento (HU-08)
test('comentarios se agregan en orden y validan texto', async () => {
  const a = await crear();
  await api().post(`/api/incidencias/${a.id}/comentarios`).send({ texto: '  ' }).expect(400);
  await api().post(`/api/incidencias/${a.id}/comentarios`).send({ texto: 'Primero' }).expect(201);
  const { body } = await api().post(`/api/incidencias/${a.id}/comentarios`).send({ texto: 'Segundo' }).expect(201);
  assert.deepEqual(body.seguimiento.map((e) => e.texto), ['Incidencia registrada', 'Primero', 'Segundo']);
  await api().post('/api/incidencias/999/comentarios').send({ texto: 'x' }).expect(404);
});

test('ruta /api desconocida devuelve 404 JSON', async () => {
  const { body } = await api().get('/api/nada').expect(404);
  assert.equal(body.error.codigo, 'ruta_no_encontrada');
});

test('la BD impide estado asignada sin responsable', async () => {
  const a = await crear();
  await assert.rejects(pool.query("UPDATE incidencias SET estado = 'asignada' WHERE id = $1", [a.id]));
});
