

## Edit Homepage Image from Admin + Image Dimensions + Hide/Unhide Projects

### Changes

**1. `src/pages/Admin.tsx` — Hero Image Upload**
- Replace the "Hero Image URL" text field (line 539) with an image upload widget similar to the project cover image upload
- Show a preview of the current hero image with dimensions displayed (e.g., "800 × 600px")
- Upload to the existing `project-images` storage bucket, then save the public URL into `homepage_content.hero.image_url`
- Keep the URL field as a fallback/manual override below the upload button

**2. `src/pages/Admin.tsx` — Show Image Dimensions**
- For the hero image preview and project cover image preview, load the image into an `Image()` object to read `naturalWidth` and `naturalHeight`, display as a small label like "1200 × 800px"

**3. `src/pages/Admin.tsx` — Hide/Unhide Projects from List View**
- Add a toggle button (eye/eye-off icon) to each project row in the list view (lines 749-758) that toggles `published` without entering the edit form
- Clicking the eye icon calls `useSaveProject` to flip `published` and invalidates the query

### Files to Change
1. `src/pages/Admin.tsx` — hero image upload + dimensions display + publish toggle in list view

