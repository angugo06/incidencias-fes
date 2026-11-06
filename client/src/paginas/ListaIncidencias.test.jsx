// Prueba de la lista de incidencias.
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../api.js', () => ({
  api: {
    listar: vi.fn().mockResolvedValue({ datos: [] }),
  },
}));
import ListaIncidencias from './ListaIncidencias.jsx';

describe('ListaIncidencias', () => {
  it('muestra mensaje vacío', async () => {
    render(<MemoryRouter><ListaIncidencias /></MemoryRouter>);
    expect(await screen.findByText(/No hay incidencias/)).toBeInTheDocument();
  });
});
