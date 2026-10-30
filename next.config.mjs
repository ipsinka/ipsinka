const CLERK = "https://clerk.ipsinka.com https://*.clerk.accounts.dev";
const R2_DOCUMENTOS = "https://pub-1180f62273e4461daa58e3267d5d7b32.r2.dev https://pub-49f5ca8cdb65405f8a86e9257bee4c7f.r2.dev";

// La CSP va en modo solo reporte: el navegador avisa lo que bloquearía (en la
// consola y en /api/csp-report) sin bloquearlo. Cuando no haya reportes
// inesperados, cambiar la cabecera a Content-Security-Policy.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${CLERK} https://challenges.cloudflare.com https://va.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "media-src 'self' blob: https:",
  `connect-src 'self' ${CLERK} https://clerk-telemetry.com https://vitals.vercel-insights.com`,
  `frame-src 'self' https://www.google.com https://www.youtube.com https://www.youtube-nocookie.com https://challenges.cloudflare.com ${R2_DOCUMENTOS}`,
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "report-uri /api/csp-report",
].join("; ");

const cabecerasDeSeguridad = [
  { key: "Content-Security-Policy-Report-Only", value: csp },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
];

const nextConfig = {
  // Solo los orígenes de imágenes que el sitio usa (buckets R2 y Vercel Blob).
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "pub-c0883d14d3e84a69bf84546fa108aa0b.r2.dev" },
      { protocol: "https", hostname: "pub-1180f62273e4461daa58e3267d5d7b32.r2.dev" },
      { protocol: "https", hostname: "ghx22gzm9l6t5pgk.public.blob.vercel-storage.com" },
      // Logo de neurai.dev en el footer.
      { protocol: "https", hostname: "0dwas2ied3dcs14f.public.blob.vercel-storage.com" },
    ],
  },

  async headers() {
    return [{ source: "/:path*", headers: cabecerasDeSeguridad }];
  },
};

export default nextConfig;
