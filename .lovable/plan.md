

## Rich Text Editors + Reorder Meta Bar on Project Pages

### What Changes

**1. Add a Rich Text Editor component**
- Create `src/components/RichTextEditor.tsx` using a lightweight approach with `contentEditable` div and `document.execCommand` for basic formatting (bold, italic, underline, lists, line breaks)
- Alternatively, install `@tiptap/react` + `@tiptap/starter-kit` for a more robust solution with a toolbar
- The editor stores HTML strings and renders them with `dangerouslySetInnerHTML` on the project page

**2. Replace Textarea fields in Admin with Rich Text Editor**
- All `TextareaField` usages in the project edit form become rich text editors:
  - Short Description, Challenge, Solution, Before/After descriptions, Callout, Process step descriptions, Tech Pivot description, Outcome
- Blog post Summary and Content fields also get the rich text editor

**3. Case Study page: move meta bar above Challenge/Solution cards**
- In `src/pages/CaseStudy.tsx`, move the meta bar (Role, Timeline, Stakeholders, Tools) from after the Challenge/Solution cards to before them — right after the headline, before the two cards

**4. Case Study page: render HTML content**
- Replace plain `<p>` tags with `<div dangerouslySetInnerHTML>` for all rich text fields so formatting is preserved

### Files to Change
1. **New**: `src/components/RichTextEditor.tsx` — reusable rich text editor with toolbar (bold, italic, underline, bullet list, numbered list)
2. **Edit**: `src/pages/Admin.tsx` — replace `TextareaField` with `RichTextEditor` for content fields
3. **Edit**: `src/pages/CaseStudy.tsx` — reorder meta bar above challenge/solution cards; render HTML content with `dangerouslySetInnerHTML`
4. **Install**: `@tiptap/react`, `@tiptap/starter-kit` for the editor

### Technical Details
- Tiptap is a headless rich text framework built on ProseMirror — lightweight, extensible, React-native
- Content stored as HTML strings in existing text columns (no DB migration needed)
- The `RichTextEditor` component will have a minimal toolbar: **B** | *I* | U | bullet list | ordered list
- On the CaseStudy page, rich text fields get `prose` classes for proper HTML rendering

