/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { d1Query, d1First } from "@/lib/cloudflare";
import { GET as listar, POST as crear } from "@/app/api/sedes/route";
import { PUT as actualizar, DELETE as eliminar } from "@/app/api/sedes/[id]/route";

jest.mock("@/lib/cloudflare", () => ({
  d1Query: jest.fn(),
  d1First: jest.fn(),
}));

const mockQuery = d1Query as jest.Mock;
const mockFirst = d1First as jest.Mock;
const params = (id: string) => ({ params: Promise.resolve({ id }) });
const json = (url: string, method: string, body: unknown) =>
  new NextRequest(url, { method, body: JSON.stringify(body) });

beforeEach(() => {
  jest.resetAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

// La tabla `sedes` en D1 no tiene la columna `actualizado_en`; escribirla
// hacía fallar con 500 el guardado desde /admin/sedes.
const sqlEjecutados = () => mockQuery.mock.calls.map(([sql]) => sql as string);

describe("GET /api/sedes", () => {
  it("devuelve las sedes activas", async () => {
    mockQuery.mockResolvedValue({ results: [{ id: 1, nombre: "Sibundoy" }] });
    const res = await listar();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual([{ id: 1, nombre: "Sibundoy" }]);
  });

  it("responde 500 si falla la base de datos", async () => {
    mockQuery.mockRejectedValue(new Error("D1 caído"));
    const res = await listar();
    expect(res.status).toBe(500);
  });
});

describe("POST /api/sedes", () => {
  it("crea la sede sin escribir actualizado_en", async () => {
    mockQuery.mockResolvedValue({ results: [], meta: { last_row_id: 7 } });
    const res = await crear(
      json("http://localhost/api/sedes", "POST", { nombre: "Nueva", direccion: "Calle 1" })
    );
    expect(res.status).toBeLessThan(300);
    expect(sqlEjecutados()[0]).toMatch(/INSERT INTO sedes/);
    expect(sqlEjecutados().join(" ")).not.toMatch(/actualizado_en/);
  });
});

describe("PUT /api/sedes/[id]", () => {
  it("actualiza el email y no usa actualizado_en", async () => {
    mockFirst.mockResolvedValue({ id: 2 });
    mockQuery.mockResolvedValue({ results: [], meta: { changes: 1 } });

    const res = await actualizar(
      json("http://localhost/api/sedes/2", "PUT", {
        nombre: "Sede Colón",
        email: "contacto@ipsinka.com",
      }),
      params("2")
    );

    expect(res.status).toBe(200);
    const [sql, valores] = mockQuery.mock.calls[0];
    expect(sql).toMatch(/UPDATE sedes/);
    expect(sql).not.toMatch(/actualizado_en/);
    expect(valores).toContain("contacto@ipsinka.com");
    expect(valores.at(-1)).toBe("2");
  });

  it("responde 404 si la sede no existe", async () => {
    mockFirst.mockResolvedValue(null);
    const res = await actualizar(
      json("http://localhost/api/sedes/99", "PUT", { nombre: "X" }),
      params("99")
    );
    expect(res.status).toBe(404);
    expect(mockQuery).not.toHaveBeenCalled();
  });
});

describe("DELETE /api/sedes/[id]", () => {
  it("hace borrado lógico (activo = 0) sin actualizado_en", async () => {
    mockFirst.mockResolvedValue({ id: 2 });
    mockQuery.mockResolvedValue({ results: [] });

    const res = await eliminar(new NextRequest("http://localhost/api/sedes/2"), params("2"));

    expect(res.status).toBe(200);
    expect(sqlEjecutados()[0]).toMatch(/SET activo = 0/);
    expect(sqlEjecutados()[0]).not.toMatch(/actualizado_en/);
  });
});
