"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
 * Sección de publicaciones destacadas para la página de inicio.
 * Muestra las últimas publicaciones publicadas (máx. 3) e invita al
 * usuario a visitar la página completa de publicaciones.
 */
export default function PublicacionesDestacadas() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;
    const cargar = async () => {
      try {
        const res = await fetch("/api/publicaciones?estado=publicado");
        if (!res.ok) throw new Error("Error al cargar publicaciones");
        const data = await res.json();
        const lista = Array.isArray(data) ? data : (data.results ?? []);
        if (activo) setPublicaciones(lista.slice(0, 3));
      } catch {
        if (activo) setPublicaciones([]);
      } finally {
        if (activo) setCargando(false);
      }
    };
    cargar();
    return () => {
      activo = false;
    };
  }, []);

  // No renderizar la sección si no hay publicaciones que mostrar.
  if (!cargando && publicaciones.length === 0) return null;

  return (
    <section className="py-16 bg-white/45 dark:bg-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2
            className="text-4xl font-bold text-gray-800 dark:text-white mb-4"
            data-aos="fade-down"
          >
            📚 Publicaciones recientes
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Artículos, comunicados y contenidos de interés de la IPS Inga
            Kamëntsá.
          </p>
        </div>

        {cargando ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Cargando publicaciones...
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {publicaciones.map((pub) => {
              const Card = (
                <article
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full hover:shadow-xl transition-shadow"
                  data-aos="fade-up"
                >
                  {pub.imagen_portada && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={pub.imagen_portada}
                      alt={pub.titulo}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      {pub.titulo}
                    </h3>
                    {pub.resumen && (
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-1">
                        {pub.resumen}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-auto">
                      {pub.autor ? `${pub.autor} · ` : ""}
                      {formatFecha(pub.creado_en)}
                    </p>
                  </div>
                </article>
              );
              return pub.slug ? (
                <Link key={pub.id} href={`/publicaciones/${pub.slug}`}>
                  {Card}
                </Link>
              ) : (
                <div key={pub.id}>{Card}</div>
              );
            })}
          </div>
        )}

        {/* Acceso directo a todas las publicaciones */}
        <div className="text-center mt-10">
          <Link
            href="/publicaciones"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Ver todas las publicaciones
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
