# Sprint 3 — Seguimiento, filtros y cierre

**Fechas:** 24/11 al 30/11 de noviembre de 2026 (5 días hábiles).
**Meta:** Seguimiento con comentarios, filtros por estado y categoría, pruebas y documentación final.
**Compromiso:** 16 puntos · 32 h de 35 h de capacidad (7 h/día).

> Estado: código de este sprint implementado y verificado. Las fechas son el calendario planeado del sprint.

| Historia | Puntos | Horas | Inicio | Fin |
|---|---:|---:|---|---|
| HU-08 Seguimiento básico con línea de tiempo | 5 | 10 | 24/11 | 25/11 |
| HU-09 Filtros sencillos por estado y categoría | 4 | 8 | 25/11 | 26/11 |
| HT-02 Pruebas finales, documentación y cierre | 7 | 14 | 26/11 | 30/11 |

## HU-08 — Seguimiento básico con línea de tiempo (5 pts, 10 h)

*Como usuario de la facultad, quiero ver la historia de la incidencia y agregar comentarios, para dar seguimiento sin preguntar a nadie.*

**Criterios de aceptación**

- El detalle muestra una línea de tiempo con registro, asignaciones, cambios de estado y comentarios, en orden.
- Se puede agregar un comentario de hasta 500 caracteres; los vacíos se rechazan.
- Comentar actualiza la fecha de última actividad.

| Tarea | Área | Horas | Estado |
|---|---|---:|---|
| HU-08-T1 POST /api/incidencias/:id/comentarios | Backend | 2 | Hecho |
| HU-08-T2 El detalle devuelve la línea de tiempo ordenada | Backend | 1 | Hecho |
| HU-08-T3 Componente de línea de tiempo | Frontend | 3 | Hecho |
| HU-08-T4 Formulario de comentario | Frontend | 2 | Hecho |
| HU-08-T5 Pruebas de comentarios y orden | Pruebas | 2 | Hecho |

## HU-09 — Filtros sencillos por estado y categoría (4 pts, 8 h)

*Como usuario de la facultad, quiero filtrar la lista por estado o categoría, para encontrar rápido lo que busco.*

**Criterios de aceptación**

- La lista se filtra por estado, por categoría o por ambos a la vez.
- Los filtros se reflejan en la URL y se pueden limpiar con un botón.
- Un valor de filtro inválido devuelve 400.

| Tarea | Área | Horas | Estado |
|---|---|---:|---|
| HU-09-T1 Parámetros estado y categoría en GET /api/incidencias | Backend | 2 | Hecho |
| HU-09-T2 Controles de filtro en la lista | Frontend | 3 | Hecho |
| HU-09-T3 Sincronizar filtros con la URL | Frontend | 1 | Hecho |
| HU-09-T4 Pruebas de combinaciones de filtros | Pruebas | 2 | Hecho |

## HT-02 — Pruebas finales, documentación y cierre (7 pts, 14 h)

*Como equipo, queremos validar todo el flujo y dejar el proyecto documentado, para entregarlo y que cualquiera pueda continuarlo.*

**Criterios de aceptación**

- Pruebas automáticas de API y cliente en verde y una prueba de punta a punta del flujo completo.
- README, requisitos, guía de usuario, arquitectura, API y esquema de BD completos.
- El contexto permanente (CLAUDE.md / CONTEXT.md) refleja el estado final.

| Tarea | Área | Horas | Estado |
|---|---|---:|---|
| HT-02-T1 Prueba de punta a punta del flujo completo | Pruebas | 3 | Hecho |
| HT-02-T2 Guía de usuario y referencia de la API | Docs | 4 | Hecho |
| HT-02-T3 Actualizar el contexto permanente | Docs | 2 | Hecho |
| HT-02-T4 Datos de demostración y guion de demo | Docs | 2 | Hecho |
| HT-02-T5 Revisión final y retrospectiva | Docs | 3 | Hecho |
