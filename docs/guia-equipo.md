# Guía del equipo: cómo entrega cada integrante su sprint

El historial de Git debe mostrar quién hizo cada sprint. Por eso el código ya probado está partido en commits pequeños (uno por historia) dentro de la rama `plantilla-etapas`, y **cada integrante los aplica con su propia cuenta** y los envía en un pull request.

| Sprint | Integrante | Fechas | Rama de etapa (tus commits) | Rama anterior | Tu rama nueva |
|---|---|---|---|---|---|
| 1 | Andre ([@angugo06](https://github.com/angugo06)) | 4–6 nov | `etapa-1` | `etapa-0` | `sprint-1` |
| 2 | [@IanBS375](https://github.com/IanBS375) | 9–11 nov | `etapa-2` | `etapa-1` | `sprint-2` |
| 3 | [@Diegovivas12](https://github.com/Diegovivas12) | 12–17 nov | `etapa-3` | `etapa-2` | `sprint-3` |

**Orden obligatorio:** el sprint 2 se empieza cuando el PR del sprint 1 ya se fusionó en `main`; el 3, cuando se fusionó el 2. Si se hace antes, Git marca conflictos.

## Antes de empezar (una sola vez)

1. Tener cuenta de GitHub con acceso de escritura al repositorio (Andre lo da en *Settings → Collaborators*) y **aceptar la invitación** que llega al correo.
2. Instalar [Git](https://git-scm.com/downloads), [Node.js 22](https://nodejs.org/) y [Docker Desktop](https://www.docker.com/products/docker-desktop/) (la base de datos corre en Docker).
3. Abrir una terminal: en Windows, *Git Bash* (se instala con Git) o `cmd`; en Mac/Linux, Terminal. Los comandos son iguales; se pegan uno por uno.

## Pasos de cada integrante

Sustituye `N` por el número de tu sprint y usa las ramas de tu fila de la tabla.

**1. Descargar el repositorio**

```bash
git clone https://github.com/angugo06/incidencias-fes.git
cd incidencias-fes
```

**2. Decirle a Git quién eres** (esto es lo que verá el profesor en cada commit; usa el nombre y el correo de tu cuenta de GitHub)

```bash
git config user.name "Tu Nombre"
git config user.email "tu-correo@ejemplo.com"
```

Comprueba que el correo está en tu cuenta: GitHub → *Settings → Emails*. Si no quieres mostrar tu correo, usa el que aparece ahí como `ID+usuario@users.noreply.github.com`.

**3. Traer las ramas del repositorio**

```bash
git fetch origin
```

**4. Copiar los commits de tu sprint a tu rama, con tu autoría.** Sustituye `ETAPA` y `ANTERIOR` con los de tu fila (por ejemplo sprint 2: `etapa-2` y `etapa-1`):

```bash
git checkout -b sprint-N origin/ETAPA
git rebase --onto origin/main origin/ANTERIOR --exec "git commit --amend --reset-author --no-edit"
```

El segundo comando toma solo los commits que están entre `ANTERIOR` y `ETAPA` (los de tu sprint), los pone encima de `main` y a cada uno le pone tu nombre, tu correo y la fecha de hoy. Para ver el resultado: `git log --format="%h %an %ad %s" --date=short`.

**5. Verificar que todo funciona** (cada etapa trae sus pruebas)

```bash
npm run setup
docker compose up -d
npm test
```

Si `npm test` falla porque no hay base de datos, revisa [instalacion.md](instalacion.md).

**6. Subir la rama**

```bash
git push -u origin sprint-N
```

**7. Abrir el pull request** hacia `main` (GitHub muestra el botón *Compare & pull request* tras el push). Como título y descripción copia el bloque «Texto para el pull request» de [`docs/sprints/sprint-N.md`](sprints/resumen.md): las líneas `Closes #N` cierran los issues del sprint y mueven sus tarjetas a *Done* en el GitHub Project.

**8. Fusionar con *Create a merge commit*** (no *Squash* ni *Rebase*: esos dos juntan o reescriben los commits y se pierde el detalle por historia). Después se avisa al siguiente integrante.

## Después de fusionar

- Los issues del sprint quedan cerrados y las tarjetas del [GitHub Project](https://github.com/users/angugo06/projects/2) en *Done*.
- El último commit de cada etapa actualiza `contexto/ESTADO.md` y los planes de sprint, así que `main` siempre refleja el avance real.
- Si algo quedó abierto en el milestone, Actions → *Cerrar sprint* → *Run workflow* lo cierra.

## Si algo sale mal

| Síntoma | Qué hacer |
|---|---|
| `invalid upstream` o `unknown revision` | Falta `git fetch origin` (paso 3) o escribiste mal el nombre de la rama de etapa. |
| Conflictos al hacer el `rebase` | Se hizo antes de fusionar el sprint anterior. `git rebase --abort`, esperar el merge, `git fetch origin`, borrar la rama (`git checkout main` y `git branch -D sprint-N`) y repetir desde el paso 4. |
| Los commits salen con otro nombre | Faltó el paso 2 o la opción `--reset-author`. Borrar la rama y repetir desde el paso 4. |
| El commit sale sin tu foto/usuario en GitHub | El correo del paso 2 no está en tu cuenta de GitHub. |

## Cómo se armaron las etapas

`plantilla-etapas` es una rama lineal creada a partir de la versión terminada y probada del proyecto (copia completa previa en la rama `entrega-completa`). Cada commit corresponde a una historia, y cada rama de etapa (`etapa-1`, `etapa-2`, `etapa-3`) pasó sus pruebas de servidor y cliente antes de publicarse. El código de `etapa-3` es el mismo de `entrega-completa`; cambian el historial, las fechas del plan y el estado.
