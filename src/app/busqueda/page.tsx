'use client';

import { useState, useEffect } from 'react';
import { searchContent, categories, searchIndex } from '@/data/searchIndex';
import Link from 'next/link';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  url: string;
  priority: string;
}

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAllContent, setShowAllContent] = useState(false);

  // Realizar búsqueda
  useEffect(() => {
    if (searchTerm.trim().length >= 2) {
      setIsLoading(true);
      setTimeout(() => {
        const searchResults = searchContent(searchTerm, selectedCategory === 'all' || selectedCategory === '' ? null : (selectedCategory as never));
        setResults(searchResults);
        setIsLoading(false);
      }, 300);
    } else if (searchTerm.trim().length === 0) {
      setResults([]);
    }
  }, [searchTerm, selectedCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // La búsqueda se maneja en el useEffect
  };

  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.category]) {
      acc[result.category] = [];
    }
    acc[result.category].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  const allContentByCategory = searchIndex.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text;
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Centro de Búsqueda
              </h1>
              <p className="text-gray-600">
                Encuentra toda la información pública de la IPS INGA KAMËNTSÁ
              </p>
            </div>

            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                >
                  <option value="">Todas las categorías</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <div className="flex flex-1">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar en todo el contenido público..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-3 rounded-r-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                  >
                    {isLoading ? (
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </form>

            {!searchTerm && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setShowAllContent(!showAllContent)}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  {showAllContent ? 'Ocultar todo el contenido' : 'Ver todo el contenido disponible'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {searchTerm && results.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Resultados de búsqueda ({results.length})
              </h2>
              {Object.entries(groupedResults).map(([category, categoryResults]) => (
                <div key={category} className="mb-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-3 border-b pb-2">
                    {category} ({categoryResults.length})
                  </h3>
                  <div className="space-y-3">
                    {categoryResults.map((result) => (
                      <Link
                        key={result.id}
                        href={result.url}
                        className="block bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-gray-900">
                                {highlightText(result.title, searchTerm)}
                              </h4>
                              <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(result.priority)}`}>
                                {result.priority === 'critical' ? 'Urgente' :
                                 result.priority === 'high' ? 'Importante' :
                                 result.priority === 'medium' ? 'Medio' : 'Informativo'}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-3">
                              {highlightText(result.description, searchTerm)}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {result.tags.map((tag) => (
                                <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <svg className="w-5 h-5 text-gray-400 ml-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {searchTerm && results.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.831-6.18-2.209" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron resultados</h3>
              <p className="text-gray-600">
                Intenta con otros términos de búsqueda o explora el contenido por categorías
              </p>
            </div>
          )}

          {(!searchTerm && showAllContent) && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Todo el contenido disponible
              </h2>
              {Object.entries(allContentByCategory).map(([category, items]) => (
                <div key={category} className="mb-8">
                  <h3 className="text-lg font-medium text-gray-700 mb-4 border-b pb-2">
                    {category} ({items.length})
                  </h3>
                  <div className="grid gap-3">
                    {items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.url}
                        className="block bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-gray-900">{item.title}</h4>
                              <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(item.priority)}`}>
                                {item.priority === 'critical' ? 'Urgente' :
                                 item.priority === 'high' ? 'Importante' :
                                 item.priority === 'medium' ? 'Medio' : 'Informativo'}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-3">{item.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {item.tags.slice(0, 5).map((tag) => (
                                <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                  {tag}
                                </span>
                              ))}
                              {item.tags.length > 5 && (
                                <span className="text-gray-400 text-xs">
                                  +{item.tags.length - 5} más
                                </span>
                              )}
                            </div>
                          </div>
                          <svg className="w-5 h-5 text-gray-400 ml-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {!searchTerm && !showAllContent && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Busca información pública
              </h3>
              <p className="text-gray-600 mb-4">
                Utiliza el buscador para encontrar servicios, trámites e información institucional
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Citas médicas', 'Urgencias', 'PQRSF', 'Directorio', 'Afiliaciones', 'Odontología'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setSearchTerm(suggestion)}
                    className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-lg text-sm transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}