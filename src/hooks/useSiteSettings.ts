import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export interface HeroContent {
  subtitle: string;
  title: string;
  title2: string;
  description: string;
  cta1_label: string;
  cta1_href: string;
  cta2_label: string;
  cta2_href: string;
  image_url: string;
}

export interface StatItem {
  number: string;
  label: string;
}

export interface AboutContent {
  heading: string;
  paragraph1: string;
  paragraph2: string;
  stats: StatItem[];
}

export interface ContactContent {
  heading: string;
  description: string;
  cta_label: string;
}

export interface HomepageContent {
  hero: HeroContent;
  about: AboutContent;
  contact: ContactContent;
}

export interface SiteStyles {
  colors: {
    background: string;
    foreground: string;
    primary: string;
    accent: string;
    secondary: string;
    muted: string;
  };
  fonts: {
    display: string;
    body: string;
    display_url: string;
    body_url: string;
  };
}

export interface SiteSettings {
  id: string;
  nav_links: NavLink[];
  footer_left: string;
  footer_right: string;
  social_links: SocialLink[];
  design_skills: string[];
  dev_skills: string[];
  homepage_content: HomepageContent;
  site_styles: SiteStyles;
}

const DEFAULT_HOMEPAGE: HomepageContent = {
  hero: {
    subtitle: "suyin tung\nFull-Stack Designer",
    title: "Calculated design.",
    title2: "Measurable impact.",
    description: "Full Stack Designer specializing in evidence-based systems. I transform complex user behaviors into high-conversion interfaces through rigorous testing and behavioral analytics.",
    cta1_label: "View Work",
    cta1_href: "#projects",
    cta2_label: "Get in Touch",
    cta2_href: "#contact",
    image_url: "/lovable-uploads/e6c9fa77-da6d-4a96-8ea1-800188eab996.png",
  },
  about: {
    heading: "Designing with purpose,\nbuilding with precision.",
    paragraph1: "I'm a full-stack designer who thrives at the intersection of design and development. With a deep understanding of both disciplines, I create cohesive digital experiences from concept to deployment.",
    paragraph2: "Through experience, research, and design principles, I combine strategic thinking with hands-on craftsmanship. I ensure that every pixel is intentional, and every line of code serves a purpose.",
    stats: [
      { number: "3+", label: "Years Experience" },
      { number: "40+", label: "Projects Delivered" },
      { number: "10+", label: "Happy Clients" },
    ],
  },
  contact: {
    heading: "Let's build something great together.",
    description: "Have a project in mind? I'd love to hear about it. Drop me a line and let's make it happen.",
    cta_label: "Get in Touch",
  },
};

const DEFAULT_STYLES: SiteStyles = {
  colors: {
    background: "30 22% 97%",
    foreground: "225 13% 12%",
    primary: "225 13% 12%",
    accent: "350 15% 59%",
    secondary: "350 15% 88%",
    muted: "350 12% 92%",
  },
  fonts: {
    display: "Outfit",
    body: "Instrument Sans",
  },
};

const DEFAULTS: Omit<SiteSettings, "id"> = {
  nav_links: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  footer_left: "© 2026 ST.",
  footer_right: "Suyin's Portfolio ver 3.0",
  social_links: [
    { label: "Dribbble", url: "#", icon: "dribbble" },
    { label: "GitHub", url: "#", icon: "github" },
    { label: "LinkedIn", url: "#", icon: "linkedin" },
    { label: "Twitter", url: "#", icon: "twitter" },
  ],
  design_skills: ["UI/UX Design", "Design Systems", "Prototyping", "Brand Identity", "Motion Design", "Illustration"],
  dev_skills: ["React / Next.js", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL", "REST & GraphQL"],
  homepage_content: DEFAULT_HOMEPAGE,
  site_styles: DEFAULT_STYLES,
};

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      if (!data) return { id: "", ...DEFAULTS };

      const raw = (data as any).homepage_content;
      const homepage_content: HomepageContent = {
        hero: { ...DEFAULT_HOMEPAGE.hero, ...(raw?.hero ?? {}) },
        about: { ...DEFAULT_HOMEPAGE.about, ...(raw?.about ?? {}), stats: raw?.about?.stats?.length ? raw.about.stats : DEFAULT_HOMEPAGE.about.stats },
        contact: { ...DEFAULT_HOMEPAGE.contact, ...(raw?.contact ?? {}) },
      };

      const rawStyles = (data as any).site_styles;
      const site_styles: SiteStyles = {
        colors: { ...DEFAULT_STYLES.colors, ...(rawStyles?.colors ?? {}) },
        fonts: { ...DEFAULT_STYLES.fonts, ...(rawStyles?.fonts ?? {}) },
      };

      return {
        id: data.id,
        nav_links: (data.nav_links ?? []) as unknown as NavLink[],
        footer_left: data.footer_left,
        footer_right: data.footer_right,
        social_links: (data.social_links ?? []) as unknown as SocialLink[],
        design_skills: (data.design_skills ?? []) as unknown as string[],
        dev_skills: (data.dev_skills ?? []) as unknown as string[],
        homepage_content,
        site_styles,
      } as SiteSettings;
    },
  });
}

export function useSaveSiteSettings() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (settings: SiteSettings) => {
      const payload = {
        nav_links: settings.nav_links as any,
        footer_left: settings.footer_left,
        footer_right: settings.footer_right,
        social_links: settings.social_links as any,
        design_skills: settings.design_skills as any,
        dev_skills: settings.dev_skills as any,
        homepage_content: settings.homepage_content as any,
        site_styles: settings.site_styles as any,
        updated_at: new Date().toISOString(),
      };

      if (settings.id) {
        const { error } = await supabase
          .from("site_settings")
          .update(payload)
          .eq("id", settings.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("site_settings")
          .insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["site-settings"] });
    },
  });
}

export { DEFAULTS as SITE_SETTINGS_DEFAULTS, DEFAULT_HOMEPAGE };
