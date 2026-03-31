

## Plan: Add "Other" Skills Column + Cover Image Fix

### 1. Fix cover image priority on /projects page
**`src/pages/Projects.tsx` line 154** — Swap to `project.image_url || project.images?.find(...)?.url`

### 2. Add `other_skills` to the data layer

**Database migration** — Add `other_skills` jsonb column to `site_settings`:
```sql
ALTER TABLE site_settings ADD COLUMN other_skills jsonb NOT NULL DEFAULT '[]'::jsonb;
```

**`src/hooks/useSiteSettings.ts`** — Add `other_skills: string[]` to `SiteSettings` interface, defaults, query parsing, and save mutation payload.

### 3. Add "Other" column to SkillsSection
**`src/components/SkillsSection.tsx`**:
- Read `other_skills` from settings
- Change grid from `md:grid-cols-2` to `md:grid-cols-3` when Other skills exist, else keep 2-col
- Render third "Other" column only when `otherSkills.length > 0` (hidden when empty)

### 4. Add admin editing for Other skills
**`src/pages/Admin.tsx`**:
- Add `other` to `skillInput` state (`{ design: "", dev: "", other: "" }`)
- Extend `addSkill`/`removeSkill` to support `"other_skills"`
- Add "Capabilities — Other" section after the Development section, mirroring the same pattern

### Files changed
- `src/pages/Projects.tsx` — 1 line
- `src/hooks/useSiteSettings.ts` — interface + defaults + query + mutation
- `src/components/SkillsSection.tsx` — add conditional third column
- `src/pages/Admin.tsx` — add Other skills editor section
- Database migration — add `other_skills` column

