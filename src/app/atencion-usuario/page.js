import AtencionUsuario from "@/components/AtencionUsuario";
import Link from "next/link";
import ContactoSedes from "@/components/ContactoSedes";
import ModalInstagram from "@/components/ModalInstagram";

export const metadata = {
  title: "Atención al Usuario",
  description:
    "Área de Atención al Usuario: PQRSF, información de contacto, Asociación de Usuarios y canales de comunicación de la IPS INGA KAMËNTSÁ.",
};

export default function AtencionUsuarioPage() {
  return (
    <div className="min-h-screen bg-white/55 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-800 dark:from-green-800 dark:to-green-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Atención al Usuario
            </h1>
            <p className="text-xl leading-relaxed">
              Estamos comprometidos con brindarle la mejor atención. Aquí puede
              enviar sus peticiones, quejas, reclamos, sugerencias y
              felicitaciones.
            </p>
          </div>
        </div>
      </section>

      {/* PQRSF Info */}
      <section className="py-12 bg-green-50/55 dark:bg-green-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-green-800 dark:text-green-300">
              ¿Qué es PQRSF?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center shadow-lg">
                <div className="text-3xl mb-3">📝</div>
                <h3 className="font-bold text-green-800 dark:text-green-300 mb-2">
                  Peticiones
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Solicitudes de información, documentos o servicios
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center shadow-lg">
                <div className="text-3xl mb-3">😞</div>
                <h3 className="font-bold text-green-800 dark:text-green-300 mb-2">
                  Quejas
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Manifestaciones de insatisfacción con el servicio
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center shadow-lg">
                <div className="text-3xl mb-3">⚠️</div>
                <h3 className="font-bold text-green-800 dark:text-green-300 mb-2">
                  Reclamos
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Manifestaciones sobre presunta falta de calidad
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center shadow-lg">
                <div className="text-3xl mb-3">💡</div>
                <h3 className="font-bold text-green-800 dark:text-green-300 mb-2">
                  Sugerencias
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Propuestas para mejorar nuestros servicios
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center shadow-lg">
                <div className="text-3xl mb-3">👏</div>
                <h3 className="font-bold text-green-800 dark:text-green-300 mb-2">
                  Felicitaciones
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Reconocimientos por la calidad del servicio
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AtencionUsuario />

      {/* Proceso PQRSF */}
      <section className="py-16 bg-white/75 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
              Proceso de Atención PQRSF
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">1️⃣</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                  Recepción
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Recibimos su PQRSF y le asignamos un número de radicado
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">2️⃣</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                  Análisis
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Analizamos su caso y lo direccionamos al área competente
                </p>
              </div>

              <div className="text-center">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">3️⃣</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                  Gestión
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  El área responsable gestiona y busca la solución apropiada
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">4️⃣</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                  Respuesta
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Le enviamos la respuesta en máximo 15 días hábiles
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Canales de Comunicación */}
      <section className="py-16 bg-gray-50/55 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
              Otros Canales de Comunicación
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {/* <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  Línea Telefónica
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Atención directa por teléfono
                </p>
                <Link
                  href="tel:+573132863398"
                  className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800  inline-block dark:bg-gray-800 border dark:border-white hover:scale-90 transition-all duration-300"
                >
                  3132863398
                </Link>
              </div> */}

              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4">📧</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  Correo Electrónico
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Envíenos sus consultas por email
                </p>
                <Link
                  href="mailto:contacto@ipsinka.com"
                  className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800  inline-block dark:bg-gray-800 border dark:border-white hover:scale-90 transition-all duration-300"
                >
                  Escribir Email
                </Link>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4">🏢</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  Presencial
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Visítenos en cualquiera de nuestras sedes
                </p>
                <Link
                  href="/institucional"
                  className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800  inline-block dark:bg-gray-800 border dark:border-white hover:scale-90 transition-all duration-300"
                >
                  Ver Sedes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Contacto */}
      <section className="py-16 bg-white/55 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Información de Contacto
          </h2>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Encuentre la información de contacto de todas nuestras sedes y
            programe su cita de manera fácil y rápida.
          </p>
          <ContactoSedes />
          {/* <ModalInstagram /> */}
        </div>
      </section>

      {/* Derechos y Deberes */}
      <section className="py-16 bg-gradient-to-r from-green-50/55 to-green-150/55 dark:from-gray-900 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
              Sus Derechos y Deberes como Usuario
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-green-50 dark:bg-gray-800 rounded-lg p-8 border border-green-200 dark:border-white">
                <h3 className="text-2xl font-bold text-green-800 dark:text-white mb-6 text-center">
                  📋 Sus Derechos
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-700 dark:text-white mr-2">
                      ✓
                    </span>
                    <span className="text-green-700 dark:text-white">
                      Recibir atención de calidad sin discriminación
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-700 dark:text-green-400 mr-2">
                      ✓
                    </span>
                    <span className="text-green-700 dark:text-white">
                      Ser informado sobre su estado de salud
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-700 dark:text-green-400 mr-2">
                      ✓
                    </span>
                    <span className="text-green-700 dark:text-white">
                      Confidencialidad de su información médica
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-700 dark:text-green-400 mr-2">
                      ✓
                    </span>
                    <span className="text-green-700 dark:text-white">
                      Participar en decisiones sobre su tratamiento
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-700 dark:text-green-400 mr-2">
                      ✓
                    </span>
                    <span className="text-green-700 dark:text-white">
                      Recibir atención culturalmente apropiada
                    </span>
                  </li>

                  <li className="flex items-start">
                    <span className="text-green-700 dark:text-green-400 mr-2">
                      ✓
                    </span>
                    <span className="text-green-700 dark:text-white">
                      Presentar peticiones, quejas y reclamos
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-gray-800 rounded-lg p-8 border border-green-200 dark:border-white">
                <h3 className="text-2xl font-bold text-green-800 dark:text-white mb-6 text-center">
                  🤝 Sus Deberes
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-700 dark:text-green-400 mr-2">
                      •
                    </span>
                    <span className="text-green-700 dark:text-white">
                      Proporcionar información veraz sobre su salud
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-700 dark:text-green-400 mr-2">
                      •
                    </span>
                    <span className="text-green-700 dark:text-white">
                      Cumplir con los tratamientos prescritos
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-700 dark:text-green-400 mr-2">
                      •
                    </span>
                    <span className="text-green-700 dark:text-white">
                      Respetar al personal y otros pacientes
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-700 dark:text-green-400 mr-2">
                      •
                    </span>
                    <span className="text-green-700 dark:text-white">
                      Asistir puntualmente a las citas
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-700 dark:text-green-400 mr-2">
                      •
                    </span>
                    <span className="text-green-700 dark:text-white">
                      Cuidar las instalaciones y equipos
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-700 dark:text-green-400 mr-2">
                      •
                    </span>
                    <span className="text-green-700 dark:text-white">
                      Seguir las normas de bioseguridad
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
