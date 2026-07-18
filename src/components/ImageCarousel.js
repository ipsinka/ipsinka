"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export default function ImageCarousel({ images, title, description }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // Rotación automática de derecha a izquierda
  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(intervalRef.current);
  }, [isPaused, images.length]);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isModalOpen]);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  const goToImage = (index) => setCurrentImage(index);

  const openModal = () => { setIsPaused(true); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setIsPaused(false); };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-colors duration-200">
      {/* Image Container */}
      <div
        className="relative h-64 overflow-hidden group cursor-pointer"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => { if (!isModalOpen) setIsPaused(false); }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ${
              index === currentImage
                ? "opacity-100 translate-x-0"
                : index < currentImage
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            }`}
          >
            <Image
              width={600}
              height={400}
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
              onClick={openModal}
            />
          </div>
        ))}

        {/* Overlay hover */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          onClick={openModal}
        >
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white bg-opacity-95 rounded-full p-3 transform scale-90 group-hover:scale-100 shadow-lg border-2 border-blue-500 z-10">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>

        {/* Flechas de navegación */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors z-10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors z-10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Indicadores */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); goToImage(index); }}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentImage ? "bg-white" : "bg-white bg-opacity-50 hover:bg-opacity-75"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-6 dark:bg-gray-800 border dark:border-b-white dark:border-b-4">
        <h3 className="text-xl font-bold text-black mb-3 dark:text-white">{title}</h3>
        <p className="text-gray-900 leading-relaxed dark:text-white">{description}</p>
        {images[currentImage].description && (
          <p className="text-sm text-black mt-3 italic dark:text-white">
            {images[currentImage].description}
          </p>
        )}
      </div>

      {/* Modal — montado en document.body para evitar scroll y z-index del DOM padre */}
      {isModalOpen && createPortal(
        <div
          className="fixed inset-x-0 bottom-0 top-16 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          {/* Flecha anterior */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
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
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 z-20 shadow-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Imagen adaptada a su tamaño real */}
            <img
              src={images[currentImage].url}
              alt={images[currentImage].alt}
              className="rounded-xl shadow-2xl object-contain max-h-[80vh] w-auto max-w-full"
            />

            {/* Descripción debajo */}
            {images[currentImage].description && (
              <p className="mt-3 text-white font-semibold text-center drop-shadow">
                {images[currentImage].description}
              </p>
            )}

            {/* Indicadores */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-3">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 shadow-lg ${
                      index === currentImage ? "bg-blue-500" : "bg-white/60 hover:bg-white/90"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Flecha siguiente */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-xl transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>,
        document.body
      )}
    </div>
  );
}
