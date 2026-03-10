

## Remove CaseStudy Back Navigation Bar

The CaseStudy page has its own fixed nav bar (lines 29-40 in `src/pages/CaseStudy.tsx`) that covers the global Navbar. Removing it will let the persistent Navbar show on this page.

### Changes

**`src/pages/CaseStudy.tsx`**:
- Remove the entire "Back Navigation" `<nav>` block (lines 29-40)
- Adjust hero section top padding from `pt-32` to `pt-24` to account for only the global navbar height

