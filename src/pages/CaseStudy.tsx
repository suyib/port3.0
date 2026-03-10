import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
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
      <section className="pt-32 pb-20">
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
            <p className="font-body text-xl text-muted-foreground leading-relaxed">
              {project.overview}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
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
