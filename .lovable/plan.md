

## Fix Sorting, Add Logo/Favicon Upload, Add Meta Description, Reorder Settings

### 1. Fix project drag-to-sort in list view

Replace the decorative `GripVertical` icon (line 914) with `ChevronUp`/`ChevronDown` buttons that swap `sort_order` between adjacent projects and save immediately via `saveProject.mutateAsync`.

**File:** `src/pages/Admin.tsx`

### 2. Logo + Favicon upload in Admin Settings

Store `logo_url` and `favicon_url` inside the existing `homepage_content` JSONB (no migration needed).

- `src/hooks/useSiteSettings.ts` — Add `logo_url` and `favicon_url` to `HeroContent` interface with empty string defaults
- `src/pages/Admin.tsx` — Add a "Branding" section with upload widgets + dimension previews for both logo and favicon
- `src/components/Navbar.tsx` — Render `<img>` from `logo_url` instead of hardcoded "ST." when set
- `src/components/StyleProvider.tsx` — Dynamically inject `<link rel="icon">` from `favicon_url`

### 3. Add meta description rich text editor for case studies

**Database migration:** Add `meta_description text NOT NULL DEFAULT ''` to `projects` table.

- `src/types/project.ts` — Add `meta_description: string` to `Project` interface
- `src/pages/Admin.tsx` — Add a `RichTextEditor` labeled "Meta Description" below Role/Timeline/Stakeholders/Tools in the Basic Info section
- `src/pages/CaseStudy.tsx` — Render `meta_description` HTML between the meta bar and challenge/solution cards
- `src/hooks/useProjects.ts` — Include `meta_description` in `rowToProject`

### 4. Reorder Site Settings to follow page order

Current order is scattered. Reorganize to match the actual page flow:

```text
1. Branding (Logo + Favicon)         — NEW, site-wide
2. Navigation Links                  — appears in Navbar (top of page)
3. Homepage — Hero                   — first section
4. Homepage — About                  — second section
5. Capabilities — Design             — third section (Skills)
6. Capabilities — Development        — third section (Skills)
7. Homepage — Contact                — fourth section
8. Social Links                      — appears in Contact + Footer
9. Footer                            — bottom of page
10. Site Styles (Colors + Fonts)     — global theme, last
```

### Files to Change
1. **Migration** — Add `meta_description` column to `projects`
2. `src/types/project.ts` — Add `meta_description` field
3. `src/hooks/useSiteSettings.ts` — Add `logo_url`, `favicon_url` to `HeroContent`
4. `src/hooks/useProjects.ts` — Map `meta_description` in `rowToProject`
5. `src/components/StyleProvider.tsx` — Dynamic favicon injection
6. `src/components/Navbar.tsx` — Render logo image
7. `src/pages/Admin.tsx` — Sort buttons, branding section, meta description editor, reorder settings sections
8. `src/pages/CaseStudy.tsx` — Render meta description

