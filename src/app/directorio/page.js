import DirectorioTelefonico from "@/components/DirectorioTelefonico";

export const metadata = {
  title: "Directorio",
  description:
    "Directorio completo de contactos de todas las áreas y departamentos de IPS Salud Integral.",
};

export default function DirectorioPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-800 dark:to-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Directorio Telefónico
            </h1>
            <p className="text-xl leading-relaxed">
              Encuentre rápidamente el contacto de cualquier área, departamento
              o profesional de nuestra institución.
            </p>
          </div>
        </div>
      </section>

      <DirectorioTelefonico />

      {/* Información Útil */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
              Información Útil
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  📋 Cómo Llamar
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Marque el número directo si conoce la extensión</li>
                  <li>
                    • Use la central telefónica (420-1234) para ser transferido
                  </li>
                  <li>• Para emergencias siempre use el 420-0000</li>
                  <li>• Tenga su documento de identidad a la mano</li>
                </ul>
              </div> */}

              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  🕐 Mejores Horarios
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-white text-sm">
                  <li>• Gerencia: 10:00 AM - 12:00 PM</li>
                  <li>• Citas: 8:00 AM - 12:00 PM</li>
                  <li>• Atención al usuario: 8:00 AM - 5:00 PM</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  📝 Para Citas
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-white text-sm">
                  <li>• Use el número directo de cada sede</li>
                  <li>• Proporcione su información completa</li>
                  <li>• Indique la especialidad requerida</li>
                  <li>• Confirme la fecha y hora</li>
                </ul>
              </div>
            </div>

            {/* <div className="mt-12 bg-green-50 rounded-lg p-8 border border-green-200">
              <h3 className="text-2xl font-bold text-green-800 mb-4 text-center">
                💬 Atención en Idiomas Nativos
              </h3>
              <p className="text-green-700 text-center max-w-3xl mx-auto">
                Nuestro personal puede atenderle en español, inga y kamëntsá. No
                dude en solicitar atención en su idioma nativo al momento de
                contactarnos.
              </p>
              <div className="mt-6 text-center">
                <div className="inline-flex items-center space-x-4">
                  <span className="bg-green-600 text-white px-4 py-2 rounded-lg">
                    🇪🇸 Español
                  </span>
                  <span className="bg-green-600 text-white px-4 py-2 rounded-lg">
                    🌿 Inga
                  </span>
                  <span className="bg-green-600 text-white px-4 py-2 rounded-lg">
                    🏔️ Kamëntsá
                  </span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}
