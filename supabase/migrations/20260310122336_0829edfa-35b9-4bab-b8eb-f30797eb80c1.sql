
-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  headline TEXT NOT NULL DEFAULT '',
  challenge TEXT NOT NULL DEFAULT '',
  solution TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT '',
  timeline TEXT NOT NULL DEFAULT '',
  tools TEXT[] NOT NULL DEFAULT '{}',
  pain_points JSONB NOT NULL DEFAULT '[]',
  comparison JSONB NOT NULL DEFAULT '{}',
  process JSONB NOT NULL DEFAULT '[]',
  tech_pivot JSONB NOT NULL DEFAULT '{}',
  component_states JSONB NOT NULL DEFAULT '[]',
  takeaways JSONB NOT NULL DEFAULT '[]',
  outcome TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Public can read published projects
CREATE POLICY "Anyone can view published projects"
  ON public.projects FOR SELECT
  USING (published = true);

-- Authenticated users can manage projects (admin)
CREATE POLICY "Authenticated users can insert projects"
  ON public.projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON public.projects FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete projects"
  ON public.projects FOR DELETE
  TO authenticated
  USING (true);

-- Authenticated users can also read all projects (including drafts)
CREATE POLICY "Authenticated users can view all projects"
  ON public.projects FOR SELECT
  TO authenticated
  USING (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for project images
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true);

-- Storage policies
CREATE POLICY "Project images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated users can upload project images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Authenticated users can update project images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated users can delete project images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'project-images');
