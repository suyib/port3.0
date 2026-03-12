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

export interface SiteSettings {
  id: string;
  nav_links: NavLink[];
  footer_left: string;
  footer_right: string;
  social_links: SocialLink[];
  design_skills: string[];
  dev_skills: string[];
}

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

      return {
        id: data.id,
        nav_links: (data.nav_links ?? []) as NavLink[],
        footer_left: data.footer_left,
        footer_right: data.footer_right,
        social_links: (data.social_links ?? []) as SocialLink[],
        design_skills: (data.design_skills ?? []) as string[],
        dev_skills: (data.dev_skills ?? []) as string[],
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

export { DEFAULTS as SITE_SETTINGS_DEFAULTS };
