import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { env } = await getCloudflareContext();
    const db = env.DB;

    const result = await db
      .prepare("SELECT * FROM noticias WHERE id = ? AND activo = 1")
      .bind(id)
      .first();

    if (!result) {
      return NextResponse.json(
        { error: "Noticia no encontrada" },
        { status: 404 }
      );
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
    const { env } = await getCloudflareContext();
    const db = env.DB;

    const body = await request.json();
    const { titulo, descripcion, contenido, imagen_url, tipo, fecha_evento } =
      body;

    const existing = await db
      .prepare("SELECT id FROM noticias WHERE id = ? AND activo = 1")
      .bind(id)
      .first();

    if (!existing) {
      return NextResponse.json(
        { error: "Noticia no encontrada" },
        { status: 404 }
      );
    }

    await db
      .prepare(
        `UPDATE noticias
         SET titulo = ?, descripcion = ?, contenido = ?, imagen_url = ?, tipo = ?, fecha_evento = ?, actualizado_en = datetime('now')
         WHERE id = ?`
      )
      .bind(
        titulo ?? null,
        descripcion ?? null,
        contenido ?? null,
        imagen_url ?? null,
        tipo ?? null,
        fecha_evento ?? null,
        id
      )
      .run();

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
    const { env } = await getCloudflareContext();
    const db = env.DB;

    const existing = await db
      .prepare("SELECT id FROM noticias WHERE id = ? AND activo = 1")
      .bind(id)
      .first();

    if (!existing) {
      return NextResponse.json(
        { error: "Noticia no encontrada" },
        { status: 404 }
      );
    }

    await db
      .prepare(
        "UPDATE noticias SET activo = 0, actualizado_en = datetime('now') WHERE id = ?"
      )
      .bind(id)
      .run();

    return NextResponse.json({ message: "Noticia eliminada exitosamente" });
  } catch (error) {
    console.error("DELETE /api/noticias/[id] error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
