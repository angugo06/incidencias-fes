// Pruebas unitarias de validación (sin BD).
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validarNuevaIncidencia, validarId, esFechaValida, validarFiltros, validarComentario, hoy,
} from '../src/validacion.js';
import { ESTADOS } from '../src/estados.js';

const base = { ubicacion_id: 1, categoria_id: 2, descripcion: 'El HDMI no funciona', fecha_incidencia: '2026-11-03' };

test('incidencia válida no genera errores', () => {
  const { errores, valor } = validarNuevaIncidencia(base, '2026-11-04');
  assert.deepEqual(errores, {});
  assert.equal(valor.descripcion, 'El HDMI no funciona');
});

test('faltan campos obligatorios', () => {
  const { errores } = validarNuevaIncidencia({}, '2026-11-04');
  assert.deepEqual(Object.keys(errores).sort(), ['categoria_id', 'descripcion', 'fecha_incidencia', 'ubicacion_id']);
});

test('descripción corta (tras recortar espacios) es inválida', () => {
  const { errores } = validarNuevaIncidencia({ ...base, descripcion: '   corta   ' }, '2026-11-04');
  assert.ok(errores.descripcion);
});

test('fecha futura o inexistente es inválida', () => {
  assert.ok(validarNuevaIncidencia({ ...base, fecha_incidencia: '2026-11-05' }, '2026-11-04').errores.fecha_incidencia);
  assert.ok(validarNuevaIncidencia({ ...base, fecha_incidencia: '2026-02-30' }, '2026-11-04').errores.fecha_incidencia);
  assert.equal(esFechaValida('2026-11-04'), true);
  assert.equal(esFechaValida('04/11/2026'), false);
});

test('ids: solo enteros positivos', () => {
  assert.equal(validarId('12'), 12);
  for (const x of ['0', '-1', 'abc', '1.5', '']) assert.equal(validarId(x), null);
});

test('filtros: estado y categoría', () => {
  assert.deepEqual(validarFiltros({ estado: 'nueva', categoria: 'electrica' }, ESTADOS).errores, {});
  assert.ok(validarFiltros({ estado: 'x' }, ESTADOS).errores.estado);
  assert.ok(validarFiltros({ categoria: 'DROP TABLE' }, ESTADOS).errores.categoria);
});

test('comentario vacío es inválido', () => {
  assert.ok(validarComentario({ texto: '   ' }).errores.texto);
});

test('hoy() devuelve formato AAAA-MM-DD', () => {
  assert.match(hoy(), /^\d{4}-\d{2}-\d{2}$/);
});
