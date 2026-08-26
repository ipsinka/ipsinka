-- ========================================
-- MIGRACIÓN 0004 — password_hash opcional en usuarios
-- ========================================
--
-- La autenticación real la gestiona Clerk (por email), no contraseñas
-- propias. La columna `password_hash` quedó con restricción NOT NULL en la
-- base de datos, lo que impedía crear usuarios desde el panel /admin/usuarios.
--
-- SQLite no permite quitar un NOT NULL con ALTER COLUMN, así que se recrea la
-- tabla. Es seguro: se preservan los datos existentes copiándolos.

CREATE TABLE usuarios_nueva (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT,                       -- ahora opcional (Clerk autentica)
  rol TEXT NOT NULL DEFAULT 'editor',       -- 'admin' | 'editor' | 'visualizador'
  activo INTEGER NOT NULL DEFAULT 1,
  creado_en TEXT NOT NULL DEFAULT (datetime('now')),
  ultimo_acceso TEXT
);

INSERT INTO usuarios_nueva (id, nombre, email, password_hash, rol, activo, creado_en, ultimo_acceso)
SELECT id, nombre, email, password_hash, rol, activo, creado_en, ultimo_acceso FROM usuarios;

DROP TABLE usuarios;

ALTER TABLE usuarios_nueva RENAME TO usuarios;
