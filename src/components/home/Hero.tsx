"use client";

import React, { useState } from "react";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { PROFILE } from "@/data/profile";
import type { ShreePose } from "@/data/chapters";
import { ShreeSprite } from "@/components/character/ShreeSprite";
import { PixelWindow } from "@/components/ui/PixelWindow";
import {
  PixelBookIcon,
  PixelCoffeeIcon,
  PixelStarIcon,
} from "@/components/ui/PixelIcons";

interface HeroProps {
  onEnterWorld: () => void;
  onViewProjects: () => void;
  onOpenIndex: () => void;
}

const HERO_LINES = [
  "Hi! I'm Shree. Welcome to my little corner of the internet.",
  "Tap me anytime — I can guide you to Projects, Lab Notes, or Contact.",
  "No forced tutorials, no autoplay music. Just curiosity and clean code.",
];

export function Hero({
  onEnterWorld,
  onViewProjects,
  onOpenIndex,
}: HeroProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [heroPose, setHeroPose] = useState<ShreePose>("wave");
  const [tapKey, setTapKey] = useState(0);

  const handleHeroShreeTap = () => {
    setTapKey((k) => k + 1);
    setLineIndex((idx) => (idx + 1) % HERO_LINES.length);
    setHeroPose((prev) => (prev === "happy" ? "wave" : "happy"));
  };

  return (
    <section
      id="title-screen"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-porcelain paper-grain border-b border-ink/15"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mx-auto max-w-7xl border-x border-ink/[0.06]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-16 sm:pt-12 sm:pb-24 lg:pt-14 lg:pb-28">
        {/* Top editorial metadata strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-ink/15 text-xs">
          <div className="inline-flex items-center gap-3">
            <span className="font-pixel text-[11px] px-2.5 py-1 bg-ink text-porcelain tabular-nums">
              CH.00
            </span>
            <span className="uppercase tracking-[0.18em] text-stone-text font-semibold">
              The Title Screen · Issue 2026
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {PROFILE.disciplines.map((item) => (
              <span
                key={item}
                className="px-3 py-1 border border-ink/20 bg-porcelain-soft text-xs font-semibold tracking-wide text-ink"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Main Asymmetric Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column — Editorial Wordmark & Core Identity */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <h1
                id="hero-heading"
                className="font-editorial text-5xl sm:text-6xl lg:text-[4.85rem] leading-[0.97] tracking-[-0.02em] text-ink animate-editorial-reveal"
              >
                Rajoshree
                <span className="block">
                  Dhar<span className="text-burgundy">.</span>
                </span>
              </h1>

              <p
                className="font-editorial italic text-xl sm:text-2xl lg:text-[1.75rem] text-burgundy leading-snug max-w-[34ch] animate-editorial-reveal"
                style={{ animationDelay: "90ms" }}
              >
                {PROFILE.tagline}
              </p>
            </div>

            <p
              className="text-base sm:text-lg text-ink/85 leading-relaxed max-w-[56ch] animate-editorial-reveal"
              style={{ animationDelay: "160ms" }}
            >
              “{PROFILE.heroIntro}”
            </p>

            {/* Mobile-first compact interactive Shree.exe greeting (visible in the first viewport on phones!) */}
            <div className="lg:hidden flex items-center gap-4 p-4 bg-porcelain-soft border border-ink/25 shadow-sm">
              <button
                type="button"
                onClick={handleHeroShreeTap}
                aria-label="Tap Shree.exe to say hello"
                className="shrink-0 cursor-pointer"
              >
                <ShreeSprite
                  pose={heroPose}
                  size="md"
                  alt="Shree.exe canonical pixel companion"
                  reactKey={tapKey}
                />
              </button>
              <div className="space-y-1.5 min-w-0">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-burgundy">
                  <PixelStarIcon size={13} />
                  Shree.exe
                </span>
                <p
                  role="status"
                  aria-live="polite"
                  className="text-sm leading-snug text-ink"
                >
                  “{HERO_LINES[lineIndex]}”
                </p>
                <button
                  type="button"
                  onClick={handleHeroShreeTap}
                  className="text-xs font-semibold text-burgundy underline cursor-pointer"
                >
                  Tap to chat
                </button>
              </div>
            </div>

            {/* Primary & Secondary Actions */}
            <div
              className="flex flex-wrap items-center gap-3.5 pt-1 animate-editorial-reveal"
              style={{ animationDelay: "230ms" }}
            >
              <button
                type="button"
                onClick={onEnterWorld}
                className="group inline-flex items-center justify-center gap-3 min-h-[50px] px-6 py-3.5 bg-ink text-porcelain border border-ink shadow-[0_10px_24px_-10px_rgba(36,32,31,0.45)] hover:bg-burgundy hover:border-burgundy hover:-translate-y-0.5 transition-all duration-150 cursor-pointer"
              >
                <span className="font-pixel text-[11px]">ENTER MY WORLD</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </button>

              <button
                type="button"
                onClick={onViewProjects}
                className="inline-flex items-center justify-center gap-2.5 min-h-[50px] px-5 py-3.5 bg-porcelain-soft text-ink border border-ink/80 hover:bg-powder-pink/35 transition-colors duration-150 cursor-pointer"
              >
                <span className="text-xs font-semibold uppercase tracking-wider">
                  View Selected Work
                </span>
                <ArrowUpRight className="w-4 h-4 text-burgundy" />
              </button>
            </div>

            {/* Compact Desktop-style "Currently Exploring" Window */}
            <div
              className="pt-3 max-w-xl animate-editorial-reveal"
              style={{ animationDelay: "300ms" }}
            >
              <PixelWindow title="CURRENTLY_EXPLORING" badge="LIVE NOTE">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-porcelain border border-ink/15 space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-burgundy block">
                      Building
                    </span>
                    <span className="font-semibold text-ink block leading-snug">
                      SKYTXT &amp; clean web craft
                    </span>
                  </div>
                  <div className="p-3 bg-porcelain border border-ink/15 space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-burgundy block">
                      Studying
                    </span>
                    <span className="font-semibold text-ink block leading-snug">
                      PyTorch &amp; ML evaluation
                    </span>
                  </div>
                  <div className="p-3 bg-porcelain border border-ink/15 space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-burgundy block">
                      Rabbit hole
                    </span>
                    <span className="font-semibold text-ink block leading-snug">
                      Quantum circuit intuition
                    </span>
                  </div>
                </div>
              </PixelWindow>
            </div>
          </div>

          {/* Right Column — Bespoke Two-Zone Pixel Study Diorama + Focal Canonical Shree.exe */}
          <div
            className="hidden lg:block lg:col-span-5 animate-mask-reveal"
            style={{ animationDelay: "160ms" }}
          >
            <div className="relative bg-porcelain-soft pixel-window-frame overflow-hidden">
              {/* Retro-chrome window chrome header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-ink text-porcelain border-b border-ink">
                <div className="flex items-center gap-2">
                  <PixelStarIcon size={14} />
                  <span className="font-pixel text-[11px]">STUDY_ROOM</span>
                </div>
                <button
                  type="button"
                  onClick={onOpenIndex}
                  className="text-xs font-semibold text-powder-pink hover:underline cursor-pointer"
                >
                  8 chapters ↗
                </button>
              </div>

              {/* Upper Zone: Warm Gallery Wall + Crisp Night Window (Zero Overlap!) */}
              <div className="relative px-6 pt-6 pb-7 bg-[#24201F]">
                <div className="relative mx-auto border border-chrome/45 bg-[#181517] p-3.5 shadow-inner">
                  {/* Window mullions */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-chrome/20"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-chrome/20"
                  />

                  <div className="relative h-28 overflow-hidden">
                    <span className="absolute top-3 left-5 animate-twinkle">
                      <PixelStarIcon size={13} />
                    </span>
                    <span
                      className="absolute top-6 right-8 animate-twinkle"
                      style={{ animationDelay: "800ms" }}
                    >
                      <PixelStarIcon size={10} />
                    </span>
                    {/* Crescent moon */}
                    <span
                      aria-hidden="true"
                      className="absolute top-3 right-16 h-5 w-5 rounded-full bg-porcelain shadow-[inset_-5px_-2px_0px_#181517]"
                    />
                    {/* Pixel city skyline */}
                    <svg
                      viewBox="0 0 260 56"
                      className="absolute bottom-0 inset-x-0 w-full h-14 pixel-art"
                      shapeRendering="crispEdges"
                      aria-hidden="true"
                    >
                      <rect x="0" y="30" width="30" height="26" fill="#2A2426" />
                      <rect x="6" y="36" width="4" height="4" fill="#D9BFC0" fillOpacity="0.7" />
                      <rect x="18" y="42" width="4" height="4" fill="#F3D382" fillOpacity="0.85" />
                      <rect x="32" y="18" width="34" height="38" fill="#231D1F" />
                      <rect x="40" y="26" width="4" height="4" fill="#F3D382" />
                      <rect x="52" y="26" width="4" height="4" fill="#D9BFC0" fillOpacity="0.55" />
                      <rect x="40" y="38" width="4" height="4" fill="#D9BFC0" fillOpacity="0.45" />
                      <rect x="68" y="34" width="26" height="22" fill="#31292C" />
                      <rect x="96" y="12" width="36" height="44" fill="#231D1F" />
                      <rect x="104" y="20" width="4" height="4" fill="#F3D382" />
                      <rect x="118" y="30" width="4" height="4" fill="#D9BFC0" />
                      <rect x="136" y="24" width="40" height="32" fill="#2C2528" />
                      <rect x="148" y="32" width="4" height="4" fill="#F3D382" fillOpacity="0.75" />
                      <rect x="180" y="16" width="32" height="40" fill="#231D1F" />
                      <rect x="188" y="24" width="4" height="4" fill="#D9BFC0" />
                      <rect x="216" y="28" width="44" height="28" fill="#2D2528" />
                      <rect x="228" y="36" width="4" height="4" fill="#F3D382" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Chrome Architectural Chair-Rail Separator */}
              <div className="h-[2px] w-full chrome-hairline" aria-hidden="true" />

              {/* Lower Zone: Crisp Porcelain Study Interior + Shree.exe + Speech Bubble */}
              <div className="relative px-6 pt-5 pb-4 bg-porcelain flex flex-col items-center">
                {/* Clean speech bubble — zero overlap with window! */}
                <div
                  role="status"
                  aria-live="polite"
                  className="relative z-20 mb-3 max-w-[310px] bg-porcelain-soft text-ink border border-ink/85 px-4 py-2.5 shadow-sm animate-dialogue-pop"
                >
                  <p className="text-[13px] leading-snug font-medium">
                    “{HERO_LINES[lineIndex]}”
                  </p>
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-porcelain-soft border-r border-b border-ink/85"
                  />
                </div>

                {/* Focal Canonical Shree.exe flanked by Study Props */}
                <div className="relative w-full flex items-end justify-center gap-6">
                  <div
                    aria-hidden="true"
                    className="mb-3 hidden xl:flex flex-col items-center gap-1 opacity-85"
                  >
                    <PixelBookIcon size={22} />
                    <span className="text-[11px] font-medium text-stone-text">
                      Notes
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleHeroShreeTap}
                    aria-label="Tap Shree.exe to say hello and cycle welcome notes"
                    className="group relative z-10 cursor-pointer focus-visible:outline-2 focus-visible:outline-burgundy rounded-sm"
                  >
                    <div className="transition-transform duration-200 group-hover:-translate-y-1">
                      <ShreeSprite
                        pose={heroPose}
                        size="hero"
                        alt="Shree.exe — canonical pixel avatar wearing glasses, headphones, dark cardigan with light collar, jeans, and bunny shoes with a floating golden star"
                        reactKey={tapKey}
                      />
                    </div>
                  </button>

                  <div
                    aria-hidden="true"
                    className="mb-3 hidden xl:flex flex-col items-center gap-1 opacity-85"
                  >
                    <PixelCoffeeIcon size={22} />
                    <span className="text-[11px] font-medium text-stone-text">
                      Coffee
                    </span>
                  </div>
                </div>
              </div>

              {/* Study Desk Footer Strip */}
              <div className="px-5 py-3 border-t border-ink/15 bg-porcelain-deep flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handleHeroShreeTap}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-ink hover:text-burgundy transition-colors cursor-pointer"
                >
                  <PixelCoffeeIcon size={16} />
                  <span>Tap Shree.exe to say hi</span>
                </button>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-burgundy">
                  <Sparkles className="w-3.5 h-3.5" />
                  Interactive guide
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
