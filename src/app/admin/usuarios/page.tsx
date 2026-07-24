"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Loader2, ShieldCheck } from "lucide-react";
import { confirmDelete, showError } from "@/lib/alerts";
import { useRolUsuario } from "@/hooks/useRolUsuario";

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  activo: number;
  creado_en: string;
  ultimo_acceso: string | null;
}

interface FormData {
  nombre: string;
  email: string;
  rol: string;
}

const ROLES = ["admin", "editor", "visualizador"];

const rolLabel: Record<string, string> = {
  admin: "Administrador",
  editor: "Editor",
  visualizador: "Visualizador",
};

const rolStyle: Record<string, string> = {
  admin: "bg-emerald-50 text-emerald-700",
  editor: "bg-blue-50 text-blue-700",
  visualizador: "bg-slate-100 text-slate-600",
};

const emptyForm: FormData = {
  nombre: "",
  email: "",
  rol: "editor",
};

export default function AdminUsuarios() {
  const { esAdmin } = useRolUsuario();
  const [items, setItems] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Usuario | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/usuarios");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : (data.results ?? []));
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

  const openEdit = (item: Usuario) => {
    setEditing(item);
    setForm({
      nombre: item.nombre ?? "",
      email: item.email ?? "",
      rol: item.rol ?? "editor",
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const body = {
      nombre: form.nombre,
      email: form.email,
      rol: form.rol,
    };

    try {
      const url = editing ? `/api/usuarios/${editing.id}` : "/api/usuarios";
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

  const handleDelete = async (item: Usuario) => {
    if (!(await confirmDelete(`¿Revocar el acceso de "${item.nombre}"?`, { confirmButtonText: "Sí, revocar" }))) return;
    try {
      const res = await fetch(`/api/usuarios/${item.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar");
      fetchItems();
    } catch {
      showError("No se pudo eliminar el usuario.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Usuarios</h2>
          <p className="text-slate-500 text-sm mt-1">
            Gestiona los accesos y roles del personal autorizado.
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

      <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm px-4 py-3 rounded-lg flex items-start gap-2">
        <ShieldCheck className="h-4 w-4 mt-0.5 flex-shrink-0" />
        <span>
          El acceso real se valida con Clerk mediante el email registrado. Aquí
          se administran los roles y el directorio de accesos autorizados.
        </span>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
          </div>
        ) : items.length === 0 ? (
          <p className="text-center text-slate-400 py-16">
            No hay usuarios registrados.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">
                    Nombre
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">
                    Email
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">
                    Rol
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">
                    Último acceso
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-800 font-medium">
                      {item.nombre}
                    </td>
                    <td className="px-4 py-3 text-slate-500">{item.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          rolStyle[item.rol] ?? "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {rolLabel[item.rol] ?? item.rol}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {item.ultimo_acceso
                        ? new Date(item.ultimo_acceso).toLocaleString("es-CO")
                        : "—"}
                    </td>
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
                          title="Revocar acceso"
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
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800">
                {editing ? "Editar Usuario" : "Nuevo Usuario"}
              </h3>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600"
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

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="correo@ejemplo.com"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Rol
                </label>
                <select
                  name="rol"
                  value={form.rol}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {rolLabel[r]}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-400 mt-1">
                  Administrador: control total · Editor: gestiona contenido ·
                  Visualizador: solo lectura.
                </p>
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
                  {editing ? "Guardar cambios" : "Crear usuario"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
