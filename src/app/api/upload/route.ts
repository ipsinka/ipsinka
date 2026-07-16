import { NextRequest, NextResponse } from "next/server";
import { r2Put } from "@/lib/cloudflare";

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

    const nombreOriginal = file.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "");
    const key = `${carpeta}/${Date.now()}-${nombreOriginal}`;

    const arrayBuffer = await file.arrayBuffer();
    const url = await r2Put(key, arrayBuffer, file.type || "application/octet-stream");

    return NextResponse.json({ url, key }, { status: 201 });
  } catch (error) {
    console.error("POST /api/upload error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
