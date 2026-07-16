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
      .prepare("SELECT * FROM informes WHERE id = ? AND activo = 1")
      .bind(id)
      .first();

    if (!result) {
      return NextResponse.json(
        { error: "Informe no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/informes/[id] error:", error);
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
    const { titulo, descripcion, archivo_url, area, mes, anio } = body;

    const existing = await db
      .prepare("SELECT id FROM informes WHERE id = ? AND activo = 1")
      .bind(id)
      .first();

    if (!existing) {
      return NextResponse.json(
        { error: "Informe no encontrado" },
        { status: 404 }
      );
    }

    if (mes != null && (Number(mes) < 1 || Number(mes) > 12)) {
      return NextResponse.json(
        { error: "El mes debe estar entre 1 y 12" },
        { status: 400 }
      );
    }

    await db
      .prepare(
        `UPDATE informes
         SET titulo = ?, descripcion = ?, archivo_url = ?, area = ?, mes = ?, anio = ?, actualizado_en = datetime('now')
         WHERE id = ?`
      )
      .bind(
        titulo ?? null,
        descripcion ?? null,
        archivo_url ?? null,
        area ?? null,
        mes != null ? Number(mes) : null,
        anio != null ? Number(anio) : null,
        id
      )
      .run();

    return NextResponse.json({ message: "Informe actualizado exitosamente" });
  } catch (error) {
    console.error("PUT /api/informes/[id] error:", error);
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
      .prepare("SELECT id FROM informes WHERE id = ? AND activo = 1")
      .bind(id)
      .first();

    if (!existing) {
      return NextResponse.json(
        { error: "Informe no encontrado" },
        { status: 404 }
      );
    }

    await db
      .prepare(
        "UPDATE informes SET activo = 0, actualizado_en = datetime('now') WHERE id = ?"
      )
      .bind(id)
      .run();

    return NextResponse.json({ message: "Informe eliminado exitosamente" });
  } catch (error) {
    console.error("DELETE /api/informes/[id] error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
