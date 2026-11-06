# Decisiones (Capa 3 — estable)

Formato breve: contexto → decisión → consecuencia.

## ADR-001 — Alcance reducido a 7 funciones
- **Contexto:** el backlog original tenía 11 historias (login, fotos, avisos, reportes).
- **Decisión:** solo las 7 funciones pedidas; el resto sale (ver `tools/plan.json`, `fueraDeAlcance`).
- **Consecuencia:** 11 historias nuevas (2 técnicas), 30 puntos, 3 sprints de 3 días hábiles (20 h cada uno).

## ADR-002 — Sin autenticación
- **Contexto:** login y roles no están en el alcance.
- **Decisión:** no hay usuarios; los «roles» son solo de uso (usuario, coordinador, mantenimiento).
- **Consecuencia:** cualquiera con acceso a la app puede asignar y cambiar estados. Desplegar solo en red de confianza. Si se agrega login, el seguimiento deberá guardar quién actúa.

## ADR-003 — Seguimiento en una sola tabla de eventos
- **Decisión:** `seguimiento` guarda registro, asignaciones, estados y comentarios.
- **Consecuencia:** una línea de tiempo simple; no hay historial separado de comentarios.

## ADR-004 — Estados como enum y transiciones en código
- **Decisión:** `estado_incidencia` en BD; reglas de cambio en `server/src/estados.js`. `nueva→asignada` solo ocurre al asignar.
- **Consecuencia:** el servidor envía `transiciones_permitidas`; el cliente no copia la regla. Reabrir incidencias no existe.

## ADR-005 — `nueva` ⇔ sin responsable (restricción en BD)
- **Decisión:** `CHECK` en `incidencias`.
- **Consecuencia:** ningún bug de la API puede dejar una incidencia asignada sin persona.

## ADR-006 — Catálogos fijos cargados por seed
- **Decisión:** ubicaciones, categorías y responsables se cargan con `seed.sql`; no hay pantallas de administración.
- **Consecuencia:** cambiar un catálogo requiere editar el seed o SQL directo.

## ADR-007 — Fecha «no futura» según `TZ_APP`
- **Decisión:** el servidor compara contra la fecha de hoy en `America/Mexico_City`.
- **Consecuencia:** un navegador en otra zona puede ver rechazada la fecha de «hoy» cerca de medianoche.

## ADR-008 — Cliente sin librerías de UI ni de estado
- **Decisión:** React + React Router + CSS propio; estado local con hooks.
- **Consecuencia:** pocas dependencias; si crece, evaluar una librería de formularios o de datos.

## ADR-009 — Express 5, `pg` sin ORM
- **Decisión:** SQL explícito y parametrizado.
- **Consecuencia:** consultas visibles y fáciles de revisar; sin migraciones automáticas (el esquema se recrea con `db:init`).

## ADR-010 — GitHub como fuente de verdad del avance
- **Decisión:** un issue por historia y uno por tarea (sub-issues), etiquetas `sprint-N`, tablero en GitHub Projects.
- **Consecuencia:** `tools/plan.json` define el plan; los issues lo reflejan (ver `docs/github.md`).
