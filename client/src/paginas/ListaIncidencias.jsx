// Lista de incidencias con filtros por estado y categoría (se guardan en la URL).
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../api.js';
import { ETIQUETA_ESTADO, fechaCorta, resumir } from '../formato.js';
import InsigniaEstado from '../componentes/InsigniaEstado.jsx';
import Aviso from '../componentes/Aviso.jsx';

export default function ListaIncidencias() {
  const [params, setParams] = useSearchParams();
  const estado = params.get('estado') ?? '';
  const categoria = params.get('categoria') ?? '';

  const [catalogos, setCatalogos] = useState(null);
  const [lista, setLista] = useState(null); // null = cargando
  const [error, setError] = useState('');

  useEffect(() => {
    api.catalogos().then(setCatalogos).catch((e) => setError(e.message));
  }, []);

  // Recarga al cambiar cualquier filtro
  useEffect(() => {
    setLista(null);
    api.listar({ estado, categoria }).then((r) => { setError(''); setLista(r.datos); })
      .catch((e) => { setError(e.message); setLista([]); });
  }, [estado, categoria]);

  const cambiar = (clave, valor) => {
    const siguiente = new URLSearchParams(params);
    if (valor) siguiente.set(clave, valor); else siguiente.delete(clave);
    setParams(siguiente);
  };

  return (
    <section>
      <div className="encabezado">
        <h1>Incidencias</h1>
        <Link className="boton" to="/nueva">Registrar incidencia</Link>
      </div>

      <div className="filtros">
        <label>
          Estado
          <select value={estado} onChange={(e) => cambiar('estado', e.target.value)}>
            <option value="">Todos</option>
            {Object.entries(ETIQUETA_ESTADO).map(([clave, nombre]) => (
              <option key={clave} value={clave}>{nombre}</option>
            ))}
          </select>
        </label>
        <label>
          Categoría
          <select value={categoria} onChange={(e) => cambiar('categoria', e.target.value)}>
            <option value="">Todas</option>
            {catalogos?.categorias.map((c) => (
              <option key={c.id} value={c.clave}>{c.nombre}</option>
            ))}
          </select>
        </label>
        {(estado || categoria) && (
          <button type="button" className="boton-secundario" onClick={() => setParams({})}>
            Limpiar filtros
          </button>
        )}
      </div>

      <Aviso tipo="error">{error}</Aviso>
      {lista === null && <p>Cargando…</p>}
      {lista?.length === 0 && !error && <p className="vacio">No hay incidencias con esos filtros.</p>}
      {lista?.length > 0 && (
        <div className="tabla-scroll">
          <table>
            <thead>
              <tr>
                <th>Folio</th><th>Ubicación</th><th>Categoría</th><th>Descripción</th>
                <th>Estado</th><th>Responsable</th><th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((i) => (
                <tr key={i.id}>
                  <td><Link to={`/incidencias/${i.id}`}>{i.folio}</Link></td>
                  <td>{i.ubicacion}</td>
                  <td>{i.categoria}</td>
                  <td>{resumir(i.descripcion)}</td>
                  <td><InsigniaEstado estado={i.estado} /></td>
                  <td>{i.responsable ?? '—'}</td>
                  <td>{fechaCorta(i.fecha_incidencia)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
