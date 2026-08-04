"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// Redes sociales del widget flotante — agregar aquí nuevas redes cuando se activen
const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/luisfernando.mutunbajoyjacacanamejoy",
    color: "#1877F2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  // {
  //   name: "WhatsApp",
  //   href: "https://wa.me/573132863398",
  //   color: "#25D366",
  //   icon: (
  //     <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
  //       <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  //     </svg>
  //   ),
  // },
];

export default function Footer() {
  const [menuOption, setMenuOption] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Cerrar menú al hacer click fuera o con Escape
  useEffect(() => {
    if (!menuOption) return;
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOption(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") setMenuOption(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOption]);

  return (
    <>
      <footer className="bg-gray-800 text-white dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                {/* <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">IK</span>
                </div> */}

                <Link href="/" aria-label="Ir a inicio">
                  <Image
                    alt="Logo IPS Inga Kamentsá"
                    width={40}
                    height={40}
                    src="https://pub-c0883d14d3e84a69bf84546fa108aa0b.r2.dev/ipsinka/logo.jpg"
                    className="rounded-full"
                  />
                </Link>

                <div>
                  <h3 className="text-lg font-bold">
                    ASOCIACIÓN IPS INDÍGENA INGA KAMËNTSÁ
                  </h3>
                  <p className="text-sm text-gray-300 dark:text-gray-400">
                    Servicios de Salud
                  </p>
                </div>
              </div>
              <p className="text-white dark:text-white mb-4">
                Institución prestadora de servicios de salud, comprometida con
                la salud y el bienestar de la comunidad indígena Inga Kamentsa
                en el Alto Putumayo
              </p>
              <div className="text-sm text-gray-400 dark:text-gray-500">
                <p className="text-white">NIT: 846001214-3</p>
              </div>
              <div className="mt-4">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <span>🔐</span> Acceso Administrativo
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/institucional"
                    className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                  >
                    Institucional
                  </Link>
                </li>
                <li>
                  <Link
                    href="/servicios"
                    className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                  >
                    Servicios
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sedes"
                    className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                  >
                    Sedes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/directorio"
                    className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                  >
                    Directorio Médico
                  </Link>
                </li>
                <li>
                  <Link
                    href="/eventos"
                    className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                  >
                    Eventos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/atencion-usuario"
                    className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                  >
                    Atención al Usuario
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contacto"
                    className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            {/* Horarios de atención */}
            <div>
              <h4 className="text-lg font-semibold mb-4">
                Horarios de Atención
              </h4>
              {/* <ul className="space-y-2">
                <li>
                  <Link
                    href="/institucional"
                    className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                  >
                    Institucional
                  </Link>
                </li>
                <li>
                  <Link
                    href="/servicios"
                    className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                  >
                    Servicios
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sedes"
                    className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                  >
                    Sedes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/directorio"
                    className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                  >
                    Directorio Médico
                  </Link>
                </li>
                <li>
                  <Link
                    href="/eventos"
                    className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                  >
                    Eventos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/atencion-usuario"
                    className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                  >
                    Atención al Usuario
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contacto"
                    className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                  >
                    Contacto
                  </Link>
                </li>
              </ul> */}
              <p className="text-gray-300 dark:text-gray-400">
                Lunes a Viernes:
              </p>
              <p className="text-gray-300 dark:text-gray-400">
                8:00 AM - 5:00 PM
              </p>

              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2">Redes Sociales</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="https://www.facebook.com/luisfernando.mutunbajoyjacacanamejoy?locale=es_LA"
                      className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Facebook
                    </Link>
                  </li>
                  {/* WhatsApp - Temporalmente deshabilitado */}
                  {/* <li>
                    <Link
                      href="https://wa.me/573132863398"
                      className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                      target="_blank"
                      rel="noreferrer"
                    >
                      WhatsApp
                    </Link>
                  </li> */}
                </ul>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <div className="space-y-3 text-gray-300 dark:text-gray-400">
                <div className="flex items-start space-x-2">
                  <span>📍</span>
                  <div>
                    <p>Calle 15 # 15 - 69</p>
                    <p>Sibundoy, Putumayo</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📞</span>
                  <Link
                    href="tel:+573132863398"
                    className="hover:text-white dark:hover:text-green-400 transition-colors"
                  >
                    313-286-3398
                  </Link>
                </div>

                <div className="flex items-center space-x-2">
                  <span>📧</span>
                  <Link
                    href="mailto:ipsingakamentsa@gmail.com"
                    className="hover:text-white dark:hover:text-green-400 transition-colors"
                  >
                    ipsingakamentsa@gmail.com
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sedes */}
          <div className="border-t border-gray-700 dark:border-gray-600 mt-8 pt-8">
            <h4 className="text-lg font-semibold mb-4">Nuestras Sedes</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="bg-gray-700 dark:bg-gray-800 p-3 rounded">
                <h5 className="font-semibold text-green-400 dark:text-green-500">
                  Sede Sibundoy
                </h5>
                <p>Barrio El Recreo</p>
                <p className="text-gray-300 dark:text-gray-400">
                  Calle 15 # 15 - 69
                </p>
              </div>
              <div className="bg-gray-700 dark:bg-gray-800 p-3 rounded">
                <h5 className="font-semibold text-green-400 dark:text-green-500">
                  Sede Colón
                </h5>
                <p>Barrio Centro</p>
                <p className="text-gray-300 dark:text-gray-400">
                  Carrera 10 # 4 - 43
                </p>
              </div>
              <div className="bg-gray-700 dark:bg-gray-800 p-3 rounded">
                <h5 className="font-semibold text-green-400 dark:text-green-500">
                  Sede Santiago
                </h5>
                <p className="text-gray-300 dark:text-white">Barrio Nazareth</p>
                <p className="text-gray-300 dark:text-gray-400">
                  Calle 6 Carrera 5 - 6
                </p>
              </div>
              <div className="bg-gray-700 dark:bg-gray-800 p-3 rounded">
                <h5 className="font-semibold text-green-400 dark:text-green-500">
                  Sede San Andrés
                </h5>
                <p className="text-gray-300 dark:text-white">Chorro San Jose</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 dark:border-gray-600 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              © 2026 IPS INGA KAMËNTSÁ. Todos los derechos reservados.
            </p>

            <div className=" space-x-6 mt-4 sm:mt-0 ">
              <Link
                href="https://neurai.dev/"
                className="flex items-center space-x-2 text-gray-400 hover:text-white dark:text-gray-500 dark:hover:text-green-400 text-sm transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="font-medium">Desarrollado por neurai.dev</span>
                <Image
                  alt="Logo neurai.dev"
                  src="https://0dwas2ied3dcs14f.public.blob.vercel-storage.com/logo.png"
                  width={20}
                  height={30}
                  className="rounded-full"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Widget flotante de redes sociales */}
        <div className="fixed bottom-4 left-4 z-[1000] flex flex-col items-start gap-3">
          {/* Menú de redes — pastillas con ícono y nombre */}
          <ul
            ref={menuRef}
            className={`flex flex-col gap-2 transition-all duration-300 ease-out origin-bottom-left ${
              menuOption
                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                : "opacity-0 scale-90 translate-y-3 pointer-events-none"
            }`}
          >
            {socialLinks.map((social) => (
              <li key={social.name}>
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 bg-white dark:bg-gray-800 pl-2.5 pr-4 py-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-600 hover:scale-105 hover:shadow-xl transition-all duration-200"
                >
                  <span
                    className="flex items-center justify-center w-8 h-8 rounded-full text-white"
                    style={{ backgroundColor: social.color }}
                  >
                    {social.icon}
                  </span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-white">
                    {social.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Botón toggle */}
          <button
            ref={buttonRef}
            onClick={() => setMenuOption(!menuOption)}
            aria-expanded={menuOption}
            aria-label={
              menuOption ? "Cerrar redes sociales" : "Abrir redes sociales"
            }
            className="w-12 h-12 rounded-full bg-green-700 hover:bg-green-800 text-white shadow-xl border border-white/30 flex items-center justify-center transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-800"
          >
            {menuOption ? (
              /* Ícono X para cerrar */
              <svg
                className="w-5 h-5 transition-transform duration-300 rotate-90"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              /* Ícono de compartir/redes */
              <svg
                className="w-5 h-5 transition-transform duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
              </svg>
            )}
          </button>
        </div>
      </footer>
    </>
  );
}
