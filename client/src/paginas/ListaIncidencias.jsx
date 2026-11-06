// Lista de incidencias registradas, de la más reciente a la más antigua.
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';
import { fechaCorta, resumir } from '../formato.js';
import InsigniaEstado from '../componentes/InsigniaEstado.jsx';
import Aviso from '../componentes/Aviso.jsx';

export default function ListaIncidencias() {
  const [lista, setLista] = useState(null); // null = cargando
  const [error, setError] = useState('');

  useEffect(() => {
    api.listar().then((r) => setLista(r.datos))
      .catch((e) => { setError(e.message); setLista([]); });
  }, []);

  return (
    <section>
      <div className="encabezado">
        <h1>Incidencias</h1>
        <Link className="boton" to="/nueva">Registrar incidencia</Link>
      </div>

      <Aviso tipo="error">{error}</Aviso>
      {lista === null && <p>Cargando…</p>}
      {lista?.length === 0 && !error && <p className="vacio">No hay incidencias registradas.</p>}
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
                  <td>{i.folio}</td>
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
