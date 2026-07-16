export interface Cita {
  id: string;
  sedeId: string;
  fecha: string;
  hora: string;
  nombrePaciente: string;
  telefonoPaciente: string;
  tipoDocumento: 'CC' | 'TI' | 'CE' | 'PP';
  numeroDocumento: string;
  servicio: string;
  estado: 'agendada' | 'confirmada' | 'cancelada' | 'completada';
  fechaCreacion: string;
}

export interface HorarioDisponible {
  hora: string;
  disponible: boolean;
  cita?: Cita;
}

export interface DiaCalendario {
  fecha: string;
  horarios: HorarioDisponible[];
  citasCount: number;
}

export const HORARIOS_TRABAJO = [
  '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
  '10:00', '10:30', '11:00', '11:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00'
];

export const HORARIOS_SABADO = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00'
];

export const SERVICIOS_DISPONIBLES = [
  'Medicina General',
  'Pediatría',
  'Ginecología',
  'Odontología',
  'Control Prenatal',
  'Vacunación',
  'Enfermería',
  'Laboratorio Clínico'
];