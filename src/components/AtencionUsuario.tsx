"use client";

import { useState } from "react";
import Link from "next/link";

interface PQRSF {
  tipo: string;
  nombres: string;
  apellidos: string;
  tipoDocumento: string;
  numeroDocumento: string;
  telefono: string;
  email: string;
  sede: string;
  descripcion: string;
}

export default function AtencionUsuario() {
  const [formData, setFormData] = useState<PQRSF>({
    tipo: "",
    nombres: "",
    apellidos: "",
    tipoDocumento: "",
    numeroDocumento: "",
    telefono: "",
    email: "",
    sede: "",
    descripcion: "",
  });

  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // PQRSF por WhatsApp - Temporalmente deshabilitado
    // Se puede enviar por correo electrónico como alternativa

    /* Código WhatsApp comentado
    // Crear mensaje estructurado para WhatsApp
    const mensaje = `🏥 *NUEVA PQRSF - IPS INGA KAMËNTSÁ* 🏥

📋 *Tipo:* ${formData.tipo.toUpperCase()}

👤 *Datos del Usuario:*
• Nombres: ${formData.nombres}
• Apellidos: ${formData.apellidos}
• Documento: ${formData.tipoDocumento} ${formData.numeroDocumento}
• Teléfono: ${formData.telefono}
• Email: ${formData.email}

🏢 *Sede relacionada:* ${formData.sede || "No especificada"}

📝 *Descripción:*
${formData.descripcion}

---
Fecha: ${new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" })}
#PQRSF #AtencionUsuario`;

    // Codificar mensaje para URL de WhatsApp
    const mensajeCodificado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://wa.me/573132863398?text=${mensajeCodificado}`;

    // Abrir WhatsApp
    window.open(urlWhatsApp, "_blank");
    */

    // Limpiar formulario
    setFormData({
      tipo: "",
      nombres: "",
      apellidos: "",
      tipoDocumento: "",
      numeroDocumento: "",
      telefono: "",
      email: "",
      sede: "",
      descripcion: "",
    });
    setShowForm(false);

    // Crear alerta personalizada mejorada
    const alertaDiv = document.createElement("div");
    alertaDiv.innerHTML = `
      <div class="fixed inset-0 backdrop-blur-md bg-white/20 z-40 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6 text-center">
          <div class="text-blue-600 text-4xl mb-4">📧</div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">¡PQRSF Registrada!</h3>
          <p class="text-gray-700 mb-6">Su solicitud ha sido registrada. Nos pondremos en contacto con usted lo más pronto posible.</p>
          <button onclick="this.parentElement.parentElement.remove()"
                  class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
            Entendido
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(alertaDiv);
  };

  return (
    <section
      id="atencion-usuario"
      className="py-16 bg-white/55 dark:bg-gray-800 border dark:border-white rounded-3xl"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Atención al Usuario
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <div>
            <div className="bg-green-50 rounded-lg p-8 mb-8 dark:bg-gray-800 border dark:border-white">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Información de Contacto
              </h3>

              <div className="space-y-4">
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      Correo Institucional
                    </p>
                    <Link
                      href="mailto:ipsingakamentsa@gmail.com"
                      className="text-green-600 hover:underline dark:text-white"
                    >
                      ipsingakamentsa@gmail.com
                    </Link>
                  </div>
                </div>

                {/* Linea principal */}
                {/* <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      Línea Principal
                    </p>
                    <Link
                      href="tel:3132863398"
                      className="text-green-600 hover:underline dark:text-whicte"
                    >
                      3132863398
                    </Link>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* PQRSF */}
          <div>
            <div className="bg-gray-50 rounded-lg p-8 dark:bg-gray-800 border dark:border-white">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Gestión PQRSF
              </h3>
              <p className="text-gray-600 mb-6 dark:text-white">
                Peticiones, Quejas, Reclamos, Sugerencias y Felicitaciones. Su
                opinión es importante para mejorar nuestros servicios.
              </p>

              {!showForm ? (
                <div className="text-center">
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700  font-semibold border dark:border-white hover:scale-90 duration-300 transition-all"
                  >
                    Enviar PQRSF
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tipo de PQRSF *
                    </label>
                    <select
                      name="tipo"
                      value={formData.tipo}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-black"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="peticion">Petición</option>
                      <option value="queja">Queja</option>
                      <option value="reclamo">Reclamo</option>
                      <option value="sugerencia">Sugerencia</option>
                      <option value="felicitacion">Felicitación</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombres *
                      </label>
                      <input
                        type="text"
                        name="nombres"
                        value={formData.nombres}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-black "
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Apellidos *
                      </label>
                      <input
                        type="text"
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-black "
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tipo de Documento *
                      </label>
                      <select
                        name="tipoDocumento"
                        value={formData.tipoDocumento}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-black "
                      >
                        <option value="">Seleccionar...</option>
                        <option value="CC">Cédula de Ciudadanía</option>
                        <option value="TI">Tarjeta de Identidad</option>
                        <option value="RC">Registro Civil</option>
                        <option value="CE">Cédula de Extranjería</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Número de Documento *
                      </label>
                      <input
                        type="text"
                        name="numeroDocumento"
                        value={formData.numeroDocumento}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-black "
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-black "
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-black "
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Sede relacionada
                    </label>
                    <select
                      name="sede"
                      value={formData.sede}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-black "
                    >
                      <option value="">Seleccionar...</option>
                      <option value="sibundoy">Sibundoy</option>
                      <option value="colon">Colón</option>
                      <option value="santiago">Santiago</option>
                      <option value="san-andres">San Andrés</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Descripción detallada *
                    </label>
                    <textarea
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-black "
                      placeholder="Describa detalladamente su petición, queja, reclamo, sugerencia o felicitación..."
                    ></textarea>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                    >
                      Enviar PQRSF
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
