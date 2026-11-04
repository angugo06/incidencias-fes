# Instalación paso a paso

## Qué necesitas

| Programa | Para qué | Dónde |
|---|---|---|
| Node.js 20 o superior (LTS) | Correr API y cliente | https://nodejs.org |
| Docker Desktop | PostgreSQL sin instalarlo a mano | https://www.docker.com/products/docker-desktop |
| Git (opcional) | Clonar el repositorio | https://git-scm.com |

Si ya tienes PostgreSQL 16 instalado, no necesitas Docker (ver «Sin Docker»).

## Dónde se escriben los comandos

- **Windows:** abre la carpeta del proyecto en el Explorador, haz clic en la barra de direcciones, escribe `cmd` y presiona Enter. Se abre una ventana negra ya ubicada en la carpeta.
- **Mac/Linux:** abre «Terminal» y entra a la carpeta con `cd ruta/a/incidencias`.
- **VS Code:** menú *Terminal → Nuevo terminal* (ya queda en la carpeta).

Cada comando se escribe y se confirma con Enter. Espera a que termine antes del siguiente.

## Pasos

1. **Copiar la configuración.** Copia `.env.example` y renombra la copia a `.env`.
   - Windows (en la ventana negra): `copy .env.example .env`
   - Mac/Linux: `cp .env.example .env`
2. **Abrir Docker Desktop** y esperar a que diga «running».
3. **Levantar la base de datos:** `docker compose up -d`
4. **Instalar dependencias:** `npm run setup` (tarda unos minutos la primera vez).
5. **Crear tablas y datos de ejemplo:** `npm run db:demo`
   - Para empezar sin incidencias de ejemplo usa `npm run db:init`.
   - Ambos **borran** las tablas existentes de esa base.
6. **Arrancar:** `npm run dev`
7. Abre http://localhost:5173 en el navegador.

Para detener todo: `Ctrl + C` en la ventana. Para apagar la base de datos: `docker compose down`.

## Sin Docker

1. Crea en tu PostgreSQL un usuario y dos bases: `incidencias` e `incidencias_test`.
2. En `.env` ajusta `DATABASE_URL` y `TEST_DATABASE_URL` con tus datos: `postgres://usuario:clave@localhost:5432/incidencias`.
3. Continúa desde el paso 4.

## Versión de producción (un solo puerto)

```bash
npm run build   # compila el cliente a client/dist
npm start       # la API sirve también el cliente en http://localhost:3001
```

## Pruebas

```bash
npm test                    # API + cliente
npm --prefix server test    # solo API (necesita la BD incidencias_test)
npm --prefix client test    # solo cliente
```

## Problemas frecuentes

| Síntoma | Causa y solución |
|---|---|
| `ECONNREFUSED 127.0.0.1:5432` | PostgreSQL no está corriendo. Abre Docker Desktop y repite `docker compose up -d`. |
| `password authentication failed` | `DATABASE_URL` en `.env` no coincide con el usuario/clave de PostgreSQL. |
| `database "incidencias_test" does not exist` | Si la BD ya existía antes de usar el compose, créala: `docker compose exec db psql -U incidencias -c "CREATE DATABASE incidencias_test"`. |
| La página abre pero no carga datos | La API no está corriendo; revisa que `npm run dev` muestre «API en http://localhost:3001». |
| Puerto 5173 o 3001 ocupado | Cierra el otro programa o cambia `PORT` en `.env`. |
| «La fecha no puede ser futura» al registrar | La hora del equipo o su zona horaria difiere de `TZ_APP`. Revisa fecha y zona del sistema. |
