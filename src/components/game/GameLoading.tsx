"use client";

import React from "react";
import { PixelStarIcon } from "@/components/ui/PixelIcons";

export function GameLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-porcelain/95 px-6 text-center"
    >
      <div className="flex items-center gap-2 text-burgundy">
        <PixelStarIcon size={16} />
        <span className="font-pixel text-[11px] uppercase text-ink">
          ARRIVAL COVE
        </span>
      </div>

      <p className="font-editorial italic text-2xl sm:text-3xl text-ink">
        Waking up the island...
      </p>

      {/* Calm animated tide dots (no fake loading percentage) */}
      <div className="flex items-center gap-2 pt-1" aria-hidden="true">
        <span className="h-2.5 w-2.5 bg-burgundy island-tide-dot" />
        <span
          className="h-2.5 w-2.5 bg-powder-pink island-tide-dot"
          style={{ animationDelay: "180ms" }}
        />
        <span
          className="h-2.5 w-2.5 bg-ink island-tide-dot"
          style={{ animationDelay: "360ms" }}
        />
      </div>
    </div>
  );
}
