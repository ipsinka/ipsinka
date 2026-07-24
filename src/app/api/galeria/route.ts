import { NextRequest, NextResponse } from "next/server";
import { d1Query } from "@/lib/cloudflare";

export async function GET() {
  try {
    const data = await d1Query(
      "SELECT * FROM galeria WHERE activo = 1 ORDER BY creado_en DESC"
    );
    return NextResponse.json(data.results);
  } catch (error) {
    console.error("GET /api/galeria error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { titulo, descripcion, imagen_url, categoria, tipo, seccion } = body;

    if (!titulo || !imagen_url) {
      return NextResponse.json(
        { error: "Los campos 'titulo' e 'imagen_url' son requeridos" },
        { status: 400 }
      );
    }

    const data = await d1Query(
      `INSERT INTO galeria (titulo, descripcion, imagen_url, categoria, tipo, seccion, activo, creado_en, actualizado_en)
       VALUES (?, ?, ?, ?, ?, ?, 1, datetime('now'), datetime('now'))`,
      [titulo, descripcion ?? null, imagen_url, categoria ?? null, tipo ?? "imagen", seccion ?? null]
    );

    return NextResponse.json(
      { id: data.meta.last_row_id, message: "Elemento de galería creado exitosamente" },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/galeria error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
