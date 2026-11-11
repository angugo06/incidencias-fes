// Detalle: datos y asignación.
import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { api } from '../api.js';
import { fechaCorta, fechaHora } from '../formato.js';
import InsigniaEstado from '../componentes/InsigniaEstado.jsx';
import Aviso from '../componentes/Aviso.jsx';

export default function DetalleIncidencia() {
  const { id } = useParams();
  const { state } = useLocation();
  const [inc, setInc] = useState(null);
  const [catalogos, setCatalogos] = useState(null);
  const [error, setError] = useState('');
  const [exito, setExito] = useState(state?.creada ? 'Incidencia registrada correctamente.' : '');
  const [responsable, setResponsable] = useState('');

  const cargar = useCallback(() => {
    api.detalle(id).then(setInc).catch((e) => setError(e.message));
  }, [id]);

  useEffect(() => {
    cargar();
    api.catalogos().then(setCatalogos).catch(() => {});
  }, [cargar]);

  // Ejecuta una acción, refresca el detalle y muestra el resultado
  async function ejecutar(accion, mensajeOk, limpiar) {
    setError(''); setExito('');
    try {
      setInc(await accion());
      setExito(mensajeOk);
      limpiar?.();
    } catch (e) {
      setError(e.detalles && Object.values(e.detalles)[0] ? Object.values(e.detalles)[0] : e.message);
    }
  }

  if (error && !inc) return <Aviso tipo="error">{error}</Aviso>;
  if (!inc) return <p>Cargando…</p>;

  return (
    <section>
      <p><Link to="/">← Volver a la lista</Link></p>
      <div className="encabezado">
        <h1>{inc.folio}</h1>
        <InsigniaEstado estado={inc.estado} />
      </div>
      <Aviso tipo="ok">{exito}</Aviso>
      <Aviso tipo="error">{error}</Aviso>

      <dl className="datos">
        <dt>Ubicación</dt><dd>{inc.ubicacion}</dd>
        <dt>Categoría</dt><dd>{inc.categoria}</dd>
        <dt>Fecha de la incidencia</dt><dd>{fechaCorta(inc.fecha_incidencia)}</dd>
        <dt>Registrada</dt><dd>{fechaHora(inc.creada_en)}</dd>
        <dt>Responsable</dt><dd>{inc.responsable ?? 'Sin asignar'}</dd>
        <dt>Descripción</dt><dd className="descripcion">{inc.descripcion}</dd>
      </dl>

      {inc.puede_asignar && (
        <form className="panel" onSubmit={(e) => {
          e.preventDefault();
          ejecutar(() => api.asignar(inc.id, Number(responsable)), 'Responsable asignado.', () => setResponsable(''));
        }}>
          <h2>{inc.responsable ? 'Reasignar' : 'Asignar'} responsable</h2>
          <select value={responsable} onChange={(e) => setResponsable(e.target.value)} aria-label="Responsable">
            <option value="">Selecciona…</option>
            {catalogos?.responsables.map((r) => <option key={r.id} value={r.id}>{r.nombre}</option>)}
          </select>
          <button className="boton" disabled={!responsable}>Asignar</button>
        </form>
      )}

    </section>
  );
}
