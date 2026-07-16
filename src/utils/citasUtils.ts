import { Cita, DiaCalendario, HorarioDisponible, HORARIOS_TRABAJO, HORARIOS_SABADO } from '@/types/citas';

export const formatearFecha = (fecha: Date): string => {
  return fecha.toISOString().split('T')[0];
};

export const formatearFechaLegible = (fecha: string): string => {
  const date = new Date(fecha);
  const opciones: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return date.toLocaleDateString('es-CO', opciones);
};

export const esFinDeSemana = (fecha: Date): boolean => {
  const dia = fecha.getDay();
  return dia === 0; // Domingo
};

export const esSabado = (fecha: Date): boolean => {
  const dia = fecha.getDay();
  return dia === 6; // Sábado
};

export const obtenerHorariosParaFecha = (fecha: Date): string[] => {
  if (esFinDeSemana(fecha)) return [];
  if (esSabado(fecha)) return HORARIOS_SABADO;
  return HORARIOS_TRABAJO;
};

export const generarId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const obtenerCitasDelLocalStorage = (): Cita[] => {
  if (typeof window === 'undefined') return [];
  try {
    const citas = localStorage.getItem('citas-inga');
    return citas ? JSON.parse(citas) : [];
  } catch {
    return [];
  }
};

export const guardarCitaEnLocalStorage = (cita: Cita): void => {
  if (typeof window === 'undefined') return;
  try {
    const citas = obtenerCitasDelLocalStorage();
    citas.push(cita);
    localStorage.setItem('citas-inga', JSON.stringify(citas));
  } catch (error) {
    console.error('Error al guardar cita:', error);
  }
};

export const eliminarCitaDelLocalStorage = (citaId: string): void => {
  if (typeof window === 'undefined') return;
  try {
    const citas = obtenerCitasDelLocalStorage();
    const citasFiltradas = citas.filter(cita => cita.id !== citaId);
    localStorage.setItem('citas-inga', JSON.stringify(citasFiltradas));
  } catch (error) {
    console.error('Error al eliminar cita:', error);
  }
};

export const obtenerCitasParaSede = (sedeId: string): Cita[] => {
  return obtenerCitasDelLocalStorage().filter(cita => cita.sedeId === sedeId);
};

export const obtenerCitasParaFecha = (fecha: string, sedeId: string): Cita[] => {
  return obtenerCitasParaSede(sedeId).filter(cita => cita.fecha === fecha);
};

export const estaHorarioDisponible = (fecha: string, hora: string, sedeId: string): boolean => {
  const citasDelDia = obtenerCitasParaFecha(fecha, sedeId);
  return !citasDelDia.some(cita => 
    cita.hora === hora && cita.estado !== 'cancelada'
  );
};

export const generarDiaCalendario = (fecha: string, sedeId: string): DiaCalendario => {
  const fechaObj = new Date(fecha + 'T00:00:00');
  const horariosDisponibles = obtenerHorariosParaFecha(fechaObj);
  const citasDelDia = obtenerCitasParaFecha(fecha, sedeId);
  
  const horarios: HorarioDisponible[] = horariosDisponibles.map(hora => {
    const cita = citasDelDia.find(c => c.hora === hora && c.estado !== 'cancelada');
    return {
      hora,
      disponible: !cita,
      cita
    };
  });

  return {
    fecha,
    horarios,
    citasCount: citasDelDia.filter(c => c.estado !== 'cancelada').length
  };
};

export const obtenerProximosMeses = (meses: number = 2): Date[] => {
  const fechas: Date[] = [];
  const hoy = new Date();
  
  for (let i = 0; i < meses; i++) {
    const fecha = new Date(hoy.getFullYear(), hoy.getMonth() + i, 1);
    fechas.push(fecha);
  }
  
  return fechas;
};

export const obtenerDiasDelMes = (año: number, mes: number): Date[] => {
  const primerDia = new Date(año, mes, 1);
  const ultimoDia = new Date(año, mes + 1, 0);
  const dias: Date[] = [];
  
  for (let dia = primerDia.getDate(); dia <= ultimoDia.getDate(); dia++) {
    dias.push(new Date(año, mes, dia));
  }
  
  return dias;
};

export const validarDatosCita = (cita: Partial<Cita>): string[] => {
  const errores: string[] = [];
  
  if (!cita.nombrePaciente?.trim()) {
    errores.push('El nombre del paciente es requerido');
  }
  
  if (!cita.telefonoPaciente?.trim()) {
    errores.push('El teléfono es requerido');
  }
  
  if (!cita.numeroDocumento?.trim()) {
    errores.push('El número de documento es requerido');
  }
  
  if (!cita.tipoDocumento) {
    errores.push('El tipo de documento es requerido');
  }
  
  if (!cita.servicio) {
    errores.push('El servicio es requerido');
  }
  
  if (!cita.fecha) {
    errores.push('La fecha es requerida');
  }
  
  if (!cita.hora) {
    errores.push('La hora es requerida');
  }
  
  return errores;
};