"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  FileText,
  Github,
  Linkedin,
  Mail,
  Sparkles,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Collectible } from "@/components/ui/Collectible";
import { ShreeSprite } from "@/components/character/ShreeSprite";
import { PROFILE } from "@/data/profile";
import { CHAPTERS } from "@/data/chapters";
import { PixelStarIcon } from "@/components/ui/PixelIcons";

interface ContactChapterProps {
  heartCollected: boolean;
  collectedCount: number;
  totalCollectibles: number;
  onCollect: (id: "star" | "coffee" | "heart") => void;
  onNavigateChapter: (chapterId: string) => void;
}

export function ContactChapter({
  heartCollected,
  collectedCount,
  totalCollectibles,
  onCollect,
  onNavigateChapter,
}: ContactChapterProps) {
  const [showResumeBrief, setShowResumeBrief] = useState(false);

  return (
    <>
      <section
        id="the-next-level"
        aria-labelledby="contact-heading"
        className="relative ink-surface text-porcelain py-20 sm:py-28 border-b border-chrome/20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionLabel
            chapterNumber="07"
            label="The next level · Contact & collaboration"
            theme="dark"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Cinematic Closing Invitation */}
            <div className="lg:col-span-7 space-y-6">
              <h2
                id="contact-heading"
                className="font-editorial text-4xl sm:text-6xl leading-[1.04] text-porcelain"
              >
                The next interesting thing{" "}
                <span className="text-powder-pink">could start here.</span>
              </h2>

              <p className="text-base sm:text-lg text-chrome/90 leading-relaxed max-w-[56ch]">
                {PROFILE.microcopy.contact} I’m open to software, data, and
                AI/ML internships, collaborative engineering builds, research
                conversations, and creative web experiments with people who care
                about craft.
              </p>

              {/* Primary Professional Profiles: LinkedIn & GitHub */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <a
                  href={PROFILE.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5 bg-ink-soft border border-chrome/30 hover:border-powder-pink transition-all flex items-start justify-between gap-3"
                >
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-2 text-powder-pink">
                      <Linkedin className="w-5 h-5" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        LinkedIn
                      </span>
                    </div>
                    <p className="font-editorial text-2xl text-porcelain">
                      Rajoshree Dhar
                    </p>
                    <p className="text-xs text-chrome/85">
                      Connect for opportunities, collaborations &amp; messages
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-chrome group-hover:text-powder-pink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </a>

                <a
                  href={PROFILE.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5 bg-ink-soft border border-chrome/30 hover:border-powder-pink transition-all flex items-start justify-between gap-3"
                >
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-2 text-powder-pink">
                      <Github className="w-5 h-5" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        GitHub
                      </span>
                    </div>
                    <p className="font-editorial text-2xl text-porcelain">
                      @rajoshreedhar
                    </p>
                    <p className="text-xs text-chrome/85">
                      Explore repositories, prototypes &amp; commit history
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-chrome group-hover:text-powder-pink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </a>
              </div>

              {/* Direct Contact & Résumé Access */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={PROFILE.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 min-h-[48px] px-5 py-3 bg-porcelain text-ink font-semibold text-xs uppercase tracking-wider hover:bg-powder-pink transition-colors"
                >
                  <Mail className="w-4 h-4 text-burgundy" />
                  <span>Say hello on LinkedIn</span>
                </a>

                <button
                  type="button"
                  onClick={() => setShowResumeBrief((prev) => !prev)}
                  aria-expanded={showResumeBrief}
                  className="inline-flex items-center gap-2 min-h-[48px] px-5 py-3 border border-chrome/45 text-porcelain text-xs font-semibold uppercase tracking-wider hover:border-powder-pink hover:text-powder-pink transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>
                    {showResumeBrief
                      ? "Hide résumé snapshot"
                      : "Résumé snapshot"}
                  </span>
                </button>
              </div>

              {showResumeBrief && (
                <div className="p-5 bg-ink-soft border border-powder-pink/50 space-y-3 text-sm animate-dialogue-pop">
                  <div className="flex items-center justify-between border-b border-chrome/20 pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-powder-pink">
                      Quick Résumé Snapshot · Rajoshree Dhar
                    </span>
                    <Sparkles className="w-4 h-4 text-powder-pink" />
                  </div>
                  <p className="text-chrome/90 leading-relaxed">
                    <strong className="text-porcelain">Focus areas:</strong>{" "}
                    AI &amp; Machine Learning, Data Science &amp; Analytics,
                    Software Engineering, and Accessible Frontend Architecture.
                  </p>
                  <p className="text-chrome/90 leading-relaxed">
                    <strong className="text-porcelain">Highlighted work:</strong>{" "}
                    SKYTXT (text-first atmospheric briefing interface), Shree.exe
                    (accessible Next.js + TypeScript editorial portfolio), and
                    reproducible Python/Scikit-learn/PyTorch study logs.
                  </p>
                  <p className="text-xs text-powder-pink">
                    Reach out via LinkedIn above for the latest PDF résumé.
                  </p>
                </div>
              )}
            </div>

            {/* Right: Shree.exe Farewell Stage & Final Collectible */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-sm pixel-window-frame-dark bg-ink-soft/95 p-6 text-center space-y-4">
                <div className="inline-block px-4 py-2.5 bg-porcelain text-ink border border-ink text-xs font-medium">
                  “You made it to the final level. Shall we talk?”
                </div>

                <div className="flex justify-center py-2">
                  <ShreeSprite
                    pose="goodbye"
                    size="hero"
                    alt="Shree.exe waving goodbye at the final chapter"
                  />
                </div>

                <div className="pt-4 border-t border-chrome/20 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-chrome/90 tabular-nums">
                    Collectibles: {collectedCount}/{totalCollectibles}
                  </span>
                  <Collectible
                    id="heart"
                    label="Pixel Heart"
                    collected={heartCollected}
                    onCollect={onCollect}
                    theme="dark"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conventional Editorial Footer */}
      <footer className="bg-[#1A1716] text-chrome py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-chrome/15">
            <div className="md:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-2.5">
                <PixelStarIcon size={16} />
                <span className="font-pixel text-[11px] text-porcelain">
                  RAJOSHREE DHAR
                </span>
              </div>
              <p className="text-sm text-chrome/85 max-w-sm leading-relaxed">
                {PROFILE.tagline}
              </p>
              <p className="text-xs italic text-powder-pink">
                “{PROFILE.microcopy.footer}”
              </p>
            </div>

            <div className="md:col-span-4 space-y-3">
              <h3 className="text-xs font-bold tracking-wider text-powder-pink uppercase">
                Chapters
              </h3>
              <ul className="grid grid-cols-2 gap-2 text-xs">
                {CHAPTERS.map((ch) => (
                  <li key={ch.id}>
                    <button
                      type="button"
                      onClick={() => onNavigateChapter(ch.id)}
                      className="text-chrome/85 hover:text-porcelain transition-colors cursor-pointer text-left"
                    >
                      <span className="font-semibold text-powder-pink/80 mr-1.5 tabular-nums">
                        {ch.number}
                      </span>
                      {ch.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h3 className="text-xs font-bold tracking-wider text-powder-pink uppercase">
                Profiles
              </h3>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a
                    href={PROFILE.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-porcelain hover:text-powder-pink transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href={PROFILE.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-porcelain hover:text-powder-pink transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    GitHub (@rajoshreedhar)
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-chrome/75">
            <p>
              © {new Date().getFullYear()} Rajoshree Dhar. Built with Next.js,
              TypeScript &amp; Tailwind CSS.
            </p>
            <p className="font-medium text-chrome/85">
              Shortcuts: [M] Index · [S] Shree.exe · [Esc] Close
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
