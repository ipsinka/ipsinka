/**
 * @jest-environment node
 */
import { sanitizarHtml } from "@/lib/sanitizarHtml";

describe("sanitizarHtml", () => {
  it("devuelve cadena vacía sin contenido", () => {
    expect(sanitizarHtml(null)).toBe("");
    expect(sanitizarHtml(undefined)).toBe("");
    expect(sanitizarHtml("")).toBe("");
  });

  it("conserva el HTML que produce el editor", () => {
    const html =
      '<h2>Jornada de vacunación</h2><p>Texto con <strong>negrita</strong>, <em>cursiva</em> y ' +
      '<a class="text-emerald-600 underline" href="https://www.ipsinka.com/sedes">un enlace</a>.</p>' +
      '<ul><li>Uno</li></ul><ol start="3"><li>Tres</li></ol><blockquote><p>Cita</p></blockquote>' +
      '<img src="https://pub-1180f62273e4461daa58e3267d5d7b32.r2.dev/publicaciones/a.jpg" alt="Foto" />';
    expect(sanitizarHtml(html)).toBe(html);
  });

  it("conserva los videos de YouTube", () => {
    const html =
      '<div data-youtube-video><iframe src="https://www.youtube.com/embed/abc123" width="640" height="360" allowfullscreen="true"></iframe></div>';
    expect(sanitizarHtml(html)).toBe(html);
  });

  it("elimina <script> y su contenido", () => {
    expect(sanitizarHtml('<p>Hola</p><script>alert(1)</script>')).toBe("<p>Hola</p>");
  });

  it("elimina atributos de eventos", () => {
    const limpio = sanitizarHtml('<img src="https://x.com/a.png" onerror="alert(1)"><p onclick="x()">Hola</p>');
    expect(limpio).not.toMatch(/onerror|onclick|alert/);
    expect(limpio).toContain("<p>Hola</p>");
  });

  it("elimina enlaces javascript: y data: en enlaces", () => {
    const limpio = sanitizarHtml(
      '<a href="javascript:alert(1)">a</a><a href="JaVaScRiPt:alert(1)">b</a><a href="data:text/html,x">c</a>'
    );
    expect(limpio).not.toMatch(/javascript|data:/i);
  });

  it("solo permite iframes de YouTube", () => {
    expect(sanitizarHtml('<iframe src="https://evil.example/x"></iframe>')).not.toContain("evil");
  });

  it("elimina estilos, formularios y objetos incrustados", () => {
    const limpio = sanitizarHtml(
      '<style>body{display:none}</style><form action="https://x"><input name="c"></form><object data="x"></object><p style="color:red">t</p>'
    );
    expect(limpio).toBe("<p>t</p>");
  });

  it("acepta imágenes base64 solo si son imágenes", () => {
    expect(sanitizarHtml('<img src="data:image/png;base64,iVBORw0KGgo=">')).toContain("data:image/png");
    expect(sanitizarHtml('<img src="data:text/html;base64,PHNjcmlwdD4=">')).toBe("");
  });

  it("agrega rel=noopener a enlaces que abren otra pestaña", () => {
    expect(sanitizarHtml('<a href="https://x.com" target="_blank">x</a>')).toBe(
      '<a href="https://x.com" target="_blank" rel="noopener noreferrer">x</a>'
    );
  });
});
