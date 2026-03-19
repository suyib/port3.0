

## Add Stakeholders to Projects + Reduce Section Padding

### 1. Database Migration

Add `stakeholders` column to `projects` table:
```sql
ALTER TABLE projects ADD COLUMN stakeholders text NOT NULL DEFAULT '';
```

### 2. Update Project Type (`src/types/project.ts`)

Add `stakeholders: string` to the `Project` interface.

### 3. Update Admin Basic Info (`src/pages/Admin.tsx`)

Add a "Stakeholders" text field to the Basic Info section alongside the existing fields (Role, Timeline, etc.).

### 4. Update `useProjects.ts`

Include `stakeholders` in the `useSaveProject` payload passthrough (it's already generic via spread, but ensure it's not stripped).

### 5. Update Case Study Display (`src/pages/CaseStudy.tsx`)

In the meta bar section (Role / Timeline / Tools), add a "Stakeholders" entry — but **only render it if `project.stakeholders` is non-empty**. Apply the same conditional rendering to Role, Timeline, and Tools so empty fields are hidden.

### 6. Reduce Section Padding

Change `py-20` to `py-12` across all main sections:
- `src/components/AboutSection.tsx`
- `src/components/ProjectsSection.tsx`
- `src/components/SkillsSection.tsx`
- `src/components/ContactSection.tsx`

### Files Changed
1. DB migration — add `stakeholders` column
2. `src/types/project.ts` — add field
3. `src/pages/Admin.tsx` — add Stakeholders input in Basic Info
4. `src/pages/CaseStudy.tsx` — conditionally show meta fields + stakeholders
5. `src/components/AboutSection.tsx` — `py-20` → `py-12`
6. `src/components/ProjectsSection.tsx` — `py-20` → `py-12`
7. `src/components/SkillsSection.tsx` — `py-20` → `py-12`
8. `src/components/ContactSection.tsx` — `py-20` → `py-12`

