import { useEffect } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function StyleProvider() {
  const { data: settings } = useSiteSettings();

  useEffect(() => {
    if (!settings?.site_styles) return;
    const root = document.documentElement;
    const { colors, fonts } = settings.site_styles;

    if (colors.background) root.style.setProperty("--background", colors.background);
    if (colors.foreground) root.style.setProperty("--foreground", colors.foreground);
    if (colors.primary) root.style.setProperty("--primary", colors.primary);
    if (colors.accent) root.style.setProperty("--accent", colors.accent);
    if (colors.secondary) root.style.setProperty("--secondary", colors.secondary);
    if (colors.muted) root.style.setProperty("--muted", colors.muted);

    if (fonts.display) {
      root.style.setProperty("--font-display", `'${fonts.display}', sans-serif`);
    }
    if (fonts.body) {
      root.style.setProperty("--font-body", `'${fonts.body}', sans-serif`);
    }

    return () => {
      root.style.removeProperty("--background");
      root.style.removeProperty("--foreground");
      root.style.removeProperty("--primary");
      root.style.removeProperty("--accent");
      root.style.removeProperty("--secondary");
      root.style.removeProperty("--muted");
      root.style.removeProperty("--font-display");
      root.style.removeProperty("--font-body");
    };
  }, [settings?.site_styles]);

  return null;
}
