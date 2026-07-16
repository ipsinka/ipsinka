"use client";

import { useState } from "react";
import Link from "next/link";
import EventosCalendario from "@/components/EventosCalendario";
// import ModalInstagram from "@/components/ModalInstagram";
import RotatingCarousel from "@/components/RotatingCarousel";

// Definir categorías de eventos con sus galerías de fotos
const eventCategories = {
  todas: {
    name: "Todas",
    icon: "📅",
    color: "gray",
  },
  jornadas: {
    name: "Jornadas de Salud",
    icon: "🏥",
    color: "blue",
    description:
      "Brigadas médicas, vacunación, exámenes preventivos y atención especializada",
    galleries: [],
  },
  capacitaciones: {
    name: "Capacitaciones",
    icon: "📚",
    color: "green",
    description: "Talleres de primeros auxilios y promoción de la salud",
    galleries: [
      {
        title: "Aplicación Riesgo Psicosocial",
        description:
          "Registro fotográfico de nuestra jornada de aplicación de evaluación de riesgo psicosocial, fortaleciendo el bienestar de nuestro equipo de trabajo.",
        images: [
          {
            url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/eventos/Aplicacion%20riesgo%20psicosocial/1.jpg",
            alt: "Aplicación Riesgo Psicosocial 1",
            title: "Jornada de Evaluación Psicosocial",
          },
          {
            url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/eventos/Aplicacion%20riesgo%20psicosocial/2.jpg",
            alt: "Aplicación Riesgo Psicosocial 2",
            title: "Evaluación de Bienestar Laboral",
          },
          {
            url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/eventos/Aplicacion%20riesgo%20psicosocial/3.jpg",
            alt: "Aplicación Riesgo Psicosocial 3",
            title: "Atención al Personal de Salud",
          },
          {
            url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/eventos/Aplicacion%20riesgo%20psicosocial/4.jpg",
            alt: "Aplicación Riesgo Psicosocial 4",
            title: "Proceso de Evaluación",
          },
          {
            url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/eventos/Aplicacion%20riesgo%20psicosocial/5.jpg",
            alt: "Aplicación Riesgo Psicosocial 5",
            title: "Registro y Seguimiento",
          },
        ],
      },
      {
        title: "Participación simulacro nacional de evacuación",
        description:
          "Registro fotográfico de nuestra participación en el simulacro nacional de evacuación, fortaleciendo la preparación y respuesta ante emergencias.",
        images: [
          {
            url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/eventos/simulacro%20nacional%20de%20evacuacion/1.jpg",
            alt: "Simulacro de evacuación 1",
            title: "Simulacro Nacional de Evacuación",
          },
          {
            url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/eventos/simulacro%20nacional%20de%20evacuacion/2.jpg",
            alt: "Simulacro de evacuación 2",
            title: "Evacuación del Personal",
          },
          {
            url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/eventos/simulacro%20nacional%20de%20evacuacion/3.jpg",
            alt: "Simulacro de evacuación 3",
            title: "Punto de Encuentro",
          },
          {
            url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/eventos/simulacro%20nacional%20de%20evacuacion/4.jpg",
            alt: "Simulacro de evacuación 4",
            title: "Protocolo de Emergencia",
          },
        ],
      },
      {
        title: "Verificación uso de los elementos de protección personal",
        description:
          "Jornada de verificación y capacitación sobre el uso correcto de elementos de protección personal, garantizando la seguridad de nuestro equipo de trabajo.",
        images: [
          {
            url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/eventos/verificacion%20uso%20de%20elementos%20proteccion%20personal/1.jpg",
            alt: "Verificación EPP 1",
            title: "Verificación de Elementos de Protección",
          },
          {
            url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/eventos/verificacion%20uso%20de%20elementos%20proteccion%20personal/2.jpg",
            alt: "Verificación EPP 2",
            title: "Capacitación en Uso de EPP",
          },
          {
            url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/eventos/verificacion%20uso%20de%20elementos%20proteccion%20personal/3.jpg",
            alt: "Verificación EPP 3",
            title: "Inspección de Equipos",
          },
          {
            url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/eventos/verificacion%20uso%20de%20elementos%20proteccion%20personal/4.jpg",
            alt: "Verificación EPP 4",
            title: "Protocolo de Seguridad",
          },
          {
            url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/eventos/verificacion%20uso%20de%20elementos%20proteccion%20personal/5.jpg",
            alt: "Verificación EPP 5",
            title: "Entrenamiento del Personal",
          },
        ],
      },
    ],
  },
  celebraciones: {
    name: "Celebraciones",
    icon: "🎉",
    color: "purple",
    description:
      "Eventos especiales, días conmemorativos y encuentros comunitarios",
    galleries: [],
  },
  encuentros: {
    name: "Encuentros",
    icon: "🤝",
    color: "yellow",
    description:
      "Reuniones con líderes, asambleas de usuarios y espacios de diálogo",
    galleries: [],
  },
};

export default function EventosContent() {
  const [selectedCategory, setSelectedCategory] = useState("todas");

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: "bg-blue-100 dark:bg-blue-900",
        hover: "hover:bg-blue-200 dark:hover:bg-blue-800",
        text: "text-blue-800 dark:text-blue-200",
        border: "border-blue-500",
        selected: "ring-4 ring-blue-500",
      },
      green: {
        bg: "bg-green-100 dark:bg-green-900",
        hover: "hover:bg-green-200 dark:hover:bg-green-800",
        text: "text-green-800 dark:text-green-200",
        border: "border-green-500",
        selected: "ring-4 ring-green-500",
      },
      purple: {
        bg: "bg-purple-100 dark:bg-purple-900",
        hover: "hover:bg-purple-200 dark:hover:bg-purple-800",
        text: "text-purple-800 dark:text-purple-200",
        border: "border-purple-500",
        selected: "ring-4 ring-purple-500",
      },
      yellow: {
        bg: "bg-yellow-100 dark:bg-yellow-900",
        hover: "hover:bg-yellow-200 dark:hover:bg-yellow-800",
        text: "text-yellow-800 dark:text-yellow-200",
        border: "border-yellow-500",
        selected: "ring-4 ring-yellow-500",
      },
      gray: {
        bg: "bg-gray-100 dark:bg-gray-700",
        hover: "hover:bg-gray-200 dark:hover:bg-gray-600",
        text: "text-gray-800 dark:text-gray-200",
        border: "border-gray-500",
        selected: "ring-4 ring-gray-500",
      },
    };
    return colors[color];
  };

  // Obtener todas las galerías si está seleccionado "todas"
  const currentGalleries =
    selectedCategory === "todas"
      ? Object.values(eventCategories)
          .filter((cat) => cat.galleries)
          .flatMap((cat) => cat.galleries)
      : eventCategories[selectedCategory]?.galleries || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16 dark:bg-gray-800 dark:from-green-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Eventos y Anuncios
            </h1>
            <p className="text-xl leading-relaxed">
              Mantente informado sobre nuestras jornadas de salud,
              capacitaciones, eventos comunitarios y anuncios importantes.
            </p>
          </div>
        </div>
      </section>

      {/* Próximos Eventos Destacados */}
      {/* <section className="py-16 my-2 rounded-xl bg-white/75 dark:bg-gray-800 border dark:border-white">
        <div className="container mx-auto px-4 dark:bg-gray-800">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Próximos Eventos Destacados
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto dark:bg-gray-800">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8 border-l-4 border-blue-500 dark:from-gray-800 dark:border-white">
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">🏥</div>
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Próximamente
                </span>
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-3">
                Jornada de Vacunación Infantil
              </h3>
              <p className="text-blue-700 mb-4 dark:text-white">
                Jornada especial de vacunación para niños de 0 a 5 años en todas
                nuestras sedes.
              </p>
              <div className="text-sm text-blue-600 dark:text-white">
                <p>📅 15 de Enero, 2025</p>
                <p>🕐 8:00 AM - 4:00 PM</p>
                <p>📍 Todas las sedes</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-8 border-l-4 border-green-500  dark:from-gray-800  dark:border-white">
              <div className="flex items-start justify-between mb-4 ">
                <div className="text-3xl">🎓</div>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Registros Abiertos
                </span>
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-3">
                Taller de Hábitos Saludables
              </h3>
              <p className="text-green-700 mb-4 dark:text-white">
                Participa en nuestro taller para aprender sobre alimentación
                balanceada, actividad física y bienestar general.
              </p>
              <div className="text-sm text-green-600 dark:text-white">
                <p>📅 20 de Enero, 2025</p>
                <p>🕐 2:00 PM - 5:00 PM</p>
                <p>📍 Sede Colón</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-8 border-l-4 border-purple-500 dark:from-gray-800  dark:border-white">
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">🤝</div>
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Confirmado
                </span>
              </div>
              <h3 className="text-xl font-bold text-purple-800 mb-3">
                Encuentro Comunitario
              </h3>
              <p className="text-purple-700 mb-4 dark:text-white">
                Espacio abierto para compartir información, resolver dudas y
                fortalecer la participación de toda la comunidad.
              </p>
              <div className="text-sm text-purple-600 dark:text-white">
                <p>📅 1 de Febrero, 2025</p>
                <p>🕐 9:00 AM - 3:00 PM</p>
                <p>📍 Auditorio Principal</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <EventosCalendario />

      {/* Filtros de Categorías */}
      <section className="py-12 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            Filtrar Eventos por Categoría
          </h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {Object.entries(eventCategories).map(([key, category]) => {
              const colors = getColorClasses(category.color);
              const isSelected = selectedCategory === key;

              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`
                    ${colors.bg} ${colors.hover} ${colors.text}
                    ${isSelected ? colors.selected : ""}
                    px-6 py-3 rounded-lg font-semibold transition-all duration-200
                    flex items-center gap-2 shadow-md hover:scale-105
                  `}
                >
                  <span className="text-2xl">{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Mensaje de categoría seleccionada */}
          {selectedCategory !== "todas" && (
            <div className="mt-8 max-w-3xl mx-auto text-center">
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Mostrando eventos y galerías de:{" "}
                <span className="font-bold">
                  {eventCategories[selectedCategory].name}
                </span>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Galerías de Fotos Filtradas */}
      {currentGalleries.length > 0 && (
        <section className="py-16 bg-white/90 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
              Galería de Fotos
            </h2>

            <div className="space-y-16">
              {currentGalleries.map((gallery, index) => (
                <div key={index} className="max-w-6xl mx-auto">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-white">
                      {gallery.title}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                      {gallery.description}
                    </p>
                  </div>
                  <div className="max-w-5xl mx-auto" data-aos="zoom-in">
                    <RotatingCarousel
                      images={gallery.images}
                      interval={5000}
                      height="500px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mensaje cuando no hay galerías */}
      {currentGalleries.length === 0 && selectedCategory !== "todas" && (
        <section className="py-16 bg-white/90 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-6xl mb-6">📷</div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                No hay galerías disponibles
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Actualmente no tenemos fotos registradas para esta categoría.
                Pronto agregaremos más contenido.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Tipos de Eventos - Información */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 dark:border-t-white border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-white">
            Tipos de Eventos que Organizamos
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Usa los filtros arriba para explorar fotos y detalles de cada
            categoría de eventos
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(eventCategories)
              .filter(([key]) => key !== "todas")
              .map(([key, category]) => {
                const colors = getColorClasses(category.color);
                return (
                  <div
                    key={key}
                    className={`bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border-2 ${colors.border} cursor-pointer hover:scale-105`}
                    onClick={() => {
                      setSelectedCategory(key);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm dark:text-gray-300 mb-4">
                      {category.description}
                    </p>
                    {category.galleries && category.galleries.length > 0 && (
                      <div className={`text-sm ${colors.text} font-semibold`}>
                        {category.galleries.length} galería
                        {category.galleries.length > 1 ? "s" : ""} disponible
                        {category.galleries.length > 1 ? "s" : ""}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* Cómo Participar */}
      <section className="py-16 bg-white/90 dark:bg-gray-900 border-t dark:border-t-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Cómo Participar en Nuestros Eventos
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">1️⃣</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Infórmate
                </h3>
                <p className="text-gray-600 dark:text-white">
                  Revisa regularmente nuestro calendario de eventos y anuncios
                  en la página web o en nuestras redes sociales.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">2️⃣</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Regístrate
                </h3>
                <p className="text-gray-600 dark:text-white">
                  Para eventos que requieren registro previo, comunícate con
                  nosotros por teléfono, email o presencialmente.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">3️⃣</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Participa
                </h3>
                <p className="text-gray-600 dark:text-white">
                  Asiste puntualmente al evento y participa activamente en las
                  actividades programadas.
                </p>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 border border-green-200 dark:from-gray-800 dark:border-white">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center ">
                📱 Mantente Conectado
              </h3>
              <p className="text-gray-700 text-center mb-6 dark:text-white">
                No te pierdas ningún evento importante. Suscríbete a nuestras
                notificaciones y síguenos en redes sociales.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="https://www.facebook.com/luisfernando.mutunbajoyjacacanamejoy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  Síguenos en Facebook
                </Link>
                {/* <ModalInstagram /> */}
                {/* <Link
                  href="/contacto"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors text-center"
                >
                  Contactar
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galería de Eventos Pasados */}
      {/* <section className="py-16 bg-gray-50/85 dark:bg-gray-800 dark:border-t-white border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Eventos Realizados
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-300 h-48 flex items-center justify-center dark:bg-gray-800 border dark:border-white rounded-lg">
                <div className="text-center text-gray-600">
                  <div className="text-4xl mb-2">📸</div>
                  <p className="text-black dark:text-white">
                    Jornada de Salud Visual
                  </p>
                  <p className="text-sm text-black dark:text-white">
                    Diciembre 2024
                  </p>
                </div>
              </div>

              <div className="p-4 dark:bg-gray-800">
                <h3 className="font-bold text-gray-800 mb-2 ">
                  Jornada de Salud Visual
                </h3>
                <p className="text-gray-600 text-sm dark:text-white">
                  Más de 200 personas atendidas en nuestra jornada de salud
                  visual con entrega gratuita de lentes.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-300 h-48 flex items-center justify-center dark:bg-gray-800 border dark:border-white rounded-lg">
                <div className="text-center text-gray-600">
                  <div className="text-4xl mb-2">🌿</div>
                  <p className="dark:text-white">Feria de Salud Comunitaria</p>
                  <p className="text-sm dark:text-white">Noviembre 2024</p>
                </div>
              </div>
              <div className="p-4 dark:bg-gray-800">
                <h3 className="font-bold text-gray-800 mb-2 ">
                  Feria de Salud Comunitaria
                </h3>
                <p className="text-gray-600 text-sm dark:text-white">
                  Evento de salud integral con atención médica y actividades de
                  promoción y prevención.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-300 h-48 flex items-center justify-center dark:bg-gray-800 border dark:border-white rounded-lg">
                <div className="text-center text-gray-600">
                  <div className="text-4xl mb-2">👶</div>
                  <p className="dark:text-white">Jornada Materno Infantil</p>
                  <p className="text-sm dark:text-white">Octubre 2024</p>
                </div>
              </div>
              <div className="p-4 dark:bg-gray-800">
                <h3 className="font-bold text-gray-800 mb-2">
                  Jornada Materno Infantil
                </h3>
                <p className="text-gray-600 text-sm dark:text-white">
                  Atención especializada para madres gestantes y niños menores
                  de 5 años.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
