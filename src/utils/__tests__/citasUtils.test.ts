import {
  formatearFecha,
  esFinDeSemana,
  esSabado,
  obtenerHorariosParaFecha,
  obtenerDiasDelMes,
  validarDatosCita,
  estaHorarioDisponible,
  guardarCitaEnLocalStorage,
  eliminarCitaDelLocalStorage,
  obtenerCitasDelLocalStorage,
  generarDiaCalendario,
} from "@/utils/citasUtils";
import { HORARIOS_TRABAJO, HORARIOS_SABADO, type Cita } from "@/types/citas";

const citaBase: Cita = {
  id: "c1",
  sedeId: "sibundoy",
  fecha: "2026-11-03",
  hora: "08:00",
  nombrePaciente: "Paciente de prueba",
  telefonoPaciente: "3000000000",
  tipoDocumento: "CC",
  numeroDocumento: "123",
  servicio: "Medicina general",
  estado: "agendada",
  fechaCreacion: "2026-10-30",
};

describe("formatearFecha", () => {
  it("devuelve YYYY-MM-DD con ceros a la izquierda", () => {
    expect(formatearFecha(new Date(2026, 0, 5))).toBe("2026-01-05");
  });

  it("usa la fecha local aunque sea de noche (no se adelanta a UTC)", () => {
    // 30 oct 2026, 11:30 p. m. hora local: en UTC-5 ya sería 31 oct.
    expect(formatearFecha(new Date(2026, 9, 30, 23, 30))).toBe("2026-10-30");
  });
});

describe("días y horarios", () => {
  const domingo = new Date(2026, 10, 1);
  const sabado = new Date(2026, 9, 31);
  const lunes = new Date(2026, 10, 2);

  it("detecta domingo y sábado", () => {
    expect(esFinDeSemana(domingo)).toBe(true);
    expect(esFinDeSemana(sabado)).toBe(false);
    expect(esSabado(sabado)).toBe(true);
    expect(esSabado(lunes)).toBe(false);
  });

  it("asigna los horarios según el día", () => {
    expect(obtenerHorariosParaFecha(domingo)).toEqual([]);
    expect(obtenerHorariosParaFecha(sabado)).toBe(HORARIOS_SABADO);
    expect(obtenerHorariosParaFecha(lunes)).toBe(HORARIOS_TRABAJO);
  });

  it("lista todos los días del mes, incluido febrero bisiesto", () => {
    expect(obtenerDiasDelMes(2026, 9)).toHaveLength(31);
    expect(obtenerDiasDelMes(2028, 1)).toHaveLength(29);
  });
});

describe("validarDatosCita", () => {
  it("no reporta errores con una cita completa", () => {
    expect(validarDatosCita(citaBase)).toEqual([]);
  });

  it("reporta cada campo obligatorio faltante o en blanco", () => {
    const errores = validarDatosCita({ nombrePaciente: "   " });
    expect(errores).toHaveLength(7);
    expect(errores).toContain("El nombre del paciente es requerido");
  });
});

describe("citas en localStorage", () => {
  beforeEach(() => localStorage.clear());

  it("guarda, lista y elimina citas", () => {
    guardarCitaEnLocalStorage(citaBase);
    guardarCitaEnLocalStorage({ ...citaBase, id: "c2", hora: "09:00" });
    expect(obtenerCitasDelLocalStorage().map((c) => c.id)).toEqual(["c1", "c2"]);

    eliminarCitaDelLocalStorage("c1");
    expect(obtenerCitasDelLocalStorage().map((c) => c.id)).toEqual(["c2"]);
  });

  it("devuelve una lista vacía si el JSON guardado está dañado", () => {
    localStorage.setItem("citas-inga", "{no es json");
    expect(obtenerCitasDelLocalStorage()).toEqual([]);
  });

  it("un horario ocupado deja de estar disponible salvo si la cita se canceló", () => {
    guardarCitaEnLocalStorage(citaBase);
    expect(estaHorarioDisponible("2026-11-03", "08:00", "sibundoy")).toBe(false);
    expect(estaHorarioDisponible("2026-11-03", "08:00", "colon")).toBe(true);

    localStorage.clear();
    guardarCitaEnLocalStorage({ ...citaBase, estado: "cancelada" });
    expect(estaHorarioDisponible("2026-11-03", "08:00", "sibundoy")).toBe(true);
  });

  it("generarDiaCalendario marca los horarios ocupados y cuenta las citas activas", () => {
    guardarCitaEnLocalStorage(citaBase);
    guardarCitaEnLocalStorage({ ...citaBase, id: "c2", hora: "09:00", estado: "cancelada" });

    const dia = generarDiaCalendario("2026-11-03", "sibundoy");
    expect(dia.citasCount).toBe(1);
    expect(dia.horarios.find((h) => h.hora === "08:00")?.disponible).toBe(false);
    expect(dia.horarios.find((h) => h.hora === "09:00")?.disponible).toBe(true);
  });
});
