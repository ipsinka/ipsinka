"use client";

import { useState, useEffect } from "react";

export default function ModalInstagram() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const openModal = () => {
        setIsOpen(true);
        setIsAnimating(true);
    };

    const closeModal = () => {
        setIsAnimating(false);
        // Esperar a que termine la animación de salida antes de cerrar
        setTimeout(() => {
            setIsOpen(false);
        }, 300);
    };

    // Cerrar modal con Escape
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                closeModal();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevenir scroll del body cuando el modal está abierto
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            {/* Botón que abre el modal */}
            <button
                onClick={openModal}
                className="bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700  cursor-pointer dark:bg-gray-800 border dark:border-white duration-300 transition-all hover:scale-90"
            >
                Instagram
            </button>

            {/* Modal */}
            {isOpen && (
                <div
                    className={`fixed inset-0 bg-opacity-50 flex items-center justify-center z-40 p-4 backdrop-blur-sm transition-all duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'
                        }`}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            closeModal();
                        }
                    }}
                >
                    <div
                        className={`bg-white rounded-lg max-w-md w-full p-6 shadow-xl relative z-50 transform transition-all duration-300 ${isAnimating
                                ? 'scale-100 opacity-100 translate-y-0'
                                : 'scale-95 opacity-0 translate-y-4'
                            }`}
                    >
                        {/* Header del modal */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    Instagram
                                </h3>
                            </div>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110 active:scale-95"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Contenido del modal */}
                        <div className="text-center">
                            <div className="mb-4">
                                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg
                                        className="w-8 h-8 text-pink-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                    ¡Próximamente Disponible!
                                </h4>
                                <p className="text-gray-600 mb-4">
                                    Nuestra cuenta de Instagram está en construcción.
                                    Estamos trabajando para brindarte contenido de calidad
                                    sobre nuestros servicios de salud.
                                </p>
                                <p className="text-sm text-gray-500 mb-6">
                                    Mientras tanto, puedes seguirnos en nuestras otras redes sociales
                                    o contactarnos directamente.
                                </p>
                            </div>

                            {/* Botones de acción */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={closeModal}
                                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-all duration-200 hover:scale-105 active:scale-95"
                                >
                                    Entendido
                                </button>
                                <button
                                    onClick={() => {
                                        closeModal();
                                        // Aquí podrías agregar lógica para abrir otra red social o contacto
                                    }}
                                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all duration-200 hover:scale-105 active:scale-95"
                                >
                                    Contactar Directamente
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
