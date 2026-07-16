import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(request: NextRequest) {
  try {
    const { env } = await getCloudflareContext();
    const db = env.DB;

    const result = await db
      .prepare(
        "SELECT * FROM servicios WHERE activo = 1 ORDER BY orden ASC"
      )
      .all();

    return NextResponse.json(result.results);
  } catch (error) {
    console.error("GET /api/servicios error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { env } = await getCloudflareContext();
    const db = env.DB;

    const body = await request.json();
    const { nombre, descripcion, imagen_url, icono, orden } = body;

    if (!nombre) {
      return NextResponse.json(
        { error: "El campo 'nombre' es requerido" },
        { status: 400 }
      );
    }

    const result = await db
      .prepare(
        `INSERT INTO servicios (nombre, descripcion, imagen_url, icono, orden, activo, creado_en, actualizado_en)
         VALUES (?, ?, ?, ?, ?, 1, datetime('now'), datetime('now'))`
      )
      .bind(
        nombre,
        descripcion ?? null,
        imagen_url ?? null,
        icono ?? null,
        orden ?? 0
      )
      .run();

    return NextResponse.json(
      {
        id: result.meta.last_row_id,
        message: "Servicio creado exitosamente",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/servicios error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
