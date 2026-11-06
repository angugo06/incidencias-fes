// Configuración leída de variables de entorno (.env en la raíz del proyecto).
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

dotenv.config({ path: fileURLToPath(new URL('../../.env', import.meta.url)) });

export const config = {
  puerto: Number(process.env.PORT) || 3001,
  databaseUrl:
    process.env.DATABASE_URL || 'postgres://incidencias:incidencias@localhost:5432/incidencias',
  testDatabaseUrl:
    process.env.TEST_DATABASE_URL ||
    'postgres://incidencias:incidencias@localhost:5432/incidencias_test',
  zonaHoraria: process.env.TZ_APP || 'America/Mexico_City',
};
