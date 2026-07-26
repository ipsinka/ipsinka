-- ========================================
-- MIGRACIÓN 0002 — Campo sede_id en noticias y eventos
-- ========================================

-- Permite asociar una noticia a una sede específica (NULL = aplica a todas)
ALTER TABLE noticias ADD COLUMN sede_id INTEGER REFERENCES sedes(id);

-- Permite asociar un evento a una sede específica (NULL = aplica a todas)
ALTER TABLE eventos ADD COLUMN sede_id INTEGER REFERENCES sedes(id);

CREATE INDEX IF NOT EXISTS idx_noticias_sede ON noticias (sede_id);
CREATE INDEX IF NOT EXISTS idx_eventos_sede ON eventos (sede_id);
