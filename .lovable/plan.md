

## Add Google Fonts URLs + Font Preview to Admin Styles

### Changes

**1. Update `SiteStyles` interface (`src/hooks/useSiteSettings.ts`)**
- Add `font_urls` to the fonts object: `display_url: string; body_url: string;`
- Add defaults as empty strings

**2. Update `StyleProvider` (`src/components/StyleProvider.tsx`)**
- Dynamically inject `<link>` tags into `<head>` for the Google Fonts URLs when they are non-empty
- Clean up on unmount/change

**3. Update Admin Fonts section (`src/pages/Admin.tsx`, lines 703-724)**
- Below each font name field, add a "Google Fonts URL" input field
- Below the two font columns, add a font preview box with three lines:
  - "This is a header" styled with the display font at h1 size (~2.5rem, weight 700)
  - "This is a subheader" styled with the display font at h4 size (~1.25rem, weight 600)
  - "This is body text" styled with the body font at base size
- The preview box uses inline `fontFamily` styles referencing the current font names so changes are visible in real-time

### Files to Change
1. `src/hooks/useSiteSettings.ts` — extend `SiteStyles.fonts` with `display_url` and `body_url`
2. `src/components/StyleProvider.tsx` — inject Google Fonts `<link>` tags dynamically
3. `src/pages/Admin.tsx` — add URL inputs under each font field + font preview box

