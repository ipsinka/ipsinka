"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();

  const getBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      { name: 'Inicio', href: '/' }
    ];

    let currentPath = '';
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      
      let name = '';
      switch (path) {
        case 'institucional':
          name = 'Institucional';
          break;
        case 'servicios':
          name = 'Servicios';
          break;
        case 'sedes':
          name = 'Sedes';
          break;
        case 'contacto':
          name = 'Contacto';
          break;
        case 'directorio':
          name = 'Directorio';
          break;
        case 'eventos':
          name = 'Eventos';
          break;
        case 'atencion-usuario':
          name = 'Atención al Usuario';
          break;
        case 'busqueda':
          name = 'Búsqueda';
          break;
        case 'sibundoy':
          name = 'Sede Sibundoy';
          break;
        case 'colon':
          name = 'Sede Colón';
          break;
        case 'santiago':
          name = 'Sede Santiago';
          break;
        case 'san-andres':
          name = 'Sede San Andrés';
          break;
        default:
          name = path.charAt(0).toUpperCase() + path.slice(1);
      }

      breadcrumbs.push({
        name,
        href: currentPath,
        isLast: index === paths.length - 1
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  if (breadcrumbs.length <= 1) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `https://ipsinka.com${crumb.href}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav className="bg-gray-50 dark:bg-gray-800 py-2 px-4 transition-colors duration-200" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center">
              {index > 0 && (
                <svg
                  className="w-4 h-4 text-gray-400 mx-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {crumb.isLast ? (
                <span className="text-gray-600 dark:text-gray-300 font-medium">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}


