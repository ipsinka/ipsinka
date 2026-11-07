import Link from "next/link";

export default function InformacionInstitucional() {
  const servicios = [
    "Medicina General",
    "Odontología",
    "Promoción y Prevención",
    "Atención Domiciliaria",
    "Consulta Externa",
    "Procedimientos Menores",
    "Medicina tradicional",
    "Psicología",
  ];

  return (
    <section
      id="institucional"
      className="py-16 bg-gradient-to-br from-green-50/20 to-green-150 dark:from-gray-800 dark:to-gray-900"
    >
      <div className="container mx-auto px-4 dark:text-gray-300 ">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">
          Información Institucional
        </h2>

        {/* Portafolio de Servicios */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border border-transparent dark:border-white dark:bg-gray-800">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center dark:text-white">
            Portafolio de Servicios
          </h3>
          <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto dark:text-white">
            Ofrecemos una amplia gama de servicios de salud diseñados para
            atender las necesidades específicas de nuestra población, combinando
            la medicina moderna con prácticas tradicionales.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {servicios.map((servicio, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-green-50 to-green-150 rounded-lg p-4 border border-green-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-700 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700 font-medium">{servicio}</span>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4 dark:text-white">
              ¿Necesita información específica sobre algún servicio?
            </p>
            <Link
              href="tel:+573132863398"
              className="inline-block bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-800 transition-colors font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contactar Ahora 📱
            </Link>
          </div> */}

        </div>
      </div>
    </section>
  );
}
