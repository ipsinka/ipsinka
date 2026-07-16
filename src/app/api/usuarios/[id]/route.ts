import { NextRequest, NextResponse } from "next/server";
import { d1Query, d1First } from "@/lib/cloudflare";

const ROLES_VALIDOS = ["admin", "editor", "visualizador"];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await d1First(
      "SELECT id, nombre, email, rol, activo, creado_en, ultimo_acceso FROM usuarios WHERE id = ? AND activo = 1",
      [id]
    );

    if (!result) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/usuarios/[id] error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { nombre, email, rol } = body;

    const existing = await d1First(
      "SELECT id FROM usuarios WHERE id = ? AND activo = 1",
      [id]
    );

    if (!existing) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    if (rol && !ROLES_VALIDOS.includes(rol)) {
      return NextResponse.json(
        { error: "Rol inválido. Use: admin, editor o visualizador" },
        { status: 400 }
      );
    }

    await d1Query(
      "UPDATE usuarios SET nombre = ?, email = ?, rol = ? WHERE id = ?",
      [nombre ?? null, email ?? null, rol ?? "editor", id]
    );

    return NextResponse.json({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
    console.error("PUT /api/usuarios/[id] error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await d1First(
      "SELECT id FROM usuarios WHERE id = ? AND activo = 1",
      [id]
    );

    if (!existing) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    await d1Query("UPDATE usuarios SET activo = 0 WHERE id = ?", [id]);

    return NextResponse.json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error("DELETE /api/usuarios/[id] error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
