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
      .prepare("SELECT * FROM eventos WHERE id = ? AND activo = 1")
      .bind(id)
      .first();

    if (!result) {
      return NextResponse.json(
        { error: "Evento no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/eventos/[id] error:", error);
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
    const { titulo, descripcion, lugar, fecha_inicio, fecha_fin, imagen_url } =
      body;

    const existing = await db
      .prepare("SELECT id FROM eventos WHERE id = ? AND activo = 1")
      .bind(id)
      .first();

    if (!existing) {
      return NextResponse.json(
        { error: "Evento no encontrado" },
        { status: 404 }
      );
    }

    await db
      .prepare(
        `UPDATE eventos
         SET titulo = ?, descripcion = ?, lugar = ?, fecha_inicio = ?, fecha_fin = ?, imagen_url = ?, actualizado_en = datetime('now')
         WHERE id = ?`
      )
      .bind(
        titulo ?? null,
        descripcion ?? null,
        lugar ?? null,
        fecha_inicio ?? null,
        fecha_fin ?? null,
        imagen_url ?? null,
        id
      )
      .run();

    return NextResponse.json({ message: "Evento actualizado exitosamente" });
  } catch (error) {
    console.error("PUT /api/eventos/[id] error:", error);
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
      .prepare("SELECT id FROM eventos WHERE id = ? AND activo = 1")
      .bind(id)
      .first();

    if (!existing) {
      return NextResponse.json(
        { error: "Evento no encontrado" },
        { status: 404 }
      );
    }

    await db
      .prepare(
        "UPDATE eventos SET activo = 0, actualizado_en = datetime('now') WHERE id = ?"
      )
      .bind(id)
      .run();

    return NextResponse.json({ message: "Evento eliminado exitosamente" });
  } catch (error) {
    console.error("DELETE /api/eventos/[id] error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
