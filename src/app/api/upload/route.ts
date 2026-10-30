import { NextRequest, NextResponse } from "next/server";
import { r2Put } from "@/lib/cloudflare";

// Tipos que usa el panel. SVG y HTML quedan fuera porque pueden llevar scripts.
const TIPOS_PERMITIDOS = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "video/mp4",
  "video/webm",
  "video/quicktime",
]);

// Primer nivel de carpeta permitido en el bucket (p. ej. "galeria/eventos").
const CARPETAS_PERMITIDAS = new Set([
  "general",
  "documentos",
  "eventos",
  "galeria",
  "informes",
  "noticias",
  "publicaciones",
  "sedes",
  "slider",
]);

const TAMANO_MAXIMO = 50 * 1024 * 1024;

function carpetaValida(carpeta: string): boolean {
  const partes = carpeta.split("/");
  return (
    CARPETAS_PERMITIDAS.has(partes[0]) &&
    partes.length <= 3 &&
    partes.every((p) => /^[a-z0-9-]+$/.test(p))
  );
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const carpeta = (formData.get("carpeta") as string) || "general";

    if (!file) {
      return NextResponse.json(
        { error: "El campo 'file' es requerido" },
        { status: 400 }
      );
    }
    if (!TIPOS_PERMITIDOS.has(file.type)) {
      return NextResponse.json(
        { error: "Tipo de archivo no permitido. Sube una imagen, PDF, Word, Excel o video." },
        { status: 415 }
      );
    }
    if (file.size > TAMANO_MAXIMO) {
      return NextResponse.json(
        { error: "El archivo supera el tamaño máximo de 50 MB" },
        { status: 413 }
      );
    }
    if (!carpetaValida(carpeta)) {
      return NextResponse.json({ error: "Carpeta no permitida" }, { status: 400 });
    }

    const nombreOriginal = file.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "");
    const key = `${carpeta}/${Date.now()}-${nombreOriginal}`;

    const arrayBuffer = await file.arrayBuffer();
    const url = await r2Put(key, arrayBuffer, file.type);

    return NextResponse.json({ url, key }, { status: 201 });
  } catch (error) {
    console.error("POST /api/upload error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
