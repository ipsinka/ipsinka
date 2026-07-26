import { NextRequest, NextResponse } from "next/server";
import { d1Query, d1First } from "@/lib/cloudflare";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const sede = url.searchParams.get("sede");

    const tipo = url.searchParams.get("tipo");

    let query = "SELECT * FROM noticias WHERE activo = 1";
    const bindings: (string | number)[] = [];

    if (tipo) {
      query += " AND tipo = ?";
      bindings.push(tipo);
    }

    if (sede) {
      query += " AND (sede_id = ? OR sede_id IS NULL)";
      bindings.push(Number(sede));
    }

    query += " ORDER BY creado_en DESC";

    const result = await d1Query(query, bindings);
    return NextResponse.json(result.results);
  } catch (error) {
    console.error("GET /api/noticias error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { titulo, descripcion, contenido, imagen_url, tipo, fecha_evento, sede_id } = body;

    if (!titulo) {
      return NextResponse.json(
        { error: "El campo 'titulo' es requerido" },
        { status: 400 }
      );
    }

    const result = await d1Query(
      `INSERT INTO noticias (titulo, descripcion, contenido, imagen_url, tipo, fecha_evento, sede_id, activo, creado_en, actualizado_en)
       VALUES (?, ?, ?, ?, ?, ?, ?, 1, datetime('now'), datetime('now'))`,
      [titulo, descripcion ?? null, contenido ?? null, imagen_url ?? null, tipo ?? null, fecha_evento ?? null, sede_id ?? null]
    );

    return NextResponse.json(
      { id: result.meta.last_row_id, message: "Noticia creada exitosamente" },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/noticias error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
