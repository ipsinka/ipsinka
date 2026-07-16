import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Record<string, string>> }
) {
  try {
    const { env } = await getCloudflareContext();
    const db = env.DB;

    // searchParams se obtiene desde la URL de la request en Route Handlers
    const url = new URL(request.url);
    const categoria = url.searchParams.get("categoria");
    const anio = url.searchParams.get("anio");

    let query = "SELECT * FROM documentos WHERE activo = 1";
    const bindings: (string | number)[] = [];

    if (categoria) {
      query += " AND categoria = ?";
      bindings.push(categoria);
    }

    if (anio) {
      query += " AND anio = ?";
      bindings.push(Number(anio));
    }

    query += " ORDER BY creado_en DESC";

    const stmt = db.prepare(query);
    const result = await stmt.bind(...bindings).all();

    return NextResponse.json(result.results);
  } catch (error) {
    console.error("GET /api/documentos error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { env } = await getCloudflareContext();
    const db = env.DB;

    const body = await request.json();
    const { nombre, descripcion, archivo_url, categoria, anio } = body;

    if (!nombre || !archivo_url) {
      return NextResponse.json(
        { error: "Los campos 'nombre' y 'archivo_url' son requeridos" },
        { status: 400 }
      );
    }

    const result = await db
      .prepare(
        `INSERT INTO documentos (nombre, descripcion, archivo_url, categoria, anio, activo, creado_en, actualizado_en)
         VALUES (?, ?, ?, ?, ?, 1, datetime('now'), datetime('now'))`
      )
      .bind(
        nombre,
        descripcion ?? null,
        archivo_url,
        categoria ?? null,
        anio ?? null
      )
      .run();

    return NextResponse.json(
      {
        id: result.meta.last_row_id,
        message: "Documento creado exitosamente",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/documentos error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
