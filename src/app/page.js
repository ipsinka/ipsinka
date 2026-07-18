"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import PresentacionCarousel from "@/components/PresentacionCarousel";
import NoticiasDestacadas from "@/components/NoticiasDestacadas";
import HealthInfoSection from "@/components/HealthInfoSection";
import GlobalSearch from "@/components/GlobalSearch";
import CalendarioConsultas from "@/components/CalendarioConsultas";
import { obtenerTodasLasCitas } from "@/data/citasProduccion";

const sedesSlides = [
  {
    url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/services/col%C3%B3n_service.jpeg",
    alt: "Sede Colón",
    label: "Servicios en la sede de Colón",
  },
  {
    url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/services/santiago_servicio.jpeg",
    alt: "Sede Santiago",
    label: "Servicios en la sede de Santiago",
  },
  {
    url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/services/sibundoy_service.jpeg",
    alt: "Sede Sibundoy",
    label: "Servicios en la sede de Sibundoy",
  },
];

const consultasSlides = [
  {
    url: "https://pub-c0883d14d3e84a69bf84546fa108aa0b.r2.dev/ipsinka/consultas_medicas/1.jpeg",
    alt: "Consulta 1",
    label: "Servicios en la sede de Sibundoy",
  },
  {
    url: "https://pub-c0883d14d3e84a69bf84546fa108aa0b.r2.dev/ipsinka/consultas_medicas/2.jpeg",
    alt: "Consulta 2",
    label: "Servicios en la sede de Santiago",
  },
  {
    url: "https://pub-c0883d14d3e84a69bf84546fa108aa0b.r2.dev/ipsinka/consultas_medicas/3.jpeg",
    alt: "Consulta 3",
    label: "Servicios en la sede de Colón",
  },
  {
    url: "https://pub-c0883d14d3e84a69bf84546fa108aa0b.r2.dev/ipsinka/consultas_medicas/4.jpeg",
    alt: "Consulta 4",
    label: "Servicios en la sede de Chorro San José",
  },
];

function AutoSlider({ slides, title }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    if (paused || modal !== null) return;
    const t = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 2800);
    return () => clearInterval(t);
  }, [paused, modal, slides.length]);

  useEffect(() => {
    document.body.style.overflow = modal !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modal]);

  return (
    <section className="flex flex-col justify-center items-center transition-colors duration-200 pb-8 h-full">
      <h1 className="text-3xl font-bold my-4 dark:text-white" data-aos="fade-down">
        {title}
      </h1>

      {/* Carrusel horizontal */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="min-w-full px-4 md:px-16 lg:px-32 cursor-pointer group"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onClick={() => { setPaused(true); setModal(i); }}
            >
              <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={slide.url}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  className="no-hover-zoom object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full p-3 shadow-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-white font-semibold">{slide.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Flechas */}
        <button
          onClick={() => setCurrent((p) => (p - 1 + slides.length) % slides.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrent((p) => (p + 1) % slides.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicadores */}
        <div className="flex justify-center gap-2 mt-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-green-600" : "bg-gray-400"}`}
            />
          ))}
        </div>
      </div>

      {/* Modal — montado en document.body para evitar que el scroll del DOM padre lo afecte */}
      {modal !== null && createPortal(
        <div
          className="fixed inset-x-0 bottom-0 top-16 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => { setModal(null); setPaused(false); }}
        >
          {/* Flecha anterior */}
          <button
            onClick={(e) => { e.stopPropagation(); setModal((p) => (p - 1 + slides.length) % slides.length); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-xl transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            className="relative flex flex-col items-center px-16 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              onClick={() => { setModal(null); setPaused(false); }}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 z-20 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <img
              src={slides[modal].url}
              alt={slides[modal].alt}
              className="rounded-xl shadow-2xl object-contain max-h-[80vh] w-auto max-w-full"
            />

            <p className="mt-3 text-white font-semibold text-center drop-shadow">
              {slides[modal].label}
            </p>

            {/* Indicadores */}
            <div className="flex gap-2 mt-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setModal(i)}
                  className={`w-3 h-3 rounded-full transition-colors shadow ${i === modal ? "bg-blue-500" : "bg-white/60 hover:bg-white/90"}`}
                />
              ))}
            </div>
          </div>

          {/* Flecha siguiente */}
          <button
            onClick={(e) => { e.stopPropagation(); setModal((p) => (p + 1) % slides.length); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-xl transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>,
        document.body
      )}
    </section>
  );
}

export default function Home() {
  const [consultas, setConsultas] = useState([]);
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const citas = obtenerTodasLasCitas();
    setConsultas(citas);
    const interval = setInterval(() => {
      setConsultas(obtenerTodasLasCitas());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let activo = true;
    const cargarEventos = async () => {
      try {
        const res = await fetch("/api/eventos");
        if (!res.ok) throw new Error("Error al cargar eventos");
        const data = await res.json();
        const lista = Array.isArray(data) ? data : (data.results ?? []);
        if (activo) setEventos(lista);
      } catch {
        if (activo) setEventos([]);
      }
    };
    cargarEventos();
    return () => {
      activo = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-300/75 dark:bg-gray-900">
      <PresentacionCarousel />

      {/* Noticias publicadas por la IPS (después de las imágenes de presentación) */}
      <NoticiasDestacadas />

      <div className="flex flex-col md:flex-row bg-gray-100 dark:bg-gray-800">
        <div className="w-full md:w-1/2">
          <AutoSlider slides={sedesSlides} title="Servicios" />
        </div>
        <div className="w-full md:w-1/2">
          <AutoSlider slides={consultasSlides} title="Consulta médica" />
        </div>
      </div>

      <HealthInfoSection />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-blue-800 dark:from-gray-800 dark:via-gray-800 dark:bg-gray-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20 dark:opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              className="text-5xl md:text-6xl font-bold mb-6"
              data-aos="fade-down"
            >
              Bienvenidos a la IPS Inga Kamentsa
            </h1>
            <p
              className="text-xl md:text-2xl mb-8 opacity-90"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Tu salud es nuestra prioridad
            </p>
            <p
              className="text-lg mb-8 leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Ofrecemos servicios de salud integral con atención médica y
              odontológica de calidad para toda la comunidad
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <Link
                href="/sedes"
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
              >
                Ver Nuestras Sedes
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
      </section>

      {/* Sección del Calendario de Consultas */}
      <section className="py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              📅 Calendario de Consultas
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Consulta la disponibilidad de citas y programa tu visita.
              Selecciona un día para ver las consultas disponibles.
            </p>
          </div>
          <CalendarioConsultas consultas={consultas} eventos={eventos} />
        </div>
      </section>

      <GlobalSearch />

      {/* Services Preview */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <h2
            className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
            data-aos="fade-up"
          >
            Nuestros Servicios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div
              className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-200 flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-4"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <div className="text-4xl shrink-0">👩‍⚕️</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  Medicina General
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Atención médica integral para toda la familia
                </p>
                <Link
                  href="/servicios"
                  className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 font-semibold"
                >
                  Ver más
                </Link>
              </div>
            </div>

            <div
              className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-200 flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-4"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <div className="text-4xl shrink-0">🦷</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  Odontología
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Servicios dentales especializados y preventivos
                </p>
                <Link
                  href="/servicios"
                  className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 font-semibold"
                >
                  Ver más
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Services Info */}
      <section className="py-16 bg-white/45 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2
            className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
            data-aos="zoom-in"
          >
            ¿Por qué elegir IPS Salud Integral?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="text-4xl shrink-0">👨‍⚕️</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  Personal Calificado
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Médicos y odontólogos con experiencia comprometidos con tu salud y bienestar.
                </p>
              </div>
            </div>

            <div
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="text-4xl shrink-0">📍</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  Múltiples Sedes
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Presencia en Sibundoy, Colón, Santiago y San Andrés para estar cerca de ti.
                </p>
              </div>
            </div>

            <div
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="text-4xl shrink-0">🏥</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  Atención Integral
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Desde consulta general hasta tratamientos odontológicos especializados.
                </p>
              </div>
            </div>

            <div
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="text-4xl shrink-0">📋</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  Fácil Acceso
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Proceso de agendamiento sencillo y atención oportuna para todos nuestros pacientes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-16 bg-white/45 dark:bg-gray-800 transition-colors duration-200">
        <div className="container mx-auto px-4 dark:bg-gray-800">
          <h2
            className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
            data-aos="fade-down"
          >
            Acceso Rápido
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 dark:bg-gray-800">
            <Link
              href="/sedes"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-8 text-center hover:from-green-600 hover:to-green-700 transition-colors dark:from-gray-800 border dark:border-white"
              data-aos="flip-up"
              data-aos-delay="100"
            >
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-2xl font-bold mb-2">Nuestras Sedes</h3>
              <p className="dark:bg-gray-800">
                Encuentra la sede más cercana a ti
              </p>
            </Link>

            <Link
              href="/directorio"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-8 text-center hover:from-blue-600 hover:to-blue-700 transition-colors dark:from-gray-800 border dark:border-white"
              data-aos="flip-up"
              data-aos-delay="200"
            >
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-2xl font-bold mb-2">Directorio</h3>
              <p>Contacta a nuestro personal</p>
            </Link>

            <Link
              href="/atencion-usuario"
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-8 text-center hover:from-purple-600 hover:to-purple-700 transition-colors dark:from-gray-800 border dark:border-white"
              data-aos="flip-up"
              data-aos-delay="300"
            >
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold mb-2">PQRS</h3>
              <p>Envía tus peticiones, quejas o reclamos</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
