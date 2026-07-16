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
      .prepare("SELECT * FROM directorio WHERE id = ? AND activo = 1")
      .bind(id)
      .first();

    if (!result) {
      return NextResponse.json(
        { error: "Entrada de directorio no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/directorio/[id] error:", error);
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
    const { nombre, cargo, area, telefono, email, foto_url, orden } = body;

    const existing = await db
      .prepare("SELECT id FROM directorio WHERE id = ? AND activo = 1")
      .bind(id)
      .first();

    if (!existing) {
      return NextResponse.json(
        { error: "Entrada de directorio no encontrada" },
        { status: 404 }
      );
    }

    await db
      .prepare(
        `UPDATE directorio
         SET nombre = ?, cargo = ?, area = ?, telefono = ?, email = ?, foto_url = ?, orden = ?, actualizado_en = datetime('now')
         WHERE id = ?`
      )
      .bind(
        nombre ?? null,
        cargo ?? null,
        area ?? null,
        telefono ?? null,
        email ?? null,
        foto_url ?? null,
        orden ?? null,
        id
      )
      .run();

    return NextResponse.json({
      message: "Entrada de directorio actualizada exitosamente",
    });
  } catch (error) {
    console.error("PUT /api/directorio/[id] error:", error);
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
      .prepare("SELECT id FROM directorio WHERE id = ? AND activo = 1")
      .bind(id)
      .first();

    if (!existing) {
      return NextResponse.json(
        { error: "Entrada de directorio no encontrada" },
        { status: 404 }
      );
    }

    await db
      .prepare(
        "UPDATE directorio SET activo = 0, actualizado_en = datetime('now') WHERE id = ?"
      )
      .bind(id)
      .run();

    return NextResponse.json({
      message: "Entrada de directorio eliminada exitosamente",
    });
  } catch (error) {
    console.error("DELETE /api/directorio/[id] error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
