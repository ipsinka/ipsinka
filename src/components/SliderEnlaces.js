"use client";

import { useState } from "react";
import Link from "next/link";

const enlaces = [
  { href: "/noticias",         emoji: "📰", label: "Noticias" },
  { href: "/galeria",          emoji: "🖼️",  label: "Galería" },
  { href: "/servicios",        emoji: "🏥",  label: "Servicios" },
  { href: "/sedes",            emoji: "📍",  label: "Nuestras Sedes" },
  { href: "/publicaciones",    emoji: "📚",  label: "Publicaciones" },
  { href: "/directorio",       emoji: "📞",  label: "Directorio" },
  { href: "/atencion-usuario", emoji: "🤝",  label: "PQRS" },
  { href: "/transparencia",    emoji: "📋",  label: "Transparencia" },
  { href: "/consultas",        emoji: "🗓️",  label: "Consultas" },
  { href: "/institucional",    emoji: "🏛️",  label: "Institucional" },
];

const itemsDuplicados = [...enlaces, ...enlaces];

export default function SliderEnlaces() {
  const [pausadoBtn, setPausadoBtn] = useState(false);
  const [pausadoHover, setPausadoHover] = useState(false);
  const pausado = pausadoBtn || pausadoHover;

  return (
    <section className="py-8 bg-green-700 dark:bg-green-900 overflow-hidden">
      {/* Cabecera: título + botón pausa (solo móvil) */}
      <div className="flex items-center justify-center gap-4 mb-5">
        <h2 className="text-center font-semibold text-green-100 tracking-wide uppercase text-sm">
          Explora nuestro sitio
        </h2>
        <button
          onClick={() => setPausadoBtn((p) => !p)}
          aria-label={pausadoBtn ? "Reanudar" : "Pausar"}
          className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-medium transition-colors"
        >
          {pausadoBtn ? (
            <>
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Reanudar
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
              Pausar
            </>
          )}
        </button>
      </div>

      <div className="group relative flex">
        <div
          className="flex gap-4 whitespace-nowrap"
          style={{
            animation: "marquee 22s linear infinite",
            animationPlayState: pausado ? "paused" : "running",
          }}
          onMouseEnter={() => setPausadoHover(true)}
          onMouseLeave={() => setPausadoHover(false)}
        >
          {itemsDuplicados.map((enlace, i) => (
            <Link
              key={i}
              href={enlace.href}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border-2 border-white text-green-800 bg-white font-medium text-sm shadow-md hover:bg-green-50 hover:scale-105 transition-all duration-200 flex-shrink-0"
            >
              <span className="text-base">{enlace.emoji}</span>
              {enlace.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
