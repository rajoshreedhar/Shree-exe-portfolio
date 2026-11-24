"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Home, RotateCcw } from "lucide-react";
import { PixelStarIcon } from "@/components/ui/PixelIcons";

interface GameErrorProps {
  onRetry: () => void;
  onReturnHome: () => void;
}

export function GameError({ onRetry, onReturnHome }: GameErrorProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center min-h-[340px] sm:min-h-[460px] w-full bg-porcelain-soft pixel-window-frame p-6 sm:p-10 text-center"
    >
      <div className="max-w-md space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-porcelain-deep border border-ink/20">
          <PixelStarIcon size={13} />
          <span className="font-pixel text-[10px] text-burgundy uppercase">
            COVE OFFLINE
          </span>
        </div>

        <h2 className="font-editorial text-2xl sm:text-3xl text-ink leading-snug">
          The island seems to be having a little technical difficulty.
        </h2>

        <p className="text-sm sm:text-base text-stone-text leading-relaxed">
          The interactive map couldn’t start right now, but the rest of the site
          and Quick Portfolio are still completely available.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-burgundy text-porcelain-soft text-sm font-semibold hover:bg-burgundy-deep transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Retry
          </button>

          <button
            type="button"
            onClick={onReturnHome}
            className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 bg-porcelain border border-ink/75 text-ink text-sm font-semibold hover:bg-porcelain-deep transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            Return to SHREE.EXE home
          </button>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2.5 bg-ink text-porcelain text-sm font-semibold hover:bg-burgundy transition-colors"
          >
            Quick Portfolio
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
