"use client";

import { useState, useEffect } from "react";
import TarjetaNoticia from "@/components/noticias/TarjetaNoticia";

export default function NoticiasPage() {
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;
    const cargarNoticias = async () => {
      try {
        const res = await fetch("/api/noticias");
        if (!res.ok) throw new Error("Error al cargar noticias");
        const data = await res.json();
        const lista = Array.isArray(data) ? data : (data.results ?? []);
        if (activo) setNoticias(lista);
      } catch {
        if (activo) setNoticias([]);
      } finally {
        if (activo) setCargando(false);
      }
    };
    cargarNoticias();
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
              Noticias y Anuncios
            </h1>
            <p className="text-xl leading-relaxed" data-aos="fade-up">
              Mantente informado sobre las novedades, eventos y comunicados de la
              IPS Inga Kamëntsá.
            </p>
          </div>
        </div>
      </section>

      {/* Listado */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {cargando ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Cargando noticias...
            </p>
          ) : noticias.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Por el momento no hay noticias publicadas.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {noticias.map((noticia) => (
                <TarjetaNoticia key={noticia.id} noticia={noticia} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
