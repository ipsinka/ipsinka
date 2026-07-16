"use client";

import ImageCarousel from "./ImageCarousel";

const healthImages = [
  {
    url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/images%20aside/1.jpg",
    alt: "Servicios de salud integral",
    description: "Atención médica de calidad con enfoque intercultural",
  },
  {
    url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/images%20aside/2.jpg",
    alt: "Servicios médicos especializados",
    description: "Atención médica integral con enfoque en la comunidad",
  },
  {
    url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/images%20aside/3.jpg",
    alt: "Atención médica especializada",
    description: "Profesionales capacitados en medicina intercultural",
  },
  {
    url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/images%20aside/4.jpg",
    alt: "Servicios de emergencia",
    description: "Disponibles 24/7 para atender urgencias médicas",
  },
];

const meetingImages = [
  {
    url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/meetings/1.jpg",
    alt: "Informes y reuniones de la IPS",
    description: "Transparencia en la gestión y rendición de cuentas",
  },
  {
    url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/meetings/2.jpg",
    alt: "Reuniones comunitarias y participación",
    description: "Participación activa de la comunidad en decisiones de salud",
  },
  {
    url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/meetings/3.jpg",
    alt: "Informes de gestión y resultados",
    description: "Presentación de resultados y estadísticas de atención médica",
  },
  {
    url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/meetings/4.jpg",
    alt: "Capacitaciones y formación del personal",
    description: "Programas de capacitación continua para mejorar la atención",
  },
  {
    url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/meetings/5.jpg",
    alt: "Actividades comunitarias de salud",
    description: "Programas de promoción y prevención en salud comunitaria",
  },
  {
    url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/meetings/6.jpg",
    alt: "Eventos y conmemoraciones de salud",
    description: "Celebración de fechas importantes relacionadas con la salud",
  },
];

export default function HealthInfoSection() {
  return (
    <section
      className="py-16  transition-colors duration-200 dark:bg-gray-800 dark:text-white dark:border-solid dark:border-zinc-50/10"
      data-aos="fade-up"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Conoce Más Sobre Nuestros Servicios
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto dark:text-white">
            Descubre cómo trabajamos para brindar atención médica integral y
            transparente a nuestra comunidad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Carrusel de Salud */}
          <ImageCarousel
            images={healthImages}
            title="🏥 Servicios de Salud Integral"
            description="Ofrecemos atención médica de calidad. Nuestros servicios incluyen medicina general, especialidades."
          />

          {/* Carrusel de Informes */}
          <ImageCarousel
            images={meetingImages}
            title="📊 Informes y Transparencia"
            description="Mantenemos un compromiso con la transparencia y rendición de cuentas. Conoce nuestros informes de gestión, resultados de atención médica y participación en reuniones."
          />
        </div>
      </div>
    </section>
  );
}
