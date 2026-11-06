// Pruebas unitarias del ciclo de vida (sin BD).
import test from 'node:test';
import assert from 'node:assert/strict';
import { puedeTransitar, transicionesDesde, admiteAsignacion, ESTADOS } from '../src/estados.js';

test('flujo válido: asignada -> en_proceso -> resuelta', () => {
  assert.ok(puedeTransitar('asignada', 'en_proceso'));
  assert.ok(puedeTransitar('en_proceso', 'resuelta'));
});

test('no se salta ni retrocede de estado', () => {
  assert.equal(puedeTransitar('asignada', 'resuelta'), false);
  assert.equal(puedeTransitar('en_proceso', 'asignada'), false);
  assert.equal(puedeTransitar('resuelta', 'en_proceso'), false);
});

test('nueva no cambia a mano (se asigna) y resuelta es final', () => {
  assert.deepEqual(transicionesDesde('nueva'), []);
  assert.deepEqual(transicionesDesde('resuelta'), []);
  assert.deepEqual(transicionesDesde('inexistente'), []);
});

test('solo nueva y asignada admiten asignación', () => {
  const ok = ESTADOS.filter(admiteAsignacion);
  assert.deepEqual(ok, ['nueva', 'asignada']);
});
