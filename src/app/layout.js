import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import AOSInit from "@/components/AOSInit";
import AdminLayoutGuard from "@/components/admin/AdminLayoutGuard";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default:
      "Asociación IPS Indígena Inga Kamentsa | Servicios de Salud del Alto Putumayo",
    template: "%s | IPS Inga Kamentsá",
  },
  description:
    "Asociación IPS Inga - Kamentsá. Servicios de salud integral del Alto Putumayo. Consulta médica general, Odontología, Medicina tradicional. Atención de calidad con identidad cultural.",
  keywords: [
    "IPS Inga Kamentsá",
    "ipsinka",
    "ipsinka sibundoy",
    "ipsinka alto putumayo",
    "ipsinka inga",
    "servicios salud Sibundoy",
    "medicina general Putumayo",
    "médicas Sibundoy",
    "consulta médica Putumayo",
    "IPS Sibundoy",
    "centro médico Putumayo",
    "atención médica integral",
    "salud Colombia",
    "consulta especializada",
    "servicios PQRS salud",

    "Sibundoy Putumayo",
    "Colón Putumayo",
    "Santiago Putumayo",
    "San Andrés Putumayo",
  ],
  authors: [{ name: "Asociación IPS Inga Kamentsá" }],
  creator: "Asociación IPS Inga Kamentsá",
  publisher: "Asociación IPS Inga Kamentsá",
  metadataBase: new URL("https://ipsinka.com"),
  openGraph: {
    title:
      "Asociación IPS Indígena Inga Kamentsa | Servicios de Salud del Alto Putumayo",
    description:
      "Servicios de salud integral del Alto Putumayo. Consulta médica general, Odontología, PQRS. Agenda tu cita. Atención de calidad con identidad cultural.",
    siteName: "Asociación IPS Indígena Inga Kamentsa",
    images: [
      {
        url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Asociación IPS Indígena Inga Kamentsa - Logo",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Asociación IPS Indígena Inga Kamentsa | Servicios de Salud del Alto Putumayo",
    description:
      "Servicios de salud integral del Alto Putumayo. Consulta médica, Odontología, Medicina tradicional. Atención de calidad con identidad cultural.",
    images: [
      "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/logo.jpg",
    ],
    creator: "@ips_inga",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Asociación IPS Indígena Inga Kamentsa",
  },
  other: {
    "apple-mobile-web-app-title": "Asociación IPS Indígena Inga Kamentsa",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "google-site-verification": "google66e0b63c9f25d263",
    "geo.region": "CO-PUT",
    "geo.placename": "Sibundoy, Putumayo",
    "geo.position": "1.149861;-76.832611",
    ICBM: "1.149861, -76.832611",
  },
};

export const viewport = {
  themeColor: "#0b3d2e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "MedicalBusiness", "LocalBusiness"],
        "@id": "https://ipsinka.com/#organization",
        name: "Asociación IPS Indígena Inga Kamentsa",
        alternateName: ["IPS Inga Kamentsá", "IPS INKA", "ipsinka"],
        url: "https://ipsinka.com/",
        logo: {
          "@type": "ImageObject",
          url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/logo.jpg",
          width: "512",
          height: "512",
        },
        image: {
          "@type": "ImageObject",
          url: "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/logo.jpg",
          width: "512",
          height: "512",
        },
        sameAs: [
          "https://www.facebook.com/luisfernando.mutunbajoyjacacanamejoy",
        ],
        telephone: "3132863398",
        email: "ipsinga.sibundoy@gmail.com",
        priceRange: "$$",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "07:00",
            closes: "16:00",
          },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "3132863398",
          contactType: "customer service",
          areaServed: "CO",
          availableLanguage: ["Spanish", "Inga", "Kamentsá"],
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Calle 15 N° 15-69",
          addressLocality: "Sibundoy",
          addressRegion: "Putumayo",
          postalCode: "862540",
          addressCountry: "CO",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "1.149861",
          longitude: "-76.832611",
        },
        areaServed: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: "1.149861",
            longitude: "-76.832611",
          },
          geoRadius: "50000",
        },
      },
      {
        "@type": "MedicalOrganization",
        "@id": "https://ipsinka.com/#medical",
        name: "Asociación IPS Indígena Inga Kamentsa",
        description:
          "Institución Prestadora de Servicios de Salud del Alto Putumayo",
        medicalSpecialty: [
          "General Medicine",
          "Traditional Indigenous Medicine",
          "Emergency Services",
          "Preventive Care",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios de Salud",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "MedicalProcedure",
                name: "Consulta Medicina General",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "MedicalProcedure",
                name: "Servicios de Urgencias",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "MedicalProcedure",
                name: "Consulta de Especialidades",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://ipsinka.com/#website",
        url: "https://ipsinka.com/",
        name: "Asociación IPS Indígena Inga Kamentsa",
        alternateName: "IPS INKA",
        description:
          "Servicios de salud integral para toda la comunidad del Alto Putumayo",
        publisher: {
          "@id": "https://ipsinka.com/#organization",
        },
        potentialAction: [
          {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate:
                "https://ipsinka.com/busqueda?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        ],
        inLanguage: "es-CO",
        about: {
          "@type": "Thing",
          name: "Servicios de Salud Indígena",
          description:
            "Atención médica integral con enfoque intercultural para comunidades indígenas",
        },
        mainEntity: {
          "@type": "ItemList",
          name: "Navegación Principal",
          numberOfItems: 8,
          itemListElement: [
            {
              "@type": "SiteNavigationElement",
              position: 1,
              name: "Servicios de Salud",
              url: "https://ipsinka.com/servicios",
              description:
                "Consulta médica general, odontología, medicina tradicional y servicios especializados",
            },
            {
              "@type": "SiteNavigationElement",
              position: 2,
              name: "Nuestras Sedes",
              url: "https://ipsinka.com/sedes",
              description:
                "Sedes en Sibundoy, Colón, Santiago y San Andrés - Putumayo",
            },
            {
              "@type": "SiteNavigationElement",
              position: 3,
              name: "Institucional",
              url: "https://ipsinka.com/institucional",
              description:
                "Misión, visión, historia y portafolio de servicios de la IPS",
            },
            {
              "@type": "SiteNavigationElement",
              position: 4,
              name: "Contacto y Citas",
              url: "https://ipsinka.com/contacto",
              description: "Agenda tu cita médica y contacta con nosotros",
            },
            {
              "@type": "SiteNavigationElement",
              position: 5,
              name: "Directorio",
              url: "https://ipsinka.com/directorio",
              description: "Directorio de contactos y profesionales",
            },
            {
              "@type": "SiteNavigationElement",
              position: 6,
              name: "Galería",
              url: "https://ipsinka.com/galeria",
              description: "Galería de fotos de nuestras instalaciones",
            },
            {
              "@type": "SiteNavigationElement",
              position: 7,
              name: "Atención al Usuario",
              url: "https://ipsinka.com/atencion-usuario",
              description: "PQRSF, quejas, reclamos y asociación de usuarios",
            },
            {
              "@type": "SiteNavigationElement",
              position: 8,
              name: "Transparencia",
              url: "https://ipsinka.com/transparencia",
              description: "Información pública y transparencia institucional",
            },
          ],
        },
      },
    ],
  };

  return (
    <ClerkProvider>
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AOSInit />
          <AdminLayoutGuard>{children}</AdminLayoutGuard>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
