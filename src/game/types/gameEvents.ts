import type { ActivePrompt, InteractionActionLink } from "./interaction";

export type VirtualInputState = {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
};

export type DialogueStartPayload = {
  dialogueId: string;
  interactionId: string;
  actionLink?: InteractionActionLink;
};

export type DiscoveryFoundPayload = {
  itemId: string;
  title: string;
  note: string;
};

export type GameEventMap = {
  "scene:ready": undefined;
  "dialogue:start": DialogueStartPayload;
  "dialogue:close": undefined;
  "interaction:prompt": ActivePrompt | null;
  "interaction:trigger": undefined;
  "discovery:found": DiscoveryFoundPayload;
  "input:virtual": VirtualInputState;
  "game:pause": undefined;
  "game:resume": undefined;
};

type EventHandler<T> = (payload: T) => void;

/**
 * Lightweight, Phaser-free typed event bus shared between React and Phaser.
 * One instance is created per mounted game session and cleared on destroy.
 */
export class GameEventBus {
  private listeners = new Map<keyof GameEventMap, Set<EventHandler<unknown>>>();

  on<K extends keyof GameEventMap>(
    event: K,
    handler: EventHandler<GameEventMap[K]>
  ): () => void {
    let set = this.listeners.get(event);
    if (!set) {
      set = new Set();
      this.listeners.set(event, set);
    }
    set.add(handler as EventHandler<unknown>);
    return () => this.off(event, handler);
  }

  off<K extends keyof GameEventMap>(
    event: K,
    handler: EventHandler<GameEventMap[K]>
  ): void {
    const set = this.listeners.get(event);
    if (!set) return;
    set.delete(handler as EventHandler<unknown>);
    if (set.size === 0) {
      this.listeners.delete(event);
    }
  }

  emit<K extends keyof GameEventMap>(
    event: K,
    ...args: GameEventMap[K] extends undefined ? [] : [GameEventMap[K]]
  ): void {
    const set = this.listeners.get(event);
    if (!set || set.size === 0) return;
    const payload = args[0] as GameEventMap[K];
    for (const handler of Array.from(set)) {
      (handler as EventHandler<GameEventMap[K]>)(payload);
    }
  }

  clear(): void {
    this.listeners.clear();
  }
}
