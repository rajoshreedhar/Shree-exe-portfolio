"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Home, Play, X } from "lucide-react";
import { PixelStarIcon } from "@/components/ui/PixelIcons";

interface GameMenuProps {
  onResume: () => void;
  onReturnToTitle: () => void;
}

export function GameMenu({ onResume, onReturnToTitle }: GameMenuProps) {
  const resumeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    resumeRef.current?.focus();
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pause-menu-heading"
      className="absolute inset-0 z-40 flex items-center justify-center bg-ink/55 backdrop-blur-[2px] p-4"
    >
      <div className="w-full max-w-sm bg-porcelain-soft text-ink pixel-window-frame island-panel-enter">
        <div className="flex items-center justify-between px-4 py-3 bg-porcelain-deep border-b border-ink/20">
          <div className="flex items-center gap-2">
            <PixelStarIcon size={13} />
            <h2
              id="pause-menu-heading"
              className="font-pixel text-[11px] text-ink uppercase"
            >
              PAUSED
            </h2>
          </div>
          <button
            type="button"
            onClick={onResume}
            aria-label="Resume game"
            className="p-1.5 text-ink/80 hover:text-burgundy transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          <button
            ref={resumeRef}
            type="button"
            onClick={onResume}
            className="w-full inline-flex items-center justify-center gap-2 min-h-[46px] px-4 py-2.5 bg-burgundy text-porcelain-soft text-sm font-semibold hover:bg-burgundy-deep transition-colors cursor-pointer"
          >
            <Play className="w-4 h-4" />
            Resume
          </button>

          <Link
            href="/portfolio"
            className="w-full inline-flex items-center justify-center gap-2 min-h-[46px] px-4 py-2.5 bg-ink text-porcelain text-sm font-semibold hover:bg-burgundy transition-colors"
          >
            <span>Quick Portfolio</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <button
            type="button"
            onClick={onReturnToTitle}
            className="w-full inline-flex items-center justify-center gap-2 min-h-[46px] px-4 py-2.5 bg-porcelain border border-ink/75 text-ink text-sm font-semibold hover:bg-porcelain-deep transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            Return to Title Screen
          </button>

          <div className="pt-3 mt-2 border-t border-stone/40 text-xs text-stone-text space-y-1">
            <p className="font-semibold text-ink">Controls</p>
            <p>Move: WASD / Arrow keys / Touch D-pad</p>
            <p>Interact: E / Enter / Interact button · Pause: Esc</p>
          </div>
        </div>
      </div>
    </div>
  );
}
