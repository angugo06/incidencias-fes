-- Esquema de la BD de incidencias (PostgreSQL 16).
-- Se aplica con: npm run db:init (borra y recrea el esquema public).

-- Estados del ciclo de vida de una incidencia
CREATE TYPE estado_incidencia AS ENUM ('nueva', 'asignada', 'en_proceso', 'resuelta');

-- Tipos de evento en la línea de tiempo (seguimiento)
CREATE TYPE tipo_evento AS ENUM ('registro', 'asignacion', 'estado', 'comentario');

-- Catálogo de lugares de la facultad
CREATE TABLE ubicaciones (
  id     SERIAL PRIMARY KEY,
  nombre TEXT    NOT NULL UNIQUE,
  tipo   TEXT    NOT NULL,                 -- taller, auditorio, cancha...
  activa BOOLEAN NOT NULL DEFAULT TRUE     -- inactiva = no se puede elegir
);

-- Catálogo de categorías; "clave" es la que usan los filtros de la API
CREATE TABLE categorias (
  id     SERIAL PRIMARY KEY,
  clave  TEXT NOT NULL UNIQUE,
  nombre TEXT NOT NULL
);

-- Personal de mantenimiento al que se asignan incidencias
CREATE TABLE responsables (
  id     SERIAL PRIMARY KEY,
  nombre TEXT    NOT NULL,
  correo TEXT    NOT NULL UNIQUE,
  activo BOOLEAN NOT NULL DEFAULT TRUE
);

-- Consecutivo para el folio (INC-AAAA-0001)
CREATE SEQUENCE folio_seq;

CREATE TABLE incidencias (
  id               SERIAL PRIMARY KEY,
  folio            TEXT NOT NULL UNIQUE
                   DEFAULT ('INC-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('folio_seq')::text, 4, '0')),
  ubicacion_id     INT  NOT NULL REFERENCES ubicaciones(id),
  categoria_id     INT  NOT NULL REFERENCES categorias(id),
  descripcion      TEXT NOT NULL CHECK (char_length(btrim(descripcion)) >= 10),
  fecha_incidencia DATE NOT NULL,                       -- cuándo ocurrió (la captura el usuario)
  estado           estado_incidencia NOT NULL DEFAULT 'nueva',
  responsable_id   INT REFERENCES responsables(id),
  creada_en        TIMESTAMPTZ NOT NULL DEFAULT now(),  -- cuándo se registró
  actualizada_en   TIMESTAMPTZ NOT NULL DEFAULT now(),
  -- Invariante: "nueva" <=> sin responsable
  CONSTRAINT estado_vs_responsable CHECK ((estado = 'nueva') = (responsable_id IS NULL))
);

-- Línea de tiempo: registro, asignaciones, cambios de estado y comentarios
CREATE TABLE seguimiento (
  id              SERIAL PRIMARY KEY,
  incidencia_id   INT NOT NULL REFERENCES incidencias(id) ON DELETE CASCADE,
  tipo            tipo_evento NOT NULL,
  estado_anterior estado_incidencia,
  estado_nuevo    estado_incidencia,
  responsable_id  INT REFERENCES responsables(id),
  texto           TEXT,
  creado_en       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Índices para los filtros y el detalle
CREATE INDEX idx_incidencias_estado    ON incidencias (estado);
CREATE INDEX idx_incidencias_categoria ON incidencias (categoria_id);
CREATE INDEX idx_incidencias_creada    ON incidencias (creada_en DESC);
CREATE INDEX idx_seguimiento_incidencia ON seguimiento (incidencia_id, creado_en);
