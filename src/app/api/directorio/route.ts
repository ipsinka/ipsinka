import { NextRequest, NextResponse } from "next/server";
import { d1Query } from "@/lib/cloudflare";

export async function GET() {
  try {
    const result = await d1Query(
      "SELECT * FROM directorio WHERE activo = 1 ORDER BY orden ASC"
    );
    return NextResponse.json(result.results);
  } catch (error) {
    console.error("GET /api/directorio error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, cargo, area, telefono, email, foto_url, orden } = body;

    if (!nombre) {
      return NextResponse.json(
        { error: "El campo 'nombre' es requerido" },
        { status: 400 }
      );
    }

    const result = await d1Query(
      `INSERT INTO directorio (nombre, cargo, area, telefono, email, foto_url, orden, activo, creado_en, actualizado_en)
       VALUES (?, ?, ?, ?, ?, ?, ?, 1, datetime('now'), datetime('now'))`,
      [nombre, cargo ?? null, area ?? null, telefono ?? null, email ?? null, foto_url ?? null, orden ?? 0]
    );

    return NextResponse.json(
      { id: result.meta.last_row_id, message: "Entrada de directorio creada exitosamente" },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/directorio error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
