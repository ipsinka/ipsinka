import { NextRequest, NextResponse } from "next/server";
import { d1Query } from "@/lib/cloudflare";

// Normaliza el campo `botones` a un JSON string válido (array).
function normalizarBotones(botones: unknown): string {
  if (Array.isArray(botones)) return JSON.stringify(botones);
  if (typeof botones === "string" && botones.trim()) return botones;
  return "[]";
}

export async function GET() {
  try {
    const data = await d1Query(
      "SELECT * FROM slider WHERE activo = 1 ORDER BY orden ASC, id ASC"
    );
    return NextResponse.json(data.results);
  } catch (error) {
    console.error("GET /api/slider error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
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

    const data = await d1Query(
      `INSERT INTO slider
        (titulo, subtitulo, descripcion, imagen_url, bg_color, icono, icono_label, botones, orden, activo, creado_en, actualizado_en)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, datetime('now'), datetime('now'))`,
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
      ]
    );

    return NextResponse.json(
      { id: data.meta.last_row_id, message: "Slide creado exitosamente" },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/slider error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
