import { NextRequest, NextResponse } from "next/server";
import { d1Query } from "@/lib/cloudflare";

export async function GET() {
  try {
    const result = await d1Query(
      "SELECT * FROM servicios WHERE activo = 1 ORDER BY orden ASC"
    );
    return NextResponse.json(result.results);
  } catch (error) {
    console.error("GET /api/servicios error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, descripcion, imagen_url, icono, orden } = body;

    if (!nombre) {
      return NextResponse.json(
        { error: "El campo 'nombre' es requerido" },
        { status: 400 }
      );
    }

    const result = await d1Query(
      `INSERT INTO servicios (nombre, descripcion, imagen_url, icono, orden, activo, creado_en, actualizado_en)
       VALUES (?, ?, ?, ?, ?, 1, datetime('now'), datetime('now'))`,
      [nombre, descripcion ?? null, imagen_url ?? null, icono ?? null, orden ?? 0]
    );

    return NextResponse.json(
      { id: result.meta.last_row_id, message: "Servicio creado exitosamente" },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/servicios error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
