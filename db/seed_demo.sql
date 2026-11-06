-- Datos de demostración (opcional): npm run db:demo
-- Deja incidencias en todos los estados para probar filtros y seguimiento.

INSERT INTO incidencias (ubicacion_id, categoria_id, descripcion, fecha_incidencia, estado, responsable_id, creada_en, actualizada_en) VALUES
  (10, 2, 'El cable HDMI del salón A-203 no transmite imagen al proyector.',   CURRENT_DATE - 6, 'resuelta',   1, now() - interval '6 days', now() - interval '4 days'),
  (1,  1, 'Dos contactos de la fila 3 no tienen corriente.',                   CURRENT_DATE - 4, 'en_proceso', 2, now() - interval '4 days', now() - interval '2 days'),
  (3,  2, 'El micrófono inalámbrico del auditorio se corta a los pocos minutos.', CURRENT_DATE - 3, 'asignada',   3, now() - interval '3 days', now() - interval '1 day'),
  (9,  3, 'Faltan cuatro sillas y una mesa está coja en la zona de la ventana.', CURRENT_DATE - 2, 'nueva',      NULL, now() - interval '2 days', now() - interval '2 days'),
  (6,  4, 'Hay basura acumulada junto a las bancas de la explanada.',          CURRENT_DATE - 1, 'nueva',      NULL, now() - interval '1 day',  now() - interval '1 day'),
  (4,  1, 'Dos reflectores de la cancha no encienden por la noche.',           CURRENT_DATE,     'nueva',      NULL, now(), now());

INSERT INTO seguimiento (incidencia_id, tipo, estado_anterior, estado_nuevo, responsable_id, texto, creado_en) VALUES
  (1, 'registro',   NULL,        'nueva',      NULL, 'Incidencia registrada',               now() - interval '6 days'),
  (1, 'asignacion', 'nueva',     'asignada',   1,    'Asignada a Luis Hernández',           now() - interval '5 days'),
  (1, 'estado',     'asignada',  'en_proceso', NULL, 'Reviso el cable',                     now() - interval '5 days'),
  (1, 'estado',     'en_proceso','resuelta',   NULL, 'Se cambió el cable HDMI',             now() - interval '4 days'),
  (2, 'registro',   NULL,        'nueva',      NULL, 'Incidencia registrada',               now() - interval '4 days'),
  (2, 'asignacion', 'nueva',     'asignada',   2,    'Asignada a María Torres',             now() - interval '3 days'),
  (2, 'estado',     'asignada',  'en_proceso', NULL, 'Falta un interruptor, ya se pidió',   now() - interval '2 days'),
  (3, 'registro',   NULL,        'nueva',      NULL, 'Incidencia registrada',               now() - interval '3 days'),
  (3, 'asignacion', 'nueva',     'asignada',   3,    'Asignada a Carlos Ramírez',           now() - interval '1 day'),
  (4, 'registro',   NULL,        'nueva',      NULL, 'Incidencia registrada',               now() - interval '2 days'),
  (5, 'registro',   NULL,        'nueva',      NULL, 'Incidencia registrada',               now() - interval '1 day'),
  (6, 'registro',   NULL,        'nueva',      NULL, 'Incidencia registrada',               now());
