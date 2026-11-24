"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import type { DialogueLine } from "@/data/dialogue";
import type { InteractionActionLink } from "@/game/types/interaction";
import { PixelStarIcon } from "@/components/ui/PixelIcons";

interface DialogueBoxProps {
  lines: DialogueLine[];
  actionLink?: InteractionActionLink;
  onClose: () => void;
}

/**
 * React-owned dialogue overlay.
 * While mounted, Phaser movement and interaction inputs are locked so React
 * cleanly owns Enter, Space, and Escape with zero double-triggering.
 */
export function DialogueBox({ lines, actionLink, onClose }: DialogueBoxProps) {
  const [index, setIndex] = useState(0);
  const primaryButtonRef = useRef<HTMLButtonElement | null>(null);

  const safeLines =
    lines.length > 0
      ? lines
      : [{ speaker: "The Little Island", text: "A quiet corner of the cove." }];
  const current = safeLines[Math.min(index, safeLines.length - 1)];
  const isLastLine = index >= safeLines.length - 1;

  const handleAdvance = () => {
    if (isLastLine) {
      onClose();
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    primaryButtonRef.current?.focus();
  }, [index]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        // Let Enter activate a focused link naturally instead of closing prematurely
        if (
          document.activeElement &&
          document.activeElement.tagName.toLowerCase() === "a"
        ) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        if (index >= safeLines.length - 1) {
          onClose();
        } else {
          setIndex((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown, { capture: true });
    return () =>
      window.removeEventListener("keydown", onKeyDown, { capture: true });
  }, [index, safeLines.length, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={`Dialogue with ${current.speaker}`}
      className="absolute inset-x-3 bottom-3 sm:inset-x-6 sm:bottom-5 z-30 flex justify-center pointer-events-none"
    >
      <div className="pointer-events-auto w-full max-w-2xl bg-porcelain-soft/98 text-ink pixel-window-frame island-panel-enter">
        {/* Speaker Bar */}
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-porcelain-deep border-b border-ink/20">
          <div className="flex items-center gap-2 min-w-0">
            <PixelStarIcon size={13} />
            <span className="font-pixel text-[11px] text-burgundy uppercase truncate">
              {current.speaker}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-stone-text tabular-nums">
              {index + 1} / {safeLines.length}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialogue (Escape)"
              className="inline-flex items-center justify-center h-8 w-8 text-ink/80 hover:text-burgundy transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body Text */}
        <div className="p-4 sm:p-5 space-y-4">
          <p
            key={`${current.speaker}-${index}`}
            className="text-[15px] sm:text-base leading-relaxed text-ink min-h-[3.2rem] island-line-fade"
          >
            {current.text}
          </p>

          {/* Actions Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone/40">
            <div className="flex flex-wrap items-center gap-2.5">
              {actionLink && (
                <Link
                  href={actionLink.href}
                  className="inline-flex items-center gap-1.5 min-h-[42px] px-3.5 py-2 bg-porcelain border border-burgundy text-burgundy text-xs sm:text-sm font-semibold hover:bg-burgundy hover:text-porcelain-soft transition-colors"
                >
                  <span>{actionLink.label}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              )}
              <span className="hidden sm:inline text-xs text-stone-text">
                Enter / Space to {isLastLine ? "close" : "continue"} · Esc to
                close
              </span>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              {!isLastLine && (
                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-[44px] px-3.5 py-2 text-xs sm:text-sm font-medium text-stone-text hover:text-ink transition-colors cursor-pointer"
                >
                  Close
                </button>
              )}
              <button
                ref={primaryButtonRef}
                type="button"
                onClick={handleAdvance}
                className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2 bg-ink text-porcelain text-xs sm:text-sm font-semibold hover:bg-burgundy transition-colors cursor-pointer"
              >
                <span>{isLastLine ? "Done" : "Continue"}</span>
                {!isLastLine && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
