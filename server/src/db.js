// Pool de conexiones a PostgreSQL.
import pg from 'pg';

// DATE (oid 1082) se entrega como texto 'AAAA-MM-DD'; evita desfases de zona horaria
pg.types.setTypeParser(1082, (v) => v);

export function crearPool(connectionString) {
  return new pg.Pool({ connectionString });
}
