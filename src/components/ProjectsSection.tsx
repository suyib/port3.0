import { motion } from "framer-motion";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const projects = [
  {
    title: "FinTrack Dashboard",
    category: "Mobile App · UI/UX · Development",
    image: project1,
    description: "A comprehensive finance tracking app with real-time analytics and intuitive data visualization.",
  },
  {
    title: "Namely E-Commerce",
    category: "Web Design · Frontend · Shopify",
    image: project2,
    description: "A luxury fashion e-commerce platform with a focus on editorial-style product presentation.",
  },
  {
    title: "Mesthane Brand Identity",
    category: "Branding · Design System · Print",
    image: project3,
    description: "Complete brand identity system including logo, color palette, typography, and marketing collateral.",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-32">
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

        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:direction-rtl" : ""}`}
            >
              <div className={`overflow-hidden rounded-2xl bg-secondary ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-80 md:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <p className="font-body text-sm text-muted-foreground tracking-wide mb-3">{project.category}</p>
                <h3 className="font-display text-3xl md:text-4xl text-foreground mb-4">{project.title}</h3>
                <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">{project.description}</p>
                <a
                  href="#"
                  className="inline-flex items-center font-body text-sm font-medium text-foreground border-b-2 border-accent pb-1 hover:border-foreground transition-colors"
                >
                  View Case Study →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
