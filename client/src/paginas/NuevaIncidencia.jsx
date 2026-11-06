// Formulario de registro: ubicación, categoría, descripción y fecha.
import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { hoyLocal } from '../formato.js';
import Aviso from '../componentes/Aviso.jsx';

const MIN_DESC = 10;

// Misma regla que el servidor; el servidor es quien manda
export function validar(f, hoy = hoyLocal()) {
  const e = {};
  if (!f.ubicacion_id) e.ubicacion_id = 'Elige una ubicación';
  if (!f.categoria_id) e.categoria_id = 'Elige una categoría';
  if (f.descripcion.trim().length < MIN_DESC) e.descripcion = `Escribe al menos ${MIN_DESC} caracteres`;
  if (!f.fecha_incidencia) e.fecha_incidencia = 'Indica la fecha';
  else if (f.fecha_incidencia > hoy) e.fecha_incidencia = 'La fecha no puede ser futura';
  return e;
}

export default function NuevaIncidencia() {
  const [creada, setCreada] = useState(null);
  const [catalogos, setCatalogos] = useState(null);
  const [form, setForm] = useState({ ubicacion_id: '', categoria_id: '', descripcion: '', fecha_incidencia: hoyLocal() });
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    api.catalogos().then(setCatalogos).catch((e) => setErrorGeneral(e.message));
  }, []);

  const cambiar = (campo) => (ev) => setForm({ ...form, [campo]: ev.target.value });

  async function enviar(ev) {
    ev.preventDefault();
    const e = validar(form);
    setErrores(e);
    setErrorGeneral('');
    setCreada(null);
    if (Object.keys(e).length) return;
    setEnviando(true);
    try {
      const registrada = await api.registrar({
        ubicacion_id: Number(form.ubicacion_id),
        categoria_id: Number(form.categoria_id),
        descripcion: form.descripcion.trim(),
        fecha_incidencia: form.fecha_incidencia,
      });
      setCreada(registrada);
      setForm({ ubicacion_id: '', categoria_id: '', descripcion: '', fecha_incidencia: hoyLocal() });
    } catch (err) {
      setErrores(err.detalles ?? {});
      setErrorGeneral(err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section>
      <h1>Registrar incidencia</h1>
      <Aviso tipo="error">{errorGeneral}</Aviso>
      <Aviso tipo="ok">{creada && `Incidencia registrada con el folio ${creada.folio}.`}</Aviso>
      <form onSubmit={enviar} noValidate className="formulario">
        <label>
          Ubicación
          <select value={form.ubicacion_id} onChange={cambiar('ubicacion_id')}>
            <option value="">Selecciona…</option>
            {catalogos?.ubicaciones.map((u) => <option key={u.id} value={u.id}>{u.nombre}</option>)}
          </select>
          {errores.ubicacion_id && <span className="error-campo">{errores.ubicacion_id}</span>}
        </label>

        <label>
          Categoría
          <select value={form.categoria_id} onChange={cambiar('categoria_id')}>
            <option value="">Selecciona…</option>
            {catalogos?.categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>
          {errores.categoria_id && <span className="error-campo">{errores.categoria_id}</span>}
        </label>

        <label>
          Fecha en que ocurrió
          <input type="date" value={form.fecha_incidencia} max={hoyLocal()} onChange={cambiar('fecha_incidencia')} />
          {errores.fecha_incidencia && <span className="error-campo">{errores.fecha_incidencia}</span>}
        </label>

        <label>
          Descripción
          <textarea rows={4} maxLength={1000} value={form.descripcion} onChange={cambiar('descripcion')}
            placeholder="Ej. El HDMI del salón A-203 no transmite imagen" />
          {errores.descripcion && <span className="error-campo">{errores.descripcion}</span>}
        </label>

        <button type="submit" className="boton" disabled={enviando}>
          {enviando ? 'Guardando…' : 'Guardar incidencia'}
        </button>
      </form>
    </section>
  );
}
