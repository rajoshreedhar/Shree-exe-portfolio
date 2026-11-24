"use client";

import React, { useState } from "react";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { PROFILE } from "@/data/profile";
import type { ShreePose } from "@/data/chapters";
import { ShreeSprite } from "@/components/character/ShreeSprite";
import {
  PixelBookIcon,
  PixelCoffeeIcon,
  PixelDpadIcon,
  PixelPlayIcon,
  PixelStarIcon,
} from "@/components/ui/PixelIcons";

interface HeroProps {
  onEnterWorld: () => void;
  onViewProjects: () => void;
  onOpenIndex: () => void;
}

const HERO_LINES = [
  "Hi! I'm Shree. Welcome to my little corner of the internet.",
  "Tap me or press A anytime — I can guide you to Projects, Lab Notes, or Contact.",
  "No forced tutorials, no autoplay music. Just curiosity and clean code.",
];

const ARCADE_POSES: ShreePose[] = [
  "wave",
  "happy",
  "headphones",
  "coding",
  "reading",
  "thinking",
];

const CARTRIDGE_SLOTS = [
  {
    slot: "SLOT 01",
    label: "Building",
    value: "SKYTXT & clean web craft",
  },
  {
    slot: "SLOT 02",
    label: "Studying",
    value: "PyTorch & ML evaluation",
  },
  {
    slot: "SLOT 03",
    label: "Rabbit hole",
    value: "Quantum circuit intuition",
  },
] as const;

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

  const handleCyclePose = () => {
    setTapKey((k) => k + 1);
    setHeroPose((prev) => {
      const idx = ARCADE_POSES.indexOf(prev);
      return ARCADE_POSES[(idx + 1) % ARCADE_POSES.length];
    });
  };

  return (
    <section
      id="title-screen"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden arcade-hero-bg border-b-2 border-arcade-cocoa/85"
    >
      {/* Subtle warm beige framing rails */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mx-auto max-w-7xl border-x border-arcade-cocoa/[0.08]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-7 pb-14 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24">
        {/* Cozy Retro Arcade Top HUD Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 mb-8 sm:mb-10 bg-arcade-beige border-2 border-arcade-cocoa shadow-[4px_4px_0_#2C211B]">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 font-pixel text-[11px] px-2.5 py-1 bg-burgundy text-arcade-cream border border-arcade-cocoa tabular-nums">
              1UP · CH.00
            </span>
            <span className="font-arcade text-xl sm:text-[22px] leading-none tracking-wider text-arcade-cocoa uppercase">
              Title Screen · Cozy Arcade 2026
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {PROFILE.disciplines.map((item) => (
              <span
                key={item}
                className="px-2.5 py-1 border-2 border-arcade-cocoa/85 bg-arcade-cream-soft text-xs font-semibold tracking-wide text-arcade-cocoa shadow-[2px_2px_0_rgba(44,33,27,0.75)]"
              >
                {item}
              </span>
            ))}
            <button
              type="button"
              onClick={onOpenIndex}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 border-2 border-arcade-cocoa bg-arcade-amber-soft text-arcade-cocoa font-pixel text-[10px] hover:bg-arcade-cream-soft transition-colors duration-200 cursor-pointer tabular-nums"
            >
              <span>8 STAGES</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-burgundy" />
            </button>
          </div>
        </div>

        {/* Main Asymmetric Cozy Arcade Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-9 lg:gap-10 items-start">
          {/* Left Column — Title Screen, RPG Dialogue & Cartridge Bay */}
          <div className="lg:col-span-7 space-y-6">
            {/* Player Ready Banner */}
            <div className="inline-flex flex-wrap items-center gap-2.5 px-3 py-1.5 bg-arcade-cream-soft border-2 border-arcade-cocoa/80 shadow-[2px_2px_0_rgba(44,33,27,0.75)] animate-editorial-reveal">
              <span
                aria-hidden="true"
                className="inline-block h-2.5 w-2.5 bg-arcade-sage border border-arcade-cocoa"
              />
              <span className="font-pixel text-[10px] text-arcade-cocoa">
                PLAYER 1 READY
              </span>
              <span
                aria-hidden="true"
                className="h-3.5 w-px bg-arcade-cocoa/25"
              />
              <span className="text-xs font-semibold text-arcade-walnut">
                Free Play · No Autoplay Audio
              </span>
            </div>

            {/* Hero Wordmark & Tagline */}
            <div className="space-y-3.5">
              <h1
                id="hero-heading"
                className="font-editorial text-5xl sm:text-6xl lg:text-[4.85rem] leading-[0.97] tracking-[-0.02em] text-arcade-cocoa drop-shadow-[3px_3px_0px_#DFC9A6] animate-editorial-reveal"
              >
                Rajoshree
                <span className="block">
                  Dhar<span className="text-burgundy">.</span>
                </span>
              </h1>

              <p
                className="font-editorial italic text-xl sm:text-2xl lg:text-[1.72rem] text-burgundy leading-snug max-w-[34ch] animate-editorial-reveal"
                style={{ animationDelay: "90ms" }}
              >
                {PROFILE.tagline}
              </p>
            </div>

            {/* Cozy RPG Intro Dialogue Box */}
            <div
              className="bg-arcade-cream-soft arcade-pixel-box overflow-hidden max-w-[60ch] animate-editorial-reveal"
              style={{ animationDelay: "160ms" }}
            >
              <div className="flex items-center justify-between px-3.5 py-1.5 bg-arcade-beige border-b-2 border-arcade-cocoa/25">
                <span className="inline-flex items-center gap-1.5 font-pixel text-[10px] text-arcade-cocoa">
                  <PixelStarIcon size={12} />
                  INTRO.LOG
                </span>
                <span className="font-arcade text-base leading-none text-arcade-walnut uppercase">
                  Cozy Edition
                </span>
              </div>
              <p className="p-4 sm:px-5 sm:py-4 text-base sm:text-[17px] text-arcade-cocoa/90 leading-relaxed">
                “{PROFILE.heroIntro}”
              </p>
            </div>

            {/* Mobile-first Cozy Pocket Arcade Card (visible in first viewport on phones) */}
            <div className="lg:hidden bg-arcade-beige border-2 border-arcade-cocoa shadow-[4px_4px_0_#2C211B] p-3">
              <div className="flex items-center justify-between px-2.5 py-1.5 mb-2.5 bg-arcade-cocoa text-arcade-cream">
                <span className="inline-flex items-center gap-1.5 font-pixel text-[10px]">
                  <PixelStarIcon size={12} />
                  SHREE.EXE ARCADE
                </span>
                <span className="font-arcade text-base leading-none text-arcade-amber-soft uppercase">
                  {heroPose}
                </span>
              </div>
              <div className="flex items-center gap-4 p-3.5 bg-arcade-cream-soft border-2 border-arcade-cocoa/85">
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
                <div className="space-y-2 min-w-0">
                  <p
                    role="status"
                    aria-live="polite"
                    className="text-sm leading-snug text-arcade-cocoa font-medium"
                  >
                    “{HERO_LINES[lineIndex]}”
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={handleHeroShreeTap}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-burgundy text-arcade-cream border border-arcade-cocoa font-pixel text-[9px] hover:bg-burgundy-deep transition-colors cursor-pointer"
                    >
                      A · CHAT
                    </button>
                    <button
                      type="button"
                      onClick={handleCyclePose}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-arcade-amber-soft text-arcade-cocoa border border-arcade-cocoa font-pixel text-[9px] hover:bg-arcade-beige transition-colors cursor-pointer"
                    >
                      B · POSE
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tactile Retro Arcade Action Buttons */}
            <div
              className="flex flex-wrap items-center gap-4 pt-1 animate-editorial-reveal"
              style={{ animationDelay: "230ms" }}
            >
              <button
                type="button"
                onClick={onEnterWorld}
                className="group inline-flex items-center justify-center gap-3 min-h-[52px] px-6 py-3.5 bg-burgundy text-arcade-cream border-2 border-arcade-cocoa arcade-push-btn hover:bg-burgundy-deep cursor-pointer"
              >
                <PixelPlayIcon
                  size={11}
                  className="text-arcade-amber-soft animate-arcade-blink"
                />
                <span className="font-pixel text-[11px]">
                  PRESS START · ENTER
                </span>
                <ArrowDown className="w-4 h-4 text-arcade-amber-soft" />
              </button>

              <button
                type="button"
                onClick={onViewProjects}
                className="inline-flex items-center justify-center gap-2.5 min-h-[52px] px-5 py-3.5 bg-arcade-cream-soft text-arcade-cocoa border-2 border-arcade-cocoa arcade-push-btn hover:bg-arcade-beige cursor-pointer"
              >
                <span className="text-xs font-bold uppercase tracking-wider">
                  View Selected Work
                </span>
                <ArrowUpRight className="w-4 h-4 text-burgundy" />
              </button>
            </div>

            {/* Cozy Beige Cartridge Bay — "Currently Exploring" */}
            <div
              className="pt-2 max-w-xl animate-editorial-reveal"
              style={{ animationDelay: "300ms" }}
            >
              <div className="bg-arcade-beige arcade-pixel-box overflow-hidden">
                <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-arcade-cocoa text-arcade-cream border-b-2 border-arcade-cocoa">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="flex items-center gap-1" aria-hidden="true">
                      <span className="inline-block h-2 w-2 bg-arcade-amber-soft" />
                      <span className="inline-block h-2 w-2 bg-powder-pink" />
                      <span className="inline-block h-2 w-2 bg-arcade-beige-deep" />
                    </span>
                    <span className="font-pixel text-[11px] uppercase truncate">
                      CURRENTLY_EXPLORING
                    </span>
                  </div>
                  <span className="px-2 py-0.5 bg-arcade-amber-soft text-arcade-cocoa font-pixel text-[9px] shrink-0">
                    LIVE NOTE
                  </span>
                </div>

                <div className="p-3.5 sm:p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {CARTRIDGE_SLOTS.map((item) => (
                    <div
                      key={item.slot}
                      className="p-3 bg-arcade-cream-soft border-2 border-arcade-cocoa/75 shadow-[2px_2px_0_rgba(44,33,27,0.65)] space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-1 pb-1 border-b border-arcade-cocoa/15">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-burgundy">
                          {item.label}
                        </span>
                        <span className="font-arcade text-sm leading-none text-arcade-walnut">
                          {item.slot}
                        </span>
                      </div>
                      <span className="font-semibold text-arcade-cocoa block leading-snug">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Cozy Cream & Beige Tabletop Arcade Cabinet */}
          <div
            className="hidden lg:block lg:col-span-5 animate-mask-reveal"
            style={{ animationDelay: "160ms" }}
          >
            <div className="relative bg-arcade-beige arcade-cabinet overflow-hidden">
              {/* 1. Backlit Warm Cream-Amber Arcade Marquee */}
              <div className="p-2.5 bg-arcade-cocoa border-b-2 border-arcade-cocoa">
                <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 bg-gradient-to-b from-[#FFFBF0] via-[#F7E7C4] to-[#E9D19E] border-2 border-arcade-amber shadow-[inset_0_2px_6px_rgba(255,255,255,0.85)]">
                  <div className="flex items-center gap-2 min-w-0">
                    <PixelStarIcon size={15} />
                    <span className="font-pixel text-[11px] text-arcade-cocoa truncate">
                      SHREE.EXE
                    </span>
                    <span className="px-1.5 py-0.5 bg-arcade-cocoa text-arcade-amber-soft font-arcade text-sm leading-none uppercase">
                      ARCADE
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenIndex}
                    className="inline-flex items-center gap-1 text-xs font-bold text-burgundy hover:underline cursor-pointer shrink-0"
                  >
                    8 chapters ↗
                  </button>
                </div>
              </div>

              {/* 2. Recessed Warm Beige Bezel + Cozy CRT Viewport */}
              <div className="p-4 bg-arcade-beige-deep">
                <div className="relative border-[3px] border-arcade-cocoa bg-[#2B221D] overflow-hidden shadow-[inset_0_4px_12px_rgba(0,0,0,0.4)]">
                  {/* Subtle non-blocking CRT scanline sheen */}
                  <div
                    aria-hidden="true"
                    className="arcade-crt-scanlines pointer-events-none absolute inset-0 z-30"
                  />

                  {/* Mini CRT Screen HUD */}
                  <div className="relative z-10 flex items-center justify-between px-3.5 py-2 bg-[#231B17] border-b border-[#F5DDA3]/20">
                    <span className="font-pixel text-[10px] text-[#F5DDA3] tabular-nums">
                      STAGE 00
                    </span>
                    <span className="font-arcade text-base leading-none tracking-wider text-[#F5DDA3]/90 uppercase">
                      POSE: {heroPose}
                    </span>
                  </div>

                  {/* Upper CRT Zone: Warm Dusk Pixel Skyline Window */}
                  <div className="relative px-4 pt-4 pb-5 bg-[#2E241F]">
                    <div className="relative mx-auto border-2 border-[#D9C29C]/45 bg-[#1D1615] p-3 shadow-inner">
                      {/* Window mullions */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-[#E2CFA9]/20"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-[#E2CFA9]/20"
                      />

                      <div className="relative h-24 overflow-hidden">
                        <span className="absolute top-2.5 left-5 animate-twinkle">
                          <PixelStarIcon size={13} />
                        </span>
                        <span
                          className="absolute top-5 right-8 animate-twinkle"
                          style={{ animationDelay: "800ms" }}
                        >
                          <PixelStarIcon size={10} />
                        </span>
                        {/* Warm cream crescent moon */}
                        <span
                          aria-hidden="true"
                          className="absolute top-2.5 right-16 h-5 w-5 rounded-full bg-[#FBF5E6] shadow-[inset_-5px_-2px_0px_#1D1615]"
                        />
                        {/* Pixel city skyline with warm amber & cream lights */}
                        <svg
                          viewBox="0 0 260 56"
                          className="absolute bottom-0 inset-x-0 w-full h-14 pixel-art"
                          shapeRendering="crispEdges"
                          aria-hidden="true"
                        >
                          <rect x="0" y="30" width="30" height="26" fill="#2D2421" />
                          <rect x="6" y="36" width="4" height="4" fill="#F5DDA3" fillOpacity="0.8" />
                          <rect x="18" y="42" width="4" height="4" fill="#F3D382" fillOpacity="0.9" />
                          <rect x="32" y="18" width="34" height="38" fill="#251D1B" />
                          <rect x="40" y="26" width="4" height="4" fill="#F3D382" />
                          <rect x="52" y="26" width="4" height="4" fill="#EFE2CA" fillOpacity="0.6" />
                          <rect x="40" y="38" width="4" height="4" fill="#F5DDA3" fillOpacity="0.5" />
                          <rect x="68" y="34" width="26" height="22" fill="#352A26" />
                          <rect x="96" y="12" width="36" height="44" fill="#251D1B" />
                          <rect x="104" y="20" width="4" height="4" fill="#F3D382" />
                          <rect x="118" y="30" width="4" height="4" fill="#EFE2CA" />
                          <rect x="136" y="24" width="40" height="32" fill="#302622" />
                          <rect x="148" y="32" width="4" height="4" fill="#F3D382" fillOpacity="0.8" />
                          <rect x="180" y="16" width="32" height="40" fill="#251D1B" />
                          <rect x="188" y="24" width="4" height="4" fill="#F5DDA3" />
                          <rect x="216" y="28" width="44" height="28" fill="#322723" />
                          <rect x="228" y="36" width="4" height="4" fill="#F3D382" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Warm Brass-Cream Trim Divider */}
                  <div
                    className="h-[3px] w-full bg-gradient-to-r from-[#C8AE86] via-[#FFF6DE] to-[#C8AE86]"
                    aria-hidden="true"
                  />

                  {/* Lower CRT Zone: Cozy Cream & Beige Arcade Stage + Shree.exe */}
                  <div className="relative px-5 pt-5 pb-4 bg-gradient-to-b from-[#FFFBF0] via-[#FBF5E6] to-[#EFE2CA] flex flex-col items-center">
                    {/* Speech Bubble — Preserves animate-dialogue-pop */}
                    <div
                      key={lineIndex}
                      role="status"
                      aria-live="polite"
                      className="relative z-20 mb-3 max-w-[310px] bg-arcade-cream-soft text-arcade-cocoa border-2 border-arcade-cocoa px-4 py-2.5 shadow-[3px_3px_0_rgba(44,33,27,0.22)] animate-dialogue-pop"
                    >
                      <p className="text-[13px] leading-snug font-medium">
                        “{HERO_LINES[lineIndex]}”
                      </p>
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-arcade-cream-soft border-r-2 border-b-2 border-arcade-cocoa"
                      />
                    </div>

                    {/* Focal Canonical Shree.exe flanked by Study Props */}
                    <div className="relative w-full flex items-end justify-center gap-6">
                      <div
                        aria-hidden="true"
                        className="mb-3 hidden xl:flex flex-col items-center gap-1 opacity-90"
                      >
                        <PixelBookIcon size={22} />
                        <span className="font-arcade text-base leading-none text-arcade-walnut">
                          NOTES
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
                        className="mb-3 hidden xl:flex flex-col items-center gap-1 opacity-90"
                      >
                        <PixelCoffeeIcon size={22} />
                        <span className="font-arcade text-base leading-none text-arcade-walnut">
                          COFFEE
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Interactive Cozy Beige Arcade Control Deck */}
              <div className="px-5 py-4 bg-arcade-beige border-t-2 border-arcade-cocoa flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleHeroShreeTap}
                    aria-label="Use arcade D-pad to say hello to Shree.exe"
                    className="p-1.5 bg-arcade-cream-soft border-2 border-arcade-cocoa shadow-[2px_2px_0_#2C211B] hover:bg-arcade-amber-soft transition-colors duration-200 cursor-pointer"
                  >
                    <PixelDpadIcon size={32} />
                  </button>
                  <div className="space-y-0.5">
                    <span className="block font-pixel text-[10px] text-arcade-cocoa">
                      TAP SHREE
                    </span>
                    <span className="block font-arcade text-base leading-none text-arcade-walnut uppercase">
                      Or press A / B
                    </span>
                  </div>
                </div>

                {/* Tactile Round A / B Arcade Buttons */}
                <div className="flex items-center gap-3.5">
                  <div className="flex flex-col items-center gap-1">
                    <button
                      type="button"
                      onClick={handleHeroShreeTap}
                      aria-label="Arcade button A: say hello and cycle Shree dialogue"
                      className="h-11 w-11 rounded-full bg-burgundy text-arcade-cream border-2 border-arcade-cocoa arcade-push-btn hover:bg-burgundy-deep font-pixel text-[11px] flex items-center justify-center cursor-pointer"
                    >
                      A
                    </button>
                    <span className="font-arcade text-sm leading-none font-semibold text-arcade-walnut uppercase">
                      Say Hi
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <button
                      type="button"
                      onClick={handleCyclePose}
                      aria-label="Arcade button B: cycle Shree.exe pose and animation"
                      className="h-11 w-11 rounded-full bg-arcade-amber text-arcade-cocoa border-2 border-arcade-cocoa arcade-push-btn hover:bg-arcade-amber-soft font-pixel text-[11px] flex items-center justify-center cursor-pointer"
                    >
                      B
                    </button>
                    <span className="font-arcade text-sm leading-none font-semibold text-arcade-walnut uppercase">
                      Pose
                    </span>
                  </div>
                </div>
              </div>

              {/* 4. Cozy Coin-Slot & Speaker Grille Cabinet Base */}
              <div className="px-5 py-2.5 bg-arcade-beige-deep border-t-2 border-arcade-cocoa/30 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handleHeroShreeTap}
                  className="inline-flex items-center gap-2 px-2.5 py-1 bg-arcade-cocoa text-arcade-cream text-[10px] font-pixel hover:bg-burgundy transition-colors duration-200 cursor-pointer"
                >
                  <PixelCoffeeIcon size={14} />
                  <span>INSERT COFFEE</span>
                </button>

                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-burgundy">
                    <Sparkles className="w-3.5 h-3.5" />
                    Interactive
                  </span>
                  <div
                    aria-hidden="true"
                    className="flex flex-col gap-1"
                  >
                    <span className="block w-8 h-[2px] bg-arcade-cocoa/45" />
                    <span className="block w-8 h-[2px] bg-arcade-cocoa/45" />
                    <span className="block w-8 h-[2px] bg-arcade-cocoa/45" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle cozy pixel tile trim along bottom seam */}
      <div
        aria-hidden="true"
        className="h-2 w-full arcade-pixel-border-strip border-t border-arcade-cocoa/20"
      />
    </section>
  );
}
