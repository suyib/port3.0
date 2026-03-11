

## Multi-Category Tags for Projects

Currently `category` is a single string. The change will treat it as a comma-separated list of tags while keeping the DB column as a single string (no migration needed).

### Changes

**`src/pages/Projects.tsx`**:
- Extract categories by splitting each project's `category` by comma, trimming, and collecting unique tags across all projects
- Update filter logic: a project matches the active category if any of its comma-separated tags matches
- Display each tag separately under the project card (instead of the raw string)

**`src/pages/Admin.tsx`** (line 243):
- Update the Category field placeholder to clarify comma-separated input, e.g. `"UI/UX, Mobile, Branding"`

**`src/components/ProjectsSection.tsx`**:
- Update category display to show individual tags if categories are shown on homepage cards

No database changes needed — `category` remains a text column storing comma-separated values.

