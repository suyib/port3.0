
-- Create site_settings table
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nav_links jsonb NOT NULL DEFAULT '[]'::jsonb,
  footer_left text NOT NULL DEFAULT '© 2026 ST.',
  footer_right text NOT NULL DEFAULT 'Suyin''s Portfolio ver 3.0',
  social_links jsonb NOT NULL DEFAULT '[]'::jsonb,
  design_skills jsonb NOT NULL DEFAULT '[]'::jsonb,
  dev_skills jsonb NOT NULL DEFAULT '[]'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public can read
CREATE POLICY "Anyone can view site settings"
ON public.site_settings FOR SELECT TO public
USING (true);

-- Authenticated full CRUD
CREATE POLICY "Authenticated users can insert site settings"
ON public.site_settings FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update site settings"
ON public.site_settings FOR UPDATE TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete site settings"
ON public.site_settings FOR DELETE TO authenticated
USING (true);

-- Seed with current hardcoded values
INSERT INTO public.site_settings (nav_links, social_links, design_skills, dev_skills)
VALUES (
  '[{"label":"About","href":"#about"},{"label":"Projects","href":"#projects"},{"label":"Contact","href":"#contact"}]'::jsonb,
  '[{"label":"Dribbble","url":"#","icon":"dribbble"},{"label":"GitHub","url":"#","icon":"github"},{"label":"LinkedIn","url":"#","icon":"linkedin"},{"label":"Twitter","url":"#","icon":"twitter"}]'::jsonb,
  '["UI/UX Design","Design Systems","Prototyping","Brand Identity","Motion Design","Illustration"]'::jsonb,
  '["React / Next.js","TypeScript","Node.js","Tailwind CSS","PostgreSQL","REST & GraphQL"]'::jsonb
);
