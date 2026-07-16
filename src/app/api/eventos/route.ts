import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(request: NextRequest) {
  try {
    const { env } = await getCloudflareContext();
    const db = env.DB;

    const url = new URL(request.url);
    const desde = url.searchParams.get("desde");
    const hasta = url.searchParams.get("hasta");

    let query = "SELECT * FROM eventos WHERE activo = 1";
    const bindings: string[] = [];

    if (desde) {
      query += " AND fecha_inicio >= ?";
      bindings.push(desde);
    }
    if (hasta) {
      query += " AND fecha_inicio <= ?";
      bindings.push(hasta);
    }

    query += " ORDER BY fecha_inicio ASC";

    const stmt = db.prepare(query);
    const result = await stmt.bind(...bindings).all();

    return NextResponse.json(result.results);
  } catch (error) {
    console.error("GET /api/eventos error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { env } = await getCloudflareContext();
    const db = env.DB;

    const body = await request.json();
    const { titulo, descripcion, lugar, fecha_inicio, fecha_fin, imagen_url } =
      body;

    if (!titulo || !fecha_inicio) {
      return NextResponse.json(
        { error: "Los campos 'titulo' y 'fecha_inicio' son requeridos" },
        { status: 400 }
      );
    }

    const result = await db
      .prepare(
        `INSERT INTO eventos (titulo, descripcion, lugar, fecha_inicio, fecha_fin, imagen_url, activo, creado_en, actualizado_en)
         VALUES (?, ?, ?, ?, ?, ?, 1, datetime('now'), datetime('now'))`
      )
      .bind(
        titulo,
        descripcion ?? null,
        lugar ?? null,
        fecha_inicio,
        fecha_fin ?? null,
        imagen_url ?? null
      )
      .run();

    return NextResponse.json(
      {
        id: result.meta.last_row_id,
        message: "Evento creado exitosamente",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/eventos error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
