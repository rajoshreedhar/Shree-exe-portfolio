import { GAME_CONFIG } from "@/game/config/gameConfig";
import type { GameEventBus } from "@/game/types/gameEvents";

export type ManagedPhaserGame = import("phaser").Game;

type LoadedGameModules = {
  Phaser: typeof import("phaser");
  ArrivalCoveScene: typeof import("@/game/scenes/ArrivalCoveScene").ArrivalCoveScene;
};

let cachedModulesPromise: Promise<LoadedGameModules> | null = null;

function loadGameModules(): Promise<LoadedGameModules> {
  if (!cachedModulesPromise) {
    cachedModulesPromise = Promise.all([
      import("phaser"),
      import("@/game/scenes/ArrivalCoveScene"),
    ])
      .then(([PhaserModule, { ArrivalCoveScene }]) => ({
        Phaser: (PhaserModule.default ?? PhaserModule) as typeof import("phaser"),
        ArrivalCoveScene,
      }))
      .catch((err) => {
        // Allow retry on transient import failure
        cachedModulesPromise = null;
        throw err;
      });
  }
  return cachedModulesPromise;
}

/**
 * Dynamically imports Phaser 3 and ArrivalCoveScene only when Adventure Mode starts,
 * keeping the landing screen and Quick Portfolio completely free of Phaser bundle weight.
 * Strict-Mode safe: checks `isCancelled()` after async import before touching the DOM.
 */
export async function createArrivalCoveGame(
  parent: HTMLElement,
  eventBus: GameEventBus,
  isCancelled: () => boolean
): Promise<ManagedPhaserGame | undefined> {
  const { Phaser, ArrivalCoveScene } = await loadGameModules();

  if (isCancelled() || !parent.isConnected) {
    return undefined;
  }

  parent.innerHTML = "";

  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    width: GAME_CONFIG.viewportWidth,
    height: GAME_CONFIG.viewportHeight,
    backgroundColor: GAME_CONFIG.backgroundColor,
    pixelArt: true,
    roundPixels: true,
    antialias: false,
    scene: [ArrivalCoveScene],
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: "arcade",
      arcade: {
        gravity: { x: 0, y: 0 },
        debug: false,
      },
    },
    callbacks: {
      preBoot: (bootingGame) => {
        bootingGame.registry.set("eventBus", eventBus);
      },
    },
  });

  return game;
}
