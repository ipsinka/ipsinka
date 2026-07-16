import { NextRequest, NextResponse } from "next/server";
import { d1Query, d1First } from "@/lib/cloudflare";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await d1First(
      "SELECT * FROM documentos WHERE id = ? AND activo = 1",
      [id]
    );

    if (!result) {
      return NextResponse.json({ error: "Documento no encontrado" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/documentos/[id] error:", error);
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
    const { nombre, descripcion, archivo_url, categoria, anio } = body;

    const existing = await d1First(
      "SELECT id FROM documentos WHERE id = ? AND activo = 1",
      [id]
    );

    if (!existing) {
      return NextResponse.json({ error: "Documento no encontrado" }, { status: 404 });
    }

    await d1Query(
      `UPDATE documentos
       SET nombre = ?, descripcion = ?, archivo_url = ?, categoria = ?, anio = ?, actualizado_en = datetime('now')
       WHERE id = ?`,
      [nombre ?? null, descripcion ?? null, archivo_url ?? null, categoria ?? null, anio ?? null, id]
    );

    return NextResponse.json({ message: "Documento actualizado exitosamente" });
  } catch (error) {
    console.error("PUT /api/documentos/[id] error:", error);
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
      "SELECT id FROM documentos WHERE id = ? AND activo = 1",
      [id]
    );

    if (!existing) {
      return NextResponse.json({ error: "Documento no encontrado" }, { status: 404 });
    }

    await d1Query(
      "UPDATE documentos SET activo = 0, actualizado_en = datetime('now') WHERE id = ?",
      [id]
    );

    return NextResponse.json({ message: "Documento eliminado exitosamente" });
  } catch (error) {
    console.error("DELETE /api/documentos/[id] error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
