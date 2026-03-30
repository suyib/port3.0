

## Change Project Cover Aspect Ratio to 4:3 with Max Height

Two lines to update in `src/pages/Projects.tsx`:

1. **Line 123** (skeleton): `aspect-[3/4]` → `aspect-[4/3] max-h-[350px]`
2. **Line 152** (image container): `aspect-[3/4]` → `aspect-[4/3] max-h-[350px]`

