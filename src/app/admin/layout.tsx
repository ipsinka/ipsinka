"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import ThemeSwitcher from "@/components/ThemeSwitcher";

import {
  LayoutDashboard,
  Newspaper,
  Image,
  FileText,
  Menu,
  X,
  LogOut,
  Building2,
  MapPin,
  BookOpen,
  ClipboardList,
  CalendarDays,
  GalleryHorizontalEnd,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Tablero de control", icon: LayoutDashboard },
  { href: "/admin/slider", label: "Slider de inicio", icon: GalleryHorizontalEnd },
  { href: "/admin/informes", label: "Informes Mensuales", icon: ClipboardList },
  { href: "/admin/eventos", label: "Calendario", icon: CalendarDays },
  { href: "/admin/publicaciones", label: "Publicaciones", icon: BookOpen },
  { href: "/admin/noticias", label: "Noticias", icon: Newspaper },
  { href: "/admin/galeria", label: "Galería", icon: Image },
  { href: "/admin/documentos", label: "Documentos", icon: FileText },
  { href: "/admin/sedes", label: "Sedes", icon: MapPin },
];

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "").split(",").map(e => e.trim().toLowerCase()).filter(Boolean);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Sidebar colapsado (solo iconos) en escritorio, para ganar espacio.
  const [colapsado, setColapsado] = useState(false);
  // null = verificando, false = no autorizado, true = autorizado
  const [autorizado, setAutorizado] = useState<boolean | null>(null);
  const pathname = usePathname();
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    const isSignInPage = pathname.startsWith("/admin/sign-in");
    if (isSignInPage) return;

    if (!user) {
      router.replace("/admin/sign-in");
      return;
    }

    const email = user.primaryEmailAddress?.emailAddress?.toLowerCase() ?? "";

    // El acceso al panel se basa únicamente en la lista de emails autorizados.
    if (ADMIN_EMAILS.includes(email)) {
      setAutorizado(true);
    } else {
      setAutorizado(false);
      router.replace("/admin/sign-in?error=unauthorized");
    }
  }, [isLoaded, user, pathname, router]);

  const isSignInPage = pathname.startsWith("/admin/sign-in");
  if (isSignInPage) return <>{children}</>;

  // Mientras se verifica el acceso, mostrar pantalla en blanco (evita flash de redirección)
  if (!autorizado) {
    return (
      <div className="h-dvh flex items-center justify-center bg-slate-100 dark:bg-slate-950">
        <div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-dvh bg-slate-100 dark:bg-slate-950 flex overflow-hidden">
      {/* Overlay móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-dvh bg-slate-800 z-30 transform transition-all duration-300 ease-in-out flex flex-col
          w-64 ${colapsado ? "lg:w-20" : "lg:w-64"}
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Logo sidebar */}
        <div className={`flex items-center justify-between border-b border-slate-700 py-5 ${colapsado ? "lg:px-3" : "px-6"}`}>
          <div className={`flex items-center gap-2 min-w-0 ${colapsado ? "lg:justify-center lg:w-full" : ""}`}>
            <Building2 className="h-6 w-6 text-green-400 flex-shrink-0" />
            {!colapsado && (
              <>
                <span className="text-white font-semibold text-sm leading-tight lg:inline">
                  Inga Kamentsa
                </span>
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Ver el sitio público en una pestaña nueva"
                  aria-label="Ver el sitio público en una pestaña nueva"
                  className="boton-ver-sitio-pulso inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <Globe className="h-4 w-4 flex-shrink-0" />
                  Ver sitio
                </a>
              </>
            )}
          </div>
          {/* Cerrar en móvil */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Botón colapsar/expandir (solo escritorio) */}
        <button
          onClick={() => setColapsado((c) => !c)}
          title={colapsado ? "Expandir menú" : "Recoger menú"}
          aria-label={colapsado ? "Expandir menú" : "Recoger menú"}
          className={`hidden lg:flex items-center gap-2 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors py-2 border-b border-slate-700
            ${colapsado ? "justify-center px-3" : "justify-end px-6"}`}
        >
          {colapsado ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <>
              <span className="text-xs font-medium">Recoger</span>
              <ChevronLeft className="h-5 w-5" />
            </>
          )}
        </button>

        {/* Navegación (con scroll vertical) */}
        <nav className="px-3 py-4 space-y-1 overflow-y-auto flex-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                title={colapsado ? label : undefined}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${colapsado ? "lg:justify-center lg:px-0" : ""}
                  ${
                    isActive
                      ? "bg-green-700 text-white"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className={colapsado ? "lg:hidden" : ""}>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Cerrar sesión (en el flujo flex, no absoluto, para no tapar el scroll) */}
        <div className="flex-shrink-0 px-3 py-4 border-t border-slate-700">
          <button
            onClick={() => signOut({ redirectUrl: "/admin/sign-in" })}
            title={colapsado ? "Cerrar sesión" : undefined}
            className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors
              ${colapsado ? "lg:justify-center lg:px-0" : ""}`}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            <span className={colapsado ? "lg:hidden" : ""}>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3 flex items-center gap-4 sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-slate-800 dark:text-white font-semibold text-base sm:text-lg truncate">
            Panel Admin — IPS Inga Kamentsa
          </h1>
          <div className="ml-auto">
            <ThemeSwitcher />
          </div>
        </header>

        {/* Página */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
