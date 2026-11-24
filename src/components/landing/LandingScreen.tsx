"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Compass,
  Github,
  Linkedin,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { PROFILE } from "@/data/profile";
import { ShreeSprite } from "@/components/character/ShreeSprite";
import { PixelPlayIcon, PixelStarIcon } from "@/components/ui/PixelIcons";

interface LandingScreenProps {
  onStartNewGame: () => void;
}

const ISLAND_GREETINGS = [
  "Morning! The cove is quiet today — want to explore?",
  "There's a signboard, a tiny parcel, and a noticeboard waiting inside.",
  "In a hurry? Quick Portfolio is always one click away.",
];

export function LandingScreen({ onStartNewGame }: LandingScreenProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [tapKey, setTapKey] = useState(0);

  const handleTapShree = () => {
    setTapKey((k) => k + 1);
    setGreetingIndex((i) => (i + 1) % ISLAND_GREETINGS.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-porcelain text-ink paper-grain">
      {/* Quiet Editorial Header — Portfolio & Social Links Always Reachable */}
      <header className="border-b border-ink/15 bg-porcelain/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center bg-ink text-porcelain font-pixel text-[11px] border border-ink">
              RD
            </span>
            <span className="font-pixel text-[11px] text-ink">SHREE.EXE</span>
          </div>

          <nav aria-label="Quick links" className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 min-h-[42px] px-3 py-2 text-xs sm:text-sm font-semibold text-ink hover:text-burgundy transition-colors"
            >
              <span>Quick Portfolio</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-burgundy" />
            </Link>

            <span
              className="hidden sm:inline-block h-4 w-px bg-stone/70 mx-1"
              aria-hidden="true"
            />

            <a
              href={PROFILE.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rajoshree Dhar on GitHub (opens in new tab)"
              className="inline-flex items-center justify-center h-10 w-10 text-ink hover:text-burgundy transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PROFILE.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rajoshree Dhar on LinkedIn (opens in new tab)"
              className="inline-flex items-center justify-center h-10 w-10 text-ink hover:text-burgundy transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </nav>
        </div>
      </header>

      {/* Main Opening Screen */}
      <main
        id="main-content"
        className="flex-1 flex items-center py-10 sm:py-14 lg:py-16"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Title, Story & Primary Entry Actions */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <h1 className="font-editorial text-5xl sm:text-6xl lg:text-[4.6rem] leading-[0.98] tracking-[-0.02em] text-ink animate-editorial-reveal">
                  SHREE<span className="text-burgundy">.</span>EXE
                </h1>

                <p
                  className="font-editorial italic text-2xl sm:text-3xl text-burgundy leading-snug animate-editorial-reveal"
                  style={{ animationDelay: "70ms" }}
                >
                  The Little Island
                </p>

                <p
                  className="text-base sm:text-[17px] text-ink/85 leading-relaxed max-w-[44ch] animate-editorial-reveal"
                  style={{ animationDelay: "130ms" }}
                >
                  A little world to explore, built by Rajoshree. Step onto
                  Arrival Cove for a quiet morning walk, or head straight to the
                  full portfolio whenever you like.
                </p>
              </div>

              {/* Primary & Secondary Actions */}
              <div
                className="flex flex-wrap items-center gap-3.5 pt-2 animate-editorial-reveal"
                style={{ animationDelay: "190ms" }}
              >
                <button
                  type="button"
                  onClick={onStartNewGame}
                  className="group inline-flex items-center justify-center gap-3 min-h-[52px] px-6 py-3.5 bg-burgundy text-porcelain-soft border border-ink/85 shadow-[0_10px_24px_-12px_rgba(132,63,73,0.6)] hover:bg-burgundy-deep transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <PixelPlayIcon
                    size={11}
                    className="text-powder-pink transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                  <span className="font-pixel text-[11px] tracking-wide">
                    NEW GAME
                  </span>
                </button>

                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center gap-2 min-h-[52px] px-5 py-3.5 bg-porcelain-soft text-ink border border-ink/80 hover:bg-porcelain-deep transition-colors duration-200"
                >
                  <span className="text-sm font-semibold">Quick Portfolio</span>
                  <ArrowUpRight className="w-4 h-4 text-burgundy" />
                </Link>

                <button
                  type="button"
                  onClick={() => setSettingsOpen((prev) => !prev)}
                  aria-expanded={settingsOpen}
                  aria-controls="landing-settings-panel"
                  className="inline-flex items-center justify-center gap-2 min-h-[52px] px-4 py-3.5 bg-transparent text-stone-text border border-stone/70 hover:border-ink/60 hover:text-ink transition-colors duration-200 cursor-pointer"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="text-sm font-medium">Settings</span>
                </button>
              </div>

              {/* Honest Settings Placeholder + Controls Reference */}
              {settingsOpen && (
                <section
                  id="landing-settings-panel"
                  aria-label="Settings preview and controls"
                  className="bg-porcelain-soft pixel-window-frame p-4 sm:p-5 space-y-4 max-w-lg animate-dialogue-pop"
                >
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-ink/15">
                    <div className="flex items-center gap-2">
                      <PixelStarIcon size={13} />
                      <h2 className="font-pixel text-[11px] text-ink uppercase">
                        SETTINGS · PREVIEW
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSettingsOpen(false)}
                      aria-label="Close settings panel"
                      className="p-1.5 text-stone-text hover:text-burgundy transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-sm text-ink/85 leading-relaxed">
                    Audio and display settings are planned for a later island
                    milestone. The First Morning prototype launches silently by
                    default and respects your system reduced-motion setting.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                    <div className="p-3 bg-porcelain border border-ink/15 space-y-1">
                      <span className="font-semibold text-burgundy uppercase tracking-wider block">
                        Desktop Controls
                      </span>
                      <p className="text-ink/85 leading-relaxed">
                        WASD or Arrows to walk · E or Enter to interact · Esc to
                        pause
                      </p>
                    </div>
                    <div className="p-3 bg-porcelain border border-ink/15 space-y-1">
                      <span className="font-semibold text-burgundy uppercase tracking-wider block">
                        Touch Controls
                      </span>
                      <p className="text-ink/85 leading-relaxed">
                        On-screen directional pad and dedicated Interact button
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {/* Subtle prototype details strip */}
              <div
                className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-3 border-t border-ink/12 text-xs text-stone-text animate-editorial-reveal"
                style={{ animationDelay: "250ms" }}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-burgundy" />
                  Arrival Cove · First Morning Prototype
                </span>
                <span>Zero autoplay audio</span>
                <span>Portfolio stays separate &amp; lightweight</span>
              </div>
            </div>

            {/* Right Column: Arrival Cove Morning Diorama + Canonical Shree.exe */}
            <div
              className="lg:col-span-6 animate-mask-reveal"
              style={{ animationDelay: "120ms" }}
            >
              <div className="bg-porcelain-soft pixel-window-frame overflow-hidden">
                {/* Window Header */}
                <div className="flex items-center justify-between gap-2 px-4 py-2.5 bg-porcelain-deep border-b border-ink/20">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="flex items-center gap-1" aria-hidden="true">
                      <span className="inline-block h-2 w-2 bg-burgundy" />
                      <span className="inline-block h-2 w-2 bg-powder-pink" />
                      <span className="inline-block h-2 w-2 bg-chrome" />
                    </span>
                    <span className="font-pixel text-[11px] text-ink truncate">
                      ARRIVAL_COVE.MAP
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-text">
                    First Morning
                  </span>
                </div>

                {/* Soft Pixel-Art Morning Island Scene */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-gradient-to-b from-[#f3e6d0] via-[#efe5d5] to-[#d9c8ae]">
                  {/* Drifting morning clouds */}
                  <svg
                    viewBox="0 0 480 330"
                    className="absolute inset-0 w-full h-full pixel-art"
                    shapeRendering="crispEdges"
                    aria-hidden="true"
                  >
                    {/* Soft morning sun */}
                    <rect x="372" y="34" width="36" height="36" fill="#f7e3b5" />
                    <rect x="378" y="40" width="24" height="24" fill="#fbf3dc" />

                    {/* Clouds (smooth CSS drift) */}
                    <g className="island-cloud-slow">
                      <rect x="48" y="42" width="54" height="12" fill="#faf7f2" />
                      <rect x="60" y="34" width="28" height="10" fill="#faf7f2" />
                      <rect x="218" y="54" width="66" height="12" fill="#faf7f2" fillOpacity="0.9" />
                      <rect x="234" y="46" width="32" height="10" fill="#faf7f2" fillOpacity="0.9" />
                    </g>

                    {/* Distant horizon sea */}
                    <rect x="0" y="138" width="480" height="192" fill="#82a5aa" />
                    <rect x="0" y="138" width="480" height="6" fill="#6f9399" />

                    {/* Gentle animated water shimmer bands */}
                    <g className="island-water-shimmer">
                      <rect x="32" y="158" width="42" height="4" fill="#a7c4c7" />
                      <rect x="366" y="168" width="54" height="4" fill="#a7c4c7" />
                      <rect x="44" y="274" width="48" height="4" fill="#a7c4c7" />
                      <rect x="344" y="286" width="62" height="4" fill="#a7c4c7" />
                      <rect x="190" y="302" width="44" height="4" fill="#eef1eb" fillOpacity="0.7" />
                    </g>

                    {/* Compact Little Island Silhouette */}
                    {/* Shoreline foam */}
                    <rect x="86" y="164" width="308" height="106" fill="#eef1eb" fillOpacity="0.65" />
                    {/* Golden beach */}
                    <rect x="94" y="170" width="292" height="94" fill="#e5d3b3" />
                    <rect x="110" y="256" width="260" height="12" fill="#d4be98" />
                    {/* Sage meadow */}
                    <rect x="106" y="156" width="268" height="86" fill="#88a47b" />
                    <rect x="126" y="144" width="228" height="24" fill="#88a47b" />
                    <rect x="148" y="150" width="46" height="8" fill="#9bb58d" />
                    <rect x="278" y="162" width="52" height="8" fill="#9bb58d" />

                    {/* Packed earth path */}
                    <rect x="172" y="218" width="28" height="44" fill="#d8c39e" />
                    <rect x="172" y="200" width="128" height="22" fill="#d8c39e" />

                    {/* Wooden pier extending south into the cove */}
                    <rect x="164" y="258" width="44" height="58" fill="#6a4c36" />
                    <rect x="168" y="260" width="36" height="52" fill="#9c7453" />
                    <rect x="168" y="266" width="36" height="3" fill="#b68c68" />
                    <rect x="168" y="276" width="36" height="3" fill="#b68c68" />
                    <rect x="168" y="286" width="36" height="3" fill="#b68c68" />
                    <rect x="168" y="296" width="36" height="3" fill="#b68c68" />
                    <rect x="168" y="306" width="36" height="3" fill="#b68c68" />
                    {/* Pier posts */}
                    <rect x="162" y="302" width="8" height="14" fill="#432e22" />
                    <rect x="202" y="302" width="8" height="14" fill="#432e22" />

                    {/* Left & right organic trees */}
                    <rect x="128" y="150" width="10" height="22" fill="#6a4c36" />
                    <rect x="114" y="122" width="38" height="32" fill="#4c6a4a" />
                    <rect x="118" y="116" width="30" height="28" fill="#62825a" />
                    <rect x="122" y="118" width="16" height="10" fill="#82a274" />

                    <rect x="334" y="156" width="10" height="22" fill="#6a4c36" />
                    <rect x="320" y="128" width="38" height="32" fill="#4c6a4a" />
                    <rect x="324" y="122" width="30" height="28" fill="#62825a" />
                    <rect x="328" y="124" width="16" height="10" fill="#82a274" />

                    {/* Tiny wooden signboard */}
                    <rect x="212" y="220" width="4" height="14" fill="#432e22" />
                    <rect x="203" y="208" width="22" height="14" fill="#432e22" />
                    <rect x="205" y="210" width="18" height="10" fill="#9c7453" />
                    <rect x="208" y="213" width="12" height="2" fill="#faf7f2" />

                    {/* Tiny noticeboard */}
                    <rect x="268" y="160" width="32" height="24" fill="#432e22" />
                    <rect x="266" y="156" width="36" height="5" fill="#843f49" />
                    <rect x="271" y="163" width="26" height="18" fill="#c89e74" />
                    <rect x="274" y="166" width="8" height="8" fill="#faf7f2" />
                    <rect x="285" y="167" width="8" height="7" fill="#d9bfc0" />

                    {/* Tiny pink parcel */}
                    <rect x="314" y="218" width="14" height="12" fill="#432e22" />
                    <rect x="316" y="220" width="10" height="8" fill="#d8b48a" />
                    <rect x="320" y="220" width="2" height="8" fill="#843f49" />
                    <rect x="316" y="223" width="10" height="2" fill="#843f49" />

                    {/* Wildflower dots */}
                    <rect x="148" y="198" width="4" height="4" fill="#d9bfc0" />
                    <rect x="306" y="194" width="4" height="4" fill="#faf7f2" />
                    <rect x="342" y="214" width="4" height="4" fill="#d9bfc0" />
                  </svg>

                  {/* Interactive Shree.exe Character & Speech Note */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-between pt-4 pb-3 px-4">
                    <div
                      key={greetingIndex}
                      role="status"
                      aria-live="polite"
                      className="max-w-[290px] bg-porcelain-soft/95 text-ink border border-ink/80 px-3.5 py-2 shadow-sm animate-dialogue-pop"
                    >
                      <p className="text-xs sm:text-[13px] leading-snug text-center font-medium">
                        “{ISLAND_GREETINGS[greetingIndex]}”
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleTapShree}
                      aria-label="Tap Shree.exe to cycle arrival greeting"
                      className="group cursor-pointer focus-visible:outline-2 focus-visible:outline-burgundy rounded-sm"
                    >
                      <div className="transition-transform duration-200 group-hover:-translate-y-1">
                        <ShreeSprite
                          pose={greetingIndex === 1 ? "happy" : "wave"}
                          size="md"
                          alt="Shree.exe standing at Arrival Cove"
                          reactKey={tapKey}
                        />
                      </div>
                    </button>
                  </div>
                </div>

                {/* Diorama Caption Bar */}
                <div className="px-4 py-2.5 bg-porcelain border-t border-ink/15 flex items-center justify-between gap-2 text-xs text-stone-text">
                  <span>Tap Shree.exe or select New Game to step ashore</span>
                  <span className="font-semibold text-burgundy">
                    3 objects · 1 NPC
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
