"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

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

export default function PublicacionDetalle() {
  const params = useParams();
  const slug = params?.slug;
  const [publicacion, setPublicacion] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;
    const cargar = async () => {
      try {
        const res = await fetch("/api/publicaciones?estado=publicado");
        if (!res.ok) throw new Error("Error al cargar publicación");
        const data = await res.json();
        const lista = Array.isArray(data) ? data : (data.results ?? []);
        const encontrada = lista.find((p) => p.slug === slug) ?? null;
        if (activo) setPublicacion(encontrada);
      } catch {
        if (activo) setPublicacion(null);
      } finally {
        if (activo) setCargando(false);
      }
    };
    cargar();
    return () => {
      activo = false;
    };
  }, [slug]);

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400">Cargando publicación...</p>
      </div>
    );
  }

  if (!publicacion) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 dark:bg-gray-900 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Publicación no encontrada
        </h1>
        <Link
          href="/publicaciones"
          className="text-green-600 hover:text-green-800 font-semibold"
        >
          ← Volver a publicaciones
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-900">
      <article className="container mx-auto px-4 py-12 max-w-3xl">
        <Link
          href="/publicaciones"
          className="text-green-600 hover:text-green-800 font-semibold text-sm"
        >
          ← Volver a publicaciones
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-6 mb-3">
          {publicacion.titulo}
        </h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">
          {publicacion.autor ? `${publicacion.autor} · ` : ""}
          {formatFecha(publicacion.creado_en)}
        </p>

        {publicacion.imagen_portada && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={publicacion.imagen_portada}
            alt={publicacion.titulo}
            className="w-full rounded-lg mb-8 object-cover"
          />
        )}

        {/* El contenido se guarda como HTML enriquecido desde el editor del admin */}
        <div
          className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: publicacion.contenido }}
        />
      </article>
    </div>
  );
}
