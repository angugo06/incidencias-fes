# server/ — API Express (Capa 2)

**Propósito:** exponer la API REST, aplicar reglas de negocio y hablar con PostgreSQL.
**Entradas:** peticiones HTTP JSON; `DATABASE_URL`. **Salidas:** JSON con el formato de `docs/api.md`.

## Dónde está cada cosa
| Quiero… | Archivo |
|---|---|
| Agregar o cambiar un endpoint | `src/rutas/incidencias.js` (o `catalogos.js`) |
| Cambiar transiciones de estado | `src/estados.js` |
| Cambiar una validación | `src/validacion.js` |
| Cambiar el formato de error | `src/errores.js` |
| Cambiar cómo se reinicia la BD | `src/bd/reiniciar.js` |

## Convenciones
- Módulos ES (`import`). Express 5: los errores async llegan solos al manejador.
- Validar entrada → `ErrorApi` → manejador final. Escrituras en `enTransaccion` con `SELECT … FOR UPDATE`.
- Las rutas devuelven siempre el detalle (`obtenerDetalle`) tras escribir.

## Pruebas
`npm test` (usa `TEST_DATABASE_URL`, reinicia esa BD en cada caso). Archivos en `test/`.

## No hacer
Concatenar SQL; cambiar un estado sin pasar por `estados.js`; tocar `DATABASE_URL` desde pruebas.
