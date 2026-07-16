import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(request: NextRequest) {
  try {
    const { env } = await getCloudflareContext();
    const db = env.DB;

    const url = new URL(request.url);
    const area = url.searchParams.get("area");
    const anio = url.searchParams.get("anio");
    const mes = url.searchParams.get("mes");

    let query = "SELECT * FROM informes WHERE activo = 1";
    const bindings: (string | number)[] = [];

    if (area) {
      query += " AND area = ?";
      bindings.push(area);
    }
    if (anio) {
      query += " AND anio = ?";
      bindings.push(Number(anio));
    }
    if (mes) {
      query += " AND mes = ?";
      bindings.push(Number(mes));
    }

    query += " ORDER BY anio DESC, mes DESC, creado_en DESC";

    const stmt = db.prepare(query);
    const result = await stmt.bind(...bindings).all();

    return NextResponse.json(result.results);
  } catch (error) {
    console.error("GET /api/informes error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { env } = await getCloudflareContext();
    const db = env.DB;

    const body = await request.json();
    const { titulo, descripcion, archivo_url, area, mes, anio } = body;

    if (!titulo || !archivo_url || !mes || !anio) {
      return NextResponse.json(
        {
          error:
            "Los campos 'titulo', 'archivo_url', 'mes' y 'anio' son requeridos",
        },
        { status: 400 }
      );
    }

    if (Number(mes) < 1 || Number(mes) > 12) {
      return NextResponse.json(
        { error: "El mes debe estar entre 1 y 12" },
        { status: 400 }
      );
    }

    const result = await db
      .prepare(
        `INSERT INTO informes (titulo, descripcion, archivo_url, area, mes, anio, activo, creado_en, actualizado_en)
         VALUES (?, ?, ?, ?, ?, ?, 1, datetime('now'), datetime('now'))`
      )
      .bind(
        titulo,
        descripcion ?? null,
        archivo_url,
        area ?? null,
        Number(mes),
        Number(anio)
      )
      .run();

    return NextResponse.json(
      {
        id: result.meta.last_row_id,
        message: "Informe creado exitosamente",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/informes error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
