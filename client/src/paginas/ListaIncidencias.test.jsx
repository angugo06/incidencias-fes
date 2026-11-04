// Prueba de la lista: los filtros se reflejan en la URL y en la llamada a la API.
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../api.js', () => ({
  api: {
    catalogos: vi.fn().mockResolvedValue({ categorias: [{ id: 1, clave: 'electrica', nombre: 'Eléctrica' }] }),
    listar: vi.fn().mockResolvedValue({ datos: [] }),
  },
}));
import { api } from '../api.js';
import ListaIncidencias from './ListaIncidencias.jsx';

beforeEach(() => api.listar.mockClear());

describe('ListaIncidencias', () => {
  it('muestra mensaje vacío', async () => {
    render(<MemoryRouter><ListaIncidencias /></MemoryRouter>);
    expect(await screen.findByText(/No hay incidencias/)).toBeInTheDocument();
  });

  it('al elegir estado vuelve a consultar con el filtro', async () => {
    render(<MemoryRouter><ListaIncidencias /></MemoryRouter>);
    await screen.findByText(/No hay incidencias/);
    await userEvent.selectOptions(screen.getByLabelText('Estado'), 'nueva');
    await waitFor(() => expect(api.listar).toHaveBeenLastCalledWith({ estado: 'nueva', categoria: '' }));
  });

  it('lee los filtros iniciales de la URL', async () => {
    render(<MemoryRouter initialEntries={['/?categoria=electrica']}><ListaIncidencias /></MemoryRouter>);
    await waitFor(() => expect(api.listar).toHaveBeenCalledWith({ estado: '', categoria: 'electrica' }));
  });
});
