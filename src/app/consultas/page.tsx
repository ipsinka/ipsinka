'use client';

import { useState, useEffect } from 'react';
import CalendarioConsultas from '@/components/CalendarioConsultas';
import { obtenerTodasLasCitas } from '@/data/citasProduccion';
import { Cita } from '@/types/citas';
import {
  cargarCitasEjemplo,
  agregarCitasEjemplo,
  limpiarTodasLasCitas,
} from '@/data/citasEjemplo';
import { confirmDelete, confirmAction } from '@/lib/alerts';

export default function ConsultasPage() {
  const [consultas, setConsultas] = useState<Cita[]>([]);
  const [sedeSeleccionada, setSedeSeleccionada] = useState<string>('todas');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState<Cita | null>(null);

  const sedes = [
    { id: 'todas', nombre: 'Todas las sedes' },
    { id: 'sibundoy', nombre: 'Sede Principal Sibundoy' },
    { id: 'colon', nombre: 'Sede Colón' },
    { id: 'santiago', nombre: 'Sede Santiago' },
    { id: 'san-andres', nombre: 'Sede San Andrés' },
  ];

  // Cargar consultas combinadas (producción + localStorage)
  const cargarConsultas = () => {
    const citas = obtenerTodasLasCitas();
    setConsultas(citas);
  };

  useEffect(() => {
    cargarConsultas();
  }, []);

  // Filtrar consultas por sede
  const consultasFiltradas =
    sedeSeleccionada === 'todas'
      ? consultas
      : consultas.filter((c) => c.sedeId === sedeSeleccionada);

  // Manejar click en una consulta
  const handleConsultaClick = (cita: Cita) => {
    setCitaSeleccionada(cita);
    setMostrarModal(true);
  };

  // Cargar datos de ejemplo
  const handleCargarEjemplos = async () => {
    if (
      await confirmAction(
        '¿Deseas cargar las citas de ejemplo? Esto reemplazará todas las citas actuales.',
        { title: 'Cargar ejemplos', confirmButtonText: 'Sí, cargar' }
      )
    ) {
      cargarCitasEjemplo();
      cargarConsultas();
    }
  };

  // Agregar datos de ejemplo sin borrar
  const handleAgregarEjemplos = () => {
    agregarCitasEjemplo();
    cargarConsultas();
  };

  // Limpiar todas las citas
  const handleLimpiarCitas = async () => {
    if (
      await confirmDelete(
        '¿Estás seguro de eliminar TODAS las citas? Esta acción no se puede deshacer.',
        { title: 'Eliminar todas las citas', confirmButtonText: 'Sí, eliminar todas' }
      )
    ) {
      limpiarTodasLasCitas();
      cargarConsultas();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            📅 Calendario de Consultas
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Visualiza y gestiona las consultas médicas programadas
          </p>
        </div>

        {/* Panel de control */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Filtro de sede */}
            <div className="flex-1 w-full lg:w-auto">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filtrar por sede:
              </label>
              <select
                value={sedeSeleccionada}
                onChange={(e) => setSedeSeleccionada(e.target.value)}
                className="w-full lg:w-64 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                {sedes.map((sede) => (
                  <option key={sede.id} value={sede.id}>
                    {sede.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleAgregarEjemplos}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                ➕ Agregar Ejemplos
              </button>
              <button
                onClick={handleCargarEjemplos}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                📥 Cargar Ejemplos
              </button>
              <button
                onClick={handleLimpiarCitas}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                🗑️ Limpiar Todo
              </button>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {consultasFiltradas.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Consultas
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {
                  consultasFiltradas.filter((c) => c.estado === 'confirmada')
                    .length
                }
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Confirmadas
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {
                  consultasFiltradas.filter((c) => c.estado === 'agendada')
                    .length
                }
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Agendadas
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                {
                  consultasFiltradas.filter((c) => c.estado === 'completada')
                    .length
                }
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Completadas
              </div>
            </div>
          </div>
        </div>

        {/* Calendario */}
        {consultasFiltradas.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center border border-gray-200 dark:border-gray-700">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
              <svg
                className="w-10 h-10 text-gray-400 dark:text-gray-500"
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
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              No hay consultas registradas
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Carga algunas citas de ejemplo para comenzar a visualizar el
              calendario
            </p>
            <button
              onClick={handleCargarEjemplos}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              📥 Cargar Citas de Ejemplo
            </button>
          </div>
        ) : (
          <CalendarioConsultas
            consultas={consultasFiltradas}
            onConsultaClick={handleConsultaClick}
          />
        )}
      </div>

      {/* Modal de detalle de cita */}
      {mostrarModal && citaSeleccionada && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setMostrarModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                Detalle de Consulta
              </h3>
              <button
                onClick={() => setMostrarModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
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

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-3xl">📅</div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Fecha y Hora
                  </div>
                  <div className="font-semibold text-gray-800 dark:text-white">
                    {new Date(citaSeleccionada.fecha).toLocaleDateString(
                      'es-CO',
                      {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }
                    )}
                  </div>
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {citaSeleccionada.hora}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Paciente
                </div>
                <div className="font-semibold text-gray-800 dark:text-white">
                  {citaSeleccionada.nombrePaciente}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Documento
                  </div>
                  <div className="font-semibold text-gray-800 dark:text-white">
                    {citaSeleccionada.tipoDocumento}{' '}
                    {citaSeleccionada.numeroDocumento}
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Teléfono
                  </div>
                  <div className="font-semibold text-gray-800 dark:text-white">
                    {citaSeleccionada.telefonoPaciente}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Servicio
                </div>
                <div className="font-semibold text-gray-800 dark:text-white">
                  {citaSeleccionada.servicio}
                </div>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Estado
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    citaSeleccionada.estado === 'confirmada'
                      ? 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200'
                      : citaSeleccionada.estado === 'agendada'
                      ? 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200'
                      : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200'
                  }`}
                >
                  {citaSeleccionada.estado.toUpperCase()}
                </span>
              </div>
            </div>

            <button
              onClick={() => setMostrarModal(false)}
              className="w-full mt-6 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
