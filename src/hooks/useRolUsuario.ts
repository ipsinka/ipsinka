"use client";

import { useUser } from "@clerk/nextjs";

type Rol = "admin" | null;

// Emails autorizados como administradores (configurados en el entorno).
// El acceso al panel se basa exclusivamente en esta lista.
const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export function useRolUsuario() {
  const { user, isLoaded } = useUser();

  const email = user?.primaryEmailAddress?.emailAddress?.toLowerCase();
  const esAdmin = !!email && ADMIN_EMAILS.includes(email);
  const rol: Rol = esAdmin ? "admin" : null;

  return { rol, cargando: !isLoaded, esAdmin };
}
