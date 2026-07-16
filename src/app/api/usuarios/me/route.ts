import { NextRequest, NextResponse } from "next/server";
import { d1First } from "@/lib/cloudflare";

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "Email requerido" }, { status: 400 });
  }

  try {
    const row = await d1First<{ rol: string }>(
      "SELECT rol FROM usuarios WHERE email = ? AND activo = 1 LIMIT 1",
      [email]
    );

    if (!row) {
      return NextResponse.json({ rol: null }, { status: 404 });
    }

    return NextResponse.json({ rol: row.rol });
  } catch (error) {
    console.error("GET /api/usuarios/me error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
