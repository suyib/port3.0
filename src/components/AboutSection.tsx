import { motion } from "framer-motion";

const stats = [
{ number: "3+", label: "Years Experience" },
{ number: "50+", label: "Projects Delivered" },
{ number: "30+", label: "Happy Clients" }];


const AboutSection = () => {
  return (
    <section id="about" className="py-32 bg-card">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">About</p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground leading-tight">
              Designing with purpose,<br />building with precision.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}>
            
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              I'm a full-stack designer who thrives at the intersection of design and development. 
              With a deep understanding of both disciplines, I create cohesive digital experiences 
              from concept to deployment.
            </p>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-12">
              Through experience, research, and design principles, I combine strategic thinking with hands-on craftsmanship. I ensure that every pixel is intentional, and every line of code serves a purpose.     
            
            </p>

            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat) =>
              <div key={stat.label}>
                  <p className="font-display text-4xl text-foreground">{stat.number}</p>
                  <p className="font-body text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

};

export default AboutSection;