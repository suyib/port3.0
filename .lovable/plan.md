

## Plan: Add Iterations Section + Admin Fixes + Unsaved Changes Modal

### 1. Database Migration
Add `iterations` jsonb column to `projects`:
```sql
ALTER TABLE projects ADD COLUMN iterations jsonb NOT NULL DEFAULT '[]'::jsonb;
```
Each entry: `{ url: string, caption: string }`

### 2. Update Types (`src/types/project.ts`)
- Add `Iteration` interface (`url: string`, `caption: string`)
- Add `iterations: Iteration[]` to `Project`

### 3. Update Data Hook (`src/hooks/useProjects.ts`)
- Include `iterations` in `rowToProject` (default `[]`)
- Include `iterations` in save mutation payload with Json cast

### 4. Render Iterations on Case Study (`src/pages/CaseStudy.tsx`)
Insert after the Outcome section (section 7), before "Next Project". Inspired by the Before/After comparison cards:
- Hidden when `iterations` is empty
- Section header: label "Iterations", title "Design Evolution"
- Responsive grid of images side by side (`grid-cols-2 md:grid-cols-3`) with rounded cards, border styling matching comparison cards
- Optional caption underneath each image (italic, muted text)
- Images clickable to open in lightbox

### 5. Admin Iterations Editor (`src/pages/Admin.tsx`)
Add an "Iterations" section after the "Before → After Comparison" section:
- Upload button (reuses `useUploadProjectImage`) that immediately uploads and appends to `editing.iterations`
- Each iteration shown as a thumbnail with caption input and delete button
- Images appear immediately after upload (no save required to see them)

### 6. Fix Image Replacement Button
The replace button has `pointer-events-none` on the inner Button, which is correct (the `<label>` handles clicks). But the issue is likely that the `<label>` wrapping needs the button to not intercept. Will verify the `pointer-events-none` is working and ensure the `onChange` handler properly resets `e.target.value` (already done). The fix: ensure the label itself isn't blocked by the overlay `opacity-0 hover:opacity-100` container — the overlay div captures pointer events. Will add `pointer-events-auto` to the action buttons area.

### 7. Cover Image Immediate Preview
The cover image upload currently sets `imageFile` state and shows a preview via `URL.createObjectURL`, which should work. Will verify and ensure the preview updates immediately.

### 8. Unsaved Changes Modal
- Track a `dirty` flag: set to `true` when any field in `editing` changes (compare against original loaded project), or when `galleryDirty` is true
- Use `beforeunload` event for browser back/refresh
- Intercept the "Back to List" button click: if dirty, show an `AlertDialog` prompting "You have unsaved changes. Save before leaving?" with three options: "Save & Exit", "Discard", "Cancel"
- Use `useBlocker` from react-router-dom v6 to intercept route navigation when dirty

### Files Changed
- Database migration (new `iterations` column)
- `src/types/project.ts` — add `Iteration` interface + field
- `src/hooks/useProjects.ts` — include in mapping + save
- `src/pages/CaseStudy.tsx` — render iterations section
- `src/pages/Admin.tsx` — iterations editor, fix replace button, unsaved changes modal
- `src/pages/Admin.tsx` — add `emptyProject.iterations: []`

