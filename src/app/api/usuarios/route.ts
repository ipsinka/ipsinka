import { NextRequest, NextResponse } from "next/server";
import { d1Query, d1First } from "@/lib/cloudflare";

const ROLES_VALIDOS = ["admin", "editor", "visualizador"];

export async function GET() {
  try {
    const result = await d1Query(
      "SELECT id, nombre, email, rol, activo, creado_en, ultimo_acceso FROM usuarios WHERE activo = 1 ORDER BY creado_en DESC"
    );
    return NextResponse.json(result.results);
  } catch (error) {
    console.error("GET /api/usuarios error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, email, rol } = body;

    if (!nombre || !email) {
      return NextResponse.json(
        { error: "Los campos 'nombre' y 'email' son requeridos" },
        { status: 400 }
      );
    }

    if (rol && !ROLES_VALIDOS.includes(rol)) {
      return NextResponse.json(
        { error: "Rol inválido. Use: admin, editor o visualizador" },
        { status: 400 }
      );
    }

    const existing = await d1First(
      "SELECT id FROM usuarios WHERE email = ?",
      [email]
    );

    if (existing) {
      return NextResponse.json(
        { error: "Ya existe un usuario con ese email" },
        { status: 409 }
      );
    }

    const result = await d1Query(
      `INSERT INTO usuarios (nombre, email, rol, activo, creado_en)
       VALUES (?, ?, ?, 1, datetime('now'))`,
      [nombre, email, rol ?? "editor"]
    );

    return NextResponse.json(
      { id: result.meta.last_row_id, message: "Usuario creado exitosamente" },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/usuarios error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
