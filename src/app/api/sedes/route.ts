import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(request: NextRequest) {
  try {
    const { env } = await getCloudflareContext();
    const db = env.DB;

    const result = await db
      .prepare("SELECT * FROM sedes WHERE activo = 1 ORDER BY nombre ASC")
      .all();

    return NextResponse.json(result.results);
  } catch (error) {
    console.error("GET /api/sedes error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { env } = await getCloudflareContext();
    const db = env.DB;

    const body = await request.json();
    const {
      nombre,
      direccion,
      municipio,
      departamento,
      telefono,
      email,
      horario,
      latitud,
      longitud,
      imagen_url,
    } = body;

    if (!nombre || !direccion) {
      return NextResponse.json(
        { error: "Los campos 'nombre' y 'direccion' son requeridos" },
        { status: 400 }
      );
    }

    const result = await db
      .prepare(
        `INSERT INTO sedes (nombre, direccion, municipio, departamento, telefono, email, horario, latitud, longitud, imagen_url, activo, creado_en, actualizado_en)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, datetime('now'), datetime('now'))`
      )
      .bind(
        nombre,
        direccion,
        municipio ?? null,
        departamento ?? null,
        telefono ?? null,
        email ?? null,
        horario ?? null,
        latitud ?? null,
        longitud ?? null,
        imagen_url ?? null
      )
      .run();

    return NextResponse.json(
      {
        id: result.meta.last_row_id,
        message: "Sede creada exitosamente",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/sedes error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
