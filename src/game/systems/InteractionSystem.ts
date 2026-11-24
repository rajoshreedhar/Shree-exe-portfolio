import Phaser from "phaser";
import { GAME_CONFIG } from "@/game/config/gameConfig";
import type { GameEventBus } from "@/game/types/gameEvents";
import type { ActivePrompt, InteractionDefinition } from "@/game/types/interaction";

export type RegisteredInteractable = {
  definition: InteractionDefinition;
  x: number;
  y: number;
  indicatorOffsetY: number;
  radius?: number;
  onInteract: (definition: InteractionDefinition) => void;
};

/**
 * Reusable nearby interaction system.
 * Deterministically picks the nearest eligible target, renders a gentle
 * world-space marker above it, and emits prompt changes to React.
 */
export class InteractionSystem {
  private readonly scene: Phaser.Scene;
  private readonly eventBus: GameEventBus;
  private readonly targets: RegisteredInteractable[] = [];
  private readonly marker: Phaser.GameObjects.Container;
  private readonly interactKeyE: Phaser.Input.Keyboard.Key | null;
  private readonly interactKeyEnter: Phaser.Input.Keyboard.Key | null;
  private readonly unsubscribeTrigger: () => void;

  private activeTarget: RegisteredInteractable | null = null;
  private lastEmittedId: string | null = null;
  private locked = false;

  constructor(scene: Phaser.Scene, eventBus: GameEventBus) {
    this.scene = scene;
    this.eventBus = eventBus;

    // Gentle floating pixel badge above the nearest interactable
    const bg = scene.add.rectangle(0, 0, 22, 22, 0xfaf7f2, 0.96);
    bg.setStrokeStyle(2, 0x843f49, 1);
    const label = scene.add.text(0, 0, "E", {
      fontFamily: "monospace",
      fontSize: "12px",
      fontStyle: "bold",
      color: "#843f49",
    });
    label.setOrigin(0.5, 0.5);

    this.marker = scene.add.container(0, 0, [bg, label]);
    this.marker.setDepth(2000);
    this.marker.setVisible(false);

    if (scene.input.keyboard) {
      this.interactKeyE = scene.input.keyboard.addKey("E", false);
      this.interactKeyEnter = scene.input.keyboard.addKey("ENTER", false);
    } else {
      this.interactKeyE = null;
      this.interactKeyEnter = null;
    }

    this.unsubscribeTrigger = this.eventBus.on("interaction:trigger", () => {
      this.triggerActive();
    });
  }

  register(target: RegisteredInteractable): void {
    this.targets.push(target);
  }

  setLocked(locked: boolean): void {
    this.locked = locked;
    if (locked) {
      this.marker.setVisible(false);
      if (this.lastEmittedId !== null) {
        this.lastEmittedId = null;
        this.eventBus.emit("interaction:prompt", null);
      }
      // Clear edge-triggered key buffers so closing dialogue never re-triggers interaction
      if (this.interactKeyE) Phaser.Input.Keyboard.JustDown(this.interactKeyE);
      if (this.interactKeyEnter) Phaser.Input.Keyboard.JustDown(this.interactKeyEnter);
    }
  }

  triggerActive(): void {
    if (this.locked || !this.activeTarget) return;
    this.activeTarget.onInteract(this.activeTarget.definition);
  }

  update(timeMs: number, playerX: number, playerY: number): void {
    if (this.locked) return;

    let nearest: RegisteredInteractable | null = null;
    let nearestDist = Number.POSITIVE_INFINITY;

    for (const target of this.targets) {
      const radius = target.radius ?? GAME_CONFIG.interactionRadius;
      const dist = Math.hypot(playerX - target.x, playerY - target.y);
      if (dist <= radius) {
        if (
          dist < nearestDist ||
          (dist === nearestDist &&
            nearest &&
            target.definition.id < nearest.definition.id)
        ) {
          nearest = target;
          nearestDist = dist;
        }
      }
    }

    this.activeTarget = nearest;

    if (nearest) {
      const hoverY = Math.sin(timeMs * 0.0065) * 3.5;
      this.marker.setPosition(
        nearest.x,
        nearest.y - nearest.indicatorOffsetY + hoverY
      );
      this.marker.setVisible(true);

      if (this.lastEmittedId !== nearest.definition.id) {
        this.lastEmittedId = nearest.definition.id;
        const promptPayload: ActivePrompt = {
          id: nearest.definition.id,
          label: nearest.definition.label,
          prompt: nearest.definition.prompt,
          kind: nearest.definition.kind,
        };
        this.eventBus.emit("interaction:prompt", promptPayload);
      }

      const pressedE = this.interactKeyE
        ? Phaser.Input.Keyboard.JustDown(this.interactKeyE)
        : false;
      const pressedEnter = this.interactKeyEnter
        ? Phaser.Input.Keyboard.JustDown(this.interactKeyEnter)
        : false;

      if (pressedE || pressedEnter) {
        this.triggerActive();
      }
    } else {
      this.marker.setVisible(false);
      if (this.lastEmittedId !== null) {
        this.lastEmittedId = null;
        this.eventBus.emit("interaction:prompt", null);
      }
    }
  }

  destroy(): void {
    this.unsubscribeTrigger();
    this.marker.destroy();
  }
}
