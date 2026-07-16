import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(request: NextRequest) {
  try {
    const { env } = await getCloudflareContext();
    const db = env.DB;

    const result = await db
      .prepare(
        "SELECT * FROM galeria WHERE activo = 1 ORDER BY creado_en DESC"
      )
      .all();

    return NextResponse.json(result.results);
  } catch (error) {
    console.error("GET /api/galeria error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { env } = await getCloudflareContext();
    const db = env.DB;

    const body = await request.json();
    const { titulo, descripcion, imagen_url, categoria } = body;

    if (!titulo || !imagen_url) {
      return NextResponse.json(
        { error: "Los campos 'titulo' e 'imagen_url' son requeridos" },
        { status: 400 }
      );
    }

    const result = await db
      .prepare(
        `INSERT INTO galeria (titulo, descripcion, imagen_url, categoria, activo, creado_en, actualizado_en)
         VALUES (?, ?, ?, ?, 1, datetime('now'), datetime('now'))`
      )
      .bind(titulo, descripcion ?? null, imagen_url, categoria ?? null)
      .run();

    return NextResponse.json(
      {
        id: result.meta.last_row_id,
        message: "Imagen de galería creada exitosamente",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/galeria error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
