

## Plan: Refactor to Data Router + useBlocker

### 1. Refactor `src/App.tsx`
- Replace `<BrowserRouter>` with `createBrowserRouter` + `<RouterProvider>`
- Create a `Layout` component with `ScrollToTop`, `StyleProvider`, `Navbar`, `<Outlet />`, `BackToTop`
- All existing routes become children of the Layout route
- `QueryClientProvider`, `TooltipProvider`, `Toaster`, `Sonner` stay outside the router

### 2. Refactor `src/pages/Admin.tsx`
- Import and use `useBlocker` with condition:
  ```ts
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      (isDirty || galleryDirty || editingPost !== null || settingsForm !== null) &&
      currentLocation.pathname !== nextLocation.pathname
  );
  ```
- Connect to existing `AlertDialog`: `open={blocker.state === "blocked"}`, Cancel → `blocker.reset()`, Discard → `blocker.proceed()`, Save & Exit → save then `blocker.proceed()`
- Remove `showUnsavedDialog`, `pendingNavigation`, `handleNavigateWithGuard` state/function
- Change "Back to List" button to simple `navigate("/admin")` — useBlocker intercepts automatically
- Keep `beforeunload` listener for browser refresh/tab close

### Files changed
- `src/App.tsx`
- `src/pages/Admin.tsx`

