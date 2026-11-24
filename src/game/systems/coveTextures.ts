import type Phaser from "phaser";
import { COVE_PALETTE, GAME_CONFIG } from "@/game/config/gameConfig";

function makeCanvas(
  scene: Phaser.Scene,
  key: string,
  width: number,
  height: number,
  draw: (ctx: CanvasRenderingContext2D) => void
): void {
  if (scene.textures.exists(key)) return;
  const canvasTex = scene.textures.createCanvas(key, width, height);
  if (!canvasTex) return;
  const ctx = canvasTex.getContext();
  ctx.imageSmoothingEnabled = false;
  draw(ctx);
  canvasTex.refresh();
}

function px(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string
) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h));
}

/**
 * Generates warm, hand-crafted pixel-art textures for the Arrival Cove prototype.
 * Placeholder/prototype procedural pixel art — replaceable cleanly by final tilesets later.
 */
export function generateCoveTextures(scene: Phaser.Scene): void {
  const T = GAME_CONFIG.tileSize;

  // 1. Animated water tiles (3 gentle shimmer frames)
  for (let frame = 0; frame < 3; frame++) {
    makeCanvas(scene, `tile-water-${frame}`, T, T, (ctx) => {
      px(ctx, 0, 0, T, T, COVE_PALETTE.waterMid);
      px(ctx, 0, 0, T, 2, COVE_PALETTE.waterDeep);
      // Soft shifting wave highlights
      const shift = frame * 4;
      px(ctx, (4 + shift) % 26, 7, 7, 2, COVE_PALETTE.waterLight);
      px(ctx, (16 + shift) % 24, 17, 8, 2, COVE_PALETTE.waterLight);
      px(ctx, (8 + shift) % 26, 25, 6, 2, COVE_PALETTE.waterDeep);
      if (frame === 1) {
        px(ctx, 10, 12, 3, 2, COVE_PALETTE.waterFoam);
      } else if (frame === 2) {
        px(ctx, 21, 21, 3, 2, COVE_PALETTE.waterFoam);
      }
    });
  }

  // 2. Warm beach sand tiles (2 subtle variants)
  makeCanvas(scene, "tile-sand-0", T, T, (ctx) => {
    px(ctx, 0, 0, T, T, COVE_PALETTE.sandBase);
    px(ctx, 4, 6, 3, 2, COVE_PALETTE.sandLight);
    px(ctx, 19, 14, 4, 2, COVE_PALETTE.sandLight);
    px(ctx, 10, 24, 3, 2, COVE_PALETTE.sandShade);
    px(ctx, 25, 4, 2, 2, COVE_PALETTE.sandShade);
  });

  makeCanvas(scene, "tile-sand-1", T, T, (ctx) => {
    px(ctx, 0, 0, T, T, COVE_PALETTE.sandBase);
    px(ctx, 14, 8, 3, 2, COVE_PALETTE.sandLight);
    px(ctx, 6, 18, 4, 2, COVE_PALETTE.sandShade);
    px(ctx, 22, 24, 2, 2, COVE_PALETTE.porcelainSoft); // tiny shell glint
    px(ctx, 24, 24, 1, 1, COVE_PALETTE.powderPink);
  });

  // 3. Soft sage meadow grass tiles (2 subtle variants)
  makeCanvas(scene, "tile-grass-0", T, T, (ctx) => {
    px(ctx, 0, 0, T, T, COVE_PALETTE.grassBase);
    px(ctx, 5, 8, 2, 3, COVE_PALETTE.grassLight);
    px(ctx, 7, 9, 2, 2, COVE_PALETTE.grassLight);
    px(ctx, 20, 20, 2, 3, COVE_PALETTE.grassShade);
    px(ctx, 22, 21, 2, 2, COVE_PALETTE.grassLight);
    px(ctx, 14, 4, 2, 2, COVE_PALETTE.grassShade);
  });

  makeCanvas(scene, "tile-grass-1", T, T, (ctx) => {
    px(ctx, 0, 0, T, T, COVE_PALETTE.grassBase);
    px(ctx, 10, 14, 2, 3, COVE_PALETTE.grassLight);
    px(ctx, 12, 15, 2, 2, COVE_PALETTE.grassLight);
    px(ctx, 24, 7, 2, 3, COVE_PALETTE.grassShade);
    px(ctx, 4, 25, 3, 2, COVE_PALETTE.grassLight);
  });

  // 4. Packed-earth path tile
  makeCanvas(scene, "tile-path", T, T, (ctx) => {
    px(ctx, 0, 0, T, T, COVE_PALETTE.pathBase);
    px(ctx, 3, 5, 5, 3, COVE_PALETTE.pathLight);
    px(ctx, 18, 12, 6, 3, COVE_PALETTE.pathLight);
    px(ctx, 8, 22, 5, 3, COVE_PALETTE.pathEdge);
    px(ctx, 24, 24, 4, 2, COVE_PALETTE.pathEdge);
  });

  // 5. Weathered wooden pier plank tile
  makeCanvas(scene, "tile-pier", T, T, (ctx) => {
    px(ctx, 0, 0, T, T, COVE_PALETTE.woodBase);
    // Horizontal planks
    for (let y = 0; y < T; y += 8) {
      px(ctx, 0, y, T, 1, COVE_PALETTE.woodOutline);
      px(ctx, 0, y + 1, T, 2, COVE_PALETTE.woodLight);
      px(ctx, 0, y + 6, T, 2, COVE_PALETTE.woodDark);
      // Tiny wood nails
      px(ctx, 3, y + 3, 2, 2, COVE_PALETTE.woodOutline);
      px(ctx, T - 5, y + 3, 2, 2, COVE_PALETTE.woodOutline);
    }
    // Side beam edges
    px(ctx, 0, 0, 2, T, COVE_PALETTE.woodOutline);
    px(ctx, T - 2, 0, 2, T, COVE_PALETTE.woodOutline);
  });

  // 6. Pier corner post
  makeCanvas(scene, "prop-pier-post", 14, 24, (ctx) => {
    px(ctx, 2, 18, 10, 5, "rgba(36,32,31,0.22)");
    px(ctx, 3, 2, 8, 18, COVE_PALETTE.woodOutline);
    px(ctx, 4, 3, 6, 16, COVE_PALETTE.woodDark);
    px(ctx, 4, 3, 4, 14, COVE_PALETTE.woodBase);
    px(ctx, 4, 2, 6, 3, COVE_PALETTE.woodLight);
    // Rope wrap
    px(ctx, 3, 9, 8, 2, COVE_PALETTE.sandLight);
    px(ctx, 3, 11, 8, 1, COVE_PALETTE.sandShade);
  });

  // 7. Organic rounded coastal tree (64x76)
  makeCanvas(scene, "prop-tree-round", 64, 76, (ctx) => {
    // Soft ground shadow
    ctx.fillStyle = "rgba(36, 32, 31, 0.18)";
    ctx.beginPath();
    ctx.ellipse(32, 68, 22, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Trunk
    px(ctx, 25, 44, 14, 24, COVE_PALETTE.woodOutline);
    px(ctx, 27, 45, 10, 22, COVE_PALETTE.woodDark);
    px(ctx, 28, 46, 5, 20, COVE_PALETTE.woodBase);
    px(ctx, 24, 64, 16, 4, COVE_PALETTE.woodDark);

    // Layered organic canopy (slightly irregular pixel silhouette)
    const drawBlob = (cx: number, cy: number, rx: number, ry: number, color: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
    };

    // Outline silhouette
    drawBlob(32, 32, 26, 22, COVE_PALETTE.woodOutline);
    drawBlob(18, 36, 15, 14, COVE_PALETTE.woodOutline);
    drawBlob(46, 36, 15, 14, COVE_PALETTE.woodOutline);
    drawBlob(32, 18, 18, 14, COVE_PALETTE.woodOutline);

    // Deep foliage shadow
    drawBlob(32, 33, 24, 20, COVE_PALETTE.foliageDark);
    drawBlob(19, 36, 13, 12, COVE_PALETTE.foliageDark);
    drawBlob(45, 36, 13, 12, COVE_PALETTE.foliageDark);

    // Mid foliage
    drawBlob(32, 29, 22, 18, COVE_PALETTE.foliageMid);
    drawBlob(20, 32, 12, 10, COVE_PALETTE.foliageMid);
    drawBlob(44, 32, 12, 10, COVE_PALETTE.foliageMid);
    drawBlob(32, 18, 16, 12, COVE_PALETTE.foliageMid);

    // Sunlit top highlights
    drawBlob(28, 18, 12, 8, COVE_PALETTE.foliageLight);
    drawBlob(40, 24, 8, 6, COVE_PALETTE.foliageLight);
    px(ctx, 22, 14, 4, 3, "#a2bd91");
    px(ctx, 34, 12, 4, 2, "#a2bd91");
    // Tiny warm blossom specks
    px(ctx, 19, 30, 3, 3, COVE_PALETTE.powderPink);
    px(ctx, 41, 28, 3, 3, COVE_PALETTE.porcelainSoft);
  });

  // 8. Flowering bush (36x30)
  makeCanvas(scene, "prop-bush", 36, 30, (ctx) => {
    ctx.fillStyle = "rgba(36, 32, 31, 0.16)";
    ctx.beginPath();
    ctx.ellipse(18, 25, 14, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    const blob = (cx: number, cy: number, r: number, color: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    };

    blob(18, 15, 11, COVE_PALETTE.woodOutline);
    blob(10, 17, 8, COVE_PALETTE.woodOutline);
    blob(26, 17, 8, COVE_PALETTE.woodOutline);

    blob(18, 15, 9.5, COVE_PALETTE.foliageDark);
    blob(10, 17, 6.5, COVE_PALETTE.foliageDark);
    blob(26, 17, 6.5, COVE_PALETTE.foliageDark);

    blob(18, 13, 8.5, COVE_PALETTE.foliageMid);
    blob(11, 15, 5.5, COVE_PALETTE.foliageMid);
    blob(25, 15, 5.5, COVE_PALETTE.foliageMid);

    blob(16, 10, 5, COVE_PALETTE.foliageLight);
    px(ctx, 10, 14, 3, 3, COVE_PALETTE.powderPink);
    px(ctx, 22, 13, 3, 3, COVE_PALETTE.porcelainSoft);
    px(ctx, 17, 17, 2, 2, COVE_PALETTE.warmAmber);
  });

  // 9. Coastal mossy rock (34x28)
  makeCanvas(scene, "prop-rock", 34, 28, (ctx) => {
    ctx.fillStyle = "rgba(36, 32, 31, 0.18)";
    ctx.beginPath();
    ctx.ellipse(17, 23, 14, 4.5, 0, 0, Math.PI * 2);
    ctx.fill();

    px(ctx, 5, 10, 24, 12, COVE_PALETTE.woodOutline);
    px(ctx, 8, 6, 18, 16, COVE_PALETTE.woodOutline);
    px(ctx, 7, 11, 20, 10, COVE_PALETTE.rockDark);
    px(ctx, 9, 8, 16, 11, COVE_PALETTE.rockBase);
    px(ctx, 10, 8, 11, 5, COVE_PALETTE.rockLight);
    // Moss patch
    px(ctx, 19, 9, 5, 3, COVE_PALETTE.foliageMid);
    px(ctx, 21, 11, 3, 2, COVE_PALETTE.foliageLight);
  });

  // 10. Non-solid wildflowers (12x12)
  makeCanvas(scene, "prop-flower-pink", 12, 12, (ctx) => {
    px(ctx, 5, 6, 2, 5, COVE_PALETTE.foliageDark);
    px(ctx, 3, 3, 6, 4, COVE_PALETTE.powderPink);
    px(ctx, 4, 2, 4, 6, COVE_PALETTE.powderPink);
    px(ctx, 5, 4, 2, 2, COVE_PALETTE.warmAmber);
  });

  makeCanvas(scene, "prop-flower-cream", 12, 12, (ctx) => {
    px(ctx, 5, 6, 2, 5, COVE_PALETTE.foliageDark);
    px(ctx, 3, 3, 6, 4, COVE_PALETTE.porcelainSoft);
    px(ctx, 4, 2, 4, 6, COVE_PALETTE.porcelainSoft);
    px(ctx, 5, 4, 2, 2, COVE_PALETTE.burgundy);
  });

  // 11. Warm garden path lantern (20x36)
  makeCanvas(scene, "prop-lantern", 20, 36, (ctx) => {
    ctx.fillStyle = "rgba(36, 32, 31, 0.2)";
    ctx.beginPath();
    ctx.ellipse(10, 33, 6, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();
    // Post
    px(ctx, 8, 14, 4, 19, COVE_PALETTE.woodOutline);
    px(ctx, 9, 15, 2, 17, COVE_PALETTE.woodDark);
    // Lantern roof & lamp housing
    px(ctx, 4, 4, 12, 3, COVE_PALETTE.woodOutline);
    px(ctx, 6, 2, 8, 2, COVE_PALETTE.woodDark);
    px(ctx, 5, 7, 10, 9, COVE_PALETTE.woodOutline);
    px(ctx, 6, 8, 8, 7, COVE_PALETTE.warmAmber);
    px(ctx, 8, 9, 4, 4, COVE_PALETTE.porcelainSoft);
  });

  // 12. Interactable 1: Wooden Signboard (38x46)
  makeCanvas(scene, "obj-signboard", 38, 46, (ctx) => {
    ctx.fillStyle = "rgba(36, 32, 31, 0.2)";
    ctx.beginPath();
    ctx.ellipse(19, 42, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Post
    px(ctx, 16, 24, 6, 18, COVE_PALETTE.woodOutline);
    px(ctx, 17, 25, 4, 16, COVE_PALETTE.woodDark);

    // Wooden board
    px(ctx, 3, 6, 32, 21, COVE_PALETTE.woodOutline);
    px(ctx, 5, 8, 28, 17, COVE_PALETTE.woodBase);
    px(ctx, 5, 8, 28, 4, COVE_PALETTE.woodLight);
    px(ctx, 5, 22, 28, 3, COVE_PALETTE.woodDark);
    // Carved text lines
    px(ctx, 9, 12, 20, 2, COVE_PALETTE.porcelainSoft);
    px(ctx, 9, 16, 16, 2, COVE_PALETTE.sandLight);
    px(ctx, 9, 20, 12, 1, COVE_PALETTE.sandLight);
    // Nails
    px(ctx, 7, 10, 2, 2, COVE_PALETTE.woodOutline);
    px(ctx, 29, 10, 2, 2, COVE_PALETTE.woodOutline);
  });

  // 13. Interactable 2: Tiny Parcel (closed & opened) (28x28)
  makeCanvas(scene, "obj-parcel-closed", 28, 28, (ctx) => {
    ctx.fillStyle = "rgba(36, 32, 31, 0.22)";
    ctx.beginPath();
    ctx.ellipse(14, 24, 11, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Box outline & kraft fill
    px(ctx, 4, 8, 20, 16, COVE_PALETTE.woodOutline);
    px(ctx, 6, 10, 16, 12, "#d8b48a");
    px(ctx, 6, 10, 16, 4, "#e6c8a2");
    px(ctx, 6, 19, 16, 3, "#be966b");
    // Burgundy / dusty pink ribbon
    px(ctx, 12, 9, 4, 14, COVE_PALETTE.burgundy);
    px(ctx, 5, 14, 18, 3, COVE_PALETTE.burgundy);
    // Bow on top
    px(ctx, 9, 5, 4, 4, COVE_PALETTE.powderPink);
    px(ctx, 15, 5, 4, 4, COVE_PALETTE.powderPink);
    px(ctx, 12, 6, 4, 4, COVE_PALETTE.burgundy);
  });

  makeCanvas(scene, "obj-parcel-opened", 28, 28, (ctx) => {
    ctx.fillStyle = "rgba(36, 32, 31, 0.18)";
    ctx.beginPath();
    ctx.ellipse(14, 24, 11, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Open kraft box
    px(ctx, 4, 11, 20, 13, COVE_PALETTE.woodOutline);
    px(ctx, 6, 13, 16, 9, "#d8b48a");
    px(ctx, 6, 13, 16, 3, "#8b6948"); // inner hollow
    // Cream note peeking out
    px(ctx, 9, 6, 10, 9, COVE_PALETTE.woodOutline);
    px(ctx, 10, 7, 8, 7, COVE_PALETTE.porcelainSoft);
    px(ctx, 11, 9, 6, 1, COVE_PALETTE.burgundy);
    px(ctx, 11, 11, 5, 1, COVE_PALETTE.rockDark);
    // Loose ribbon
    px(ctx, 20, 20, 5, 2, COVE_PALETTE.powderPink);
  });

  // 14. Interactable 3: Island Noticeboard (56x54)
  makeCanvas(scene, "obj-noticeboard", 56, 54, (ctx) => {
    ctx.fillStyle = "rgba(36, 32, 31, 0.2)";
    ctx.beginPath();
    ctx.ellipse(28, 50, 22, 4.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Two legs
    px(ctx, 11, 34, 6, 16, COVE_PALETTE.woodOutline);
    px(ctx, 12, 35, 4, 14, COVE_PALETTE.woodDark);
    px(ctx, 39, 34, 6, 16, COVE_PALETTE.woodOutline);
    px(ctx, 40, 35, 4, 14, COVE_PALETTE.woodDark);

    // Pitched roof overhang
    px(ctx, 3, 4, 50, 6, COVE_PALETTE.woodOutline);
    px(ctx, 5, 5, 46, 4, COVE_PALETTE.burgundy);
    px(ctx, 6, 5, 44, 2, "#9f5560");

    // Wooden frame + corkboard
    px(ctx, 6, 10, 44, 28, COVE_PALETTE.woodOutline);
    px(ctx, 8, 12, 40, 24, COVE_PALETTE.woodBase);
    px(ctx, 10, 14, 36, 20, "#c89e74");

    // Pinned paper notes (porcelain, powder pink, warm amber)
    px(ctx, 12, 16, 10, 11, COVE_PALETTE.porcelainSoft);
    px(ctx, 16, 15, 2, 2, COVE_PALETTE.burgundy); // pin
    px(ctx, 14, 19, 6, 1, COVE_PALETTE.ink);
    px(ctx, 14, 21, 5, 1, COVE_PALETTE.rockDark);
    px(ctx, 14, 23, 6, 1, COVE_PALETTE.rockDark);

    px(ctx, 25, 16, 9, 8, COVE_PALETTE.powderPink);
    px(ctx, 29, 15, 2, 2, COVE_PALETTE.ink);
    px(ctx, 27, 19, 5, 1, COVE_PALETTE.ink);
    px(ctx, 27, 21, 4, 1, COVE_PALETTE.ink);

    px(ctx, 36, 18, 8, 12, COVE_PALETTE.warmAmber);
    px(ctx, 39, 17, 2, 2, COVE_PALETTE.burgundy);
    px(ctx, 38, 21, 4, 1, COVE_PALETTE.ink);
    px(ctx, 38, 24, 4, 1, COVE_PALETTE.ink);

    px(ctx, 24, 26, 10, 6, COVE_PALETTE.porcelain);
    px(ctx, 26, 28, 6, 2, COVE_PALETTE.foliageDark);
  });

  // 15. Soft sparkle & dust particles
  makeCanvas(scene, "fx-sparkle", 8, 8, (ctx) => {
    px(ctx, 3, 0, 2, 8, COVE_PALETTE.warmAmber);
    px(ctx, 0, 3, 8, 2, COVE_PALETTE.warmAmber);
    px(ctx, 3, 3, 2, 2, COVE_PALETTE.porcelainSoft);
  });

  makeCanvas(scene, "fx-dust", 6, 6, (ctx) => {
    px(ctx, 1, 1, 4, 4, COVE_PALETTE.porcelainSoft);
    px(ctx, 2, 0, 2, 6, COVE_PALETTE.sandLight);
    px(ctx, 0, 2, 6, 2, COVE_PALETTE.sandLight);
  });

  // 16. Fallback temporary avatar placeholder (only used if canonical PNG ever fails to load)
  makeCanvas(scene, "shree-placeholder", 36, 50, (ctx) => {
    px(ctx, 8, 6, 20, 18, COVE_PALETTE.ink);
    px(ctx, 11, 10, 14, 11, "#f2d6c3");
    px(ctx, 13, 14, 3, 3, COVE_PALETTE.ink);
    px(ctx, 20, 14, 3, 3, COVE_PALETTE.ink);
    px(ctx, 9, 24, 18, 16, COVE_PALETTE.burgundy);
    px(ctx, 11, 40, 6, 8, "#56758c");
    px(ctx, 19, 40, 6, 8, "#56758c");
  });
}
