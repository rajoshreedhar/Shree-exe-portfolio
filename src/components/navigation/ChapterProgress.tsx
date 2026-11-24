"use client";

import React from "react";
import { CHAPTERS, type ChapterMeta } from "@/data/chapters";

interface ChapterProgressProps {
  activeChapter: ChapterMeta;
  onNavigate: (chapterId: string) => void;
}

export function ChapterProgress({
  activeChapter,
  onNavigate,
}: ChapterProgressProps) {
  return (
    <aside
      aria-label="Chapter progress indicator"
      className="fixed left-4 top-1/2 -translate-y-1/2 z-20 hidden 2xl:flex flex-col gap-2"
    >
      {CHAPTERS.map((chapter) => {
        const active = chapter.id === activeChapter.id;
        return (
          <button
            key={chapter.id}
            type="button"
            onClick={() => onNavigate(chapter.id)}
            aria-label={`Jump to chapter ${chapter.number}: ${chapter.title}`}
            aria-current={active ? "location" : undefined}
            className="group flex items-center gap-2 py-1 text-left cursor-pointer"
          >
            <span
              className={`inline-block transition-all duration-200 ${
                active
                  ? "w-3.5 h-3.5 bg-burgundy border border-ink rotate-45"
                  : "w-2 h-2 bg-stone-text/60 group-hover:bg-burgundy"
              }`}
            />
            <span
              className={`text-[11px] font-semibold tabular-nums transition-opacity duration-200 ${
                active
                  ? "opacity-100 text-burgundy"
                  : "opacity-0 group-hover:opacity-100 text-stone-text"
              }`}
            >
              {chapter.number}
            </span>
          </button>
        );
      })}
    </aside>
  );
}
