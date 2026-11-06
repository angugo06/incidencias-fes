// Punto de entrada: levanta la API en el puerto configurado.
import { config } from './config.js';
import { crearPool } from './db.js';
import { crearApp } from './app.js';

const pool = crearPool(config.databaseUrl);
const app = crearApp(pool, { zonaHoraria: config.zonaHoraria });

app.listen(config.puerto, () => console.log(`API en http://localhost:${config.puerto}`));
