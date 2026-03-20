## Scroll to Top + Back to Top Button

### Changes

**1. `src/App.tsx**` — Add `ScrollToTop` component

- Import `useLocation` and `useEffect`
- Create `ScrollToTop` component that calls `window.scrollTo(0, 0)` on pathname change
- Render it inside `<BrowserRouter>` before `<Navbar />`

**2. `src/components/BackToTop.tsx**` — New component

- Floating rounded button fixed to bottom-right corner
- Uses `ChevronUp` icon from lucide-react
- Shows/hides based on scroll position (appears after scrolling ~300px)
- Smooth scroll to top on click
- Responsive positioning: `bottom-4 right-4` on mobile, `bottom-8 right-8` on desktop
- Subtle fade-in/out animation with framer-motion

**3. `src/App.tsx**` — Render `<BackToTop />` alongside routes

### Files

1. `src/App.tsx` — ScrollToTop + BackToTop integration
2. `src/components/BackToTop.tsx` — new floating button component