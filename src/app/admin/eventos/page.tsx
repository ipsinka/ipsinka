"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Loader2, MapPin, Calendar } from "lucide-react";
import FileUpload from "@/components/admin/FileUpload";
import { confirmDelete, showError } from "@/lib/alerts";
import { useRolUsuario } from "@/hooks/useRolUsuario";

interface Evento {
  id: number;
  titulo: string;
  descripcion: string | null;
  lugar: string | null;
  fecha_inicio: string;
  fecha_fin: string | null;
  imagen_url: string | null;
  sede_id: number | null;
  activo: number;
  creado_en: string;
}

interface Sede {
  id: number;
  nombre: string;
  municipio: string | null;
}

interface FormData {
  titulo: string;
  descripcion: string;
  lugar: string;
  fecha_inicio: string;
  fecha_fin: string;
  imagen_url: string;
  sede_id: string;
}

const emptyForm: FormData = {
  titulo: "",
  descripcion: "",
  lugar: "",
  fecha_inicio: "",
  fecha_fin: "",
  imagen_url: "",
  sede_id: "",
};

function formatFecha(value: string | null): string {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  const tieneHora = value.includes("T");
  return d.toLocaleString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...(tieneHora ? { hour: "2-digit", minute: "2-digit" } : {}),
  });
}

export default function AdminEventos() {
  const { esAdmin } = useRolUsuario();
  const [items, setItems] = useState<Evento[]>([]);
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Evento | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const [eventosRes, sedesRes] = await Promise.all([
        fetch("/api/eventos"),
        fetch("/api/sedes"),
      ]);
      const eventosData = await eventosRes.json();
      const sedesData = await sedesRes.json();
      setItems(Array.isArray(eventosData) ? eventosData : (eventosData.results ?? []));
      setSedes(Array.isArray(sedesData) ? sedesData : []);
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

  const openEdit = (item: Evento) => {
    setEditing(item);
    setForm({
      titulo: item.titulo ?? "",
      descripcion: item.descripcion ?? "",
      lugar: item.lugar ?? "",
      // input datetime-local espera 'YYYY-MM-DDTHH:MM'; recortamos si trae segundos/zona
      fecha_inicio: (item.fecha_inicio ?? "").slice(0, 16),
      fecha_fin: (item.fecha_fin ?? "").slice(0, 16),
      imagen_url: item.imagen_url ?? "",
      sede_id: item.sede_id !== null && item.sede_id !== undefined ? String(item.sede_id) : "",
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
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const body = {
      titulo: form.titulo,
      descripcion: form.descripcion || null,
      lugar: form.lugar || null,
      fecha_inicio: form.fecha_inicio,
      fecha_fin: form.fecha_fin || null,
      imagen_url: form.imagen_url || null,
      sede_id: form.sede_id !== "" ? Number(form.sede_id) : null,
    };

    try {
      const url = editing ? `/api/eventos/${editing.id}` : "/api/eventos";
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

  const handleDelete = async (item: Evento) => {
    if (!(await confirmDelete(`¿Eliminar el evento "${item.titulo}"?`))) return;
    try {
      const res = await fetch(`/api/eventos/${item.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar");
      fetchItems();
    } catch {
      showError("No se pudo eliminar el evento.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Calendario de Eventos
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Publica eventos institucionales que aparecerán en el calendario.
          </p>
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

      {/* Lista de eventos */}
      {loading ? (
        <div className="flex items-center justify-center py-16 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <p className="text-center text-slate-400 py-16">
            No hay eventos publicados.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col"
            >
              {item.imagen_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.imagen_url}
                  alt={item.titulo}
                  className="h-36 w-full object-cover"
                />
              )}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-slate-800 dark:text-white mb-2">
                  {item.titulo}
                </h3>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-1">
                  <Calendar className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                  <span>
                    {formatFecha(item.fecha_inicio)}
                    {item.fecha_fin ? ` — ${formatFecha(item.fecha_fin)}` : ""}
                  </span>
                </div>
                {item.lugar && (
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                    <MapPin className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                    <span>{item.lugar}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm mb-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    item.sede_id
                      ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                  }`}>
                    <MapPin className="h-3 w-3" />
                    {item.sede_id
                      ? (sedes.find((s) => s.id === item.sede_id)?.nombre ?? `Sede #${item.sede_id}`)
                      : "Todas las sedes"}
                  </span>
                </div>
                {item.descripcion && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-3">
                    {item.descripcion}
                  </p>
                )}
                <div className="flex items-center gap-2 justify-end mt-auto pt-2 border-t border-slate-100">
                  <button
                    onClick={() => openEdit(item)}
                    className="text-slate-400 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50"
                    title="Editar"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="text-slate-400 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
                    title="Eliminar"
                  >
                    <Trash2 className="h-5 w-5" />
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
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                {editing ? "Editar Evento" : "Nuevo Evento"}
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

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                  Título <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="titulo"
                  value={form.titulo}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                  Descripción
                </label>
                <textarea
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                    Fecha inicio <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="fecha_inicio"
                    value={form.fecha_inicio}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                    Fecha fin
                  </label>
                  <input
                    type="datetime-local"
                    name="fecha_fin"
                    value={form.fecha_fin}
                    onChange={handleChange}
                    className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                  Lugar
                </label>
                <input
                  type="text"
                  name="lugar"
                  value={form.lugar}
                  onChange={handleChange}
                  placeholder="Sede principal, auditorio, etc."
                  className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                  Imagen (opcional)
                </label>
                <FileUpload
                  accept="image/*"
                  carpeta="eventos"
                  label="Subir imagen"
                  onUpload={(url) =>
                    setForm((prev) => ({ ...prev, imagen_url: url }))
                  }
                />
                {form.imagen_url && (
                  <p className="text-xs text-emerald-600 mt-1 truncate">
                    Imagen: {form.imagen_url}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                  Sede
                </label>
                <select
                  name="sede_id"
                  value={form.sede_id}
                  onChange={handleChange}
                  className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Todas las sedes (global)</option>
                  {sedes.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nombre}{s.municipio ? ` — ${s.municipio}` : ""}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-400 mt-1">
                  Sin sede asignada, el evento aparece en todas las sedes y en el inicio.
                </p>
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
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors disabled:opacity-60"
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editing ? "Guardar cambios" : "Crear evento"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
