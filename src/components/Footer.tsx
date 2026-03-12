import { useSiteSettings } from "@/hooks/useSiteSettings";

const Footer = () => {
  const { data: settings } = useSiteSettings();

  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-body text-sm text-muted-foreground">{settings?.footer_left ?? "© 2026 ST."}</p>
        <p className="font-body text-sm text-muted-foreground">{settings?.footer_right ?? "Suyin's Portfolio ver 3.0"}</p>
      </div>
    </footer>
  );
};

export default Footer;
