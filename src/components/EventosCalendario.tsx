"use client";

import { useState, useEffect } from "react";
import { showSuccess, showWarning } from "@/lib/alerts";

interface Evento {
  id: number;
  titulo: string;
  descripcion: string | null;
  lugar: string | null;
  fecha_inicio: string;
  fecha_fin: string | null;
  imagen_url: string | null;
}

const anuncios = [
  {
    id: "1",
    titulo: "Nuevos Horarios de Atención",
    fecha: "2025-01-08",
    contenido:
      "A partir del 15 de enero, la sede Colón ampliará su horario de atención hasta las 6:00 PM.",
    tipo: "info",
  },
  {
    id: "2",
    titulo: "Mantenimiento Sistema de Citas",
    fecha: "2025-01-12",
    contenido:
      "El sistema de citas en línea estará en mantenimiento el 20 de enero de 6:00 AM a 12:00 PM.",
    tipo: "alerta",
  },
  {
    id: "3",
    titulo: "Nueva Especialidad Disponible",
    fecha: "2025-01-10",
    contenido:
      "Ya está disponible el servicio de psicología en la sede principal de Sibundoy.",
    tipo: "novedad",
  },
];

function formatFecha(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatHora(inicio: string, fin: string | null): string {
  const tieneHora = inicio.includes("T");
  if (!tieneHora) return "Todo el día";
  const opciones: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };
  const horaInicio = new Date(inicio).toLocaleTimeString("es-CO", opciones);
  if (fin && fin.includes("T")) {
    const horaFin = new Date(fin).toLocaleTimeString("es-CO", opciones);
    return `${horaInicio} - ${horaFin}`;
  }
  return horaInicio;
}

export default function EventosCalendario() {
  const [vistaActiva, setVistaActiva] = useState<"eventos" | "anuncios">(
    "eventos"
  );
  const [emailSuscripcion, setEmailSuscripcion] = useState<string>("");
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    let activo = true;
    const cargarEventos = async () => {
      try {
        // Solo eventos desde hoy en adelante (próximos)
        const hoy = new Date().toISOString().slice(0, 10);
        const res = await fetch(`/api/eventos?desde=${hoy}`);
        if (!res.ok) throw new Error("Error al cargar eventos");
        const data = await res.json();
        const lista: Evento[] = Array.isArray(data) ? data : (data.results ?? []);
        if (activo) setEventos(lista);
      } catch {
        if (activo) setEventos([]);
      } finally {
        if (activo) setCargando(false);
      }
    };
    cargarEventos();
    return () => {
      activo = false;
    };
  }, []);

  const getAnuncioColor = (tipo: string) => {
    switch (tipo) {
      case "info":
        return "border-l-blue-500 bg-blue-50";
      case "alerta":
        return "border-l-yellow-500 bg-yellow-50";
      case "novedad":
        return "border-l-green-500 bg-green-50";
      default:
        return "border-l-gray-500 bg-gray-50";
    }
  };

  const handleSuscripcion = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailSuscripcion)) {
      showWarning("Por favor ingrese un correo electrónico válido");
      return;
    }

    // Crear mensaje para WhatsApp
    const mensaje = `🔔 *NUEVA SUSCRIPCIÓN - NOTIFICACIONES IPS INGA KAMËNTSÁ* 🔔

📧 *Correo Electrónico:* ${emailSuscripcion}

El usuario desea suscribirse para recibir notificaciones de anuncios importantes de la IPS.

---
Fecha de suscripción: ${new Date().toLocaleString("es-CO", {
      timeZone: "America/Bogota",
    })}
#Suscripcion #Notificaciones #IPSIngaKamentsa`;

    const mensajeCodificado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://wa.me/573132863398?text=${mensajeCodificado}`;

    // Abrir WhatsApp
    window.open(urlWhatsApp, "_blank");

    // Limpiar campo y mostrar confirmación
    setEmailSuscripcion("");
    showSuccess(
      "¡Gracias por suscribirte! Comenzarás a recibir nuestras notificaciones importantes."
    );
  };

  return (
    <section
      id="eventos-calendario"
      className="py-16 bg-gray-50/85 dark:bg-gray-800"
    >
      <div className="container mx-auto px-4">
        {/* Selector de vista */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-1 flex">
            <button
              onClick={() => setVistaActiva("eventos")}
              className={`px-6 py-3 rounded-lg transition-colors ${
                vistaActiva === "eventos"
                  ? "bg-green-600 text-white"
                  : "text-gray-600 hover:text-green-600"
              }`}
            >
              📅 Eventos Programados
            </button>
            <button
              onClick={() => setVistaActiva("anuncios")}
              className={`px-6 py-3 rounded-lg transition-colors ${
                vistaActiva === "anuncios"
                  ? "bg-green-600 text-white"
                  : "text-gray-600 hover:text-green-600"
              }`}
            >
              📢 Anuncios
            </button>
          </div>
        </div>

        {vistaActiva === "eventos" && (
          <>
            {cargando ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-300">
                Cargando eventos...
              </div>
            ) : eventos.length === 0 ? (
              <div className="text-center py-12 max-w-2xl mx-auto">
                <div className="text-5xl mb-4">📅</div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  No hay eventos programados
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Próximamente publicaremos nuevos eventos. ¡Mantente atento!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {eventos.map((evento) => (
                  <div
                    key={evento.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow dark:bg-gray-800 border dark:border-white"
                  >
                    {evento.imagen_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={evento.imagen_url}
                        alt={evento.titulo}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <div className="flex items-start mb-4">
                        <span className="text-2xl mr-3">📅</span>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                          {evento.titulo}
                        </h3>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center text-gray-600 dark:text-white">
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>{formatFecha(evento.fecha_inicio)}</span>
                        </div>

                        <div className="flex items-center text-gray-600 dark:text-white">
                          <svg
                            className="w-5 h-5 mr-2"
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
                          <span>
                            {formatHora(evento.fecha_inicio, evento.fecha_fin)}
                          </span>
                        </div>

                        {evento.lugar && (
                          <div className="flex items-center text-gray-600 dark:text-white">
                            <svg
                              className="w-5 h-5 mr-2"
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
                            <span>{evento.lugar}</span>
                          </div>
                        )}
                      </div>

                      {evento.descripcion && (
                        <p className="text-gray-600 mb-4 dark:text-white">
                          {evento.descripcion}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {vistaActiva === "anuncios" && (
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {anuncios.map((anuncio) => (
                <div
                  key={anuncio.id}
                  className={`rounded-lg p-6 border-l-4 ${getAnuncioColor(
                    anuncio.tipo
                  )}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {anuncio.titulo}
                      </h3>
                      <p className="text-gray-700 mb-3">{anuncio.contenido}</p>
                      <p className="text-sm text-gray-500">
                        Publicado el{" "}
                        {new Date(anuncio.fecha).toLocaleDateString("es-CO", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="ml-4">
                      <span className="text-2xl">
                        {anuncio.tipo === "info" && "📝"}
                        {anuncio.tipo === "alerta" && "⚠️"}
                        {anuncio.tipo === "novedad" && "🆕"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Suscripción a notificaciones */}
            <div className="mt-12 bg-white rounded-lg shadow-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                ¿Quiere recibir notificaciones de anuncios importantes?
              </h3>
              <p className="text-gray-600 mb-6">
                Suscríbase para recibir por correo electrónico los anuncios más
                relevantes de la IPS.
              </p>
              <form
                onSubmit={handleSuscripcion}
                className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              >
                <input
                  type="email"
                  placeholder="Su correo electrónico"
                  value={emailSuscripcion}
                  onChange={(e) => setEmailSuscripcion(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-800"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Suscribirse
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
