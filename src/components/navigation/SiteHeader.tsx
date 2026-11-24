"use client";

import React from "react";
import Link from "next/link";
import { Compass, Github, Linkedin, Menu } from "lucide-react";
import { PROFILE } from "@/data/profile";
import type { ChapterMeta } from "@/data/chapters";
import { PixelStarIcon } from "@/components/ui/PixelIcons";

interface SiteHeaderProps {
  activeChapter: ChapterMeta;
  onOpenIndex: () => void;
  indexButtonRef?: React.RefObject<HTMLButtonElement | null>;
}

export function SiteHeader({
  activeChapter,
  onOpenIndex,
  indexButtonRef,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-ink/15 bg-porcelain/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Monogram & Live Chapter Status */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <a
            href="#title-screen"
            className="inline-flex items-center gap-2.5 group shrink-0"
            aria-label="Rajoshree Dhar — back to top"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center bg-ink text-porcelain font-pixel text-[11px] border border-ink group-hover:bg-burgundy transition-colors">
              RD
            </span>
            <span className="hidden sm:inline font-pixel text-[11px] text-ink">
              RD.EXE
            </span>
          </a>

          <span
            className="hidden md:inline-block h-4 w-px bg-stone/70"
            aria-hidden="true"
          />

          <div
            className="hidden md:flex items-center gap-2 text-xs text-ink/85 min-w-0"
            aria-label={`Current chapter: ${activeChapter.number} ${activeChapter.title}`}
          >
            <PixelStarIcon size={13} />
            <span className="font-pixel text-[11px] text-burgundy shrink-0 tabular-nums">
              {activeChapter.number}
            </span>
            <span className="truncate font-medium">{activeChapter.title}</span>
          </div>
        </div>

        {/* Direct Navigation + Profiles + Chapters Trigger */}
        <nav
          aria-label="Primary navigation"
          className="flex items-center gap-1 sm:gap-2"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-2.5 py-2 text-xs sm:text-sm font-semibold text-burgundy hover:text-burgundy-deep transition-colors"
            title="Visit SHREE.EXE — The Little Island"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Island</span>
          </Link>
          <a
            href="#the-quests"
            className="px-2.5 py-2 text-xs sm:text-sm font-medium text-ink hover:text-burgundy transition-colors"
          >
            Projects
          </a>
          <a
            href="#the-player"
            className="hidden sm:inline-block px-2.5 py-2 text-sm font-medium text-ink hover:text-burgundy transition-colors"
          >
            About
          </a>
          <a
            href="#the-next-level"
            className="px-2.5 py-2 text-xs sm:text-sm font-medium text-ink hover:text-burgundy transition-colors"
          >
            Contact
          </a>

          <span
            className="hidden sm:inline-block h-4 w-px bg-stone/70 mx-1"
            aria-hidden="true"
          />

          {/* LinkedIn & GitHub in Navigation */}
          <a
            href={PROFILE.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Rajoshree Dhar on LinkedIn (opens in new tab)"
            className="inline-flex items-center justify-center h-10 w-10 sm:w-auto sm:px-2.5 gap-1.5 text-xs font-medium text-ink border border-transparent hover:border-ink/25 hover:text-burgundy transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            <span className="hidden lg:inline">LinkedIn</span>
          </a>

          <a
            href={PROFILE.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Rajoshree Dhar on GitHub (opens in new tab)"
            className="inline-flex items-center justify-center h-10 w-10 sm:w-auto sm:px-2.5 gap-1.5 text-xs font-medium text-ink border border-transparent hover:border-ink/25 hover:text-burgundy transition-colors"
          >
            <Github className="w-4 h-4" />
            <span className="hidden lg:inline">GitHub</span>
          </a>

          <button
            ref={indexButtonRef}
            type="button"
            onClick={onOpenIndex}
            aria-label="Open full chapter index (Shortcut: M)"
            className="ml-1 inline-flex items-center gap-2 min-h-[42px] px-3.5 py-2 bg-ink text-porcelain hover:bg-burgundy transition-colors cursor-pointer"
          >
            <Menu className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Index
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}
