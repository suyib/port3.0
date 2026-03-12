

## Admin-Editable Site Settings: Navigation, Footer, Social Links, and Capabilities

### Overview
Create a `site_settings` table to store editable configuration for nav links, footer text, social media links, and skills/capabilities. Add a "Site Settings" section to the admin page, and update Navbar, Footer, ContactSection, and SkillsSection to read from this table.

### Database Migration
Create `site_settings` table with a single-row pattern (key-value JSON):

```sql
CREATE TABLE site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nav_links jsonb NOT NULL DEFAULT '[]',
  footer_left text NOT NULL DEFAULT '© 2026 ST.',
  footer_right text NOT NULL DEFAULT 'Suyin''s Portfolio ver 3.0',
  social_links jsonb NOT NULL DEFAULT '[]',
  design_skills jsonb NOT NULL DEFAULT '[]',
  dev_skills jsonb NOT NULL DEFAULT '[]',
  updated_at timestamptz NOT NULL DEFAULT now()
);
```

- `nav_links`: `[{ "label": "About", "href": "#about" }, ...]`
- `social_links`: `[{ "label": "GitHub", "url": "https://...", "icon": "github" }, ...]` where `icon` maps to Lucide icon names
- `design_skills` / `dev_skills`: `["UI/UX Design", "Design Systems", ...]`

RLS: public SELECT for all, authenticated full CRUD.

Seed one row with current hardcoded values.

### New Hook: `src/hooks/useSiteSettings.ts`
- `useSiteSettings()` — fetches the single row from `site_settings`
- `useSaveSiteSettings()` — upserts the row

### Admin Page Changes (`src/pages/Admin.tsx`)
Add a "Site Settings" tab/section to the list view (not inside project editing). Sections:

1. **Navigation Links** — editable list of `{ label, href }` with add/remove/reorder
2. **Footer** — two text fields (left, right)
3. **Social Links** — editable list of `{ label, url, icon }` with a dropdown for icon selection (Github, Linkedin, Twitter, Dribbble, Instagram, Mail, Globe)
4. **Capabilities — Design** — editable list of skill strings with add/remove
5. **Capabilities — Development** — same as above

### Component Updates
- **Navbar** — fetch `nav_links` from `useSiteSettings()`, fall back to hardcoded if loading/empty
- **Footer** — fetch `footer_left` and `footer_right`
- **ContactSection** — fetch `social_links`, render with Lucide icons and actual URLs
- **SkillsSection** — fetch `design_skills` and `dev_skills`

### Files to Create/Edit
1. **DB migration** — `site_settings` table + RLS + seed row
2. `src/hooks/useSiteSettings.ts` — new hook
3. `src/pages/Admin.tsx` — site settings management UI
4. `src/components/Navbar.tsx` — dynamic nav links
5. `src/components/Footer.tsx` — dynamic footer text
6. `src/components/ContactSection.tsx` — dynamic social links with icons
7. `src/components/SkillsSection.tsx` — dynamic skills lists

