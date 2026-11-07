"use client";

import Link from "next/link";
import Image from "next/image";

const sedes = [
  {
    nombre: "Sede Principal Sibundoy",
    direccion: "Diagonal al mercado municipal",
    horarios: "Lun–Vie: 8:00 AM – 5:00 PM",
    imagen: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/sedes/1.jpeg",
    coordenadas: { lat: 1.2025376, lng: -76.9180384 },
    slug: "sibundoy",
  },
  {
    nombre: "Sede Colón",
    direccion: "Barrio Centro - Cerca al Centro Cultural",
    horarios: "Lun–Vie: 8:00 AM – 5:00 PM",
    imagen: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/sedes/2.jpeg",
    coordenadas: { lat: 1.189163, lng: -76.975512 },
    slug: "colon",
  },
  {
    nombre: "Sede Santiago",
    direccion: "Sede Nazareth",
    horarios: "Lun–Vie: 8:00 AM – 5:00 PM",
    imagen: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/sedes/3.jpeg",
    coordenadas: { lat: 1.1889, lng: -76.8975 },
    slug: "santiago",
  },
  {
    nombre: "Sede San Andrés",
    direccion: "Chorro San José",
    horarios: "Lun–Vie: 8:00 AM – 5:00 PM",
    imagen: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/sedes/4.jpeg",
    coordenadas: { lat: 1.1275007, lng: -76.9908993 },
    slug: "san-andres",
  },
];

function abrirMaps(lat, lng, nombre) {
  const coords = `${lat},${lng}`;
  const query = encodeURIComponent(`${nombre}, ${coords}`);
  const isMobile = /Android|iPhone|iPad|iPod/i.test(
    typeof navigator !== "undefined" ? navigator.userAgent : ""
  );
  if (isMobile) {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
      window.location.href = `maps://maps.apple.com/?q=${query}&ll=${coords}`;
      setTimeout(() => window.open(`https://maps.google.com/maps?q=${coords}`, "_blank"), 500);
    } else {
      window.location.href = `comgooglemaps://?q=${coords}&center=${coords}&zoom=16`;
      setTimeout(() => window.open(`https://maps.google.com/maps?q=${coords}`, "_blank"), 500);
    }
  } else {
    window.open(`https://maps.google.com/maps?q=${coords}&ll=${coords}&z=16`, "_blank");
  }
}

export default function SedesPreview() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Encabezado */}
        <div className="text-center mb-10" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Contactos y Sedes
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl mx-auto">
            Encuéntranos en cuatro municipios del Valle de Sibundoy. Toca el botón
            de ubicación para abrir Google Maps y llegar fácilmente.
          </p>
        </div>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {sedes.map((sede) => (
            <div
              key={sede.slug}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col hover:shadow-md transition-shadow"
              data-aos="fade-up"
            >
              {/* Imagen */}
              <div className="relative h-40 w-full">
                <Image
                  src={sede.imagen}
                  alt={sede.nombre}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1 gap-1">
                <h3 className="font-semibold text-gray-800 dark:text-white text-sm leading-snug">
                  {sede.nombre}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-start gap-1">
                  <span className="mt-0.5">📍</span> {sede.direccion}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-start gap-1">
                  <span className="mt-0.5">🕐</span> {sede.horarios}
                </p>

                {/* Botones */}
                <div className="mt-auto pt-3 flex gap-2">
                  <button
                    onClick={() => abrirMaps(sede.coordenadas.lat, sede.coordenadas.lng, sede.nombre)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-green-700 hover:bg-green-800 text-white text-xs font-medium transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Cómo llegar
                  </button>
                  <Link
                    href={`/sedes/${sede.slug}`}
                    className="inline-flex items-center justify-center px-3 py-2 rounded-lg border border-green-700 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 text-xs font-medium transition-colors"
                  >
                    Ver más
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enlace a la página completa */}
        <div className="text-center" data-aos="fade-up">
          <Link
            href="/sedes"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-700 hover:bg-green-800 text-white font-medium text-sm transition-colors shadow-sm"
          >
            Ver Contactos y Sedes completo
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
