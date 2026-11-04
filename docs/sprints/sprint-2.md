# Sprint 2 — Atención de la incidencia

**Fechas:** 17/11 al 23/11 de noviembre de 2026 (5 días hábiles).
**Meta:** Consultar el detalle, asignar un responsable y llevar la incidencia por sus estados.
**Compromiso:** 15 puntos · 30 h de 35 h de capacidad (7 h/día).

> Estado: código de este sprint implementado y verificado. Las fechas son el calendario planeado del sprint.

| Historia | Puntos | Horas | Inicio | Fin |
|---|---:|---:|---|---|
| HU-05 Consultar el detalle de una incidencia | 4 | 8 | 17/11 | 18/11 |
| HU-06 Asignar una incidencia a un responsable | 5 | 10 | 18/11 | 19/11 |
| HU-07 Cambiar el estado de una incidencia | 6 | 12 | 19/11 | 23/11 |

## HU-05 — Consultar el detalle de una incidencia (4 pts, 8 h)

*Como usuario de la facultad, quiero abrir una incidencia y ver todos sus datos, para conocer su situación actual.*

**Criterios de aceptación**

- GET /api/incidencias/:id devuelve datos, responsable, seguimiento y acciones permitidas.
- Un id inexistente devuelve 404 y un id inválido devuelve 400.
- La pantalla de detalle muestra los datos y se llega desde la lista.

| Tarea | Área | Horas | Estado |
|---|---|---:|---|
| HU-05-T1 GET /api/incidencias/:id con uniones y seguimiento | Backend | 2 | Hecho |
| HU-05-T2 Manejo de 404 y de id inválido | Backend | 1 | Hecho |
| HU-05-T3 Pantalla de detalle | Frontend | 4 | Hecho |
| HU-05-T4 Pruebas del detalle | Pruebas | 1 | Hecho |

## HU-06 — Asignar una incidencia a un responsable (5 pts, 10 h)

*Como coordinador, quiero asignar una incidencia a una persona de mantenimiento, para que alguien sea responsable de atenderla.*

**Criterios de aceptación**

- Se puede asignar una incidencia «nueva» o «asignada» (reasignar) a un responsable activo.
- Al asignar, el estado pasa a «asignada» y se registra el evento con el nombre.
- No se asigna una incidencia ya en proceso o resuelta (409).

| Tarea | Área | Horas | Estado |
|---|---|---:|---|
| HU-06-T1 PATCH /api/incidencias/:id/asignacion con reglas de negocio | Backend | 3 | Hecho |
| HU-06-T2 Registro del evento de asignación | Backend | 1 | Hecho |
| HU-06-T3 Selector de responsable en el detalle | Frontend | 3 | Hecho |
| HU-06-T4 Mensajes de confirmación y de error | Frontend | 1 | Hecho |
| HU-06-T5 Pruebas de asignación y reasignación | Pruebas | 2 | Hecho |

## HU-07 — Cambiar el estado de una incidencia (6 pts, 12 h)

*Como personal de mantenimiento, quiero cambiar el estado de la incidencia (en proceso, resuelta), para reflejar el avance del trabajo.*

**Criterios de aceptación**

- Solo se permite asignada → en_proceso y en_proceso → resuelta; cualquier otro cambio devuelve 409.
- Cada cambio se guarda en el seguimiento con estado anterior, nuevo y nota opcional.
- El detalle solo muestra los botones de las transiciones permitidas.

| Tarea | Área | Horas | Estado |
|---|---|---:|---|
| HU-07-T1 Módulo de transiciones (estados.js) | Backend | 2 | Hecho |
| HU-07-T2 PATCH /api/incidencias/:id/estado con validación | Backend | 3 | Hecho |
| HU-07-T3 Registro del cambio en el seguimiento | Backend | 1 | Hecho |
| HU-07-T4 Botones de estado según transiciones permitidas | Frontend | 3 | Hecho |
| HU-07-T5 Pruebas del flujo y de transiciones inválidas | Pruebas | 3 | Hecho |
