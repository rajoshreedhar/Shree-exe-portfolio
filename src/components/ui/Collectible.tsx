"use client";

import React from "react";
import { PixelCoffeeIcon, PixelHeartIcon, PixelStarIcon } from "./PixelIcons";

interface CollectibleProps {
  id: "star" | "coffee" | "heart";
  label: string;
  collected: boolean;
  onCollect: (id: "star" | "coffee" | "heart") => void;
  theme?: "light" | "dark";
  className?: string;
}

export function Collectible({
  id,
  label,
  collected,
  onCollect,
  theme = "light",
  className = "",
}: CollectibleProps) {
  const isDark = theme === "dark";

  const icon =
    id === "star" ? (
      <PixelStarIcon size={18} />
    ) : id === "coffee" ? (
      <PixelCoffeeIcon size={18} />
    ) : (
      <PixelHeartIcon size={18} />
    );

  return (
    <button
      type="button"
      onClick={() => onCollect(id)}
      aria-label={
        collected
          ? `${label} — already collected`
          : `Discover optional collectible: ${label}`
      }
      aria-pressed={collected}
      className={`group inline-flex items-center gap-2 min-h-[38px] px-3 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer border ${
        collected
          ? isDark
            ? "border-powder-pink/60 bg-burgundy/40 text-porcelain"
            : "border-burgundy bg-powder-pink/40 text-ink"
          : isDark
            ? "border-chrome/40 bg-ink-soft text-porcelain hover:border-powder-pink hover:-translate-y-0.5"
            : "border-ink/30 bg-porcelain-soft text-ink hover:border-burgundy hover:-translate-y-0.5"
      } ${className}`}
    >
      <span className={collected ? "" : "animate-twinkle"}>{icon}</span>
      <span className="text-[11px] uppercase tracking-wider">
        {collected ? "Found" : label}
      </span>
    </button>
  );
}
