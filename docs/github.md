# GitHub: repositorio, issues y Project

Repositorio: https://github.com/angugo06/incidencias-fes

GitHub Project (tablero): https://github.com/users/angugo06/projects/2

El plan (`tools/plan.json`) es la fuente de verdad; cada historia y tarea tiene su issue. Este archivo se genera con `node tools/generar-plan.mjs`.

## Estructura en GitHub

| Elemento | Convención |
|---|---|
| Historia | Issue `HU-NN Título` / `HT-NN Título`, etiquetas `sprint-N`, `historia` o `tecnica`, `puntos-N` |
| Tarea | Sub-issue de su historia `HU-NN-TN Título (N h)`, etiquetas `sprint-N`, `tarea` y el área (`backend`, `frontend`, `bd`, `pruebas`, `docs`, `devops`) |
| Sprint | Etiqueta `sprint-1`, `sprint-2`, `sprint-3` y milestone `Sprint N` |
| Avance | Los issues se cierran al fusionar el PR del sprint; el progreso de sub-issues se ve en su barra |
| Ramas y PR | Una rama `sprint-N` por integrante (ver [guia-equipo.md](guia-equipo.md)); el PR cierra los issues con `Closes #N` |

## Configurar el GitHub Project (tablero)

El Project ya existe: https://github.com/users/angugo06/projects/2. Las herramientas automáticas no pueden editar Projects v2, así que se configura desde la web:

1. En el repositorio: **Projects → Link a project** (o crea uno nuevo, plantilla *Board*) y nómbralo «Incidencias FES».
2. En el proyecto: **Add item → Add items from repository** y agrega los 57 issues (o activa el flujo *Auto-add* con el filtro `is:issue repo:angugo06/incidencias-fes`).
3. Campos recomendados: **Sprint** (tipo *Iteration*; inicios el 04/11, 09/11, 12/11 de nov, 3 días hábiles cada uno), **Estimate** (número, horas) y **Points** (número).
4. Vistas: *Tablero* agrupado por **Status** (Todo, In progress, Done), *Tabla* agrupada por **Sprint** y *Roadmap* por el campo Sprint.
5. Workflows del proyecto: activar «Item closed → Status = Done» para que cerrar un issue mueva la tarjeta.

### Milestones

Ya existen y tienen asignados sus issues: [Sprint 1](https://github.com/angugo06/incidencias-fes/milestone/1) (vence 06/11/2026), [Sprint 2](https://github.com/angugo06/incidencias-fes/milestone/2) (vence 11/11/2026), [Sprint 3](https://github.com/angugo06/incidencias-fes/milestone/3) (vence 17/11/2026). Todo issue nuevo debe llevar el milestone de su sprint.

### Cierre automático de sprints

Cada sprint llega por un pull request cuyo texto lleva `Closes #N` por historia y tarea: al fusionarlo, GitHub cierra esos issues y el workflow del Project «Item closed → Done» mueve las tarjetas. [`cerrar-sprint.yml`](../.github/workflows/cerrar-sprint.yml) queda como respaldo manual (pestaña *Actions*) para cerrar lo que haya quedado abierto de un milestone.

## Issues

| Issue | Título | Tipo | Sprint | Esfuerzo |
|---|---|---|---:|---|
| [#1](https://github.com/angugo06/incidencias-fes/issues/1) | **HT-01** Entorno y esqueleto del proyecto | Historia | 1 | 2 pts / 4 h |
| [#12](https://github.com/angugo06/incidencias-fes/issues/12) | HT-01-T1 Estructura del repositorio, .gitignore y .env.example | Tarea (sub-issue de [#1](https://github.com/angugo06/incidencias-fes/issues/1)) | 1 | 1 h |
| [#13](https://github.com/angugo06/incidencias-fes/issues/13) | HT-01-T2 docker-compose con PostgreSQL 16 | Tarea (sub-issue de [#1](https://github.com/angugo06/incidencias-fes/issues/1)) | 1 | 1 h |
| [#14](https://github.com/angugo06/incidencias-fes/issues/14) | HT-01-T3 Esqueleto Express: app, config, pool de pg y /api/salud | Tarea (sub-issue de [#1](https://github.com/angugo06/incidencias-fes/issues/1)) | 1 | 1 h |
| [#15](https://github.com/angugo06/incidencias-fes/issues/15) | HT-01-T4 Esqueleto React (Vite), router y barra de navegación | Tarea (sub-issue de [#1](https://github.com/angugo06/incidencias-fes/issues/1)) | 1 | 1 h |
| [#2](https://github.com/angugo06/incidencias-fes/issues/2) | **HU-01** Catálogos y esquema de base de datos | Historia | 1 | 2 pts / 4 h |
| [#16](https://github.com/angugo06/incidencias-fes/issues/16) | HU-01-T1 Esquema SQL: tablas, tipos enumerados, restricciones e índices | Tarea (sub-issue de [#2](https://github.com/angugo06/incidencias-fes/issues/2)) | 1 | 2 h |
| [#17](https://github.com/angugo06/incidencias-fes/issues/17) | HU-01-T2 Datos base (seed): ubicaciones, categorías y responsables | Tarea (sub-issue de [#2](https://github.com/angugo06/incidencias-fes/issues/2)) | 1 | 1 h |
| [#18](https://github.com/angugo06/incidencias-fes/issues/18) | HU-01-T3 Script db:init y endpoint GET /api/catalogos | Tarea (sub-issue de [#2](https://github.com/angugo06/incidencias-fes/issues/2)) | 1 | 1 h |
| [#3](https://github.com/angugo06/incidencias-fes/issues/3) | **HU-02** Registrar una incidencia | Historia | 1 | 2 pts / 4 h |
| [#19](https://github.com/angugo06/incidencias-fes/issues/19) | HU-02-T1 POST /api/incidencias con folio automático | Tarea (sub-issue de [#3](https://github.com/angugo06/incidencias-fes/issues/3)) | 1 | 1 h |
| [#20](https://github.com/angugo06/incidencias-fes/issues/20) | HU-02-T2 Transacción: incidencia + evento «registro» | Tarea (sub-issue de [#3](https://github.com/angugo06/incidencias-fes/issues/3)) | 1 | 1 h |
| [#21](https://github.com/angugo06/incidencias-fes/issues/21) | HU-02-T3 Manejo uniforme de errores de la API | Tarea (sub-issue de [#3](https://github.com/angugo06/incidencias-fes/issues/3)) | 1 | 1 h |
| [#22](https://github.com/angugo06/incidencias-fes/issues/22) | HU-02-T4 Pruebas de la API de registro | Tarea (sub-issue de [#3](https://github.com/angugo06/incidencias-fes/issues/3)) | 1 | 1 h |
| [#4](https://github.com/angugo06/incidencias-fes/issues/4) | **HU-03** Capturar ubicación, categoría, descripción y fecha | Historia | 1 | 2 pts / 4 h |
| [#23](https://github.com/angugo06/incidencias-fes/issues/23) | HU-03-T1 Validación en servidor (obligatorios, longitud, fecha no futura, catálogos activos) | Tarea (sub-issue de [#4](https://github.com/angugo06/incidencias-fes/issues/4)) | 1 | 1 h |
| [#24](https://github.com/angugo06/incidencias-fes/issues/24) | HU-03-T2 Formulario React con selectores alimentados por /api/catalogos | Tarea (sub-issue de [#4](https://github.com/angugo06/incidencias-fes/issues/4)) | 1 | 1 h |
| [#25](https://github.com/angugo06/incidencias-fes/issues/25) | HU-03-T3 Validación en cliente y mensajes por campo | Tarea (sub-issue de [#4](https://github.com/angugo06/incidencias-fes/issues/4)) | 1 | 1 h |
| [#26](https://github.com/angugo06/incidencias-fes/issues/26) | HU-03-T4 Confirmación con folio tras guardar | Tarea (sub-issue de [#4](https://github.com/angugo06/incidencias-fes/issues/4)) | 1 | 1 h |
| [#5](https://github.com/angugo06/incidencias-fes/issues/5) | **HU-04** Consultar las incidencias registradas | Historia | 1 | 2 pts / 4 h |
| [#27](https://github.com/angugo06/incidencias-fes/issues/27) | HU-04-T1 GET /api/incidencias ordenado por fecha de registro | Tarea (sub-issue de [#5](https://github.com/angugo06/incidencias-fes/issues/5)) | 1 | 1 h |
| [#28](https://github.com/angugo06/incidencias-fes/issues/28) | HU-04-T2 Tabla de incidencias con insignias de estado | Tarea (sub-issue de [#5](https://github.com/angugo06/incidencias-fes/issues/5)) | 1 | 2 h |
| [#29](https://github.com/angugo06/incidencias-fes/issues/29) | HU-04-T3 Pruebas del listado | Tarea (sub-issue de [#5](https://github.com/angugo06/incidencias-fes/issues/5)) | 1 | 1 h |
| [#6](https://github.com/angugo06/incidencias-fes/issues/6) | **HU-05** Consultar el detalle de una incidencia | Historia | 2 | 3 pts / 6 h |
| [#30](https://github.com/angugo06/incidencias-fes/issues/30) | HU-05-T1 GET /api/incidencias/:id con uniones y seguimiento | Tarea (sub-issue de [#6](https://github.com/angugo06/incidencias-fes/issues/6)) | 2 | 1 h |
| [#31](https://github.com/angugo06/incidencias-fes/issues/31) | HU-05-T2 Manejo de 404 y de id inválido | Tarea (sub-issue de [#6](https://github.com/angugo06/incidencias-fes/issues/6)) | 2 | 1 h |
| [#32](https://github.com/angugo06/incidencias-fes/issues/32) | HU-05-T3 Pantalla de detalle | Tarea (sub-issue de [#6](https://github.com/angugo06/incidencias-fes/issues/6)) | 2 | 3 h |
| [#33](https://github.com/angugo06/incidencias-fes/issues/33) | HU-05-T4 Pruebas del detalle | Tarea (sub-issue de [#6](https://github.com/angugo06/incidencias-fes/issues/6)) | 2 | 1 h |
| [#7](https://github.com/angugo06/incidencias-fes/issues/7) | **HU-06** Asignar una incidencia a un responsable | Historia | 2 | 3 pts / 6 h |
| [#34](https://github.com/angugo06/incidencias-fes/issues/34) | HU-06-T1 PATCH /api/incidencias/:id/asignacion con reglas de negocio | Tarea (sub-issue de [#7](https://github.com/angugo06/incidencias-fes/issues/7)) | 2 | 2 h |
| [#35](https://github.com/angugo06/incidencias-fes/issues/35) | HU-06-T2 Registro del evento de asignación | Tarea (sub-issue de [#7](https://github.com/angugo06/incidencias-fes/issues/7)) | 2 | 1 h |
| [#36](https://github.com/angugo06/incidencias-fes/issues/36) | HU-06-T3 Selector de responsable en el detalle | Tarea (sub-issue de [#7](https://github.com/angugo06/incidencias-fes/issues/7)) | 2 | 1 h |
| [#37](https://github.com/angugo06/incidencias-fes/issues/37) | HU-06-T4 Mensajes de confirmación y de error | Tarea (sub-issue de [#7](https://github.com/angugo06/incidencias-fes/issues/7)) | 2 | 1 h |
| [#38](https://github.com/angugo06/incidencias-fes/issues/38) | HU-06-T5 Pruebas de asignación y reasignación | Tarea (sub-issue de [#7](https://github.com/angugo06/incidencias-fes/issues/7)) | 2 | 1 h |
| [#8](https://github.com/angugo06/incidencias-fes/issues/8) | **HU-07** Cambiar el estado de una incidencia | Historia | 2 | 4 pts / 8 h |
| [#39](https://github.com/angugo06/incidencias-fes/issues/39) | HU-07-T1 Módulo de transiciones (estados.js) | Tarea (sub-issue de [#8](https://github.com/angugo06/incidencias-fes/issues/8)) | 2 | 1 h |
| [#40](https://github.com/angugo06/incidencias-fes/issues/40) | HU-07-T2 PATCH /api/incidencias/:id/estado con validación | Tarea (sub-issue de [#8](https://github.com/angugo06/incidencias-fes/issues/8)) | 2 | 2 h |
| [#41](https://github.com/angugo06/incidencias-fes/issues/41) | HU-07-T3 Registro del cambio en el seguimiento | Tarea (sub-issue de [#8](https://github.com/angugo06/incidencias-fes/issues/8)) | 2 | 1 h |
| [#42](https://github.com/angugo06/incidencias-fes/issues/42) | HU-07-T4 Botones de estado según transiciones permitidas | Tarea (sub-issue de [#8](https://github.com/angugo06/incidencias-fes/issues/8)) | 2 | 2 h |
| [#43](https://github.com/angugo06/incidencias-fes/issues/43) | HU-07-T5 Pruebas del flujo y de transiciones inválidas | Tarea (sub-issue de [#8](https://github.com/angugo06/incidencias-fes/issues/8)) | 2 | 2 h |
| [#9](https://github.com/angugo06/incidencias-fes/issues/9) | **HU-08** Seguimiento básico con línea de tiempo | Historia | 3 | 3 pts / 6 h |
| [#44](https://github.com/angugo06/incidencias-fes/issues/44) | HU-08-T1 POST /api/incidencias/:id/comentarios | Tarea (sub-issue de [#9](https://github.com/angugo06/incidencias-fes/issues/9)) | 3 | 1 h |
| [#45](https://github.com/angugo06/incidencias-fes/issues/45) | HU-08-T2 El detalle devuelve la línea de tiempo ordenada | Tarea (sub-issue de [#9](https://github.com/angugo06/incidencias-fes/issues/9)) | 3 | 1 h |
| [#46](https://github.com/angugo06/incidencias-fes/issues/46) | HU-08-T3 Componente de línea de tiempo | Tarea (sub-issue de [#9](https://github.com/angugo06/incidencias-fes/issues/9)) | 3 | 2 h |
| [#47](https://github.com/angugo06/incidencias-fes/issues/47) | HU-08-T4 Formulario de comentario | Tarea (sub-issue de [#9](https://github.com/angugo06/incidencias-fes/issues/9)) | 3 | 1 h |
| [#48](https://github.com/angugo06/incidencias-fes/issues/48) | HU-08-T5 Pruebas de comentarios y orden | Tarea (sub-issue de [#9](https://github.com/angugo06/incidencias-fes/issues/9)) | 3 | 1 h |
| [#10](https://github.com/angugo06/incidencias-fes/issues/10) | **HU-09** Filtros sencillos por estado y categoría | Historia | 3 | 2 pts / 4 h |
| [#49](https://github.com/angugo06/incidencias-fes/issues/49) | HU-09-T1 Parámetros estado y categoría en GET /api/incidencias | Tarea (sub-issue de [#10](https://github.com/angugo06/incidencias-fes/issues/10)) | 3 | 1 h |
| [#50](https://github.com/angugo06/incidencias-fes/issues/50) | HU-09-T2 Controles de filtro en la lista | Tarea (sub-issue de [#10](https://github.com/angugo06/incidencias-fes/issues/10)) | 3 | 1 h |
| [#51](https://github.com/angugo06/incidencias-fes/issues/51) | HU-09-T3 Sincronizar filtros con la URL | Tarea (sub-issue de [#10](https://github.com/angugo06/incidencias-fes/issues/10)) | 3 | 1 h |
| [#52](https://github.com/angugo06/incidencias-fes/issues/52) | HU-09-T4 Pruebas de combinaciones de filtros | Tarea (sub-issue de [#10](https://github.com/angugo06/incidencias-fes/issues/10)) | 3 | 1 h |
| [#11](https://github.com/angugo06/incidencias-fes/issues/11) | **HT-02** Pruebas finales, documentación y cierre | Historia | 3 | 5 pts / 10 h |
| [#53](https://github.com/angugo06/incidencias-fes/issues/53) | HT-02-T1 Prueba de punta a punta del flujo completo | Tarea (sub-issue de [#11](https://github.com/angugo06/incidencias-fes/issues/11)) | 3 | 2 h |
| [#54](https://github.com/angugo06/incidencias-fes/issues/54) | HT-02-T2 Guía de usuario y referencia de la API | Tarea (sub-issue de [#11](https://github.com/angugo06/incidencias-fes/issues/11)) | 3 | 3 h |
| [#55](https://github.com/angugo06/incidencias-fes/issues/55) | HT-02-T3 Actualizar el contexto permanente | Tarea (sub-issue de [#11](https://github.com/angugo06/incidencias-fes/issues/11)) | 3 | 1 h |
| [#56](https://github.com/angugo06/incidencias-fes/issues/56) | HT-02-T4 Datos de demostración y guion de demo | Tarea (sub-issue de [#11](https://github.com/angugo06/incidencias-fes/issues/11)) | 3 | 2 h |
| [#57](https://github.com/angugo06/incidencias-fes/issues/57) | HT-02-T5 Revisión final y retrospectiva | Tarea (sub-issue de [#11](https://github.com/angugo06/incidencias-fes/issues/11)) | 3 | 2 h |
