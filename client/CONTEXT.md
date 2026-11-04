# client/ — React + Vite (Capa 2)

**Propósito:** pantallas para registrar, listar, filtrar, ver detalle, asignar, cambiar estado y comentar.
**Entradas:** API en `/api` (proxy a :3001 en desarrollo). **Salidas:** SPA en `dist/` (la sirve la API en producción).

## Dónde está cada cosa
| Quiero… | Archivo |
|---|---|
| Cambiar la lista y los filtros | `src/paginas/ListaIncidencias.jsx` |
| Cambiar el formulario o su validación | `src/paginas/NuevaIncidencia.jsx` |
| Cambiar detalle, asignación, estado, línea de tiempo | `src/paginas/DetalleIncidencia.jsx` |
| Llamadas HTTP | `src/api.js` |
| Etiquetas y fechas | `src/formato.js` |
| Estilos | `src/estilos.css` |

## Convenciones
- Componentes de función con hooks; sin librerías de UI ni de estado global.
- El servidor decide qué acciones existen (`transiciones_permitidas`, `puede_asignar`): no duplicar reglas aquí.
- Los filtros viven en la URL (`?estado=&categoria=`).
- Fechas puras (`AAAA-MM-DD`) se formatean sin pasar por `Date` para evitar desfases.

## Pruebas
`npm --prefix client test` (Vitest + Testing Library; `api.js` se simula).
