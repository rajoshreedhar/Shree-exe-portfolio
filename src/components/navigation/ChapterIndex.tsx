"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight, Github, Linkedin, X } from "lucide-react";
import { CHAPTERS, type ChapterMeta } from "@/data/chapters";
import { PROFILE } from "@/data/profile";
import { PixelStarIcon } from "@/components/ui/PixelIcons";

interface ChapterIndexProps {
  open: boolean;
  activeChapter: ChapterMeta;
  onClose: () => void;
  onNavigate: (chapterId: string) => void;
  returnFocusRef?: React.RefObject<HTMLButtonElement | null>;
}

export function ChapterIndex({
  open,
  activeChapter,
  onClose,
  onNavigate,
  returnFocusRef,
}: ChapterIndexProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      if (returnFocusRef?.current) {
        returnFocusRef.current.focus();
      } else {
        previouslyFocused?.focus();
      }
    };
  }, [open, onClose, returnFocusRef]);

  if (!open) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="chapter-index-title"
      className="fixed inset-0 z-50 bg-ink text-porcelain overflow-y-auto animate-mask-reveal"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-6 sm:py-10 min-h-screen flex flex-col justify-between">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-chrome/25 pb-5">
          <div className="flex items-center gap-3">
            <PixelStarIcon size={16} />
            <span
              id="chapter-index-title"
              className="font-pixel text-[11px] uppercase text-powder-pink"
            >
              CHAPTER MAP · SHREE.EXE
            </span>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close chapter index"
            className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 border border-chrome/40 text-porcelain hover:border-powder-pink hover:text-powder-pink transition-colors cursor-pointer"
          >
            <span className="text-xs font-semibold uppercase tracking-wider">
              Esc
            </span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chapters Grid */}
        <div className="py-8 sm:py-12 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {CHAPTERS.map((chapter) => {
            const isCurrent = chapter.id === activeChapter.id;
            return (
              <button
                key={chapter.id}
                type="button"
                onClick={() => {
                  onClose();
                  onNavigate(chapter.id);
                }}
                className={`group text-left p-5 border transition-all duration-200 cursor-pointer flex items-start justify-between gap-4 ${
                  isCurrent
                    ? "border-powder-pink bg-burgundy/25"
                    : "border-chrome/20 bg-ink-soft/45 hover:border-powder-pink/70 hover:bg-ink-soft"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="font-pixel text-[11px] text-powder-pink tabular-nums">
                      CH.{chapter.number}
                    </span>
                    {isCurrent && (
                      <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-powder-pink text-ink">
                        Current
                      </span>
                    )}
                  </div>
                  <h2 className="font-editorial text-2xl sm:text-3xl text-porcelain group-hover:text-powder-pink transition-colors">
                    {chapter.title}
                  </h2>
                  <p className="mt-1 text-sm text-chrome/85">{chapter.purpose}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-chrome/70 group-hover:text-powder-pink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 mt-1" />
              </button>
            );
          })}
        </div>

        {/* Bottom Footer of Index */}
        <div className="border-t border-chrome/25 pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-chrome/85">
          <p>
            Keyboard shortcuts:{" "}
            <kbd className="px-1.5 py-0.5 border border-chrome/45 text-[11px] font-semibold mx-1">
              M
            </kbd>{" "}
            Index ·{" "}
            <kbd className="px-1.5 py-0.5 border border-chrome/45 text-[11px] font-semibold mx-1">
              S
            </kbd>{" "}
            Shree.exe ·{" "}
            <kbd className="px-1.5 py-0.5 border border-chrome/45 text-[11px] font-semibold mx-1">
              Esc
            </kbd>{" "}
            Close
          </p>
          <div className="flex items-center gap-5">
            <a
              href={PROFILE.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-porcelain hover:text-powder-pink transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href={PROFILE.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-porcelain hover:text-powder-pink transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
