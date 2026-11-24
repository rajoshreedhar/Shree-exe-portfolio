"use client";

import React, { useEffect, useState } from "react";
import type { ShreePose } from "@/data/chapters";
import { usePrefersReducedMotion } from "@/lib/accessibility";
import {
  PixelBookIcon,
  PixelHeartIcon,
  PixelLaptopIcon,
  PixelMusicNoteIcon,
  PixelSparkleIcon,
  PixelStarIcon,
} from "@/components/ui/PixelIcons";

interface ShreeSpriteProps {
  pose: ShreePose;
  size?: "sm" | "md" | "lg" | "hero";
  alt?: string;
  decorative?: boolean;
  reactKey?: number;
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<ShreeSpriteProps["size"]>, string> = {
  sm: "w-14 h-20",
  md: "w-24 h-32",
  lg: "w-36 h-48",
  hero: "w-44 h-60 sm:w-52 sm:h-68",
};

export function ShreeSprite({
  pose,
  size = "md",
  alt = "Shree.exe pixel avatar",
  decorative = false,
  reactKey = 0,
  className = "",
}: ShreeSpriteProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    if (reducedMotion || pose === "happy" || pose === "celebrate") {
      setIsBlinking(false);
      return;
    }
    let timeoutId: ReturnType<typeof setTimeout>;
    const scheduleBlink = () => {
      const waitMs = 2800 + Math.floor(Math.random() * 2600);
      timeoutId = setTimeout(() => {
        setIsBlinking(true);
        timeoutId = setTimeout(() => {
          setIsBlinking(false);
          scheduleBlink();
        }, 160);
      }, waitMs);
    };
    scheduleBlink();
    return () => clearTimeout(timeoutId);
  }, [pose, reducedMotion]);

  const spriteSrc =
    pose === "happy" || pose === "celebrate"
      ? "/sprites/shree-happy.png"
      : isBlinking
        ? "/sprites/shree-blink.png"
        : "/sprites/shree-canonical.png";

  const motionClass = reducedMotion
    ? ""
    : pose === "wave" || pose === "goodbye"
      ? "animate-shree-wave"
      : pose === "happy" || pose === "celebrate"
        ? "animate-shree-hop"
        : pose === "headphones"
          ? "animate-shree-music"
          : "animate-shree-idle";

  return (
    <div
      key={`${pose}-${reactKey}`}
      className={`relative inline-flex items-end justify-center select-none ${SIZE_CLASSES[size]} ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[56%] h-2.5 rounded-full bg-ink/14 blur-[3px]"
      />

      {pose === "thinking" && (
        <div
          aria-hidden="true"
          className="absolute -top-1 -right-1 z-20 flex items-center gap-1 bg-porcelain-soft border border-ink/80 px-2 py-1 shadow-sm"
        >
          <span className="h-1.5 w-1.5 bg-burgundy inline-block" />
          <span className="h-1.5 w-1.5 bg-ink inline-block" />
          <span className="h-1.5 w-1.5 bg-stone inline-block" />
        </div>
      )}

      {(pose === "wave" || pose === "goodbye") && size !== "sm" && (
        <div
          aria-hidden="true"
          className="absolute top-3 -left-2 z-20 flex flex-col items-center gap-1"
        >
          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 bg-porcelain-soft text-burgundy border border-ink/80 shadow-sm">
            {pose === "goodbye" ? "Bye!" : "Hi!"}
          </span>
        </div>
      )}

      {(pose === "happy" || pose === "celebrate") && (
        <>
          <span
            aria-hidden="true"
            className={`absolute -top-2 left-1 z-20 text-burgundy ${
              reducedMotion ? "" : "animate-pixel-float"
            }`}
          >
            <PixelHeartIcon size={size === "sm" ? 11 : 15} />
          </span>
          <span
            aria-hidden="true"
            className={`absolute top-2 -right-1 z-20 ${
              reducedMotion ? "" : "animate-twinkle"
            }`}
          >
            <PixelStarIcon size={size === "sm" ? 12 : 16} />
          </span>
          {pose === "celebrate" && (
            <span
              aria-hidden="true"
              className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 text-burgundy"
            >
              <PixelSparkleIcon size={16} />
            </span>
          )}
        </>
      )}

      {pose === "headphones" && (
        <>
          <span
            aria-hidden="true"
            className={`absolute top-2 -left-1 z-20 text-burgundy ${
              reducedMotion ? "" : "animate-pixel-float"
            }`}
          >
            <PixelMusicNoteIcon size={size === "sm" ? 11 : 14} />
          </span>
          <span
            aria-hidden="true"
            className={`absolute -top-1 right-1 z-20 text-ink ${
              reducedMotion ? "" : "animate-twinkle"
            }`}
          >
            <PixelMusicNoteIcon size={size === "sm" ? 10 : 12} />
          </span>
        </>
      )}

      {pose === "coding" && (
        <div
          aria-hidden="true"
          className="absolute bottom-2 -right-2 z-20 bg-porcelain-soft/95 border border-ink/80 p-1.5 shadow-sm"
        >
          <PixelLaptopIcon size={size === "sm" ? 14 : 20} />
        </div>
      )}

      {pose === "reading" && (
        <div
          aria-hidden="true"
          className="absolute bottom-3 -left-2 z-20 bg-porcelain-soft/95 border border-ink/80 p-1.5 shadow-sm"
        >
          <PixelBookIcon size={size === "sm" ? 13 : 18} />
        </div>
      )}

      <img
        src={spriteSrc}
        alt={decorative ? "" : alt}
        aria-hidden={decorative || undefined}
        draggable={false}
        className={`relative z-10 w-full h-full object-contain object-bottom pixel-art ${motionClass}`}
      />
    </div>
  );
}
