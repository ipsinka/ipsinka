"use client";

import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import TarjetaNoticia from "@/components/noticias/TarjetaNoticia";

const SLUG_A_MUNICIPIO = {
  sibundoy: "Sibundoy",
  colon: "Colón",
  santiago: "Santiago",
  "san-andres": "San Andrés",
};

function formatFecha(value) {
  if (!value) return "";
  const d = new Date(value + "T00:00:00");
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("es-CO", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

function TarjetaEvento({ evento }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm flex gap-4">
      <div className="flex-shrink-0 w-14 text-center">
        <div className="bg-green-100 dark:bg-green-900/40 rounded-lg p-2">
          <span className="text-green-700 dark:text-green-400 text-xs font-bold uppercase leading-tight block">
            {new Date(evento.fecha_inicio + "T00:00:00").toLocaleDateString("es-CO", { month: "short" })}
          </span>
          <span className="text-2xl font-bold text-green-800 dark:text-green-300 block">
            {new Date(evento.fecha_inicio + "T00:00:00").getDate()}
          </span>
        </div>
      </div>
      <div className="min-w-0">
        <h4 className="font-semibold text-gray-800 dark:text-white text-sm leading-snug mb-1">
          {evento.titulo}
        </h4>
        {evento.descripcion && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
            {evento.descripcion}
          </p>
        )}
        {evento.lugar && (
          <span className="inline-flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {evento.lugar}
          </span>
        )}
      </div>
    </div>
  );
}

export default function SedePage() {
  const { sede: slug } = useParams();
  const municipio = SLUG_A_MUNICIPIO[slug];

  const [sede, setSede] = useState(null);
  const [noticias, setNoticias] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [todasSedes, setTodasSedes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [noEncontrada, setNoEncontrada] = useState(false);

  useEffect(() => {
    if (!municipio) { setNoEncontrada(true); setCargando(false); return; }

    const hoy = new Date().toISOString().slice(0, 10);

    fetch("/api/sedes")
      .then((r) => r.ok ? r.json() : [])
      .then((lista) => {
        const todas = Array.isArray(lista) ? lista : [];
        setTodasSedes(todas);
        const encontrada = todas.find(
          (s) => s.municipio?.toLowerCase() === municipio.toLowerCase()
        );
        if (!encontrada) { setNoEncontrada(true); setCargando(false); return; }

        setSede(encontrada);

        return Promise.all([
          fetch(`/api/noticias?sede=${encontrada.id}`).then((r) => r.ok ? r.json() : []),
          fetch(`/api/eventos?sede=${encontrada.id}&desde=${hoy}`).then((r) => r.ok ? r.json() : []),
        ]);
      })
      .then((results) => {
        if (!results) return;
        const [n, e] = results;
        setNoticias((Array.isArray(n) ? n : (n?.results ?? [])).slice(0, 3));
        setEventos((Array.isArray(e) ? e : (e?.results ?? [])).slice(0, 5));
      })
      .catch(() => {})
      .finally(() => setCargando(false));
  }, [slug, municipio]);

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (noEncontrada || !sede) return notFound();

  const tieneUbicacion = sede.latitud && sede.longitud;
  const mapaUrl = tieneUbicacion
    ? `https://www.google.com/maps?q=${sede.latitud},${sede.longitud}&output=embed`
    : null;

  const otrasSedesPublicas = todasSedes.filter(
    (s) => s.id !== sede.id
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/sedes"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver a Sedes
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{sede.nombre}</h1>

            {sede.horario && (
              <p className="text-white/80 text-lg mb-6">{sede.horario}</p>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              {sede.telefono && (
                <a
                  href={`tel:${sede.telefono}`}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Llamar para Agendar Cita
                </a>
              )}
              <Link
                href="/contacto"
                className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors inline-block text-center"
              >
                Más Información
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Información principal */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contacto */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Información de Contacto
              </h2>
              <div className="space-y-4">
                {sede.direccion && (
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">Dirección</h3>
                      <p className="text-gray-600 dark:text-gray-300">{sede.direccion}</p>
                    </div>
                  </div>
                )}
                {sede.telefono && (
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">Teléfono</h3>
                      <a href={`tel:${sede.telefono}`} className="text-green-600 hover:text-green-700 dark:text-green-400">
                        {sede.telefono}
                      </a>
                    </div>
                  </div>
                )}
                {sede.email && (
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">Correo</h3>
                      <a href={`mailto:${sede.email}`} className="text-green-600 hover:text-green-700 dark:text-green-400">
                        {sede.email}
                      </a>
                    </div>
                  </div>
                )}
                {sede.horario && (
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">Horario de Atención</h3>
                      <p className="text-gray-600 dark:text-gray-300">{sede.horario}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mapa o aviso de ubicación pendiente */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden min-h-[260px] flex flex-col">
              {mapaUrl ? (
                <iframe
                  src={mapaUrl}
                  width="100%"
                  height="100%"
                  className="w-full flex-1 min-h-[260px] border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Mapa de ${sede.nombre}`}
                />
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-gray-400 dark:text-gray-500">
                  <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <p className="text-sm">Ubicación en mapa próximamente</p>
                  {sede.direccion && (
                    <p className="text-xs mt-1">{sede.direccion}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Próximos eventos de esta sede */}
      {eventos.length > 0 && (
        <section className="py-14 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Próximos Eventos en esta Sede
              </h2>
              <Link
                href="/eventos"
                className="text-sm text-green-600 dark:text-green-400 hover:underline font-medium"
              >
                Ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {eventos.map((ev) => (
                <TarjetaEvento key={ev.id} evento={ev} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Noticias de esta sede */}
      {noticias.length > 0 && (
        <section className="py-14 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Publicaciones de esta Sede
              </h2>
              <Link
                href="/noticias"
                className="text-sm text-green-600 dark:text-green-400 hover:underline font-medium"
              >
                Ver todas →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {noticias.map((n) => (
                <TarjetaNoticia key={n.id} noticia={n} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Consejo si no hay contenido propio */}
      {noticias.length === 0 && eventos.length === 0 && (
        <section className="py-10 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                Aún no hay publicaciones ni eventos asignados a esta sede. Puedes crear contenido específico para{" "}
                <strong>{sede.nombre}</strong> desde el panel administrativo.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Otras sedes */}
      {otrasSedesPublicas.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl font-bold text-center mb-10 text-gray-800 dark:text-white">
              Nuestras Otras Sedes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otrasSedesPublicas.map((otraSede) => {
                const slugOtra = Object.entries(SLUG_A_MUNICIPIO).find(
                  ([, m]) => m.toLowerCase() === otraSede.municipio?.toLowerCase()
                )?.[0];
                return (
                  <Link
                    key={otraSede.id}
                    href={slugOtra ? `/sedes/${slugOtra}` : "/sedes"}
                    className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-200 border hover:border-green-200 dark:border-gray-600"
                  >
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
                      {otraSede.nombre}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                      {otraSede.municipio}
                    </p>
                    {otraSede.horario && (
                      <p className="text-xs text-gray-400 dark:text-gray-500 mb-3 line-clamp-1">
                        {otraSede.horario}
                      </p>
                    )}
                    <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                      Ver información →
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
