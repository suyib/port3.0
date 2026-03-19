import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Zap, Code2 } from "lucide-react";
import { useProjects, useProject } from "@/hooks/useProjects";
import NotFound from "./NotFound";

const CaseStudy = () => {
  const { slug } = useParams<{slug: string;}>();
  const { data: project, isLoading } = useProject(slug || "");
  const { data: allProjects } = useProjects(true);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground animate-pulse">Loading project...</p>
      </main>);

  }

  if (!project) return <NotFound />;

  const currentIndex = allProjects?.findIndex((p) => p.slug === slug) ?? -1;
  const nextProject = allProjects && allProjects.length > 1 ?
  allProjects[(currentIndex + 1) % allProjects.length] :
  null;

  return (
    <main className="min-h-screen bg-background">
      {/* 1. HERO */}
      <section className="pt-24 pb-8">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">{project.category}</p>
            <h1 className="font-display text-5xl text-foreground mb-8 md:text-5xl my-[32px]">{project.headline}</h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border/40 rounded-2xl p-8">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-destructive mb-3 font-medium">The Challenge</p>
              <p className="font-body text-foreground leading-relaxed">{project.challenge}</p>
            </div>
            <div className="bg-card border border-border/40 rounded-2xl p-8">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-accent mb-3 font-medium">The Solution</p>
              <p className="font-body text-foreground leading-relaxed">{project.solution}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Meta bar */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.25 }} className="flex flex-wrap gap-x-12 gap-y-4">
            {project.role && (
              <div>
                <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">Role</p>
                <p className="font-body text-sm text-foreground">{project.role}</p>
              </div>
            )}
            {project.timeline && (
              <div>
                <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">Timeline</p>
                <p className="font-body text-sm text-foreground">{project.timeline}</p>
              </div>
            )}
            {project.stakeholders && (
              <div>
                <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">Stakeholders</p>
                <p className="font-body text-sm text-foreground">{project.stakeholders}</p>
              </div>
            )}
            {project.tools?.length > 0 && (
              <div>
                <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">Tools</p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) =>
                  <span key={tool} className="font-body text-sm text-foreground bg-secondary px-3 py-0.5 rounded-full">{tool}</span>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Gallery Images */}
      {(() => {
        const visibleImages = project.images?.filter((i) => i.visible) ?? [];
        const fallback = project.image_url ? [{ url: project.image_url, id: "fallback" }] : [];
        const images = visibleImages.length > 0 ? visibleImages : fallback;
        if (images.length === 0) return null;
        return (
          <motion.section initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="pb-24">
            <div className="container mx-auto px-6 lg:px-16 space-y-6">
              {images.map((img) =>
              <div key={img.id} className="overflow-hidden rounded-2xl">
                  <img src={img.url} alt={project.title} loading="lazy" className="w-full h-[400px] md:h-[560px] object-contain" />
                </div>
              )}
            </div>
          </motion.section>);

      })()}

      <Divider />

      {/* 2. PAIN POINTS */}
      {project.pain_points?.length > 0 &&
      <>
          <section className="py-24">
            <div className="container mx-auto px-6 lg:px-16">
              <SectionHeader label="User Pain Points" title="What Wasn't Working" />
              <div className="grid md:grid-cols-3 gap-8">
                {project.pain_points.map((point, i) =>
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center md:text-left">
                    <span className="text-4xl mb-4 block">{point.icon}</span>
                    <p className="font-body text-sm font-medium text-foreground mb-2">{point.label}</p>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{point.detail}</p>
                  </motion.div>
              )}
              </div>
            </div>
          </section>
          <Divider />
        </>
      }

      {/* 3. COMPARISON */}
      {project.comparison?.beforeLabel &&
      <>
          <section className="py-24">
            <div className="container mx-auto px-6 lg:px-16">
              <SectionHeader label="Evolution" title="Before → After" />
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-card border border-destructive/20 rounded-2xl p-8 relative">
                  <div className="absolute top-4 right-4">
                    <span className="font-body text-[10px] tracking-[0.2em] uppercase bg-destructive/10 text-destructive px-3 py-1 rounded-full">Before</span>
                  </div>
                  <h3 className="font-display text-2xl text-foreground mb-4 mt-4">{project.comparison.beforeLabel}</h3>
                  <p className="font-body text-muted-foreground leading-relaxed">{project.comparison.beforeDescription}</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-card border border-accent/30 rounded-2xl p-8 relative">
                  <div className="absolute top-4 right-4">
                    <span className="font-body text-[10px] tracking-[0.2em] uppercase bg-accent/10 text-accent px-3 py-1 rounded-full">After</span>
                  </div>
                  <h3 className="font-display text-2xl text-foreground mb-4 mt-4">{project.comparison.afterLabel}</h3>
                  <p className="font-body text-muted-foreground leading-relaxed">{project.comparison.afterDescription}</p>
                </motion.div>
              </div>
              {project.comparison.callout &&
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-8">
                  <div className="bg-accent/5 border border-accent/20 rounded-xl px-6 py-4 flex items-start gap-3">
                    <Zap size={18} className="text-accent flex-shrink-0 mt-0.5" />
                    <p className="font-body text-sm text-foreground leading-relaxed italic">{project.comparison.callout}</p>
                  </div>
                </motion.div>
            }
            </div>
          </section>
          <Divider />
        </>
      }

      {/* 4. PROCESS */}
      {project.process?.length > 0 &&
      <>
          <section className="py-24">
            <div className="container mx-auto px-6 lg:px-16">
              <SectionHeader label="Process" title="How I Got There" />
              <div className="space-y-16">
                {project.process.map((step, index) =>
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }} className="grid grid-cols-[60px_1fr] gap-6 items-start">
                    <span className="font-display text-5xl text-accent/25">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-display text-2xl text-foreground mb-3">{step.title}</h3>
                      <p className="font-body text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
              )}
              </div>
            </div>
          </section>
          <Divider />
        </>
      }

      {/* 5. TECH PIVOT */}
      {project.tech_pivot?.title &&
      <>
          <section className="py-24">
            <div className="container mx-auto px-6 lg:px-16">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">Technical Constraint</p>
                <h2 className="font-display text-4xl md:text-5xl text-foreground mb-10">{project.tech_pivot.title}</h2>
                <div className="bg-card border border-border/40 rounded-2xl p-8 md:p-10 relative">
                  <div className="absolute -top-3 left-8">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Code2 size={16} className="text-accent" />
                    </div>
                  </div>
                  <p className="font-body text-foreground leading-relaxed mt-2">{project.tech_pivot.description}</p>
                </div>
              </motion.div>
            </div>
          </section>
          <Divider />
        </>
      }

      {/* 6. COMPONENT STATES */}
      {project.component_states?.length > 0 &&
      <>
          <section className="py-24">
            <div className="container mx-auto px-6 lg:px-16">
              <SectionHeader label="UI Kit" title="Designing with States" subtitle="Every component was designed across its full lifecycle — not just the happy path." />
              <div className="space-y-6">
                {project.component_states.map((comp, index) =>
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 }} className="bg-card border border-border/40 rounded-xl p-6">
                    <p className="font-body text-sm font-medium text-foreground mb-3">{comp.component}</p>
                    <div className="flex flex-wrap gap-2">
                      {comp.states.map((state) =>
                  <span key={state} className="font-body text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">{state}</span>
                  )}
                    </div>
                  </motion.div>
              )}
              </div>
            </div>
          </section>
          <Divider />
        </>
      }

      {/* 7. OUTCOME */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <SectionHeader label="Results" title="Key Takeaways" />
          {project.takeaways?.length > 0 &&
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {project.takeaways.map((t, i) =>
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="bg-card border border-border/40 rounded-xl p-6 text-center">
                  <p className="font-display text-2xl md:text-3xl text-foreground mb-2">{t.value}</p>
                  <p className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">{t.label}</p>
                </motion.div>
            )}
            </div>
          }
          {project.outcome &&
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="font-body text-lg text-muted-foreground leading-relaxed">
              {project.outcome}
            </motion.p>
          }
        </div>
      </section>

      {/* NEXT PROJECT */}
      {nextProject &&
      <section className="py-24 bg-card">
          <div className="container mx-auto px-6 lg:px-16 text-center">
            <p className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Next Project</p>
            <Link to={`/project/${nextProject.slug}`} className="inline-flex items-center gap-3 font-display text-4xl md:text-5xl text-foreground hover:text-accent transition-colors">
              {nextProject.title}
              <ArrowRight size={32} className="opacity-50" />
            </Link>
          </div>
        </section>
      }
    </main>);

};

// Helpers
const Divider = () =>
<div className="container mx-auto px-6 lg:px-16"><div className="border-t border-border/40" /></div>;


const SectionHeader = ({ label, title, subtitle }: {label: string;title: string;subtitle?: string;}) =>
<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
    <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">{label}</p>
    <h2 className="font-display text-4xl md:text-5xl text-foreground">{title}</h2>
    {subtitle && <p className="font-body text-lg text-muted-foreground leading-relaxed mt-4">{subtitle}</p>}
  </motion.div>;


export default CaseStudy;