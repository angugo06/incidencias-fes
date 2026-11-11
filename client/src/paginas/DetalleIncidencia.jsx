// Detalle: datos de la incidencia.
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
  const [error, setError] = useState('');
  const [exito, setExito] = useState(state?.creada ? 'Incidencia registrada correctamente.' : '');

  const cargar = useCallback(() => {
    api.detalle(id).then(setInc).catch((e) => setError(e.message));
  }, [id]);

  useEffect(() => {
    cargar();
  }, [cargar]);

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

    </section>
  );
}
