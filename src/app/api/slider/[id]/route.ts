import { NextRequest, NextResponse } from "next/server";
import { d1Query, d1First } from "@/lib/cloudflare";

// Normaliza el campo `botones` a un JSON string válido (array).
function normalizarBotones(botones: unknown): string {
  if (Array.isArray(botones)) return JSON.stringify(botones);
  if (typeof botones === "string" && botones.trim()) return botones;
  return "[]";
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await d1First(
      "SELECT * FROM slider WHERE id = ? AND activo = 1",
      [id]
    );

    if (!result) {
      return NextResponse.json({ error: "Slide no encontrado" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/slider/[id] error:", error);
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
    const {
      titulo,
      subtitulo,
      descripcion,
      imagen_url,
      bg_color,
      icono,
      icono_label,
      botones,
      orden,
    } = body;

    const existing = await d1First(
      "SELECT id FROM slider WHERE id = ? AND activo = 1",
      [id]
    );

    if (!existing) {
      return NextResponse.json({ error: "Slide no encontrado" }, { status: 404 });
    }

    await d1Query(
      `UPDATE slider
       SET titulo = ?, subtitulo = ?, descripcion = ?, imagen_url = ?, bg_color = ?,
           icono = ?, icono_label = ?, botones = ?, orden = ?, actualizado_en = datetime('now')
       WHERE id = ?`,
      [
        titulo ?? null,
        subtitulo ?? null,
        descripcion ?? null,
        imagen_url ?? null,
        bg_color ?? null,
        icono ?? null,
        icono_label ?? null,
        normalizarBotones(botones),
        Number.isFinite(orden) ? orden : 0,
        id,
      ]
    );

    return NextResponse.json({ message: "Slide actualizado exitosamente" });
  } catch (error) {
    console.error("PUT /api/slider/[id] error:", error);
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
      "SELECT id FROM slider WHERE id = ? AND activo = 1",
      [id]
    );

    if (!existing) {
      return NextResponse.json({ error: "Slide no encontrado" }, { status: 404 });
    }

    await d1Query(
      "UPDATE slider SET activo = 0, actualizado_en = datetime('now') WHERE id = ?",
      [id]
    );

    return NextResponse.json({ message: "Slide eliminado exitosamente" });
  } catch (error) {
    console.error("DELETE /api/slider/[id] error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
