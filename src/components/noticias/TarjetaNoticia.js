"use client";

import { useState } from "react";
import ModalNoticia from "./ModalNoticia";

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
 * Tarjeta de noticia con la imagen ocupando todo el fondo. Encima muestra
 * el título, una descripción breve y un botón "Leer" que abre un modal con
 * la noticia completa.
 *
 * Se usa tanto en la home (NoticiasDestacadas) como en la página /noticias.
 */
export default function TarjetaNoticia({ noticia }) {
  const [abierto, setAbierto] = useState(false);

  const fondo = noticia.imagen_url;

  return (
    <>
      <article
        className="group relative h-72 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 flex flex-col justify-end"
        data-aos="fade-up"
      >
        {/* Imagen de fondo (o degradado si no hay imagen) */}
        {fondo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={fondo}
            alt={noticia.titulo}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-blue-700" />
        )}

        {/* Capa oscura para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Contenido superpuesto */}
        <div className="relative z-10 p-5 text-white">
          {noticia.tipo === "evento" && (
            <span className="inline-block mb-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/90">
              Evento
            </span>
          )}
          <h3 className="text-xl font-bold mb-1 drop-shadow">
            {noticia.titulo}
          </h3>
          {noticia.descripcion && (
            <p className="text-sm text-gray-100 mb-3 line-clamp-2 drop-shadow">
              {noticia.descripcion}
            </p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-300">
              {formatFecha(noticia.fecha_evento || noticia.creado_en)}
            </span>
            <button
              onClick={() => setAbierto(true)}
              className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors"
            >
              Leer
            </button>
          </div>
        </div>
      </article>

      {abierto && (
        <ModalNoticia noticia={noticia} onClose={() => setAbierto(false)} />
      )}
    </>
  );
}
