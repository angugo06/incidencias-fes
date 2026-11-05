# Estado del proyecto (Capa 4 — cambia cada sprint)

**Última actualización:** 2026-11-04 · **Sprint vigente:** planeado S1 (9–13 nov 2026)

## Resumen

El código de las 11 historias (48 pts, 96 h) está implementado y verificado. Las fechas de los sprints son el calendario planeado para presentación y seguimiento; el tablero del repositorio (issues y GitHub Project) lleva el avance oficial.

| Sprint | Fechas | Historias | Código | Verificado |
|---|---|---|---|---|
| 1 Cimientos y registro | 9–13 nov | HT-01, HU-01, HU-02, HU-03, HU-04 | Implementado | Sí |
| 2 Atención de la incidencia | 17–23 nov | HU-05, HU-06, HU-07 | Implementado | Sí |
| 3 Seguimiento, filtros y cierre | 24–30 nov | HU-08, HU-09, HT-02 | Implementado | Sí |

## Verificación (2026-11-04)

| Qué | Resultado |
|---|---|
| `npm --prefix server test` contra PostgreSQL 16 local | 35 de 35 casos OK |
| `npm --prefix client test` | 9 de 9 casos OK |
| `vite build` | OK |
| E2E con Chromium (`tools/e2e-capturas.mjs`) | OK |
| Docker Compose | **No probado** (no había Docker en el entorno de desarrollo) |
| GitHub | 57 issues abiertos (11 historias + 46 tareas como sub-issues) con milestones Sprint 1-3; ver `docs/github.md` |

## Pendiente / siguiente

- [ ] Probar `docker compose up` en una máquina con Docker Desktop.
- [ ] Crear el GitHub Project (pasos en `docs/github.md`; las herramientas automáticas no pueden crear Projects v2). Los milestones Sprint 1-3 ya existen.
- [ ] Cerrar el issue de cada historia en la revisión de su sprint.
- [ ] Retrospectiva de cada sprint en `docs/sprints/` (sección al final del archivo).

## Cómo actualizar este archivo

Al cerrar una historia: marcar aquí, cerrar su issue (`Closes #N` en el PR) y regenerar el plan solo si cambian puntos u horas.
