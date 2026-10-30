import { searchContent, searchIndex, categories } from "@/data/searchIndex";

describe("searchContent", () => {
  it("no busca con menos de 2 caracteres", () => {
    expect(searchContent("")).toEqual([]);
    expect(searchContent(" a ")).toEqual([]);
  });

  it("encuentra por título sin importar mayúsculas", () => {
    const ids = searchContent("ODONTOLOGÍA").map((r) => r.id);
    expect(ids).toContain("odontologia");
  });

  it("encuentra por etiquetas", () => {
    const ids = searchContent("pediatra").map((r) => r.id);
    expect(ids).toContain("pediatria");
  });

  it("filtra por categoría", () => {
    const resultados = searchContent("salud", "Especialidades");
    expect(resultados.length).toBeGreaterThan(0);
    expect(resultados.every((r) => r.category === "Especialidades")).toBe(true);
  });

  it("ordena por prioridad de mayor a menor", () => {
    const orden = { critical: 4, high: 3, medium: 2, low: 1 };
    const prioridades = searchContent("salud").map((r) => orden[r.priority]);
    expect(prioridades).toEqual([...prioridades].sort((a, b) => b - a));
  });
});

describe("searchIndex", () => {
  it("cada entrada tiene los campos que usa el buscador", () => {
    for (const item of searchIndex) {
      expect(item).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          description: expect.any(String),
          url: expect.stringMatching(/^\//),
          tags: expect.any(Array),
        })
      );
      expect(["critical", "high", "medium", "low"]).toContain(item.priority);
    }
  });

  it("no repite ids", () => {
    const ids = searchIndex.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("solo usa categorías declaradas", () => {
    for (const item of searchIndex) expect(categories).toContain(item.category);
  });
});
