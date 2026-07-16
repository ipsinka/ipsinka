"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import {
  Bold, Italic, List, ListOrdered, Link as LinkIcon,
  Image as ImageIcon, Youtube as YoutubeIcon, Heading2,
  Heading3, Quote, Undo, Redo,
} from "lucide-react";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: true }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-emerald-600 underline" } }),
      Youtube.configure({ width: 640, height: 360 }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none min-h-[300px] p-4 focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("URL de la imagen:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addLink = () => {
    const url = window.prompt("URL del enlace:");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const addYoutube = () => {
    const url = window.prompt("URL del video de YouTube:");
    if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run();
  };

  const btnClass = (active: boolean) =>
    `p-2 rounded hover:bg-slate-200 transition-colors ${active ? "bg-slate-300 text-slate-900" : "text-slate-600"}`;

  return (
    <div className="border border-slate-300 rounded-lg overflow-hidden">
      {/* Barra de herramientas */}
      <div className="flex flex-wrap gap-1 p-2 bg-slate-50 border-b border-slate-300">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive("bold"))} title="Negrita">
          <Bold className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive("italic"))} title="Cursiva">
          <Italic className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnClass(editor.isActive("heading", { level: 2 }))} title="Título 2">
          <Heading2 className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btnClass(editor.isActive("heading", { level: 3 }))} title="Título 3">
          <Heading3 className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive("bulletList"))} title="Lista">
          <List className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive("orderedList"))} title="Lista numerada">
          <ListOrdered className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btnClass(editor.isActive("blockquote"))} title="Cita">
          <Quote className="h-4 w-4" />
        </button>
        <div className="w-px bg-slate-300 mx-1" />
        <button type="button" onClick={addLink} className={btnClass(editor.isActive("link"))} title="Enlace">
          <LinkIcon className="h-4 w-4" />
        </button>
        <button type="button" onClick={addImage} className={btnClass(false)} title="Imagen por URL">
          <ImageIcon className="h-4 w-4" />
        </button>
        <button type="button" onClick={addYoutube} className={btnClass(false)} title="Video YouTube">
          <YoutubeIcon className="h-4 w-4" />
        </button>
        <div className="w-px bg-slate-300 mx-1" />
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className={btnClass(false)} title="Deshacer">
          <Undo className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className={btnClass(false)} title="Rehacer">
          <Redo className="h-4 w-4" />
        </button>
      </div>
      {/* Área de edición */}
      <EditorContent editor={editor} className="bg-white" />
    </div>
  );
}
