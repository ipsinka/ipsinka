import ContactoSedes from "@/components/ContactoSedes";
import ModalInstagram from "@/components/ModalInstagram";
import Link from "next/link";

export const metadata = {
  title: "Contacto",
  description:
    "Contacta con nosotros para agendar citas, obtener información o llegar a nuestras sedes en Sibundoy, Colón, Santiago y San Andrés.",
};

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-white/55 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-800 dark:from-green-800 dark:to-green-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contacto</h1>
            <p className="text-xl leading-relaxed">
              Estamos aquí para atenderle. Encuentre la información de contacto
              de todas nuestras sedes y programe su cita de manera fácil y
              rápida.
            </p>
          </div>
        </div>
      </section>

      <ContactoSedes />

      {/* Información Adicional de Contacto */}
      <section className="py-16 bg-gray-50/55 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Otras Formas de Contacto
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* WhatsApp - Temporalmente deshabilitado */}
            {/* <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8 text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                WhatsApp
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Comuníquese con nosotros a través de WhatsApp para consultas
                rápidas
              </p>
              <Link
                href="https://wa.me/573132863398"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800  inline-block dark:bg-gray-800 border dark:border-white transition-all duration-300 hover:scale-90"
              >
                Escribir por WhatsApp
              </Link>
            </div> */}

            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8 text-center">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Correo Electrónico
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Envíenos sus consultas por correo electrónico
              </p>
              <Link
                href="mailto:contacto@ipsinka.com"
                className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800  inline-block dark:bg-gray-800 border dark:border-white transition-all duration-300 hover:scale-90"
              >
                Enviar Email
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8 text-center">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Redes Sociales
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Síguenos en nuestras redes sociales para noticias y
                actualizaciones
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  href={
                    typeof window !== "undefined" &&
                    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
                      ? "fb://profile/100008728661876"
                      : "https://www.facebook.com/luisfernando.mutunbajoyjacacanamejoy"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-700 text-white p-3 rounded-lg hover:bg-green-800  dark:bg-gray-800 border dark:border-white hover:scale-90 transition-all duration-300"
                >
                  Facebook
                </Link>

                {/* <ModalInstagram /> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horarios Generales */}
      <section className="py-16 bg-white/75 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
              Horarios Generales de Atención
            </h2>

            <div className="flex justify-center">
              <div className="bg-green-50 dark:bg-gray-800 rounded-lg p-8 border border-green-200 dark:border-white border w-3/5">
                <h3 className="text-xl font-bold text-green-800 dark:text-white mb-4">
                  📅 Días Hábiles
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-black dark:text-white">
                      Lunes a Viernes:
                    </span>
                    <span className="text-black dark:text-white">
                      8:00 AM - 5:00 PM
                    </span>
                  </div>
                  <p className="text-sm text-green-700 dark:text-white text-center border dark:border-white rounded-lg w-4/5 mx-auto p-2 dark:hover:bg-white dark:hover:text-black">
                    No hay atención el fin de semana
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-green-50 dark:bg-gray-800 rounded-lg p-8 border border-green-200 dark:border-white text-center">
              <h3 className="text-xl font-bold text-green-800 dark:text-white mb-4">
                💡 Recomendaciones para su Visita
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <ul className="space-y-2 text-green-700 dark:text-white">
                  <li>• Llegue 15 minutos antes de su cita</li>
                  <li>• Traiga documento de identidad</li>
                  <li>• Porte su carné de afiliación a salud</li>
                  <li>• Traiga exámenes médicos previos</li>
                </ul>
                <ul className="space-y-2 text-green-700 dark:text-white">
                  <li>• Use tapabocas en todas las áreas</li>
                  <li>• Mantenga distanciamiento social</li>
                  <li>• Informe síntomas respiratorios</li>
                  <li>• Siga las indicaciones del personal</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
