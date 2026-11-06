# Referencia de la API

Base: `http://localhost:3001/api` · JSON en UTF-8 · sin autenticación.

## Convenciones

**Errores** (siempre el mismo formato):

```json
{ "error": { "codigo": "validacion", "mensaje": "Datos inválidos",
             "detalles": { "descripcion": "La descripción necesita al menos 10 caracteres" } } }
```

| HTTP | `codigo` | Cuándo |
|---|---|---|
| 400 | `validacion` | Cuerpo o filtros inválidos (`detalles` por campo) |
| 400 | `id_invalido` | `:id` no es un entero positivo |
| 400 | `json_invalido` | Cuerpo no es JSON |
| 404 | `no_encontrada` / `ruta_no_encontrada` | No existe la incidencia / la ruta |
| 409 | `transicion_invalida`, `estado_no_asignable`, `sin_cambios` | Regla de negocio |
| 422 | `catalogo_invalido` | Ubicación, categoría o responsable inexistente o inactivo |
| 500 | `error_interno` | Falla inesperada |

**Estados:** `nueva`, `asignada`, `en_proceso`, `resuelta`.
**Fechas:** `fecha_incidencia` es `AAAA-MM-DD`; `creada_en`, `actualizada_en` y `creado_en` son ISO 8601 (UTC).

## Endpoints

| Método | Ruta | Historia | Descripción |
|---|---|---|---|
| GET | `/salud` | HT-01 | Comprueba API y BD |
| GET | `/catalogos` | HU-01 | Ubicaciones, categorías, responsables, estados |
| POST | `/incidencias` | HU-02, HU-03 | Registrar |
| GET | `/incidencias` | HU-04, HU-09 | Listar (filtros opcionales) |
| GET | `/incidencias/:id` | HU-05, HU-08 | Detalle + seguimiento |
| PATCH | `/incidencias/:id/asignacion` | HU-06 | Asignar o reasignar |
| PATCH | `/incidencias/:id/estado` | HU-07 | Cambiar estado |
| POST | `/incidencias/:id/comentarios` | HU-08 | Comentar |

### GET /salud
`200 { "ok": true }`

### GET /catalogos
```json
{ "ubicaciones": [{ "id": 1, "nombre": "Taller de cómputo", "tipo": "taller" }],
  "categorias":   [{ "id": 2, "clave": "audiovisual", "nombre": "Audiovisual" }],
  "responsables": [{ "id": 1, "nombre": "Luis Hernández" }],
  "estados": ["nueva", "asignada", "en_proceso", "resuelta"] }
```
Solo ubicaciones y responsables activos.

### POST /incidencias
Cuerpo:

| Campo | Tipo | Regla |
|---|---|---|
| `ubicacion_id` | entero | Existe y está activa |
| `categoria_id` | entero | Existe |
| `descripcion` | texto | 10–1000 caracteres (recortada) |
| `fecha_incidencia` | `AAAA-MM-DD` | Fecha real, no futura |

`201` devuelve el detalle (ver abajo) con `estado: "nueva"` y un evento `registro`.

### GET /incidencias
Parámetros opcionales: `estado` (uno de los estados) y `categoria` (clave, p. ej. `electrica`); se combinan con AND. Orden: más reciente primero, máximo 200.

```json
{ "total": 1, "datos": [{
  "id": 6, "folio": "INC-2026-0006", "descripcion": "Dos reflectores…", "estado": "nueva",
  "fecha_incidencia": "2026-11-04", "creada_en": "2026-11-04T00:25:58.260Z", "actualizada_en": "…",
  "ubicacion_id": 4, "ubicacion": "Cancha de fútbol",
  "categoria_id": 1, "categoria_clave": "electrica", "categoria": "Eléctrica",
  "responsable_id": null, "responsable": null }] }
```

### GET /incidencias/:id (detalle)
Mismos campos que la lista, más:

```json
{ "transiciones_permitidas": ["en_proceso"],
  "puede_asignar": true,
  "seguimiento": [
    { "id": 1, "tipo": "registro",   "estado_anterior": null,    "estado_nuevo": "nueva",    "texto": "Incidencia registrada", "responsable": null, "creado_en": "…" },
    { "id": 2, "tipo": "asignacion", "estado_anterior": "nueva", "estado_nuevo": "asignada", "texto": "Asignada a María Torres", "responsable": "María Torres", "creado_en": "…" } ] }
```
`tipo`: `registro`, `asignacion`, `estado`, `comentario`. Ordenado cronológicamente.

### PATCH /incidencias/:id/asignacion
Cuerpo `{ "responsable_id": 2 }`. Solo si la incidencia está `nueva` o `asignada` (si no, `409 estado_no_asignable`); misma persona → `409 sin_cambios`. Resultado: estado `asignada` + evento `asignacion`. Devuelve el detalle.

### PATCH /incidencias/:id/estado
Cuerpo `{ "estado": "en_proceso", "comentario": "opcional, máx. 500" }`.

| Desde | Hacia permitido |
|---|---|
| `asignada` | `en_proceso` |
| `en_proceso` | `resuelta` |
| `nueva`, `resuelta` | ninguno (se asigna con `/asignacion`; `resuelta` es final) |

Otro cambio → `409 transicion_invalida`. Devuelve el detalle.

### POST /incidencias/:id/comentarios
Cuerpo `{ "texto": "…" }` (1–500 caracteres). `201` con el detalle.

## Ejemplo con curl

```bash
curl -X POST http://localhost:3001/api/incidencias -H "Content-Type: application/json" \
  -d '{"ubicacion_id":1,"categoria_id":2,"descripcion":"El HDMI no funciona","fecha_incidencia":"2026-11-03"}'
curl "http://localhost:3001/api/incidencias?estado=nueva&categoria=electrica"
```
