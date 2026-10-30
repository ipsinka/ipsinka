/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { d1Query, d1First } from "@/lib/cloudflare";
import { GET as listar, POST as crear } from "@/app/api/publicaciones/route";
import { GET as detalle, PUT as actualizar } from "@/app/api/publicaciones/[id]/route";

jest.mock("@/lib/cloudflare", () => ({
  d1Query: jest.fn(),
  d1First: jest.fn(),
}));

const mockQuery = d1Query as jest.Mock;
const mockFirst = d1First as jest.Mock;
const params = (id: string) => ({ params: Promise.resolve({ id }) });
const malicioso = '<p>Hola</p><img src="x" onerror="alert(1)"><script>robar()</script>';

beforeEach(() => {
  jest.resetAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
  mockQuery.mockResolvedValue({ results: [], meta: { last_row_id: 1 } });
});

it("POST guarda el contenido ya limpio", async () => {
  await crear(
    new NextRequest("http://localhost/api/publicaciones", {
      method: "POST",
      body: JSON.stringify({ titulo: "Aviso", contenido: malicioso }),
    })
  );
  const guardado = mockQuery.mock.calls[0][1][2];
  expect(guardado).toContain("<p>Hola</p>");
  expect(guardado).not.toMatch(/onerror|script|robar/);
});

it("PUT guarda el contenido ya limpio", async () => {
  await actualizar(
    new NextRequest("http://localhost/api/publicaciones/1", {
      method: "PUT",
      body: JSON.stringify({ titulo: "Aviso", contenido: malicioso }),
    }),
    params("1")
  );
  expect(mockQuery.mock.calls[0][1][2]).not.toMatch(/onerror|script|robar/);
});

it("GET limpia también el contenido guardado antes del filtro", async () => {
  mockQuery.mockResolvedValue({ results: [{ id: 1, titulo: "Viejo", contenido: malicioso }] });
  const res = await listar(new NextRequest("http://localhost/api/publicaciones?estado=publicado"));
  const [pub] = await res.json();
  expect(pub.titulo).toBe("Viejo");
  expect(pub.contenido).toContain("<p>Hola</p>");
  expect(pub.contenido).not.toMatch(/onerror|script|robar/);
});

it("GET por id limpia el contenido", async () => {
  mockFirst.mockResolvedValue({ id: 1, contenido: malicioso });
  const res = await detalle(new NextRequest("http://localhost/api/publicaciones/1"), params("1"));
  expect((await res.json()).contenido).not.toMatch(/onerror|script/);
});
