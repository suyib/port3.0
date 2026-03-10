

## Changes

**`src/pages/Projects.tsx` (line 134)**:
- Change grid from `grid md:grid-cols-2 lg:grid-cols-3` to `grid md:grid-cols-2` (remove the `lg:grid-cols-3`)

**`src/components/Navbar.tsx` (lines 17-19)**:
- Change the logo `<a href="#">` to a React Router `<Link to="/">` so it navigates to the homepage from any page
- Add `Link` import from `react-router-dom`

