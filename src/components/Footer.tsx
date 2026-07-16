import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">IPS INGA KAMËNTSÁ</h3>
            <p className="text-gray-300 mb-4">
              Institución Prestadora de Servicios de Salud comprometida con la
              atención integral y culturalmente apropiada para nuestras
              comunidades.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/ips-inga-kamentsa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/ips.inga.kamentsa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link
                  href="/sedes"
                  className="hover:text-white transition-colors"
                >
                  Nuestras Sedes
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios"
                  className="hover:text-white transition-colors"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  href="/institucional"
                  className="hover:text-white transition-colors"
                >
                  Información Institucional
                </Link>
              </li>
              <li>
                <Link
                  href="/atencion-usuario"
                  className="hover:text-white transition-colors"
                >
                  Atención al Usuario
                </Link>
              </li>
              <li>
                <Link
                  href="/eventos"
                  className="hover:text-white transition-colors"
                >
                  Eventos
                </Link>
              </li>
              <li>
                <Link
                  href="/directorio"
                  className="hover:text-white transition-colors"
                >
                  Directorio
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <div className="text-gray-300 space-y-2">
              <div className="flex items-center">
                <span className="mr-2">📞</span>
                <a
                  href="tel:+57842012345"
                  className="hover:text-white transition-colors"
                >
                  (8) 420-1234
                </a>
              </div>
              <div className="flex items-center">
                <span className="mr-2">🚨</span>
                <a
                  href="tel:+57842000000"
                  className="hover:text-white transition-colors text-red-300"
                >
                  Emergencias: (8) 420-0000
                </a>
              </div>
              <div className="flex items-center">
                <span className="mr-2">📧</span>
                <a
                  href="mailto:contacto@ips-inga-kamentsa.org"
                  className="hover:text-white transition-colors"
                >
                  contacto@ips-inga-kamentsa.org
                </a>
              </div>
              <div className="flex items-center">
                <span className="mr-2">📍</span>
                <span>Sibundoy, Putumayo, Colombia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="text-center md:text-left">
              <p className="text-gray-300">
                &copy; 2025 IPS INGA KAMËNTSÁ. Todos los derechos reservados.
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Medicina occidental y tradicional en armonía para el bienestar
                de nuestras comunidades
              </p>
            </div>
            <div className="text-center md:text-right">
              <div className="flex justify-center md:justify-end space-x-4 text-sm text-gray-400">
                <Link
                  href="/institucional"
                  className="hover:text-white transition-colors"
                >
                  Política de Privacidad
                </Link>
                <span>|</span>
                <Link
                  href="/atencion-usuario"
                  className="hover:text-white transition-colors"
                >
                  Términos de Uso
                </Link>
                <span>|</span>
                <Link
                  href="/contacto"
                  className="hover:text-white transition-colors"
                >
                  Ayuda
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
