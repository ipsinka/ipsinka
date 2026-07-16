import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(request: NextRequest) {
  try {
    const { env } = await getCloudflareContext();
    const db = env.DB;

    const result = await db
      .prepare(
        "SELECT * FROM directorio WHERE activo = 1 ORDER BY orden ASC"
      )
      .all();

    return NextResponse.json(result.results);
  } catch (error) {
    console.error("GET /api/directorio error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { env } = await getCloudflareContext();
    const db = env.DB;

    const body = await request.json();
    const { nombre, cargo, area, telefono, email, foto_url, orden } = body;

    if (!nombre) {
      return NextResponse.json(
        { error: "El campo 'nombre' es requerido" },
        { status: 400 }
      );
    }

    const result = await db
      .prepare(
        `INSERT INTO directorio (nombre, cargo, area, telefono, email, foto_url, orden, activo, creado_en, actualizado_en)
         VALUES (?, ?, ?, ?, ?, ?, ?, 1, datetime('now'), datetime('now'))`
      )
      .bind(
        nombre,
        cargo ?? null,
        area ?? null,
        telefono ?? null,
        email ?? null,
        foto_url ?? null,
        orden ?? 0
      )
      .run();

    return NextResponse.json(
      {
        id: result.meta.last_row_id,
        message: "Entrada de directorio creada exitosamente",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/directorio error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
