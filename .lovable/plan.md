

## Make Hero Image Responsive

The hero image currently uses fixed pixel widths (`w-[500px]`, `sm:w-[500px]`, `lg:w-[800px]`) which don't scale fluidly on smaller screens — a 500px fixed width can overflow on phones narrower than that.

### Change in `src/components/HeroSection.tsx`

Replace the fixed-width classes on the `<img>` (line 53) with fluid, percentage-based sizing:

- **Mobile**: `w-[80%] max-w-[500px]` — scales down on small screens, caps at 500px
- **Large screens**: keep `lg:w-[800px] lg:max-w-none lg:translate-x-[10%]` for the desktop overflow effect

Also scale the blush circle (line 8) proportionally — use `w-[70vw] h-[70vw] max-w-[400px] max-h-[400px]` on mobile instead of fixed `w-[400px]`.

