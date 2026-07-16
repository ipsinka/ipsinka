"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

type Rol = "admin" | "editor" | "visualizador" | null;

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "";

export function useRolUsuario() {
  const { user, isLoaded } = useUser();
  const [rol, setRol] = useState<Rol>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) {
      setCargando(false);
      return;
    }

    // El email del env var siempre es admin
    if (ADMIN_EMAIL && email === ADMIN_EMAIL) {
      setRol("admin");
      setCargando(false);
      return;
    }

    fetch(`/api/usuarios/me?email=${encodeURIComponent(email)}`)
      .then((r) => (r.ok ? r.json() : { rol: null }))
      .then((data) => setRol(data.rol ?? null))
      .catch(() => setRol(null))
      .finally(() => setCargando(false));
  }, [isLoaded, user]);

  return { rol, cargando, esAdmin: rol === "admin" };
}
