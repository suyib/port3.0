

## Limit Homepage to 4 Projects + 3:4 Aspect Ratio on /projects

### Changes

**1. `src/components/ProjectsSection.tsx` — Limit to 4 projects (line 40)**

Replace `projects.map(` with `projects.slice(0, 4).map(` to cap the homepage at 4 projects.

**2. `src/pages/Projects.tsx` — 3:4 aspect ratio for cover images (lines 152-158)**

Replace the fixed-height `h-56` image container with a 3:4 aspect ratio using Tailwind's `aspect-[3/4]` class, and remove the fixed height so images fill the ratio naturally:

```tsx
<div className="overflow-hidden rounded-2xl bg-secondary mb-4 aspect-[3/4]">
  <img
    src={project.images?.find((i) => i.visible)?.url || project.image_url}
    alt={project.title}
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
  />
</div>
```

Also update the skeleton loading state (line 123) to match: replace `h-56` with `aspect-[3/4]`.

### Files to change
1. `src/components/ProjectsSection.tsx` — slice to 4
2. `src/pages/Projects.tsx` — 3:4 aspect ratio on image containers + skeletons

