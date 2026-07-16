// Datos de eventos para el calendario
// Puedes editar este archivo para agregar, modificar o eliminar eventos

export const events = [
  {
    id: 1,
    date: "2025-10-09",
    title: "Procedimiento Técnico-Científico y participativo para la exclusión de Tecnologías",
    description:
      "Desarrollo de la Fase III: Consulta a pacientes potencialmente afectados y ciudadanía – Departamento del Cauca",
    location: "Departamento del Cauca",
    type: "procedimiento",
  },
  {
    id: 2,
    date: "2025-10-10",
    title: "Procedimiento Técnico-Científico y participativo para la exclusión de Tecnologías",
    description:
      "Desarrollo de la Fase III: Consulta a pacientes potencialmente afectados y ciudadanía – Departamento del Cauca",
    location: "Departamento del Cauca",
    type: "procedimiento",
  },
  {
    id: 3,
    date: "2025-10-15",
    title: "Procedimiento Técnico-Científico y participativo para la exclusión de Tecnologías",
    description:
      "Desarrollo de la Fase III: Consulta a pacientes potencialmente afectados y ciudadanía – Departamento del Santander",
    location: "Departamento del Santander",
    type: "procedimiento",
  },
  {
    id: 4,
    date: "2025-10-16",
    title: "Procedimiento Técnico-Científico y participativo para la exclusión de Tecnologías",
    description:
      "Desarrollo de la Fase III: Consulta a pacientes potencialmente afectados y ciudadanía – Departamento del Santander",
    location: "Departamento del Santander",
    type: "procedimiento",
  },
  {
    id: 5,
    date: "2025-10-17",
    title: "Procedimiento Técnico-Científico y participativo para la exclusión de Tecnologías",
    description:
      "Desarrollo de la Fase III: Consulta a pacientes potencialmente afectados y ciudadanía – Departamento del Santander",
    location: "Departamento del Santander",
    type: "procedimiento",
  },
  {
    id: 6,
    date: "2025-10-20",
    title: "Procedimiento Técnico-Científico y participativo para la exclusión de Tecnologías",
    description:
      "Desarrollo de la Fase III: Consulta a pacientes potencialmente afectados y ciudadanía – Departamento del Putumayo",
    location: "Departamento del Putumayo",
    type: "procedimiento",
  },
  {
    id: 7,
    date: "2025-10-21",
    title: "Procedimiento Técnico-Científico y participativo para la exclusión de Tecnologías",
    description:
      "Desarrollo de la Fase III: Consulta a pacientes potencialmente afectados y ciudadanía – Departamento del Putumayo",
    location: "Departamento del Putumayo",
    type: "procedimiento",
  },
  {
    id: 8,
    date: "2025-10-24",
    title: "Procedimiento Técnico-Científico y participativo para la exclusión de Tecnologías",
    description:
      "Desarrollo de la Fase III: Consulta a pacientes potencialmente afectados y ciudadanía – Departamento del Putumayo",
    location: "Departamento del Putumayo",
    type: "procedimiento",
  },
  {
    id: 9,
    date: "2025-10-29",
    title: "Procedimiento Técnico-Científico y participativo para la exclusión de Tecnologías",
    description:
      "Desarrollo de la Fase III: Consulta a pacientes potencialmente afectados y ciudadanía – Departamento del Putumayo",
    location: "Departamento del Putumayo",
    type: "procedimiento",
  },
];

// Función auxiliar para obtener eventos de un mes específico
export function getEventsByMonth(year, month) {
  return events.filter((event) => {
    const eventDate = new Date(event.date + 'T00:00:00');
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month
    );
  });
}

// Función auxiliar para obtener eventos de una fecha específica
export function getEventsByDate(dateString) {
  return events.filter((event) => event.date === dateString);
}

// Función auxiliar para verificar si una fecha tiene eventos
export function hasEvents(dateString) {
  return events.some((event) => event.date === dateString);
}
