import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(request: NextRequest) {
  try {
    const { env } = await getCloudflareContext();
    const db = env.DB;

    const result = await db
      .prepare(
        "SELECT * FROM noticias WHERE activo = 1 ORDER BY creado_en DESC"
      )
      .all();

    return NextResponse.json(result.results);
  } catch (error) {
    console.error("GET /api/noticias error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { env } = await getCloudflareContext();
    const db = env.DB;

    const body = await request.json();
    const { titulo, descripcion, contenido, imagen_url, tipo, fecha_evento } =
      body;

    if (!titulo) {
      return NextResponse.json(
        { error: "El campo 'titulo' es requerido" },
        { status: 400 }
      );
    }

    const result = await db
      .prepare(
        `INSERT INTO noticias (titulo, descripcion, contenido, imagen_url, tipo, fecha_evento, activo, creado_en, actualizado_en)
         VALUES (?, ?, ?, ?, ?, ?, 1, datetime('now'), datetime('now'))`
      )
      .bind(
        titulo,
        descripcion ?? null,
        contenido ?? null,
        imagen_url ?? null,
        tipo ?? null,
        fecha_evento ?? null
      )
      .run();

    return NextResponse.json(
      { id: result.meta.last_row_id, message: "Noticia creada exitosamente" },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/noticias error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
