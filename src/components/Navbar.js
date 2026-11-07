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

// Llanta del menú: diámetro del SVG y radio de la línea punteada. Los enlaces
// se centran sobre esa línea.
const DIAM_LLANTA = 360;
const RADIO_LLANTA = DIAM_LLANTA / 2 - 4;

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Al tocar el logo se reproducen 3 rebotes y, 1 s después, un pulso.
  const [logoRebotando, setLogoRebotando] = useState(false);
  const pathname = usePathname();
  // El menú se renderiza con portal (al contenedor del nav); solo tras montar.
  const [montado, setMontado] = useState(false);
  // Índice del enlace que está en el centro de la rueda (el activo).
  const [ruedaActiva, setRuedaActiva] = useState(0);
  // Acumulador del scroll para no saltar de enlace con cada tic mínimo.
  const acumScroll = useRef(0);
  // Contenedor de la rueda: se le adjunta el listener wheel no-pasivo.
  const ruedaRef = useRef(null);
  // Y anterior del dedo, para calcular el desplazamiento en el arrastre táctil.
  const touchPrevY = useRef(null);
  // Nodo <nav>: el menú se monta en su contenedor padre (mismo contexto de
  // apilamiento) para que el navbar pueda quedar por encima del panel.
  const navRef = useRef(null);

  useEffect(() => setMontado(true), []);

  // Desde 1024px la hamburguesa se oculta (los enlaces van en línea): si el
  // menú quedó abierto al agrandar la ventana, se cierra para no dejar el
  // scroll de la página bloqueado sin forma de cerrarlo.
  useEffect(() => {
    if (!isMenuOpen) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const cerrarSiEscritorio = () => mq.matches && setIsMenuOpen(false);
    cerrarSiEscritorio();
    mq.addEventListener("change", cerrarSiEscritorio);
    return () => mq.removeEventListener("change", cerrarSiEscritorio);
  }, [isMenuOpen]);

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
    <nav
      ref={navRef}
      className={` top-0 z-50  ${styles.navbar}`}
      // Con el menú abierto el navbar queda por encima del fondo oscuro y del
      // panel (z-60), así su X blanca es la única para cerrar.
      style={isMenuOpen ? { zIndex: 70 } : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 xl:px-8">
        <div className="relative flex items-center justify-center lg:justify-start h-16">
          {/* Selector de tema (modo claro/oscuro) a la izquierda. Desde 1024px
              deja de ser absoluto y pasa al extremo derecho, tras los enlaces. */}
          <div className="absolute left-0 lg:static lg:order-3 lg:ml-3 flex items-center">
            <ThemeSwitcher />
          </div>

          {/* Logo centrado en el navbar: lleva al inicio y rebota 3 veces */}
          <Link
            href="/"
            aria-label="Ir al inicio"
            className={`${styles.logoLink} ${logoRebotando ? styles.logoRebote : ""} lg:order-1`}
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

          {/* Enlaces en línea (desde 1024px). Tamaño de letra y relleno
              escalonados para que los 9 enlaces quepan sin saltos de línea. */}
          <ul className="hidden lg:flex lg:order-2 items-center ml-auto gap-0.5 xl:gap-1">
            {navigationLinks.map((link) => {
              const esActual =
                link.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={esActual ? "page" : undefined}
                    className={`${esActual ? styles.navLinkActivo : styles.navLink} block whitespace-nowrap rounded-lg px-2 py-1.5 text-[13px] xl:px-3 xl:py-2 xl:text-[15px] font-semibold transition-colors duration-200`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Menú hamburguesa a la derecha (solo por debajo de 1024px) */}
          <div className="absolute right-0 flex items-center space-x-2 lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMenuOpen}
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
          izquierdo curvo). Se renderiza con portal al contenedor padre del
          navbar para que el position:fixed se ancle al viewport (sin quedar
          atrapado por el backdrop-filter del nav) y comparta su contexto de
          apilamiento. Aplica en todas las resoluciones. */}
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
              {/* Espacio bajo el navbar (que queda encima del panel con su X
                  de cierre), para que la rueda no quede tapada. */}
              <div className="h-20 flex-shrink-0" aria-hidden="true" />

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
                  // El centro del círculo se coloca en el borde derecho del panel
                  // para que solo la mitad izquierda quede visible.
                  const giro = ruedaActiva * 22; // grados que rota por cada enlace
                  return (
                    <svg
                      className="absolute pointer-events-none"
                      width={DIAM_LLANTA}
                      height={DIAM_LLANTA}
                      style={{
                        top: "50%",
                        right: -DIAM_LLANTA / 2,
                        transform: `translateY(-50%) rotate(${giro}deg)`,
                        transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
                      }}
                      aria-hidden="true"
                    >
                      <circle
                        cx={DIAM_LLANTA / 2}
                        cy={DIAM_LLANTA / 2}
                        r={RADIO_LLANTA}
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
                  // px de separación vertical entre enlaces. Debe cumplir
                  // VISIBLES * SEPARACION_Y < RADIO_LLANTA para que todos
                  // caigan sobre el círculo.
                  const SEPARACION_Y = 40;
                  const y = offset * SEPARACION_Y;
                  // Centro del enlace SOBRE la línea de la llanta: el círculo
                  // tiene su centro en el borde derecho del panel, así que a una
                  // altura y la línea pasa a sqrt(R² - y²) px de ese borde. El
                  // activo (y = 0) queda en la punta y los demás siguen la curva.
                  const x = Math.sqrt(Math.max(0, RADIO_LLANTA ** 2 - y ** 2));
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
                        right: `${x}px`,
                        top: "50%",
                        // translate(50%) lleva el centro del enlace al punto x.
                        transform: `translate(50%, calc(-50% + ${y}px)) scale(${escala})`,
                        opacity: isMenuOpen ? opacidad : 0,
                        zIndex: 10 - abs,
                        transition:
                          "transform 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease, right 0.35s cubic-bezier(0.22,1,0.36,1), background-color 0.2s ease, color 0.2s ease",
                        pointerEvents: isMenuOpen ? "auto" : "none",
                        touchAction: "none",
                      }}
                      className={`${esActivo ? styles.pillLinkActivo : styles.pillLink} inline-flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wide whitespace-nowrap`}
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
          navRef.current?.parentElement ?? document.body
        )}

    </nav>
  );
}
