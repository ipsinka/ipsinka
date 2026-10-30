/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { r2Put } from "@/lib/cloudflare";
import { POST } from "@/app/api/upload/route";

jest.mock("@/lib/cloudflare", () => ({ r2Put: jest.fn() }));
const mockPut = r2Put as jest.Mock;

const subir = (campos: Record<string, string | File>) => {
  const form = new FormData();
  for (const [k, v] of Object.entries(campos)) form.append(k, v);
  return POST(new NextRequest("http://localhost/api/upload", { method: "POST", body: form }));
};

beforeEach(() => {
  jest.resetAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
  mockPut.mockImplementation(async (key: string) => `https://cdn.example/${key}`);
});

it("exige el archivo", async () => {
  const res = await subir({ carpeta: "slider" });
  expect(res.status).toBe(400);
  expect(mockPut).not.toHaveBeenCalled();
});

it("limpia el nombre del archivo y lo guarda en la carpeta indicada", async () => {
  const archivo = new File(["img"], "Foto sede Colón (1).jpg", { type: "image/jpeg" });
  const res = await subir({ file: archivo, carpeta: "sedes" });

  expect(res.status).toBe(201);
  const [key, , tipo] = mockPut.mock.calls[0];
  expect(key).toMatch(/^sedes\/\d+-Foto-sede-Coln-1\.jpg$/);
  expect(tipo).toBe("image/jpeg");
});

it("usa la carpeta general si no se indica", async () => {
  await subir({ file: new File(["x"], "a.png", { type: "image/png" }) });
  expect(mockPut.mock.calls[0][0]).toMatch(/^general\//);
});
