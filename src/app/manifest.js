export default function manifest() {
  return {
    name: "IPS Inga-Kamentsa - Servicios de Salud Integral",
    short_name: "IPS Inga-Kamentsa",
    description:
      "Servicios de salud integral combinando medicina occidental con conocimientos ancestrales en Sibundoy, Putumayo",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0b3d2e",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["health", "medical", "healthcare"],
    lang: "es-CO",
    orientation: "portrait-primary",
  };
}
