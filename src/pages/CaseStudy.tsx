import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X, Zap, Code2 } from "lucide-react";
import { useProjects, useProject } from "@/hooks/useProjects";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import NotFound from "./NotFound";

const CaseStudy = () => {
  const { slug } = useParams<{slug: string;}>();
  const { data: project, isLoading } = useProject(slug || "");
  const { data: allProjects } = useProjects(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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

  const visibleGalleryImages = project.images?.filter((i) => i.visible) ?? [];

  return (
    <main className="min-h-screen bg-background">
      {/* 1. HERO */}
      <section className="pt-24 pb-8">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">{project.category}</p>
            <h1 className="font-display text-5xl text-foreground mb-8 md:text-5xl my-[32px]">{project.headline}</h1>
          </motion.div>

          {/* Meta bar — moved above challenge/solution */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-wrap gap-x-12 gap-y-4 mb-10">
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

          {project.meta_description && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.12 }} className="mb-10">
              <div className="font-body text-muted-foreground leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: project.meta_description }} />
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border/40 rounded-2xl p-8">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-destructive mb-3 font-medium">The Challenge</p>
              <div className="font-body text-foreground leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: project.challenge }} />
            </div>
            <div className="bg-card border border-border/40 rounded-2xl p-8">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-accent mb-3 font-medium">The Solution</p>
              <div className="font-body text-foreground leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: project.solution }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cover Image */}
      {project.image_url && (
        <motion.section initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="pb-12">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="overflow-hidden rounded-2xl">
              <img src={project.image_url} alt={project.title} loading="lazy" className="w-full h-[400px] md:h-[560px] object-contain" />
              {project.cover_caption && (
                <p className="font-body text-xs text-muted-foreground mt-2 text-center italic">{project.cover_caption}</p>
              )}
            </div>
          </div>
        </motion.section>
      )}

      {/* Gallery Carousel */}
      {visibleGalleryImages.length > 0 && (
        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="pb-24">
          <div className="container mx-auto px-6 lg:px-16">
            <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">Gallery</p>
            <Carousel opts={{ align: "start", loop: visibleGalleryImages.length > 2 }} className="w-full">
              <CarouselContent className="-ml-4">
                {visibleGalleryImages.map((img, idx) => (
                  <CarouselItem key={img.id} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                    <button
                      onClick={() => setLightboxIndex(idx)}
                      className="block w-full overflow-hidden rounded-xl bg-secondary cursor-pointer group"
                    >
                      <img
                        src={img.url}
                        alt={img.caption || project.title}
                        loading="lazy"
                        className="w-full h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </button>
                    {img.caption && (
                      <p className="font-body text-xs text-muted-foreground mt-2 text-center italic">{img.caption}</p>
                    )}
                  </CarouselItem>
                ))}
              </CarouselContent>
              {visibleGalleryImages.length > 1 && (
                <>
                  <CarouselPrevious className="-left-4 md:-left-5" />
                  <CarouselNext className="-right-4 md:-right-5" />
                </>
              )}
            </Carousel>
          </div>
        </motion.section>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && visibleGalleryImages[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
            >
              <X size={28} />
            </button>

            {visibleGalleryImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + visibleGalleryImages.length) % visibleGalleryImages.length); }}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10"
                >
                  <ArrowLeft size={32} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % visibleGalleryImages.length); }}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10"
                >
                  <ArrowRight size={32} />
                </button>
              </>
            )}

            <div className="max-w-5xl max-h-[85vh] px-12" onClick={(e) => e.stopPropagation()}>
              <img
                src={visibleGalleryImages[lightboxIndex].url}
                alt={visibleGalleryImages[lightboxIndex].caption || project.title}
                className="max-w-full max-h-[80vh] object-contain mx-auto rounded-lg"
              />
              {visibleGalleryImages[lightboxIndex].caption && (
                <p className="text-white/70 text-sm text-center mt-4 italic">{visibleGalleryImages[lightboxIndex].caption}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                  <div className="font-body text-muted-foreground leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: project.comparison.beforeDescription }} />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-card border border-accent/30 rounded-2xl p-8 relative">
                  <div className="absolute top-4 right-4">
                    <span className="font-body text-[10px] tracking-[0.2em] uppercase bg-accent/10 text-accent px-3 py-1 rounded-full">After</span>
                  </div>
                  <h3 className="font-display text-2xl text-foreground mb-4 mt-4">{project.comparison.afterLabel}</h3>
                  <div className="font-body text-muted-foreground leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: project.comparison.afterDescription }} />
                </motion.div>
              </div>
              {project.comparison.callout &&
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-8">
                  <div className="bg-accent/5 border border-accent/20 rounded-xl px-6 py-4 flex items-start gap-3">
                    <Zap size={18} className="text-accent flex-shrink-0 mt-0.5" />
                    <div className="font-body text-sm text-foreground leading-relaxed italic prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: project.comparison.callout }} />
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
                      <div className="font-body text-muted-foreground leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: step.description }} />
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
                  <div className="font-body text-foreground leading-relaxed mt-2 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: project.tech_pivot.description }} />
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
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="font-body text-lg text-muted-foreground leading-relaxed prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: project.outcome }} />
          }
        </div>
      </section>

      {/* 8. ITERATIONS */}
      {project.iterations?.length > 0 && (
        <>
          <Divider />
          <section className="py-24">
            <div className="container mx-auto px-6 lg:px-16">
              <SectionHeader label="Iterations" title="Design Evolution" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {project.iterations.map((iter, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="bg-card border border-border/40 rounded-2xl overflow-hidden"
                  >
                    <button
                      className="block w-full cursor-pointer group"
                      onClick={() => setLightboxIndex(visibleGalleryImages.length + i)}
                    >
                      <img
                        src={iter.url}
                        alt={iter.caption || `Iteration ${i + 1}`}
                        loading="lazy"
                        className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </button>
                    {iter.caption && (
                      <p className="font-body text-xs text-muted-foreground text-center italic p-3">{iter.caption}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

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