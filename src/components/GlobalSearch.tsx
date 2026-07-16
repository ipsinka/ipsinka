"use client";

import { useState, useEffect, useRef } from "react";
import { searchContent, categories } from "@/data/searchIndex";
import Link from "next/link";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  url: string;
  priority: string;
}

export default function GlobalSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Cerrar resultados cuando se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Realizar búsqueda con debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim().length >= 2) {
        setIsLoading(true);
        const searchResults = searchContent(
          searchTerm,
          selectedCategory ? (selectedCategory as never) : null
        );
        setResults(searchResults);
        setIsOpen(true);
        setIsLoading(false);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      // Navegar al primer resultado de forma segura
      const firstResult = results[0];
      // Usar router.push o Link para navegación interna de Next.js
      if (firstResult.url.startsWith('/')) {
        // Ruta interna
        window.location.href = firstResult.url;
      } else {
        // Ruta externa
        window.open(firstResult.url, '_blank', 'noopener,noreferrer');
      }
    } else if (searchTerm.trim().length >= 2) {
      // Si no hay resultados, mostrar mensaje en lugar de redirigir
      setIsOpen(true);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "text-red-600";
      case "high":
        return "text-green-600";
      case "medium":
        return "text-blue-600";
      case "low":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return "Urgente";
      case "high":
        return "Importante";
      case "medium":
        return "Medio";
      case "low":
        return "Informativo";
      default:
        return "";
    }
  };

  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text;

    const regex = new RegExp(
      `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark
          key={index}
          className="bg-yellow-200 text-yellow-900 px-1 rounded"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className=" py-8 border-b shadow-sm dark:bg-gray-900 dark:border-gray-700 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Título de la sección */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 dark:text-white dark:bg-gray-800 p-4 rounded ">
              Buscador de Información Pública
            </h2>
            <p className="text-gray-600 dark:text-white">
              Encuentra servicios, trámites, información institucional y más
            </p>
          </div>

          {/* Contenedor de búsqueda */}
          <div ref={searchRef} className="relative">
            <form onSubmit={handleSearch} className="space-y-4">
              {/* Filtro por categoría */}
              <div className="flex flex-col md:flex-row gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-black"
                >
                  <option value="" className="text-black dark:text-white">
                    Todas las categorías
                  </option>
                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                      className="text-black dark:text-white"
                    >
                      {category}
                    </option>
                  ))}
                </select>

                {/* Campo de búsqueda */}
                <div className="flex flex-1">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar servicios, trámites, información..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black placeholder-gray-500 dark:text-white dark:placeholder-white "
                  />
                  <button
                    type="submit"
                    disabled={results.length === 0}
                    className="bg-green-600 text-white px-6 py-3 rounded-r-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? (
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full "></div>
                    ) : (
                      <svg
                        className="w-5 h-5 "
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </form>

            {/* Resultados de búsqueda */}
            {isOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                {results.length > 0 ? (
                  <div className="p-2">
                    <div className="text-sm text-gray-600 px-3 py-2 border-b">
                      {results.length} resultado
                      {results.length !== 1 ? "s" : ""} encontrado
                      {results.length !== 1 ? "s" : ""}
                    </div>
                    {results.map((result) => (
                      <Link
                        key={result.id}
                        href={result.url}
                        className="block p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900">
                                {highlightText(result.title, searchTerm)}
                              </h3>
                              <span
                                className={`text-xs px-2 py-1 rounded-full bg-gray-100 ${getPriorityColor(
                                  result.priority
                                )}`}
                              >
                                {getPriorityBadge(result.priority)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {highlightText(result.description, searchTerm)}
                            </p>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                {result.category}
                              </span>
                              {result.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="bg-gray-100 text-gray-600 px-2 py-1 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                              {result.tags.length > 3 && (
                                <span className="text-gray-400">
                                  +{result.tags.length - 3} más
                                </span>
                              )}
                            </div>
                          </div>
                          <svg
                            className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : searchTerm.trim().length >= 2 && !isLoading ? (
                  <div className="p-6 text-center">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-blue-600 dark:text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No se encontraron resultados
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      No encontramos información relacionada con &quot;
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {searchTerm}
                      </span>
                      &quot;
                    </p>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                        Intenta con:
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {[
                          "Citas médicas",
                          "Servicios",
                          "Directorio",
                          "Sedes",
                        ].map((suggestion) => (
                          <button
                            key={suggestion}
                            onClick={() => {
                              setSearchTerm(suggestion);
                              setIsOpen(false);
                            }}
                            className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-full hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                    <Link
                      href="/contacto"
                      className="mt-4 inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      ¿Necesitas ayuda? Contáctanos
                    </Link>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {/* Sugerencias de búsqueda */}
          {!searchTerm && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-3 dark:text-white">
                Búsquedas frecuentes:
              </p>

              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {[
                  "Citas médicas",
                  "PQRSF",
                  "Directorio",
                  "Odontología",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setSearchTerm(suggestion)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              <Link
                href="/busqueda"
                className="inline-flex items-center gap-2 text-black dark:text-white hover:text-green-700 font-medium text-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Búsqueda avanzada - Ver todo el contenido
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
