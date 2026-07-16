import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function POST(request: NextRequest) {
  try {
    const { env } = await getCloudflareContext();
    const storage = env.STORAGE;

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const carpeta = (formData.get("carpeta") as string) || "general";

    if (!file) {
      return NextResponse.json(
        { error: "El campo 'file' es requerido" },
        { status: 400 }
      );
    }

    // Sanitizar nombre original: quitar espacios y caracteres especiales
    const nombreOriginal = file.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "");
    const key = `${carpeta}/${Date.now()}-${nombreOriginal}`;

    const arrayBuffer = await file.arrayBuffer();

    await storage.put(key, arrayBuffer, {
      httpMetadata: {
        contentType: file.type || "application/octet-stream",
      },
    });

    // TODO: Configurar dominio público de R2 una vez habilitado en Cloudflare.
    // La URL pública sería: `https://pub-<accountId>.r2.dev/${key}`
    // o un dominio personalizado configurado en el bucket de R2.
    // Por ahora se devuelve solo la key para uso interno.
    const url = key;

    return NextResponse.json({ url, key }, { status: 201 });
  } catch (error) {
    console.error("POST /api/upload error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
