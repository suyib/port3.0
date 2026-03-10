import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Lightbulb, Layers, AlertTriangle, Target, Code2, Zap } from "lucide-react";
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

      {/* Hero */}
      <section className="pt-32 pb-6">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">
              {project.category}
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-foreground mb-6">
              {project.title}
            </h1>
            <p className="font-body text-xl md:text-2xl text-foreground/80 leading-relaxed mb-4 font-medium">
              {project.tagline}
            </p>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              {project.overview}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="pb-12">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-3xl flex items-start gap-4 bg-secondary/50 border border-border/30 rounded-xl p-5"
          >
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Target size={16} className="text-accent" />
            </div>
            <div>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">
                Target Audience
              </p>
              <p className="font-body text-foreground leading-relaxed">
                {project.targetAudience}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem & Goal */}
      <section className="pb-16">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card border border-border/40 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle size={16} className="text-destructive" />
                </div>
                <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  The Problem
                </p>
              </div>
              <p className="font-body text-foreground leading-relaxed">
                {project.problem}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card border border-border/40 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <Lightbulb size={16} className="text-accent" />
                </div>
                <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  The Goal
                </p>
              </div>
              <p className="font-body text-foreground leading-relaxed">
                {project.goal}
              </p>
            </motion.div>
          </div>
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
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-[400px] md:h-[560px] object-cover"
            />
          </div>
        </div>
      </motion.section>

      {/* Project Details */}
      <section className="pb-24">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid md:grid-cols-3 gap-12 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
                Role
              </p>
              <p className="font-body text-foreground">{project.role}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
                Timeline
              </p>
              <p className="font-body text-foreground">{project.timeline}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
                Tools
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="font-body text-sm text-foreground bg-secondary px-3 py-1 rounded-full"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6 lg:px-16">
        <div className="border-t border-border/40" />
      </div>

      {/* Design Process */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">
              Process
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">
              Design Journey
            </h2>
          </motion.div>

          <div className="space-y-20">
            {project.phases.map((phase, index) => (
              <motion.div
                key={phase.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="grid lg:grid-cols-[120px_1fr] gap-8 items-start"
              >
                <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                  <span className="font-display text-5xl text-accent/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="max-w-2xl">
                  <h3 className="font-display text-2xl md:text-3xl text-foreground mb-4">
                    {phase.title}
                  </h3>
                  <p className="font-body text-lg text-muted-foreground leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6 lg:px-16">
        <div className="border-t border-border/40" />
      </div>

      {/* Design Decisions */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">
              Rationale
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">
              Key Design Decisions
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {project.annotations.map((annotation, index) => (
              <motion.div
                key={annotation.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border/40 rounded-2xl p-8"
              >
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-5">
                  <Lightbulb size={18} className="text-accent" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-3">
                  {annotation.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {annotation.insight}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6 lg:px-16">
        <div className="border-t border-border/40" />
      </div>

      {/* Edge Cases — NEW */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 max-w-3xl"
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">
              Edge Cases
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              Thinking Beyond the Happy Path
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Great design handles the exceptions as gracefully as the ideal scenario.
            </p>
          </motion.div>

          <div className="space-y-6 max-w-3xl">
            {project.edgeCases.map((edgeCase, index) => (
              <motion.div
                key={edgeCase.scenario}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border/40 rounded-xl p-6 md:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap size={16} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium text-foreground mb-2">
                      {edgeCase.scenario}
                    </p>
                    <p className="font-body text-muted-foreground leading-relaxed">
                      {edgeCase.solution}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6 lg:px-16">
        <div className="border-t border-border/40" />
      </div>

      {/* Design System */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 max-w-3xl"
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">
              System
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              Component Library
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Beyond individual screens, I built a scalable system to ensure consistency across the product.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {project.systemItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="flex gap-4 items-start bg-card border border-border/40 rounded-xl p-6"
              >
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Layers size={16} className="text-foreground" />
                </div>
                <div>
                  <p className="font-body text-sm font-medium text-foreground mb-1">
                    {item.label}
                  </p>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6 lg:px-16">
        <div className="border-t border-border/40" />
      </div>

      {/* Tech Stack — NEW */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 max-w-3xl"
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">
              Technology
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              Tech Stack
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Design decisions don't exist in a vacuum — here's how the frontend connects to the backend.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {project.techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="flex gap-4 items-start bg-card border border-border/40 rounded-xl p-6"
              >
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Code2 size={16} className="text-accent" />
                </div>
                <div>
                  <p className="font-body text-sm font-medium text-foreground mb-1">
                    {tech.name}
                  </p>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {tech.purpose}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6 lg:px-16">
        <div className="border-t border-border/40" />
      </div>

      {/* Constraint / Reflection */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">
              Reflection
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-8">
              Key Constraint
            </h2>
            <div className="bg-card border border-border/40 rounded-2xl p-8 md:p-10">
              <p className="font-body text-lg text-foreground leading-relaxed italic">
                "{project.constraint}"
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6 lg:px-16">
        <div className="border-t border-border/40" />
      </div>

      {/* Outcome */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">
              Results
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-8">
              Outcome
            </h2>
            <p className="font-body text-xl text-muted-foreground leading-relaxed">
              {project.outcome}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Next Project */}
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
                className="font-display text-4xl md:text-5xl text-foreground hover:text-accent transition-colors"
              >
                {nextProject.title}
              </Link>
            </div>
          </section>
        );
      })()}
    </main>
  );
};

export default CaseStudy;
