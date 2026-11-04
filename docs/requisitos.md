# Requisitos

## 1. Propósito

Centralizar los reportes de problemas de infraestructura de la facultad, saber quién los atiende y en qué estado van.

## 2. Usuarios

No hay inicio de sesión (ver ADR-002). Se distinguen por uso, no por permisos:

| Rol de uso | Qué hace |
|---|---|
| Usuario de la facultad | Registra incidencias y consulta su avance |
| Coordinador | Asigna incidencias a personal de mantenimiento |
| Personal de mantenimiento | Cambia el estado y comenta |

## 3. Requisitos funcionales

| ID | Requisito | Historia | Prioridad |
|---|---|---|---|
| RF-01 | Registrar una incidencia con folio consecutivo y estado «nueva» | HU-02 | Alta |
| RF-02 | Capturar ubicación, categoría, descripción y fecha desde catálogos y validar los datos | HU-01, HU-03 | Alta |
| RF-03 | Consultar la lista de incidencias, de la más reciente a la más antigua | HU-04 | Alta |
| RF-04 | Consultar el detalle de una incidencia | HU-05 | Media |
| RF-05 | Asignar o reasignar una incidencia a un responsable | HU-06 | Media |
| RF-06 | Cambiar el estado siguiendo el flujo permitido | HU-07 | Media |
| RF-07 | Ver el seguimiento (línea de tiempo) y agregar comentarios | HU-08 | Media |
| RF-08 | Filtrar la lista por estado, por categoría o por ambos | HU-09 | Media |

## 4. Reglas de negocio

| ID | Regla |
|---|---|
| RN-01 | Estados: `nueva` → `asignada` → `en_proceso` → `resuelta`. No se salta ni se retrocede. |
| RN-02 | `nueva` ⇔ sin responsable. Asignar mueve la incidencia a `asignada`. |
| RN-03 | Solo se asigna o reasigna una incidencia `nueva` o `asignada`. |
| RN-04 | Solo se asigna a responsables activos; solo se elige entre ubicaciones activas. |
| RN-05 | La descripción lleva 10 a 1000 caracteres (sin contar espacios de los extremos). |
| RN-06 | La fecha de la incidencia es una fecha real y no puede ser futura (zona `America/Mexico_City`). |
| RN-07 | Folio: `INC-AAAA-NNNN`, consecutivo, único. |
| RN-08 | Todo cambio (registro, asignación, estado, comentario) queda en el seguimiento y no se borra. |
| RN-09 | Comentarios y notas: máximo 500 caracteres. |

## 5. Requisitos no funcionales

| ID | Requisito | Cómo se cumple |
|---|---|---|
| RNF-01 | Interfaz en español y usable en pantalla chica | CSS adaptable (`max-width: 600px`) |
| RNF-02 | Integridad de datos | Llaves foráneas, `CHECK` y transacciones |
| RNF-03 | Errores comprensibles | Formato único de error con detalle por campo |
| RNF-04 | Fácil de levantar | `docker compose` + 3 comandos npm |
| RNF-05 | Mantenible | Código corto, comentarios breves, contexto permanente en el repo |
| RNF-06 | Probado | 35 pruebas de API/unidad + 9 del cliente |
| RNF-07 | Seguro contra inyección SQL | Consultas parametrizadas; filtros validados |

## 6. Fuera de alcance

Inicio de sesión y roles, adjuntar fotos, avisos por correo, reportes/estadísticas, administración de catálogos, paginación, reabrir incidencias resueltas.

## 7. Supuestos

- Un solo despliegue para una facultad; volumen bajo (cientos de incidencias).
- Los catálogos (ubicaciones, categorías, responsables) los carga el equipo técnico con `seed.sql`.
- La red de la facultad es de confianza: la API no se expone a Internet sin autenticación (ver ADR-002).
