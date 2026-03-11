
-- Create project_images table
CREATE TABLE public.project_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  url text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;

-- Public can view visible images of published projects
CREATE POLICY "Anyone can view visible images of published projects"
ON public.project_images
FOR SELECT
TO public
USING (
  visible = true
  AND EXISTS (
    SELECT 1 FROM public.projects WHERE projects.id = project_images.project_id AND projects.published = true
  )
);

-- Authenticated users can view all images
CREATE POLICY "Authenticated users can view all images"
ON public.project_images
FOR SELECT
TO authenticated
USING (true);

-- Authenticated users can insert images
CREATE POLICY "Authenticated users can insert images"
ON public.project_images
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Authenticated users can update images
CREATE POLICY "Authenticated users can update images"
ON public.project_images
FOR UPDATE
TO authenticated
USING (true);

-- Authenticated users can delete images
CREATE POLICY "Authenticated users can delete images"
ON public.project_images
FOR DELETE
TO authenticated
USING (true);
