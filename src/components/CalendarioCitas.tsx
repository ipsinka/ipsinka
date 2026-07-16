"use client";

import { useState, useEffect } from "react";
import { DiaCalendario, Cita } from "@/types/citas";
import {
  formatearFecha,
  formatearFechaLegible,
  generarDiaCalendario,
  obtenerDiasDelMes,
  esFinDeSemana,
} from "@/utils/citasUtils";

interface CalendarioCitasProps {
  sedeId: string;
  onSeleccionarFechaHora: (fecha: string, hora: string) => void;
  onVerCitas: (citas: Cita[]) => void;
}

export default function CalendarioCitas({
  sedeId,
  onSeleccionarFechaHora,
  onVerCitas,
}: CalendarioCitasProps) {
  const [mesActual, setMesActual] = useState(new Date());
  const [diasCalendario, setDiasCalendario] = useState<DiaCalendario[]>([]);
  const [diaSeleccionado, setDiaSeleccionado] = useState<string | null>(null);

  useEffect(() => {
    const cargarDatos = () => {
      const año = mesActual.getFullYear();
      const mes = mesActual.getMonth();
      const diasDelMes = obtenerDiasDelMes(año, mes);

      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      const diasConCitas = diasDelMes
        .filter((dia) => dia >= hoy && !esFinDeSemana(dia))
        .map((dia) => generarDiaCalendario(formatearFecha(dia), sedeId));

      setDiasCalendario(diasConCitas);
    };

    cargarDatos();
  }, [mesActual, sedeId]);

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
    setDiaSeleccionado(null);
  };

  const seleccionarDia = (dia: DiaCalendario) => {
    setDiaSeleccionado(dia.fecha);
    const citasDelDia = dia.horarios
      .filter((h) => h.cita)
      .map((h) => h.cita!)
      .filter((c) => c.estado !== "cancelada");

    if (citasDelDia.length > 0) {
      onVerCitas(citasDelDia);
    }
  };

  const seleccionarHorario = (fecha: string, hora: string) => {
    onSeleccionarFechaHora(fecha, hora);
  };

  const obtenerColorDia = (dia: DiaCalendario): string => {
    if (dia.citasCount === 0)
      return "bg-green-100 border-green-300 text-green-800";
    if (dia.citasCount < dia.horarios.length / 2)
      return "bg-yellow-100 border-yellow-300 text-yellow-800";
    return "bg-red-100 border-red-300 text-red-800";
  };

  const hoy = new Date();
  const puedeIrAnterior =
    mesActual.getMonth() > hoy.getMonth() ||
    mesActual.getFullYear() > hoy.getFullYear();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Calendario de Citas</h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => cambiarMes("anterior")}
            disabled={!puedeIrAnterior}
            className={`p-2 rounded-lg ${
              puedeIrAnterior
                ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                : "bg-gray-50 text-gray-400 cursor-not-allowed"
            }`}
          >
            ←
          </button>
          <h4 className="text-lg font-semibold text-gray-700 min-w-[200px] text-center">
            {mesActual.toLocaleDateString("es-CO", {
              month: "long",
              year: "numeric",
            })}
          </h4>
          <button
            onClick={() => cambiarMes("siguiente")}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            →
          </button>
        </div>
      </div>

      {/* Leyenda */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
          <span>Disponible</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
          <span>Parcialmente ocupado</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
          <span>Muy ocupado</span>
        </div>
      </div>

      {/* Grid de días */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {diasCalendario.map((dia) => (
          <div
            key={dia.fecha}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${obtenerColorDia(
              dia
            )} ${
              diaSeleccionado === dia.fecha
                ? "ring-2 ring-blue-500 ring-offset-2"
                : "hover:shadow-md"
            }`}
            onClick={() => seleccionarDia(dia)}
          >
            <div className="text-center">
              <div className="font-semibold text-lg">
                {new Date(dia.fecha + "T00:00:00").getDate()}
              </div>
              <div className="text-xs">
                {formatearFechaLegible(dia.fecha).split(",")[0]}
              </div>
              <div className="mt-2 text-sm">
                {dia.citasCount}/{dia.horarios.length} citas
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Horarios del día seleccionado */}
      {diaSeleccionado && (
        <div className="border-t pt-6">
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">
              📅 Horarios disponibles para{" "}
              {formatearFechaLegible(diaSeleccionado)}
            </h4>
            <p className="text-blue-700 text-sm">
              Haz clic en un horario disponible (verde) para agendar tu cita
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {diasCalendario
              .find((d) => d.fecha === diaSeleccionado)
              ?.horarios.map((horario) => (
                <button
                  key={horario.hora}
                  onClick={() =>
                    horario.disponible &&
                    seleccionarHorario(diaSeleccionado, horario.hora)
                  }
                  disabled={!horario.disponible}
                  className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    horario.disponible
                      ? "bg-green-600 text-white hover:bg-green-700 hover:scale-105 shadow-md hover:shadow-lg"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed opacity-50"
                  }`}
                >
                  <div className="font-bold">{horario.hora}</div>
                  {horario.cita ? (
                    <div className="text-xs mt-1 truncate bg-red-100 text-red-800 px-1 rounded">
                      Ocupado
                    </div>
                  ) : (
                    <div className="text-xs mt-1 text-green-100">
                      Disponible
                    </div>
                  )}
                </button>
              ))}
          </div>

          {diasCalendario
            .find((d) => d.fecha === diaSeleccionado)
            ?.horarios.every((h) => !h.disponible) && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg font-medium">
                😔 No hay horarios disponibles
              </p>
              <p className="text-sm">
                Todos los horarios de este día están ocupados. Selecciona otro
                día.
              </p>
            </div>
          )}
        </div>
      )}

      {!diaSeleccionado && diasCalendario.length > 0 && (
        <div className="text-center py-8 text-blue-600 bg-blue-50 rounded-lg">
          <p className="text-lg font-medium">
            👆 Selecciona un día del calendario
          </p>
          <p className="text-sm">
            Haz clic en cualquier día para ver los horarios disponibles
          </p>
        </div>
      )}

      {diasCalendario.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hay días disponibles para agendar citas en este mes.
        </div>
      )}
    </div>
  );
}
