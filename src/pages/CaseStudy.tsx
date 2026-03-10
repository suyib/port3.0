import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Zap, Code2 } from "lucide-react";
import { projects } from "@/data/projects";
import NotFound from "./NotFound";

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <NotFound />;

  return (
    <main className="min-h-screen bg-background">
      {/* Back Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="container mx-auto px-6 lg:px-16 py-4">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>
        </div>
      </nav>

      {/* ──────────────────────────────────────────────
          1. HERO — The Hook
      ────────────────────────────────────────────── */}
      <section className="pt-32 pb-8">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className=""
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">
              {project.category}
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-foreground mb-8">
              {project.headline}
            </h1>
          </motion.div>

          {/* Challenge / Solution cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="grid md:grid-cols-2 gap-6 max-w-4xl"
          >
            <div className="bg-card border border-border/40 rounded-2xl p-8">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-destructive mb-3 font-medium">
                The Challenge
              </p>
              <p className="font-body text-foreground leading-relaxed">
                {project.challenge}
              </p>
            </div>
            <div className="bg-card border border-border/40 rounded-2xl p-8">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-accent mb-3 font-medium">
                The Solution
              </p>
              <p className="font-body text-foreground leading-relaxed">
                {project.solution}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Meta bar */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap gap-x-12 gap-y-4 max-w-4xl"
          >
            <div>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">Role</p>
              <p className="font-body text-sm text-foreground">{project.role}</p>
            </div>
            <div>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">Timeline</p>
              <p className="font-body text-sm text-foreground">{project.timeline}</p>
            </div>
            <div>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">Tools</p>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span key={tool} className="font-body text-sm text-foreground bg-secondary px-3 py-0.5 rounded-full">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="pb-24"
      >
        <div className="container mx-auto px-6 lg:px-16">
          <div className="overflow-hidden rounded-2xl">
            <img src={project.image} alt={project.title} className="w-full h-[400px] md:h-[560px] object-cover" />
          </div>
        </div>
      </motion.section>

      <div className="container mx-auto px-6 lg:px-16"><div className="border-t border-border/40" /></div>

      {/* ──────────────────────────────────────────────
          2. PAIN POINTS — Icons + 1 Sentence
      ────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">User Pain Points</p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">What Wasn't Working</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl">
            {project.painPoints.map((point, i) => (
              <motion.div
                key={point.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center md:text-left"
              >
                <span className="text-4xl mb-4 block">{point.icon}</span>
                <p className="font-body text-sm font-medium text-foreground mb-2">{point.label}</p>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{point.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 lg:px-16"><div className="border-t border-border/40" /></div>

      {/* ──────────────────────────────────────────────
          3. COMPARISON — Show, Don't Tell
      ────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">Evolution</p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">Before → After</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card border border-destructive/20 rounded-2xl p-8 relative"
            >
              <div className="absolute top-4 right-4">
                <span className="font-body text-[10px] tracking-[0.2em] uppercase bg-destructive/10 text-destructive px-3 py-1 rounded-full">
                  Before
                </span>
              </div>
              <h3 className="font-display text-2xl text-foreground mb-4 mt-4">{project.comparison.beforeLabel}</h3>
              <p className="font-body text-muted-foreground leading-relaxed">{project.comparison.beforeDescription}</p>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card border border-accent/30 rounded-2xl p-8 relative"
            >
              <div className="absolute top-4 right-4">
                <span className="font-body text-[10px] tracking-[0.2em] uppercase bg-accent/10 text-accent px-3 py-1 rounded-full">
                  After
                </span>
              </div>
              <h3 className="font-display text-2xl text-foreground mb-4 mt-4">{project.comparison.afterLabel}</h3>
              <p className="font-body text-muted-foreground leading-relaxed">{project.comparison.afterDescription}</p>
            </motion.div>
          </div>

          {/* Callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 max-w-5xl"
          >
            <div className="bg-accent/5 border border-accent/20 rounded-xl px-6 py-4 flex items-start gap-3">
              <Zap size={18} className="text-accent flex-shrink-0 mt-0.5" />
              <p className="font-body text-sm text-foreground leading-relaxed italic">
                {project.comparison.callout}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 lg:px-16"><div className="border-t border-border/40" /></div>

      {/* ──────────────────────────────────────────────
          4. PROCESS — Lean (max 3 steps)
      ────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">Process</p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">How I Got There</h2>
          </motion.div>

          <div className="space-y-16 max-w-3xl">
            {project.process.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-[60px_1fr] gap-6 items-start"
              >
                <span className="font-display text-5xl text-accent/25">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-2xl text-foreground mb-3">{step.title}</h3>
                  <p className="font-body text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 lg:px-16"><div className="border-t border-border/40" /></div>

      {/* ──────────────────────────────────────────────
          5. TECHNICAL PIVOT — The "Senior" Move
      ────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">Technical Constraint</p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-10">
              {project.techPivot.title}
            </h2>
            <div className="bg-card border border-border/40 rounded-2xl p-8 md:p-10 relative">
              <div className="absolute -top-3 left-8">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Code2 size={16} className="text-accent" />
                </div>
              </div>
              <p className="font-body text-foreground leading-relaxed mt-2">
                {project.techPivot.description}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 lg:px-16"><div className="border-t border-border/40" /></div>

      {/* ──────────────────────────────────────────────
          6. MICRO DESIGN SYSTEM — Component States
      ────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 max-w-3xl"
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">UI Kit</p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              Designing with States
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Every component was designed across its full lifecycle — not just the happy path.
            </p>
          </motion.div>

          <div className="space-y-6 max-w-4xl">
            {project.componentStates.map((comp, index) => (
              <motion.div
                key={comp.component}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-card border border-border/40 rounded-xl p-6"
              >
                <p className="font-body text-sm font-medium text-foreground mb-3">{comp.component}</p>
                <div className="flex flex-wrap gap-2">
                  {comp.states.map((state) => (
                    <span
                      key={state}
                      className="font-body text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-full"
                    >
                      {state}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 lg:px-16"><div className="border-t border-border/40" /></div>

      {/* ──────────────────────────────────────────────
          7. OUTCOME — Scannable Takeaways
      ────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">Results</p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">Key Takeaways</h2>
          </motion.div>

          {/* Metric cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mb-12">
            {project.takeaways.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-card border border-border/40 rounded-xl p-6 text-center"
              >
                <p className="font-display text-2xl md:text-3xl text-foreground mb-2">{t.value}</p>
                <p className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">{t.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-body text-lg text-muted-foreground leading-relaxed max-w-3xl"
          >
            {project.outcome}
          </motion.p>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          NEXT PROJECT
      ────────────────────────────────────────────── */}
      {(() => {
        const currentIndex = projects.findIndex((p) => p.slug === slug);
        const nextProject = projects[(currentIndex + 1) % projects.length];
        return (
          <section className="py-24 bg-card">
            <div className="container mx-auto px-6 lg:px-16 text-center">
              <p className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
                Next Project
              </p>
              <Link
                to={`/project/${nextProject.slug}`}
                className="inline-flex items-center gap-3 font-display text-4xl md:text-5xl text-foreground hover:text-accent transition-colors"
              >
                {nextProject.title}
                <ArrowRight size={32} className="opacity-50" />
              </Link>
            </div>
          </section>
        );
      })()}
    </main>
  );
};

export default CaseStudy;
