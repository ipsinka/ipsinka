"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

/**
 * RotatingCarousel - Componente de carrusel de imágenes con rotación automática
 *
 * @param {Array} images - Array de objetos con la configuración de cada imagen. Estructura:
 *   {
 *     url: string - URL de la imagen,
 *     alt: string - Texto alternativo,
 *     title: string (opcional) - Título de la imagen
 *   }
 * @param {number} interval - Intervalo de rotación en milisegundos (default: 5000)
 * @param {string} height - Altura del carrusel (default: "400px")
 *
 * @example
 * <RotatingCarousel
 *   images={[
 *     { url: "/imagen1.jpg", alt: "Imagen 1", title: "Título 1" },
 *     { url: "/imagen2.jpg", alt: "Imagen 2", title: "Título 2" }
 *   ]}
 *   interval={5000}
 *   height="500px"
 * />
 */
export default function RotatingCarousel({
  images = [],
  interval = 5000,
  height = "400px",
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  // Índice de la imagen maximizada a pantalla completa, o null si ninguna
  const [expandedIndex, setExpandedIndex] = useState(null);
  // El overlay se renderiza con portal a document.body; solo tras montar
  const [montado, setMontado] = useState(false);

  useEffect(() => setMontado(true), []);

  useEffect(() => {
    if (!isAutoPlaying || images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isAutoPlaying, interval, images.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Abrir la imagen a pantalla completa (por índice)
  const openExpanded = (index) => {
    setIsAutoPlaying(false);
    setExpandedIndex(index);
  };

  const closeExpanded = useCallback(() => {
    setExpandedIndex(null);
    setIsAutoPlaying(true);
  }, []);

  // Navegar dentro del overlay; sincroniza también el carrusel de fondo
  const expandedNext = useCallback(() => {
    setExpandedIndex((prev) => {
      const next = (prev + 1) % images.length;
      setCurrentIndex(next);
      return next;
    });
  }, [images.length]);

  const expandedPrev = useCallback(() => {
    setExpandedIndex((prev) => {
      const next = (prev - 1 + images.length) % images.length;
      setCurrentIndex(next);
      return next;
    });
  }, [images.length]);

  // Teclado: Escape cierra, flechas navegan mientras está expandida
  useEffect(() => {
    if (expandedIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeExpanded();
      else if (e.key === "ArrowRight") expandedNext();
      else if (e.key === "ArrowLeft") expandedPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expandedIndex, closeExpanded, expandedNext, expandedPrev]);

  if (images.length === 0) {
    return (
      <div
        className="flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg"
        style={{ height }}
      >
        <p className="text-gray-500 dark:text-gray-400">
          No hay imágenes disponibles
        </p>
      </div>
    );
  }

  const expandedImg =
    expandedIndex !== null ? images[expandedIndex] : null;

  return (
    <>
      {/* Overlay de imagen a pantalla completa.
          Se renderiza con portal a document.body para que el `fixed` se
          posicione respecto al viewport y no quede confinado por los
          `transform` que AOS aplica a los contenedores ancestros.
          Arranca debajo del navbar (top-16 = 64px) y con z-40 (< z-50 del
          navbar) para que el navbar siga visible. Fondo oscuro + blur. */}
      {montado &&
        expandedImg &&
        createPortal(
          <div
            className="fixed top-16 left-0 right-0 bottom-0 z-40 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={closeExpanded}
          >
            <div
              className="relative w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={expandedImg.url}
                alt={expandedImg.alt || "Imagen ampliada"}
                fill
                sizes="100vw"
                className="no-hover-zoom object-contain rounded-lg shadow-2xl"
                priority
              />

              {/* Título */}
              {expandedImg.title && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-5 py-2 rounded-full text-base font-medium pointer-events-none z-10">
                  {expandedImg.title}
                </div>
              )}

              {/* Contador */}
              {images.length > 1 && (
                <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-10">
                  {expandedIndex + 1} / {images.length}
                </div>
              )}

              {/* Flechas de navegación */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={expandedPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-3 hover:bg-black/75 transition-colors z-10"
                    aria-label="Imagen anterior"
                  >
                    <svg
                      className="w-7 h-7"
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
                    onClick={expandedNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-3 hover:bg-black/75 transition-colors z-10"
                    aria-label="Siguiente imagen"
                  >
                    <svg
                      className="w-7 h-7"
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
                </>
              )}

              {/* Botón cerrar */}
              <button
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/75 transition-colors z-10"
                onClick={closeExpanded}
                aria-label="Cerrar imagen"
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
          </div>,
          document.body
        )}

      <div
        className="relative overflow-hidden rounded-lg shadow-lg group"
        style={{ height }}
      >
        {/* Imágenes */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={image.url}
                alt={image.alt || `Imagen ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />

              {/* Título de la imagen */}
              {image.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 pointer-events-none">
                  <p className="text-white text-lg font-semibold text-center">
                    {image.title}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Botón de maximizar (abre la imagen actual a pantalla completa).
            En escritorio aparece al pasar el ratón sobre el carrusel; en
            móvil/tablet siempre visible. */}
        <button
          onClick={() => openExpanded(currentIndex)}
          className="boton-maximizar-pulso absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-black/50 text-white p-4 rounded-full hover:bg-black/75 transition-colors opacity-100 lg:opacity-0 lg:group-hover:opacity-100 [animation-play-state:running] hover:[animation-play-state:paused]"
          aria-label="Maximizar imagen"
          title="Ver en pantalla completa"
        >
          <svg
            className="w-9 h-9"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
        </button>

        {/* Controles de navegación - Flechas */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all z-20"
              aria-label="Imagen anterior"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all z-20"
              aria-label="Siguiente imagen"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Indicadores de posición */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-white w-8"
                    : "bg-white bg-opacity-50 hover:bg-opacity-75"
                }`}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Botón de pausa/play */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                isAutoPlaying
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-500 text-white hover:bg-gray-400"
              }`}
              aria-label={
                isAutoPlaying ? "Pausar rotación" : "Reanudar rotación"
              }
            >
              {isAutoPlaying ? "⏸ Pausa" : "▶ Auto"}
            </button>
          </div>
        )}

        {/* Contador de imágenes */}
        {images.length > 1 && (
          <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm z-20">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </>
  );
}
