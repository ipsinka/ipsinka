import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { env } = await getCloudflareContext();
    const db = env.DB;

    const result = await db
      .prepare("SELECT * FROM documentos WHERE id = ? AND activo = 1")
      .bind(id)
      .first();

    if (!result) {
      return NextResponse.json(
        { error: "Documento no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/documentos/[id] error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { env } = await getCloudflareContext();
    const db = env.DB;

    const body = await request.json();
    const { nombre, descripcion, archivo_url, categoria, anio } = body;

    const existing = await db
      .prepare("SELECT id FROM documentos WHERE id = ? AND activo = 1")
      .bind(id)
      .first();

    if (!existing) {
      return NextResponse.json(
        { error: "Documento no encontrado" },
        { status: 404 }
      );
    }

    await db
      .prepare(
        `UPDATE documentos
         SET nombre = ?, descripcion = ?, archivo_url = ?, categoria = ?, anio = ?, actualizado_en = datetime('now')
         WHERE id = ?`
      )
      .bind(
        nombre ?? null,
        descripcion ?? null,
        archivo_url ?? null,
        categoria ?? null,
        anio ?? null,
        id
      )
      .run();

    return NextResponse.json({ message: "Documento actualizado exitosamente" });
  } catch (error) {
    console.error("PUT /api/documentos/[id] error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { env } = await getCloudflareContext();
    const db = env.DB;

    const existing = await db
      .prepare("SELECT id FROM documentos WHERE id = ? AND activo = 1")
      .bind(id)
      .first();

    if (!existing) {
      return NextResponse.json(
        { error: "Documento no encontrado" },
        { status: 404 }
      );
    }

    await db
      .prepare(
        "UPDATE documentos SET activo = 0, actualizado_en = datetime('now') WHERE id = ?"
      )
      .bind(id)
      .run();

    return NextResponse.json({ message: "Documento eliminado exitosamente" });
  } catch (error) {
    console.error("DELETE /api/documentos/[id] error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
