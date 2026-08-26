-- ========================================
-- MIGRACIÓN 0003 — Tabla slider (carrusel de presentación)
-- ========================================

-- Cada fila es un slide del carrusel principal de la página de inicio.
-- Permite editar imagen de fondo, textos, icono, gradiente y botones (CTA).
-- Los botones se guardan como JSON en la columna `botones`:
--   [{ "text": "Agendar Cita", "href": "tel:+57...", "estilo": "primary" }, ...]
CREATE TABLE IF NOT EXISTS slider (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT,
  subtitulo TEXT,
  descripcion TEXT,
  imagen_url TEXT,
  bg_color TEXT,            -- clase de gradiente Tailwind, ej: "from-green-600 to-blue-700"
  icono TEXT,               -- emoji/icono decorativo, ej: "🏥"
  icono_label TEXT,         -- texto bajo el icono
  botones TEXT,             -- JSON: array de { text, href, estilo }
  orden INTEGER NOT NULL DEFAULT 0,
  activo INTEGER NOT NULL DEFAULT 1,
  creado_en TEXT NOT NULL DEFAULT (datetime('now')),
  actualizado_en TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_slider_orden ON slider (orden);

-- Slides iniciales (equivalentes a los defaults del componente)
INSERT INTO slider (titulo, subtitulo, descripcion, imagen_url, bg_color, icono, icono_label, botones, orden)
VALUES
  (
    'Medicina Integral y Personalizada',
    'CENTRO MÉDICO ESPECIALIZADO',
    'Ofrecemos atención médica integral con un enfoque personalizado, combinando tecnología avanzada con un trato humano de calidad.',
    'https://pub-c0883d14d3e84a69bf84546fa108aa0b.r2.dev/ipsinka/portada.jpg',
    'from-green-600 to-blue-700',
    '🏥',
    'Medicina Integral',
    '[{"text":"Conocer Servicios","href":"/servicios","estilo":"primary"},{"text":"Nuestras Sedes","href":"/sedes","estilo":"secondary"}]',
    1
  ),
  (
    'Atención Médica y Odontológica',
    'Especialistas en Salud',
    'Contamos con un equipo profesional de médicos y odontólogos especializados para brindar atención integral de calidad.',
    'https://pub-c0883d14d3e84a69bf84546fa108aa0b.r2.dev/ipsinka/2.jpeg',
    'from-blue-600 to-indigo-700',
    '👨‍⚕️',
    'Médicos y Odontólogos',
    '[{"text":"Agendar Cita","href":"tel:+57842041199","estilo":"primary"},{"text":"Ver Sedes","href":"/sedes","estilo":"secondary"}]',
    2
  ),
  (
    'Medicina Preventiva',
    'Cuidado de la Salud',
    'Promovemos la medicina preventiva y el bienestar integral a través de programas de salud personalizados y seguimiento continuo.',
    'https://pub-c0883d14d3e84a69bf84546fa108aa0b.r2.dev/ipsinka/4.jpeg',
    'from-green-700 to-emerald-800',
    '💊',
    'Medicina Preventiva',
    '[{"text":"Conocer Más","href":"/servicios","estilo":"primary"},{"text":"Agendar Cita","href":"/contacto","estilo":"secondary"}]',
    3
  );
