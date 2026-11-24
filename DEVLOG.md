# SHREE.EXE — Development Log

## Milestone 0: The First Morning

### What was built
- **Landing Screen (`src/components/landing/LandingScreen.tsx` & `HomeExperience.tsx`):** SHREE.EXE — *The Little Island* opening screen in the established Pixel Chic warm editorial palette, featuring a custom morning Arrival Cove pixel diorama, the canonical `ShreeSprite`, **New Game**, **Quick Portfolio** (`/portfolio`), and an honest **Settings** preview panel with desktop/touch controls.
- **Lazy-Loaded Phaser 3 Architecture (`src/lib/game/createGame.ts`, `destroyGame.ts`, `GameCanvas.tsx`):** Phaser 3 and `ArrivalCoveScene` are dynamically imported only after the visitor chooses **New Game** (or visits `/adventure`), keeping `/` landing and `/portfolio` completely free of Phaser bundle overhead. Cleanup destroys the Phaser instance and removes any canvas cleanly on exit.
- **Arrival Cove Scene (`src/game/scenes/ArrivalCoveScene.ts`, `coveTextures.ts`):** Compact 36×22 tile coastal slice (`1152 × 704` world inside a `960 × 540` viewport) with animated cove water, wooden arrival pier, golden sandy shoreline, sage meadow, packed-earth path, organic trees/bushes/rocks, warm glowing path lanterns, non-solid swaying wildflowers, drifting morning pollen motes, and Y-depth sorting.
- **Shree.exe Player (`src/game/entities/Player.ts`):** Uses the canonical `/sprites/shree-canonical.png`, `/sprites/shree-blink.png`, and `/sprites/shree-happy.png` assets with a foot-level Arcade Physics collision body, normalized 4-direction & diagonal movement (WASD, Arrows, and touch D-pad), smooth frame-rate-independent stride bounce/tilt, subtle footstep dust puffs, and natural blinking. *(Note: Dedicated 4-direction walk sprite sheets are marked as a future art task.)*
- **Reusable Interaction System (`src/game/systems/InteractionSystem.ts`):** Nearest-target deterministic selection, world-space `E` indicator, and typed React ↔ Phaser event bus (`src/game/types/gameEvents.ts`) with clean input ownership.
- **Three Arrival Cove Objects + One NPC (`src/data/interactions.ts`, `src/data/dialogue.ts`):**
  1. Wooden Signboard (introduces The Little Island)
  2. Tiny Parcel (first discovery toast + visual open state + sparkle celebration, non-repeating)
  3. Island Noticeboard (introduces work-in-progress projects with direct link to `/portfolio#the-quests`)
  4. Shree.exe Island Greeter NPC (5-line conversation)
- **Mobile Touch Controls, Pause Menu, Loading & Error States:** 4-way pointer-captured touch D-pad + Interact button seated cleanly beneath the viewport on smaller screens (`touch-action: none`), Escape-driven pause menu, `"Waking up the island..."` loader, and friendly error recovery UI.
- **Preserved Existing Portfolio (`/portfolio`):** Full existing `PortfolioWorld` (8 chapters, Cozy Retro Arcade hero, `ShreeCompanion`, collectibles, case studies, and all CSS animations) preserved intact with a header link back to the island.

### Technical decisions
- Kept Phaser decoupled from React through a lightweight Phaser-free `GameEventBus` instance created per game session.
- Used `pixelArt: true`, `roundPixels: true`, and delta-time animation loops in Phaser to keep motion silky smooth and free of sub-pixel shimmer.
- Scoped all new CSS animations under `.island-*` and added them to `@media (prefers-reduced-motion: reduce)` without altering any existing portfolio keyframes.
