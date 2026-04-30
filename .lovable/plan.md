## Plan: Make "Back to List" button navigate to previous page

### Change
In `src/pages/Admin.tsx` (line 479), change the Settings view's "Back to List" button to use `navigate(-1)` instead of `navigate("/admin")`. This makes it return to whichever page the user came from (e.g., the admin list, or any other page they navigated from).

```tsx
<button onClick={() => navigate(-1)} ...>
  <ArrowLeft size={16} /> Back to List
</button>
```

### Notes
- The existing `useBlocker` guard will still intercept this navigation when `settingsForm` has unsaved changes, prompting the unsaved-changes dialog as expected.
- Only the Settings view button is changed. If you also want the project/post edit views' back buttons updated, let me know.

### Files changed
- `src/pages/Admin.tsx` (one line)
