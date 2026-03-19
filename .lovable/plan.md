

## Fix Rich Text Rendering Across All Pages

### Problem
1. `@tailwindcss/typography` plugin is not registered in `tailwind.config.ts`, so `prose` classes on the Case Study page do nothing — bold, spacing, lists don't render
2. Homepage (`ProjectsSection.tsx`) and Projects listing (`Projects.tsx`) render `project.description` as plain text, showing raw `<p>` and `<strong>` tags

### Changes

**1. `tailwind.config.ts`** — Add typography plugin
```ts
plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
```

**2. `src/components/ProjectsSection.tsx` (line 65)** — Render description as HTML
```tsx
<div className="font-body text-lg text-muted-foreground leading-relaxed mb-6 prose prose-sm max-w-none line-clamp-3"
     dangerouslySetInnerHTML={{ __html: project.description }} />
```

**3. `src/pages/Projects.tsx` (lines 169-171)** — Same fix
```tsx
<div className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-2 prose prose-sm max-w-none"
     dangerouslySetInnerHTML={{ __html: project.description }} />
```

### Result
- Case Study page: challenge, solution, and all other rich text fields will render formatting correctly
- Homepage + Projects page: descriptions display as formatted text instead of raw HTML tags

