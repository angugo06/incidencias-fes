// Layout general y rutas de la aplicación.
import { NavLink, Route, Routes } from 'react-router-dom';
import NuevaIncidencia from './paginas/NuevaIncidencia.jsx';

export default function App() {
  return (
    <>
      <header className="barra">
        <span className="marca">Incidencias FES</span>
        <nav>
          <NavLink to="/" end>Incidencias</NavLink>
          <NavLink to="/nueva">Registrar</NavLink>
        </nav>
      </header>
      <main className="contenedor">
        <Routes>
          <Route path="/nueva" element={<NuevaIncidencia />} />
          <Route path="*" element={<p>Página no encontrada.</p>} />
        </Routes>
      </main>
    </>
  );
}
