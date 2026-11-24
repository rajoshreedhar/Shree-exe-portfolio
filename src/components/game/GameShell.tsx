"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Pause, Sparkles, X } from "lucide-react";
import { getDialogueLines } from "@/data/dialogue";
import {
  GameEventBus,
  type DialogueStartPayload,
  type DiscoveryFoundPayload,
  type VirtualInputState,
} from "@/game/types/gameEvents";
import type { ActivePrompt } from "@/game/types/interaction";
import { GameCanvas } from "./GameCanvas";
import { GameLoading } from "./GameLoading";
import { GameError } from "./GameError";
import { DialogueBox } from "./DialogueBox";
import { MobileControls } from "./MobileControls";
import { GameMenu } from "./GameMenu";
import { PixelStarIcon } from "@/components/ui/PixelIcons";

interface GameShellProps {
  onReturnToTitle: () => void;
}

export function GameShell({ onReturnToTitle }: GameShellProps) {
  const [sessionId, setSessionId] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activePrompt, setActivePrompt] = useState<ActivePrompt | null>(null);
  const [activeDialogue, setActiveDialogue] =
    useState<DialogueStartPayload | null>(null);
  const [discoveryToast, setDiscoveryToast] =
    useState<DiscoveryFoundPayload | null>(null);
  const [discoveredCount, setDiscoveredCount] = useState(0);

  // One dedicated event bus per game session (fresh on retry)
  const eventBus = useMemo(() => new GameEventBus(), [sessionId]);

  useEffect(() => {
    const unsubReady = eventBus.on("scene:ready", () => {
      setIsReady(true);
    });

    const unsubPrompt = eventBus.on("interaction:prompt", (prompt) => {
      setActivePrompt(prompt);
    });

    const unsubDialogue = eventBus.on("dialogue:start", (payload) => {
      setActiveDialogue(payload);
    });

    const unsubDiscovery = eventBus.on("discovery:found", (payload) => {
      setDiscoveredCount((count) => count + 1);
      setDiscoveryToast(payload);
    });

    return () => {
      unsubReady();
      unsubPrompt();
      unsubDialogue();
      unsubDiscovery();
    };
  }, [eventBus]);

  // Auto-dismiss discovery notification gently after 4.5s
  useEffect(() => {
    if (!discoveryToast) return;
    const timer = setTimeout(() => setDiscoveryToast(null), 4500);
    return () => clearTimeout(timer);
  }, [discoveryToast]);

  const handleCloseDialogue = useCallback(() => {
    setActiveDialogue(null);
    eventBus.emit("dialogue:close");
  }, [eventBus]);

  const handlePause = useCallback(() => {
    setIsPaused(true);
    eventBus.emit("game:pause");
  }, [eventBus]);

  const handleResume = useCallback(() => {
    setIsPaused(false);
    eventBus.emit("game:resume");
  }, [eventBus]);

  const handleRetry = useCallback(() => {
    setHasError(false);
    setIsReady(false);
    setIsPaused(false);
    setActivePrompt(null);
    setActiveDialogue(null);
    setDiscoveryToast(null);
    setDiscoveredCount(0);
    setSessionId((id) => id + 1);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsReady(false);
  }, []);

  const handleVirtualInput = useCallback(
    (input: VirtualInputState) => {
      eventBus.emit("input:virtual", input);
    },
    [eventBus]
  );

  const handleTriggerInteract = useCallback(() => {
    eventBus.emit("interaction:trigger");
  }, [eventBus]);

  // Escape toggles Pause Menu when no dialogue is currently open
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (activeDialogue || hasError) return;
      event.preventDefault();
      if (isPaused) {
        handleResume();
      } else {
        handlePause();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeDialogue, hasError, isPaused, handlePause, handleResume]);

  const dialogueLines = activeDialogue
    ? getDialogueLines(activeDialogue.dialogueId)
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-porcelain text-ink">
      {/* Compact Game Top Navigation HUD */}
      <header className="border-b border-ink/15 bg-porcelain-soft/95">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-3 sm:px-6">
          <div className="flex items-center gap-2 min-w-0">
            <PixelStarIcon size={14} />
            <span className="font-pixel text-[9px] sm:text-[11px] text-ink truncate">
              ARRIVAL COVE
            </span>
            {discoveredCount > 0 && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 bg-powder-pink/55 text-ink text-xs font-semibold tabular-nums">
                <Sparkles className="w-3 h-3 text-burgundy" />
                {discoveredCount} discovery
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1 min-h-[40px] px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold text-ink hover:text-burgundy transition-colors"
            >
              <span className="hidden sm:inline">Quick Portfolio</span>
              <span className="sm:hidden">Portfolio</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-burgundy shrink-0" />
            </Link>

            <button
              type="button"
              onClick={isPaused ? handleResume : handlePause}
              aria-label="Open pause menu (Escape)"
              className="inline-flex items-center gap-1.5 min-h-[40px] px-3 py-1.5 bg-ink text-porcelain text-xs font-semibold hover:bg-burgundy transition-colors cursor-pointer shrink-0"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Playable Stage */}
      <main
        id="main-content"
        className="flex-1 flex flex-col items-center justify-start sm:justify-center px-0 sm:px-6 py-0 sm:py-6"
      >
        <div className="w-full max-w-[960px]">
          {hasError ? (
            <div className="px-4 py-6 sm:px-0 sm:py-0">
              <GameError onRetry={handleRetry} onReturnHome={onReturnToTitle} />
            </div>
          ) : (
            <div className="bg-porcelain-soft sm:pixel-window-frame overflow-hidden">
              {/* Viewport Frame (exact 16:9 matching 960x540 Phaser canvas, zero letterboxing) */}
              <div className="relative w-full aspect-[16/9] bg-[#7ea1a6] overflow-hidden">
                <GameCanvas
                  key={sessionId}
                  eventBus={eventBus}
                  onError={handleError}
                />

                {!isReady && <GameLoading />}

                {/* Discovery Found Banner */}
                {discoveryToast && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="absolute top-3 left-1/2 -translate-x-1/2 z-30 w-[min(360px,calc(100%-1.5rem))] bg-ink text-porcelain border border-powder-pink/70 px-4 py-2.5 shadow-lg flex items-center justify-between gap-3 island-panel-enter"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Sparkles className="w-4 h-4 text-powder-pink shrink-0" />
                      <div className="min-w-0">
                        <p className="font-pixel text-[10px] text-powder-pink uppercase">
                          {discoveryToast.title}
                        </p>
                        <p className="text-xs text-porcelain/90 truncate">
                          {discoveryToast.note}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDiscoveryToast(null)}
                      aria-label="Dismiss discovery notification"
                      className="p-1 text-porcelain/75 hover:text-powder-pink cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Contextual Nearby Prompt Chip (desktop & clickable) */}
                {isReady && activePrompt && !activeDialogue && !isPaused && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 island-panel-enter">
                    <button
                      type="button"
                      onClick={handleTriggerInteract}
                      className="inline-flex items-center gap-2.5 min-h-[42px] px-4 py-2 bg-porcelain-soft/96 text-ink border border-ink/85 shadow-md hover:bg-burgundy hover:text-porcelain-soft transition-colors cursor-pointer group"
                    >
                      <kbd className="inline-flex items-center justify-center h-6 min-w-6 px-1.5 bg-burgundy text-porcelain-soft font-pixel text-[10px] group-hover:bg-porcelain-soft group-hover:text-burgundy">
                        E
                      </kbd>
                      <span className="text-xs sm:text-sm font-semibold">
                        {activePrompt.prompt}
                      </span>
                    </button>
                  </div>
                )}

                {/* Dialogue Overlay */}
                {activeDialogue && !isPaused && (
                  <DialogueBox
                    key={`${activeDialogue.interactionId}-${activeDialogue.dialogueId}`}
                    lines={dialogueLines}
                    actionLink={activeDialogue.actionLink}
                    onClose={handleCloseDialogue}
                  />
                )}

                {/* Pause Menu Overlay */}
                {isPaused && (
                  <GameMenu
                    onResume={handleResume}
                    onReturnToTitle={onReturnToTitle}
                  />
                )}
              </div>

              {/* Desktop Instruction Footer Bar */}
              <div className="hidden lg:flex items-center justify-between gap-4 px-5 py-3 bg-porcelain-deep/80 border-t border-ink/15 text-xs text-stone-text">
                <div className="flex items-center gap-4">
                  <span>
                    <strong className="text-ink">WASD / Arrows</strong> Move
                  </span>
                  <span>
                    <strong className="text-ink">E / Enter</strong> Interact
                  </span>
                  <span>
                    <strong className="text-ink">Esc</strong> Pause Menu
                  </span>
                </div>
                <span className="text-ink/80">
                  Explore the signboard, tiny parcel, noticeboard, and Shree.exe
                </span>
              </div>

              {/* Mobile & Tablet Touch Controls (seated cleanly below viewport, never covering dialogue) */}
              <div className="lg:hidden">
                <MobileControls
                  activePrompt={activePrompt}
                  disabled={!isReady || Boolean(activeDialogue) || isPaused}
                  onInputChange={handleVirtualInput}
                  onInteract={handleTriggerInteract}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
