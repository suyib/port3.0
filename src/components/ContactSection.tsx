import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">Contact</p>
            <h2 className="font-display text-4xl md:text-6xl text-foreground mb-6">
              Let's build something great together.
            </h2>
            <p className="font-body text-lg text-muted-foreground mb-10 leading-relaxed">
              Have a project in mind? I'd love to hear about it. Drop me a line and let's make it happen.
            </p>
            <a
              href="mailto:hello@example.com"
              className="inline-flex items-center px-10 py-5 rounded-full bg-accent text-accent-foreground font-body font-medium text-base tracking-wide hover:opacity-90 transition-opacity"
            >
              hello@example.com
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center gap-8 mt-16"
          >
            {["Dribbble", "GitHub", "LinkedIn", "Twitter"].map((platform) => (
              <a
                key={platform}
                href="#"
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {platform}
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
