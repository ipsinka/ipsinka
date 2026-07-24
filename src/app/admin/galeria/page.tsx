"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Loader2, ImageIcon, Video } from "lucide-react";
import FileUpload from "@/components/admin/FileUpload";
import { confirmDelete, showError } from "@/lib/alerts";
import { useRolUsuario } from "@/hooks/useRolUsuario";

interface GaleriaItem {
  id: number;
  titulo: string;
  descripcion: string | null;
  imagen_url: string;
  categoria: string | null;
  tipo: string;
  seccion: string | null;
  activo: number;
  creado_en: string;
}

interface FormData {
  titulo: string;
  descripcion: string;
  imagen_url: string;
  categoria: string;
  tipo: "imagen" | "video";
  seccion: string;
}

const SECCIONES: { value: string; label: string; carpeta: string }[] = [
  { value: "instalaciones",  label: "Instalaciones",        carpeta: "galeria/instalaciones" },
  { value: "eventos",        label: "Eventos",               carpeta: "galeria/eventos" },
  { value: "comunidad",      label: "Comunidad",             carpeta: "galeria/comunidad" },
  { value: "servicios",      label: "Servicios médicos",     carpeta: "galeria/servicios" },
  { value: "equipo",         label: "Equipo de trabajo",     carpeta: "galeria/equipo" },
  { value: "sedes",          label: "Sedes",                 carpeta: "galeria/sedes" },
  { value: "otro",           label: "Otro",                  carpeta: "galeria/otro" },
];

const emptyForm: FormData = {
  titulo: "",
  descripcion: "",
  imagen_url: "",
  categoria: "instalaciones",
  tipo: "imagen",
  seccion: "instalaciones",
};

function MediaPreview({ item }: { item: GaleriaItem }) {
  if (item.tipo === "video") {
    return (
      <video
        src={item.imagen_url}
        className="w-full h-full object-cover"
        muted
        preload="metadata"
      />
    );
  }
  if (item.imagen_url) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={item.imagen_url} alt={item.titulo} className="w-full h-full object-cover" />;
  }
  return (
    <div className="flex items-center justify-center h-full text-slate-300 text-xs">Sin archivo</div>
  );
}

export default function AdminGaleria() {
  const { esAdmin } = useRolUsuario();
  const [items, setItems] = useState<GaleriaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<GaleriaItem | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filtroTipo, setFiltroTipo] = useState<"todos" | "imagen" | "video">("todos");
  const [filtroSeccion, setFiltroSeccion] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/galeria");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const carpetaActual = SECCIONES.find((s) => s.value === form.seccion)?.carpeta ?? "galeria/otro";
  const acceptActual = form.tipo === "video" ? "video/*" : "image/*";
  const labelUpload = form.tipo === "video" ? "Subir video" : "Subir imagen";

  const itemsFiltrados = items.filter((i) => {
    if (filtroTipo !== "todos" && (i.tipo ?? "imagen") !== filtroTipo) return false;
    if (filtroSeccion && i.seccion !== filtroSeccion) return false;
    return true;
  });

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setError(null);
    setModalOpen(true);
  };

  const openEdit = (item: GaleriaItem) => {
    setEditing(item);
    setForm({
      titulo: item.titulo ?? "",
      descripcion: item.descripcion ?? "",
      imagen_url: item.imagen_url ?? "",
      categoria: item.categoria ?? "instalaciones",
      tipo: (item.tipo as "imagen" | "video") ?? "imagen",
      seccion: item.seccion ?? "instalaciones",
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      // Al cambiar sección, sincronizar categoría
      if (name === "seccion") next.categoria = value;
      // Al cambiar tipo, limpiar la url previa (formato incompatible)
      if (name === "tipo") next.imagen_url = "";
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const body = {
      titulo: form.titulo,
      descripcion: form.descripcion || null,
      imagen_url: form.imagen_url,
      categoria: form.categoria || null,
      tipo: form.tipo,
      seccion: form.seccion || null,
    };
    try {
      const url = editing ? `/api/galeria/${editing.id}` : "/api/galeria";
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

  const handleDelete = async (item: GaleriaItem) => {
    if (!(await confirmDelete(`¿Eliminar "${item.titulo}"?`))) return;
    try {
      const res = await fetch(`/api/galeria/${item.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      fetchItems();
    } catch {
      showError("No se pudo eliminar el elemento.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Galería</h2>
          <p className="text-slate-500 text-sm mt-1">Imágenes y videos organizados por sección.</p>
        </div>
        {esAdmin && (
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            Agregar
          </button>
        )}
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-wrap gap-3">
        <div className="flex gap-2">
          {(["todos", "imagen", "video"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFiltroTipo(t)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filtroTipo === t
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {t === "imagen" && <ImageIcon className="h-4 w-4" />}
              {t === "video" && <Video className="h-4 w-4" />}
              {t === "todos" ? "Todos" : t === "imagen" ? "Imágenes" : "Videos"}
            </button>
          ))}
        </div>
        <select
          value={filtroSeccion}
          onChange={(e) => setFiltroSeccion(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">Todas las secciones</option>
          {SECCIONES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
        {(filtroTipo !== "todos" || filtroSeccion) && (
          <button
            onClick={() => { setFiltroTipo("todos"); setFiltroSeccion(""); }}
            className="text-sm text-slate-500 hover:text-slate-700 px-2"
          >
            Limpiar
          </button>
        )}
        <span className="ml-auto text-xs text-slate-400 self-center">
          {itemsFiltrados.length} elemento{itemsFiltrados.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
        </div>
      ) : itemsFiltrados.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <p className="text-center text-slate-400 py-16">No hay contenido registrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {itemsFiltrados.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group">
              <div className="aspect-video bg-slate-100 relative overflow-hidden">
                <MediaPreview item={item} />
                {/* Badge tipo */}
                <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full ${
                  (item.tipo ?? "imagen") === "video"
                    ? "bg-purple-600 text-white"
                    : "bg-emerald-600 text-white"
                }`}>
                  {(item.tipo ?? "imagen") === "video" ? "Video" : "Imagen"}
                </span>
              </div>
              <div className="p-3">
                <p className="font-medium text-slate-800 text-sm truncate">{item.titulo}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  {item.seccion && (
                    <span className="text-xs text-slate-400 capitalize">
                      {SECCIONES.find((s) => s.value === item.seccion)?.label ?? item.seccion}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => openEdit(item)}
                    className="flex-1 inline-flex items-center justify-center gap-1 text-xs text-blue-600 border border-blue-200 hover:bg-blue-50 px-2 py-1.5 rounded-lg transition-colors"
                  >
                    <Pencil className="h-4 w-4" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="flex-1 inline-flex items-center justify-center gap-1 text-xs text-red-600 border border-red-200 hover:bg-red-50 px-2 py-1.5 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800">
                {editing ? "Editar elemento" : "Nuevo elemento"}
              </h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2 rounded-lg">
                  {error}
                </div>
              )}

              {/* Tipo de contenido */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tipo de contenido <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  {(["imagen", "video"] as const).map((t) => (
                    <label
                      key={t}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border-2 cursor-pointer transition-colors ${
                        form.tipo === t
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-slate-200 text-slate-500 hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="tipo"
                        value={t}
                        checked={form.tipo === t}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      {t === "imagen" ? <ImageIcon className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                      <span className="text-sm font-medium capitalize">{t === "imagen" ? "Imagen" : "Video"}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sección destino */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Sección / Destino <span className="text-red-500">*</span>
                </label>
                <select
                  name="seccion"
                  value={form.seccion}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {SECCIONES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                <p className="text-xs text-slate-400 mt-1">
                  Se guardará en: <code className="bg-slate-100 px-1 rounded">{carpetaActual}/</code>
                </p>
              </div>

              {/* Título */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Título <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="titulo"
                  value={form.titulo}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
                <textarea
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                  rows={2}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y"
                />
              </div>

              {/* Subida de archivo */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {form.tipo === "video" ? "Video" : "Imagen"} <span className="text-red-500">*</span>
                </label>
                <FileUpload
                  key={`${form.tipo}-${form.seccion}`}
                  accept={acceptActual}
                  carpeta={carpetaActual}
                  label={labelUpload}
                  onUpload={(url) => setForm((prev) => ({ ...prev, imagen_url: url }))}
                />
                {form.imagen_url && (
                  <div className="mt-2">
                    {form.tipo === "video" ? (
                      <video
                        src={form.imagen_url}
                        controls
                        className="h-32 w-auto rounded-lg border border-slate-200"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={form.imagen_url}
                        alt="Preview"
                        className="h-32 w-auto rounded-lg object-cover border border-slate-200"
                      />
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving || !form.imagen_url}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors disabled:opacity-60"
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
