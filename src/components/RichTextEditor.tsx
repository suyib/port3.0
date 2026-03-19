import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, ListOrdered, Undo, Redo } from "lucide-react";
import { useEffect } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const RichTextEditor = ({ value, onChange, label }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  if (!editor) return null;

  const btn = (active: boolean) =>
    `h-7 w-7 flex items-center justify-center rounded transition-colors ${
      active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
    }`;

  return (
    <div className="space-y-1">
      {label && <label className="font-body text-xs text-muted-foreground">{label}</label>}
      <div className="border border-input rounded-md bg-background overflow-hidden">
        <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-input bg-secondary/30">
          <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btn(editor.isActive("bold"))}>
            <Bold size={14} />
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btn(editor.isActive("italic"))}>
            <Italic size={14} />
          </button>
          <div className="w-px h-4 bg-border mx-1" />
          <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btn(editor.isActive("bulletList"))}>
            <List size={14} />
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btn(editor.isActive("orderedList"))}>
            <ListOrdered size={14} />
          </button>
          <div className="w-px h-4 bg-border mx-1" />
          <button type="button" onClick={() => editor.chain().focus().undo().run()} className={btn(false)}>
            <Undo size={14} />
          </button>
          <button type="button" onClick={() => editor.chain().focus().redo().run()} className={btn(false)}>
            <Redo size={14} />
          </button>
        </div>
        <EditorContent editor={editor} className="prose prose-sm max-w-none px-3 py-2 min-h-[80px] text-sm [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[60px]" />
      </div>
    </div>
  );
};

export default RichTextEditor;
