"use client";

import React, { useEffect, useState } from "react";
import { Compass, Minimize2, Sparkles, X } from "lucide-react";
import { CHAPTERS, type ChapterMeta, type ShreePose } from "@/data/chapters";
import { ShreeSprite } from "./ShreeSprite";
import { PixelStarIcon } from "@/components/ui/PixelIcons";
import { isTypingTarget } from "@/lib/accessibility";

interface ShreeCompanionProps {
  activeChapter: ChapterMeta;
  overridePose: ShreePose | null;
  customMessage: string | null;
  collectedCount: number;
  totalCollectibles: number;
  onNavigateChapter: (chapterId: string) => void;
  onSelectPose: (pose: ShreePose | null) => void;
  onClearCustomMessage: () => void;
}

const INTERACTIVE_POSES: { pose: ShreePose; label: string }[] = [
  { pose: "idle", label: "Idle" },
  { pose: "wave", label: "Wave" },
  { pose: "happy", label: "Happy" },
  { pose: "thinking", label: "Think" },
  { pose: "coding", label: "Code" },
  { pose: "headphones", label: "Music" },
];

export function ShreeCompanion({
  activeChapter,
  overridePose,
  customMessage,
  collectedCount,
  totalCollectibles,
  onNavigateChapter,
  onSelectPose,
  onClearCustomMessage,
}: ShreeCompanionProps) {
  const [minimized, setMinimized] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showGuideList, setShowGuideList] = useState(false);
  const [dismissedChapters, setDismissedChapters] = useState<string[]>([]);
  const [tapCount, setTapCount] = useState(0);
  const [localDialogue, setLocalDialogue] = useState<string | null>(null);
  const [reactKey, setReactKey] = useState(0);
  const [isVisiblePastHero, setIsVisiblePastHero] = useState(false);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("shree_dismissed_hints");
      if (saved) setDismissedChapters(JSON.parse(saved));
      const savedMin = sessionStorage.getItem("shree_minimized");
      if (savedMin === "true") setMinimized(true);
    } catch {
      // Ignore storage failures in restricted contexts
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setIsVisiblePastHero(window.scrollY > 360);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setLocalDialogue(null);
    setShowGuideList(false);
  }, [activeChapter.id]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        setShowGuideList(false);
        return;
      }
      if (
        (event.key === "s" || event.key === "S") &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !isTypingTarget(event.target)
      ) {
        event.preventDefault();
        setMinimized(false);
        setMenuOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const effectivePose: ShreePose = overridePose ?? activeChapter.pose;
  const chapterHintDismissed = dismissedChapters.includes(activeChapter.id);

  const displayedMessage =
    customMessage ??
    localDialogue ??
    (!chapterHintDismissed ? activeChapter.shreeHint : null);

  const handleDismissHint = () => {
    if (customMessage) {
      onClearCustomMessage();
    }
    setLocalDialogue(null);
    setMenuOpen(false);
    setShowGuideList(false);
    if (!dismissedChapters.includes(activeChapter.id)) {
      const next = [...dismissedChapters, activeChapter.id];
      setDismissedChapters(next);
      try {
        sessionStorage.setItem("shree_dismissed_hints", JSON.stringify(next));
      } catch {
        // Ignore
      }
    }
  };

  const handleMinimize = () => {
    setMinimized(true);
    setMenuOpen(false);
    setShowGuideList(false);
    try {
      sessionStorage.setItem("shree_minimized", "true");
    } catch {
      // Ignore
    }
  };

  const handleRestore = () => {
    setMinimized(false);
    setReactKey((k) => k + 1);
    onSelectPose("wave");
    setLocalDialogue("Back online! Tap me to jump anywhere or switch my mood.");
    try {
      sessionStorage.setItem("shree_minimized", "false");
    } catch {
      // Ignore
    }
    setTimeout(() => onSelectPose(null), 2200);
  };

  const handleTapShree = () => {
    setReactKey((k) => k + 1);
    const nextCount = tapCount + 1;
    setTapCount(nextCount);
    onClearCustomMessage();

    const lines = [activeChapter.shreeHint, ...activeChapter.altDialogue];
    const line = lines[nextCount % lines.length];
    setLocalDialogue(line);
    setMenuOpen(true);

    if (!overridePose) {
      onSelectPose("happy");
      setTimeout(() => onSelectPose(null), 1600);
    }
  };

  const handleGuideTo = (chapter: ChapterMeta) => {
    setMenuOpen(false);
    setShowGuideList(false);
    onSelectPose(chapter.pose);
    setLocalDialogue(`Heading to CH.${chapter.number}: ${chapter.title}!`);
    onNavigateChapter(chapter.id);
    setTimeout(() => onSelectPose(null), 1800);
  };

  const shouldShowDock = isVisiblePastHero || Boolean(customMessage) || menuOpen;

  if (!shouldShowDock && !minimized) {
    return null;
  }

  if (minimized) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <button
          type="button"
          onClick={handleRestore}
          aria-label="Restore Shree.exe companion (Shortcut: S)"
          className="inline-flex items-center gap-2 min-h-[42px] px-3.5 py-2 bg-porcelain-soft text-ink border border-ink/80 shadow-md hover:-translate-y-0.5 transition-transform cursor-pointer"
        >
          <PixelStarIcon size={14} />
          <span className="font-pixel text-[11px]">SHREE.EXE</span>
        </button>
      </div>
    );
  }

  return (
    <aside
      aria-label="Shree.exe interactive guide companion"
      className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40 flex flex-col items-end gap-2 max-w-[calc(100vw-1.5rem)] pointer-events-none"
    >
      {(menuOpen || displayedMessage) && (
        <div
          role="region"
          aria-live="polite"
          aria-label="Shree.exe dialogue"
          className="pointer-events-auto w-[min(330px,calc(100vw-2rem))] bg-porcelain-soft text-ink pixel-window-frame animate-dialogue-pop"
        >
          <div className="flex items-center justify-between gap-2 px-3 py-2 bg-porcelain-deep border-b border-ink/20">
            <div className="flex items-center gap-2 min-w-0">
              <PixelStarIcon size={13} />
              <span className="text-xs font-semibold uppercase tracking-wider text-ink truncate tabular-nums">
                Shree.exe · CH.{activeChapter.number}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleMinimize}
                aria-label="Minimise Shree.exe companion"
                title="Minimise Shree.exe"
                className="p-1.5 text-ink/80 hover:text-burgundy cursor-pointer"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleDismissHint}
                aria-label="Dismiss hint"
                title="Dismiss hint for this chapter"
                className="p-1.5 text-ink/80 hover:text-burgundy cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="p-3.5 space-y-3">
            {displayedMessage && (
              <p className="text-[13px] leading-relaxed text-ink">
                “{displayedMessage}”
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone/40">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(true);
                  setShowGuideList((prev) => !prev);
                }}
                aria-expanded={showGuideList}
                className="inline-flex items-center gap-1.5 min-h-[34px] px-3 py-1.5 text-xs font-semibold bg-ink text-porcelain hover:bg-burgundy transition-colors cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                Guide me
              </button>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(true);
                  setShowGuideList(false);
                  const nextIdx =
                    (tapCount + 1) % activeChapter.altDialogue.length;
                  setTapCount((c) => c + 1);
                  setReactKey((k) => k + 1);
                  setLocalDialogue(activeChapter.altDialogue[nextIdx]);
                }}
                className="inline-flex items-center gap-1.5 min-h-[34px] px-3 py-1.5 text-xs font-medium border border-ink/30 bg-porcelain hover:border-burgundy transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-burgundy" />
                Chat
              </button>
              <span className="ml-auto text-xs font-semibold text-burgundy tabular-nums">
                {collectedCount}/{totalCollectibles} found
              </span>
            </div>

            {menuOpen && showGuideList && (
              <div className="pt-2 border-t border-stone/40 space-y-1 max-h-48 overflow-y-auto">
                <p className="text-[11px] font-semibold text-stone-text uppercase tracking-wider mb-1">
                  Jump to a chapter
                </p>
                {CHAPTERS.map((ch) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => handleGuideTo(ch)}
                    className={`w-full flex items-center justify-between text-left px-2.5 py-2 text-xs transition-colors cursor-pointer ${
                      ch.id === activeChapter.id
                        ? "bg-powder-pink/50 text-ink font-semibold"
                        : "hover:bg-porcelain-deep text-ink/90"
                    }`}
                  >
                    <span>
                      <span className="font-semibold mr-2 text-burgundy tabular-nums">
                        {ch.number}
                      </span>
                      {ch.title}
                    </span>
                    <span className="text-[11px] text-stone-text">
                      {ch.subtitle}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {menuOpen && !showGuideList && (
              <div className="pt-2 border-t border-stone/40">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-stone-text uppercase tracking-wider">
                    Pose / Mood
                  </span>
                  {overridePose && (
                    <button
                      type="button"
                      onClick={() => onSelectPose(null)}
                      className="text-xs underline text-burgundy cursor-pointer"
                    >
                      Auto
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {INTERACTIVE_POSES.map((item) => {
                    const active = effectivePose === item.pose;
                    return (
                      <button
                        key={item.pose}
                        type="button"
                        onClick={() => {
                          setReactKey((k) => k + 1);
                          onSelectPose(item.pose);
                        }}
                        className={`px-2.5 py-1 text-xs font-medium border transition-colors cursor-pointer ${
                          active
                            ? "bg-burgundy text-porcelain border-burgundy"
                            : "bg-porcelain text-ink border-ink/25 hover:border-burgundy"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="pointer-events-auto flex items-end gap-2">
        <button
          type="button"
          onClick={handleTapShree}
          aria-expanded={menuOpen}
          aria-label={`Interact with Shree.exe (${effectivePose} pose). Press S to toggle guide menu.`}
          className="group relative flex items-center gap-2 sm:flex-col sm:gap-0 bg-porcelain-soft/95 sm:bg-transparent border sm:border-0 border-ink px-3 py-1.5 sm:p-0 shadow-md sm:shadow-none cursor-pointer focus-visible:outline-2 focus-visible:outline-burgundy"
        >
          <div className="sm:hidden flex items-center gap-2">
            <ShreeSprite
              pose={effectivePose}
              size="sm"
              decorative
              reactKey={reactKey}
              className="!w-9 !h-12"
            />
            <span className="text-xs font-semibold uppercase tracking-wider text-ink">
              Shree.exe
            </span>
          </div>

          <div className="hidden sm:flex flex-col items-center">
            <div className="transition-transform duration-150 group-hover:-translate-y-1">
              <ShreeSprite
                pose={effectivePose}
                size="md"
                alt="Shree.exe interactive companion"
                reactKey={reactKey}
              />
            </div>
            <span className="mt-1 px-2.5 py-1 bg-ink text-porcelain text-[11px] font-semibold uppercase tracking-wider border border-powder-pink/50 shadow-sm">
              Shree.exe
            </span>
          </div>
        </button>
      </div>
    </aside>
  );
}
