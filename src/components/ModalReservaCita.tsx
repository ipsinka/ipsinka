"use client";

import { useState } from "react";
import { Cita, SERVICIOS_DISPONIBLES } from "@/types/citas";
import {
  formatearFechaLegible,
  generarId,
  guardarCitaEnLocalStorage,
  validarDatosCita,
} from "@/utils/citasUtils";

interface ModalReservaCitaProps {
  isOpen: boolean;
  onClose: () => void;
  sedeId: string;
  sedeName: string;
  fecha: string;
  hora: string;
  onCitaCreada: () => void;
}

export default function ModalReservaCita({
  isOpen,
  onClose,
  sedeId,
  sedeName,
  fecha,
  hora,
  onCitaCreada,
}: ModalReservaCitaProps) {
  const [formData, setFormData] = useState({
    nombrePaciente: "",
    telefonoPaciente: "",
    tipoDocumento: "CC" as const,
    numeroDocumento: "",
    servicio: "",
  });
  const [errores, setErrores] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar errores cuando el usuario empiece a escribir
    if (errores.length > 0) {
      setErrores([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const nuevaCita: Cita = {
      id: generarId(),
      sedeId,
      fecha,
      hora,
      ...formData,
      estado: "agendada",
      fechaCreacion: new Date().toISOString(),
    };

    const erroresValidacion = validarDatosCita(nuevaCita);

    if (erroresValidacion.length > 0) {
      setErrores(erroresValidacion);
      setIsSubmitting(false);
      return;
    }

    try {
      guardarCitaEnLocalStorage(nuevaCita);

      // Resetear formulario
      setFormData({
        nombrePaciente: "",
        telefonoPaciente: "",
        tipoDocumento: "CC",
        numeroDocumento: "",
        servicio: "",
      });

      onCitaCreada();
      onClose();
    } catch {
      setErrores(["Error al agendar la cita. Por favor intente nuevamente."]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      nombrePaciente: "",
      telefonoPaciente: "",
      tipoDocumento: "CC",
      numeroDocumento: "",
      servicio: "",
    });
    setErrores([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Agendar Cita</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
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

          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <div className="text-sm text-green-800">
              <p>
                <strong>Sede:</strong> {sedeName}
              </p>
              <p>
                <strong>Fecha:</strong> {formatearFechaLegible(fecha)}
              </p>
              <p>
                <strong>Hora:</strong> {hora}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errores.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="text-red-800 font-semibold mb-2">
                Por favor corrija los siguientes errores:
              </h4>
              <ul className="text-red-700 text-sm space-y-1">
                {errores.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <label
              htmlFor="nombrePaciente"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nombre completo del paciente *
            </label>
            <input
              type="text"
              id="nombrePaciente"
              name="nombrePaciente"
              value={formData.nombrePaciente}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Ingrese el nombre completo"
              required
            />
          </div>

          <div>
            <label
              htmlFor="telefonoPaciente"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Teléfono de contacto *
            </label>
            <input
              type="tel"
              id="telefonoPaciente"
              name="telefonoPaciente"
              value={formData.telefonoPaciente}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Ej: 3132863398"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="tipoDocumento"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tipo de documento *
              </label>
              <select
                id="tipoDocumento"
                name="tipoDocumento"
                value={formData.tipoDocumento}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="TI">Tarjeta de Identidad</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="PP">Pasaporte</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="numeroDocumento"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Número de documento *
              </label>
              <input
                type="text"
                id="numeroDocumento"
                name="numeroDocumento"
                value={formData.numeroDocumento}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Número"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="servicio"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Servicio requerido *
            </label>
            <select
              id="servicio"
              name="servicio"
              value={formData.servicio}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="">Seleccione un servicio</option>
              {SERVICIOS_DISPONIBLES.map((servicio) => (
                <option key={servicio} value={servicio}>
                  {servicio}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
            <p className="font-semibold mb-1">Importante:</p>
            <ul className="space-y-1">
              <li>• Llegue 15 minutos antes de su cita</li>
              <li>• Traiga su documento de identidad</li>
              <li>• Si no puede asistir, cancele con anticipación</li>
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Agendando..." : "Agendar Cita"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
