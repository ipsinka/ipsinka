import { NextResponse } from "next/server";

const BASE = "https://pub-49f5ca8cdb65405f8a86e9257bee4c7f.r2.dev/documents";

export async function GET(request) {
  const ruta = request.nextUrl.searchParams.get("ruta");

  if (!ruta) {
    return NextResponse.json({ error: "Falta el parámetro ruta" }, { status: 400 });
  }

  // Solo permitir URLs del bucket R2 autorizado
  const url = `${BASE}/${ruta}`;
  if (!url.startsWith(BASE)) {
    return NextResponse.json({ error: "URL no permitida" }, { status: 403 });
  }

  const res = await fetch(url);
  if (!res.ok) {
    return NextResponse.json({ error: "No se pudo obtener el archivo" }, { status: 502 });
  }

  const buffer = await res.arrayBuffer();
  const filename = ruta.split("/").pop();

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${decodeURIComponent(filename)}"`,
    },
  });
}
