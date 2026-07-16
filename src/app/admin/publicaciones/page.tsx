"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Loader2, FileText, Eye, EyeOff } from "lucide-react";
import dynamic from "next/dynamic";
import FileUpload from "@/components/admin/FileUpload";
import { confirmDelete } from "@/lib/alerts";
import { useRolUsuario } from "@/hooks/useRolUsuario";

const RichTextEditor = dynamic(() => import("@/components/admin/RichTextEditor"), { ssr: false });

interface Publicacion {
  id: number;
  titulo: string;
  resumen: string;
  contenido: string;
  imagen_portada: string;
  slug: string;
  estado: EstadoPublicacion;
  autor: string;
  creado_en: string;
}

const estadoBadge = (estado: string) => {
  const map: Record<string, string> = {
    publicado: "bg-emerald-100 text-emerald-700",
    borrador: "bg-yellow-100 text-yellow-700",
    archivado: "bg-slate-100 text-slate-600",
  };
  return map[estado] ?? "bg-slate-100 text-slate-600";
};

type EstadoPublicacion = "borrador" | "publicado" | "archivado";
const empty = { titulo: "", resumen: "", contenido: "", imagen_portada: "", slug: "", estado: "borrador" as EstadoPublicacion, autor: "" };

export default function PublicacionesPage() {
  const { esAdmin } = useRolUsuario();
  const [items, setItems] = useState<Publicacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<Publicacion | null>(null);
  const [form, setForm] = useState(empty);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/publicaciones");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm(empty); setModalOpen(true); };
  const openEdit = (p: Publicacion) => { setEditing(p); setForm({ titulo: p.titulo, resumen: p.resumen, contenido: p.contenido, imagen_portada: p.imagen_portada, slug: p.slug, estado: p.estado, autor: p.autor }); setModalOpen(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = editing ? `/api/publicaciones/${editing.id}` : "/api/publicaciones";
    const method = editing ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false);
    setModalOpen(false);
    load();
  };

  const handleDelete = async (id: number) => {
    if (!(await confirmDelete("¿Eliminar esta publicación?"))) return;
    await fetch(`/api/publicaciones/${id}`, { method: "DELETE" });
    load();
  };

  const toggleEstado = async (p: Publicacion) => {
    const nuevoEstado = p.estado === "publicado" ? "borrador" : "publicado";
    await fetch(`/api/publicaciones/${p.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...p, estado: nuevoEstado }) });
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Publicaciones</h1>
        {esAdmin && (
          <button onClick={openNew} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
            <Plus className="h-4 w-4" /> Agregar
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-emerald-600" /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 text-slate-500"><FileText className="h-12 w-12 mx-auto mb-3 opacity-30" /><p>No hay publicaciones aún</p></div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Título</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Autor</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Estado</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Fecha</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800 max-w-xs truncate">{p.titulo}</td>
                  <td className="px-4 py-3 text-slate-600 hidden md:table-cell">{p.autor || "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${estadoBadge(p.estado)}`}>{p.estado}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 hidden md:table-cell">{new Date(p.creado_en).toLocaleDateString("es-CO")}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => toggleEstado(p)} className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title={p.estado === "publicado" ? "Despublicar" : "Publicar"}>
                        {p.estado === "publicado" ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      <button onClick={() => openEdit(p)} className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800">{editing ? "Editar publicación" : "Nueva publicación"}</h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Título *</label>
                <input type="text" required value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Resumen</label>
                <textarea rows={2} value={form.resumen} onChange={e => setForm({ ...form, resumen: e.target.value })} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Descripción corta para vista previa..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Imagen de portada</label>
                <FileUpload carpeta="publicaciones" accept="image/*" onUpload={(url) => setForm({ ...form, imagen_portada: url })} />
                {form.imagen_portada && <p className="text-xs text-emerald-600 mt-1">✓ Imagen cargada</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Contenido *</label>
                <RichTextEditor content={form.contenido} onChange={(html) => setForm({ ...form, contenido: html })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Autor</label>
                  <input type="text" value={form.autor} onChange={e => setForm({ ...form, autor: e.target.value })} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Estado</label>
                  <select value={form.estado} onChange={e => setForm({ ...form, estado: e.target.value as "borrador" | "publicado" })} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option value="borrador">Borrador</option>
                    <option value="publicado">Publicado</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 border border-slate-300 rounded-lg">Cancelar</button>
                <button type="submit" disabled={saving} className="flex items-center gap-2 px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-60">
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editing ? "Guardar cambios" : "Crear publicación"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
