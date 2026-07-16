"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Contacto {
  id: string;
  nombre: string;
  cargo: string;
  departamento: string;
  telefono: string;
  extension?: string;
  email: string;
  sede: string;
  horarioAtencion: string;
}

export default function DirectorioTelefonico() {
  const [directorioContactos, setDirectorioContactos] = useState<Contacto[]>([]);
  const [filtroSede, setFiltroSede] = useState<string>("todas");
  const [filtroDepartamento, setFiltroDepartamento] = useState<string>("todos");
  const [busqueda, setBusqueda] = useState<string>("");

  useEffect(() => {
    let activo = true;
    const cargarDirectorio = async () => {
      try {
        const res = await fetch("/api/directorio");
        if (!res.ok) throw new Error("Error al cargar directorio");
        const data = await res.json();
        const lista = Array.isArray(data) ? data : (data.results ?? []);
        if (!activo) return;
        const mapeados: Contacto[] = lista.map(
          (c: {
            id: number;
            nombre: string;
            cargo: string;
            area: string | null;
            telefono: string | null;
            email: string | null;
          }) => ({
            id: String(c.id),
            nombre: c.nombre,
            cargo: c.cargo,
            departamento: c.area ?? "Administrativo",
            telefono: c.telefono ?? "3132863398",
            email: c.email ?? "ipsingakamentsa@gmail.com",
            sede: "Sibundoy",
            horarioAtencion: "Lunes a Viernes 8:00 AM - 5:00 PM",
          })
        );
        setDirectorioContactos(mapeados);
      } catch {
        if (activo) setDirectorioContactos([]);
      }
    };
    cargarDirectorio();
    return () => {
      activo = false;
    };
  }, []);

  const sedes = [
    "todas",
    ...Array.from(new Set(directorioContactos.map((c) => c.sede))),
  ];
  const departamentos = [
    "todos",
    ...Array.from(new Set(directorioContactos.map((c) => c.departamento))),
  ];

  const contactosFiltrados = directorioContactos.filter((contacto) => {
    const cumpleSede = filtroSede === "todas" || contacto.sede === filtroSede;
    const cumpleDepartamento =
      filtroDepartamento === "todos" ||
      contacto.departamento === filtroDepartamento;
    const cumpleBusqueda =
      busqueda === "" ||
      contacto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      contacto.cargo.toLowerCase().includes(busqueda.toLowerCase()) ||
      contacto.departamento.toLowerCase().includes(busqueda.toLowerCase());

    return cumpleSede && cumpleDepartamento && cumpleBusqueda;
  });

  const getDepartamentoColor = (departamento: string) => {
    switch (departamento) {
      case "Gerencia":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Asistencial":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Secretaría":
        return "bg-green-100 text-green-800 border-green-200";
      case "Atención al Usuario":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Administrativo":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDepartamentoIcon = (departamento: string) => {
    switch (departamento) {
      case "Gerencia":
        return "👔";
      case "Asistencial":
        return "👩‍⚕️";
      case "Secretaría":
        return "📝";
      case "Atención al Usuario":
        return "🤝";
      case "Administrativo":
        return "💼";
      default:
        return "📞";
    }
  };

  return (
    <section id="directorio" className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Directorio Telefónico
        </h2> */}

        {/* Información de contacto principal */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg p-8 mb-12 dark:from-gray-400">
          <div className="flex flex-col md:flex-row gap-8 text-center items-center justify-center w-full dark:bg-gray-800">
            <div className="flex-1 flex flex-col items-center">
              <h3 className="text-xl font-bold mb-2">📞 Línea Principal</h3>
              <Link
                href="tel:3132863398"
                className="text-2xl font-bold hover:text-green-200 transition-colors"
              >
                3132863398
              </Link>
              <p className="opacity-90">Todas las sedes</p>
            </div>

            <div className="flex-1 flex flex-col items-center">
              <h3 className="text-xl font-bold mb-2">📧 Email General</h3>
              <p className="text-lg font-bold">
                <Link
                  href="mailto:ipsingakamentsa@gmail.com"
                  className="hover:text-green-200 transition-colors"
                >
                  ipsingakamentsa@gmail.com
                </Link>
              </p>
              <p className="opacity-90">Información general</p>
            </div>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        {/* <div className="bg-gray-50 rounded-lg p-6 mb-8 dark:bg-gray-800 border dark:border-white shadow-white shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-white">
                Buscar por nombre o cargo
              </label>
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar contacto..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-white">
                Filtrar por sede
              </label>
              <select
                value={filtroSede}
                onChange={(e) => setFiltroSede(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              >
                {sedes.map((sede) => (
                  <option key={sede} value={sede}>
                    {sede === "todas" ? "Todas las sedes" : sede}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-white">
                Filtrar por departamento
              </label>
              <select
                value={filtroDepartamento}
                onChange={(e) => setFiltroDepartamento(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              >
                {departamentos.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === "todos" ? "Todos los departamentos" : dept}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div> */}

        {/* Lista de contactos */}
        {contactosFiltrados.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {contactosFiltrados.map((contacto) => (
            <div
              key={contacto.id}
              className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow dark:bg-gray-800 dark:border-white"
            >
              <div className="flex items-center mb-4 ">
                <span className="text-2xl mr-3 ">
                  {getDepartamentoIcon(contacto.departamento)}
                </span>
                <div>
                  <h3 className="font-bold text-gray-800 ">
                    {contacto.nombre}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-white">
                    {contacto.cargo}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getDepartamentoColor(
                    contacto.departamento
                  )}`}
                >
                  {contacto.departamento}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <svg
                    className="w-4 h-4 mr-2 text-green-600"
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
                  <a
                    href={`tel:${contacto.telefono}`}
                    className="hover:text-green-600 dark:text-white"
                  >
                    {contacto.telefono}
                    {contacto.extension && ` Ext. ${contacto.extension}`}
                  </a>
                </div>

                <div className="flex items-center text-gray-700">
                  <svg
                    className="w-4 h-4 mr-2 text-green-600"
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
                  <a
                    href={`mailto:${contacto.email}`}
                    className="hover:text-green-600 text-sm truncate dark:text-white"
                  >
                    {contacto.email}
                  </a>
                </div>

                <div className="flex items-center text-gray-700 dark:text-white">
                  <svg
                    className="w-4 h-4 mr-2 text-green-600"
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
                  <span className="text-sm">Sede {contacto.sede}</span>
                </div>

                <div className="flex items-start text-gray-700 dark:text-white">
                  <svg
                    className="w-4 h-4 mr-2 mt-1 text-green-600"
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
                  <span className="text-sm">{contacto.horarioAtencion}</span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <a
                  href={`tel:${contacto.telefono}`}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-center text-sm hover:bg-green-700 transition-colors"
                >
                  Llamar
                </a>
                <a
                  href={`mailto:${contacto.email}`}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-center text-sm hover:bg-blue-700 transition-colors"
                >
                  Email
                </a>
              </div>
            </div>
          ))}
        </div>
        )}

        {directorioContactos.length > 0 && contactosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No se encontraron contactos con los criterios seleccionados.
            </p>
            <button
              onClick={() => {
                setBusqueda("");
                setFiltroSede("todas");
                setFiltroDepartamento("todos");
              }}
              className="mt-4 text-green-600 hover:text-green-800 font-semibold"
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {/* Información adicional */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8 border border-blue-200 dark:bg-gray-800 dark:border-white">
          <h3 className="text-xl font-bold text-blue-800 mb-4 text-center">
            📋 Información Importante
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-700 dark:text-white">
            <div>
              <h4 className="font-semibold mb-2">Horarios Generales:</h4>
              <ul className="space-y-1">
                <li>• Lunes a Viernes: 8:00 AM - 5:00 PM</li>
                <li>• Sábados - Domingos: No hay atención</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Para mejor atención:</h4>
              <ul className="space-y-1">
                <li>• Tenga a mano su documento de identidad</li>
                <li>• Mencione el servicio o área que necesita</li>
                <li>• Para citas, use el número directo de cada sede</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
