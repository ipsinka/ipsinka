"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  GalleryHorizontalEnd,
} from "lucide-react";
import FileUpload from "@/components/admin/FileUpload";
import { confirmDelete, showError } from "@/lib/alerts";
import { useRolUsuario } from "@/hooks/useRolUsuario";

interface Boton {
  text: string;
  href: string;
  estilo: "primary" | "secondary";
}

interface SlideItem {
  id: number;
  titulo: string | null;
  subtitulo: string | null;
  descripcion: string | null;
  imagen_url: string | null;
  bg_color: string | null;
  icono: string | null;
  icono_label: string | null;
  botones: string | null; // JSON
  orden: number;
  activo: number;
}

interface FormData {
  titulo: string;
  subtitulo: string;
  descripcion: string;
  imagen_url: string;
  bg_color: string;
  icono: string;
  icono_label: string;
  botones: Boton[];
  orden: number;
}

// Opciones de gradiente (deben ser clases literales de Tailwind para que
// se generen en el build; ver PresentacionCarousel).
const GRADIENTES: { value: string; label: string }[] = [
  { value: "from-green-700 to-green-800", label: "Verde institucional" },
  { value: "from-green-600 to-green-800", label: "Verde claro → Verde" },
  { value: "from-green-800 to-green-950", label: "Verde oscuro" },
];

const emptyForm: FormData = {
  titulo: "",
  subtitulo: "",
  descripcion: "",
  imagen_url: "",
  bg_color: "from-green-700 to-green-800",
  icono: "",
  icono_label: "",
  botones: [{ text: "", href: "", estilo: "primary" }],
  orden: 0,
};

// Parsea el campo `botones` (JSON string) a un array tipado y seguro.
function parseBotones(raw: string | null): Boton[] {
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr
      .filter((b) => b && typeof b === "object")
      .map((b) => ({
        text: String(b.text ?? ""),
        href: String(b.href ?? ""),
        estilo: b.estilo === "secondary" ? "secondary" : "primary",
      }));
  } catch {
    return [];
  }
}

export default function AdminSlider() {
  const { esAdmin } = useRolUsuario();
  const [items, setItems] = useState<SlideItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<SlideItem | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/slider");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({
      ...emptyForm,
      orden: items.length ? Math.max(...items.map((i) => i.orden)) + 1 : 1,
    });
    setError(null);
    setModalOpen(true);
  };

  const openEdit = (item: SlideItem) => {
    setEditing(item);
    const botones = parseBotones(item.botones);
    setForm({
      titulo: item.titulo ?? "",
      subtitulo: item.subtitulo ?? "",
      descripcion: item.descripcion ?? "",
      imagen_url: item.imagen_url ?? "",
      bg_color: item.bg_color ?? "from-green-700 to-green-800",
      icono: item.icono ?? "",
      icono_label: item.icono_label ?? "",
      botones: botones.length ? botones : [],
      orden: item.orden ?? 0,
    });
    setError(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
    setForm(emptyForm);
    setError(null);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "orden" ? Number(value) : value,
    }));
  };

  // --- Gestión de botones dinámicos ---
  const addBoton = () => {
    setForm((prev) => ({
      ...prev,
      botones: [
        ...prev.botones,
        {
          text: "",
          href: "",
          estilo: prev.botones.length === 0 ? "primary" : "secondary",
        },
      ],
    }));
  };

  const updateBoton = (index: number, campo: keyof Boton, valor: string) => {
    setForm((prev) => ({
      ...prev,
      botones: prev.botones.map((b, i) =>
        i === index
          ? { ...b, [campo]: campo === "estilo" ? (valor as Boton["estilo"]) : valor }
          : b
      ),
    }));
  };

  const removeBoton = (index: number) => {
    setForm((prev) => ({
      ...prev,
      botones: prev.botones.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    // Solo guardar botones con texto y destino
    const botonesLimpios = form.botones.filter(
      (b) => b.text.trim() && b.href.trim()
    );

    const body = {
      titulo: form.titulo.trim() || null,
      subtitulo: form.subtitulo.trim() || null,
      descripcion: form.descripcion.trim() || null,
      imagen_url: form.imagen_url.trim() || null,
      bg_color: form.bg_color || null,
      icono: form.icono.trim() || null,
      icono_label: form.icono_label.trim() || null,
      botones: botonesLimpios,
      orden: form.orden,
    };

    try {
      const url = editing ? `/api/slider/${editing.id}` : "/api/slider";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al guardar");
      }
      closeModal();
      fetchItems();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: SlideItem) => {
    if (!(await confirmDelete(`¿Eliminar el slide "${item.titulo ?? "sin título"}"?`)))
      return;
    try {
      const res = await fetch(`/api/slider/${item.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      fetchItems();
    } catch {
      showError("No se pudo eliminar el slide.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Slider de inicio
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Imágenes de fondo, textos y botones del carrusel de presentación.
          </p>
        </div>
        {esAdmin && (
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            Agregar slide
          </button>
        )}
      </div>

      {/* Lista */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col items-center gap-3 py-16 text-slate-400">
            <GalleryHorizontalEnd className="h-8 w-8" />
            <p>No hay slides registrados.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, idx) => {
            const botones = parseBotones(item.botones);
            return (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col sm:flex-row"
              >
                {/* Miniatura */}
                <div className="sm:w-56 h-40 sm:h-auto bg-slate-100 dark:bg-slate-700 relative flex-shrink-0">
                  {item.imagen_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.imagen_url}
                      alt={item.titulo ?? "Slide"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-300 text-xs">
                      Sin imagen
                    </div>
                  )}
                  <span className="absolute top-2 left-2 bg-slate-900/70 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    #{idx + 1}
                  </span>
                </div>

                {/* Contenido */}
                <div className="p-4 flex-1 min-w-0">
                  {item.subtitulo && (
                    <p className="text-xs font-medium text-green-700 uppercase tracking-wide">
                      {item.subtitulo}
                    </p>
                  )}
                  <p className="font-semibold text-slate-800 dark:text-white truncate">
                    {item.icono && <span className="mr-1">{item.icono}</span>}
                    {item.titulo || "Sin título"}
                  </p>
                  {item.descripcion && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {item.descripcion}
                    </p>
                  )}

                  {/* Botones del slide */}
                  {botones.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {botones.map((b, i) => (
                        <span
                          key={i}
                          className={`text-xs px-2 py-1 rounded-md border ${
                            b.estilo === "primary"
                              ? "bg-yellow-50 border-yellow-300 text-yellow-800"
                              : "bg-slate-50 border-slate-300 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {b.text} → {b.href}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Acciones */}
                  <div className="flex items-center gap-2 mt-4">
                    <button
                      onClick={() => openEdit(item)}
                      className="inline-flex items-center gap-1 text-xs text-green-700 border border-green-200 hover:bg-green-50 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Pencil className="h-4 w-4" />
                      Editar
                    </button>
                    {esAdmin && (
                      <button
                        onClick={() => handleDelete(item)}
                        className="inline-flex items-center gap-1 text-xs text-red-600 border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                        Eliminar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800 z-10">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                {editing ? "Editar slide" : "Nuevo slide"}
              </h3>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 dark:text-slate-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2 rounded-lg">
                  {error}
                </div>
              )}

              {/* Imagen de fondo */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                  Imagen de fondo
                </label>
                <FileUpload
                  accept="image/*"
                  carpeta="slider"
                  label="Subir imagen de fondo"
                  onUpload={(url) =>
                    setForm((prev) => ({ ...prev, imagen_url: url }))
                  }
                />
                {form.imagen_url && (
                  <div className="mt-2 relative inline-block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={form.imagen_url}
                      alt="Preview"
                      className="h-32 w-auto rounded-lg object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, imagen_url: "" }))
                      }
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow"
                      aria-label="Quitar imagen"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* Subtítulo */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                  Subtítulo (texto pequeño superior)
                </label>
                <input
                  type="text"
                  name="subtitulo"
                  value={form.subtitulo}
                  onChange={handleChange}
                  placeholder="Ej: Especialistas en Salud"
                  className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white"
                />
              </div>

              {/* Título */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  name="titulo"
                  value={form.titulo}
                  onChange={handleChange}
                  placeholder="Ej: Atención Médica y Odontológica"
                  className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white"
                />
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                  Descripción
                </label>
                <textarea
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Texto descriptivo del slide"
                  className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white resize-y"
                />
              </div>

              {/* Fila: gradiente + orden */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                    Color de superposición (gradiente)
                  </label>
                  <select
                    name="bg_color"
                    value={form.bg_color}
                    onChange={handleChange}
                    className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white"
                  >
                    {GRADIENTES.map((g) => (
                      <option key={g.value} value={g.value}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                    Orden
                  </label>
                  <input
                    type="number"
                    name="orden"
                    value={form.orden}
                    onChange={handleChange}
                    min={0}
                    className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Fila: icono + icono_label */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                    Icono decorativo (emoji)
                  </label>
                  <input
                    type="text"
                    name="icono"
                    value={form.icono}
                    onChange={handleChange}
                    placeholder="🏥"
                    className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                    Texto bajo el icono
                  </label>
                  <input
                    type="text"
                    name="icono_label"
                    value={form.icono_label}
                    onChange={handleChange}
                    placeholder="Ej: Medicina Integral"
                    className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Botones (CTA) dinámicos */}
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                    Botones
                  </label>
                  <button
                    type="button"
                    onClick={addBoton}
                    className="inline-flex items-center gap-1 text-xs text-green-700 border border-green-200 hover:bg-green-50 px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Añadir botón
                  </button>
                </div>

                {form.botones.length === 0 && (
                  <p className="text-xs text-slate-400 mb-2">
                    Este slide no tiene botones. Pulsa &quot;Añadir botón&quot;
                    para incluir uno.
                  </p>
                )}

                <div className="space-y-3">
                  {form.botones.map((b, i) => (
                    <div
                      key={i}
                      className="border border-slate-200 dark:border-slate-700 rounded-lg p-3 space-y-2 bg-slate-50 dark:bg-slate-700/40"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-300">
                          Botón {i + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeBoton(i)}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Eliminar botón"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={b.text}
                          onChange={(e) =>
                            updateBoton(i, "text", e.target.value)
                          }
                          placeholder="Texto (ej: Agendar Cita)"
                          className="border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white"
                        />
                        <input
                          type="text"
                          value={b.href}
                          onChange={(e) =>
                            updateBoton(i, "href", e.target.value)
                          }
                          placeholder="Destino (ej: /sedes o tel:+57...)"
                          className="border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white"
                        />
                      </div>
                      <select
                        value={b.estilo}
                        onChange={(e) =>
                          updateBoton(i, "estilo", e.target.value)
                        }
                        className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white"
                      >
                        <option value="primary">
                          Estilo principal (amarillo)
                        </option>
                        <option value="secondary">
                          Estilo secundario (borde)
                        </option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-green-700 hover:bg-green-800 text-white rounded-lg transition-colors disabled:opacity-60"
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editing ? "Guardar cambios" : "Agregar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
