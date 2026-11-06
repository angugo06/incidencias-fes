// Prueba del esqueleto: la app responde sin necesitar base de datos real.
import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { crearApp } from '../src/app.js';

const poolFalso = { query: async () => ({ rows: [{ '?column?': 1 }] }) };

test('GET /api/salud responde ok', async () => {
  const r = await request(crearApp(poolFalso)).get('/api/salud').expect(200);
  assert.deepEqual(r.body, { ok: true });
});
