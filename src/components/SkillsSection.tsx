import { motion } from "framer-motion";

const designSkills = ["UI/UX Design", "Design Systems", "Prototyping", "Brand Identity", "Motion Design", "Illustration"];
const devSkills = ["React / Next.js", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL", "REST & GraphQL"];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase opacity-60 mb-4">Capabilities</p>
          <h2 className="font-display text-4xl md:text-5xl">What I bring to the table.</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-display text-2xl mb-8">Design</h3>
            <div className="space-y-4">
              {designSkills.map((skill) => (
                <div key={skill} className="flex items-center justify-between py-3 border-b border-primary-foreground/20">
                  <span className="font-body">{skill}</span>
                  <span className="w-2 h-2 rounded-full bg-accent" />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-display text-2xl mb-8">Development</h3>
            <div className="space-y-4">
              {devSkills.map((skill) => (
                <div key={skill} className="flex items-center justify-between py-3 border-b border-primary-foreground/20">
                  <span className="font-body">{skill}</span>
                  <span className="w-2 h-2 rounded-full bg-accent" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
