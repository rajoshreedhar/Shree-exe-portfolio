# DESIGN.md — Shree.exe ("Pixel Chic")

## Visual Direction
**Pixel Chic** — Editorial sophistication holds layout, typography, spacing, and case-study clarity; pixel-game details carry personality (`Shree.exe`, chapter markers, hidden collectibles); chrome hairlines connect the two.

## Palette Tokens (Pinned by Brief)
| Token | Hex | Contrast / Usage |
|---|---|---|
| `--porcelain` | `#F4EFE7` | Primary light editorial canvas |
| `--porcelain-soft` | `#FAF7F2` | Elevated surface cards & panels |
| `--porcelain-deep` | `#EAE2D5` | Retro window titlebars & subtle bands |
| `--ink` | `#24201F` | Primary text & dark editorial chapters (`CH.03`, `CH.07`, footer) |
| `--stone-text` | `#625B55` | Accessible muted text on light canvases (≥ 5.4:1 contrast) |
| `--stone` | `#AAA49C` | Dividers, borders, hairline rules only |
| `--powder-pink` | `#D9BFC0` | Accent highlights, dark-mode emphasis, selection |
| `--burgundy` | `#843F49` | Primary brand accent & interactive emphasis |
| `--chrome` | `#C7C7C4` | Technical hairlines & secondary text on dark Ink surfaces |

## Typography
1. **Editorial Display:** `Playfair Display` (headings with `text-wrap: balance`; italic reserved for tagline & pull-quotes)
2. **Interface / Body:** `Manrope` (12px–17px body, `text-wrap: pretty`, 55–65ch reading measure)
3. **Pixel Accent:** `Press Start 2P` (`11px` floor strictly for short chapter numbers, monograms, and primary retro labels — never paragraphs)

## Accessibility & Motion Floor
- WCAG AA contrast (≥ 4.5:1) across both Porcelain and Ink themes.
- Touch targets ≥ 42–48px for primary actions, tabs, and navigation controls.
- Full keyboard controls (`M` Index, `S` Shree.exe, `Esc` Close, focus trapping + focus return).
- Calm opacity-only `prefers-reduced-motion: reduce` fallback with static sprites.
