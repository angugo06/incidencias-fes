# Convenciones (Capa 3 — estable)

## Idioma y nombres
- Español en UI, comentarios, docs y nombres de dominio (`incidencia`, `responsable`, `seguimiento`). Palabras técnicas de JS/SQL se quedan en inglés.
- Archivos: `kebab-case` o nombre de componente (`DetalleIncidencia.jsx`). JS/SQL: `snake_case` para campos de la API y BD, `camelCase` para variables.
- Folios `INC-AAAA-NNNN`; ids de historia `HU-NN` / `HT-NN`; tareas `HU-NN-TN`.

## Comentarios
- Una línea, al punto, explican el porqué o el contrato. Cada archivo abre con un comentario de propósito.
- No narrar lo obvio. No dejar código comentado.

## API
- REST bajo `/api`; JSON; errores `{ error: { codigo, mensaje, detalles } }`.
- Escrituras devuelven el detalle completo. Códigos: 400 validación, 404, 409 regla de negocio, 422 catálogo.

## Base de datos
- Cambios de esquema solo en `db/schema.sql` (+ seed si aplica) y reflejarlos en `docs/base-de-datos.md`.
- SQL parametrizado (`$1`); nunca concatenar entradas.

## Pruebas
- Toda regla nueva lleva al menos una prueba de caso feliz y una de rechazo.
- Las pruebas de API usan solo `TEST_DATABASE_URL`.

## Git y GitHub
- Commits en español, imperativo, sin atribución de IA. Mensaje: `HU-06: asignar incidencia a responsable`.
- Ramas: `sprint-N/HU-NN-descripcion`; PR enlaza el issue con `Closes #N`.
- Etiquetas: `sprint-1..3`, `historia`, `tarea`, `tecnica`, áreas (`backend`, `frontend`, `bd`, `pruebas`, `docs`, `devops`).

## Documentación
- Cada documento abre con su propósito. Tablas para mapeos exactos; sin relleno.
- Mantener sincronizados `docs/api.md` con `server/` y `docs/base-de-datos.md` con `db/`.
