import path from "path";
import { fileURLToPath } from "url";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

initOpenNextCloudflareForDev();

const nextConfig = {
  /* config options here */

  // Configurar la raíz del proyecto para Turbopack
  turbopack: {
    root: __dirname,
  },

  // Configuración de imágenes remotas
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "pixabay.com",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
      {
        protocol: "https",
        hostname: "supabase.com",
      },
      {
        protocol: "https",
        hostname: "nwxetoffoghsimkqfsbv.supabase.co",
      },
      {
        protocol: "https",
        hostname: "www.canva.com",
      },
      {
        protocol: "https",
        hostname: "0dwas2ied3dcs14f.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "ghx22gzm9l6t5pgk.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "pub-c0883d14d3e84a69bf84546fa108aa0b.r2.dev",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
      },
      {
        protocol: "https",
        hostname: "neurai.dev",
      },
    ],
  },
};

export default nextConfig;
