// Pruebas de las utilidades de formato (sin red ni DOM).
import { describe, it, expect } from 'vitest';
import { fechaCorta, hoyLocal, resumir } from './formato.js';

describe('formato', () => {
  it('fechaCorta no desplaza el día por zona horaria', () => {
    expect(fechaCorta('2026-11-04')).toBe('04/11/2026');
    expect(fechaCorta('2026-11-04T00:00:00.000Z')).toBe('04/11/2026');
    expect(fechaCorta(null)).toBe('');
  });
  it('hoyLocal da AAAA-MM-DD', () => {
    expect(hoyLocal(new Date(2026, 10, 4))).toBe('2026-11-04');
  });
  it('resumir recorta textos largos', () => {
    expect(resumir('abc', 10)).toBe('abc');
    expect(resumir('abcdefghij', 5)).toBe('abcd…');
  });
});
