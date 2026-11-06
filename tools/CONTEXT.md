# tools/ — Plan y prueba E2E (Capa 2)

| Archivo | Para qué |
|---|---|
| `plan.json` | **Fuente de verdad del plan**: sprints, historias, criterios, tareas, puntos y horas |
| `generar-plan.mjs` | Genera `docs/backlog.csv`, `docs/sprints/*.md`, `docs/gantt.mmd/.md`. Valida 1 punto = 2 h |
| `e2e-capturas.mjs` | Recorre el flujo completo con Playwright y genera `docs/img/*.png` |

## Flujo para cambiar el plan
1. Editar `plan.json` (mantener horas = puntos × 2 por historia).
2. `node tools/generar-plan.mjs`.
3. Regenerar el PNG del Gantt: `npx @mermaid-js/mermaid-cli@11.17.1 -i docs/gantt.mmd -o docs/gantt.png -w 1400 -s 2 -b white`.
4. Reflejar el cambio en los issues del repositorio (`docs/github.md`).

## E2E
Requiere Playwright, `npm run build`, la API en :3001 y la BD con `npm run db:demo` (el flujo crea una incidencia nueva; reinicia la BD antes de repetir).
