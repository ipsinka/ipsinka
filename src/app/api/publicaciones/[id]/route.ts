import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { env } = await getCloudflareContext();
    const result = await env.DB.prepare("SELECT * FROM publicaciones WHERE id = ?").bind(id).first();
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
    const { env } = await getCloudflareContext();
    const body = await request.json();
    const { titulo, resumen, contenido, imagen_portada, slug, estado, autor } = body;

    await env.DB.prepare(
      "UPDATE publicaciones SET titulo=?, resumen=?, contenido=?, imagen_portada=?, slug=?, estado=?, autor=?, actualizado_en=datetime('now') WHERE id=?"
    ).bind(titulo, resumen ?? null, contenido, imagen_portada ?? null, slug ?? null, estado ?? "borrador", autor ?? null, id).run();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { env } = await getCloudflareContext();
    await env.DB.prepare("UPDATE publicaciones SET estado='archivado' WHERE id=?").bind(id).run();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
