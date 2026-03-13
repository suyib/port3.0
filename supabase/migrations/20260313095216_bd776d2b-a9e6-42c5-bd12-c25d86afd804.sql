
-- Blog posts table
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  summary text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published posts" ON public.blog_posts FOR SELECT TO public USING (published = true);
CREATE POLICY "Authenticated users can view all posts" ON public.blog_posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert posts" ON public.blog_posts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update posts" ON public.blog_posts FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete posts" ON public.blog_posts FOR DELETE TO authenticated USING (true);

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Contact submissions table
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text NOT NULL,
  project_type text NOT NULL,
  goal text NOT NULL DEFAULT '',
  timeline text NOT NULL DEFAULT '',
  budget_range text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert submissions" ON public.contact_submissions FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Authenticated users can view submissions" ON public.contact_submissions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete submissions" ON public.contact_submissions FOR DELETE TO authenticated USING (true);
