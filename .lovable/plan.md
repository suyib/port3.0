

## Change Accent Color to #A9848A and Harmonize Related Colors

`#A9848A` converts to approximately `HSL(350, 15%, 59%)` — a muted, dusty rose tone. This is significantly darker and more desaturated than the current accent (`350 39% 84%`). All related pinkish/blush variables need to shift to match.

### Light Mode (`:root`) Changes

| Variable | Current | New | Rationale |
|---|---|---|---|
| `--accent` | `350 39% 84%` | `350 15% 59%` | New accent `#A9848A` |
| `--secondary` | `350 33% 92%` | `350 15% 88%` | Lighter tint of new accent |
| `--muted` | `350 20% 94%` | `350 12% 92%` | Subtle background tint |
| `--blush` | `350 33% 85%` | `350 15% 72%` | Mid-tone complement |
| `--border` | `350 18% 90%` | `350 10% 88%` | Desaturated to match |
| `--input` | `350 18% 90%` | `350 10% 88%` | Same as border |
| `--sidebar-accent` | `350 33% 92%` | `350 15% 88%` | Match secondary |
| `--sidebar-border` | `350 18% 90%` | `350 10% 88%` | Match border |

### Dark Mode (`.dark`) Changes

| Variable | Current | New |
|---|---|---|
| `--accent` | `350 33% 85%` | `350 15% 59%` |
| `--muted-foreground` | `350 20% 70%` | `350 12% 65%` |
| `--blush` | `350 25% 22%` | `350 15% 22%` |

### File
- `src/index.css` — update the CSS variables listed above

