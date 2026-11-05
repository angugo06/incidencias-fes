# Diagrama de Gantt

Calendario de los 3 sprints (3 días hábiles cada uno, 7 h productivas por día). El 16 de noviembre es feriado y se excluye.
Las historias de cada sprint van en secuencia; una historia puede compartir día con la anterior. El archivo fuente es `gantt.mmd`.

```mermaid
gantt
    title Incidencias FES: 3 sprints de 3 días hábiles (nov 2026)
    dateFormat YYYY-MM-DD
    axisFormat %d/%m
    excludes weekends, 2026-11-16
    todayMarker off
    section Sprint 1 Cimientos y registro
    HT-01 Entorno y esqueleto del proyecto (2 pts) :ht-01, 2026-11-09, 1d
    HU-01 Catálogos y esquema de base de datos (2 pts) :hu-01, 2026-11-09, 2d
    HU-02 Registrar una incidencia (2 pts) :hu-02, 2026-11-10, 1d
    HU-03 Capturar ubicación, categoría, descripción y fecha (2 pts) :hu-03, 2026-11-10, 2d
    HU-04 Consultar las incidencias registradas (2 pts) :hu-04, 2026-11-11, 1d
    Revisión y retrospectiva S1 :milestone, 2026-11-11, 0d
    section Sprint 2 Atención de la incidencia
    HU-05 Consultar el detalle de una incidencia (3 pts) :hu-05, 2026-11-12, 1d
    HU-06 Asignar responsable (3 pts) :hu-06, 2026-11-12, 2d
    HU-07 Cambiar estado (4 pts) :hu-07, 2026-11-13, 2d
    Revisión y retrospectiva S2 :milestone, 2026-11-17, 0d
    section Sprint 3 Seguimiento, filtros y cierre
    HU-08 Seguimiento básico con línea de tiempo (3 pts) :hu-08, 2026-11-18, 1d
    HU-09 Filtros sencillos por estado y categoría (2 pts) :hu-09, 2026-11-18, 2d
    HT-02 Pruebas y cierre (5 pts) :ht-02, 2026-11-19, 2d
    Revisión y retrospectiva S3 :milestone, 2026-11-20, 0d
```

![Gantt](gantt.png)

| Sprint | Fechas | Meta | Historias | Puntos | Horas |
|---|---|---|---|---:|---:|
| [1 — Cimientos y registro](sprints/sprint-1.md) | 09/11–11/11 | Poder registrar una incidencia con sus datos y verla en una lista. | HT-01, HU-01, HU-02, HU-03, HU-04 | 10 | 20 |
| [2 — Atención de la incidencia](sprints/sprint-2.md) | 12/11–17/11 | Consultar el detalle, asignar un responsable y llevar la incidencia por sus estados. | HU-05, HU-06, HU-07 | 10 | 20 |
| [3 — Seguimiento, filtros y cierre](sprints/sprint-3.md) | 18/11–20/11 | Seguimiento con comentarios, filtros por estado y categoría, pruebas y documentación final. | HU-08, HU-09, HT-02 | 10 | 20 |
| **Total** | | | 11 | 30 | 60 |
