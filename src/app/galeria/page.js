"use client";

import { useState, useEffect } from "react";
import RotatingCarousel from "@/components/RotatingCarousel";

// Imágenes de respaldo: se muestran si la BD de galería está vacía o sin conexión.
// Cada grupo equivale a una `categoria` en la tabla `galeria`.
const galeriasFallback = [
  {
    categoria: "comunidad",
    titulo: "Galería de Imágenes",
    aos: "fade-up",
    images: [
      {
        url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/comunidad/1.jpeg",
        alt: "Encuentros de Saberes 1",
        title: "Encuentros de Saberes y Prácticas Ancestrales",
      },
      {
        url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/comunidad/2.jpeg",
        alt: "Encuentros de Saberes 2",
        title: "Prácticas Tradicionales de Salud",
      },
      {
        url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/comunidad/3.jpeg",
        alt: "Encuentros de Saberes 3",
        title: "Medicina Ancestral",
      },
      {
        url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/comunidad/4.jpeg",
        alt: "Encuentros de Saberes 4",
        title: "Comunidad y Tradición",
      },
      {
        url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/comunidad/5.jpeg",
        alt: "Encuentros de Saberes 5",
        title: "Saberes Comunitarios",
      },
      {
        url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/comunidad/6.jpeg",
        alt: "Encuentros de Saberes 6",
        title: "Encuentros Culturales",
      },
      {
        url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/comunidad/7.jpeg",
        alt: "Encuentros de Saberes 7",
        title: "Medicina Tradicional Santiago",
      },
      {
        url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/comunidad/8.jpeg",
        alt: "Encuentros de Saberes 8",
        title: "Medicina Tradicional",
      },
    ],
  },
  {
    categoria: "ips",
    titulo: "Nuestra IPS",
    aos: "fade-down",
    images: [
      {
        url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/ips/1.jpeg",
        alt: "Fotos IPS Inga Kamentsa",
        title: "Farmacia Sibundoy",
      },
      {
        url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/ips/2.jpeg",
        alt: "Fotos IPS Inga Kamentsa",
        title: "Odontología",
      },
      {
        url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/ips/3.jpeg",
        alt: "Fotos IPS Inga Kamentsa",
        title: "Farmacia Colón",
      },
      {
        url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/ips/4.jpeg",
        alt: "Fotos IPS Inga Kamentsa",
        title: "Farmacia Sibundoy",
      },
      {
        url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/ips/5.jpeg",
        alt: "Fotos IPS Inga Kamentsa",
        title: "Atención médica",
      },
      {
        url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/ips/7.jpeg",
        alt: "Fotos IPS Inga Kamentsa",
        title: "Atención médica",
      },
    ],
  },
  {
    categoria: "atencion_domiciliaria",
    titulo: "Atención domiciliaria",
    aos: "fade-down",
    images: [
      {
        url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/atencion_domiciliaria/1.jpeg",
        alt: "Fotos IPS Inga Kamentsa",
        title: "Atención domiciliaria",
      },
      {
        url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/atencion_domiciliaria/2.jpeg",
        alt: "Fotos IPS Inga Kamentsa",
        title: "Atención domiciliaria",
      },
      {
        url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/atencion_domiciliaria/3.jpeg",
        alt: "Fotos IPS Inga Kamentsa",
        title: "Atención domiciliaria",
      },
    ],
  },
];

// Etiqueta legible para una categoría sin título predefinido
function tituloDeCategoria(categoria) {
  if (!categoria) return "Galería de Imágenes";
  return categoria
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Galeria() {
  const [galerias, setGalerias] = useState(galeriasFallback);

  useEffect(() => {
    let activo = true;
    const cargarGaleria = async () => {
      try {
        const res = await fetch("/api/galeria");
        if (!res.ok) throw new Error("Error al cargar galería");
        const data = await res.json();
        const lista = Array.isArray(data) ? data : (data.results ?? []);
        if (!activo || lista.length === 0) return; // Conserva el respaldo si la BD está vacía

        // Agrupar las imágenes de la BD por categoría
        const grupos = new Map();
        for (const item of lista) {
          const cat = item.categoria || "general";
          if (!grupos.has(cat)) grupos.set(cat, []);
          grupos.get(cat).push({
            url: item.imagen_url,
            alt: item.titulo,
            title: item.titulo,
          });
        }
        const mapeadas = Array.from(grupos.entries()).map(([categoria, images]) => ({
          categoria,
          titulo: tituloDeCategoria(categoria),
          aos: "fade-up",
          images,
        }));
        setGalerias(mapeadas);
      } catch {
        // Se conserva el respaldo estático
      }
    };
    cargarGaleria();
    return () => {
      activo = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-300/75 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-blue-800 dark:from-gray-800 dark:via-gray-800 dark:bg-gray-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20 dark:opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              className="text-5xl md:text-6xl font-bold mb-6"
              data-aos="fade-down"
            >
              Galería Fotográfica
            </h1>
            <p
              className="text-xl md:text-2xl mb-8 opacity-90"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Conoce nuestra institución y nuestro trabajo en la comunidad
            </p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-300/75 dark:from-gray-900 to-transparent"></div>
      </section>

      {/* Grid de galerías */}
      <section className="py-8 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galerias.map((galeria) => (
              <div key={galeria.categoria} className="py-8">
                <h2
                  className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white"
                  data-aos={galeria.aos}
                >
                  {galeria.titulo}
                </h2>
                <div data-aos="zoom-in" data-aos-delay="200">
                  <RotatingCarousel
                    images={galeria.images}
                    interval={5000}
                    height="500px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
