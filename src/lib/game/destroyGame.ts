import type { ManagedPhaserGame } from "./createGame";

/**
 * Destroys a specific Phaser game instance cleanly (including its canvas and scene listeners).
 * Deliberately does NOT clear the shared GameEventBus or wipe sibling nodes in the container,
 * preventing React Strict Mode remount races from wiping out active listeners or canvases.
 */
export function destroyArrivalCoveGame(
  game: ManagedPhaserGame | undefined
): void {
  if (!game) return;

  try {
    game.destroy(true);
  } catch (error) {
    console.error("Error while destroying SHREE.EXE game instance:", error);
  }
}
