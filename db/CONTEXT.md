# db/ — Esquema y datos (Capa 2)

**Propósito:** definir tablas, restricciones, índices y datos base.
**Salidas:** `schema.sql` (estructura), `seed.sql` (catálogos, siempre), `seed_demo.sql` (incidencias de ejemplo, opcional).

## Convenciones
- `schema.sql` no borra nada; el reinicio lo hace `server/src/bd/reiniciar.js` (`DROP SCHEMA public CASCADE`).
- Invariantes en la BD, no solo en la API (`CHECK estado_vs_responsable`).
- Los ids de `seed_demo.sql` dependen del orden de `seed.sql`: si cambias el orden de catálogos, revisa la demo.
- `docker-init/` crea la BD `incidencias_test` en el primer arranque del contenedor.

## Al cambiar el esquema
Actualizar `docs/base-de-datos.md`, las consultas de `server/src/rutas/incidencias.js` y las pruebas.
