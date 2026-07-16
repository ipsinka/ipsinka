import { notFound } from "next/navigation";
import Link from "next/link";
// WhatsAppButton temporalmente deshabilitado
// import WhatsAppButton from "@/components/WhatsAppButton";

const sedes = [
  {
    id: "sibundoy",
    nombre: "Sede Principal Sibundoy",
    municipio: "Sibundoy",
    direccion: "Calle Principal #123, Sibundoy, Putumayo",
    telefono: "+573132863398",
    horarios: "Lunes a Viernes: 8:00 AM - 12:00 PM y 2:00 PM - 5:30 PM",
    servicios: ["Medicina General", "Odontología", "Enfermería"],
    descripcion: "Nuestra sede principal ofrece atención médica integral combinando medicina occidental con conocimientos ancestrales de los pueblos Inga y Kamëntsá.",
    imagen: "/images/sede-sibundoy.jpg"
  },
  {
    id: "colon",
    nombre: "Sede Colón",
    municipio: "Colón",
    direccion: "Carrera 5 #67-89, Colón, Putumayo",
    telefono: "+573132863398",
    horarios: "Lunes a Viernes: 8:00 AM - 12:00 PM y 2:00 PM - 5:30 PM",
    servicios: ["Medicina General", "Odontología", "Enfermería"],
    descripcion: "Atención especializada para la comunidad de Colón, respetando las tradiciones culturales locales.",
    imagen: "/images/sede-colon.jpg"
  },
  {
    id: "santiago",
    nombre: "Sede Santiago",
    municipio: "Santiago",
    direccion: "Calle 12 #34-56, Santiago, Putumayo",
    telefono: "+573132863398",
    horarios: "Lunes a Viernes: 8:00 AM - 12:00 PM y 2:00 PM - 5:30 PM",
    servicios: ["Medicina General", "Odontología", "Enfermería"],
    descripcion: "Servicios de salud básicos y especializados para la comunidad de Santiago.",
    imagen: "/images/sede-santiago.jpg"
  },
  {
    id: "san-andres",
    nombre: "Sede San Andrés",
    municipio: "San Andrés",
    direccion: "Avenida Central #78-90, San Andrés, Putumayo",
    telefono: "+573132863398",
    horarios: "Lunes a Viernes: 8:00 AM - 12:00 PM y 2:00 PM - 5:30 PM",
    servicios: ["Medicina General", "Odontología", "Enfermería"],
    descripcion: "Medicina comunitaria enfocada en el bienestar integral de las familias de San Andrés.",
    imagen: "/images/sede-san-andres.jpg"
  },
];

export async function generateMetadata({ params }) {
  const sede = sedes.find(s => s.id === params.sede);

  if (!sede) {
    return {
      title: "Sede no encontrada - IPS INGA KAMËNTSÁ",
    };
  }

  return {
    title: `${sede.nombre} - IPS INGA KAMËNTSÁ`,
    description: `${sede.descripcion} Ubicada en ${sede.direccion}. Horarios: ${sede.horarios}`,
  };
}

export default function SedePage({ params }) {
  const sede = sedes.find(s => s.id === params.sede);

  if (!sede) {
    notFound();
  }



  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/sedes"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver a Sedes
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {sede.nombre}
            </h1>
            <p className="text-xl leading-relaxed mb-6">
              {sede.descripcion}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* WhatsAppButton temporalmente deshabilitado */}
              {/* <WhatsAppButton sede={sede} /> */}

              <a
                href={`tel:${sede.telefono}`}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Llamar para Agendar Cita
              </a>

              <Link
                href="/contacto"
                className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors inline-block text-center"
              >
                Más Información
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Información Detallada */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Información Principal */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Información de Contacto
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-gray-800">Dirección</h3>
                      <p className="text-gray-600">{sede.direccion}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-gray-800">Teléfono</h3>
                      <a href={`tel:${sede.telefono}`} className="text-green-600 hover:text-green-700">
                        {sede.telefono}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-gray-800">Horarios de Atención</h3>
                      <p className="text-gray-600">{sede.horarios}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Servicios */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Servicios Disponibles
                </h2>

                <div className="grid grid-cols-1 gap-3">
                  {sede.servicios.map((servicio, index) => (
                    <div
                      key={index}
                      className="flex items-center p-4 bg-green-50 rounded-lg border border-green-100"
                    >
                      <svg className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 font-medium">{servicio}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    💡 ¿Necesitas otro servicio?
                  </h4>
                  <p className="text-blue-700 text-sm">
                    Contáctanos por teléfono para conocer servicios adicionales y especializados que podemos coordinar para ti.
                  </p>
                </div>
              </div>
            </div>

            {/* Otras Sedes */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Nuestras Otras Sedes
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sedes.filter(s => s.id !== sede.id).map((otraSede) => (
                  <Link
                    key={otraSede.id}
                    href={`/sedes/${otraSede.id}`}
                    className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-200 border hover:border-green-200"
                  >
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {otraSede.nombre}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {otraSede.municipio}
                    </p>
                    <p className="text-green-600 text-sm font-medium">
                      Ver información →
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}