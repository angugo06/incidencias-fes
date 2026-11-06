-- Datos base (catálogos). Se carga siempre después del esquema.

INSERT INTO ubicaciones (nombre, tipo) VALUES
  ('Taller de cómputo',     'taller'),
  ('Taller de electrónica', 'taller'),
  ('Auditorio',             'auditorio'),
  ('Cancha de fútbol',      'cancha'),
  ('Cancha de basquetbol',  'cancha'),
  ('Explanada',             'exterior'),
  ('Librería',              'servicio'),
  ('Biblioteca',            'servicio'),
  ('Cafetería',             'servicio'),
  ('Salones (edificio A)',  'salon');

INSERT INTO categorias (clave, nombre) VALUES
  ('electrica',   'Eléctrica'),
  ('audiovisual', 'Audiovisual'),
  ('mobiliario',  'Mobiliario'),
  ('limpieza',    'Limpieza'),
  ('otra',        'Otra');

INSERT INTO responsables (nombre, correo) VALUES
  ('Luis Hernández', 'luis.hernandez@mantenimiento.example'),
  ('María Torres',   'maria.torres@mantenimiento.example'),
  ('Carlos Ramírez', 'carlos.ramirez@mantenimiento.example');
