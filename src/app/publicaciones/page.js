"use client";

import { useState, useEffect } from "react";
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

export default function PublicacionesPage() {
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
        if (activo) setPublicaciones(lista);
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

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-900">
      {/* Hero */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-800 dark:to-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-aos="fade-down">
              Publicaciones
            </h1>
            <p className="text-xl leading-relaxed" data-aos="fade-up">
              Artículos, comunicados y contenidos de interés de la IPS Inga
              Kamëntsá.
            </p>
          </div>
        </div>
      </section>

      {/* Listado */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {cargando ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Cargando publicaciones...
            </p>
          ) : publicaciones.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Por el momento no hay publicaciones disponibles.
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
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                        {pub.titulo}
                      </h2>
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
        </div>
      </section>
    </div>
  );
}
