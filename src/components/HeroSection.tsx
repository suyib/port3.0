import { motion } from "framer-motion";
import avatarImg from "@/assets/avatar.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Blush circle */}
      <div className="absolute top-1/2 -translate-y-1/2 left-[calc(60%-400px)] w-[800px] h-[800px] rounded-full bg-blush opacity-20" />
      
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}>
            
            <p className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6">
              suyin tung, Full-Stack Designer
            </p>
            <h1 className="text-5xl md:text-7xl leading-[0.95] tracking-tight text-foreground font-sans lg:text-7xl font-bold">
              Calculated design.
            </h1>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight text-foreground mt-2 font-bold lg:text-4xl py-[11px]">
              Measurable impact.
            </h2>
            <p className="font-body text-lg text-muted-foreground mt-8 max-w-md leading-relaxed">
              I design and build digital products that bridge the gap between beautiful interfaces and robust engineering.
            </p>
            <div className="flex gap-4 mt-10">
              <a
                href="#projects"
                className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-body font-medium text-sm tracking-wide hover:opacity-90 transition-opacity">
                
                View Work
              </a>
              <a
                href="#contact"
                className="inline-flex items-center px-8 py-4 rounded-full border border-foreground text-foreground font-body font-medium text-sm tracking-wide hover:bg-foreground hover:text-background transition-colors">
                
                Get in Touch
              </a>
            </div>
          </motion.div>

          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}>
            
            <div className="relative w-[900px] h-[900px] overflow-hidden">
              <img
                alt="Designer portrait"
                className="relative z-10 w-full h-full object-contain" src="/lovable-uploads/e6c9fa77-da6d-4a96-8ea1-800188eab996.png" />

              
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

};

export default HeroSection;