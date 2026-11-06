# Estado del proyecto (Capa 4 — cambia cada sprint)

**Última actualización:** 2026-11-06 · **Sprint vigente:** ninguno (proyecto completo)

## Resumen

Hechas las 11 historias (30 pts, 60 h). Cada sprint lo entrega su integrante con sus propios commits y un pull request (ver [docs/guia-equipo.md](../docs/guia-equipo.md)); el tablero del repositorio (issues y GitHub Project) lleva el avance oficial.

| Sprint | Fechas | Historias | Integrante | Estado |
|---|---|---|---|---|
| 1 Cimientos y registro | 4–6 nov | HT-01, HU-01, HU-02, HU-03, HU-04 | @angugo06 | Hecho |
| 2 Atención de la incidencia | 9–11 nov | HU-05, HU-06, HU-07 | @IanBS375 | Hecho |
| 3 Seguimiento, filtros y cierre | 12–17 nov | HU-08, HU-09, HT-02 | @Diegovivas12 | Hecho |

## Verificación al cierre de cada sprint

| Sprint | `npm --prefix server test` (PostgreSQL 16 local) | `npm --prefix client test` | `vite build` |
|---|---|---|---|
| 1 | 17 de 17 casos OK | 7 de 7 casos OK | OK |
| 2 | 30 de 30 casos OK | 7 de 7 casos OK | OK |
| 3 | 35 de 35 casos OK | 9 de 9 casos OK | OK |

| Qué | Resultado |
|---|---|
| E2E con Chromium (`tools/e2e-capturas.mjs`) | OK (2026-11-06, sobre el árbol final) |
| Docker Compose | **No probado** (no había Docker en el entorno de desarrollo) |
| GitHub | 57 issues (11 historias + 46 tareas como sub-issues) con milestones Sprint 1-3; ver `docs/github.md` |

## Pendiente / siguiente

- [ ] Probar `docker compose up` en una máquina con Docker Desktop.
- [ ] Retrospectiva de cada sprint en `docs/sprints/` (sección al final del archivo).

## Cómo actualizar este archivo

Al cerrar una historia: cerrar su issue (`Closes #N` en el PR) y actualizar esta tabla; regenerar el plan solo si cambian puntos u horas.
