// Prueba de humo de punta a punta + capturas para la guía de usuario.
// Requisitos: API corriendo en :3001 con `npm run build` hecho (sirve el cliente) y BD con --demo.
// Uso: NODE_PATH=$(npm root -g) node tools/e2e-capturas.mjs   (necesita Playwright instalado)
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';

const { chromium } = createRequire(import.meta.url)('playwright'); // respeta NODE_PATH
const BASE = process.env.BASE_URL || 'http://localhost:3001';
const IMG = new URL('../docs/img/', import.meta.url).pathname;

const browser = await chromium.launch();
// Misma zona horaria que TZ_APP del servidor (la fecha "no futura" depende de ella)
const page = await browser.newPage({ viewport: { width: 1100, height: 760 }, timezoneId: 'America/Mexico_City', locale: 'es-MX' });
const filas = () => page.locator('tbody tr').count();

// 1. Lista completa (6 de demostración)
await page.goto(BASE);
await page.waitForSelector('tbody tr');
assert.equal(await filas(), 6);
await page.screenshot({ path: `${IMG}01-lista.png` });

// 2. Filtros por estado y categoría
await page.selectOption('select >> nth=0', 'nueva');
await page.waitForFunction(() => document.querySelectorAll('tbody tr').length === 3);
await page.selectOption('select >> nth=1', 'electrica');
await page.waitForFunction(() => document.querySelectorAll('tbody tr').length === 1);
assert.match(page.url(), /estado=nueva/);
await page.screenshot({ path: `${IMG}02-filtros.png` });

// 3. Registro: primero vacío (errores), luego válido
await page.goto(`${BASE}/nueva`);
await page.click('button[type=submit]');
await page.waitForSelector('.error-campo');
assert.ok((await page.locator('.error-campo').count()) >= 3);
await page.screenshot({ path: `${IMG}03-validacion.png` });
await page.selectOption('select >> nth=0', { label: 'Taller de cómputo' });
await page.selectOption('select >> nth=1', { label: 'Audiovisual' });
await page.fill('textarea', 'El HDMI del salón A-203 no transmite imagen');
await page.screenshot({ path: `${IMG}04-formulario.png` });
await page.click('button[type=submit]');
await page.waitForSelector('.aviso-ok');
assert.match(await page.locator('h1').innerText(), /^INC-\d{4}-\d{4}$/);
await page.screenshot({ path: `${IMG}05-confirmacion.png` });

// 4. Asignar, cambiar estado y comentar
await page.selectOption('select[aria-label=Responsable]', { label: 'María Torres' });
await page.getByRole('button', { name: 'Asignar', exact: true }).click();
await page.waitForSelector('text=Responsable asignado');
await page.fill('input[aria-label="Nota del cambio de estado"]', 'Voy en camino con un cable nuevo');
await page.click('text=Iniciar trabajo');
await page.waitForSelector('text=Estado actualizado a «En proceso»');
await page.click('text=Marcar como resuelta');
await page.waitForSelector('text=Estado actualizado a «Resuelta»');
await page.fill('textarea[aria-label=Comentario]', 'Probado con el proyector, funciona.');
await page.getByRole('button', { name: 'Comentar', exact: true }).click();
await page.waitForSelector('text=Comentario agregado');
assert.equal(await page.locator('.evento').count(), 5);
assert.equal(await page.locator('text=Marcar como resuelta').count(), 0); // estado final
await page.screenshot({ path: `${IMG}06-detalle.png`, fullPage: true });

await browser.close();
console.log('E2E OK');
