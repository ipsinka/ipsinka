/**
 * @jest-environment node
 */
import { NextRequest, type NextFetchEvent } from "next/server";
import { esEmailAdmin, obtenerAdminEmails, requiereAdmin } from "@/lib/adminAuth";

const mockAuth = jest.fn();
const mockGetUser = jest.fn();

jest.mock("@clerk/nextjs/server", () => ({
  clerkMiddleware:
    (handler: (auth: unknown, req: NextRequest) => unknown) =>
    (req: NextRequest) =>
      handler(mockAuth, req),
  clerkClient: async () => ({ users: { getUser: mockGetUser } }),
}));

// Se importa después del mock de Clerk.
import proxy, { config } from "@/proxy";

const evento = {} as NextFetchEvent;
const pedir = (metodo: string, ruta: string) =>
  proxy(new NextRequest(`https://www.ipsinka.com${ruta}`, { method: metodo }), evento);

beforeEach(() => {
  jest.resetAllMocks();
  process.env.ADMIN_EMAILS = "Admin@IpsInka.com, otra@ipsinka.com";
});
afterAll(() => {
  delete process.env.ADMIN_EMAILS;
});

describe("reglas de acceso", () => {
  const url = (ruta: string) => new URL(`https://www.ipsinka.com${ruta}`);

  it("toda escritura en /api requiere administrador", () => {
    for (const metodo of ["POST", "PUT", "PATCH", "DELETE"]) {
      expect(requiereAdmin(metodo, url("/api/sedes/2"))).toBe(true);
    }
    expect(requiereAdmin("post", url("/api/upload"))).toBe(true);
  });

  it("las lecturas públicas no requieren administrador", () => {
    expect(requiereAdmin("GET", url("/api/sedes"))).toBe(false);
    expect(requiereAdmin("GET", url("/api/noticias?sede=1"))).toBe(false);
    expect(requiereAdmin("GET", url("/api/publicaciones?estado=publicado"))).toBe(false);
  });

  it("listar borradores o archivadas requiere administrador", () => {
    expect(requiereAdmin("GET", url("/api/publicaciones"))).toBe(true);
    expect(requiereAdmin("GET", url("/api/publicaciones?estado=borrador"))).toBe(true);
    expect(requiereAdmin("GET", url("/api/publicaciones?incluirArchivadas=1"))).toBe(true);
  });

  it("fuera de /api no aplica", () => {
    expect(requiereAdmin("POST", url("/admin/sedes"))).toBe(false);
  });

  it("ADMIN_EMAILS tiene prioridad y se compara sin mayúsculas ni espacios", () => {
    const admins = obtenerAdminEmails({
      ADMIN_EMAILS: " A@x.com ,b@x.com,",
      NEXT_PUBLIC_ADMIN_EMAILS: "c@x.com",
    });
    expect(admins).toEqual(["a@x.com", "b@x.com"]);
    expect(obtenerAdminEmails({ NEXT_PUBLIC_ADMIN_EMAILS: "c@x.com" })).toEqual(["c@x.com"]);
    expect(obtenerAdminEmails({})).toEqual([]);
    expect(esEmailAdmin(" B@X.com ", admins)).toBe(true);
    expect(esEmailAdmin("", admins)).toBe(false);
    expect(esEmailAdmin(undefined, admins)).toBe(false);
  });
});

describe("proxy de la API", () => {
  it("se ejecuta en todas las rutas de /api", () => {
    expect(config.matcher).toEqual(["/api/:path*"]);
  });

  it("deja pasar las lecturas públicas sin consultar a Clerk", async () => {
    const res = await pedir("GET", "/api/sedes");
    expect(res?.headers.get("x-middleware-next")).toBe("1");
    expect(mockAuth).not.toHaveBeenCalled();
  });

  it("responde 401 a una escritura sin sesión", async () => {
    mockAuth.mockResolvedValue({ userId: null });
    const res = await pedir("PUT", "/api/sedes/2");
    expect(res?.status).toBe(401);
    expect(mockGetUser).not.toHaveBeenCalled();
  });

  it("responde 401 al pedir borradores sin sesión", async () => {
    mockAuth.mockResolvedValue({ userId: null });
    const res = await pedir("GET", "/api/publicaciones?estado=borrador");
    expect(res?.status).toBe(401);
  });

  it("responde 403 si el usuario no está en la lista de administradores", async () => {
    mockAuth.mockResolvedValue({ userId: "user_1" });
    mockGetUser.mockResolvedValue({ primaryEmailAddress: { emailAddress: "visitante@gmail.com" } });
    const res = await pedir("POST", "/api/upload");
    expect(res?.status).toBe(403);
  });

  it("deja pasar a un administrador", async () => {
    mockAuth.mockResolvedValue({ userId: "user_2" });
    mockGetUser.mockResolvedValue({ primaryEmailAddress: { emailAddress: "admin@ipsinka.com" } });
    const res = await pedir("DELETE", "/api/noticias/5");
    expect(res).toBeUndefined();
  });
});

describe("contenido HTML de publicaciones", () => {
  test.todo("el HTML de una publicación se sanitiza (sin <script>, on*=, javascript:) antes de renderizarse");
});
