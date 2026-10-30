import sanitizeHtml from "sanitize-html";

// HTML permitido en publicaciones: lo que produce el editor Tiptap del panel
// (StarterKit, imágenes, enlaces y videos de YouTube). Todo lo demás, como
// <script>, atributos on* o enlaces javascript:, se elimina.
const OPCIONES: sanitizeHtml.IOptions = {
  allowedTags: [
    "p", "br", "h1", "h2", "h3", "h4", "h5", "h6",
    "strong", "b", "em", "i", "u", "s", "code", "pre", "blockquote",
    "ul", "ol", "li", "hr", "a", "img", "div", "iframe",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel", "class"],
    img: ["src", "alt", "title", "width", "height"],
    iframe: ["src", "width", "height", "allow", "allowfullscreen", "frameborder"],
    div: ["data-youtube-video"],
    ol: ["start"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  // Tiptap permite imágenes en base64.
  allowedSchemesByTag: { img: ["http", "https", "data"] },
  allowedIframeHostnames: ["www.youtube.com", "youtube.com", "www.youtube-nocookie.com"],
  allowProtocolRelative: false,
  transformTags: {
    a: (tagName, attribs) => ({
      tagName,
      attribs:
        attribs.target === "_blank"
          ? { ...attribs, rel: "noopener noreferrer" }
          : attribs,
    }),
  },
  exclusiveFilter: (frame) =>
    frame.tag === "img" &&
    /^data:/i.test(frame.attribs.src ?? "") &&
    !/^data:image\/(png|jpe?g|gif|webp|avif);base64,/i.test(frame.attribs.src ?? ""),
};

export function sanitizarHtml(html: string | null | undefined): string {
  return html ? sanitizeHtml(html, OPCIONES) : "";
}
