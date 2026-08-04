"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * AOSInit - Componente que inicializa las animaciones AOS (Animate On Scroll)
 * Este componente debe ser incluido en el layout principal para habilitar
 * las animaciones parallax en todo el sitio
 */
export default function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      delay: 0,
      once: true,
      offset: 80,
      easing: "ease-out",
      mirror: false,
      disable: window.innerWidth < 768,
    });

    // Refrescar AOS cuando cambie el contenido
    AOS.refresh();
  }, []);

  return null;
}
