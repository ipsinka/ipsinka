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
      .prepare("SELECT * FROM servicios WHERE id = ? AND activo = 1")
      .bind(id)
      .first();

    if (!result) {
      return NextResponse.json(
        { error: "Servicio no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/servicios/[id] error:", error);
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
    const { nombre, descripcion, imagen_url, icono, orden } = body;

    const existing = await db
      .prepare("SELECT id FROM servicios WHERE id = ? AND activo = 1")
      .bind(id)
      .first();

    if (!existing) {
      return NextResponse.json(
        { error: "Servicio no encontrado" },
        { status: 404 }
      );
    }

    await db
      .prepare(
        `UPDATE servicios
         SET nombre = ?, descripcion = ?, imagen_url = ?, icono = ?, orden = ?, actualizado_en = datetime('now')
         WHERE id = ?`
      )
      .bind(
        nombre ?? null,
        descripcion ?? null,
        imagen_url ?? null,
        icono ?? null,
        orden ?? null,
        id
      )
      .run();

    return NextResponse.json({ message: "Servicio actualizado exitosamente" });
  } catch (error) {
    console.error("PUT /api/servicios/[id] error:", error);
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
      .prepare("SELECT id FROM servicios WHERE id = ? AND activo = 1")
      .bind(id)
      .first();

    if (!existing) {
      return NextResponse.json(
        { error: "Servicio no encontrado" },
        { status: 404 }
      );
    }

    await db
      .prepare(
        "UPDATE servicios SET activo = 0, actualizado_en = datetime('now') WHERE id = ?"
      )
      .bind(id)
      .run();

    return NextResponse.json({ message: "Servicio eliminado exitosamente" });
  } catch (error) {
    console.error("DELETE /api/servicios/[id] error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
