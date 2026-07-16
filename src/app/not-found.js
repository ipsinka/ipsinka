import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        {/* Icono médico animado */}
        <div className="relative mb-8 inline-block">
          <div className="absolute inset-0 bg-green-200 dark:bg-green-900/30 rounded-full blur-3xl opacity-50 animate-pulse"></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-full p-8 shadow-2xl border-4 border-green-100 dark:border-green-900">
            <svg
              className="w-32 h-32 text-green-600 dark:text-green-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        </div>

        {/* Código de error */}
        <div className="mb-6">
          <h1 className="text-8xl md:text-9xl font-bold text-green-600 dark:text-green-500 mb-2">
            404
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
            <div className="h-1 w-12 bg-green-600 dark:bg-green-500 rounded"></div>
            <span className="text-sm font-medium">PÁGINA NO ENCONTRADA</span>
            <div className="h-1 w-12 bg-green-600 dark:bg-green-500 rounded"></div>
          </div>
        </div>

        {/* Mensaje principal */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            ¡Ups! Historia Clínica No Encontrada
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Parece que la página que buscas no está en nuestros registros
            médicos. No te preocupes, nuestro equipo está aquí para ayudarte a
            encontrar lo que necesitas.
          </p>
        </div>

        {/* Tarjetas de información médica */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="text-blue-600 dark:text-blue-400 mb-3">
              <svg
                className="w-8 h-8 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
              Diagnóstico
            </h3>
            
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="text-green-600 dark:text-green-400 mb-3">
              <svg
                className="w-8 h-8 mx-auto"
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
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
              Síntomas
            </h3>
            
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="text-purple-600 dark:text-purple-400 mb-3">
              <svg
                className="w-8 h-8 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
              Tratamiento
            </h3>
            
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Volver al Inicio
          </Link>

          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Contactar Soporte
          </Link>
        </div>

        {/* Enlaces útiles */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-medium">
            Enlaces Útiles - Consulta Rápida:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/servicios"
              className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 hover:underline transition-colors"
            >
              📋 Servicios Médicos
            </Link>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <Link
              href="/sedes"
              className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 hover:underline transition-colors"
            >
              🏥 Nuestras Sedes
            </Link>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <Link
              href="/directorio"
              className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 hover:underline transition-colors"
            >
              👨‍⚕️ Directorio Médico
            </Link>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <Link
              href="/atencion-usuario"
              className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 hover:underline transition-colors"
            >
              📞 Atención al Usuario
            </Link>
          </div>
        </div>

        {/* Mensaje de ayuda */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 max-w-2xl mx-auto">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="text-left">
              <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                ¿Necesitas ayuda personalizada?
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-400">
                Nuestro equipo de atención está disponible de lunes a viernes de
                8:00 AM a 5:00 PM. Llámanos al{" "}
                <a
                  href="tel:+573132863398"
                  className="font-bold hover:underline"
                >
                  313-286-3398
                </a>{" "}
                o escríbenos a{" "}
                <a
                  href="mailto:ipsingakamentsa@gmail.com"
                  className="font-bold hover:underline"
                >
                  ipsingakamentsa@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
