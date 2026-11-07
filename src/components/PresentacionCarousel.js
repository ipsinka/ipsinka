"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * PresentacionCarousel - Componente de carrusel reutilizable con múltiples opciones de personalización
 *
 * @param {Array} slides - Array de objetos con la configuración de cada slide. Estructura:
 *   {
 *     id: number,
 *     title: string (opcional),
 *     subtitle: string (opcional),
 *     description: string (opcional),
 *     image: string (opcional) - URL de la imagen de fondo,
 *     bgColor: string (opcional) - Clase de gradiente de Tailwind (ej: "from-green-700 to-green-800"),
 *     icon: string (opcional) - Emoji o texto del icono,
 *     iconLabel: string (opcional) - Texto descriptivo del icono,
 *     cta: object (opcional) - Botones de llamado a la acción:
 *       {
 *         primary: { text: string, href: string },
 *         secondary: { text: string, href: string }
 *       }
 *   }
 *
 * @param {boolean} showContent - Mostrar o ocultar todo el contenido de texto y botones (default: true)
 * @param {boolean} showIcons - Mostrar o ocultar los iconos decorativos (default: true)
 * @param {boolean} showControls - Mostrar o ocultar controles de navegación y botones (default: true)
 * @param {string} height - Altura del carrusel (default: "600px")
 * @param {number} autoPlayInterval - Intervalo de auto-play en milisegundos (default: 5000)
 *
 * @example
 * // Carrusel solo con imágenes (sin texto ni controles)
 * <PresentacionCarousel
 *   slides={misImagenes}
 *   showContent={false}
 *   showControls={false}
 *   height="400px"
 * />
 *
 * @example
 * // Carrusel personalizado con slides específicas
 * const customSlides = [
 *   {
 *     id: 1,
 *     image: "/images/slide1.jpg",
 *     bgColor: "from-green-700 to-green-800",
 *   },
 *   {
 *     id: 2,
 *     image: "/images/slide2.jpg",
 *     bgColor: "from-green-700 to-green-800",
 *   }
 * ];
 * <PresentacionCarousel slides={customSlides} showContent={false} />
 */

// Degradados permitidos (todos en el verde institucional #15803d). Los slides
// guardados con degradados anteriores (azul, púrpura, etc.) se llevan al verde
// principal porque esas clases ya no se generan en el build.
const GRADIENTES_VALIDOS = [
  "from-green-700 to-green-800",
  "from-green-600 to-green-800",
  "from-green-800 to-green-950",
];

const normalizarGradiente = (valor) => {
  if (!valor) return undefined;
  return GRADIENTES_VALIDOS.includes(valor) ? valor : GRADIENTES_VALIDOS[0];
};

const defaultSlides = [
  {
    id: 1,
    title: "Medicina Integral y Personalizada",
    subtitle: "CENTRO MÉDICO ESPECIALIZADO",
    description:
      "Ofrecemos atención médica integral con un enfoque personalizado, combinando tecnología avanzada con un trato humano de calidad.",
    image:
      "https://pub-c0883d14d3e84a69bf84546fa108aa0b.r2.dev/ipsinka/portada.jpg",
    cta: {
      primary: { text: "Conocer Servicios", href: "/servicios" },
      secondary: { text: "Nuestras Sedes", href: "/sedes" },
    },
    bgColor: "from-green-700 to-green-800",
    icon: "🏥",
    iconLabel: "Medicina Integral",
  },
  {
    id: 2,
    title: "Atención Médica y Odontológica",
    subtitle: "Especialistas en Salud",
    description:
      "Contamos con un equipo profesional de médicos y odontólogos especializados para brindar atención integral de calidad.",
    image:
      "https://pub-c0883d14d3e84a69bf84546fa108aa0b.r2.dev/ipsinka/2.jpeg",
    cta: {
      primary: { text: "Agendar Cita", href: "tel:+57842041199" },
      secondary: { text: "Ver Sedes", href: "/sedes" },
    },
    bgColor: "from-green-700 to-green-800",
    icon: "👨‍⚕️",
    iconLabel: "Médicos y Odontólogos",
  },
  {
    id: 3,
    title: "Medicina Preventiva",
    subtitle: "Cuidado de la Salud",
    description:
      "Promovemos la medicina preventiva y el bienestar integral a través de programas de salud personalizados y seguimiento continuo.",
    image:
      "https://pub-c0883d14d3e84a69bf84546fa108aa0b.r2.dev/ipsinka/4.jpeg",
    cta: {
      primary: { text: "Conocer Más", href: "/servicios" },
      secondary: { text: "Agendar Cita", href: "/contacto" },
    },
    bgColor: "from-green-700 to-green-800",
    icon: "💊",
    iconLabel: "Medicina Preventiva",
  },
];

// Convierte una fila de la tabla `slider` (API) al formato interno de slide.
function mapearSlideDesdeApi(row) {
  let botones = [];
  try {
    const parsed =
      typeof row.botones === "string" ? JSON.parse(row.botones) : row.botones;
    if (Array.isArray(parsed)) botones = parsed;
  } catch {
    botones = [];
  }

  return {
    id: row.id,
    title: row.titulo ?? undefined,
    subtitle: row.subtitulo ?? undefined,
    description: row.descripcion ?? undefined,
    image: row.imagen_url ?? undefined,
    bgColor: normalizarGradiente(row.bg_color),
    icon: row.icono ?? undefined,
    iconLabel: row.icono_label ?? undefined,
    // Array de botones: { text, href, estilo }
    buttons: botones
      .filter((b) => b && b.text && b.href)
      .map((b) => ({
        text: b.text,
        href: b.href,
        estilo: b.estilo === "secondary" ? "secondary" : "primary",
      })),
  };
}

// Normaliza cualquier slide (default o de API) a un array de botones unificado.
// Mantiene compatibilidad con la antigua estructura `cta.primary/secondary`.
function obtenerBotones(slide) {
  if (Array.isArray(slide.buttons)) return slide.buttons;
  const botones = [];
  if (slide.cta?.primary) {
    botones.push({ ...slide.cta.primary, estilo: "primary" });
  }
  if (slide.cta?.secondary) {
    botones.push({ ...slide.cta.secondary, estilo: "secondary" });
  }
  return botones;
}

const slidesSinImagen = defaultSlides.map((s) => ({ ...s, image: undefined }));

export default function PresentacionCarousel({
  slides: slidesProp,
  showContent = true,
  showIcons = true,
  showControls = true,
  height = "600px",
  autoPlayInterval = 5000,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [expandedImage, setExpandedImage] = useState(null);
  // Slides cargados desde la BD (null = aún sin cargar / se usa el fallback)
  const [slidesRemotos, setSlidesRemotos] = useState(null);
  // true cuando la API ya respondió (con o sin datos)
  const [apiResuelta, setApiResuelta] = useState(false);

  // Prioridad: prop explícita > slides de la BD > slides por defecto.
  // Mientras la API no responde, el fallback se muestra sin imágenes para que
  // no aparezca un instante la foto antigua antes de la imagen administrada.
  const slides =
    slidesProp ??
    slidesRemotos ??
    (apiResuelta ? defaultSlides : slidesSinImagen);

  // Cargar los slides administrables desde la API (salvo que vengan por prop)
  useEffect(() => {
    if (slidesProp) return;
    let activo = true;
    fetch("/api/slider")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (!activo) return;
        const filas = Array.isArray(data) ? data : data.results ?? [];
        if (filas.length > 0) {
          setSlidesRemotos(filas.map(mapearSlideDesdeApi));
        }
      })
      .catch(() => {})
      .finally(() => {
        if (activo) setApiResuelta(true);
      });
    return () => {
      activo = false;
    };
  }, [slidesProp]);

  // Si el número de slides cambia, evitar índice fuera de rango
  useEffect(() => {
    setCurrentSlide((prev) => (prev >= slides.length ? 0 : prev));
  }, [slides.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleImageClick = (imageUrl) => {
    setIsAutoPlaying(false);
    setExpandedImage(imageUrl);
  };

  const handleCloseExpandedImage = () => {
    setExpandedImage(null);
    setIsAutoPlaying(true);
  };

  return (
    <div
      className="relative overflow-hidden -top-16"
      style={{ height }}
      data-aos="fade-down"
    >
      {/* Modal para imagen expandida */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center cursor-pointer"
          onClick={handleCloseExpandedImage}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            data-aos="fade-up"
          >
            <Image
              src={expandedImage}
              alt="Imagen expandida"
              className="no-hover-zoom max-w-full max-h-[90vh] "
              width={1920}
              height={1080}
              priority
            />
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
              onClick={handleCloseExpandedImage}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background image */}
          {slide.image && (
            <div
              className="absolute inset-0 cursor-zoom-in overflow-hidden"
              onClick={() => handleImageClick(slide.image)}
            >
              <Image
                src={slide.image}
                alt={slide.title ?? "Slide"}
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          )}

          {/* Background gradient overlay */}
          <div
            className={`absolute inset-0 pointer-events-none ${
              slide.image && slide.bgColor
                ? `bg-gradient-to-br ${slide.bgColor} opacity-75`
                : slide.bgColor
                ? `bg-gradient-to-br ${slide.bgColor}`
                : "bg-gray-500 opacity-30"
            }`}
          ></div>

          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>

          {/* Content */}
          {showContent && (
            <div className="relative z-10 h-full flex items-center px-6 pt-24 pb-12 sm:px-12 sm:pt-28 sm:pb-16">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Panel de texto con fondo borroso (glassmorphism) para mejorar la legibilidad */}
                  <div className="space-y-6 max-w-2xl mx-auto lg:mx-0 rounded-2xl bg-black/40 backdrop-blur-md ring-1 ring-white/10 p-6 sm:p-8 shadow-xl">
                    <div>
                      {slide.subtitle && (
                        <p className="text-base sm:text-lg font-semibold uppercase tracking-wide text-yellow-300 mb-2 drop-shadow">
                          {slide.subtitle}
                        </p>
                      )}
                      {slide.title && (
                        <h1 className="text-3xl text-white sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 sm:mb-6 drop-shadow-lg">
                          {slide.title}
                        </h1>
                      )}
                      {slide.description && (
                        <p className="text-lg text-white/95 sm:text-xl leading-relaxed drop-shadow">
                          {slide.description}
                        </p>
                      )}
                    </div>

                    {obtenerBotones(slide).length > 0 && (
                      <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                        {obtenerBotones(slide).map((boton, i) => {
                          const esPrimario = boton.estilo !== "secondary";
                          const clases = esPrimario
                            ? "inline-flex items-center justify-center px-8 py-4 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-200"
                            : "inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-colors duration-200";
                          const esTelefono = boton.href.startsWith("tel:");
                          const flecha = esPrimario && (
                            <svg
                              className="ml-2 w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={
                                  esTelefono
                                    ? "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    : "M9 5l7 7-7 7"
                                }
                              />
                            </svg>
                          );

                          return esTelefono ? (
                            <a key={i} href={boton.href} className={clases}>
                              {boton.text}
                              {flecha}
                            </a>
                          ) : (
                            <Link key={i} href={boton.href} className={clases}>
                              {boton.text}
                              {flecha}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Illustration/Icon area */}
                  {showIcons && slide.icon && (
                    <div className="hidden lg:flex justify-center items-center">
                      <div className="relative">
                        <div className="w-80 h-80 bg-white backdrop-blur-sm rounded-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-8xl mb-4">{slide.icon}</div>
                            {slide.iconLabel && (
                              <p className="text-white font-semibold text-lg">
                                {slide.iconLabel}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Floating decorative elements */}
                        <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full animate-pulse flex items-center justify-center">
                          <span className="text-2xl">✨</span>
                        </div>
                        <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-400 rounded-full animate-bounce flex items-center justify-center">
                          <span className="text-xl">⚕️</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Navigation arrows */}
      {showControls && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/70 text-white p-2 sm:p-3 rounded-full hover:bg-black/90 transition-colors z-20 border border-white/30"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/70 text-white p-2 sm:p-3 rounded-full hover:bg-black/90 transition-colors z-20 border border-white/30"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Slide indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 border border-white/60 ${
                  index === currentSlide
                    ? "bg-yellow-300 border-yellow-200"
                    : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className="absolute bottom-16 right-4 z-20">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                isAutoPlaying
                  ? "bg-green-700 text-white"
                  : "bg-gray-600 text-white hover:bg-gray-500"
              }`}
            >
              {isAutoPlaying ? "⏸️ Pausa" : "▶️ Auto"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
