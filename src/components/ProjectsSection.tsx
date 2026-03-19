import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useProjects } from "@/hooks/useProjects";

const ProjectsSection = () => {
  const { data: projects, isLoading } = useProjects(true);

  return (
    <section id="projects" className="py-12">
      <div className="container mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">Selected Work</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">Projects</h2>
        </motion.div>

        {isLoading ? (
          <div className="space-y-24">
            {[1, 2, 3].map((i) => (
              <div key={i} className="grid lg:grid-cols-2 gap-12 items-center animate-pulse">
                <div className="bg-secondary rounded-2xl h-80 md:h-[480px]" />
                <div className="space-y-4">
                  <div className="h-4 bg-secondary rounded w-1/3" />
                  <div className="h-8 bg-secondary rounded w-2/3" />
                  <div className="h-20 bg-secondary rounded" />
                  <div className="h-4 bg-secondary rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : !projects?.length ? (
          <p className="font-body text-muted-foreground text-center py-12">No projects published yet.</p>
        ) : (
          <div className="space-y-24">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:direction-rtl" : ""}`}
              >
                <div className={`overflow-hidden rounded-2xl bg-secondary ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <img
                    src={project.images?.find((i) => i.visible)?.url || project.image_url}
                    alt={project.title}
                    className="w-full h-80 md:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.category.split(",").map((tag) => tag.trim()).filter(Boolean).map((tag) => (
                      <span key={tag} className="font-body text-xs text-muted-foreground tracking-wide bg-secondary px-2.5 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl text-foreground mb-4">{project.title}</h3>
                  <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">{project.description}</p>
                  <Link
                    to={`/project/${project.slug}`}
                    className="inline-flex items-center font-body text-sm font-medium text-foreground border-b-2 border-accent pb-1 hover:border-foreground transition-colors"
                  >
                    View Case Study →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Projects button */}
        {!isLoading && projects && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-16"
          >
            <Link
              to="/projects"
              className="inline-flex items-center font-body text-sm font-medium text-foreground border-2 border-foreground/20 px-8 py-3 rounded-full hover:bg-foreground hover:text-background transition-all duration-300"
            >
              View All Projects →
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
