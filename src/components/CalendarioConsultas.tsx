"use client";

import { useState, useEffect } from "react";
import { Cita } from "@/types/citas";

export interface EventoCalendario {
  id: number;
  titulo: string;
  descripcion: string | null;
  lugar: string | null;
  fecha_inicio: string;
  fecha_fin: string | null;
  imagen_url: string | null;
}

interface CalendarioConsultasProps {
  consultas?: Cita[];
  eventos?: EventoCalendario[];
  onConsultaClick?: (cita: Cita) => void;
}

export default function CalendarioConsultas({
  consultas = [],
  eventos = [],
  onConsultaClick,
}: CalendarioConsultasProps) {
  const [fechaActual, setFechaActual] = useState(new Date());
  const [mesActual, setMesActual] = useState(new Date());
  // Día cuyo modal de eventos está abierto (YYYY-MM-DD) o null si ninguno
  const [modalEventosFecha, setModalEventosFecha] = useState<string | null>(
    null
  );

  // Cerrar el modal con la tecla Escape
  useEffect(() => {
    if (!modalEventosFecha) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalEventosFecha(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalEventosFecha]);

  const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const mesesAño = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  // Formatear fecha en formato YYYY-MM-DD
  const formatearFecha = (fecha: Date): string => {
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    return `${año}-${mes}-${dia}`;
  };

  // ¿La fecha (YYYY-MM-DD) cae dentro del rango [fecha_inicio, fecha_fin] del evento?
  const eventoEnFecha = (
    evento: EventoCalendario,
    fechaStr: string
  ): boolean => {
    const inicio = evento.fecha_inicio.slice(0, 10);
    const fin = (evento.fecha_fin ?? evento.fecha_inicio).slice(0, 10);
    return fechaStr >= inicio && fechaStr <= fin;
  };

  // Eventos que ocurren en una fecha (YYYY-MM-DD) dada
  const eventosEnFecha = (fechaStr: string): EventoCalendario[] =>
    eventos.filter((evento) => eventoEnFecha(evento, fechaStr));

  // Formatear la hora de un evento para mostrarla en el panel
  const formatearHoraEvento = (evento: EventoCalendario): string => {
    if (!evento.fecha_inicio.includes("T")) return "Todo el día";
    const opciones: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };
    const horaInicio = new Date(evento.fecha_inicio).toLocaleTimeString(
      "es-CO",
      opciones
    );
    if (evento.fecha_fin && evento.fecha_fin.includes("T")) {
      const horaFin = new Date(evento.fecha_fin).toLocaleTimeString(
        "es-CO",
        opciones
      );
      return `${horaInicio} - ${horaFin}`;
    }
    return horaInicio;
  };

  // Calcular consultas del día directamente sin useEffect
  const fechaActualStr = formatearFecha(fechaActual);
  const consultasDelDia = consultas.filter(
    (cita) => cita.fecha === fechaActualStr && cita.estado !== "cancelada"
  );

  // Eventos del día seleccionado
  const eventosDelDia = eventosEnFecha(fechaActualStr);

  // Eventos del día cuyo modal está abierto
  const eventosModal = modalEventosFecha
    ? eventosEnFecha(modalEventosFecha)
    : [];

  // Obtener días del mes actual
  const obtenerDiasDelMes = () => {
    const año = mesActual.getFullYear();
    const mes = mesActual.getMonth();

    // Primer día del mes
    const primerDia = new Date(año, mes, 1);
    const primerDiaSemana = primerDia.getDay();

    // Último día del mes
    const ultimoDia = new Date(año, mes + 1, 0);
    const diasEnMes = ultimoDia.getDate();

    // Crear array con días
    const dias: (number | null)[] = [];

    // Agregar espacios vacíos antes del primer día
    for (let i = 0; i < primerDiaSemana; i++) {
      dias.push(null);
    }

    // Agregar días del mes
    for (let dia = 1; dia <= diasEnMes; dia++) {
      dias.push(dia);
    }

    return dias;
  };

  // Fecha (YYYY-MM-DD) correspondiente a un número de día del mes visible
  const fechaStrDeDia = (dia: number): string =>
    formatearFecha(
      new Date(mesActual.getFullYear(), mesActual.getMonth(), dia)
    );

  // Verificar si es el día actual
  const esDiaActual = (dia: number | null): boolean => {
    if (!dia) return false;
    const hoy = new Date();
    return (
      dia === hoy.getDate() &&
      mesActual.getMonth() === hoy.getMonth() &&
      mesActual.getFullYear() === hoy.getFullYear()
    );
  };

  // Contar consultas por día
  const contarConsultasPorDia = (dia: number | null): number => {
    if (!dia) return 0;
    const fechaStr = fechaStrDeDia(dia);
    return consultas.filter(
      (cita) => cita.fecha === fechaStr && cita.estado !== "cancelada"
    ).length;
  };

  // Contar eventos por día (contempla rangos de varios días)
  const contarEventosPorDia = (dia: number | null): number => {
    if (!dia) return 0;
    return eventosEnFecha(fechaStrDeDia(dia)).length;
  };

  // Cambiar mes
  const cambiarMes = (direccion: "anterior" | "siguiente") => {
    setMesActual((prev) => {
      const nuevoMes = new Date(prev);
      if (direccion === "anterior") {
        nuevoMes.setMonth(prev.getMonth() - 1);
      } else {
        nuevoMes.setMonth(prev.getMonth() + 1);
      }
      return nuevoMes;
    });
  };

  // Seleccionar día
  const seleccionarDia = (dia: number | null) => {
    if (!dia) return;
    const nuevaFecha = new Date(
      mesActual.getFullYear(),
      mesActual.getMonth(),
      dia
    );
    setFechaActual(nuevaFecha);
  };

  const dias = obtenerDiasDelMes();

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      {/* Panel de consultas del día - A LA IZQUIERDA */}
      <div className="lg:w-80 w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
            Consultas del día
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {fechaActual.toLocaleDateString("es-CO", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Eventos del día */}
        {eventosDelDia.length > 0 && (
          <div className="mb-4 space-y-3">
            <h4 className="text-sm font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-2">
              <span>📅</span> Eventos
            </h4>
            {eventosDelDia.map((evento) => (
              <div
                key={evento.id}
                className="p-4 rounded-lg border-l-4 bg-purple-50 dark:bg-purple-900/20 border-purple-500"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm font-bold text-gray-800 dark:text-white">
                    {evento.titulo}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full font-medium bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-200 whitespace-nowrap">
                    {formatearHoraEvento(evento)}
                  </span>
                </div>
                {evento.lugar && (
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                    📍 {evento.lugar}
                  </p>
                )}
                {evento.descripcion && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {evento.descripcion}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="space-y-3">
          {consultasDelDia.length === 0 ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-3">
                <svg
                  className="w-8 h-8 text-gray-400 dark:text-gray-500"
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
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No hay consultas programadas para este día
              </p>
            </div>
          ) : (
            consultasDelDia.map((cita) => (
              <div
                key={cita.id}
                onClick={() => onConsultaClick?.(cita)}
                className={`p-4 rounded-lg border-l-4 transition-all cursor-pointer ${
                  cita.estado === "confirmada"
                    ? "bg-green-50 dark:bg-green-900/20 border-green-500 hover:bg-green-100 dark:hover:bg-green-900/30"
                    : cita.estado === "agendada"
                    ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                    : "bg-gray-50 dark:bg-gray-700 border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-lg font-bold text-gray-800 dark:text-white">
                    {cita.hora}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      cita.estado === "confirmada"
                        ? "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200"
                        : cita.estado === "agendada"
                        ? "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200"
                        : "bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {cita.estado}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">
                    {cita.nombrePaciente}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {cita.servicio}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {cita.tipoDocumento} {cita.numeroDocumento}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Calendario - A LA DERECHA */}
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        {/* Header del calendario */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            {mesesAño[mesActual.getMonth()]} {mesActual.getFullYear()}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => cambiarMes("anterior")}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors"
              aria-label="Mes anterior"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => cambiarMes("siguiente")}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors"
              aria-label="Mes siguiente"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-2 mb-3">
          {diasSemana.map((dia) => (
            <div
              key={dia}
              className="text-center text-sm font-semibold text-gray-600 dark:text-gray-400 py-2"
            >
              {dia}
            </div>
          ))}
        </div>

        {/* Grid de días */}
        <div className="grid grid-cols-7 gap-3 md:gap-4">
          {dias.map((dia, index) => {
            const esHoy = esDiaActual(dia);
            const numConsultas = contarConsultasPorDia(dia);
            const tieneConsultas = numConsultas > 0;
            const numEventos = contarEventosPorDia(dia);
            const tieneEventos = numEventos > 0;

            const fechaDiaStr = dia ? fechaStrDeDia(dia) : null;

            return (
              <div
                key={index}
                onClick={() => {
                  seleccionarDia(dia);
                  if (tieneEventos && fechaDiaStr)
                    setModalEventosFecha(fechaDiaStr);
                }}
                onMouseEnter={() => {
                  // Hover en escritorio: mostrar modal si el día tiene eventos
                  if (tieneEventos && fechaDiaStr)
                    setModalEventosFecha(fechaDiaStr);
                }}
                style={
                  esHoy
                    ? {
                        backgroundColor: "#2f8132",
                        // Si además tiene eventos, dejar que la animación de
                        // pulso controle el box-shadow (no lo fijamos aquí)
                        ...(tieneEventos
                          ? {}
                          : { boxShadow: "0 0 0 2px rgba(47, 129, 50, 0.4)" }),
                      }
                    : undefined
                }
                className={`
                  min-h-[64px] md:min-h-[88px] flex flex-col items-center justify-center
                  p-2 rounded-lg text-center transition-all relative
                  ${dia ? "cursor-pointer" : "cursor-default"}
                  ${!dia ? "bg-transparent" : ""}
                  ${
                    dia && !esHoy
                      ? "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
                      : ""
                  }
                  ${tieneEventos ? "dia-con-eventos border-2" : ""}
                  ${
                    esHoy
                      ? "text-white font-bold shadow-lg scale-105"
                      : dia
                      ? "text-gray-700 dark:text-gray-200"
                      : ""
                  }
                `}
              >
                {dia && (
                  <>
                    <span
                      className={`text-lg relative z-10 ${
                        esHoy ? "font-bold" : "font-medium"
                      }`}
                    >
                      {dia}
                    </span>
                    {/* Puntos de consultas */}
                    {tieneConsultas && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5 z-10">
                        {Array.from({ length: Math.min(numConsultas, 3) }).map(
                          (_, i) => (
                            <div
                              key={`c-${i}`}
                              className="w-1.5 h-1.5 rounded-full"
                              style={{
                                backgroundColor: esHoy ? "#ffffff" : "#2f8132",
                              }}
                            />
                          )
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Leyenda */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{
                  backgroundColor: "#2f8132",
                  boxShadow: "0 0 0 2px rgba(47, 129, 50, 0.4)",
                }}
              ></div>
              <span className="text-gray-600 dark:text-gray-400">
                Día actual
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 relative">
                <div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "#2f8132" }}
                ></div>
              </div>
              <span className="text-gray-600 dark:text-gray-400">
                Tiene consultas
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded bg-gray-50 dark:bg-gray-700 border-2"
                style={{ borderColor: "#2f8132" }}
              ></div>
              <span className="text-gray-600 dark:text-gray-400">
                Tiene eventos
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de eventos del día (hover en escritorio / tap en móvil) */}
      {modalEventosFecha && eventosModal.length > 0 && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setModalEventosFecha(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Encabezado */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 rounded-t-xl">
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <span>📅</span> Eventos
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(
                    `${modalEventosFecha}T00:00:00`
                  ).toLocaleDateString("es-CO", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <button
                onClick={() => setModalEventosFecha(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                aria-label="Cerrar"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Lista de eventos */}
            <div className="p-6 space-y-4">
              {eventosModal.map((evento) => (
                <div
                  key={evento.id}
                  className="rounded-lg border-l-4 bg-green-50 dark:bg-green-900/20 p-4"
                  style={{ borderLeftColor: "#2f8132" }}
                >
                  {evento.imagen_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={evento.imagen_url}
                      alt={evento.titulo}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                  )}
                  <h4 className="text-base font-bold text-gray-800 dark:text-white mb-2">
                    {evento.titulo}
                  </h4>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <p className="flex items-center gap-2">
                      <span>🕐</span> {formatearHoraEvento(evento)}
                    </p>
                    {evento.fecha_fin &&
                      evento.fecha_fin.slice(0, 10) !==
                        evento.fecha_inicio.slice(0, 10) && (
                        <p className="flex items-center gap-2">
                          <span>📆</span> Del{" "}
                          {new Date(
                            `${evento.fecha_inicio.slice(0, 10)}T00:00:00`
                          ).toLocaleDateString("es-CO", {
                            day: "numeric",
                            month: "long",
                          })}{" "}
                          al{" "}
                          {new Date(
                            `${evento.fecha_fin.slice(0, 10)}T00:00:00`
                          ).toLocaleDateString("es-CO", {
                            day: "numeric",
                            month: "long",
                          })}
                        </p>
                      )}
                    {evento.lugar && (
                      <p className="flex items-center gap-2">
                        <span>📍</span> {evento.lugar}
                      </p>
                    )}
                  </div>
                  {evento.descripcion && (
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {evento.descripcion}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
