"use client";

import { useState, useEffect } from "react";
import {
  Plus, Pencil, Trash2, X, Loader2, FileText, TrendingUp,
  ClipboardList, Award, BookOpen, Scale, FileCheck, UploadCloud,
} from "lucide-react";
import FileUpload from "@/components/admin/FileUpload";
import { confirmDelete, showError } from "@/lib/alerts";
import { useRolUsuario } from "@/hooks/useRolUsuario";

interface Documento {
  id: number;
  nombre: string;
  descripcion: string | null;
  archivo_url: string | null;
  categoria: string | null;
  anio: number | null;
  activo: number;
  creado_en: string;
}

interface FormData {
  nombre: string;
  descripcion: string;
  archivo_url: string;
  categoria: string;
  anio: string;
}

interface CategoriaConfig {
  value: string;
  label: string;
  descripcion: string;
  ejemplos: string[];
  carpeta: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ElementType;
}

const CATEGORIAS: CategoriaConfig[] = [
  {
    value: "estados-financieros",
    label: "Estados Financieros",
    descripcion: "Documentos contables y financieros de la IPS.",
    ejemplos: ["Estados financieros y notas", "Balance general", "Estado de resultados"],
    carpeta: "documentos/estados-financieros",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    icon: TrendingUp,
  },
  {
    value: "informes-gestion",
    label: "Informes de Gestión",
    descripcion: "Informes anuales de gestión y rendición de cuentas.",
    ejemplos: ["Informe de Gestión anual", "Informe de actividades", "Rendición de cuentas"],
    carpeta: "documentos/informes-gestion",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    icon: ClipboardList,
  },
  {
    value: "actas",
    label: "Actas",
    descripcion: "Actas de reuniones, asambleas y juntas directivas.",
    ejemplos: ["Acta de Asamblea General", "Acta Junta Directiva", "Acta de Asignación Permanente", "Acta No Excedente"],
    carpeta: "documentos/actas",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    icon: BookOpen,
  },
  {
    value: "certificaciones",
    label: "Certificaciones",
    descripcion: "Certificados y constancias institucionales requeridos por entidades externas.",
    ejemplos: ["Certificación de antecedentes judiciales", "Certificado de cumplimiento de requisitos", "Certificación cargos directivos", "RUT actualizado", "Certificado de existencia y representación legal"],
    carpeta: "documentos/certificaciones",
    color: "text-purple-700",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    icon: Award,
  },
  {
    value: "contratos-convenios",
    label: "Contratos y Convenios",
    descripcion: "Contratos con EPS, convenios interinstitucionales y acuerdos.",
    ejemplos: ["Contratos con EPS", "Convenios interinstitucionales", "Acuerdos de servicio"],
    carpeta: "documentos/contratos-convenios",
    color: "text-rose-700",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
    icon: Scale,
  },
  {
    value: "resoluciones",
    label: "Resoluciones",
    descripcion: "Resoluciones internas y habilitaciones emitidas por entidades de salud.",
    ejemplos: ["Resolución de habilitación", "Resoluciones internas", "Actos administrativos"],
    carpeta: "documentos/resoluciones",
    color: "text-orange-700",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    icon: FileCheck,
  },
  {
    value: "manuales-politicas",
    label: "Manuales y Políticas",
    descripcion: "Manuales de procedimientos, políticas institucionales y reglamentos.",
    ejemplos: ["Manual de calidad", "Política de privacidad", "Reglamento interno", "Protocolo de atención"],
    carpeta: "documentos/manuales-politicas",
    color: "text-teal-700",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    icon: FileText,
  },
  {
    value: "otros",
    label: "Otros Documentos",
    descripcion: "Documentos institucionales que no encajan en las categorías anteriores.",
    ejemplos: ["Escritura pública", "Estatutos", "Documentos varios"],
    carpeta: "documentos/otros",
    color: "text-slate-700",
    bgColor: "bg-slate-50",
    borderColor: "border-slate-200",
    icon: UploadCloud,
  },
];

const emptyForm: FormData = {
  nombre: "",
  descripcion: "",
  archivo_url: "",
  categoria: "estados-financieros",
  anio: String(new Date().getFullYear()),
};

export default function AdminDocumentos() {
  const { esAdmin } = useRolUsuario();
  const [items, setItems] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Documento | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categoriaAbierta, setCategoriaAbierta] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/documentos");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : (data.results ?? []));
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const porCategoria = CATEGORIAS.map((cat) => ({
    ...cat,
    docs: items.filter((d) => d.categoria === cat.value),
  }));

  const carpetaActual = CATEGORIAS.find((c) => c.value === form.categoria)?.carpeta ?? "documentos/otros";

  const openCreate = (categoriaPreseleccionada?: string) => {
    setEditing(null);
    setForm({ ...emptyForm, categoria: categoriaPreseleccionada ?? "estados-financieros" });
    setError(null);
    setModalOpen(true);
  };

  const openEdit = (item: Documento) => {
    setEditing(item);
    setForm({
      nombre: item.nombre ?? "",
      descripcion: item.descripcion ?? "",
      archivo_url: item.archivo_url ?? "",
      categoria: item.categoria ?? "estados-financieros",
      anio: item.anio ? String(item.anio) : String(new Date().getFullYear()),
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
      if (name === "categoria") next.archivo_url = "";
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const body = {
      nombre: form.nombre,
      descripcion: form.descripcion || null,
      archivo_url: form.archivo_url || null,
      categoria: form.categoria || null,
      anio: form.anio ? Number(form.anio) : null,
    };
    try {
      const url = editing ? `/api/documentos/${editing.id}` : "/api/documentos";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
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

  const handleDelete = async (item: Documento) => {
    if (!(await confirmDelete(`¿Eliminar el documento "${item.nombre}"?`))) return;
    try {
      const res = await fetch(`/api/documentos/${item.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      fetchItems();
    } catch {
      showError("No se pudo eliminar el documento.");
    }
  };

  const catActualConfig = CATEGORIAS.find((c) => c.value === form.categoria);

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Documentos Institucionales</h2>
          <p className="text-slate-500 text-sm mt-1">
            Selecciona una categoría para ver o agregar documentos.
          </p>
        </div>
        {esAdmin && (
          <button
            onClick={() => openCreate()}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            Agregar
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {porCategoria.map((cat) => {
            const Icon = cat.icon;
            const abierta = categoriaAbierta === cat.value;
            return (
              <div
                key={cat.value}
                className={`rounded-xl border-2 transition-all duration-200 ${cat.borderColor} ${abierta ? "shadow-lg" : "shadow-sm hover:shadow-md"}`}
              >
                {/* Cabecera de tarjeta */}
                <button
                  onClick={() => setCategoriaAbierta(abierta ? null : cat.value)}
                  className={`w-full flex items-start gap-3 p-4 rounded-t-xl text-left transition-colors ${cat.bgColor}`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-white shadow-sm`}>
                    <Icon className={`h-5 w-5 ${cat.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`font-semibold text-sm ${cat.color}`}>{cat.label}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-white ${cat.color}`}>
                        {cat.docs.length}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{cat.descripcion}</p>
                  </div>
                </button>

                {/* Ejemplos y documentos (expandible) */}
                {abierta && (
                  <div className="bg-white rounded-b-xl divide-y divide-slate-100">
                    {/* Ejemplos de qué subir */}
                    <div className="px-4 py-3">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Qué incluye</p>
                      <ul className="space-y-1">
                        {cat.ejemplos.map((ej) => (
                          <li key={ej} className="flex items-center gap-2 text-xs text-slate-500">
                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cat.color.replace("text-", "bg-")}`} />
                            {ej}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Documentos publicados */}
                    {cat.docs.length > 0 && (
                      <div className="px-4 py-3">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Publicados</p>
                        <div className="space-y-1.5">
                          {cat.docs.map((doc) => (
                            <div key={doc.id} className="flex items-center justify-between gap-2 py-1.5 px-2 rounded-lg hover:bg-slate-50">
                              <div className="min-w-0">
                                <p className="text-xs font-medium text-slate-700 truncate">{doc.nombre}</p>
                                {doc.anio && <p className="text-xs text-slate-400">{doc.anio}</p>}
                              </div>
                              {esAdmin && (
                                <div className="flex items-center gap-1 flex-shrink-0">
                                  <button
                                    onClick={() => openEdit(doc)}
                                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Editar"
                                  >
                                    <Pencil className="h-3.5 w-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(doc)}
                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Eliminar"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Botón agregar en esta categoría */}
                    {esAdmin && (
                      <div className="px-4 py-3">
                        <button
                          onClick={() => openCreate(cat.value)}
                          className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed text-xs font-medium transition-colors ${cat.borderColor} ${cat.color} hover:${cat.bgColor}`}
                        >
                          <Plus className="h-3.5 w-3.5" />
                          Subir documento en {cat.label}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800">
                {editing ? "Editar Documento" : "Nuevo Documento"}
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

              {/* Categoría — selector visual */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Categoría <span className="text-red-500">*</span>
                </label>
                <select
                  name="categoria"
                  value={form.categoria}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {CATEGORIAS.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
                {catActualConfig && (
                  <div className={`mt-2 rounded-lg px-3 py-2 text-xs ${catActualConfig.bgColor} ${catActualConfig.color}`}>
                    <span className="font-semibold">Ejemplos:</span> {catActualConfig.ejemplos.slice(0, 3).join(", ")}
                    <br />
                    <span className="text-slate-400">Se guardará en: <code>{catActualConfig.carpeta}/</code></span>
                  </div>
                )}
              </div>

              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nombre del documento <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  placeholder={catActualConfig?.ejemplos[0] ?? "Nombre del documento"}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Año */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Año</label>
                <input
                  type="number"
                  name="anio"
                  value={form.anio}
                  onChange={handleChange}
                  min={2000}
                  max={2100}
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

              {/* Archivo */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Archivo PDF</label>
                <FileUpload
                  key={form.categoria}
                  accept=".pdf,application/pdf"
                  carpeta={carpetaActual}
                  label="Subir archivo PDF"
                  onUpload={(url) => setForm((prev) => ({ ...prev, archivo_url: url }))}
                />
                {form.archivo_url && (
                  <p className="text-xs text-emerald-600 mt-1 truncate">✓ {form.archivo_url}</p>
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
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors disabled:opacity-60"
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editing ? "Guardar cambios" : "Publicar documento"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
