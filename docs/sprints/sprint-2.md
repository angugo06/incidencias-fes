# Sprint 2 — Atención de la incidencia

**Fechas:** 09/11 al 11/11 de noviembre de 2026 (3 días hábiles).
**Meta:** Consultar el detalle, asignar un responsable y llevar la incidencia por sus estados.
**Integrante responsable:** [@IanBS375](https://github.com/IanBS375)
**Compromiso:** 10 puntos · 20 h de 21 h de capacidad (7 h/día).

> Estado: **Hecho**. El sprint se cerró con sus pruebas en verde (ver `contexto/ESTADO.md`).

| Historia | Issue | Puntos | Horas | Inicio | Fin |
|---|---|---:|---:|---|---|
| HU-05 Consultar el detalle de una incidencia | [#6](https://github.com/angugo06/incidencias-fes/issues/6) | 3 | 6 | 09/11 | 09/11 |
| HU-06 Asignar una incidencia a un responsable | [#7](https://github.com/angugo06/incidencias-fes/issues/7) | 3 | 6 | 09/11 | 10/11 |
| HU-07 Cambiar el estado de una incidencia | [#8](https://github.com/angugo06/incidencias-fes/issues/8) | 4 | 8 | 10/11 | 11/11 |

## Texto para el pull request

Título: `Sprint 2: Atención de la incidencia`

```text
Entrega del Sprint 2 (10 pts, 20 h). Ver docs/sprints/sprint-2.md.

Closes #6
Closes #30
Closes #31
Closes #32
Closes #33
Closes #7
Closes #34
Closes #35
Closes #36
Closes #37
Closes #38
Closes #8
Closes #39
Closes #40
Closes #41
Closes #42
Closes #43
```

## HU-05 — Consultar el detalle de una incidencia (3 pts, 6 h) · [#6](https://github.com/angugo06/incidencias-fes/issues/6)

*Como usuario de la facultad, quiero abrir una incidencia y ver todos sus datos, para conocer su situación actual.*

**Criterios de aceptación**

- GET /api/incidencias/:id devuelve datos, responsable, seguimiento y acciones permitidas.
- Un id inexistente devuelve 404 y un id inválido devuelve 400.
- La pantalla de detalle muestra los datos y se llega desde la lista.

| Tarea | Issue | Área | Horas | Estado |
|---|---|---|---:|---|
| HU-05-T1 GET /api/incidencias/:id con uniones y seguimiento | [#30](https://github.com/angugo06/incidencias-fes/issues/30) | Backend | 1 | Hecho |
| HU-05-T2 Manejo de 404 y de id inválido | [#31](https://github.com/angugo06/incidencias-fes/issues/31) | Backend | 1 | Hecho |
| HU-05-T3 Pantalla de detalle | [#32](https://github.com/angugo06/incidencias-fes/issues/32) | Frontend | 3 | Hecho |
| HU-05-T4 Pruebas del detalle | [#33](https://github.com/angugo06/incidencias-fes/issues/33) | Pruebas | 1 | Hecho |

## HU-06 — Asignar una incidencia a un responsable (3 pts, 6 h) · [#7](https://github.com/angugo06/incidencias-fes/issues/7)

*Como coordinador, quiero asignar una incidencia a una persona de mantenimiento, para que alguien sea responsable de atenderla.*

**Criterios de aceptación**

- Se puede asignar una incidencia «nueva» o «asignada» (reasignar) a un responsable activo.
- Al asignar, el estado pasa a «asignada» y se registra el evento con el nombre.
- No se asigna una incidencia ya en proceso o resuelta (409).

| Tarea | Issue | Área | Horas | Estado |
|---|---|---|---:|---|
| HU-06-T1 PATCH /api/incidencias/:id/asignacion con reglas de negocio | [#34](https://github.com/angugo06/incidencias-fes/issues/34) | Backend | 2 | Hecho |
| HU-06-T2 Registro del evento de asignación | [#35](https://github.com/angugo06/incidencias-fes/issues/35) | Backend | 1 | Hecho |
| HU-06-T3 Selector de responsable en el detalle | [#36](https://github.com/angugo06/incidencias-fes/issues/36) | Frontend | 1 | Hecho |
| HU-06-T4 Mensajes de confirmación y de error | [#37](https://github.com/angugo06/incidencias-fes/issues/37) | Frontend | 1 | Hecho |
| HU-06-T5 Pruebas de asignación y reasignación | [#38](https://github.com/angugo06/incidencias-fes/issues/38) | Pruebas | 1 | Hecho |

## HU-07 — Cambiar el estado de una incidencia (4 pts, 8 h) · [#8](https://github.com/angugo06/incidencias-fes/issues/8)

*Como personal de mantenimiento, quiero cambiar el estado de la incidencia (en proceso, resuelta), para reflejar el avance del trabajo.*

**Criterios de aceptación**

- Solo se permite asignada → en_proceso y en_proceso → resuelta; cualquier otro cambio devuelve 409.
- Cada cambio se guarda en el seguimiento con estado anterior, nuevo y nota opcional.
- El detalle solo muestra los botones de las transiciones permitidas.

| Tarea | Issue | Área | Horas | Estado |
|---|---|---|---:|---|
| HU-07-T1 Módulo de transiciones (estados.js) | [#39](https://github.com/angugo06/incidencias-fes/issues/39) | Backend | 1 | Hecho |
| HU-07-T2 PATCH /api/incidencias/:id/estado con validación | [#40](https://github.com/angugo06/incidencias-fes/issues/40) | Backend | 2 | Hecho |
| HU-07-T3 Registro del cambio en el seguimiento | [#41](https://github.com/angugo06/incidencias-fes/issues/41) | Backend | 1 | Hecho |
| HU-07-T4 Botones de estado según transiciones permitidas | [#42](https://github.com/angugo06/incidencias-fes/issues/42) | Frontend | 2 | Hecho |
| HU-07-T5 Pruebas del flujo y de transiciones inválidas | [#43](https://github.com/angugo06/incidencias-fes/issues/43) | Pruebas | 2 | Hecho |
