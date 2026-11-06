# Estado del proyecto (Capa 4 — cambia cada sprint)

**Última actualización:** 2026-11-06 · **Sprint vigente:** Sprint 3 (12–17 nov 2026)

## Resumen

Hechas 8 de 11 historias (20 de 30 pts): suma detalle, asignación y cambio de estado. Cada sprint lo entrega su integrante con sus propios commits y un pull request (ver [docs/guia-equipo.md](../docs/guia-equipo.md)); el tablero del repositorio (issues y GitHub Project) lleva el avance oficial.

| Sprint | Fechas | Historias | Integrante | Estado |
|---|---|---|---|---|
| 1 Cimientos y registro | 4–6 nov | HT-01, HU-01, HU-02, HU-03, HU-04 | @angugo06 | Hecho |
| 2 Atención de la incidencia | 9–11 nov | HU-05, HU-06, HU-07 | @IanBS375 | Hecho |
| 3 Seguimiento, filtros y cierre | 12–17 nov | HU-08, HU-09, HT-02 | @Diegovivas12 | Por hacer |

## Verificación al cierre de cada sprint

| Sprint | `npm --prefix server test` (PostgreSQL 16 local) | `npm --prefix client test` | `vite build` |
|---|---|---|---|
| 1 | 17 de 17 casos OK | 7 de 7 casos OK | OK |
| 2 | 30 de 30 casos OK | 7 de 7 casos OK | OK |

## Pendiente / siguiente

- [ ] Sprint 3 (@Diegovivas12): crear `sprint-3` desde `origin/etapa-3`, abrir PR y fusionar.

## Cómo actualizar este archivo

Al cerrar una historia: cerrar su issue (`Closes #N` en el PR) y actualizar esta tabla; regenerar el plan solo si cambian puntos u horas.
