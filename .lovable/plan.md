

## Insights (Blog) + Contact Page

### 1. Database Changes

**New `blog_posts` table:**
```sql
CREATE TABLE blog_posts (
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
```
RLS: public SELECT for published posts, authenticated full CRUD.

**New `contact_submissions` table:**
```sql
CREATE TABLE contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text NOT NULL,
  project_type text NOT NULL,
  goal text NOT NULL DEFAULT '',
  timeline text NOT NULL DEFAULT '',
  budget_range text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
```
RLS: anyone can INSERT, authenticated can SELECT/DELETE.

### 2. New Pages & Components

**`src/pages/Insights.tsx`** — Blog listing page showing published posts (title, image, summary) with links to individual posts.

**`src/pages/InsightPost.tsx`** — Single blog post page at `/insights/:slug` showing title, image, summary section, then full content rendered as paragraphs.

**`src/pages/Contact.tsx`** — Contact form page with:
- Name (required) and Company (required) text inputs
- Project Type (required) dropdown: UX Design, UI Design, Branding, Development, Other — with a tooltip on hover saying "If unsure, pick Other and elaborate in the text field"
- Goal (required) as a textarea (rich text field)
- Timeline (optional) text input
- Budget Range (optional) text input
- Submits to `contact_submissions` table, shows success toast

### 3. Admin Page Updates

Add a blog management section to Admin (similar to projects list):
- List all blog posts with edit/delete
- Edit view with fields: title, slug, image upload, summary (textarea), content (textarea), published toggle

### 4. Routing & Navigation

**`src/App.tsx`** — Add routes:
- `/insights` → Insights listing
- `/insights/:slug` → Single post
- `/contact` → Contact form

**`src/components/ContactSection.tsx`** — Replace the email CTA button with a link to `/contact`.

### 5. New Hooks

**`src/hooks/useBlogPosts.ts`** — `useBlogPosts()`, `useBlogPost(slug)`, `useSaveBlogPost()`, `useDeleteBlogPost()`, `useUploadBlogImage()` following the same pattern as `useProjects.ts`.

### Files to Create/Edit
1. DB migration — `blog_posts` + `contact_submissions` tables + RLS
2. `src/hooks/useBlogPosts.ts`
3. `src/pages/Insights.tsx`
4. `src/pages/InsightPost.tsx`
5. `src/pages/Contact.tsx`
6. `src/pages/Admin.tsx` — blog post management
7. `src/App.tsx` — new routes
8. `src/components/ContactSection.tsx` — link to /contact

