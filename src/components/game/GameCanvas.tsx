"use client";

import React, { useEffect, useRef } from "react";
import type { GameEventBus } from "@/game/types/gameEvents";
import {
  createArrivalCoveGame,
  type ManagedPhaserGame,
} from "@/lib/game/createGame";
import { destroyArrivalCoveGame } from "@/lib/game/destroyGame";

interface GameCanvasProps {
  eventBus: GameEventBus;
  onError: () => void;
}

/**
 * Owns the single mounted Phaser 3 canvas container.
 * Uses a ref (not render state) and a Strict-Mode-safe cancellation flag
 * so exiting and re-entering Adventure Mode never creates overlapping canvases
 * or stalls on the loading screen in React Strict Mode.
 */
export function GameCanvas({ eventBus, onError }: GameCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gameRef = useRef<ManagedPhaserGame | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;

    async function boot() {
      if (!container) return;

      try {
        const instance = await createArrivalCoveGame(
          container,
          eventBus,
          () => cancelled
        );

        if (!instance) return;

        if (cancelled) {
          destroyArrivalCoveGame(instance);
          return;
        }

        gameRef.current = instance;
      } catch (error) {
        console.error("Unable to start SHREE.EXE Arrival Cove:", error);
        if (!cancelled) {
          onError();
        }
      }
    }

    void boot();

    return () => {
      cancelled = true;
      destroyArrivalCoveGame(gameRef.current);
      gameRef.current = undefined;
    };
  }, [eventBus, onError]);

  return (
    <div
      ref={containerRef}
      aria-label="SHREE.EXE Arrival Cove interactive canvas"
      className="game-canvas-container w-full h-full touch-none select-none"
    />
  );
}
