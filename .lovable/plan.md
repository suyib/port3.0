

## Multi-Image Gallery with Reorder and Visibility

### Overview
Add a `project_images` table to store multiple images per project, each with a sort order and visibility flag. Update the admin to manage images (upload, reorder, hide/show) and update the case study page to display a gallery of visible images.

### Database Migration
Create a new `project_images` table:
- `id` (uuid, PK)
- `project_id` (uuid, FK → projects.id ON DELETE CASCADE)
- `url` (text, the storage URL)
- `sort_order` (integer, default 0)
- `visible` (boolean, default true)
- `created_at` (timestamptz)

RLS policies: public SELECT where visible=true (and parent project is published), authenticated full CRUD.

### Type Changes — `src/types/project.ts`
Add a `ProjectImage` interface: `{ id: string; project_id: string; url: string; sort_order: number; visible: boolean }`. Add optional `images?: ProjectImage[]` to `Project`.

### Data Hook Changes — `src/hooks/useProjects.ts`
- After fetching a project, also fetch its `project_images` ordered by `sort_order`
- Add mutations: `useAddProjectImage`, `useDeleteProjectImage`, `useUpdateProjectImages` (for batch reorder/visibility updates)
- Existing `useUploadProjectImage` stays for the storage upload, then insert a row into `project_images`

### Admin UI — `src/pages/Admin.tsx`
Replace the single image upload section with a multi-image manager:
- Grid of uploaded image thumbnails with drag handles for reordering (simple up/down buttons to keep it lightweight — no drag library needed)
- Eye icon toggle on each image to show/hide without deleting
- Trash icon to permanently delete
- Upload button to add more images
- Save reorder/visibility changes in batch

### Case Study Page — `src/pages/CaseStudy.tsx`
- Replace the single hero image with a gallery of visible images
- Show images in a vertical stack or grid (consistent with current single-image layout)
- Only render visible images, lazy-load with `loading="lazy"` to avoid slowing down the site

### Projects Page & Homepage Cards
- Use the first visible image as the thumbnail (fallback to `image_url` for backward compat)

### Files to Create/Edit
1. **DB migration** — new `project_images` table + RLS
2. `src/types/project.ts` — add `ProjectImage` type
3. `src/hooks/useProjects.ts` — fetch images with projects, add image mutations
4. `src/pages/Admin.tsx` — multi-image management UI
5. `src/pages/CaseStudy.tsx` — render image gallery
6. `src/pages/Projects.tsx` — use first visible image as card thumbnail
7. `src/components/ProjectsSection.tsx` — same thumbnail logic

