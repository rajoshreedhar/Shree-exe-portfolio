# Shree.exe — Portfolio Implementation Checklist

Updated checklist tracking all requirements from `shree_exe_portfolio_design_build_guide.md` and the custom companion & profile additions for **Rajoshree Dhar**.

## 1. Interactive Shree.exe Pet & Canonical Character
- [x] Extracted exact uploaded avatar into crisp transparent canonical sprites (`public/sprites/shree-canonical.png`, `shree-blink.png`, `shree-happy.png`) verified on both Porcelain (`#F4EFE7`) and Ink (`#24201F`) backgrounds.
- [x] Preserved canonical proportions, dark hair, glasses, headphones, dark outfit with light collar, jeans, bunny shoes, and golden pixel star.
- [x] Implemented `idle`, `wave`, `happy`, `thinking`, `coding`, `headphones`, `reading`, `celebrate`, and `goodbye` poses & chapter-specific behaviours.
- [x] Hero focal placement inside an original cosy Pixel Study diorama (`src/components/home/Hero.tsx`).

## 2. Interactive Behaviour & Non-Obstructive UX
- [x] Visitors can tap or click Shree.exe to trigger happy/wave reactions and cycle witty chapter-aware dialogue bubbles.
- [x] Visitors can ask Shree.exe to guide them directly to any of the 8 chapters (`CH.00` – `CH.07`) or switch her pose/mood.
- [x] Visitors can dismiss hints (stored in `sessionStorage` so dismissed chapter hints do not repeat in the same session) or minimise Shree.exe into a compact corner chip.
- [x] Companion never obstructs text, controls, keyboard focus, or essential navigation; the entire portfolio makes complete sense even when minimised.

## 3. Accessibility & Responsive Craft
- [x] Full keyboard navigation: skip-to-content link, visible `:focus-visible` rings, focus-trapped full-screen Chapter Index modal (`M`), Shree.exe toggle (`S`), and `Esc` to close overlays with focus return.
- [x] Mobile-friendly non-blocking companion pill positioning and responsive single-column layouts down to narrow phone widths.
- [x] Full `prefers-reduced-motion: reduce` support replacing animated loops with static poses and calm transitions.
- [x] Semantic landmarks (`header`, `main`, `section`, `aside`, `footer`), proper heading order, `aria-live="polite"` dialogue announcements, and meaningful `alt` text.

## 4. Profiles & Contact Integration
- [x] **LinkedIn:** `https://www.linkedin.com/in/rajoshree-dhar-132a062a7/` added to Top Navigation, Chapter Index, Contact Chapter (`CH.07`), Case Study header, and Footer.
- [x] **GitHub:** `https://github.com/rajoshreedhar` added to Top Navigation, Chapter Index, Projects Chapter (`CH.04`), Case Study pages, Contact Chapter (`CH.07`), and Footer.

## 5. All 8 Chapters & Technical Case Studies
- [x] **CH.00 — The title screen:** Editorial wordmark, tagline, pixel study diorama, canonical Shree.exe, and `CURRENTLY_EXPLORING.EXE` window.
- [x] **CH.01 — The player (About):** Editorial personal story, optional Shree.exe margin annotations, Player Card, 3 themes, and Pixel Star collectible.
- [x] **CH.02 — The inventory (Skills & tools):** Category tabs, honest `Used` / `Learning` / `Exploring` labels (zero fake percentage bars), Item Inspector panel, and distinct Currently Learning shelf.
- [x] **CH.03 — The laboratory:** Dramatic Ink chapter with chrome hairlines, explanatory abstract SVG schematics, and expandable lab dossiers (`Built`, `Exploring`, `Investigating`, `In progress`).
- [x] **CH.04 — The quests (Projects):** Large editorial panels featuring **SKYTXT**, **Shree.exe — Digital World**, and **Curiosity & ML Study Ledger**, each with a full 8-part dedicated Case Study route (`/projects/[slug]`).
- [x] **CH.05 — The soundtrack:** Retro-chrome pixel deck, curated rotation (BTS, Taylor Swift, Sabrina Carpenter, K-pop/Lo-Fi), strictly opt-in ambient chime (no autoplay) with Stop/Mute controls, and outbound Spotify links.
- [x] **CH.06 — The side quests:** Filterable editorial scrapbook (fashion, mysteries, cinema/pop culture, coffee & slow mornings) + hidden Espresso collectible.
- [x] **CH.07 — The next level (Contact & Footer):** Farewell Shree.exe stage, LinkedIn & GitHub cards, interactive Résumé snapshot, final Pixel Heart collectible, and conventional footer.

## 6. Impeccable & UI/UX Pro Max Quality Pass
- [x] Verified live desktop (`1440x900`) and mobile (`390x844`) renders with Impeccable `detect` and `shot`.
- [x] Raised all functional UI & pixel labels to `≥ 11px` floor and body/caption copy to `≥ 12px` for crisp readability.
- [x] Fixed secondary text contrast on Porcelain surfaces via `--stone-text` (`#625B55`, ≥ 5.4:1 WCAG AA contrast).
- [x] Redesigned the mobile hero to show Shree.exe & interactive greeting in the first viewport and upgraded the desktop Study Room into a crisp two-zone architectural scene with zero window/bubble overlap.
- [x] Added `text-wrap: balance` on headings, `text-wrap: pretty` on body copy, constrained reading measures (`54–65ch`), themed scrollbars/selection/caret, and documented `PRODUCT.md` + `DESIGN.md`.

## 7. Post-Launch Content Polish (Optional Customization by Rajoshree)
- [ ] Replace `src/data/projects.ts` visuals with live project screenshots whenever new repos ship.
- [ ] Add direct PDF résumé link or preferred email address in `src/data/profile.ts` when ready.
