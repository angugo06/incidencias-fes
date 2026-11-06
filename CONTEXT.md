# CONTEXT.md — Capa 1: ¿a dónde voy?

Método de contexto en capas (inspirado en la *Interpretable Context Methodology* de Jake Van Clief y David McDermott): cada carpeta explica su propósito para que una sesión nueva retome el trabajo leyendo poco.

| Capa | Archivo | Responde |
|---|---|---|
| 0 | `CLAUDE.md` | ¿Dónde estoy y qué reglas aplican? |
| 1 | `CONTEXT.md` (este) | ¿A dónde voy según la tarea? |
| 2 | `*/CONTEXT.md` | ¿Qué hago en esta carpeta? (propósito, entradas, salidas, convenciones) |
| 3 | `contexto/` y `docs/` | ¿Qué reglas y decisiones aplican? (estable) |
| 4 | `docs/sprints/`, `contexto/ESTADO.md` | ¿Con qué estoy trabajando ahora? (cambia cada sprint) |

## Enrutador por tarea

| Si la tarea es… | Ve a | Lee además |
|---|---|---|
| Cambiar una regla, endpoint o validación | `server/CONTEXT.md` | `docs/api.md`, `docs/requisitos.md` |
| Cambiar una pantalla o estilo | `client/CONTEXT.md` | `docs/guia-usuario.md` |
| Cambiar tablas, restricciones o datos base | `db/CONTEXT.md` | `docs/base-de-datos.md` |
| Cambiar el plan, historias o Gantt | `tools/CONTEXT.md` | `docs/sprints/`, `docs/github.md` |
| Escribir o corregir documentación | `docs/CONTEXT.md` | `contexto/CONVENCIONES.md` |
| Saber por qué algo es así | `contexto/DECISIONES.md` | — |
| Saber qué falta o qué sigue | `contexto/ESTADO.md` | issues del repositorio |

## Mapa del repositorio

```
client/    pantallas React            → client/CONTEXT.md
server/    API Express + pruebas      → server/CONTEXT.md
db/        esquema y datos base       → db/CONTEXT.md
docs/      documentación y sprints    → docs/CONTEXT.md
contexto/  estado, decisiones, reglas → (Capa 3 y 4)
tools/     plan y prueba E2E          → tools/CONTEXT.md
```

## Glosario mínimo

Ver `contexto/GLOSARIO.md`. Términos clave: *incidencia*, *folio*, *responsable*, *seguimiento*, *transición*.
