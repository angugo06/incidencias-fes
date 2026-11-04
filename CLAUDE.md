# CLAUDE.md — Capa 0: ¿dónde estoy?

**Proyecto:** Incidencias FES — registrar, asignar y dar seguimiento a incidencias de infraestructura de la facultad.
**Stack:** React 18 (Vite) · Express 5 · PostgreSQL 16 · Node 22. Idioma de código, UI y docs: **español**.
**Autor:** Andre (angugo06). Eres una herramienta: no agregues atribuciones de IA en commits, PR, código ni docs.
**Repositorio:** https://github.com/angugo06/incidencias-fes (issues y GitHub Project ligados; ver `docs/github.md`).

## Qué leer primero (en orden)

1. `CONTEXT.md` — mapa: a qué carpeta ir según la tarea.
2. `contexto/ESTADO.md` — en qué sprint y estado está el proyecto.
3. El `CONTEXT.md` de la carpeta donde vas a trabajar.

No leas todo el repo; carga solo lo que la tarea requiere.

## Alcance (no ampliar sin pedirlo)

Registrar · capturar ubicación/categoría/descripción/fecha · listar · asignar a responsable · cambiar estado · detalle y seguimiento básico · filtros por estado/categoría.
**Fuera:** login/roles, fotos, correos, reportes, admin de catálogos (ver `contexto/DECISIONES.md`).

## Reglas de oro

- Una sola fuente de verdad: estados en `server/src/estados.js`, esquema en `db/schema.sql`, plan en `tools/plan.json`.
- Toda regla de negocio se valida en el servidor; el cliente solo ayuda.
- Comentarios breves y al punto (una línea; explican el porqué). Nada de código muerto.
- Cambia solo lo pedido; conserva estructura y estilo existentes.
- Si cambias comportamiento: actualiza prueba, `docs/` y `contexto/ESTADO.md` en el mismo cambio.
- Antes de dar algo por hecho: corre `npm test` y di qué se corrió y qué no.

## Comandos

| Acción | Comando |
|---|---|
| Instalar | `npm run setup` |
| BD (borra y recrea) | `npm run db:init` / `npm run db:demo` |
| Desarrollo | `npm run dev` (API :3001, cliente :5173) |
| Pruebas | `npm test` |
| Regenerar plan y Gantt | `node tools/generar-plan.mjs` |
