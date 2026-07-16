-- ========================================
-- MIGRACIÓN 0001 — Informes mensuales, eventos de calendario y rol visualizador
-- ========================================

-- Informes mensuales de entrega de documentación (MÓDULO CLAVE)
CREATE TABLE IF NOT EXISTS informes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  archivo_url TEXT NOT NULL,
  area TEXT,
  mes INTEGER NOT NULL,
  anio INTEGER NOT NULL,
  activo INTEGER NOT NULL DEFAULT 1,
  creado_en TEXT NOT NULL DEFAULT (datetime('now')),
  actualizado_en TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_informes_periodo ON informes (anio, mes);
CREATE INDEX IF NOT EXISTS idx_informes_area ON informes (area);

-- Eventos del calendario (publicados por administradores)
CREATE TABLE IF NOT EXISTS eventos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  lugar TEXT,
  fecha_inicio TEXT NOT NULL,
  fecha_fin TEXT,
  imagen_url TEXT,
  activo INTEGER NOT NULL DEFAULT 1,
  creado_en TEXT NOT NULL DEFAULT (datetime('now')),
  actualizado_en TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_eventos_fecha ON eventos (fecha_inicio);
