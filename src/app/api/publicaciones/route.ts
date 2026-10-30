import { NextRequest, NextResponse } from "next/server";
import { d1Query } from "@/lib/cloudflare";
import { sanitizarHtml } from "@/lib/sanitizarHtml";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const estado = searchParams.get("estado");
    // Por defecto se ocultan las publicaciones archivadas (equivale a "eliminadas").
    // Con ?incluirArchivadas=1 se pueden listar todas.
    const incluirArchivadas = searchParams.get("incluirArchivadas") === "1";

    let query = "SELECT * FROM publicaciones";
    const params: string[] = [];
    if (estado) {
      query += " WHERE estado = ?";
      params.push(estado);
    } else if (!incluirArchivadas) {
      query += " WHERE estado != 'archivado'";
    }
    query += " ORDER BY creado_en DESC";

    const result = await d1Query<{ contenido?: string }>(query, params);
    // Se limpia también al leer, por si hay contenido guardado antes del filtro.
    return NextResponse.json(
      result.results.map((p) => ({ ...p, contenido: sanitizarHtml(p.contenido) }))
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { titulo, resumen, contenido, imagen_portada, slug, estado, autor } = body;

    if (!titulo || !contenido) {
      return NextResponse.json({ error: "titulo y contenido son requeridos" }, { status: 400 });
    }

    const slugFinal = slug || titulo.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    const result = await d1Query(
      "INSERT INTO publicaciones (titulo, resumen, contenido, imagen_portada, slug, estado, autor) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [titulo, resumen ?? null, sanitizarHtml(contenido), imagen_portada ?? null, slugFinal, estado ?? "borrador", autor ?? null]
    );

    return NextResponse.json({ id: result.meta.last_row_id }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
