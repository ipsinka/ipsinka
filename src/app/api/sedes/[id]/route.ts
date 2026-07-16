import { NextRequest, NextResponse } from "next/server";
import { d1Query, d1First } from "@/lib/cloudflare";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await d1First(
      "SELECT * FROM sedes WHERE id = ? AND activo = 1",
      [id]
    );

    if (!result) {
      return NextResponse.json({ error: "Sede no encontrada" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/sedes/[id] error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { nombre, direccion, municipio, departamento, telefono, email, horario, latitud, longitud, imagen_url } = body;

    const existing = await d1First(
      "SELECT id FROM sedes WHERE id = ? AND activo = 1",
      [id]
    );

    if (!existing) {
      return NextResponse.json({ error: "Sede no encontrada" }, { status: 404 });
    }

    await d1Query(
      `UPDATE sedes
       SET nombre = ?, direccion = ?, municipio = ?, departamento = ?, telefono = ?, email = ?, horario = ?, latitud = ?, longitud = ?, imagen_url = ?, actualizado_en = datetime('now')
       WHERE id = ?`,
      [nombre ?? null, direccion ?? null, municipio ?? null, departamento ?? null, telefono ?? null, email ?? null, horario ?? null, latitud ?? null, longitud ?? null, imagen_url ?? null, id]
    );

    return NextResponse.json({ message: "Sede actualizada exitosamente" });
  } catch (error) {
    console.error("PUT /api/sedes/[id] error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await d1First(
      "SELECT id FROM sedes WHERE id = ? AND activo = 1",
      [id]
    );

    if (!existing) {
      return NextResponse.json({ error: "Sede no encontrada" }, { status: 404 });
    }

    await d1Query(
      "UPDATE sedes SET activo = 0, actualizado_en = datetime('now') WHERE id = ?",
      [id]
    );

    return NextResponse.json({ message: "Sede eliminada exitosamente" });
  } catch (error) {
    console.error("DELETE /api/sedes/[id] error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
