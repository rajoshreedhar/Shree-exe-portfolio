import type Phaser from "phaser";
import { GAME_CONFIG } from "@/game/config/gameConfig";
import type { VirtualInputState } from "@/game/types/gameEvents";

export type FacingDirection = "down" | "up" | "left" | "right";

/**
 * Owns the Shree.exe player character in Arrival Cove:
 * - Uses the canonical Shree.exe avatar sprite (/sprites/shree-canonical.png)
 *   Note: Dedicated 4-direction walk sprite sheets are planned for a later art milestone;
 *   meanwhile smooth stride-bob, gentle tilt, facing flip, natural blinking, and dust puffs
 *   keep movement responsive and expressive.
 * - Separates visual sprite size from ground-contact Arcade Physics collision box.
 * - Supports normalized WASD, Arrow keys, and mobile virtual D-pad input.
 */
export class Player {
  readonly sprite: Phaser.Physics.Arcade.Sprite;
  private readonly shadow: Phaser.GameObjects.Ellipse;
  private readonly scene: Phaser.Scene;
  private readonly cursors: Phaser.Types.Input.Keyboard.CursorKeys | null;
  private readonly keys: {
    w: Phaser.Input.Keyboard.Key;
    a: Phaser.Input.Keyboard.Key;
    s: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
  } | null;

  private readonly baseScaleX: number;
  private readonly baseScaleY: number;
  private readonly canonicalKey: string;
  private readonly blinkKey: string;
  private readonly happyKey: string;

  private virtualInput: VirtualInputState = {
    up: false,
    down: false,
    left: false,
    right: false,
  };

  private movementLocked = false;
  private facing: FacingDirection = "down";
  private walkPhase = 0;
  private idlePhase = 0;
  private dustCooldownMs = 0;
  private blinkTimerMs = 2600;
  private blinkDurationMs = 0;
  private happyRemainingMs = 0;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;

    this.canonicalKey = scene.textures.exists("shree-canonical")
      ? "shree-canonical"
      : "shree-placeholder";
    this.blinkKey = scene.textures.exists("shree-blink")
      ? "shree-blink"
      : this.canonicalKey;
    this.happyKey = scene.textures.exists("shree-happy")
      ? "shree-happy"
      : this.canonicalKey;

    // Grounded soft contact shadow
    this.shadow = scene.add.ellipse(x, y, 26, 10, 0x24201f, 0.24);
    this.shadow.setDepth(y - 1);

    // Anchor at bottom-center (feet) for clean Y-depth sorting & stride bobbing
    this.sprite = scene.physics.add.sprite(x, y, this.canonicalKey);
    this.sprite.setOrigin(0.5, 0.96);

    const texFrame = scene.textures.getFrame(this.canonicalKey);
    const targetHeight = 56;
    const scale = texFrame && texFrame.height > 0 ? targetHeight / texFrame.height : 1;
    this.baseScaleX = scale;
    this.baseScaleY = scale;
    this.sprite.setScale(this.baseScaleX, this.baseScaleY);

    // Foot-level Arcade Physics hitbox so hair/head never snags on decorative edges
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;
    if (texFrame && texFrame.width > 0 && texFrame.height > 0) {
      const footWorldW = 20;
      const footWorldH = 12;
      const rawW = footWorldW / scale;
      const rawH = footWorldH / scale;
      body.setSize(rawW, rawH);
      body.setOffset((texFrame.width - rawW) / 2, texFrame.height - rawH - 6 / scale);
    } else {
      body.setSize(20, 12);
    }
    body.setCollideWorldBounds(true);

    if (scene.input.keyboard) {
      this.cursors = scene.input.keyboard.createCursorKeys();
      this.keys = {
        w: scene.input.keyboard.addKey("W", false),
        a: scene.input.keyboard.addKey("A", false),
        s: scene.input.keyboard.addKey("S", false),
        d: scene.input.keyboard.addKey("D", false),
      };
    } else {
      this.cursors = null;
      this.keys = null;
    }
  }

  get x(): number {
    return this.sprite.x;
  }

  get y(): number {
    return this.sprite.y;
  }

  getFacing(): FacingDirection {
    return this.facing;
  }

  setVirtualInput(input: VirtualInputState): void {
    this.virtualInput = input;
  }

  setMovementLocked(locked: boolean): void {
    this.movementLocked = locked;
    if (locked) {
      this.sprite.setVelocity(0, 0);
      this.virtualInput = { up: false, down: false, left: false, right: false };
    }
  }

  celebrate(): void {
    this.happyRemainingMs = 1750;
    this.sprite.setTexture(this.happyKey);
  }

  update(deltaMs: number): void {
    const dt = Math.min(deltaMs, 50) / 1000;
    let moveX = 0;
    let moveY = 0;

    if (!this.movementLocked) {
      const left =
        Boolean(this.cursors?.left.isDown) ||
        Boolean(this.keys?.a.isDown) ||
        this.virtualInput.left;
      const right =
        Boolean(this.cursors?.right.isDown) ||
        Boolean(this.keys?.d.isDown) ||
        this.virtualInput.right;
      const up =
        Boolean(this.cursors?.up.isDown) ||
        Boolean(this.keys?.w.isDown) ||
        this.virtualInput.up;
      const down =
        Boolean(this.cursors?.down.isDown) ||
        Boolean(this.keys?.s.isDown) ||
        this.virtualInput.down;

      if (left) moveX -= 1;
      if (right) moveX += 1;
      if (up) moveY -= 1;
      if (down) moveY += 1;
    }

    const isMoving = moveX !== 0 || moveY !== 0;

    if (isMoving) {
      // Normalize diagonal movement so speed is constant in all directions
      const length = Math.hypot(moveX, moveY);
      const vx = (moveX / length) * GAME_CONFIG.playerSpeed;
      const vy = (moveY / length) * GAME_CONFIG.playerSpeed;
      this.sprite.setVelocity(vx, vy);

      if (Math.abs(moveX) >= Math.abs(moveY)) {
        this.facing = moveX < 0 ? "left" : "right";
      } else {
        this.facing = moveY < 0 ? "up" : "down";
      }

      if (moveX < 0) {
        this.sprite.setFlipX(true);
      } else if (moveX > 0) {
        this.sprite.setFlipX(false);
      }

      // Smooth frame-rate-independent stride animation
      this.walkPhase += dt * 13.5;
      const strideWave = Math.sin(this.walkPhase);
      const bounce = Math.abs(strideWave);
      this.sprite.setRotation(strideWave * 0.048);
      this.sprite.setScale(
        this.baseScaleX * (1 + (1 - bounce) * 0.025),
        this.baseScaleY * (1 - (1 - bounce) * 0.03)
      );
      this.sprite.setOrigin(0.5, 0.96 + bounce * 0.055);

      // Gentle footstep dust puff
      this.dustCooldownMs -= deltaMs;
      if (this.dustCooldownMs <= 0) {
        this.dustCooldownMs = 230;
        this.spawnStepDust();
      }
    } else {
      this.sprite.setVelocity(0, 0);
      this.idlePhase += dt * 2.8;
      this.dustCooldownMs = 60;

      // Smoothly ease rotation, scale, and stride origin back to calm idle breathing
      const ease = Math.min(1, dt * 12);
      this.sprite.rotation += (0 - this.sprite.rotation) * ease;
      const breath = Math.sin(this.idlePhase) * 0.014;
      const targetScaleX = this.baseScaleX * (1 - breath * 0.4);
      const targetScaleY = this.baseScaleY * (1 + breath);
      this.sprite.scaleX += (targetScaleX - this.sprite.scaleX) * ease;
      this.sprite.scaleY += (targetScaleY - this.sprite.scaleY) * ease;

      const happyHop =
        this.happyRemainingMs > 0
          ? Math.abs(Math.sin(this.happyRemainingMs * 0.015)) * 0.09
          : 0;
      const targetOriginY = 0.96 + happyHop;
      const nextOriginY =
        this.sprite.originY + (targetOriginY - this.sprite.originY) * ease;
      this.sprite.setOrigin(0.5, nextOriginY);
    }

    // Expressions: celebration overrides natural blinking
    if (this.happyRemainingMs > 0) {
      this.happyRemainingMs -= deltaMs;
      if (this.happyRemainingMs <= 0) {
        this.sprite.setTexture(this.canonicalKey);
      }
    } else {
      this.updateBlink(deltaMs);
    }

    // Sync shadow & 2.5D depth sorting
    this.shadow.setPosition(this.sprite.x, this.sprite.y + 1);
    const shadowPulse = isMoving ? 0.92 + Math.abs(Math.sin(this.walkPhase)) * 0.12 : 1;
    this.shadow.setScale(shadowPulse, shadowPulse);
    this.shadow.setDepth(this.sprite.y - 1);
    this.sprite.setDepth(this.sprite.y);
  }

  private updateBlink(deltaMs: number): void {
    if (this.blinkDurationMs > 0) {
      this.blinkDurationMs -= deltaMs;
      if (this.blinkDurationMs <= 0) {
        this.sprite.setTexture(this.canonicalKey);
      }
      return;
    }

    this.blinkTimerMs -= deltaMs;
    if (this.blinkTimerMs <= 0) {
      this.blinkDurationMs = 150;
      this.blinkTimerMs = 2700 + Math.random() * 2400;
      this.sprite.setTexture(this.blinkKey);
    }
  }

  private spawnStepDust(): void {
    if (!this.scene.textures.exists("fx-dust")) return;
    const dust = this.scene.add.image(
      this.sprite.x + (Math.random() - 0.5) * 8,
      this.sprite.y - 1,
      "fx-dust"
    );
    dust.setDepth(this.sprite.y - 2);
    dust.setAlpha(0.55);
    dust.setScale(0.9);
    this.scene.tweens.add({
      targets: dust,
      y: dust.y - 7,
      alpha: 0,
      scale: 0.35,
      duration: 320,
      ease: "Sine.easeOut",
      onComplete: () => dust.destroy(),
    });
  }

  destroy(): void {
    this.shadow.destroy();
    this.sprite.destroy();
  }
}
