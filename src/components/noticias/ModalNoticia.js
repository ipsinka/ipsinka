"use client";

import { useEffect } from "react";

function formatFecha(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Ventana modal que muestra una noticia completa (imagen, título,
 * descripción y contenido). Se cierra al hacer clic fuera, en la X o con Esc.
 */
export default function ModalNoticia({ noticia, onClose }) {
  // Cerrar con la tecla Escape y bloquear el scroll de fondo.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg"
          aria-label="Cerrar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Imagen de cabecera */}
        {noticia.imagen_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={noticia.imagen_url}
            alt={noticia.titulo}
            className="w-full h-56 md:h-64 object-cover rounded-t-xl"
          />
        )}

        <div className="p-6">
          {noticia.tipo === "evento" && (
            <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
              Evento
            </span>
          )}

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            {noticia.titulo}
          </h2>

          <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
            {formatFecha(noticia.fecha_evento || noticia.creado_en)}
          </p>

          {noticia.descripcion && (
            <p className="text-gray-700 dark:text-gray-200 font-medium mb-4">
              {noticia.descripcion}
            </p>
          )}

          {noticia.contenido && (
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {noticia.contenido}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
