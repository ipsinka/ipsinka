import Link from 'next/link';

const services = [
  {
    id: 1,
    title: 'Medicina General',
    description: 'Consultas médicas generales con atención personalizada para toda la familia.',
    icon: '🩺',
    features: ['Consulta externa', 'Diagnóstico', 'Tratamiento', 'Certificados médicos']
  },
  {
    id: 2,
    title: 'Odontología',
    description: 'Servicios odontológicos integrales para toda la familia.',
    icon: '🦷',
    features: ['Odontología general', 'Limpieza dental', 'Prevención', 'Tratamiento de caries']
  },
  {
    id: 3,
    title: 'Urgencias 24/7',
    description: 'Atención de urgencias médicas las 24 horas del día.',
    icon: '🚨',
    features: ['Emergencias', 'Atención inmediata', 'Estabilización', 'Remisiones']
  }
];

export default function ServicesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Nuestros Servicios de Salud
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos servicios médicos integrales con atención de calidad para toda la comunidad
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              <div className="p-6">
                {/* Icon */}
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <span className="text-3xl">{service.icon}</span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-500">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/contacto"
                  className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors"
                >
                  Solicitar cita
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              ¿Necesitas atención médica?
            </h3>
            <p className="text-green-100 mb-8 text-lg">
              Nuestro equipo médico está listo para brindarte la mejor atención. 
              Agenda tu cita o consulta nuestras sedes disponibles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="inline-flex items-center px-8 py-4 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-200"
              >
                Agendar Cita
              </Link>
              <Link
                href="/sedes"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-700 transition-colors duration-200"
              >
                Ver Sedes
              </Link>
              <a
                href="tel:+57842041239"
                className="inline-flex items-center px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                🚨 Urgencias 24/7
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}