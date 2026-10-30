import { clerkClient, clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { esEmailAdmin, obtenerAdminEmails, requiereAdmin } from "@/lib/adminAuth";

const conSesionDeAdmin = clerkMiddleware(async (auth) => {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Debes iniciar sesión como administrador" }, { status: 401 });
  }

  const usuario = await (await clerkClient()).users.getUser(userId);
  const email = usuario.primaryEmailAddress?.emailAddress;
  if (!esEmailAdmin(email, obtenerAdminEmails())) {
    return NextResponse.json({ error: "Tu cuenta no tiene permisos de administrador" }, { status: 403 });
  }
});

// Solo las peticiones que requieren administrador pasan por Clerk; las
// lecturas públicas de la API no dependen de él.
export default function proxy(request: NextRequest, event: NextFetchEvent) {
  if (!requiereAdmin(request.method, request.nextUrl)) return NextResponse.next();
  return conSesionDeAdmin(request, event);
}

export const config = {
  matcher: ["/api/:path*"],
};
