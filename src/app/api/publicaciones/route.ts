import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(request: NextRequest) {
  try {
    const { env } = await getCloudflareContext();
    const db = env.DB;
    const { searchParams } = await Promise.resolve(new URL(request.url));
    const estado = searchParams.get("estado");

    let query = "SELECT * FROM publicaciones";
    const params: string[] = [];
    if (estado) {
      query += " WHERE estado = ?";
      params.push(estado);
    }
    query += " ORDER BY creado_en DESC";

    const result = await db.prepare(query).bind(...params).all();
    return NextResponse.json(result.results);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { env } = await getCloudflareContext();
    const db = env.DB;
    const body = await request.json();
    const { titulo, resumen, contenido, imagen_portada, slug, estado, autor } = body;

    if (!titulo || !contenido) {
      return NextResponse.json({ error: "titulo y contenido son requeridos" }, { status: 400 });
    }

    const slugFinal = slug || titulo.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    const result = await db.prepare(
      "INSERT INTO publicaciones (titulo, resumen, contenido, imagen_portada, slug, estado, autor) VALUES (?, ?, ?, ?, ?, ?, ?)"
    ).bind(titulo, resumen ?? null, contenido, imagen_portada ?? null, slugFinal, estado ?? "borrador", autor ?? null).run();

    return NextResponse.json({ id: result.meta.last_row_id }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
