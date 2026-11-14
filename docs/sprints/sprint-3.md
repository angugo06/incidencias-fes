# Sprint 3 — Seguimiento, filtros y cierre

**Fechas:** 12/11 al 17/11 de noviembre de 2026 (3 días hábiles).
**Meta:** Seguimiento con comentarios, filtros por estado y categoría, pruebas y documentación final.
**Integrante responsable:** [@Diegovivas12](https://github.com/Diegovivas12)
**Compromiso:** 10 puntos · 20 h de 21 h de capacidad (7 h/día).

> Estado: **Hecho**. El sprint se cerró con sus pruebas en verde (ver `contexto/ESTADO.md`).

| Historia | Issue | Puntos | Horas | Inicio | Fin |
|---|---|---:|---:|---|---|
| HU-08 Seguimiento básico con línea de tiempo | [#9](https://github.com/angugo06/incidencias-fes/issues/9) | 3 | 6 | 12/11 | 12/11 |
| HU-09 Filtros sencillos por estado y categoría | [#10](https://github.com/angugo06/incidencias-fes/issues/10) | 2 | 4 | 12/11 | 13/11 |
| HT-02 Pruebas finales, documentación y cierre | [#11](https://github.com/angugo06/incidencias-fes/issues/11) | 5 | 10 | 13/11 | 17/11 |

## Texto para el pull request

Título: `Sprint 3: Seguimiento, filtros y cierre`

```text
Entrega del Sprint 3 (10 pts, 20 h). Ver docs/sprints/sprint-3.md.

Closes #9
Closes #44
Closes #45
Closes #46
Closes #47
Closes #48
Closes #10
Closes #49
Closes #50
Closes #51
Closes #52
Closes #11
Closes #53
Closes #54
Closes #55
Closes #56
Closes #57
```

## HU-08 — Seguimiento básico con línea de tiempo (3 pts, 6 h) · [#9](https://github.com/angugo06/incidencias-fes/issues/9)

*Como usuario de la facultad, quiero ver la historia de la incidencia y agregar comentarios, para dar seguimiento sin preguntar a nadie.*

**Criterios de aceptación**

- El detalle muestra una línea de tiempo con registro, asignaciones, cambios de estado y comentarios, en orden.
- Se puede agregar un comentario de hasta 500 caracteres; los vacíos se rechazan.
- Comentar actualiza la fecha de última actividad.

| Tarea | Issue | Área | Horas | Estado |
|---|---|---|---:|---|
| HU-08-T1 POST /api/incidencias/:id/comentarios | [#44](https://github.com/angugo06/incidencias-fes/issues/44) | Backend | 1 | Hecho |
| HU-08-T2 El detalle devuelve la línea de tiempo ordenada | [#45](https://github.com/angugo06/incidencias-fes/issues/45) | Backend | 1 | Hecho |
| HU-08-T3 Componente de línea de tiempo | [#46](https://github.com/angugo06/incidencias-fes/issues/46) | Frontend | 2 | Hecho |
| HU-08-T4 Formulario de comentario | [#47](https://github.com/angugo06/incidencias-fes/issues/47) | Frontend | 1 | Hecho |
| HU-08-T5 Pruebas de comentarios y orden | [#48](https://github.com/angugo06/incidencias-fes/issues/48) | Pruebas | 1 | Hecho |

## HU-09 — Filtros sencillos por estado y categoría (2 pts, 4 h) · [#10](https://github.com/angugo06/incidencias-fes/issues/10)

*Como usuario de la facultad, quiero filtrar la lista por estado o categoría, para encontrar rápido lo que busco.*

**Criterios de aceptación**

- La lista se filtra por estado, por categoría o por ambos a la vez.
- Los filtros se reflejan en la URL y se pueden limpiar con un botón.
- Un valor de filtro inválido devuelve 400.

| Tarea | Issue | Área | Horas | Estado |
|---|---|---|---:|---|
| HU-09-T1 Parámetros estado y categoría en GET /api/incidencias | [#49](https://github.com/angugo06/incidencias-fes/issues/49) | Backend | 1 | Hecho |
| HU-09-T2 Controles de filtro en la lista | [#50](https://github.com/angugo06/incidencias-fes/issues/50) | Frontend | 1 | Hecho |
| HU-09-T3 Sincronizar filtros con la URL | [#51](https://github.com/angugo06/incidencias-fes/issues/51) | Frontend | 1 | Hecho |
| HU-09-T4 Pruebas de combinaciones de filtros | [#52](https://github.com/angugo06/incidencias-fes/issues/52) | Pruebas | 1 | Hecho |

## HT-02 — Pruebas finales, documentación y cierre (5 pts, 10 h) · [#11](https://github.com/angugo06/incidencias-fes/issues/11)

*Como equipo, queremos validar todo el flujo y dejar el proyecto documentado, para entregarlo y que cualquiera pueda continuarlo.*

**Criterios de aceptación**

- Pruebas automáticas de API y cliente en verde y una prueba de punta a punta del flujo completo.
- README, requisitos, guía de usuario, arquitectura, API y esquema de BD completos.
- El contexto permanente (CLAUDE.md / CONTEXT.md) refleja el estado final.

| Tarea | Issue | Área | Horas | Estado |
|---|---|---|---:|---|
| HT-02-T1 Prueba de punta a punta del flujo completo | [#53](https://github.com/angugo06/incidencias-fes/issues/53) | Pruebas | 2 | Hecho |
| HT-02-T2 Guía de usuario y referencia de la API | [#54](https://github.com/angugo06/incidencias-fes/issues/54) | Docs | 3 | Hecho |
| HT-02-T3 Actualizar el contexto permanente | [#55](https://github.com/angugo06/incidencias-fes/issues/55) | Docs | 1 | Hecho |
| HT-02-T4 Datos de demostración y guion de demo | [#56](https://github.com/angugo06/incidencias-fes/issues/56) | Docs | 2 | Hecho |
| HT-02-T5 Revisión final y retrospectiva | [#57](https://github.com/angugo06/incidencias-fes/issues/57) | Docs | 2 | Hecho |
