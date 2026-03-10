import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useProjects, useSaveProject, useDeleteProject, useUploadProjectImage } from "@/hooks/useProjects";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Plus, Pencil, Trash2, Eye, Upload, Save, X, GripVertical } from "lucide-react";
import type { Project, PainPoint, ProcessStep, ComponentState, Takeaway } from "@/types/project";
import { toast } from "sonner";

const emptyProject: Omit<Project, "id"> = {
  slug: "",
  title: "",
  category: "",
  image_url: "",
  description: "",
  headline: "",
  challenge: "",
  solution: "",
  role: "",
  timeline: "",
  tools: [],
  pain_points: [
    { icon: "🛑", label: "", detail: "" },
    { icon: "📉", label: "", detail: "" },
    { icon: "🕒", label: "", detail: "" },
  ],
  comparison: { beforeLabel: "", beforeDescription: "", afterLabel: "", afterDescription: "", callout: "" },
  process: [
    { title: "", description: "" },
    { title: "", description: "" },
    { title: "", description: "" },
  ],
  tech_pivot: { title: "", description: "" },
  component_states: [{ component: "", states: [""] }],
  takeaways: [{ label: "", value: "" }],
  outcome: "",
  sort_order: 0,
  published: false,
};

const Admin = () => {
  const { session, loading: authLoading, signOut } = useAuth();
  const { data: projects, isLoading } = useProjects(false);
  const saveProject = useSaveProject();
  const deleteProject = useDeleteProject();
  const uploadImage = useUploadProjectImage();

  const [editing, setEditing] = useState<(Partial<Project> & { slug: string; title: string }) | null>(null);
  const [toolInput, setToolInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  if (authLoading) return null;
  if (!session) return <Navigate to="/login" replace />;

  const handleNew = () => {
    setEditing({ ...emptyProject } as any);
    setToolInput("");
  };

  const handleEdit = (project: Project) => {
    setEditing({ ...project });
    setToolInput(project.tools.join(", "));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await deleteProject.mutateAsync(id);
    toast.success("Project deleted");
  };

  const handleSave = async () => {
    if (!editing) return;

    let imageUrl = editing.image_url || "";

    if (imageFile) {
      try {
        imageUrl = await uploadImage.mutateAsync(imageFile);
      } catch (e: any) {
        toast.error("Image upload failed: " + e.message);
        return;
      }
    }

    try {
      await saveProject.mutateAsync({
        ...editing,
        image_url: imageUrl,
        tools: toolInput.split(",").map((t) => t.trim()).filter(Boolean),
      });
      toast.success(editing.id ? "Project updated" : "Project created");
      setEditing(null);
      setImageFile(null);
    } catch (e: any) {
      toast.error("Save failed: " + e.message);
    }
  };

  const updateField = (field: string, value: any) => {
    setEditing((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const updatePainPoint = (index: number, field: keyof PainPoint, value: string) => {
    setEditing((prev) => {
      if (!prev) return prev;
      const pp = [...(prev.pain_points || [])];
      pp[index] = { ...pp[index], [field]: value };
      return { ...prev, pain_points: pp };
    });
  };

  const updateProcess = (index: number, field: keyof ProcessStep, value: string) => {
    setEditing((prev) => {
      if (!prev) return prev;
      const p = [...(prev.process || [])];
      p[index] = { ...p[index], [field]: value };
      return { ...prev, process: p };
    });
  };

  const updateComponentState = (index: number, field: string, value: any) => {
    setEditing((prev) => {
      if (!prev) return prev;
      const cs = [...(prev.component_states || [])];
      cs[index] = { ...cs[index], [field]: value };
      return { ...prev, component_states: cs };
    });
  };

  const updateTakeaway = (index: number, field: keyof Takeaway, value: string) => {
    setEditing((prev) => {
      if (!prev) return prev;
      const t = [...(prev.takeaways || [])];
      t[index] = { ...t[index], [field]: value };
      return { ...prev, takeaways: t };
    });
  };

  // List view
  if (!editing) {
    return (
      <main className="min-h-screen bg-background">
        <nav className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-6 lg:px-16 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft size={16} /> Back to Site
              </Link>
              <h1 className="font-display text-xl text-foreground">Project Manager</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handleNew} size="sm">
                <Plus size={16} className="mr-1" /> New Project
              </Button>
              <Button variant="ghost" size="sm" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-6 lg:px-16 py-12">
          {isLoading ? (
            <p className="text-muted-foreground">Loading projects...</p>
          ) : !projects?.length ? (
            <div className="text-center py-24">
              <p className="text-muted-foreground mb-4">No projects yet</p>
              <Button onClick={handleNew}><Plus size={16} className="mr-1" /> Create Your First Project</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-card border border-border/40 rounded-xl p-6 flex items-center gap-6"
                >
                  <GripVertical size={18} className="text-muted-foreground/40" />
                  {project.image_url && (
                    <img src={project.image_url} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-display text-lg text-foreground truncate">{project.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${project.published ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"}`}>
                        {project.published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <p className="font-body text-sm text-muted-foreground truncate">{project.category}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/project/${project.slug}`} target="_blank"><Eye size={16} /></Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(project)}>
                      <Pencil size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    );
  }

  // Edit view
  return (
    <main className="min-h-screen bg-background">
      <nav className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 lg:px-16 py-4 flex items-center justify-between">
          <button onClick={() => setEditing(null)} className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Back to List
          </button>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Published</span>
              <Switch
                checked={editing.published ?? false}
                onCheckedChange={(v) => updateField("published", v)}
              />
            </div>
            <Button onClick={handleSave} disabled={saveProject.isPending || uploadImage.isPending}>
              <Save size={16} className="mr-1" />
              {saveProject.isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 lg:px-16 py-12 max-w-4xl space-y-12">
        {/* Basic Info */}
        <Section title="Basic Info">
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Title" value={editing.title} onChange={(v) => updateField("title", v)} />
            <Field label="Slug" value={editing.slug} onChange={(v) => updateField("slug", v)} placeholder="my-project-name" />
            <Field label="Category" value={editing.category || ""} onChange={(v) => updateField("category", v)} placeholder="UI/UX · Mobile · Development" />
            <Field label="Role" value={editing.role || ""} onChange={(v) => updateField("role", v)} />
            <Field label="Timeline" value={editing.timeline || ""} onChange={(v) => updateField("timeline", v)} placeholder="8 weeks" />
            <Field label="Sort Order" value={String(editing.sort_order ?? 0)} onChange={(v) => updateField("sort_order", parseInt(v) || 0)} type="number" />
          </div>
          <Field label="Tools (comma-separated)" value={toolInput} onChange={setToolInput} placeholder="Figma, React, Tailwind CSS" />
          <TextareaField label="Short Description" value={editing.description || ""} onChange={(v) => updateField("description", v)} rows={2} />
        </Section>

        {/* Image */}
        <Section title="Project Image">
          <div className="flex items-start gap-6">
            {(editing.image_url || imageFile) && (
              <img
                src={imageFile ? URL.createObjectURL(imageFile) : editing.image_url}
                alt="Preview"
                className="w-40 h-28 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <label className="cursor-pointer inline-flex items-center gap-2 bg-secondary hover:bg-secondary/80 px-4 py-2 rounded-lg text-sm font-body transition-colors">
                <Upload size={16} />
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
              </label>
              {editing.image_url && (
                <p className="text-xs text-muted-foreground mt-2 truncate max-w-sm">{editing.image_url}</p>
              )}
            </div>
          </div>
        </Section>

        {/* Hero */}
        <Section title="Hero Section">
          <Field label="Headline" value={editing.headline || ""} onChange={(v) => updateField("headline", v)} placeholder="From Data Overload to Daily Clarity" />
          <TextareaField label="The Challenge" value={editing.challenge || ""} onChange={(v) => updateField("challenge", v)} rows={3} />
          <TextareaField label="The Solution" value={editing.solution || ""} onChange={(v) => updateField("solution", v)} rows={3} />
        </Section>

        {/* Pain Points */}
        <Section title="Pain Points">
          {(editing.pain_points || []).map((pp: PainPoint, i: number) => (
            <div key={i} className="grid grid-cols-[60px_1fr_2fr] gap-3 items-start">
              <Field label="Icon" value={pp.icon} onChange={(v) => updatePainPoint(i, "icon", v)} />
              <Field label="Label" value={pp.label} onChange={(v) => updatePainPoint(i, "label", v)} />
              <Field label="Detail" value={pp.detail} onChange={(v) => updatePainPoint(i, "detail", v)} />
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              updateField("pain_points", [...(editing.pain_points || []), { icon: "💡", label: "", detail: "" }])
            }
          >
            <Plus size={14} className="mr-1" /> Add Pain Point
          </Button>
        </Section>

        {/* Comparison */}
        <Section title="Before → After Comparison">
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Before Label" value={editing.comparison?.beforeLabel || ""} onChange={(v) => updateField("comparison", { ...editing.comparison, beforeLabel: v })} />
            <Field label="After Label" value={editing.comparison?.afterLabel || ""} onChange={(v) => updateField("comparison", { ...editing.comparison, afterLabel: v })} />
          </div>
          <TextareaField label="Before Description" value={editing.comparison?.beforeDescription || ""} onChange={(v) => updateField("comparison", { ...editing.comparison, beforeDescription: v })} rows={3} />
          <TextareaField label="After Description" value={editing.comparison?.afterDescription || ""} onChange={(v) => updateField("comparison", { ...editing.comparison, afterDescription: v })} rows={3} />
          <TextareaField label="Callout" value={editing.comparison?.callout || ""} onChange={(v) => updateField("comparison", { ...editing.comparison, callout: v })} rows={2} />
        </Section>

        {/* Process */}
        <Section title="Process Steps">
          {(editing.process || []).map((step: ProcessStep, i: number) => (
            <div key={i} className="space-y-2 bg-secondary/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">Step {i + 1}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => {
                  const p = [...(editing.process || [])];
                  p.splice(i, 1);
                  updateField("process", p);
                }}>
                  <X size={12} />
                </Button>
              </div>
              <Field label="Title" value={step.title} onChange={(v) => updateProcess(i, "title", v)} />
              <TextareaField label="Description" value={step.description} onChange={(v) => updateProcess(i, "description", v)} rows={3} />
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => updateField("process", [...(editing.process || []), { title: "", description: "" }])}>
            <Plus size={14} className="mr-1" /> Add Step
          </Button>
        </Section>

        {/* Tech Pivot */}
        <Section title="Technical Constraint">
          <Field label="Title" value={editing.tech_pivot?.title || ""} onChange={(v) => updateField("tech_pivot", { ...editing.tech_pivot, title: v })} />
          <TextareaField label="Description" value={editing.tech_pivot?.description || ""} onChange={(v) => updateField("tech_pivot", { ...editing.tech_pivot, description: v })} rows={4} />
        </Section>

        {/* Component States */}
        <Section title="UI Kit — Component States">
          {(editing.component_states || []).map((cs: ComponentState, i: number) => (
            <div key={i} className="space-y-2 bg-secondary/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <Field label="Component Name" value={cs.component} onChange={(v) => updateComponentState(i, "component", v)} />
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => {
                  const arr = [...(editing.component_states || [])];
                  arr.splice(i, 1);
                  updateField("component_states", arr);
                }}>
                  <X size={12} />
                </Button>
              </div>
              <Field
                label="States (comma-separated)"
                value={(cs.states || []).join(", ")}
                onChange={(v) => updateComponentState(i, "states", v.split(",").map((s) => s.trim()).filter(Boolean))}
              />
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => updateField("component_states", [...(editing.component_states || []), { component: "", states: [""] }])}>
            <Plus size={14} className="mr-1" /> Add Component
          </Button>
        </Section>

        {/* Takeaways */}
        <Section title="Key Takeaways">
          {(editing.takeaways || []).map((t: Takeaway, i: number) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-3 items-end">
              <Field label="Label" value={t.label} onChange={(v) => updateTakeaway(i, "label", v)} placeholder="Conversion Rate" />
              <Field label="Value" value={t.value} onChange={(v) => updateTakeaway(i, "value", v)} placeholder="+28%" />
              <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => {
                const arr = [...(editing.takeaways || [])];
                arr.splice(i, 1);
                updateField("takeaways", arr);
              }}>
                <X size={14} />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => updateField("takeaways", [...(editing.takeaways || []), { label: "", value: "" }])}>
            <Plus size={14} className="mr-1" /> Add Takeaway
          </Button>
        </Section>

        {/* Outcome */}
        <Section title="Outcome">
          <TextareaField label="Summary" value={editing.outcome || ""} onChange={(v) => updateField("outcome", v)} rows={4} />
        </Section>

        <div className="flex justify-end pb-12">
          <Button onClick={handleSave} size="lg" disabled={saveProject.isPending || uploadImage.isPending}>
            <Save size={16} className="mr-2" />
            {saveProject.isPending ? "Saving..." : "Save Project"}
          </Button>
        </div>
      </div>
    </main>
  );
};

// Helper components
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <h2 className="font-display text-2xl text-foreground border-b border-border/40 pb-2">{title}</h2>
    {children}
  </div>
);

const Field = ({
  label, value, onChange, placeholder, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) => (
  <div className="space-y-1">
    <label className="font-body text-xs text-muted-foreground">{label}</label>
    <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
  </div>
);

const TextareaField = ({
  label, value, onChange, rows = 3,
}: {
  label: string; value: string; onChange: (v: string) => void; rows?: number;
}) => (
  <div className="space-y-1">
    <label className="font-body text-xs text-muted-foreground">{label}</label>
    <Textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} />
  </div>
);

export default Admin;
