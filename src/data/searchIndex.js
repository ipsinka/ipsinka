// Índice de contenido para búsqueda global de la entidad pública
export const searchIndex = [
  // Servicios Médicos
  {
    id: 'medicina-general',
    title: 'Medicina General',
    description: 'Atención médica integral para toda la familia con profesionales especializados',
    category: 'Servicios Médicos',
    tags: ['consulta', 'médico', 'general', 'familia', 'atención primaria'],
    url: '/servicios/medicina-general',
    priority: 'high'
  },
  {
    id: 'pediatria',
    title: 'Pediatría',
    description: 'Atención médica especializada para niños y adolescentes',
    category: 'Especialidades',
    tags: ['niños', 'pediatra', 'adolescentes', 'vacunas', 'crecimiento'],
    url: '/servicios/pediatria',
    priority: 'high'
  },
  {
    id: 'ginecologia',
    title: 'Ginecología',
    description: 'Atención médica especializada para la salud femenina',
    category: 'Especialidades',
    tags: ['mujer', 'ginecólogo', 'embarazo', 'control prenatal', 'planificación familiar'],
    url: '/servicios/ginecologia',
    priority: 'high'
  },
  {
    id: 'odontologia',
    title: 'Odontología',
    description: 'Servicios dentales completos para toda la familia',
    category: 'Especialidades',
    tags: ['dientes', 'odontólogo', 'dental', 'ortodoncia', 'limpieza'],
    url: '/servicios/odontologia',
    priority: 'high'
  },
  {
    id: 'urgencias',
    title: 'Servicio de Urgencias',
    description: 'Atención médica de emergencia las 24 horas del día',
    category: 'Servicios de Emergencia',
    tags: ['urgencias', 'emergencia', '24 horas', 'ambulancia', 'trauma'],
    url: '/servicios/urgencias',
    priority: 'critical'
  },

  // Sedes y Ubicaciones
  {
    id: 'sede-sibundoy',
    title: 'Sede Sibundoy',
    description: 'Sede principal de la IPS INGA KAMËNTSÁ en Sibundoy, Putumayo',
    category: 'Sedes',
    tags: ['sibundoy', 'sede principal', 'putumayo', 'ubicación', 'dirección'],
    url: '/sedes/sibundoy',
    priority: 'high'
  },
  {
    id: 'sede-colon',
    title: 'Sede Colón',
    description: 'Centro de atención médica en Colón, Putumayo',
    category: 'Sedes',
    tags: ['colón', 'putumayo', 'centro de salud', 'ubicación'],
    url: '/sedes/colon',
    priority: 'medium'
  },
  {
    id: 'sede-santiago',
    title: 'Sede Santiago',
    description: 'Puesto de salud en Santiago, Putumayo',
    category: 'Sedes',
    tags: ['santiago', 'putumayo', 'puesto de salud', 'ubicación'],
    url: '/sedes/santiago',
    priority: 'medium'
  },
  {
    id: 'sede-san-andres',
    title: 'Sede San Andrés',
    description: 'Centro de atención médica en San Andrés, Putumayo',
    category: 'Sedes',
    tags: ['san andrés', 'putumayo', 'centro de salud', 'ubicación'],
    url: '/sedes/san-andres',
    priority: 'medium'
  },

  // Trámites y Servicios Administrativos
  {
    id: 'afiliaciones',
    title: 'Afiliaciones al Sistema de Salud',
    description: 'Proceso de afiliación a la IPS para acceder a servicios de salud',
    category: 'Trámites',
    tags: ['afiliación', 'eps', 'régimen subsidiado', 'contributivo', 'carnet'],
    url: '/tramites/afiliaciones',
    priority: 'high'
  },
  {
    id: 'citas-medicas',
    title: 'Agendamiento de Citas Médicas',
    description: 'Solicitud y programación de citas médicas en línea',
    category: 'Trámites',
    tags: ['citas', 'agendar', 'consulta', 'programar', 'turnos'],
    url: '/tramites/citas',
    priority: 'high'
  },
  {
    id: 'autorizaciones',
    title: 'Autorizaciones Médicas',
    description: 'Solicitud de autorizaciones para procedimientos y medicamentos',
    category: 'Trámites',
    tags: ['autorización', 'procedimientos', 'medicamentos', 'especialistas'],
    url: '/tramites/autorizaciones',
    priority: 'high'
  },
  {
    id: 'certificados',
    title: 'Certificados Médicos',
    description: 'Expedición de certificados médicos y constancias de salud',
    category: 'Trámites',
    tags: ['certificados', 'constancias', 'incapacidades', 'aptitud médica'],
    url: '/tramites/certificados',
    priority: 'medium'
  },

  // PQRSF
  {
    id: 'peticiones',
    title: 'Peticiones',
    description: 'Radicación de peticiones ante la entidad',
    category: 'PQRSF',
    tags: ['petición', 'solicitud', 'derecho de petición', 'información'],
    url: '/atencion-usuario/peticiones',
    priority: 'high'
  },
  {
    id: 'quejas',
    title: 'Quejas',
    description: 'Presentación de quejas sobre servicios recibidos',
    category: 'PQRSF',
    tags: ['queja', 'inconformidad', 'servicio', 'atención'],
    url: '/atencion-usuario/quejas',
    priority: 'high'
  },
  {
    id: 'reclamos',
    title: 'Reclamos',
    description: 'Reclamos por inconformidades con los servicios',
    category: 'PQRSF',
    tags: ['reclamo', 'inconformidad', 'error', 'facturación'],
    url: '/atencion-usuario/reclamos',
    priority: 'high'
  },
  {
    id: 'sugerencias',
    title: 'Sugerencias',
    description: 'Envío de sugerencias para mejorar nuestros servicios',
    category: 'PQRSF',
    tags: ['sugerencia', 'mejora', 'propuesta', 'innovación'],
    url: '/atencion-usuario/sugerencias',
    priority: 'medium'
  },
  {
    id: 'felicitaciones',
    title: 'Felicitaciones',
    description: 'Reconocimientos al personal y servicios de la entidad',
    category: 'PQRSF',
    tags: ['felicitación', 'reconocimiento', 'buen servicio', 'agradecimiento'],
    url: '/atencion-usuario/felicitaciones',
    priority: 'medium'
  },

  // Información Institucional
  {
    id: 'mision-vision',
    title: 'Misión y Visión',
    description: 'Misión, visión y valores institucionales de la IPS INGA KAMËNTSÁ',
    category: 'Información Institucional',
    tags: ['misión', 'visión', 'valores', 'institucional', 'objetivos'],
    url: '/institucional/mision-vision',
    priority: 'medium'
  },
  {
    id: 'historia',
    title: 'Historia Institucional',
    description: 'Reseña histórica de la IPS INGA KAMËNTSÁ',
    category: 'Información Institucional',
    tags: ['historia', 'fundación', 'trayectoria', 'evolución'],
    url: '/institucional/historia',
    priority: 'low'
  },
  {
    id: 'organigrama',
    title: 'Estructura Organizacional',
    description: 'Organigrama y estructura administrativa de la entidad',
    category: 'Información Institucional',
    tags: ['organigrama', 'estructura', 'directivos', 'cargos'],
    url: '/institucional/organigrama',
    priority: 'medium'
  },

  // Directorio y Contacto
  {
    id: 'directorio-telefonico',
    title: 'Directorio Telefónico',
    description: 'Números telefónicos de todas las dependencias y sedes',
    category: 'Contacto',
    tags: ['teléfonos', 'contacto', 'directorio', 'números', 'extensiones'],
    url: '/directorio',
    priority: 'high'
  },
  {
    id: 'correos-electronicos',
    title: 'Correos Electrónicos',
    description: 'Direcciones de correo electrónico institucionales',
    category: 'Contacto',
    tags: ['email', 'correo', 'contacto', 'electrónico'],
    url: '/contacto/correos',
    priority: 'high'
  },
  {
    id: 'horarios-atencion',
    title: 'Horarios de Atención',
    description: 'Horarios de atención al público en todas las sedes',
    category: 'Contacto',
    tags: ['horarios', 'atención', 'público', 'funcionamiento'],
    url: '/contacto/horarios',
    priority: 'high'
  },

  // Transparencia y Acceso a la Información
  {
    id: 'rendicion-cuentas',
    title: 'Rendición de Cuentas',
    description: 'Informes de rendición de cuentas y gestión institucional',
    category: 'Transparencia',
    tags: ['rendición', 'cuentas', 'transparencia', 'gestión', 'informes'],
    url: '/transparencia/rendicion-cuentas',
    priority: 'medium'
  },
  {
    id: 'contratacion',
    title: 'Procesos de Contratación',
    description: 'Información sobre procesos contractuales y licitaciones',
    category: 'Transparencia',
    tags: ['contratación', 'licitaciones', 'procesos', 'proveedores'],
    url: '/transparencia/contratacion',
    priority: 'medium'
  },
  {
    id: 'presupuesto',
    title: 'Información Presupuestal',
    description: 'Ejecución presupuestal y financiera de la entidad',
    category: 'Transparencia',
    tags: ['presupuesto', 'finanzas', 'ejecución', 'recursos'],
    url: '/transparencia/presupuesto',
    priority: 'medium'
  },

  // Programas Especiales
  {
    id: 'promocion-prevencion',
    title: 'Promoción y Prevención',
    description: 'Programas de promoción de la salud y prevención de enfermedades',
    category: 'Programas',
    tags: ['promoción', 'prevención', 'salud pública', 'programas', 'educación'],
    url: '/programas/promocion-prevencion',
    priority: 'high'
  },
  {
    id: 'salud-intercultural',
    title: 'Salud Intercultural',
    description: 'Programas de salud intercultural con enfoque étnico',
    category: 'Programas',
    tags: ['intercultural', 'étnico', 'inga', 'kamëntsá', 'diversidad'],
    url: '/programas/salud-intercultural',
    priority: 'high'
  }
];

// Categorías disponibles para filtros
export const categories = [
  'Servicios Médicos',
  'Especialidades',
  'Servicios de Emergencia',
  'Sedes',
  'Trámites',
  'PQRSF',
  'Información Institucional',
  'Contacto',
  'Transparencia',
  'Programas'
];

// Función de búsqueda
export function searchContent(query, categoryFilter = null) {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  const words = searchTerm.split(' ').filter(word => word.length > 1);

  let results = searchIndex.filter(item => {
    // Filtrar por categoría si se especifica
    if (categoryFilter && item.category !== categoryFilter) {
      return false;
    }

    // Buscar en título (peso mayor)
    const titleMatch = item.title.toLowerCase().includes(searchTerm) ||
                      words.some(word => item.title.toLowerCase().includes(word));

    // Buscar en descripción
    const descriptionMatch = item.description.toLowerCase().includes(searchTerm) ||
                           words.some(word => item.description.toLowerCase().includes(word));

    // Buscar en tags
    const tagMatch = item.tags.some(tag => 
      tag.toLowerCase().includes(searchTerm) ||
      words.some(word => tag.toLowerCase().includes(word))
    );

    return titleMatch || descriptionMatch || tagMatch;
  });

  // Ordenar por relevancia y prioridad
  results.sort((a, b) => {
    // Primero por prioridad
    const priorityOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    
    if (priorityDiff !== 0) return priorityDiff;

    // Luego por coincidencia exacta en título
    const aExactTitle = a.title.toLowerCase().includes(searchTerm);
    const bExactTitle = b.title.toLowerCase().includes(searchTerm);
    
    if (aExactTitle && !bExactTitle) return -1;
    if (!aExactTitle && bExactTitle) return 1;

    return 0;
  });

  return results;
}