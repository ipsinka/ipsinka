// Reglas de acceso a la API. Las aplica src/proxy.ts en el servidor; la
// comprobación del panel /admin en el navegador es solo de interfaz.

const METODOS_ESCRITURA = new Set(["POST", "PUT", "PATCH", "DELETE"]);

// Lista de administradores. ADMIN_EMAILS (solo servidor) tiene prioridad;
// NEXT_PUBLIC_ADMIN_EMAILS se mantiene como respaldo porque el panel la usa.
export function obtenerAdminEmails(
  env: Record<string, string | undefined> = process.env
): string[] {
  return (env.ADMIN_EMAILS ?? env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function esEmailAdmin(email: string | null | undefined, admins: string[]): boolean {
  return !!email && admins.includes(email.trim().toLowerCase());
}

// true si la petición solo la puede hacer un administrador.
export function requiereAdmin(metodo: string, url: URL): boolean {
  if (!url.pathname.startsWith("/api/")) return false;
  // El navegador de cualquier visitante envía aquí los reportes de la CSP.
  if (url.pathname === "/api/csp-report") return false;
  if (METODOS_ESCRITURA.has(metodo.toUpperCase())) return true;

  // Los visitantes solo pueden listar publicaciones publicadas; borradores y
  // archivadas son del panel.
  if (url.pathname === "/api/publicaciones") {
    return url.searchParams.get("estado") !== "publicado";
  }
  // El detalle por id devuelve cualquier estado y solo lo usa el panel.
  if (url.pathname.startsWith("/api/publicaciones/")) return true;
  return false;
}
