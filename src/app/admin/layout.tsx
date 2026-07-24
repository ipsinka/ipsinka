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
  Heart,
  Users,
  MapPin,
  Menu,
  X,
  LogOut,
  Building2,
  BookOpen,
  ClipboardList,
  CalendarDays,
  UserCog,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/informes", label: "Informes Mensuales", icon: ClipboardList },
  { href: "/admin/eventos", label: "Calendario", icon: CalendarDays },
  { href: "/admin/publicaciones", label: "Publicaciones", icon: BookOpen },
  { href: "/admin/noticias", label: "Noticias", icon: Newspaper },
  { href: "/admin/galeria", label: "Galería", icon: Image },
  { href: "/admin/documentos", label: "Documentos", icon: FileText },
  { href: "/admin/servicios", label: "Servicios", icon: Heart },
  { href: "/admin/directorio", label: "Directorio", icon: Users },
  { href: "/admin/sedes", label: "Sedes", icon: MapPin },
  { href: "/admin/usuarios", label: "Usuarios", icon: UserCog },
];

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "").split(",").map(e => e.trim()).filter(Boolean);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

    const email = user.primaryEmailAddress?.emailAddress ?? "";

    // El email del env var siempre tiene acceso (admin por defecto)
    if (ADMIN_EMAILS.includes(email)) {
      setAutorizado(true);
      return;
    }

    fetch(`/api/usuarios/me?email=${encodeURIComponent(email)}`)
      .then((r) => (r.ok ? r.json() : { rol: null }))
      .then((data) => {
        if (data.rol) {
          setAutorizado(true);
        } else {
          setAutorizado(false);
          router.replace("/admin/sign-in?error=unauthorized");
        }
      })
      .catch(() => {
        setAutorizado(false);
        router.replace("/admin/sign-in?error=unauthorized");
      });
  }, [isLoaded, user, pathname, router]);

  const isSignInPage = pathname.startsWith("/admin/sign-in");
  if (isSignInPage) return <>{children}</>;

  // Mientras se verifica el acceso, mostrar pantalla en blanco (evita flash de redirección)
  if (!autorizado) {
    return (
      <div className="h-dvh flex items-center justify-center bg-slate-100 dark:bg-slate-950">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
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
        className={`fixed top-0 left-0 h-dvh w-64 bg-slate-800 z-30 transform transition-transform duration-300 ease-in-out flex flex-col
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Logo sidebar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-emerald-400" />
            <span className="text-white font-semibold text-sm leading-tight">
              Inga Kamentsa
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navegación */}
        <nav className="px-3 py-4 space-y-1 overflow-y-auto flex-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "bg-emerald-600 text-white"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Cerrar sesión */}
        <div className="absolute bottom-0 left-0 right-0 px-3 py-4 border-t border-slate-700">
          <button
            onClick={() => signOut({ redirectUrl: "/admin/sign-in" })}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Header */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center gap-4 sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-slate-800 dark:text-slate-100 font-semibold text-base sm:text-lg truncate">
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
