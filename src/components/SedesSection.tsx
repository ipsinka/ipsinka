"use client";

import { useState, useEffect } from "react";

interface Sede {
  id: string;
  nombre: string;
  direccion: string;
  telefono: string;
  horarios: string;
  servicios: string[];
}

// Datos de respaldo: se muestran si la API no devuelve sedes (BD vacía o sin conexión)
const sedesFallback: Sede[] = [
  {
    id: "sibundoy",
    nombre: "Sede Principal Sibundoy",

    direccion: "Calle 15 # 15 - 69 - Diagonal al mercado",
    telefono: "+573132863398",
    horarios: "Lunes a Viernes: 8:00 AM - 12:00 PM y 2:00 PM - 5:00 PM",
    servicios: [
      "Medicina General",
      "Odontología",
      "Servicio farmacéutico",
      "Medicina tradicional",
      "Psicología",
    ],
  },
  {
    id: "colon",
    nombre: "Sede Colón",

    direccion: "Barrio Centro - Carrera 10 # 4 - 43",
    telefono: "+573132863398",
    horarios: "Lunes a Viernes: 8:00 AM - 12:00 PM y 2:00 PM - 5:00 PM",
    servicios: [
      "Medicina General",
      "Odontología",
      "Servicio farmacéutico",
      "Medicina tradicional",
      "Psicología",
    ],
  },
  {
    id: "santiago",
    nombre: "Sede Santiago",

    direccion: "Sede Nazareth",
    telefono: "+573132863398",
    horarios: "Lunes a Viernes: 8:00 AM - 12:00 PM y 2:00 PM - 5:00 PM",
    servicios: [
      "Medicina General",
      "Odontología",
      "Servicio farmacéutico",
      "Medicina tradicional",
      "Psicología",
    ],
  },
  {
    id: "san-andres",
    nombre: "Sede San Andrés",

    direccion: "Chorro San Jose",
    telefono: "+573132863398",
    horarios: "Lunes a Viernes: 8:00 AM - 12:00 PM y 2:00 PM - 5:00 PM",
    servicios: [
      "Medicina General",
      "Odontología",
      "Servicio farmacéutico",
      "Medicina tradicional",
      "Psicología",
    ],
  },
];

// Servicios por defecto (la tabla `sedes` de la BD no almacena la lista de servicios)
const serviciosPorDefecto = [
  "Medicina General",
  "Odontología",
  "Servicio farmacéutico",
  "Medicina tradicional",
  "Psicología",
];

export default function SedesSection() {
  const [sedes, setSedes] = useState<Sede[]>(sedesFallback);
  const [selectedSede, setSelectedSede] = useState<string>(sedesFallback[0].id);

  useEffect(() => {
    let activo = true;
    const cargarSedes = async () => {
      try {
        const res = await fetch("/api/sedes");
        if (!res.ok) throw new Error("Error al cargar sedes");
        const data = await res.json();
        const lista = Array.isArray(data) ? data : (data.results ?? []);
        if (!activo || lista.length === 0) return; // Mantiene el respaldo si la BD está vacía
        const mapeadas: Sede[] = lista.map(
          (s: {
            id: number;
            nombre: string;
            direccion: string;
            telefono: string | null;
            horario: string | null;
          }) => ({
            id: String(s.id),
            nombre: s.nombre,
            direccion: s.direccion,
            telefono: s.telefono ?? "+573132863398",
            horarios: s.horario ?? "Lunes a Viernes: 8:00 AM - 12:00 PM y 2:00 PM - 5:00 PM",
            servicios: serviciosPorDefecto,
          })
        );
        setSedes(mapeadas);
        setSelectedSede(mapeadas[0].id);
      } catch {
        // Se conserva el respaldo estático
      }
    };
    cargarSedes();
    return () => {
      activo = false;
    };
  }, []);

  // Función para agendar cita - WhatsApp temporalmente deshabilitado
  const handleAgendarCita = (sede: Sede) => {
    /* WhatsApp temporalmente deshabilitado
    const numeroWhatsApp = "573132863398"; // Número de WhatsApp de la IPS INGA
    const mensaje = encodeURIComponent(
      `¡Hola! 👋\n\nQuiero agendar una cita médica en ${sede.nombre}.\n\n` +
        `📍 Sede: ${sede.nombre}\n` +
        `📞 Teléfono sede: ${sede.telefono}\n` +
        `🕐 Horarios: ${sede.horarios}\n\n` +
        `Por favor, ayúdame con la disponibilidad de citas. ¡Gracias!`
    );

    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
    window.open(urlWhatsApp, "_blank");
    */

    // Alternativa: Llamar por teléfono
    window.location.href = `tel:${sede.telefono}`;
  };

  return (
    <section id="sedes" className="py-16 bg-white/45 dark:bg-gray-800">
      <div className="container mx-auto px-4 dark:text-white dark:border-white dark:bg-gray-800">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Nuestras Sedes
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 dark:bg-gray-800 bg-white/45">
          {/* Selector de sedes */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-lg p-6 border dark:bg-gray-800 dark:border-white">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                Seleccionar Sede
              </h3>
              <div className="space-y-2">
                {sedes.map((sede) => (
                  <button
                    key={sede.id}
                    onClick={() => setSelectedSede(sede.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors cursor-pointer ${
                      selectedSede === sede.id
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    <div className="font-medium">{sede.nombre}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Información de la sede seleccionada */}
          <div className="lg:w-2/3">
            {sedes.map(
              (sede) =>
                selectedSede === sede.id && (
                  <div
                    key={sede.id}
                    className="bg-white rounded-lg shadow-lg p-8 dark:bg-gray-800 border dark:border-white"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          {sede.nombre}
                        </h3>
                        <p className="text-gray-600 mb-2 dark:text-white">
                          <svg
                            className="w-5 h-5 inline mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {sede.direccion}
                        </p>
                        <p className="text-gray-600 mb-4 dark:text-white">
                          <svg
                            className="w-5 h-5 inline mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          {sede.telefono}
                        </p>
                      </div>

                      {/* <button
                        onClick={() => handleAgendarCita(sede)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer border dark:border-white"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        Llamar para Agendar
                      </button> */}
                    </div>

                    <div className="mb-6 dark:text-white">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3 dark:text-whitec">
                        <svg
                          className="w-5 h-5 inline mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Horarios de Atención
                      </h4>
                      <p className="text-gray-600 dark:text-white">
                        {sede.horarios}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">
                        <svg
                          className="w-5 h-5 inline mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        Servicios Disponibles
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {sede.servicios.map((servicio, index) => (
                          <div
                            key={index}
                            className="flex items-center p-3 bg-green-50 rounded-lg"
                          >
                            <svg
                              className="w-4 h-4 text-green-600 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-gray-700">{servicio}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>

        {/* Información sobre citas telefónicas */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8 border border-blue-200 dark:bg-gray-800 dark:border-white">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-blue-800 mb-4 text-center flex items-center justify-center gap-2 dark:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Agendamiento de Citas Telefónicas
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              <div className="bg-white rounded-lg p-6 shadow-sm dark:bg-gray-800 border dark:border-white">
                <h4 className="font-semibold text-blue-800 mb-3 dark:text-white">
                  📞 ¿Cómo funciona?
                </h4>
                <ol className="space-y-2 text-blue-700 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    <span className="dark:text-white">
                      Haz clic en &quot;Llamar para Agendar&quot; de la sede
                      que prefieras
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    <span className="dark:text-white">
                      Se iniciará una llamada directa a la sede seleccionada
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    <span className="dark:text-white">
                      Nuestro personal te ayudará a encontrar la fecha y hora
                      ideal
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      4
                    </span>
                    <span className="dark:text-white">
                      Recibirás confirmación de tu cita
                    </span>
                  </li>
                </ol>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm dark:bg-gray-800 border dark:border-white">
                <h4 className="font-semibold text-blue-800 mb-3 dark:text-white">
                  ✅ Ventajas del servicio
                </h4>
                <ul className="space-y-2 text-blue-700 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600">•</span>
                    <span className="dark:text-white">
                      Atención personalizada y directa
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600">•</span>
                    <span className="dark:text-white">
                      Horario disponible de lunes a viernes de 8:00 a 5:00 p.m
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600">•</span>
                    <span className="dark:text-white">
                      Información en tiempo real sobre disponibilidad
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600">•</span>
                    <span className="dark:text-white">
                      Posibilidad de hacer preguntas adicionales
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600">•</span>
                    <span className="dark:text-white">
                      Atención inmediata por teléfono
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-100 rounded-lg border-l-4 border-yellow-500">
              <p className="text-yellow-800 text-sm">
                <strong>💡 Tip:</strong> Ten a la mano tu documento de identidad
                y preferencias de horario para agilizar el proceso de
                agendamiento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
