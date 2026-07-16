import { NextRequest, NextResponse } from "next/server";
import { d1Query, d1First } from "@/lib/cloudflare";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await d1First(
      "SELECT * FROM directorio WHERE id = ? AND activo = 1",
      [id]
    );

    if (!result) {
      return NextResponse.json(
        { error: "Entrada de directorio no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/directorio/[id] error:", error);
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
    const { nombre, cargo, area, telefono, email, foto_url, orden } = body;

    const existing = await d1First(
      "SELECT id FROM directorio WHERE id = ? AND activo = 1",
      [id]
    );

    if (!existing) {
      return NextResponse.json(
        { error: "Entrada de directorio no encontrada" },
        { status: 404 }
      );
    }

    await d1Query(
      `UPDATE directorio
       SET nombre = ?, cargo = ?, area = ?, telefono = ?, email = ?, foto_url = ?, orden = ?, actualizado_en = datetime('now')
       WHERE id = ?`,
      [nombre ?? null, cargo ?? null, area ?? null, telefono ?? null, email ?? null, foto_url ?? null, orden ?? null, id]
    );

    return NextResponse.json({ message: "Entrada de directorio actualizada exitosamente" });
  } catch (error) {
    console.error("PUT /api/directorio/[id] error:", error);
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
      "SELECT id FROM directorio WHERE id = ? AND activo = 1",
      [id]
    );

    if (!existing) {
      return NextResponse.json(
        { error: "Entrada de directorio no encontrada" },
        { status: 404 }
      );
    }

    await d1Query(
      "UPDATE directorio SET activo = 0, actualizado_en = datetime('now') WHERE id = ?",
      [id]
    );

    return NextResponse.json({ message: "Entrada de directorio eliminada exitosamente" });
  } catch (error) {
    console.error("DELETE /api/directorio/[id] error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
