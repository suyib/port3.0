import { motion } from "framer-motion";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const HeroSection = () => {
  const { data: settings } = useSiteSettings();
  const hero = settings?.homepage_content?.hero;

  const subtitle = hero?.subtitle ?? "suyin tung\nFull-Stack Designer";
  const title = hero?.title ?? "Calculated design.";
  const title2 = hero?.title2 ?? "Measurable impact.";
  const description = hero?.description ?? "Full Stack Designer specializing in evidence-based systems. I transform complex user behaviors into high-conversion interfaces through rigorous testing and behavioral analytics.";
  const cta1Label = hero?.cta1_label ?? "View Work";
  const cta1Href = hero?.cta1_href ?? "#projects";
  const cta2Label = hero?.cta2_label ?? "Get in Touch";
  const cta2Href = hero?.cta2_href ?? "#contact";
  const imageUrl = hero?.image_url ?? "/lovable-uploads/e6c9fa77-da6d-4a96-8ea1-800188eab996.png";

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-x-clip lg:overflow-visible">
      <div className="absolute top-[50%] -translate-y-1/2 left-[55%] -translate-x-1/2 w-[70vw] h-[70vw] max-w-[400px] max-h-[400px] md:max-w-[600px] md:max-h-[600px] lg:left-[calc(65%-400px)] lg:translate-x-0 lg:max-w-[800px] lg:max-h-[800px] lg:w-[800px] lg:h-[800px] rounded-full opacity-20" style={{ backgroundColor: '#E7C8CD' }} />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center pt-24 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left order-2 lg:order-1">
            
            <p className="font-body text-xs sm:text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 sm:mb-6 whitespace-pre-line">
              {subtitle}
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.03em] text-foreground font-sans font-bold">
              {title}
            </h1>
            <h2 className="font-display text-2xl sm:text-4xl leading-[0.95] tracking-tight text-foreground mt-2 my-0 py-0 font-semibold lg:text-4xl">
              {title2}
            </h2>
            <p className="font-body text-base sm:text-lg text-muted-foreground mt-6 sm:mt-8 max-w-xl leading-relaxed">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10 justify-start">
              <a
                href={cta1Href}
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-primary text-primary-foreground font-body font-medium text-sm tracking-wide hover:opacity-90 transition-opacity">
                {cta1Label}
              </a>
              <a
                href={cta2Href}
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-foreground text-foreground font-body font-medium text-sm tracking-wide hover:bg-foreground hover:text-background transition-colors">
                {cta2Label}
              </a>
            </div>
          </motion.div>

          <motion.div
            className="relative flex justify-center lg:justify-end overflow-visible order-1 lg:order-2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            style={{ minWidth: 0 }}>
            
            <img
              alt="Designer portrait"
              className="relative z-10 object-contain w-[80%] max-w-[500px] lg:w-[800px] lg:max-w-none lg:translate-x-[10%]"
              style={{ height: 'auto' }}
              src={imageUrl} />
            
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
