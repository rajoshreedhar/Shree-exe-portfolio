import Phaser from "phaser";
import { GAME_CONFIG, COVE_PALETTE } from "@/game/config/gameConfig";
import { ARRIVAL_INTERACTIONS } from "@/data/interactions";
import { Player } from "@/game/entities/Player";
import { generateCoveTextures } from "@/game/systems/coveTextures";
import { InteractionSystem } from "@/game/systems/InteractionSystem";
import type { GameEventBus } from "@/game/types/gameEvents";
import type { InteractionDefinition } from "@/game/types/interaction";

type AmbientMote = {
  sprite: Phaser.GameObjects.Arc;
  baseX: number;
  baseY: number;
  phase: number;
  speed: number;
  drift: number;
};

/**
 * Milestone 0 ("The First Morning") — Arrival Cove playable scene.
 * Compact warm coastal slice with wooden pier, sandy cove, sage meadow,
 * three distinct interactable objects, and one friendly Shree.exe island greeter NPC.
 */
export class ArrivalCoveScene extends Phaser.Scene {
  private eventBus!: GameEventBus;
  private player!: Player;
  private interactionSystem!: InteractionSystem;
  private solidGroup!: Phaser.Physics.Arcade.StaticGroup;

  private waterTiles: Phaser.GameObjects.Image[] = [];
  private flowerSprites: { sprite: Phaser.GameObjects.Image; phase: number }[] = [];
  private ambientMotes: AmbientMote[] = [];
  private parcelSprite: Phaser.GameObjects.Image | null = null;
  private npcSprite: Phaser.GameObjects.Image | null = null;
  private npcBaseY = 0;
  private npcBlinkTimer = 3100;
  private npcBlinkRemaining = 0;

  private waterAnimTimer = 0;
  private waterFrame = 0;
  private parcelDiscovered = false;
  private isDialogueOpen = false;
  private isPaused = false;
  private unsubscribers: (() => void)[] = [];

  constructor() {
    super({ key: "ArrivalCoveScene" });
  }

  preload(): void {
    this.load.image("shree-canonical", "/sprites/shree-canonical.png");
    this.load.image("shree-blink", "/sprites/shree-blink.png");
    this.load.image("shree-happy", "/sprites/shree-happy.png");
  }

  create(): void {
    this.eventBus = this.registry.get("eventBus") as GameEventBus;
    generateCoveTextures(this);

    const { worldWidth, worldHeight } = GAME_CONFIG;
    this.physics.world.setBounds(24, 24, worldWidth - 48, worldHeight - 48);

    this.solidGroup = this.physics.add.staticGroup();

    this.buildTerrainAndWater();
    this.buildDecorationsAndSolids();

    // Spawn player on the warm Arrival Pier facing inward toward the island
    this.player = new Player(this, 240, 560);
    this.physics.add.collider(this.player.sprite, this.solidGroup);

    this.interactionSystem = new InteractionSystem(this, this.eventBus);
    this.buildInteractablesAndNpc();
    this.buildAmbientMorningLife();

    // Smooth camera follow clamped cleanly inside world bounds
    const cam = this.cameras.main;
    cam.setBounds(0, 0, worldWidth, worldHeight);
    cam.startFollow(
      this.player.sprite,
      true,
      GAME_CONFIG.cameraLerp,
      GAME_CONFIG.cameraLerp
    );
    cam.setRoundPixels(true);

    this.bindEventBus();
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.cleanup());
    this.events.once(Phaser.Scenes.Events.DESTROY, () => this.cleanup());

    this.eventBus.emit("scene:ready");

    // Cozy opening arrival welcome beat
    this.time.delayedCall(380, () => {
      if (!this.scene.isActive() || this.isPaused || this.isDialogueOpen) return;
      this.openDialogue("welcomeArrival", "welcome-arrival");
    });
  }

  update(time: number, delta: number): void {
    // Smooth water wave cycle even when standing still
    this.waterAnimTimer += delta;
    if (this.waterAnimTimer >= 520) {
      this.waterAnimTimer = 0;
      this.waterFrame = (this.waterFrame + 1) % 3;
      const key = `tile-water-${this.waterFrame}`;
      for (const tile of this.waterTiles) {
        tile.setTexture(key);
      }
    }

    // Gentle wildflower breeze sway
    for (const f of this.flowerSprites) {
      f.sprite.setRotation(Math.sin(time * 0.0024 + f.phase) * 0.09);
    }

    // Soft floating morning pollen motes
    for (const mote of this.ambientMotes) {
      mote.sprite.x = mote.baseX + Math.sin(time * mote.speed + mote.phase) * mote.drift;
      mote.sprite.y = mote.baseY + Math.cos(time * mote.speed * 0.8 + mote.phase) * (mote.drift * 0.6);
      mote.sprite.alpha = 0.25 + (Math.sin(time * 0.002 + mote.phase) + 1) * 0.22;
    }

    // NPC gentle idle bob + natural blink
    if (this.npcSprite) {
      this.npcSprite.y = this.npcBaseY + Math.sin(time * 0.0032) * 1.6;
      if (this.npcBlinkRemaining > 0) {
        this.npcBlinkRemaining -= delta;
        if (this.npcBlinkRemaining <= 0 && this.textures.exists("shree-canonical")) {
          this.npcSprite.setTexture("shree-canonical");
        }
      } else {
        this.npcBlinkTimer -= delta;
        if (this.npcBlinkTimer <= 0 && this.textures.exists("shree-blink")) {
          this.npcBlinkRemaining = 145;
          this.npcBlinkTimer = 2900 + Math.random() * 2400;
          this.npcSprite.setTexture("shree-blink");
        }
      }
    }

    if (this.isPaused) return;

    this.player.update(delta);
    this.interactionSystem.update(time, this.player.x, this.player.y);
  }

  private bindEventBus(): void {
    this.unsubscribers.push(
      this.eventBus.on("dialogue:close", () => {
        this.isDialogueOpen = false;
        this.syncInputLocks();
      }),
      this.eventBus.on("game:pause", () => {
        this.isPaused = true;
        this.syncInputLocks();
      }),
      this.eventBus.on("game:resume", () => {
        this.isPaused = false;
        this.syncInputLocks();
      }),
      this.eventBus.on("input:virtual", (input) => {
        this.player.setVirtualInput(input);
      })
    );
  }

  private syncInputLocks(): void {
    const locked = this.isDialogueOpen || this.isPaused;
    this.player.setMovementLocked(locked);
    this.interactionSystem.setLocked(locked);
  }

  private openDialogue(
    dialogueId: string,
    interactionId: string,
    actionLink?: InteractionDefinition["actionLink"]
  ): void {
    this.isDialogueOpen = true;
    this.syncInputLocks();
    this.eventBus.emit("dialogue:start", {
      dialogueId,
      interactionId,
      actionLink,
    });
  }

  /**
   * Builds a compact 36×22 coastal cove layout:
   * - Water along the bottom & far-right coastline (blocked by invisible shoreline colliders)
   * - Wooden arrival pier extending out from the sandy beach
   * - Golden sandy cove smoothly transitioning into warm sage meadow
   * - Packed-earth path linking Pier -> Signboard -> NPC Crossroads -> Noticeboard & Parcel Grove
   */
  private buildTerrainAndWater(): void {
    const T = GAME_CONFIG.tileSize;
    const cols = GAME_CONFIG.mapCols;
    const rows = GAME_CONFIG.mapRows;

    const isPierTile = (c: number, r: number) =>
      c >= 6 && c <= 8 && r >= 15 && r <= 19;

    const isWaterTile = (c: number, r: number) => {
      if (isPierTile(c, r)) return false;
      if (r >= 17) return true;
      if (r === 16 && (c < 11 || c > 24)) return true;
      if (c >= 32 && r >= 11) return true;
      if (c >= 33 && r >= 8) return true;
      return false;
    };

    const isSandTile = (c: number, r: number) => {
      if (r >= 14 && r <= 16 && c >= 2 && c <= 31) return true;
      if (r === 13 && c >= 4 && c <= 29) return true;
      if (c >= 30 && c <= 32 && r >= 8 && r <= 15) return true;
      return false;
    };

    const isPathTile = (c: number, r: number) => {
      // Pier north to signboard & crossroads
      if (c >= 7 && c <= 8 && r >= 8 && r <= 14) return true;
      // Crossroads east-west spine
      if (r >= 8 && r <= 9 && c >= 8 && c <= 25) return true;
      // Branch north-west to Noticeboard studio clearing
      if (c >= 10 && c <= 12 && r >= 5 && r <= 8) return true;
      // Branch south-east to Tiny Parcel grove
      if (c >= 24 && c <= 25 && r >= 9 && r <= 12) return true;
      return false;
    };

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * T + T / 2;
        const y = r * T + T / 2;

        if (isWaterTile(c, r)) {
          const water = this.add.image(x, y, "tile-water-0").setDepth(-20);
          this.waterTiles.push(water);
          // Invisible collider so player cannot walk into the sea
          this.addStaticBlocker(x, y, T, T);
          continue;
        }

        if (isPierTile(c, r)) {
          // Water underneath pier edges + wooden planks on top
          const underWater = this.add.image(x, y, "tile-water-0").setDepth(-20);
          this.waterTiles.push(underWater);
          this.add.image(x, y, "tile-pier").setDepth(-10);
          continue;
        }

        if (isPathTile(c, r)) {
          this.add.image(x, y, "tile-path").setDepth(-14);
        } else if (isSandTile(c, r)) {
          const variant = (c + r * 3) % 5 === 0 ? "tile-sand-1" : "tile-sand-0";
          this.add.image(x, y, variant).setDepth(-16);
        } else {
          const variant = (c * 2 + r) % 4 === 0 ? "tile-grass-1" : "tile-grass-0";
          this.add.image(x, y, variant).setDepth(-16);
        }

        // Soft shoreline foam line where beach meets southern water
        if (r === 16 && !isWaterTile(c, r) && isWaterTile(c, r + 1)) {
          this.add
            .rectangle(x, y + T / 2 - 2, T, 4, 0xeef1eb, 0.72)
            .setDepth(-12);
        }
      }
    }

    // Pier posts (decorative at the four corners of the wooden pier)
    const pierPosts: [number, number][] = [
      [6 * T + 5, 19 * T + 22],
      [9 * T - 5, 19 * T + 22],
      [6 * T + 5, 16 * T + 18],
      [9 * T - 5, 16 * T + 18],
    ];
    for (const [px, py] of pierPosts) {
      this.add.image(px, py, "prop-pier-post").setOrigin(0.5, 0.85).setDepth(py);
    }

    // Subtle pier end rail collider so player stays safely on the pier
    this.addStaticBlocker(7.5 * T, 20 * T + 8, 3 * T, 14);
  }

  private buildDecorationsAndSolids(): void {
    // Organic coastal trees framing the northern & outer perimeter
    const treePositions: [number, number][] = [
      [78, 96],
      [158, 78],
      [252, 74],
      [496, 86],
      [598, 76],
      [712, 82],
      [840, 92],
      [948, 118],
      [1018, 186],
      [86, 212],
      [104, 344],
      [982, 326],
      [888, 438],
      [518, 412],
    ];

    for (const [tx, ty] of treePositions) {
      const tree = this.add.image(tx, ty, "prop-tree-round");
      tree.setOrigin(0.5, 0.88);
      tree.setDepth(ty);
      // Trunk-sized solid collider so player can walk behind canopy naturally
      this.addStaticBlocker(tx, ty - 4, 24, 16);
    }

    // Flowering coastal bushes
    const bushPositions: [number, number][] = [
      [182, 172],
      [446, 152],
      [672, 168],
      [878, 224],
      [918, 368],
      [148, 424],
      [464, 456],
      [736, 454],
    ];

    for (const [bx, by] of bushPositions) {
      const bush = this.add.image(bx, by, "prop-bush");
      bush.setOrigin(0.5, 0.84);
      bush.setDepth(by);
      this.addStaticBlocker(bx, by - 3, 24, 14);
    }

    // Coastal mossy rocks
    const rockPositions: [number, number][] = [
      [112, 492],
      [404, 498],
      [626, 486],
      [932, 466],
      [304, 128],
      [778, 148],
    ];

    for (const [rx, ry] of rockPositions) {
      const rock = this.add.image(rx, ry, "prop-rock");
      rock.setOrigin(0.5, 0.82);
      rock.setDepth(ry);
      this.addStaticBlocker(rx, ry - 3, 24, 14);
    }

    // Cozy warm path lanterns (near signboard & crossroads)
    const lanternPositions: [number, number][] = [
      [204, 418],
      [536, 246],
      [770, 320],
    ];

    for (const [lx, ly] of lanternPositions) {
      const lantern = this.add.image(lx, ly, "prop-lantern");
      lantern.setOrigin(0.5, 0.9);
      lantern.setDepth(ly);
      // Subtle warm glow halo on ground
      const glow = this.add.circle(lx, ly - 18, 22, 0xf5dda3, 0.14);
      glow.setDepth(ly - 2);
      this.tweens.add({
        targets: glow,
        alpha: { from: 0.11, to: 0.21 },
        scale: { from: 0.96, to: 1.06 },
        duration: 2100,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
      });
      this.addStaticBlocker(lx, ly - 3, 12, 10);
    }

    // Non-solid wildflowers scattered gently around the meadow
    const flowerPositions: [number, number, "pink" | "cream"][] = [
      [196, 366, "pink"],
      [294, 392, "cream"],
      [346, 338, "pink"],
      [448, 228, "cream"],
      [502, 344, "pink"],
      [622, 232, "cream"],
      [694, 356, "pink"],
      [756, 408, "cream"],
      [838, 372, "pink"],
      [856, 304, "cream"],
      [338, 206, "pink"],
      [412, 198, "cream"],
    ];

    for (let i = 0; i < flowerPositions.length; i++) {
      const [fx, fy, kind] = flowerPositions[i];
      const sprite = this.add.image(
        fx,
        fy,
        kind === "pink" ? "prop-flower-pink" : "prop-flower-cream"
      );
      sprite.setOrigin(0.5, 0.9);
      sprite.setDepth(-11);
      this.flowerSprites.push({ sprite, phase: i * 0.7 });
    }
  }

  private buildInteractablesAndNpc(): void {
    const signDef = ARRIVAL_INTERACTIONS.find((i) => i.id === "island-sign")!;
    const parcelDef = ARRIVAL_INTERACTIONS.find((i) => i.id === "tiny-parcel")!;
    const boardDef = ARRIVAL_INTERACTIONS.find((i) => i.id === "noticeboard")!;
    const npcDef = ARRIVAL_INTERACTIONS.find((i) => i.id === "npc-shree")!;

    // Object 1: Wooden Signboard (right beside the pier path entrance)
    const signX = 296;
    const signY = 414;
    const sign = this.add.image(signX, signY, "obj-signboard");
    sign.setOrigin(0.5, 0.9);
    sign.setDepth(signY);
    this.addStaticBlocker(signX, signY - 6, 28, 14);
    this.interactionSystem.register({
      definition: signDef,
      x: signX,
      y: signY - 8,
      indicatorOffsetY: 44,
      onInteract: (def) => this.openDialogue(def.dialogueId, def.id),
    });

    // Object 2: Tiny Parcel (cozy eastern wildflower clearing)
    const parcelX = 812;
    const parcelY = 390;
    const parcel = this.add.image(parcelX, parcelY, "obj-parcel-closed");
    parcel.setOrigin(0.5, 0.85);
    parcel.setDepth(parcelY);
    this.parcelSprite = parcel;
    this.addStaticBlocker(parcelX, parcelY - 4, 20, 12);
    this.interactionSystem.register({
      definition: parcelDef,
      x: parcelX,
      y: parcelY - 4,
      indicatorOffsetY: 32,
      onInteract: (def) => {
        if (!this.parcelDiscovered) {
          this.parcelDiscovered = true;
          this.parcelSprite?.setTexture("obj-parcel-opened");
          this.spawnDiscoverySparkles(parcelX, parcelY - 12);
          this.player.celebrate();
          this.eventBus.emit("discovery:found", {
            itemId: def.id,
            title: def.discoveryTitle ?? "Discovery Found",
            note: def.discoveryNote ?? "You found a tiny parcel note.",
          });
          this.openDialogue(def.dialogueId, def.id);
        } else {
          this.openDialogue(
            def.postDiscoveryDialogueId ?? def.dialogueId,
            def.id
          );
        }
      },
    });

    // Object 3: Creator's Noticeboard (upper-west studio alcove)
    const boardX = 368;
    const boardY = 178;
    const board = this.add.image(boardX, boardY, "obj-noticeboard");
    board.setOrigin(0.5, 0.9);
    board.setDepth(boardY);
    this.addStaticBlocker(boardX, boardY - 6, 44, 16);
    this.interactionSystem.register({
      definition: boardDef,
      x: boardX,
      y: boardY - 6,
      indicatorOffsetY: 54,
      radius: 82,
      onInteract: (def) =>
        this.openDialogue(def.dialogueId, def.id, def.actionLink),
    });

    // NPC: Shree.exe island greeter standing by the sunlit meadow crossroads
    const npcX = 594;
    const npcY = 278;
    this.npcBaseY = npcY;

    this.add.ellipse(npcX, npcY + 1, 26, 10, 0x24201f, 0.24).setDepth(npcY - 1);
    const npcKey = this.textures.exists("shree-canonical")
      ? "shree-canonical"
      : "shree-placeholder";
    const npc = this.add.image(npcX, npcY, npcKey);
    npc.setOrigin(0.5, 0.96);
    const frame = this.textures.getFrame(npcKey);
    const npcScale = frame && frame.height > 0 ? 56 / frame.height : 1;
    npc.setScale(npcScale);
    npc.setFlipX(true);
    npc.setDepth(npcY);
    this.npcSprite = npc;

    // Subtle warm name badge beneath NPC so visitors immediately recognize Shree.exe
    const npcTagBg = this.add
      .rectangle(npcX, npcY + 13, 66, 15, 0x24201f, 0.84)
      .setDepth(npcY + 2);
    npcTagBg.setStrokeStyle(1, 0xd9bfc0, 0.7);
    this.add
      .text(npcX, npcY + 13, "SHREE.EXE", {
        fontFamily: "monospace",
        fontSize: "9px",
        color: "#faf7f2",
      })
      .setOrigin(0.5, 0.5)
      .setDepth(npcY + 3);

    this.addStaticBlocker(npcX, npcY - 4, 22, 14);
    this.interactionSystem.register({
      definition: npcDef,
      x: npcX,
      y: npcY - 6,
      indicatorOffsetY: 64,
      radius: 80,
      onInteract: (def) => {
        // Face toward the player when spoken to
        if (this.npcSprite) {
          this.npcSprite.setFlipX(this.player.x < npcX);
          if (this.textures.exists("shree-happy")) {
            this.npcSprite.setTexture("shree-happy");
            this.time.delayedCall(900, () => {
              if (this.npcSprite && this.textures.exists("shree-canonical")) {
                this.npcSprite.setTexture("shree-canonical");
              }
            });
          }
        }
        this.openDialogue(def.dialogueId, def.id);
      },
    });
  }

  private buildAmbientMorningLife(): void {
    // Soft golden morning pollen motes drifting slowly through the air
    const count = 14;
    for (let i = 0; i < count; i++) {
      const baseX = 110 + Math.random() * (GAME_CONFIG.worldWidth - 220);
      const baseY = 90 + Math.random() * (GAME_CONFIG.worldHeight - 240);
      const color = i % 3 === 0 ? 0xd9bfc0 : 0xfaf7f2;
      const dot = this.add.circle(baseX, baseY, i % 2 === 0 ? 2 : 1.5, color, 0.4);
      dot.setDepth(1500);
      this.ambientMotes.push({
        sprite: dot,
        baseX,
        baseY,
        phase: Math.random() * Math.PI * 2,
        speed: 0.00055 + Math.random() * 0.00045,
        drift: 12 + Math.random() * 14,
      });
    }

    // Subtle warm sunlit corner vignette tint (very light, keeps art vivid)
    this.add
      .rectangle(
        GAME_CONFIG.worldWidth / 2,
        GAME_CONFIG.worldHeight / 2,
        GAME_CONFIG.worldWidth,
        GAME_CONFIG.worldHeight,
        Phaser.Display.Color.HexStringToColor(COVE_PALETTE.warmAmber).color,
        0.04
      )
      .setDepth(1400);
  }

  private spawnDiscoverySparkles(x: number, y: number): void {
    if (!this.textures.exists("fx-sparkle")) return;
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8;
      const sparkle = this.add.image(x, y, "fx-sparkle").setDepth(1800);
      sparkle.setScale(0.7);
      this.tweens.add({
        targets: sparkle,
        x: x + Math.cos(angle) * 28,
        y: y + Math.sin(angle) * 22 - 10,
        alpha: 0,
        scale: 1.35,
        duration: 620,
        ease: "Cubic.easeOut",
        onComplete: () => sparkle.destroy(),
      });
    }
  }

  private addStaticBlocker(x: number, y: number, w: number, h: number): void {
    const rect = this.add.rectangle(x, y, w, h, 0x000000, 0);
    this.physics.add.existing(rect, true);
    this.solidGroup.add(rect);
  }

  private cleanup(): void {
    for (const unsub of this.unsubscribers) {
      unsub();
    }
    this.unsubscribers = [];
    this.interactionSystem?.destroy();
    this.player?.destroy();
  }
}
