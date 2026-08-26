"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Newspaper,
  Image,
  FileText,
  ArrowRight,
  ClipboardList,
  CalendarDays,
  UserCog,
  GalleryHorizontalEnd,
} from "lucide-react";

interface StatCard {
  label: string;
  href: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  endpoint: string;
}

const statCards: StatCard[] = [
  {
    label: "Slider de inicio",
    href: "/admin/slider",
    icon: GalleryHorizontalEnd,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    endpoint: "/api/slider",
  },
  {
    label: "Informes Mensuales",
    href: "/admin/informes",
    icon: ClipboardList,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    endpoint: "/api/informes",
  },
  {
    label: "Eventos",
    href: "/admin/eventos",
    icon: CalendarDays,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    endpoint: "/api/eventos",
  },
  {
    label: "Noticias",
    href: "/admin/noticias",
    icon: Newspaper,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    endpoint: "/api/noticias",
  },
  {
    label: "Galería",
    href: "/admin/galeria",
    icon: Image,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    endpoint: "/api/galeria",
  },
  {
    label: "Documentos",
    href: "/admin/documentos",
    icon: FileText,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    endpoint: "/api/documentos",
  },
  {
    label: "Usuarios",
    href: "/admin/usuarios",
    icon: UserCog,
    color: "text-slate-600 dark:text-slate-300",
    bgColor: "bg-slate-100",
    endpoint: "/api/usuarios",
  },
];

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-10 w-10 rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="h-8 w-12 rounded bg-slate-200 dark:bg-slate-700" />
      </div>
      <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-700 mb-3" />
      <div className="h-8 w-28 rounded bg-slate-200 dark:bg-slate-700" />
    </div>
  );
}

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Record<string, number | null>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const results = await Promise.all(
        statCards.map(async (card) => {
          try {
            const res = await fetch(card.endpoint);
            if (!res.ok) return [card.endpoint, 0] as const;
            const data = await res.json();
            const count = Array.isArray(data)
              ? data.length
              : (data.results?.length ?? 0);
            return [card.endpoint, count] as const;
          } catch {
            return [card.endpoint, 0] as const;
          }
        }),
      );
      setCounts(Object.fromEntries(results));
      setLoading(false);
    };

    fetchAll();
  }, []);

  return (
    <div className="space-y-6">
      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? statCards.map((card) => <SkeletonCard key={card.endpoint} />)
          : statCards.map((card) => {
              const Icon = card.icon;
              const count = counts[card.endpoint];
              return (
                <div
                  key={card.endpoint}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`h-10 w-10 rounded-lg ${card.bgColor} dark:bg-slate-700 flex items-center justify-center`}
                    >
                      <Icon className={`h-5 w-5 ${card.color}`} />
                    </div>
                    <span className="text-3xl font-bold text-slate-800 dark:text-white">
                      {count ?? "—"}
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-3">
                    {card.label}
                  </p>
                  <Link
                    href={card.href}
                    className={`inline-flex items-center gap-1 text-sm font-medium ${card.color} hover:underline`}
                  >
                    Gestionar
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
      </div>
    </div>
  );
}
