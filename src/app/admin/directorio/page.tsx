"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";
import { confirmDelete, showError } from "@/lib/alerts";
import { useRolUsuario } from "@/hooks/useRolUsuario";

interface DirectorioItem {
  id: number;
  nombre: string;
  cargo: string | null;
  area: string | null;
  telefono: string | null;
  email: string | null;
  foto_url: string | null;
  orden: number | null;
  activo: number;
}

interface FormData {
  nombre: string;
  cargo: string;
  area: string;
  telefono: string;
  email: string;
  foto_url: string;
  orden: string;
}

const emptyForm: FormData = {
  nombre: "",
  cargo: "",
  area: "",
  telefono: "",
  email: "",
  foto_url: "",
  orden: "0",
};

export default function AdminDirectorio() {
  const { esAdmin } = useRolUsuario();
  const [items, setItems] = useState<DirectorioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<DirectorioItem | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/directorio");
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

  const openEdit = (item: DirectorioItem) => {
    setEditing(item);
    setForm({
      nombre: item.nombre ?? "",
      cargo: item.cargo ?? "",
      area: item.area ?? "",
      telefono: item.telefono ?? "",
      email: item.email ?? "",
      foto_url: item.foto_url ?? "",
      orden: item.orden !== null ? String(item.orden) : "0",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const body = {
      nombre: form.nombre,
      cargo: form.cargo || null,
      area: form.area || null,
      telefono: form.telefono || null,
      email: form.email || null,
      foto_url: form.foto_url || null,
      orden: form.orden !== "" ? Number(form.orden) : null,
    };

    try {
      const url = editing ? `/api/directorio/${editing.id}` : "/api/directorio";
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

  const handleDelete = async (item: DirectorioItem) => {
    if (!(await confirmDelete(`¿Eliminar a "${item.nombre}" del directorio?`))) return;
    try {
      const res = await fetch(`/api/directorio/${item.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar");
      fetchItems();
    } catch {
      showError("No se pudo eliminar el registro.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Directorio</h2>
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

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
          </div>
        ) : items.length === 0 ? (
          <p className="text-center text-slate-400 py-16">No hay personas en el directorio.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Nombre</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Cargo</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Área</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Teléfono</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Email</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-800 font-medium">{item.nombre}</td>
                    <td className="px-4 py-3 text-slate-500">{item.cargo ?? "—"}</td>
                    <td className="px-4 py-3 text-slate-500">{item.area ?? "—"}</td>
                    <td className="px-4 py-3 text-slate-500">{item.telefono ?? "—"}</td>
                    <td className="px-4 py-3 text-slate-500">{item.email ?? "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 justify-end">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800">
                {editing ? "Editar Persona" : "Nueva Persona"}
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
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Cargo</label>
                  <input
                    type="text"
                    name="cargo"
                    value={form.cargo}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Área</label>
                  <input
                    type="text"
                    name="area"
                    value={form.area}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  URL de foto
                </label>
                <input
                  type="text"
                  name="foto_url"
                  value={form.foto_url}
                  onChange={handleChange}
                  placeholder="https://... o clave de R2"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Orden</label>
                <input
                  type="number"
                  name="orden"
                  value={form.orden}
                  onChange={handleChange}
                  min={0}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                  {editing ? "Guardar cambios" : "Agregar persona"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
