"use client";

import { useState } from "react";
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
        <div className="flex justify-between h-16">
          <div className="flex items-center " style={{ perspective: "1000px" }}>
            <Link href="/" className="flex items-center">
              <Image
                src="https://pub-c0883d14d3e84a69bf84546fa108aa0b.r2.dev/ipsinka/logo.jpg"
                alt="Logo IPS Inga Kametsa"
                width={50}
                height={50}
                className="rounded-4xl rounded-full hover:scale-125 hover:rotate-y-360 transition-transform duration-300 "
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div
            className={`hidden lg:flex items-center space-x-3  ${styles.links}`}
          >
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-green-400 px-3 py-2 rounded-md text-sm font-bold transition-all duration-200 [text-shadow:_1px_1px_2px_rgb(0_0_0_/_80%),_-1px_-1px_2px_rgb(0_0_0_/_80%),_1px_-1px_2px_rgb(0_0_0_/_80%),_-1px_1px_2px_rgb(0_0_0_/_80%)] hover:scale-105"
              >
                {link.label}
              </Link>
            ))}
            <div className={styles.themeSwitcher}>
              <ThemeSwitcher />
            </div>
          </div>

          {/* Mobile menu button and theme switcher */}
          <div className="lg:hidden flex items-center space-x-2 ">
            <div className={styles.themeSwitcher}>
              <ThemeSwitcher />
            </div>
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

        {/* Mobile Navigation */}
        {
          <div
            id="mobile-menu-backdrop"
            className={`lg:hidden fixed inset-0 z-40 flex items-start justify-center pt-20  ${styles.mobileMenuBackdrop}`}
            onClick={handleBackdropClick}
            style={{ pointerEvents: isMenuOpen ? "auto" : "none" }}
          >
            <div
              className={`
                ${
                  styles.mobileMenu
                } rounded-4xl shadow-lg w-11/12 max-w-xs mx-auto flex flex-col items-center py-6 space-y-3 z-50
                ${
                  isMenuOpen
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-10 pointer-events-none"
                }
               `}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Enlaces de navegación móvil */}
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-black text-2xl  px-4 py-2 rounded-md  font-medium transition-colors duration-200 text-center w-full dark:text-white ${styles.mobileLink}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        }
      </div>
    </nav>
  );
}
