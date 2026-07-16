"use client";

import { useState, useEffect } from "react";
import InformacionInstitucional from "@/components/InformacionInstitucional";
import GestionClinica from "@/components/GestionClinica";
import Link from "next/link";

// export const metadata = {
//   title: "Servicios",
//   description:
//     "Conoce nuestro portafolio completo de servicios de salud: medicina general, especialidades y más.",
// };

export default function ServiciosPage() {
  // Servicios adicionales gestionados desde el panel admin (/api/servicios).
  // Se muestran como complemento del contenido fijo de arriba.
  const [serviciosExtra, setServiciosExtra] = useState([]);

  useEffect(() => {
    let activo = true;
    const cargarServicios = async () => {
      try {
        const res = await fetch("/api/servicios");
        if (!res.ok) throw new Error("Error al cargar servicios");
        const data = await res.json();
        const lista = Array.isArray(data) ? data : (data.results ?? []);
        if (activo) setServiciosExtra(lista);
      } catch {
        if (activo) setServiciosExtra([]);
      }
    };
    cargarServicios();
    return () => {
      activo = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white/45 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-800 dark:to-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1
              className="text-4xl md:text-5xl font-bold mb-6"
              data-aos="fade-down"
            >
              Nuestros Servicios
            </h1>
            <p
              className="text-xl leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Ofrecemos servicios de salud integral con atención médica general
              y odontológica de calidad.
            </p>
          </div>
        </div>
      </section>

      {/* Servicios Detallados */}
      <section className="py-16 bg-white/45 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Medicina General */}
            <div
              className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 border border-blue-200 dark:border-blue-800"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-6 text-center">
                🩺 Medicina General
              </h2>

              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                    Consulta Externa
                  </h3>
                  <ul className="space-y-2 text-gray-900 dark:text-gray-300">
                    <li>
                      • Diagnóstico y tratamiento de enfermedades generales
                    </li>
                    <li>• Control y seguimiento de patologías crónicas</li>
                    <li>• Medicina preventiva</li>
                    <li>• Atención integral para toda la familia</li>
                    <li>• Certificados médicos</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Medicina tradicional */}
            <div
              className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 border border-blue-200 dark:border-blue-800"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-6 text-center">
                🌿 Medicina tradicional
              </h2>

              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                  <ul className="list-disc pl-5 space-y-2 text-gray-900 dark:text-gray-300">
                    <li>Atenciones individuales y grupales</li>
                  </ul>
                </div>
              </div>
            </div>

            <div
              className="bg-green-50 dark:bg-green-900/20 rounded-lg p-8 border border-green-200 dark:border-green-800"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              <h2 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-6 text-center">
                🦷 Odontología
              </h2>

              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                    Servicios Odontológicos
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-900 dark:text-gray-300">
                    <li>Odontología general</li>
                    <li>Limpieza dental (profilaxis)</li>
                    <li>Extracción de piezas dentales</li>
                    <li>Obturaciones (calzas)</li>
                    <li>Tratamiento de caries</li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                    Odontología Preventiva
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-900 dark:text-gray-300">
                    <li>Valoración odontológica</li>
                    <li>Educación en salud oral</li>
                  </ul>
                </div>
              </div>
            </div>

            <div
              className="bg-green-50 dark:bg-green-900/20 rounded-lg p-8 border border-green-200 dark:border-green-800 "
              data-aos="fade-left"
              data-aos-delay="400"
            >
              <h2 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-6 text-center">
                💊 Servicio farmacéutico
              </h2>

              <div className="space-y-6 ">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md ">
                  <ul className="list-disc pl-5 space-y-2 text-gray-900 dark:text-gray-300">
                    <li>
                      Dispensación de medicamentos incluidos en el plan de salud
                    </li>
                    <li>Servicio de mediana y baja complejidad</li>
                  </ul>
                </div>
              </div>
            </div>

            <div
              className="bg-green-50 dark:bg-green-900/20 rounded-lg p-8 border border-green-200 dark:border-green-800 "
              data-aos="fade-left"
              data-aos-delay="400"
            >
              <h2 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-6 text-center">
                🧠 Psicología
              </h2>

              <div className="space-y-6 ">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md ">
                  <ul className="list-disc pl-5 space-y-2 text-gray-900 dark:text-gray-300">
                    <li>
                      Psicología exclusiva para población crónica (hipertensos y
                      diabéticos)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Información para solicitar visita - Span completo */}
          <div
            className="mt-12 max-w-3xl mx-auto dark:border-white border rounded-lg"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                Información para solicitar visita médica domiciliaria a usuarios
                afiliados a EPS MALLAMAS
              </h3>
              <h4 className="text-black dark:text-white text-lg leading-relaxed text-left max-w-3xl mx-auto">
                Gestionar y enviar datos relevantes como:
              </h4>
              <ul className="list-disc pl-8 space-y-2 text-black dark:text-white">
                <li>Nombre completo del paciente</li>
                <li>Número de identificación</li>
                <li>Datos de familiares y/o adulto responsable</li>
                <li>Contacto telefónico</li>
                <li>Tipo de parentesco con el usuario</li>
              </ul>

              <p className="visit-note flex items-center justify-center m-auto w-9/12 mt-6 text-center border border-black rounded-lg bg-black text-white dark:bg-white dark:text-black">
                Esta información es importante para brindar un oportuno servicio
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios adicionales cargados desde el panel administrativo */}
      {serviciosExtra.length > 0 && (
        <section className="py-16 bg-white/45 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2
              className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white"
              data-aos="fade-down"
            >
              Otros Servicios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {serviciosExtra.map((servicio) => (
                <div
                  key={servicio.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700"
                  data-aos="fade-up"
                >
                  {servicio.imagen_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={servicio.imagen_url}
                      alt={servicio.nombre}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 text-center">
                    {servicio.icono ? `${servicio.icono} ` : ""}
                    {servicio.nombre}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-center">
                    {servicio.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <InformacionInstitucional />
      <GestionClinica />

      {/* Scoped styles to increase the paragraph height for screens between 320px and 425px */}

      <style jsx>{`
        .visit-note {
          height: 2.5rem; /* default height for larger screens */
        }
        @media (min-width: 320px) and (max-width: 425px) {
          .visit-note {
            height: 4rem; /* increased height for 320px - 425px */
          }
        }
      `}</style>
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-800 dark:to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6" data-aos="fade-down">
            ¿Necesita Información Específica?
          </h2>
          <p
            className="text-xl mb-8 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Nuestro equipo está disponible para brindarle información detallada
            sobre cualquiera de nuestros servicios.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <Link
              href="/directorio"
              className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors inline-block"
            >
              Ver Directorio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
