# Sprint 1 — Cimientos y registro

**Fechas:** 04/11 al 06/11 de noviembre de 2026 (3 días hábiles).
**Meta:** Poder registrar una incidencia con sus datos y verla en una lista.
**Integrante responsable:** [@angugo06](https://github.com/angugo06)
**Compromiso:** 10 puntos · 20 h de 21 h de capacidad (7 h/día).

> Estado: **Hecho**. El sprint se cerró con sus pruebas en verde (ver `contexto/ESTADO.md`).

| Historia | Issue | Puntos | Horas | Inicio | Fin |
|---|---|---:|---:|---|---|
| HT-01 Entorno y esqueleto del proyecto | [#1](https://github.com/angugo06/incidencias-fes/issues/1) | 2 | 4 | 04/11 | 04/11 |
| HU-01 Catálogos y esquema de base de datos | [#2](https://github.com/angugo06/incidencias-fes/issues/2) | 2 | 4 | 04/11 | 05/11 |
| HU-02 Registrar una incidencia | [#3](https://github.com/angugo06/incidencias-fes/issues/3) | 2 | 4 | 05/11 | 05/11 |
| HU-03 Capturar ubicación, categoría, descripción y fecha | [#4](https://github.com/angugo06/incidencias-fes/issues/4) | 2 | 4 | 05/11 | 06/11 |
| HU-04 Consultar las incidencias registradas | [#5](https://github.com/angugo06/incidencias-fes/issues/5) | 2 | 4 | 06/11 | 06/11 |

## Texto para el pull request

Título: `Sprint 1: Cimientos y registro`

```text
Entrega del Sprint 1 (10 pts, 20 h). Ver docs/sprints/sprint-1.md.

Closes #1
Closes #12
Closes #13
Closes #14
Closes #15
Closes #2
Closes #16
Closes #17
Closes #18
Closes #3
Closes #19
Closes #20
Closes #21
Closes #22
Closes #4
Closes #23
Closes #24
Closes #25
Closes #26
Closes #5
Closes #27
Closes #28
Closes #29
```

## HT-01 — Entorno y esqueleto del proyecto (2 pts, 4 h) · [#1](https://github.com/angugo06/incidencias-fes/issues/1)

*Como equipo, queremos un repositorio con API, cliente y base de datos arrancando, para empezar a construir funciones sobre una base estable.*

**Criterios de aceptación**

- El repositorio tiene las carpetas client/, server/ y db/ con su CONTEXT.md.
- docker-compose levanta PostgreSQL 16 y la API responde en /api/salud.
- El cliente React abre en el navegador y navega entre dos pantallas vacías.

| Tarea | Issue | Área | Horas | Estado |
|---|---|---|---:|---|
| HT-01-T1 Estructura del repositorio, .gitignore y .env.example | [#12](https://github.com/angugo06/incidencias-fes/issues/12) | DevOps | 1 | Hecho |
| HT-01-T2 docker-compose con PostgreSQL 16 | [#13](https://github.com/angugo06/incidencias-fes/issues/13) | DevOps | 1 | Hecho |
| HT-01-T3 Esqueleto Express: app, config, pool de pg y /api/salud | [#14](https://github.com/angugo06/incidencias-fes/issues/14) | Backend | 1 | Hecho |
| HT-01-T4 Esqueleto React (Vite), router y barra de navegación | [#15](https://github.com/angugo06/incidencias-fes/issues/15) | Frontend | 1 | Hecho |

## HU-01 — Catálogos y esquema de base de datos (2 pts, 4 h) · [#2](https://github.com/angugo06/incidencias-fes/issues/2)

*Como usuario de la facultad, quiero elegir la ubicación y la categoría de una lista válida, para que los reportes queden ordenados y comparables.*

**Criterios de aceptación**

- Existen ubicaciones (talleres, auditorio, canchas, explanada, librería, biblioteca, cafetería, salones) y las categorías eléctrica, audiovisual, mobiliario, limpieza y otra.
- El esquema incluye incidencias, seguimiento y responsables con sus llaves e índices.
- GET /api/catalogos devuelve ubicaciones, categorías, responsables y estados.

| Tarea | Issue | Área | Horas | Estado |
|---|---|---|---:|---|
| HU-01-T1 Esquema SQL: tablas, tipos enumerados, restricciones e índices | [#16](https://github.com/angugo06/incidencias-fes/issues/16) | BD | 2 | Hecho |
| HU-01-T2 Datos base (seed): ubicaciones, categorías y responsables | [#17](https://github.com/angugo06/incidencias-fes/issues/17) | BD | 1 | Hecho |
| HU-01-T3 Script db:init y endpoint GET /api/catalogos | [#18](https://github.com/angugo06/incidencias-fes/issues/18) | Backend | 1 | Hecho |

## HU-02 — Registrar una incidencia (2 pts, 4 h) · [#3](https://github.com/angugo06/incidencias-fes/issues/3)

*Como usuario de la facultad, quiero registrar una incidencia de infraestructura, para que quede constancia y se pueda atender.*

**Criterios de aceptación**

- POST /api/incidencias guarda la incidencia con folio consecutivo (INC-AAAA-0001) y estado «nueva».
- Al registrar se crea el primer evento de seguimiento en la misma transacción.
- Los errores se devuelven en un formato único con código y detalle por campo.

| Tarea | Issue | Área | Horas | Estado |
|---|---|---|---:|---|
| HU-02-T1 POST /api/incidencias con folio automático | [#19](https://github.com/angugo06/incidencias-fes/issues/19) | Backend | 1 | Hecho |
| HU-02-T2 Transacción: incidencia + evento «registro» | [#20](https://github.com/angugo06/incidencias-fes/issues/20) | Backend | 1 | Hecho |
| HU-02-T3 Manejo uniforme de errores de la API | [#21](https://github.com/angugo06/incidencias-fes/issues/21) | Backend | 1 | Hecho |
| HU-02-T4 Pruebas de la API de registro | [#22](https://github.com/angugo06/incidencias-fes/issues/22) | Pruebas | 1 | Hecho |

## HU-03 — Capturar ubicación, categoría, descripción y fecha (2 pts, 4 h) · [#4](https://github.com/angugo06/incidencias-fes/issues/4)

*Como usuario de la facultad, quiero capturar ubicación, categoría, descripción y fecha en un formulario, para describir bien el problema.*

**Criterios de aceptación**

- El formulario pide ubicación y categoría (listas), fecha (por defecto hoy) y descripción.
- No se guarda si falta un campo, la descripción tiene menos de 10 caracteres o la fecha es futura.
- Al guardar se muestra confirmación con el folio generado.

| Tarea | Issue | Área | Horas | Estado |
|---|---|---|---:|---|
| HU-03-T1 Validación en servidor (obligatorios, longitud, fecha no futura, catálogos activos) | [#23](https://github.com/angugo06/incidencias-fes/issues/23) | Backend | 1 | Hecho |
| HU-03-T2 Formulario React con selectores alimentados por /api/catalogos | [#24](https://github.com/angugo06/incidencias-fes/issues/24) | Frontend | 1 | Hecho |
| HU-03-T3 Validación en cliente y mensajes por campo | [#25](https://github.com/angugo06/incidencias-fes/issues/25) | Frontend | 1 | Hecho |
| HU-03-T4 Confirmación con folio tras guardar | [#26](https://github.com/angugo06/incidencias-fes/issues/26) | Frontend | 1 | Hecho |

## HU-04 — Consultar las incidencias registradas (2 pts, 4 h) · [#5](https://github.com/angugo06/incidencias-fes/issues/5)

*Como usuario de la facultad, quiero ver la lista de incidencias con su estado, para saber qué se ha reportado y cómo va.*

**Criterios de aceptación**

- La lista muestra folio, ubicación, categoría, descripción, estado, responsable y fecha.
- Se ordena de la más reciente a la más antigua.
- Si no hay resultados se muestra un mensaje claro.

| Tarea | Issue | Área | Horas | Estado |
|---|---|---|---:|---|
| HU-04-T1 GET /api/incidencias ordenado por fecha de registro | [#27](https://github.com/angugo06/incidencias-fes/issues/27) | Backend | 1 | Hecho |
| HU-04-T2 Tabla de incidencias con insignias de estado | [#28](https://github.com/angugo06/incidencias-fes/issues/28) | Frontend | 2 | Hecho |
| HU-04-T3 Pruebas del listado | [#29](https://github.com/angugo06/incidencias-fes/issues/29) | Pruebas | 1 | Hecho |
