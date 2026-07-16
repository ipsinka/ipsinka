import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-green-600 to-green-800 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="block">Salud con</span>
                <span className="block text-yellow-300">Identidad Cultural</span>
              </h1>
              <p className="text-xl lg:text-2xl mt-6 text-green-100">
                Medicina occidental y ancestral unidos por el bienestar de la 
                comunidad Inga Kamëntsá
              </p>
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                href="/servicios"
                className="inline-flex items-center px-8 py-4 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-200 text-center"
              >
                Ver Servicios
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-700 transition-colors duration-200 text-center"
              >
                Agendar Cita
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-green-500">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">15+</div>
                <div className="text-green-100">Años de experiencia</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">4</div>
                <div className="text-green-100">Sedes activas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">24/7</div>
                <div className="text-green-100">Urgencias</div>
              </div>
            </div>
          </div>

          {/* Image/Illustration placeholder */}
          <div className="relative">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="w-full h-80 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">🏥</span>
                  </div>
                  <p className="text-white font-semibold">Servicios de Salud Integral</p>
                </div>
              </div>
              <p className="text-green-100">
                Combinamos la medicina moderna con el conocimiento ancestral 
                para ofrecer una atención integral y culturalmente pertinente.
              </p>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-2xl">🌿</span>
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-green-400 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-3xl">⚕️</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}