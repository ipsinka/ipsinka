/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { GET } from "@/app/api/descargar/route";

const BASE = "https://pub-49f5ca8cdb65405f8a86e9257bee4c7f.r2.dev/documents";
const pedir = (query) => GET(new NextRequest(`http://localhost/api/descargar${query}`));

beforeEach(() => {
  global.fetch = jest.fn();
});

it("exige el parámetro ruta", async () => {
  const res = await pedir("");
  expect(res.status).toBe(400);
  expect(fetch).not.toHaveBeenCalled();
});

it("descarga solo desde el bucket de documentos y fuerza la descarga como PDF", async () => {
  fetch.mockResolvedValue(new Response(new Uint8Array([37, 80, 68, 70]), { status: 200 }));

  const res = await pedir("?ruta=" + encodeURIComponent("2026/Informe%20de%20gesti%C3%B3n.pdf"));

  expect(fetch).toHaveBeenCalledWith(`${BASE}/2026/Informe%20de%20gesti%C3%B3n.pdf`);
  expect(res.status).toBe(200);
  expect(res.headers.get("content-type")).toBe("application/pdf");
  expect(res.headers.get("content-disposition")).toBe(
    'attachment; filename="Informe de gestión.pdf"'
  );
});

it("no permite salir del bucket con una URL absoluta en ruta", async () => {
  fetch.mockResolvedValue(new Response("x", { status: 200 }));
  await pedir("?ruta=" + encodeURIComponent("https://evil.example/x.pdf"));
  const destino = new URL(fetch.mock.calls[0][0]);
  expect(destino.host).toBe(new URL(BASE).host);
});

it("responde 502 si el bucket no tiene el archivo", async () => {
  fetch.mockResolvedValue(new Response("no", { status: 404 }));
  const res = await pedir("?ruta=no-existe.pdf");
  expect(res.status).toBe(502);
});
