import { Cita } from '@/types/citas';

/**
 * Citas de ejemplo para pruebas
 * Para cargar estas citas en el LocalStorage, importa y usa la función cargarCitasEjemplo()
 */

// Función helper para obtener fechas relativas
const obtenerFecha = (diasDesdeHoy: number): string => {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + diasDesdeHoy);
  return fecha.toISOString().split('T')[0];
};

export const citasEjemplo: Cita[] = [
  // Citas de HOY
  {
    id: 'cita-001',
    sedeId: 'sibundoy',
    fecha: obtenerFecha(0), // Hoy
    hora: '08:00',
    nombrePaciente: 'María Elena Jacanamejoy',
    telefonoPaciente: '3201234567',
    tipoDocumento: 'CC',
    numeroDocumento: '1234567890',
    servicio: 'Medicina General',
    estado: 'confirmada',
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: 'cita-002',
    sedeId: 'sibundoy',
    fecha: obtenerFecha(0), // Hoy
    hora: '09:00',
    nombrePaciente: 'Carlos Jamioy Muchavisoy',
    telefonoPaciente: '3109876543',
    tipoDocumento: 'CC',
    numeroDocumento: '9876543210',
    servicio: 'Odontología',
    estado: 'confirmada',
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: 'cita-003',
    sedeId: 'sibundoy',
    fecha: obtenerFecha(0), // Hoy
    hora: '10:30',
    nombrePaciente: 'Ana Sofía Chindoy',
    telefonoPaciente: '3157894561',
    tipoDocumento: 'CC',
    numeroDocumento: '1122334455',
    servicio: 'Control Prenatal',
    estado: 'agendada',
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: 'cita-004',
    sedeId: 'sibundoy',
    fecha: obtenerFecha(0), // Hoy
    hora: '14:30',
    nombrePaciente: 'Pedro Chicunque Agreda',
    telefonoPaciente: '3186547893',
    tipoDocumento: 'CC',
    numeroDocumento: '5544332211',
    servicio: 'Medicina General',
    estado: 'agendada',
    fechaCreacion: new Date().toISOString(),
  },

  // Citas de MAÑANA
  {
    id: 'cita-005',
    sedeId: 'sibundoy',
    fecha: obtenerFecha(1), // Mañana
    hora: '07:00',
    nombrePaciente: 'Rosa Chindoy Portilla',
    telefonoPaciente: '3145678901',
    tipoDocumento: 'CC',
    numeroDocumento: '6677889900',
    servicio: 'Enfermería',
    estado: 'confirmada',
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: 'cita-006',
    sedeId: 'sibundoy',
    fecha: obtenerFecha(1), // Mañana
    hora: '08:30',
    nombrePaciente: 'Luis Alberto Jacanamejoy',
    telefonoPaciente: '3201237894',
    tipoDocumento: 'CC',
    numeroDocumento: '2233445566',
    servicio: 'Pediatría',
    estado: 'agendada',
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: 'cita-007',
    sedeId: 'sibundoy',
    fecha: obtenerFecha(1), // Mañana
    hora: '11:00',
    nombrePaciente: 'Diana Carolina Mavisoy',
    telefonoPaciente: '3167894562',
    tipoDocumento: 'CC',
    numeroDocumento: '7788996655',
    servicio: 'Ginecología',
    estado: 'confirmada',
    fechaCreacion: new Date().toISOString(),
  },

  // Citas dentro de 2 días
  {
    id: 'cita-008',
    sedeId: 'sibundoy',
    fecha: obtenerFecha(2),
    hora: '09:00',
    nombrePaciente: 'Jorge Eliecer Chicunque',
    telefonoPaciente: '3123456789',
    tipoDocumento: 'CC',
    numeroDocumento: '3344556677',
    servicio: 'Laboratorio Clínico',
    estado: 'agendada',
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: 'cita-009',
    sedeId: 'sibundoy',
    fecha: obtenerFecha(2),
    hora: '10:00',
    nombrePaciente: 'Patricia Jamioy Tisoy',
    telefonoPaciente: '3198765432',
    tipoDocumento: 'CC',
    numeroDocumento: '8899001122',
    servicio: 'Vacunación',
    estado: 'confirmada',
    fechaCreacion: new Date().toISOString(),
  },

  // Citas dentro de 3 días
  {
    id: 'cita-010',
    sedeId: 'sibundoy',
    fecha: obtenerFecha(3),
    hora: '08:00',
    nombrePaciente: 'Fernando Chindoy Jacanamijoy',
    telefonoPaciente: '3156781234',
    tipoDocumento: 'CC',
    numeroDocumento: '4455667788',
    servicio: 'Odontología',
    estado: 'agendada',
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: 'cita-011',
    sedeId: 'sibundoy',
    fecha: obtenerFecha(3),
    hora: '15:00',
    nombrePaciente: 'Gloria Esthela Muchavisoy',
    telefonoPaciente: '3187894561',
    tipoDocumento: 'CC',
    numeroDocumento: '9900112233',
    servicio: 'Medicina General',
    estado: 'agendada',
    fechaCreacion: new Date().toISOString(),
  },

  // Citas dentro de 5 días
  {
    id: 'cita-012',
    sedeId: 'sibundoy',
    fecha: obtenerFecha(5),
    hora: '07:30',
    nombrePaciente: 'Roberto Carlos Jamioy',
    telefonoPaciente: '3201239876',
    tipoDocumento: 'CC',
    numeroDocumento: '1122994455',
    servicio: 'Control Prenatal',
    estado: 'confirmada',
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: 'cita-013',
    sedeId: 'sibundoy',
    fecha: obtenerFecha(5),
    hora: '14:00',
    nombrePaciente: 'Luisa Fernanda Chindoy',
    telefonoPaciente: '3147896543',
    tipoDocumento: 'CC',
    numeroDocumento: '6677445522',
    servicio: 'Pediatría',
    estado: 'agendada',
    fechaCreacion: new Date().toISOString(),
  },

  // Citas de otras sedes
  {
    id: 'cita-014',
    sedeId: 'colon',
    fecha: obtenerFecha(0),
    hora: '09:00',
    nombrePaciente: 'Miguel Angel Portilla',
    telefonoPaciente: '3165432198',
    tipoDocumento: 'CC',
    numeroDocumento: '3366889922',
    servicio: 'Medicina General',
    estado: 'confirmada',
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: 'cita-015',
    sedeId: 'santiago',
    fecha: obtenerFecha(1),
    hora: '10:30',
    nombrePaciente: 'Beatriz Elena Tisoy',
    telefonoPaciente: '3198761234',
    tipoDocumento: 'CC',
    numeroDocumento: '7788112233',
    servicio: 'Odontología',
    estado: 'agendada',
    fechaCreacion: new Date().toISOString(),
  },
];

/**
 * Función para cargar las citas de ejemplo en LocalStorage
 * ADVERTENCIA: Esto reemplazará todas las citas existentes
 */
export const cargarCitasEjemplo = (): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem('citas-inga', JSON.stringify(citasEjemplo));
    console.log(`✅ ${citasEjemplo.length} citas de ejemplo cargadas correctamente`);
  } catch (error) {
    console.error('❌ Error al cargar citas de ejemplo:', error);
  }
};

/**
 * Función para agregar citas de ejemplo sin borrar las existentes
 */
export const agregarCitasEjemplo = (): void => {
  if (typeof window === 'undefined') return;

  try {
    const citasExistentes = localStorage.getItem('citas-inga');
    const citas = citasExistentes ? JSON.parse(citasExistentes) : [];

    // Agregar solo las citas que no existen
    const citasNuevas = citasEjemplo.filter(
      citaEjemplo => !citas.some((c: Cita) => c.id === citaEjemplo.id)
    );

    const citasActualizadas = [...citas, ...citasNuevas];
    localStorage.setItem('citas-inga', JSON.stringify(citasActualizadas));

    console.log(`✅ ${citasNuevas.length} citas de ejemplo agregadas. Total: ${citasActualizadas.length}`);
  } catch (error) {
    console.error('❌ Error al agregar citas de ejemplo:', error);
  }
};

/**
 * Función para limpiar todas las citas
 */
export const limpiarTodasLasCitas = (): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem('citas-inga');
    console.log('✅ Todas las citas han sido eliminadas');
  } catch (error) {
    console.error('❌ Error al limpiar citas:', error);
  }
};
