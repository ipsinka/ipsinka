"use client";

import { useState, useEffect, useMemo } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Download } from "lucide-react";
import FileUpload from "@/components/admin/FileUpload";
import { confirmDelete, showError } from "@/lib/alerts";
import { useRolUsuario } from "@/hooks/useRolUsuario";

interface Informe {
  id: number;
  titulo: string;
  descripcion: string | null;
  archivo_url: string;
  area: string | null;
  mes: number;
  anio: number;
  activo: number;
  creado_en: string;
}

interface FormData {
  titulo: string;
  descripcion: string;
  archivo_url: string;
  area: string;
  mes: string;
  anio: string;
}

const MESES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const AREAS = [
  "administrativa",
  "asistencial",
  "financiera",
  "juridica",
  "talento-humano",
  "otros",
];

const areaLabel: Record<string, string> = {
  administrativa: "Administrativa",
  asistencial: "Asistencial",
  financiera: "Financiera",
  juridica: "Jurídica",
  "talento-humano": "Talento Humano",
  otros: "Otros",
};

const emptyForm: FormData = {
  titulo: "",
  descripcion: "",
  archivo_url: "",
  area: "administrativa",
  mes: String(new Date().getMonth() + 1),
  anio: String(new Date().getFullYear()),
};

export default function AdminInformes() {
  const { esAdmin } = useRolUsuario();
  const [items, setItems] = useState<Informe[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Informe | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filtros
  const [filtroAnio, setFiltroAnio] = useState("");
  const [filtroMes, setFiltroMes] = useState("");
  const [filtroArea, setFiltroArea] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/informes");
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

  const aniosDisponibles = useMemo(() => {
    const set = new Set(items.map((i) => i.anio));
    return Array.from(set).sort((a, b) => b - a);
  }, [items]);

  const itemsFiltrados = useMemo(() => {
    return items.filter((i) => {
      if (filtroAnio && i.anio !== Number(filtroAnio)) return false;
      if (filtroMes && i.mes !== Number(filtroMes)) return false;
      if (filtroArea && i.area !== filtroArea) return false;
      return true;
    });
  }, [items, filtroAnio, filtroMes, filtroArea]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setError(null);
    setModalOpen(true);
  };

  const openEdit = (item: Informe) => {
    setEditing(item);
    setForm({
      titulo: item.titulo ?? "",
      descripcion: item.descripcion ?? "",
      archivo_url: item.archivo_url ?? "",
      area: item.area ?? "administrativa",
      mes: String(item.mes),
      anio: String(item.anio),
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
      archivo_url: form.archivo_url,
      area: form.area || null,
      mes: Number(form.mes),
      anio: Number(form.anio),
    };

    try {
      const url = editing ? `/api/informes/${editing.id}` : "/api/informes";
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

  const handleDelete = async (item: Informe) => {
    if (!(await confirmDelete(`¿Eliminar el informe "${item.titulo}"?`))) return;
    try {
      const res = await fetch(`/api/informes/${item.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar");
      fetchItems();
    } catch {
      showError("No se pudo eliminar el informe.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Informes Mensuales
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Reportes de entrega de documentación clasificados por mes, año y
            área.
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

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-wrap gap-3">
        <select
          value={filtroAnio}
          onChange={(e) => setFiltroAnio(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">Todos los años</option>
          {aniosDisponibles.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        <select
          value={filtroMes}
          onChange={(e) => setFiltroMes(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">Todos los meses</option>
          {MESES.map((m, i) => (
            <option key={m} value={i + 1}>
              {m}
            </option>
          ))}
        </select>
        <select
          value={filtroArea}
          onChange={(e) => setFiltroArea(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">Todas las áreas</option>
          {AREAS.map((a) => (
            <option key={a} value={a}>
              {areaLabel[a]}
            </option>
          ))}
        </select>
        {(filtroAnio || filtroMes || filtroArea) && (
          <button
            onClick={() => {
              setFiltroAnio("");
              setFiltroMes("");
              setFiltroArea("");
            }}
            className="text-sm text-slate-500 hover:text-slate-700 px-2"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Tabla / historial */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
          </div>
        ) : itemsFiltrados.length === 0 ? (
          <p className="text-center text-slate-400 py-16">
            No hay informes registrados.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">
                    Título
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">
                    Período
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">
                    Área
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">
                    Descarga
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {itemsFiltrados.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-800 font-medium max-w-xs truncate">
                      {item.titulo}
                    </td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                      {MESES[item.mes - 1]} {item.anio}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {areaLabel[item.area ?? ""] ?? item.area ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      {item.archivo_url ? (
                        <a
                          href={item.archivo_url}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-emerald-600 hover:underline text-sm"
                        >
                          <Download className="h-4 w-4" />
                          Descargar
                        </a>
                      ) : (
                        "—"
                      )}
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
                {editing ? "Editar Informe" : "Nuevo Informe"}
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
                  rows={2}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Mes <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="mes"
                    value={form.mes}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {MESES.map((m, i) => (
                      <option key={m} value={i + 1}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Año <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="anio"
                    value={form.anio}
                    onChange={handleChange}
                    required
                    min={2000}
                    max={2100}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Área
                  </label>
                  <select
                    name="area"
                    value={form.area}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {AREAS.map((a) => (
                      <option key={a} value={a}>
                        {areaLabel[a]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Archivo PDF
                </label>
                <FileUpload
                  accept=".pdf,application/pdf"
                  carpeta="informes"
                  label="Subir reporte PDF"
                  onUpload={(url) =>
                    setForm((prev) => ({ ...prev, archivo_url: url }))
                  }
                />
                {form.archivo_url && (
                  <p className="text-xs text-emerald-600 mt-1 truncate">
                    Archivo: {form.archivo_url}
                  </p>
                )}
                <p className="text-xs text-slate-400 mt-1">
                  O ingresa una URL directamente:
                </p>
                <input
                  type="text"
                  name="archivo_url"
                  value={form.archivo_url}
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
                  {editing ? "Guardar cambios" : "Crear informe"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
