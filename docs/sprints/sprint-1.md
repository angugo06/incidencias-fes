# Sprint 1 — Cimientos y registro

**Fechas:** 09/11 al 13/11 de noviembre de 2026 (5 días hábiles).
**Meta:** Poder registrar una incidencia con sus datos y verla en una lista.
**Compromiso:** 17 puntos · 34 h de 35 h de capacidad (7 h/día).

> Estado: código de este sprint implementado y verificado. Las fechas son el calendario planeado del sprint.

| Historia | Issue | Puntos | Horas | Inicio | Fin |
|---|---|---:|---:|---|---|
| HT-01 Entorno y esqueleto del proyecto | [#1](https://github.com/angugo06/incidencias-fes/issues/1) | 3 | 6 | 09/11 | 09/11 |
| HU-01 Catálogos y esquema de base de datos | [#2](https://github.com/angugo06/incidencias-fes/issues/2) | 3 | 6 | 09/11 | 10/11 |
| HU-02 Registrar una incidencia | [#3](https://github.com/angugo06/incidencias-fes/issues/3) | 4 | 8 | 10/11 | 11/11 |
| HU-03 Capturar ubicación, categoría, descripción y fecha | [#4](https://github.com/angugo06/incidencias-fes/issues/4) | 4 | 8 | 11/11 | 12/11 |
| HU-04 Consultar las incidencias registradas | [#5](https://github.com/angugo06/incidencias-fes/issues/5) | 3 | 6 | 13/11 | 13/11 |

## HT-01 — Entorno y esqueleto del proyecto (3 pts, 6 h) · [#1](https://github.com/angugo06/incidencias-fes/issues/1)

*Como equipo, queremos un repositorio con API, cliente y base de datos arrancando, para empezar a construir funciones sobre una base estable.*

**Criterios de aceptación**

- El repositorio tiene las carpetas client/, server/ y db/ con su CONTEXT.md.
- docker-compose levanta PostgreSQL 16 y la API responde en /api/salud.
- El cliente React abre en el navegador y navega entre dos pantallas vacías.

| Tarea | Issue | Área | Horas | Estado |
|---|---|---|---:|---|
| HT-01-T1 Estructura del repositorio, .gitignore y .env.example | [#12](https://github.com/angugo06/incidencias-fes/issues/12) | DevOps | 1 | Implementado |
| HT-01-T2 docker-compose con PostgreSQL 16 | [#13](https://github.com/angugo06/incidencias-fes/issues/13) | DevOps | 1 | Implementado |
| HT-01-T3 Esqueleto Express: app, config, pool de pg y /api/salud | [#14](https://github.com/angugo06/incidencias-fes/issues/14) | Backend | 2 | Implementado |
| HT-01-T4 Esqueleto React (Vite), router y barra de navegación | [#15](https://github.com/angugo06/incidencias-fes/issues/15) | Frontend | 2 | Implementado |

## HU-01 — Catálogos y esquema de base de datos (3 pts, 6 h) · [#2](https://github.com/angugo06/incidencias-fes/issues/2)

*Como usuario de la facultad, quiero elegir la ubicación y la categoría de una lista válida, para que los reportes queden ordenados y comparables.*

**Criterios de aceptación**

- Existen ubicaciones (talleres, auditorio, canchas, explanada, librería, biblioteca, cafetería, salones) y las categorías eléctrica, audiovisual, mobiliario, limpieza y otra.
- El esquema incluye incidencias, seguimiento y responsables con sus llaves e índices.
- GET /api/catalogos devuelve ubicaciones, categorías, responsables y estados.

| Tarea | Issue | Área | Horas | Estado |
|---|---|---|---:|---|
| HU-01-T1 Esquema SQL: tablas, tipos enumerados, restricciones e índices | [#16](https://github.com/angugo06/incidencias-fes/issues/16) | BD | 3 | Implementado |
| HU-01-T2 Datos base (seed): ubicaciones, categorías y responsables | [#17](https://github.com/angugo06/incidencias-fes/issues/17) | BD | 1 | Implementado |
| HU-01-T3 Script db:init y endpoint GET /api/catalogos | [#18](https://github.com/angugo06/incidencias-fes/issues/18) | Backend | 2 | Implementado |

## HU-02 — Registrar una incidencia (4 pts, 8 h) · [#3](https://github.com/angugo06/incidencias-fes/issues/3)

*Como usuario de la facultad, quiero registrar una incidencia de infraestructura, para que quede constancia y se pueda atender.*

**Criterios de aceptación**

- POST /api/incidencias guarda la incidencia con folio consecutivo (INC-AAAA-0001) y estado «nueva».
- Al registrar se crea el primer evento de seguimiento en la misma transacción.
- Los errores se devuelven en un formato único con código y detalle por campo.

| Tarea | Issue | Área | Horas | Estado |
|---|---|---|---:|---|
| HU-02-T1 POST /api/incidencias con folio automático | [#19](https://github.com/angugo06/incidencias-fes/issues/19) | Backend | 3 | Implementado |
| HU-02-T2 Transacción: incidencia + evento «registro» | [#20](https://github.com/angugo06/incidencias-fes/issues/20) | Backend | 2 | Implementado |
| HU-02-T3 Manejo uniforme de errores de la API | [#21](https://github.com/angugo06/incidencias-fes/issues/21) | Backend | 2 | Implementado |
| HU-02-T4 Pruebas de la API de registro | [#22](https://github.com/angugo06/incidencias-fes/issues/22) | Pruebas | 1 | Implementado |

## HU-03 — Capturar ubicación, categoría, descripción y fecha (4 pts, 8 h) · [#4](https://github.com/angugo06/incidencias-fes/issues/4)

*Como usuario de la facultad, quiero capturar ubicación, categoría, descripción y fecha en un formulario, para describir bien el problema.*

**Criterios de aceptación**

- El formulario pide ubicación y categoría (listas), fecha (por defecto hoy) y descripción.
- No se guarda si falta un campo, la descripción tiene menos de 10 caracteres o la fecha es futura.
- Al guardar se muestra confirmación con el folio generado.

| Tarea | Issue | Área | Horas | Estado |
|---|---|---|---:|---|
| HU-03-T1 Validación en servidor (obligatorios, longitud, fecha no futura, catálogos activos) | [#23](https://github.com/angugo06/incidencias-fes/issues/23) | Backend | 2 | Implementado |
| HU-03-T2 Formulario React con selectores alimentados por /api/catalogos | [#24](https://github.com/angugo06/incidencias-fes/issues/24) | Frontend | 3 | Implementado |
| HU-03-T3 Validación en cliente y mensajes por campo | [#25](https://github.com/angugo06/incidencias-fes/issues/25) | Frontend | 2 | Implementado |
| HU-03-T4 Confirmación con folio tras guardar | [#26](https://github.com/angugo06/incidencias-fes/issues/26) | Frontend | 1 | Implementado |

## HU-04 — Consultar las incidencias registradas (3 pts, 6 h) · [#5](https://github.com/angugo06/incidencias-fes/issues/5)

*Como usuario de la facultad, quiero ver la lista de incidencias con su estado, para saber qué se ha reportado y cómo va.*

**Criterios de aceptación**

- La lista muestra folio, ubicación, categoría, descripción, estado, responsable y fecha.
- Se ordena de la más reciente a la más antigua.
- Si no hay resultados se muestra un mensaje claro.

| Tarea | Issue | Área | Horas | Estado |
|---|---|---|---:|---|
| HU-04-T1 GET /api/incidencias ordenado por fecha de registro | [#27](https://github.com/angugo06/incidencias-fes/issues/27) | Backend | 2 | Implementado |
| HU-04-T2 Tabla de incidencias con insignias de estado | [#28](https://github.com/angugo06/incidencias-fes/issues/28) | Frontend | 3 | Implementado |
| HU-04-T3 Pruebas del listado | [#29](https://github.com/angugo06/incidencias-fes/issues/29) | Pruebas | 1 | Implementado |
