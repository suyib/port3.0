

## Add Conditional "Read Insights" Button to Contact Section

### Change in `src/components/ContactSection.tsx`

- Import `useBlogPosts` hook to check if published posts exist
- Add a secondary outlined button next to "Get in Touch" that links to `/insights`
- Only render it when `posts?.length > 0`
- Wrap both buttons in a flex container with a gap

**Button styling**: outlined/ghost style with `border border-accent text-accent` to contrast with the solid primary "Get in Touch" button, matching the rounded-full pill shape.

```tsx
// Buttons area (replacing the single Link)
<div className="flex flex-wrap justify-center gap-4">
  <Link to="/contact" className="...bg-accent...">Get in Touch</Link>
  {posts?.length > 0 && (
    <Link to="/insights" className="...border border-accent text-accent...">
      Read Insights
    </Link>
  )}
</div>
```

