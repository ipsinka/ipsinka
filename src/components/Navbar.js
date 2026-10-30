"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

// Reordena los enlaces en "montaña": los de texto más largo quedan al centro
// (donde el panel es más ancho por la curva) y los más cortos en los extremos.
// Se ordena por longitud descendente y se colocan desde el centro hacia afuera.
function ordenarPorLongitud(links) {
  const porLongitud = [...links].sort((a, b) => b.label.length - a.label.length);
  const n = porLongitud.length;
  const resultado = new Array(n);
  const centro = Math.floor((n - 1) / 2);
  // El más largo va al centro; los siguientes se reparten alternando a los
  // lados del centro con offsets crecientes (0, +1, -1, +2, -2, ...).
  porLongitud.forEach((link, i) => {
    const paso = Math.ceil(i / 2);
    const pos = i % 2 === 1 ? centro + paso : centro - paso;
    resultado[pos] = link;
  });
  return resultado;
}

const navLinksCurva = ordenarPorLongitud(navigationLinks);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Al tocar el logo se reproducen 3 rebotes y, 1 s después, un pulso.
  const [logoRebotando, setLogoRebotando] = useState(false);
  const pathname = usePathname();
  // El menú se renderiza con portal a document.body; solo tras montar.
  const [montado, setMontado] = useState(false);
  // Índice del enlace que está en el centro de la rueda (el activo).
  const [ruedaActiva, setRuedaActiva] = useState(0);
  // Acumulador del scroll para no saltar de enlace con cada tic mínimo.
  const acumScroll = useRef(0);
  // Contenedor de la rueda: se le adjunta el listener wheel no-pasivo.
  const ruedaRef = useRef(null);
  // Y anterior del dedo, para calcular el desplazamiento en el arrastre táctil.
  const touchPrevY = useRef(null);

  useEffect(() => setMontado(true), []);

  // Al cerrar/abrir el menú, reinicia la rueda al primer enlace y bloquea el
  // scroll de la página (scroll-lock fijando el body) para que el scroll solo
  // gire la rueda y el fondo no se desplace.
  useEffect(() => {
    if (isMenuOpen) {
      setRuedaActiva(0);
      acumScroll.current = 0;
      const scrollY = window.scrollY;
      const { style } = document.body;
      const prev = {
        position: style.position,
        top: style.top,
        width: style.width,
        overflow: style.overflow,
      };
      style.position = "fixed";
      style.top = `-${scrollY}px`;
      style.width = "100%";
      style.overflow = "hidden";
      return () => {
        style.position = prev.position;
        style.top = prev.top;
        style.width = prev.width;
        style.overflow = prev.overflow;
        window.scrollTo(0, scrollY);
      };
    }
  }, [isMenuOpen]);

  // Avanza/retrocede el enlace activo según el desplazamiento acumulado.
  // UMBRAL = px de desplazamiento (scroll o arrastre) por cada enlace.
  const UMBRAL = 40;
  const avanzar = (delta) => {
    acumScroll.current += delta;
    if (acumScroll.current > UMBRAL) {
      acumScroll.current = 0;
      setRuedaActiva((n) => Math.min(n + 1, navLinksCurva.length - 1));
    } else if (acumScroll.current < -UMBRAL) {
      acumScroll.current = 0;
      setRuedaActiva((n) => Math.max(n - 1, 0));
    }
  };

  // Girar la rueda con el scroll del mouse (listener no-pasivo para poder
  // llamar a preventDefault y que la página de fondo no se desplace).
  useEffect(() => {
    const el = ruedaRef.current;
    if (!el || !isMenuOpen) return;
    const onWheel = (e) => {
      e.preventDefault();
      avanzar(e.deltaY);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [isMenuOpen]);

  // Arrastre táctil (móvil/tableta): registramos la Y del dedo y giramos la
  // rueda con el desplazamiento. Dedo hacia arriba => avanza (igual que el
  // scroll). Sin estos handlers, en pantallas táctiles no se puede desplazar.
  const handleTouchStart = (e) => {
    touchPrevY.current = e.touches[0].clientY;
    acumScroll.current = 0;
  };
  const handleTouchMove = (e) => {
    if (touchPrevY.current === null) return;
    const y = e.touches[0].clientY;
    avanzar(touchPrevY.current - y);
    touchPrevY.current = y;
  };
  const handleTouchEnd = () => {
    touchPrevY.current = null;
    acumScroll.current = 0;
  };

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

          {/* Logo centrado en el navbar: lleva al inicio y rebota 3 veces */}
          <Link
            href="/"
            aria-label="Ir al inicio"
            className={`${styles.logoLink} ${logoRebotando ? styles.logoRebote : ""}`}
            onClick={() => {
              setLogoRebotando(true);
              // Ya en el inicio, el Link no navega: subir al principio.
              if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            // La secuencia termina con el pulso (los nombres de CSS Modules llevan hash).
            onAnimationEnd={(e) => {
              if (e.animationName.includes("logoPulso")) setLogoRebotando(false);
            }}
          >
            <Image
              src="https://pub-c0883d14d3e84a69bf84546fa108aa0b.r2.dev/ipsinka/logo.jpg"
              alt="Logo IPS Inga Kametsa"
              width={50}
              height={50}
              className="rounded-full"
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

      </div>

      {/* Menú desplegable: panel lateral derecho con forma de hoja (borde
          izquierdo curvo). Se renderiza con portal a document.body para que el
          position:fixed se ancle al viewport y no quede atrapado por el
          backdrop-filter del navbar. Aplica en todas las resoluciones. */}
      {montado &&
        createPortal(
          <div
            id="mobile-menu-backdrop"
            className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
              isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={handleBackdropClick}
            style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          >
            {/* Panel derecho con forma de hoja */}
            <div
              className={`${styles.panelCurvo} ${
                isMenuOpen
                  ? "opacity-100 translate-x-0 pointer-events-auto"
                  : "opacity-0 translate-x-full pointer-events-none"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón cerrar (X) arriba a la derecha. pt-16 la baja unos px
                  respecto al borde superior, para que no quede tan pegada
                  arriba en ninguna resolución. */}
              <div className="flex justify-end px-6 pt-16 pb-2 flex-shrink-0">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Cerrar menú"
                  className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white/50 text-white hover:bg-white hover:text-black transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Rueda de enlaces (tipo "llanta"): los enlaces se distribuyen
                  sobre un arco circular. El activo queda en el centro (destacado
                  y sobresaliendo a la izquierda); los demás se curvan hacia
                  arriba/abajo, atenuados con una sombra leve hasta que rotan al
                  centro con el scroll del mouse. */}
              <div
                ref={ruedaRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="relative flex flex-col items-end justify-center pr-4 sm:pr-6 flex-1 overflow-hidden select-none"
                style={{ touchAction: "none" }}
              >
                {/* Llanta: círculo (SVG) del que solo se ve la mitad izquierda
                    (su centro queda en el borde derecho del panel). Rota junto
                    con los enlaces al cambiar el activo, como una rueda girando.
                    Trazo grueso y guiones largos/espaciados. */}
                {(() => {
                  const DIAM = 360; // diámetro del círculo de la llanta
                  // El centro del círculo se coloca en el borde derecho del panel
                  // para que solo la mitad izquierda quede visible.
                  const giro = ruedaActiva * 22; // grados que rota por cada enlace
                  return (
                    <svg
                      className="absolute pointer-events-none"
                      width={DIAM}
                      height={DIAM}
                      style={{
                        top: "50%",
                        right: -DIAM / 2,
                        transform: `translateY(-50%) rotate(${giro}deg)`,
                        transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
                      }}
                      aria-hidden="true"
                    >
                      <circle
                        cx={DIAM / 2}
                        cy={DIAM / 2}
                        r={DIAM / 2 - 4}
                        fill="none"
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth="4"
                        strokeDasharray="16 26"
                        strokeLinecap="round"
                      />
                    </svg>
                  );
                })()}
                {navLinksCurva.map((link, i) => {
                  const offset = i - ruedaActiva; // 0 = centro; ± = arriba/abajo
                  const abs = Math.abs(offset);
                  // Solo se muestran los cercanos al centro (ventana de la rueda).
                  const VISIBLES = 4;
                  if (abs > VISIBLES) return null;
                  // Ángulo sobre el arco: cada paso ocupa un tramo del semicírculo.
                  const angulo = (offset / (VISIBLES + 1)) * (Math.PI / 2);
                  const RADIO = 150;
                  const SEPARACION_Y = 46; // px de separación vertical entre enlaces
                  const y = offset * SEPARACION_Y;
                  // Arco tipo llanta: el enlace activo (centro) sobresale más a
                  // la IZQUIERDA (punta de la curva) y los extremos se recogen
                  // hacia la derecha, siguiendo la curvatura del círculo.
                  const x = RADIO * Math.cos(angulo);
                  const esActivo = offset === 0;
                  // Los lejanos se atenúan (sombra leve) y se achican un poco.
                  const opacidad = esActivo ? 1 : Math.max(0.25, 1 - abs * 0.28);
                  const escala = esActivo ? 1 : Math.max(0.72, 1 - abs * 0.1);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      style={{
                        position: "absolute",
                        right: `${x + 16}px`,
                        top: "50%",
                        transform: `translateY(calc(-50% + ${y}px)) scale(${escala})`,
                        opacity: isMenuOpen ? opacidad : 0,
                        zIndex: 10 - abs,
                        transition:
                          "transform 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease, right 0.35s cubic-bezier(0.22,1,0.36,1), background-color 0.2s ease, color 0.2s ease",
                        pointerEvents: isMenuOpen ? "auto" : "none",
                        touchAction: "none",
                      }}
                      className={`${esActivo ? styles.pillLinkActivo : styles.pillLink} inline-flex items-center justify-between gap-4 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wide whitespace-nowrap`}
                    >
                      <span>{link.label}</span>
                      <svg className="w-4 h-4 flex-shrink-0 opacity-80" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>,
          document.body
        )}

    </nav>
  );
}
