# Pruebas

## Resumen

| Nivel | Herramienta | Archivos | Casos |
|---|---|---|---|
| Unidad (servidor) | `node:test` | `server/test/estados.test.js`, `validacion.test.js` | 12 |
| Integración API + BD | `node:test` + supertest | `server/test/api.test.js` | 23 |
| Unidad/componente (cliente) | Vitest + Testing Library | `client/src/**/*.test.js(x)` | 9 |
| Punta a punta | Playwright (manual) | `tools/e2e-capturas.mjs` | 1 flujo |

Total automático: 44 casos. Última corrida: ver [contexto/ESTADO.md](../contexto/ESTADO.md).

## Cómo ejecutar

```bash
npm test                  # servidor + cliente
npm --prefix server test  # necesita PostgreSQL con la BD incidencias_test
npm --prefix client test
```

Las pruebas de API **reinician la BD de pruebas** (`TEST_DATABASE_URL`) antes de cada caso; nunca apuntan a `DATABASE_URL`.

## Qué cubre cada historia

| Historia | Pruebas |
|---|---|
| HU-01 | `GET /catalogos` devuelve listas y estados |
| HU-02 | Folio, estado inicial, evento de registro, folios consecutivos |
| HU-03 | Campos faltantes, fecha futura, catálogos inválidos o inactivos, JSON roto; validación del formulario |
| HU-04 | Orden de la lista; mensaje vacío |
| HU-05 | Detalle, 404 y 400 |
| HU-06 | Asignar, reasignar, misma persona, responsable inválido, estado no asignable |
| HU-07 | Flujo completo, transiciones inválidas sin efectos, estado desconocido; módulo `estados` |
| HU-08 | Comentarios: orden, validación, 404 |
| HU-09 | Filtros solos y combinados, valores inválidos; filtros en URL del cliente |
| BD | La restricción `estado_vs_responsable` rechaza `asignada` sin responsable |

## Prueba de punta a punta

`tools/e2e-capturas.mjs` abre el navegador y recorre: lista → filtros → formulario (con errores) → registro → asignar → en proceso → resuelta → comentario. También genera las capturas de `docs/img/`. Requiere Playwright, la API sirviendo el cliente compilado y la BD con `db:demo`.

## No cubierto

Pruebas de carga, accesibilidad automatizada y navegadores distintos de Chromium.
