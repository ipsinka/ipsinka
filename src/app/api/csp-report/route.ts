import { NextRequest, NextResponse } from "next/server";

// Recibe los reportes de la Content-Security-Policy (en modo solo reporte) y
// los deja en los logs de Vercel, para saber qué se bloquearía al activarla.
// Lo llama el navegador de cualquier visitante, así que no requiere sesión.

const TAMANO_MAXIMO = 10_000;

type ReporteCsp = Record<string, unknown>;

function resumir(reporte: ReporteCsp) {
  const r = (reporte["csp-report"] ?? reporte.body ?? reporte) as ReporteCsp;
  const campo = (...claves: string[]) => {
    for (const c of claves) if (typeof r[c] === "string") return (r[c] as string).slice(0, 300);
    return undefined;
  };
  return {
    directiva: campo("effective-directive", "effectiveDirective", "violated-directive"),
    bloqueado: campo("blocked-uri", "blockedURL"),
    pagina: campo("document-uri", "documentURL"),
  };
}

export async function POST(request: NextRequest) {
  try {
    const texto = await request.text();
    if (texto.length > TAMANO_MAXIMO) return new NextResponse(null, { status: 413 });

    const datos = JSON.parse(texto) as ReporteCsp | ReporteCsp[];
    const reportes = (Array.isArray(datos) ? datos : [datos]).slice(0, 10);
    for (const reporte of reportes) console.warn("CSP", JSON.stringify(resumir(reporte)));
  } catch {
    // Un reporte mal formado no es un error del sitio.
  }
  return new NextResponse(null, { status: 204 });
}
