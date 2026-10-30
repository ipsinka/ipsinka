/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import nextConfig from "../../../../next.config.mjs";
import { POST as reportarCsp } from "@/app/api/csp-report/route";
import { requiereAdmin } from "@/lib/adminAuth";

type Cabecera = { key: string; value: string };

async function cabeceras(): Promise<Record<string, string>> {
  const reglas = await nextConfig.headers();
  const todas = reglas.find((r: { source: string }) => r.source === "/:path*");
  if (!todas) throw new Error("Falta la regla de cabeceras para /:path*");
  return Object.fromEntries(todas.headers.map((h: Cabecera) => [h.key, h.value]));
}

describe("cabeceras de seguridad", () => {
  it("se aplican a todas las rutas", async () => {
    const h = await cabeceras();
    expect(h["X-Content-Type-Options"]).toBe("nosniff");
    expect(h["X-Frame-Options"]).toBe("SAMEORIGIN");
    expect(h["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
    expect(h["Permissions-Policy"]).toMatch(/camera=\(\).*geolocation=\(\)/);
  });

  it("la CSP está en modo solo reporte y reporta a /api/csp-report", async () => {
    const h = await cabeceras();
    expect(h["Content-Security-Policy"]).toBeUndefined();
    const csp = h["Content-Security-Policy-Report-Only"];
    expect(csp).toContain("report-uri /api/csp-report");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("frame-ancestors 'self'");
  });

  it("la CSP permite lo que el sitio carga: Clerk, Google Maps, YouTube y PDFs de R2", async () => {
    const csp = (await cabeceras())["Content-Security-Policy-Report-Only"];
    const directiva = (nombre: string) =>
      csp.split("; ").find((d) => d.startsWith(nombre + " ")) ?? "";
    expect(directiva("script-src")).toContain("https://clerk.ipsinka.com");
    expect(directiva("connect-src")).toContain("https://clerk.ipsinka.com");
    expect(directiva("frame-src")).toContain("https://www.google.com");
    expect(directiva("frame-src")).toContain("https://www.youtube.com");
    expect(directiva("frame-src")).toContain("https://pub-1180f62273e4461daa58e3267d5d7b32.r2.dev");
  });
});

describe("dominios de imágenes", () => {
  const hosts = () => nextConfig.images.remotePatterns.map((p: { hostname: string }) => p.hostname);

  it("incluye los buckets que usan la base de datos y el código", () => {
    expect(hosts()).toEqual(
      expect.arrayContaining([
        "pub-c0883d14d3e84a69bf84546fa108aa0b.r2.dev",
        "pub-1180f62273e4461daa58e3267d5d7b32.r2.dev",
        "ghx22gzm9l6t5pgk.public.blob.vercel-storage.com",
        "0dwas2ied3dcs14f.public.blob.vercel-storage.com",
      ])
    );
  });

  it("solo usa HTTPS y no acepta comodines", () => {
    for (const p of nextConfig.images.remotePatterns) {
      expect(p.protocol).toBe("https");
      expect(p.hostname).not.toContain("*");
    }
  });
});

describe("POST /api/csp-report", () => {
  const enviar = (cuerpo: string) =>
    reportarCsp(new NextRequest("http://localhost/api/csp-report", { method: "POST", body: cuerpo }));

  beforeEach(() => jest.spyOn(console, "warn").mockImplementation(() => {}));
  afterEach(() => jest.restoreAllMocks());

  it("no requiere sesión de administrador", () => {
    expect(requiereAdmin("POST", new URL("https://www.ipsinka.com/api/csp-report"))).toBe(false);
  });

  it("registra un resumen del reporte clásico (report-uri)", async () => {
    const res = await enviar(
      JSON.stringify({
        "csp-report": {
          "document-uri": "https://www.ipsinka.com/",
          "effective-directive": "script-src",
          "blocked-uri": "https://otro.example/x.js",
        },
      })
    );
    expect(res.status).toBe(204);
    expect(console.warn).toHaveBeenCalledWith(
      "CSP",
      JSON.stringify({
        directiva: "script-src",
        bloqueado: "https://otro.example/x.js",
        pagina: "https://www.ipsinka.com/",
      })
    );
  });

  it("acepta el formato de Reporting API (lista con body)", async () => {
    await enviar(JSON.stringify([{ body: { effectiveDirective: "img-src", blockedURL: "https://x/y.png" } }]));
    expect(console.warn).toHaveBeenCalledWith("CSP", expect.stringContaining("img-src"));
  });

  it("ignora reportes mal formados y rechaza cuerpos enormes", async () => {
    expect((await enviar("no es json")).status).toBe(204);
    expect((await enviar("x".repeat(20_000))).status).toBe(413);
    expect(console.warn).not.toHaveBeenCalled();
  });
});
