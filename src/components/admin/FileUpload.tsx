"use client";

import { useState, useRef } from "react";
import { Upload, Loader2, CheckCircle, X } from "lucide-react";

interface FileUploadProps {
  onUpload: (url: string) => void;
  accept?: string;
  carpeta?: string;
  label?: string;
}

export default function FileUpload({
  onUpload,
  accept = "image/*",
  carpeta = "general",
  label = "Seleccionar archivo",
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedName, setUploadedName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [urlMode, setUrlMode] = useState<boolean>(false);
  const [urlInput, setUrlInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setUploadedName(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("carpeta", carpeta);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al subir archivo. En desarrollo usa la opción 'Usar URL'.");
      }

      const data = await res.json();
      setUploadedName(file.name);
      onUpload(data.url || data.key);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al subir archivo";
      setError(message);
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    setUploadedName(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      {/* Toggle archivo / URL */}
      <div className="flex gap-3 text-xs mb-1">
        <button type="button" onClick={() => setUrlMode(false)} className={`pb-0.5 border-b font-medium transition-colors ${!urlMode ? "border-emerald-600 text-emerald-600" : "border-transparent text-slate-400 hover:text-slate-600"}`}>
          Subir archivo
        </button>
        <button type="button" onClick={() => setUrlMode(true)} className={`pb-0.5 border-b font-medium transition-colors ${urlMode ? "border-emerald-600 text-emerald-600" : "border-transparent text-slate-400 hover:text-slate-600"}`}>
          Usar URL
        </button>
      </div>

      {urlMode ? (
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="https://..."
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="button"
            onClick={() => { if (urlInput) { onUpload(urlInput); setUploadedName(urlInput); setError(null); } }}
            className="px-3 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700"
          >
            Usar
          </button>
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center cursor-pointer hover:border-slate-400 transition-colors"
          onClick={() => !uploading && inputRef.current?.click()}
        >
          <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={handleFileChange} disabled={uploading} />
          {uploading ? (
            <div className="flex items-center justify-center gap-2 text-slate-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm">Subiendo...</span>
            </div>
          ) : uploadedName ? (
            <div className="flex items-center justify-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm truncate max-w-xs">{uploadedName}</span>
              <button type="button" onClick={(e) => { e.stopPropagation(); handleClear(); }} className="text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-slate-400">
              <Upload className="h-5 w-5" />
              <span className="text-sm">{label}</span>
            </div>
          )}
        </div>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
