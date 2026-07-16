"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";
import FileUpload from "@/components/admin/FileUpload";
import { confirmDelete, showError } from "@/lib/alerts";
import { useRolUsuario } from "@/hooks/useRolUsuario";

interface GaleriaItem {
  id: number;
  titulo: string;
  descripcion: string | null;
  imagen_url: string;
  categoria: string | null;
  activo: number;
  creado_en: string;
}

interface FormData {
  titulo: string;
  descripcion: string;
  imagen_url: string;
  categoria: string;
}

const emptyForm: FormData = {
  titulo: "",
  descripcion: "",
  imagen_url: "",
  categoria: "instalaciones",
};

export default function AdminGaleria() {
  const { esAdmin } = useRolUsuario();
  const [items, setItems] = useState<GaleriaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<GaleriaItem | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchItems();
  }, []);

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
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      const message = err instanceof Error ? err.message : "Error al guardar";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: GaleriaItem) => {
    if (!(await confirmDelete(`¿Eliminar la imagen "${item.titulo}"?`))) return;
    try {
      const res = await fetch(`/api/galeria/${item.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar");
      fetchItems();
    } catch {
      showError("No se pudo eliminar la imagen.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Galería</h2>
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

      {/* Grid de imágenes */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <p className="text-center text-slate-400 py-16">No hay imágenes registradas.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group"
            >
              <div className="aspect-video bg-slate-100 relative overflow-hidden">
                {item.imagen_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.imagen_url}
                    alt={item.titulo}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-300 text-xs">
                    Sin imagen
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="font-medium text-slate-800 text-sm truncate">{item.titulo}</p>
                <p className="text-xs text-slate-400 capitalize mt-0.5">{item.categoria ?? "—"}</p>
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => openEdit(item)}
                    className="flex-1 inline-flex items-center justify-center gap-1 text-xs text-blue-600 border border-blue-200 hover:bg-blue-50 px-2 py-1.5 rounded-lg transition-colors"
                  >
                    <Pencil className="h-3 w-3" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="flex-1 inline-flex items-center justify-center gap-1 text-xs text-red-600 border border-red-200 hover:bg-red-50 px-2 py-1.5 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-3 w-3" />
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
                {editing ? "Editar Imagen" : "Nueva Imagen"}
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

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Descripción
                </label>
                <textarea
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Categoría
                </label>
                <select
                  name="categoria"
                  value={form.categoria}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="instalaciones">Instalaciones</option>
                  <option value="eventos">Eventos</option>
                  <option value="comunidad">Comunidad</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Imagen <span className="text-red-500">*</span>
                </label>
                <FileUpload
                  accept="image/*"
                  carpeta="galeria"
                  label="Subir imagen"
                  onUpload={(url) => setForm((prev) => ({ ...prev, imagen_url: url }))}
                />
                {form.imagen_url && (
                  <div className="mt-2">
                    <p className="text-xs text-slate-500 mb-1">Vista previa:</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={form.imagen_url}
                      alt="Preview"
                      className="h-32 w-auto rounded-lg object-cover border border-slate-200"
                    />
                  </div>
                )}
                <p className="text-xs text-slate-400 mt-1">
                  O ingresa una URL directamente:
                </p>
                <input
                  type="text"
                  name="imagen_url"
                  value={form.imagen_url}
                  onChange={handleChange}
                  placeholder="https://... o clave de R2"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 mt-1"
                />
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
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors disabled:opacity-60"
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editing ? "Guardar cambios" : "Agregar imagen"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
