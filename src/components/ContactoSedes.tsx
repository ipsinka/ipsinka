"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { showSuccess } from "@/lib/alerts";

interface ContactoSede {
  id: string;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  horarios: string;
  imagen: string;
  coordenadas: {
    lat: number;
    lng: number;
  };
}

const contactoSedes: ContactoSede[] = [
  {
    id: "sibundoy",
    nombre: "Sede Principal Sibundoy",
    direccion: "Diagonal al mercado municipal",
    telefono: "3132863398",
    email: "ipsingakamentsa@gmail.com",
    horarios: "Lunes a Viernes: 8:00 AM - 5:00 PM\nSábados: no disponible",
    imagen:
      "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/sedes/1.jpeg",
    coordenadas: { lat: 1.2025376, lng: -76.9180384 },
  },
  {
    id: "colon",
    nombre: "Sede Colón",
    direccion: "Barrio Centro - Cerca al Centro Cultural",
    telefono: "3132863398",
    email: "ipsingakamentsa@gmail.com",
    horarios: "Lunes a Viernes: 8:00 AM - 5:00 PM\nSábados: no disponible",
    imagen:
      "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/sedes/2.jpeg",
    coordenadas: { lat: 1.189163, lng: -76.975512 },
  },
  {
    id: "santiago",
    nombre: "Sede Santiago",
    direccion: "Sede Nazareth",
    telefono: "3132863398",
    email: "ipsingakamentsa@gmail.com",
    horarios: "Lunes a Viernes: 8:00 AM - 5:00 PM",
    imagen:
      "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/sedes/3.jpeg",
    coordenadas: { lat: 1.1889, lng: -76.8975 },
  },
  {
    id: "san-andres",
    nombre: "Sede San Andrés",
    direccion: "Chorro San Jose",
    telefono: "3132863398",
    email: "ipsingakamentsa@gmail.com",
    horarios: "Lunes a Viernes: 8:00 AM - 5:00 PM",
    imagen:
      "https://ghx22gzm9l6t5pgk.public.blob.vercel-storage.com/images/sedes/4.jpeg",
    coordenadas: { lat: 1.1275007, lng: -76.9908993 },
  },
];

export default function ContactoSedes() {
  const [selectedSede, setSelectedSede] = useState<string>("sibundoy");
  const [showCitasForm, setShowCitasForm] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    telefono: "",
    email: "",
    sede: "",
    fechaPreferida: "",
    horaPreferida: "",
    especialidad: "",
    observaciones: "",
  });

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

  const handleOpenForm = () => {
    setShowCitasForm(true);
  };

  const handleCloseForm = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowCitasForm(false);
      setIsClosing(false);
    }, 300); // Duración de la animación
  };

  const handleSubmitCita = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Solicitud de cita:", formData);
    showSuccess(
      "Su solicitud de cita ha sido enviada. Nos pondremos en contacto con usted pronto."
    );
    setFormData({
      nombres: "",
      apellidos: "",
      telefono: "",
      email: "",
      sede: "",
      fechaPreferida: "",
      horaPreferida: "",
      especialidad: "",
      observaciones: "",
    });
    handleCloseForm();
  };

  const handleMapClick = (lat: number, lng: number, nombreSede: string) => {
    const isMobile =
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        typeof window !== "undefined" ? navigator.userAgent : ""
      );

    const coordinates = `${lat},${lng}`;
    const query = encodeURIComponent(`${nombreSede}, ${coordinates}`);

    if (isMobile) {
      // Para dispositivos móviles, intenta abrir la app nativa
      const googleMapsApp = `comgooglemaps://?q=${coordinates}&center=${coordinates}&zoom=16`;
      const appleMapsApp = `maps://maps.apple.com/?q=${query}&ll=${coordinates}`;
      const googleMapsWeb = `https://maps.google.com/maps?q=${coordinates}&ll=${coordinates}&z=16`;

      // Detectar iOS o Android
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isAndroid = /Android/.test(navigator.userAgent);

      if (isIOS) {
        // Intenta abrir Apple Maps primero, luego Google Maps
        window.location.href = appleMapsApp;
        setTimeout(() => {
          window.open(googleMapsWeb, "_blank");
        }, 500);
      } else if (isAndroid) {
        // Intenta abrir Google Maps app, luego web
        window.location.href = googleMapsApp;
        setTimeout(() => {
          window.open(googleMapsWeb, "_blank");
        }, 500);
      } else {
        // Fallback para otros dispositivos móviles
        window.open(googleMapsWeb, "_blank");
      }
    } else {
      // Para desktop, abre Google Maps en nueva pestaña
      const googleMapsWeb = `https://maps.google.com/maps?q=${coordinates}&ll=${coordinates}&z=16`;
      window.open(googleMapsWeb, "_blank");
    }
  };

  const selectedSedeData = contactoSedes.find(
    (sede) => sede.id === selectedSede
  );

  return (
    <>
      <section id="contacto" className="py-16 bg-white/55 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Contactos y Sedes
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
            {/* Lista de sedes */}
            <div className="lg:col-span-1 dark:border-white border p-6 rounded-lg shadow-lg ">
              <h3 className="text-xl font-bold text-gray-800 mb-4 ">
                Seleccionar Sede
              </h3>
              <div className="space-y-3 ">
                {contactoSedes.map((sede) => (
                  <button
                    key={sede.id}
                    onClick={() => setSelectedSede(sede.id)}
                    className={`w-full text-left p-4 rounded-lg transition-colors border dark:border-white ${
                      selectedSede === sede.id
                        ? "bg-green-600 text-white dark:bg-white dark:text-gray-900 shadow-lg"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                    }`}
                  >
                    <div className="font-semibold">{sede.nombre}</div>
                  </button>
                ))}
              </div>

              {/* Botón para agendar citas */}
              {/* <div className="mt-6">
                <button
                  onClick={showCitasForm ? handleCloseForm : handleOpenForm}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold cursor-pointer"
                >
                  {showCitasForm ? "Cerrar Formulario" : "Programar Cita"}
                </button>
              </div> */}
            </div>

            {/* Información de la sede seleccionada */}
            <div className="lg:col-span-2 dark:bg-gray-800">
              {selectedSedeData && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 shadow-lg dark:from-gray-700 dark:to-gray-800 border dark:border-white">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 ">
                    {selectedSedeData.nombre}
                  </h3>

                  {/* Imagen de la sede */}
                  <div className="mb-6 rounded-lg overflow-hidden shadow-md ">
                    <Image
                      src={selectedSedeData.imagen}
                      alt={`Imagen de ${selectedSedeData.nombre}`}
                      width={800}
                      height={400}
                      className="w-full h-64 object-cover md:h-2/4 lg:h-3/4"
                      priority
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 ">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <svg
                          className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">
                            Dirección
                          </p>
                          <p className="text-gray-600 dark:text-white">
                            {selectedSedeData.direccion}
                          </p>
                        </div>
                      </div>

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
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">
                            Teléfono
                          </p>
                          <Link
                            href={`tel:${selectedSedeData.telefono}`}
                            className="text-green-600 hover:underline dark:text-white"
                          >
                            {selectedSedeData.telefono}
                          </Link>
                        </div>
                      </div>

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
                            Correo Electrónico
                          </p>
                          <Link
                            href={`mailto:${selectedSedeData.email}`}
                            className="text-green-600 hover:underline dark:text-white"
                          >
                            {selectedSedeData.email}
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-start">
                        <svg
                          className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2 dark:text-white">
                            Horarios de Atención
                          </p>
                          <div className="text-gray-600 whitespace-pre-line dark:text-white">
                            {selectedSedeData.horarios}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mapa interactivo */}
                  <div
                    className="bg-gradient-to-br from-green-100 to-blue-100 h-64 rounded-lg cursor-pointer hover:from-green-200 hover:to-blue-200 transition-all duration-300 relative overflow-hidden border-2 border-green-200 hover:border-green-300"
                    onClick={() =>
                      handleMapClick(
                        selectedSedeData.coordenadas.lat,
                        selectedSedeData.coordenadas.lng,
                        selectedSedeData.nombre
                      )
                    }
                  >
                    {/* Contenido del mapa sin iframe */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                      <div className="text-center">
                        <svg
                          className="w-16 h-16 mx-auto mb-4 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <h4 className="text-lg font-bold text-gray-800 mb-2">
                          {selectedSedeData.nombre}
                        </h4>
                        <p className="text-gray-600 mb-4">
                          {selectedSedeData.direccion}
                        </p>
                        <div className="bg-white bg-opacity-90 rounded-lg p-3 shadow-lg">
                          <p className="text-sm font-semibold text-green-600 mb-1">
                            Haz clic para abrir en mapas
                          </p>
                          <p className="text-xs text-gray-500">
                            Se abrirá en tu aplicación de mapas preferida
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Efecto hover */}
                    <div className="absolute inset-0  bg-opacity-0 hover:bg-opacity-5 transition-all duration-300 flex items-center justify-center">
                      <div className="bg-white bg-opacity-90 rounded-lg p-3 text-center shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <svg
                          className="w-8 h-8 mx-auto mb-1 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <p className="text-sm font-semibold text-gray-800">
                          Abrir en Mapas
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modal de formulario de citas */}
      {showCitasForm && (
        <div
          className={`fixed inset-0 z-40 flex items-end justify-center p-4 bg-opacity-50 backdrop-blur-sm  transition-all duration-300 ease-in-out ${
            isClosing ? "opacity-0" : "opacity-100"
          }`}
        >
          <div
            className={`relative bg-white rounded-lg shadow-xl shadow-gray-500  p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border-black border-1  transition-all duration-300 ease-in-out ${
              isClosing
                ? "opacity-0 scale-95 translate-y-4"
                : "opacity-100 scale-100 -translate-y-3"
            }`}
          >
            {/* Botón de cerrar */}
            <button
              onClick={handleCloseForm}
              className="absolute top-4 right-4 text-black  text-2xl font-bold border border-black rounded-full w-8 cursor-pointer hover:scale-120 transition-all duration-300 ease-in-out hover:bg-black hover:text-white "
            >
              ×
            </button>

            <h4 className="text-2xl font-bold text-gray-800 mb-6">
              Programar Cita
            </h4>
            {/* <form onSubmit={handleSubmitCita} className="space-y-4">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sede *
                </label>
                <select
                  name="sede"
                  value={formData.sede}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                >
                  <option value="" className="text-gray-500">
                    Seleccionar sede...
                  </option>
                  <option value="sibundoy">Sibundoy</option>
                  <option value="colon">Colón</option>
                  <option value="santiago">Santiago</option>
                  <option value="san-andres">San Andrés</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Fecha Preferida *
                  </label>
                  <input
                    type="date"
                    name="fechaPreferida"
                    value={formData.fechaPreferida}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hora Preferida *
                  </label>
                  <select
                    name="horaPreferida"
                    value={formData.horaPreferida}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  >
                    <option value="" className="text-gray-500">
                      Seleccionar...
                    </option>
                    <option value="08:00">8:00 AM</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Especialidad
                  </label>
                  <select
                    name="especialidad"
                    value={formData.especialidad}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="medicina-general">Medicina General</option>
                    <option value="pediatria">Pediatría</option>
                    <option value="ginecologia">Ginecología</option>
                    <option value="odontologia">Odontología</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Observaciones
                </label>
                <textarea
                  name="observaciones"
                  value={formData.observaciones}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-500"
                  placeholder="Motivo de la consulta o información adicional..."
                ></textarea>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold cursor-pointer"
                >
                  Enviar Solicitud
                </button>
              </div>
            </form> */}
          </div>
        </div>
      )}
    </>
  );
}
