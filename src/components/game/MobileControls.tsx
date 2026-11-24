"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Hand,
} from "lucide-react";
import type { VirtualInputState } from "@/game/types/gameEvents";
import type { ActivePrompt } from "@/game/types/interaction";

interface MobileControlsProps {
  activePrompt: ActivePrompt | null;
  disabled: boolean;
  onInputChange: (state: VirtualInputState) => void;
  onInteract: () => void;
}

type DirectionKey = keyof VirtualInputState;

const EMPTY_INPUT: VirtualInputState = {
  up: false,
  down: false,
  left: false,
  right: false,
};

/**
 * Touch-friendly 4-way directional pad + dedicated Interact button.
 * Uses touch-action: none and pointer release guards so movement stops
 * immediately on release and the page never scrolls during play.
 */
export function MobileControls({
  activePrompt,
  disabled,
  onInputChange,
  onInteract,
}: MobileControlsProps) {
  const [pressed, setPressed] = useState<VirtualInputState>(EMPTY_INPUT);
  const pressedRef = useRef<VirtualInputState>(EMPTY_INPUT);

  const releaseAll = useCallback(() => {
    const hadAny =
      pressedRef.current.up ||
      pressedRef.current.down ||
      pressedRef.current.left ||
      pressedRef.current.right;
    if (!hadAny) return;
    pressedRef.current = { ...EMPTY_INPUT };
    setPressed(EMPTY_INPUT);
    onInputChange(EMPTY_INPUT);
  }, [onInputChange]);

  useEffect(() => {
    if (disabled) {
      releaseAll();
    }
  }, [disabled, releaseAll]);

  useEffect(() => {
    window.addEventListener("blur", releaseAll);
    return () => {
      window.removeEventListener("blur", releaseAll);
      releaseAll();
    };
  }, [releaseAll]);

  const setDirection = (dir: DirectionKey, active: boolean) => {
    if (disabled && active) return;
    if (pressedRef.current[dir] === active) return;
    const next = { ...pressedRef.current, [dir]: active };
    pressedRef.current = next;
    setPressed(next);
    onInputChange(next);
  };

  const makePadButtonProps = (dir: DirectionKey, label: string) => ({
    type: "button" as const,
    "aria-label": label,
    disabled,
    onPointerDown: (e: React.PointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.currentTarget.setPointerCapture?.(e.pointerId);
      setDirection(dir, true);
    },
    onPointerUp: (e: React.PointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setDirection(dir, false);
    },
    onPointerCancel: () => setDirection(dir, false),
    onLostPointerCapture: () => setDirection(dir, false),
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
    className: `h-12 w-12 flex items-center justify-center border border-ink/80 touch-none select-none transition-colors cursor-pointer ${
      pressed[dir]
        ? "bg-burgundy text-porcelain-soft"
        : "bg-porcelain-soft text-ink active:bg-porcelain-deep"
    } disabled:opacity-45`,
  });

  return (
    <div
      aria-label="Touch gameplay controls"
      className="flex items-center justify-between gap-3 px-3 py-3.5 bg-porcelain-deep/90 border-t border-ink/15 touch-none select-none"
    >
      {/* 4-Way Directional Pad */}
      <div className="grid grid-cols-3 gap-1 w-[152px] shrink-0" role="group" aria-label="Move Shree.exe">
        <div />
        <button {...makePadButtonProps("up", "Move up")}>
          <ChevronUp className="w-6 h-6" />
        </button>
        <div />

        <button {...makePadButtonProps("left", "Move left")}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div
          aria-hidden="true"
          className="h-12 w-12 flex items-center justify-center bg-porcelain border border-ink/20"
        >
          <span className="h-2.5 w-2.5 bg-stone/70" />
        </div>
        <button {...makePadButtonProps("right", "Move right")}>
          <ChevronRight className="w-6 h-6" />
        </button>

        <div />
        <button {...makePadButtonProps("down", "Move down")}>
          <ChevronDown className="w-6 h-6" />
        </button>
        <div />
      </div>

      {/* Dedicated Interaction Button */}
      <div className="flex flex-col items-end gap-2 min-w-0">
        <button
          type="button"
          onClick={onInteract}
          disabled={disabled || !activePrompt}
          aria-label={
            activePrompt
              ? `Interact: ${activePrompt.prompt}`
              : "Interact (move closer to an object)"
          }
          className={`inline-flex flex-col items-center justify-center min-h-[76px] min-w-[104px] max-w-[144px] px-3 py-3 border border-ink/85 touch-none select-none transition-all duration-150 cursor-pointer ${
            activePrompt && !disabled
              ? "bg-burgundy text-porcelain-soft shadow-md active:scale-95"
              : "bg-porcelain-soft text-stone-text opacity-75"
          }`}
        >
          <Hand className="w-5 h-5 mb-1" />
          <span className="font-pixel text-[10px] uppercase">INTERACT</span>
          <span className="text-[11px] font-medium mt-0.5 max-w-[116px] truncate">
            {activePrompt ? activePrompt.prompt : "Walk closer"}
          </span>
        </button>
      </div>
    </div>
  );
}
