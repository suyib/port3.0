

## Fix: Hero Image Top Cut Off

The image top is clipped on mobile because the `<section>` has `overflow-hidden` (only `lg:overflow-visible`). Combined with `pt-24` on the grid pushing content down, the image top gets cropped.

### Change in `src/components/HeroSection.tsx`

1. **Remove `overflow-hidden`** from the section entirely — use `overflow-visible` at all breakpoints. The parent page or body can handle any horizontal overflow if needed, or we can add `overflow-x-hidden` to the section instead (clips only horizontal, preserves vertical).

2. Keep all the responsive image sizing (`w-[80%] max-w-[500px] lg:w-[800px] lg:max-w-none lg:translate-x-[10%]`) intact.

**Specific change on line 6:**
- From: `overflow-hidden lg:overflow-visible`
- To: `overflow-x-clip lg:overflow-visible`

This preserves the horizontal clipping needed to prevent the desktop overflow image from causing a scrollbar on mobile, while allowing the image to render fully vertically.

