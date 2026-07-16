import { Navbar } from '@/components';

export default function Header() {
  return (
    <header className="w-full">
      {/* Top info bar */}
      <div className="bg-green-700 text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>📞 Línea de atención: (8) 420-4123</span>
            <span>📧 contacto@ipsinga.gov.co</span>
          </div>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <span>🕒 Horario: Lun-Vie 7:00 AM - 5:00 PM</span>
          </div>
        </div>
      </div>
      
      {/* Main header with logo and nav */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo section */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">IK</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  IPS INGA KAMËNTSÁ
                </h1>
                <p className="text-sm text-gray-600">
                  Institución Prestadora de Servicios de Salud
                </p>
              </div>
            </div>
            
            {/* Emergency contact */}
            <div className="hidden md:block">
              <div className="text-right">
                <div className="text-2xl font-bold text-red-600">
                  🚨 URGENCIAS 24/7
                </div>
                <div className="text-lg font-semibold text-gray-800">
                  (8) 420-4199
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <Navbar />
    </header>
  );
}