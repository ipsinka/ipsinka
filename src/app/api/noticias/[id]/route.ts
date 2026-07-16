import { NextRequest, NextResponse } from "next/server";
import { d1Query, d1First } from "@/lib/cloudflare";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await d1First(
      "SELECT * FROM noticias WHERE id = ? AND activo = 1",
      [id]
    );

    if (!result) {
      return NextResponse.json({ error: "Noticia no encontrada" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/noticias/[id] error:", error);
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
    const { titulo, descripcion, contenido, imagen_url, tipo, fecha_evento } = body;

    const existing = await d1First(
      "SELECT id FROM noticias WHERE id = ? AND activo = 1",
      [id]
    );

    if (!existing) {
      return NextResponse.json({ error: "Noticia no encontrada" }, { status: 404 });
    }

    await d1Query(
      `UPDATE noticias
       SET titulo = ?, descripcion = ?, contenido = ?, imagen_url = ?, tipo = ?, fecha_evento = ?, actualizado_en = datetime('now')
       WHERE id = ?`,
      [titulo ?? null, descripcion ?? null, contenido ?? null, imagen_url ?? null, tipo ?? null, fecha_evento ?? null, id]
    );

    return NextResponse.json({ message: "Noticia actualizada exitosamente" });
  } catch (error) {
    console.error("PUT /api/noticias/[id] error:", error);
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
      "SELECT id FROM noticias WHERE id = ? AND activo = 1",
      [id]
    );

    if (!existing) {
      return NextResponse.json({ error: "Noticia no encontrada" }, { status: 404 });
    }

    await d1Query(
      "UPDATE noticias SET activo = 0, actualizado_en = datetime('now') WHERE id = ?",
      [id]
    );

    return NextResponse.json({ message: "Noticia eliminada exitosamente" });
  } catch (error) {
    console.error("DELETE /api/noticias/[id] error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
