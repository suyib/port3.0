

## Cover Image as Homepage Thumbnail + Lightbox Gallery Carousel

### Current State
- **Cover Image** (`image_url`): Used as fallback on homepage cards, but homepage currently prefers the first visible gallery image
- **Gallery Images** (`project_images` table): Displayed as stacked full-width images on the case study page, with hide/show toggle in admin
- On the case study page, both cover and gallery images are lumped together in one section

### Plan

#### 1. Homepage Project Cards (`src/components/ProjectsSection.tsx`)
- Change the image source to always use `project.image_url` (cover image) as the homepage thumbnail
- Fall back to first visible gallery image only if no cover image exists

#### 2. Case Study Page (`src/pages/CaseStudy.tsx`)
- **Cover image**: Render the cover image (`project.image_url`) at its current position (after meta bar), full-width with optional caption — unchanged
- **Gallery carousel**: Replace the current stacked gallery images with a lightbox-enabled carousel:
  - Horizontal scrollable/slidable carousel using Embla (already installed via the Carousel UI component)
  - Show thumbnail strips; clicking any image opens a full-screen lightbox overlay
  - Lightbox: dark overlay, large image, left/right navigation arrows, close button, caption below
  - Only show visible gallery images (hidden ones stay hidden)
  - Separate the cover image from gallery images — cover is standalone, gallery is the carousel below it

#### 3. Admin Panel (`src/pages/Admin.tsx`)
- No structural changes needed — the existing hide/show toggle per gallery image already works. Hidden images won't appear in the carousel.

### Files to Change
1. `src/components/ProjectsSection.tsx` — prioritize `image_url` for homepage cards
2. `src/pages/CaseStudy.tsx` — split cover from gallery, add carousel + lightbox for gallery images

