import InformacionInstitucional from "@/components/InformacionInstitucional";
import SedesSection from "@/components/SedesSection";
import DirectorioTelefonico from "@/components/DirectorioTelefonico";

export const metadata = {
  title: "Institucional",
  description:
    "Conozca la historia, misión, visión, portafolio de servicios, sedes y directorio de IPS INGA KAMËNTSÁ. Atención médica profesional desde 1995.",
};

export default function InstitucionalPage() {
  return (
    <div className="min-h-screen  dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-800 dark:to-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1
              className="text-4xl md:text-5xl font-bold mb-6"
              data-aos="fade-down"
            >
              Información Institucional
            </h1>
            <p className="text-xl leading-relaxed" data-aos="fade-up">
              Conoce nuestra historia, misión, visión y el compromiso que
              tenemos con la salud integral de nuestras comunidades.
            </p>
          </div>
        </div>
      </section>

      {/* Introducción */}
      <section className="py-16 bg-white/85 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-3xl font-bold text-black dark:text-white mb-8"
              data-aos="fade-up"
            >
              Más de 20 años al servicio de la salud integral
            </h2>
            <p
              className="text-lg text-black dark:text-gray-300 leading-relaxed"
              data-aos="fade-up"
            >
              La{" "}
              <span className="font-bold">
                ASOCIACION IPS INDIGENA INGA KAMENTSA
              </span>{" "}
              es una institución de salud comprometida con brindar atención
              médica de calidad, contando con profesionales altamente
              capacitados para ofrecer servicios integrales a nuestros usuarios.
            </p>
          </div>
        </div>
      </section>

      <InformacionInstitucional />

      {/* Valores Institucionales */}
      <section className="py-16 bg-gradient-to-r from-green-50/35 to-blue-50 dark:from-gray-800 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">
            Nuestros Valores
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Respeto
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Respetamos la diversidad cultural y las necesidades específicas
                de cada paciente y comunidad.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Calidad
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Brindamos servicios de salud con los más altos estándares de
                calidad y seguridad.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Integridad
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Actuamos con honestidad, transparencia y compromiso ético en
                todas nuestras acciones.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Solidaridad
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Trabajamos unidos para el bienestar común de nuestras
                comunidades y territorio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reconocimientos */}
      {/* <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
              Reconocimientos y Logros
            </h2>

            <div className="space-y-8">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-8 border-l-4 border-yellow-400 dark:border-yellow-600">
                <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-3">
                  🏆 Certificación de Calidad (2010)
                </h3>
                <p className="text-yellow-700 dark:text-yellow-200">
                  Reconocimiento del Ministerio de Salud como institución de
                  referencia en atención médica de calidad para la región del
                  Putumayo.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-8 border-l-4 border-green-400 dark:border-green-600">
                <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-3">
                  🏥 Acreditación en Servicios Médicos (2015)
                </h3>
                <p className="text-green-700 dark:text-green-200">
                  Primera IPS de la región en obtener acreditación completa en
                  servicios de medicina general y especializada.
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 border-l-4 border-blue-400 dark:border-blue-600">
                <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-3">
                  📚 Programa de Formación Médica (2018)
                </h3>
                <p className="text-blue-700 dark:text-blue-200">
                  Creación del primer programa de formación continua en medicina
                  del suroccidente colombiano.
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-8 border-l-4 border-purple-400 dark:border-purple-600">
                <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-3">
                  🤝 Alianza Estratégica (2020)
                </h3>
                <p className="text-purple-700 dark:text-purple-200">
                  Alianza con universidades nacionales e internacionales para la
                  investigación médica y formación profesional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Equipo Directivo */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
              Equipo Directivo
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8 text-center hover:scale-105 transition-all duration-300">
                {/* <div className="text-4xl mb-4">👩🏽</div> */}
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  Nohelly Puerchambud
                </h3>
                <p className="text-green-600 dark:text-green-400 font-semibold mb-3">
                  Gerente
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Profesional con amplia experiencia en administración de
                  instituciones de salud, liderando la gestión estratégica y
                  operativa de la IPS para garantizar servicios médicos de
                  calidad a la comunidad.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8 text-center hover:scale-105 transition-all duration-300">
                {/* <div className="text-4xl mb-4">👩🏽</div> */}
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  Angela Mojomboy
                </h3>
                <p className="text-green-600 dark:text-green-400 font-semibold mb-3">
                  Tesorera
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Profesional responsable de la gestión financiera y
                  administrativa de la entidad de salud, asegurando el manejo
                  eficiente de los recursos, la transparencia en los procesos
                  contables y el cumplimiento de las normativas para el
                  sostenimiento y desarrollo institucional.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8 text-center hover:scale-105 transition-all duration-300">
                {/* <div className="text-4xl mb-4">👩🏽</div> */}
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  María Angélica
                </h3>
                <p className="text-green-600 dark:text-green-400 font-semibold mb-3">
                  Secretaria
                </p>

                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Encargada de la organización administrativa, gestión
                  documental y atención a usuarios en la entidad de salud. Su
                  labor garantiza el correcto flujo de información, la
                  coordinación de agendas y el soporte eficiente a los procesos
                  internos, contribuyendo al buen funcionamiento institucional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Asociación de Usuarios */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
              Asociación de Usuarios
            </h2>

            <div className="bg-blue-50 rounded-lg p-8 dark:bg-gray-800 border dark:border-white">
              <p className="text-gray-600 mb-8 text-center dark:text-white">
                La Asociación de Usuarios de la IPS INGA KAMËNTSÁ representa los
                intereses y derechos de nuestros usuarios, velando por la
                calidad y accesibilidad de los servicios de salud.
              </p>

              <div className="space-y-6">
                <div className="border-l-4 border-blue-400 pl-6 py-4 bg-white dark:bg-gray-700 rounded-r-lg">
                  <h4 className="font-semibold text-lg text-gray-800 dark:text-white">
                    Marcos Camilo Castro Caicedo
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Doctor - Sede Santiago
                  </p>
                </div>

                <div className="border-l-4 border-blue-400 pl-6 py-4 bg-white dark:bg-gray-700 rounded-r-lg">
                  <h4 className="font-semibold text-lg text-gray-800 dark:text-white">
                    Jose Victor Perez
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Doctor - Sede Colón
                  </p>
                </div>

                <div className="border-l-4 border-blue-400 pl-6 py-4 bg-white dark:bg-gray-700 rounded-r-lg">
                  <h4 className="font-semibold text-lg text-gray-800 dark:text-white">
                    María Camila Ruales Ceballos
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Odontóloga - Sede Santiago
                  </p>
                </div>

                <div className="border-l-4 border-blue-400 pl-6 py-4 bg-white dark:bg-gray-700 rounded-r-lg">
                  <h4 className="font-semibold text-lg text-gray-800 dark:text-white">
                    María Fernanda Moreno Guerra
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Odontóloga - Sede Sibundoy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">
              Misión y Visión
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Misión */}
              <div className="bg-gradient-to-br   dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-8 border-t-4 border-green-600 dark:border-green-500 ">
                <div className="flex items-center mb-6">
                  <div className="bg-green-600 dark:bg-gray-800 rounded-full p-3 mr-4">
                    <svg
                      className="w-8 h-8 text-white"
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
                  <h3 className="text-3xl font-bold text-black dark:text-white">
                    Misión
                  </h3>
                </div>

                <p className="text-gray-700 dark:text-white leading-relaxed text-justify">
                  Somos la única Institución Prestadora de Servicios de Salud
                  Indígena ubicada en el Alto Putumayo; especializada en baja
                  complejidad atención; con la más alta calidad ética, humana,
                  científica y tecnológica, para garantizar el bienestar
                  individual y colectivo de acuerdo a las necesidades en salud
                  de pueblos indígenas y colonos de la región. En nuestra
                  organización los procesos misionales, administrativos,
                  financieros y asistenciales son actividades prioritarias en
                  cuanto contribuyen a satisfacer las expectativas de nuestros
                  usuarios.
                </p>
              </div>

              {/* Visión */}
              <div className="bg-gradient-to-br   rounded-xl shadow-lg p-8 border-t-4 border-blue-600 dark:border-blue-600 dark:from-gray-800 dark:to-gray-800 ">
                <div className="flex items-center mb-6 ">
                  <div className="bg-blue-600 dark:bg-gray-800 rounded-full p-3 mr-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-black dark:text-white">
                    Visión
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-white  leading-relaxed text-justify">
                  En el 2027 la ASOCIACION IPS INDIGENA INGA KAMENTSA, será
                  reconocida a nivel regional por la prestación de servicios de
                  salud complementarios con calidad, integralidad y un talento
                  humano altamente calificado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sedes Section */}
      <section className="py-16 bg-white/45 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Nuestras Sedes
          </h2>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Atendemos en cuatro municipios del Valle de Sibundoy, ofreciendo
            servicios de salud accesibles y culturalmente apropiados para
            nuestras comunidades.
          </p>
          <SedesSection />
        </div>
      </section>

      {/* Directorio Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Directorio Telefónico
          </h2>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Encuentre rápidamente el contacto de cualquier área, departamento
            o profesional de nuestra institución.
          </p>
          <DirectorioTelefonico />
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-800 dark:to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Nuestro Compromiso Social
            </h2>
            <p className="text-xl leading-relaxed mb-8">
              Trabajamos no solo por la salud individual, sino por el bienestar
              colectivo de nuestras comunidades, administrando eficientemente
              los recursos y servicios médicos para garantizar una atención
              integral y de calidad.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2">🌱</div>
                <h3 className="text-lg font-bold mb-2">Gestión Eficiente</h3>
                <p className="text-sm ">
                  Optimizamos recursos y procesos para brindar servicios médicos
                  de calidad de manera sostenible
                </p>
              </div>

              <div>
                <div className="text-3xl mb-2">👨‍👩‍👧‍👦</div>
                <h3 className="text-lg font-bold mb-2">Atención Integral</h3>
                <p className="text-sm">
                  Coordinamos servicios médicos especializados para brindar
                  atención completa a nuestros pacientes
                </p>
              </div>

              <div>
                <div className="text-3xl mb-2">📚</div>
                <h3 className="text-lg font-bold mb-2">Formación Continua</h3>
                <p className="text-sm">
                  Capacitamos constantemente a nuestro equipo médico para
                  mantener los más altos estándares de atención
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
