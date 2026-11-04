// Pruebas de la validación del formulario de registro.
import { describe, it, expect } from 'vitest';
import { validar } from './NuevaIncidencia.jsx';

const ok = { ubicacion_id: '1', categoria_id: '2', descripcion: 'El HDMI no funciona', fecha_incidencia: '2026-11-03' };

describe('validar formulario', () => {
  it('acepta datos completos', () => {
    expect(validar(ok, '2026-11-04')).toEqual({});
  });
  it('exige todos los campos', () => {
    const e = validar({ ubicacion_id: '', categoria_id: '', descripcion: '', fecha_incidencia: '' }, '2026-11-04');
    expect(Object.keys(e)).toEqual(['ubicacion_id', 'categoria_id', 'descripcion', 'fecha_incidencia']);
  });
  it('rechaza descripción corta y fecha futura', () => {
    const e = validar({ ...ok, descripcion: 'corta', fecha_incidencia: '2026-11-05' }, '2026-11-04');
    expect(e.descripcion).toBeTruthy();
    expect(e.fecha_incidencia).toBeTruthy();
  });
});
