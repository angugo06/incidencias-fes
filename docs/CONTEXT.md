# docs/ — Documentación (Capa 3 y 4)

**Propósito:** documentación para usuarios, equipo y planeación.

| Archivo | Tipo | Se actualiza cuando… |
|---|---|---|
| `requisitos.md` | Referencia | cambia el alcance o una regla |
| `guia-usuario.md` + `img/` | Referencia | cambia una pantalla (regenerar capturas con `tools/e2e-capturas.mjs`) |
| `arquitectura.md` | Referencia | cambia la estructura o una decisión técnica |
| `api.md` | Referencia | cambia un endpoint |
| `base-de-datos.md` | Referencia | cambia el esquema |
| `instalacion.md`, `pruebas.md` | Referencia | cambian pasos o pruebas |
| `sprints/*.md`, `backlog.csv`, `gantt.*` | **Generados** | editar `tools/plan.json` y correr `node tools/generar-plan.mjs` |
| `github.md` | Enlace con GitHub | cambian issues, etiquetas o el Project |
| `guia-equipo.md` | Procedimiento | cambia cómo se entrega un sprint |

No editar a mano los archivos generados. Estilo: ver `contexto/CONVENCIONES.md`.
