"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Navbar.module.scss";
import ThemeSwitcher from "./ThemeSwitcher";

const navigationLinks = [
  { href: "/", label: "Inicio" },
  { href: "/institucional", label: "Institucional" },
  { href: "/servicios", label: "Servicios" },
  { href: "/galeria", label: "Galería" },
  { href: "/transparencia", label: "Transparencia" },
  { href: "/eventos", label: "Eventos" },
  { href: "/noticias", label: "Noticias" },
  { href: "/publicaciones", label: "Publicaciones" },
  { href: "/atencion-usuario", label: "Atención al Usuario" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Hover del logo: al activarse, se muestra ampliado en el centro del viewport.
  const [logoHover, setLogoHover] = useState(false);
  // El logo ampliado se renderiza con portal a document.body; solo tras montar.
  const [montado, setMontado] = useState(false);

  useEffect(() => setMontado(true), []);

  // backdrop-blur-md
  // Detect click outside mobile menu
  const handleBackdropClick = (e) => {
    if (e.target.id === "mobile-menu-backdrop") {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={` top-0 z-50  ${styles.navbar}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-center h-16">
          {/* Selector de tema (modo claro/oscuro) a la izquierda */}
          <div className="absolute left-0 flex items-center">
            <ThemeSwitcher />
          </div>

          {/* Logo centrado en el navbar. Mientras el cursor está sobre él,
              se muestra una copia ampliada en el centro del viewport (vía
              portal, para no quedar atrapada por el backdrop-filter del nav). */}
          <Link
            href="/"
            className={styles.logoLink}
            onMouseEnter={() => setLogoHover(true)}
            onMouseLeave={() => setLogoHover(false)}
          >
            <Image
              src="https://pub-c0883d14d3e84a69bf84546fa108aa0b.r2.dev/ipsinka/logo.jpg"
              alt="Logo IPS Inga Kametsa"
              width={50}
              height={50}
              className="rounded-full"
              style={{ visibility: logoHover ? "hidden" : "visible" }}
              priority
            />
          </Link>

          {/* Menú hamburguesa a la derecha */}
          <div className="absolute right-0 flex items-center space-x-2 ">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 shadow-lg focus:outline-none border-2 border-gray-300 dark:border-gray-100"
            >
              <svg
                // barras menu navbar

                className="h-6 w-6 text-gray-800 dark:text-white duration-500 transition-transform"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menú desplegable de navegación.
            - Móvil/tablet (< lg): tarjeta centrada y compacta, enlaces en columna.
            - Escritorio (≥ lg): panel ancho tipo mega-menú que aprovecha todo
              el espacio, con los enlaces en varias columnas. */}
        {
          <div
            id="mobile-menu-backdrop"
            className={`fixed inset-0 z-40 flex items-start justify-center pt-20 lg:pt-24 lg:px-8  ${styles.mobileMenuBackdrop}`}
            onClick={handleBackdropClick}
            style={{ pointerEvents: isMenuOpen ? "auto" : "none" }}
          >
            <div
              className={`
                ${styles.mobileMenu}
                rounded-4xl z-50
                w-11/12 max-w-xs mx-auto flex flex-col items-center py-6 space-y-3
                lg:w-full lg:max-w-7xl lg:mx-auto lg:rounded-3xl lg:p-10 lg:space-y-0
                ${
                  isMenuOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-10 pointer-events-none"
                }
               `}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Enlaces: columna en móvil, grid amplio en escritorio */}
              <div className="contents lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-4 lg:w-full">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      text-white text-2xl px-4 py-2 rounded-md font-medium transition-colors duration-200 text-center w-full
                      lg:text-lg lg:py-4 lg:px-5 lg:rounded-xl lg:font-semibold
                      lg:border lg:border-white/20
                      lg:hover:bg-white lg:hover:border-black lg:hover:text-black
                      ${styles.mobileLink}
                    `}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        }
      </div>

      {/* Logo ampliado en el centro del viewport (portal a body).
          Se muestra mientras el cursor está sobre el logo del navbar.
          pointer-events:none para que no interfiera con el hover del navbar. */}
      {montado &&
        createPortal(
          <div
            aria-hidden="true"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) scale(${logoHover ? 1 : 0.6})`,
              opacity: logoHover ? 1 : 0,
              transition: "opacity 0.35s ease, transform 0.35s ease",
              pointerEvents: "none",
              zIndex: 100,
              display: "grid",
              placeItems: "center",
            }}
          >
            {/* Fondo circular difuminado (mayor diámetro que el logo) con
                velo oscuro para resaltar el logo. Va detrás (z-index 1). */}
            <div
              className="backdrop-blur-sm"
              style={{
                gridArea: "1 / 1",
                width: 420,
                height: 420,
                borderRadius: "50%",
                backgroundColor: "rgba(0, 0, 0, 0.35)",
                zIndex: 1,
              }}
            />
            <Image
              src="https://pub-c0883d14d3e84a69bf84546fa108aa0b.r2.dev/ipsinka/logo.jpg"
              alt=""
              width={280}
              height={280}
              className="rounded-full shadow-2xl"
              style={{ gridArea: "1 / 1", position: "relative", zIndex: 2 }}
              priority
            />
          </div>,
          document.body
        )}
    </nav>
  );
}
