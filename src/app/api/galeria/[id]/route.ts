import { NextRequest, NextResponse } from "next/server";
import { d1Query, d1First } from "@/lib/cloudflare";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await d1First(
      "SELECT * FROM galeria WHERE id = ? AND activo = 1",
      [id]
    );

    if (!result) {
      return NextResponse.json({ error: "Imagen no encontrada" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/galeria/[id] error:", error);
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
    const { titulo, descripcion, imagen_url, categoria } = body;

    const existing = await d1First(
      "SELECT id FROM galeria WHERE id = ? AND activo = 1",
      [id]
    );

    if (!existing) {
      return NextResponse.json({ error: "Imagen no encontrada" }, { status: 404 });
    }

    await d1Query(
      `UPDATE galeria
       SET titulo = ?, descripcion = ?, imagen_url = ?, categoria = ?, actualizado_en = datetime('now')
       WHERE id = ?`,
      [titulo ?? null, descripcion ?? null, imagen_url ?? null, categoria ?? null, id]
    );

    return NextResponse.json({ message: "Imagen actualizada exitosamente" });
  } catch (error) {
    console.error("PUT /api/galeria/[id] error:", error);
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
      "SELECT id FROM galeria WHERE id = ? AND activo = 1",
      [id]
    );

    if (!existing) {
      return NextResponse.json({ error: "Imagen no encontrada" }, { status: 404 });
    }

    await d1Query(
      "UPDATE galeria SET activo = 0, actualizado_en = datetime('now') WHERE id = ?",
      [id]
    );

    return NextResponse.json({ message: "Imagen eliminada exitosamente" });
  } catch (error) {
    console.error("DELETE /api/galeria/[id] error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
