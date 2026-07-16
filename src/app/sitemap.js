export default function sitemap() {
  const baseUrl = "https://ipsinka.com";
  const currentDate = new Date();

  const routes = [
    // Página principal - máxima prioridad
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    // Páginas principales - alta prioridad para sitelinks
    {
      url: `${baseUrl}/servicios`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/sedes`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/institucional`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/directorio`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/eventos`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/atencion-usuario`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    // Sedes específicas - alta prioridad
    {
      url: `${baseUrl}/sedes/sibundoy`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/sedes/colon`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/sedes/santiago`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/sedes/san-andres`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    // Páginas de búsqueda y utilidades
    {
      url: `${baseUrl}/busqueda`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  return routes;
}
