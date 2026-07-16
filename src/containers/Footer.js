"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Footer.module.scss";

export default function Footer() {
  const [menuOption, setMenuOption] = useState(false);
  const [imageError, setImageError] = useState({});
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOption &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOption(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOption]);

  // IDs únicos para el manejo de errores de imágenes
  const facebookImageId = "facebook";
  const instagramImageId = "instagram";
  const whatsappImageId = "whatsapp";
  const tiktokImageId = "tiktok";

  // Estilos para los items de redes sociales
  const socialItemStyle = {
    padding: "5px",
    backgroundColor: "#fff",
    border: "1px solid #000",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50px",
    height: "50px",
  };

  return (
    <>
      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            transform: translateX(-250px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>

      <footer className="bg-gray-800 text-white dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                {/* <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">IK</span>
                </div> */}

                <Link href="/" title="Ir a inicio">
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
                title="Abrir sitio web"
                className="flex items-center space-x-2 text-gray-400 hover:text-white dark:text-gray-500 dark:hover:text-green-400 text-sm transition-colors"
                aria-label="Desarrollado por neurai.dev"
                target="_blank"
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

        {/* Botón flotante para abrir/cerrar redes sociales */}
        <div
          ref={buttonRef}
          className={styles.flecha}
          onClick={() => {
            setMenuOption(!menuOption);
          }}
          role="button"
          tabIndex={0}
          aria-label="Toggle social media menu"
          style={{
            position: "fixed",
            bottom: "8px",
            left: "5px",
            zIndex: 1000,
            backgroundColor: "#16a34a",
            padding: "10px",
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "50px",
            height: "50px",
            boxShadow: "1px 2px 10px 4px rgba(0,0,0,0.5)",
            transition: "transform 0.3s ease",
            transform: menuOption ? "rotate(180deg)" : "rotate(0deg)",
            scale: menuOption ? ".9" : "1",
          }}
        >
          <Image
            src="https://0dwas2ied3dcs14f.public.blob.vercel-storage.com/icons/arrow.png"
            alt="Compartir"
            width={30}
            height={30}
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>

        {/* Redes sociales flotantes */}
        <article
          ref={menuRef}
          className={`${styles.redes} ${
            menuOption ? styles.open : styles.closed
          }`}
          style={{
            position: "fixed",
            bottom: "65px",
            left: "10px",
            zIndex: 999,
            display: menuOption ? "flex" : "none",
            flexDirection: "column",
            gap: "10px",
            animation: menuOption
              ? "slideInFromLeft 0.3s ease-in forwards"
              : "none",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <li style={socialItemStyle}>
              <Link
                href="https://www.facebook.com/luisfernando.mutunbajoyjacacanamejoy"
                target="_blank"
                rel="noreferrer"
              >
                {imageError[facebookImageId] ? (
                  <span style={{ fontSize: "40px" }}>📘</span>
                ) : (
                  <Image
                    alt="Facebook"
                    src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                    width={40}
                    height={40}
                    loading="lazy"
                    onError={() =>
                      setImageError((prev) => ({
                        ...prev,
                        [facebookImageId]: true,
                      }))
                    }
                  />
                )}
              </Link>
            </li>

            {/* <li style={socialItemStyle}>
              <Link
                href="https://www.instagram.com/julianrio95/"
                target="_blank"
                rel="noreferrer"
              >
                {imageError[instagramImageId] ? (
                  <span style={{ fontSize: "40px" }}>📷</span>
                ) : (
                  <Image
                    alt="Instagram"
                    src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                    width={40}
                    height={40}
                    loading="lazy"
                    onError={() =>
                      setImageError((prev) => ({
                        ...prev,
                        [instagramImageId]: true,
                      }))
                    }
                  />
                )}
              </Link>
            </li> */}

            {/* WhatsApp - Temporalmente deshabilitado */}
            {/* <li style={socialItemStyle}>
              <Link
                href="https://wa.me/573132863398"
                target="_blank"
                rel="noreferrer"
              >
                {imageError[whatsappImageId] ? (
                  <span style={{ fontSize: "40px" }}>💬</span>
                ) : (
                  <Image
                    alt="Whatsapp"
                    src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
                    width={40}
                    height={40}
                    loading="lazy"
                    onError={() =>
                      setImageError((prev) => ({
                        ...prev,
                        [whatsappImageId]: true,
                      }))
                    }
                  />
                )}
              </Link>
            </li> */}

            {/* <li style={socialItemStyle}>
              <Link
                href="https://www.tiktok.com/@julii1295?_t=8n2OQ52Q4aD&_r=1"
                target="_blank"
                rel="noreferrer"
              >
                {imageError[tiktokImageId] ? (
                  <span style={{ fontSize: "40px" }}>🎵</span>
                ) : (
                  <Image
                    alt="TikTok"
                    src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png"
                    width={40}
                    height={40}
                    loading="lazy"
                    onError={() =>
                      setImageError((prev) => ({
                        ...prev,
                        [tiktokImageId]: true,
                      }))
                    }
                  />
                )}
              </Link>
            </li> */}
          </ul>
        </article>
      </footer>
    </>
  );
}
