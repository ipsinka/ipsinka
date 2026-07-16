import { NextRequest, NextResponse } from "next/server";
import { d1Query, d1First } from "@/lib/cloudflare";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const result = await d1First("SELECT * FROM publicaciones WHERE id = ?", [id]);
    if (!result) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { titulo, resumen, contenido, imagen_portada, slug, estado, autor } = body;

    await d1Query(
      "UPDATE publicaciones SET titulo=?, resumen=?, contenido=?, imagen_portada=?, slug=?, estado=?, autor=?, actualizado_en=datetime('now') WHERE id=?",
      [titulo, resumen ?? null, contenido, imagen_portada ?? null, slug ?? null, estado ?? "borrador", autor ?? null, id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await d1Query("UPDATE publicaciones SET estado='archivado' WHERE id=?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
