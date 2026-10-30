/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { d1Query, d1First } from "@/lib/cloudflare";
import { POST as crear } from "@/app/api/directorio/route";
import { PUT as actualizar, DELETE as eliminar } from "@/app/api/directorio/[id]/route";

jest.mock("@/lib/cloudflare", () => ({
  d1Query: jest.fn(),
  d1First: jest.fn(),
}));

const mockQuery = d1Query as jest.Mock;
const mockFirst = d1First as jest.Mock;
const params = (id: string) => ({ params: Promise.resolve({ id }) });

beforeEach(() => {
  jest.resetAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
  mockFirst.mockResolvedValue({ id: 1 });
  mockQuery.mockResolvedValue({ results: [], meta: { last_row_id: 1, changes: 1 } });
});

// Igual que `sedes`, la tabla `directorio` en D1 no tiene `actualizado_en`.
const sql = () => mockQuery.mock.calls.map(([s]) => s as string).join(" ");

it("POST exige el nombre", async () => {
  const res = await crear(
    new NextRequest("http://localhost/api/directorio", {
      method: "POST",
      body: JSON.stringify({ cargo: "Gerente" }),
    })
  );
  expect(res.status).toBe(400);
  expect(mockQuery).not.toHaveBeenCalled();
});

it("POST, PUT y DELETE no escriben actualizado_en", async () => {
  const body = JSON.stringify({ nombre: "Persona", email: "contacto@ipsinka.com" });
  await crear(new NextRequest("http://localhost/api/directorio", { method: "POST", body }));
  await actualizar(
    new NextRequest("http://localhost/api/directorio/1", { method: "PUT", body }),
    params("1")
  );
  await eliminar(new NextRequest("http://localhost/api/directorio/1"), params("1"));

  expect(mockQuery).toHaveBeenCalledTimes(3);
  expect(sql()).not.toMatch(/actualizado_en/);
});
