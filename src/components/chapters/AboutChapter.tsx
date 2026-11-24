"use client";

import React, { useState } from "react";
import { MessageSquareText } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PixelWindow } from "@/components/ui/PixelWindow";
import { Collectible } from "@/components/ui/Collectible";
import { ShreeSprite } from "@/components/character/ShreeSprite";

interface AboutChapterProps {
  starCollected: boolean;
  onCollect: (id: "star" | "coffee" | "heart") => void;
}

const THEMES = [
  {
    role: "Perspective",
    title: "The thinker",
    body: "I rarely settle for a surface-level answer. Whether a machine-learning baseline behaves strangely or a mystery story hides a tiny clue, I enjoy tracing why a system works the way it does.",
  },
  {
    role: "Practice",
    title: "The builder",
    body: "Curiosity means the most to me when it turns into something tangible — clean Python scripts, focused web interfaces like SKYTXT, and structured notes other people can actually read.",
  },
  {
    role: "Taste",
    title: "The enthusiast",
    body: "Good technology never lives in a sterile vacuum. Fashion, editorial composition, cinema, K-pop worldbuilding, and slow-morning coffee all quietly sharpen my eye for craft and detail.",
  },
];

export function AboutChapter({ starCollected, onCollect }: AboutChapterProps) {
  const [openAnnotation, setOpenAnnotation] = useState<number | null>(null);

  return (
    <section
      id="the-player"
      aria-labelledby="about-heading"
      className="bg-porcelain-soft border-b border-ink/15 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionLabel chapterNumber="01" label="The player · About" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Personal Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h2
              id="about-heading"
              className="font-editorial text-4xl sm:text-5xl lg:text-[3.35rem] leading-[1.07] text-ink"
            >
              Curious about systems,{" "}
              <span className="text-burgundy">stubborn about clarity</span>, and
              drawn to interesting ideas.
            </h2>

            <div className="space-y-4 text-base sm:text-[17px] leading-relaxed text-ink/85 max-w-[58ch]">
              <p>
                I’m Rajoshree — friends call me Shree. I work happily where
                analytical problem-solving meets visual craft: equally drawn to
                understanding how a model evaluates messy data and why clean
                typography immediately makes you want to keep reading.
              </p>
              <p>
                Most of my projects begin with one small question:{" "}
                <span className="italic font-editorial text-lg text-ink">
                  “Could this be simpler, clearer, or more delightful?”
                </span>{" "}
                That instinct led me to build text-first weather tooling like{" "}
                <strong className="font-semibold text-ink">SKYTXT</strong>, keep
                disciplined ML study logs instead of chasing buzzwords, and
                write code meant for humans to read first.
              </p>
              <p>
                In collaborations, I value direct honesty over polish-for-show:
                naming what I am still learning, documenting trade-offs clearly,
                and leaving every shared codebase calmer than I found it.
              </p>
            </div>

            {/* Optional Shree.exe Margin Annotations */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setOpenAnnotation((prev) => (prev === 1 ? null : 1))
                }
                aria-expanded={openAnnotation === 1}
                className={`inline-flex items-center gap-2 min-h-[42px] px-4 py-2 text-xs font-semibold border transition-colors cursor-pointer ${
                  openAnnotation === 1
                    ? "bg-ink text-porcelain border-ink"
                    : "bg-porcelain border-ink/30 text-ink hover:border-burgundy"
                }`}
              >
                <MessageSquareText className="w-4 h-4 text-burgundy" />
                Shree’s side note: Why “Shree.exe”?
              </button>

              <button
                type="button"
                onClick={() =>
                  setOpenAnnotation((prev) => (prev === 2 ? null : 2))
                }
                aria-expanded={openAnnotation === 2}
                className={`inline-flex items-center gap-2 min-h-[42px] px-4 py-2 text-xs font-semibold border transition-colors cursor-pointer ${
                  openAnnotation === 2
                    ? "bg-ink text-porcelain border-ink"
                    : "bg-porcelain border-ink/30 text-ink hover:border-burgundy"
                }`}
              >
                <MessageSquareText className="w-4 h-4 text-burgundy" />
                Unexpected crossover
              </button>
            </div>

            {openAnnotation === 1 && (
              <div className="p-4 border border-burgundy/40 bg-porcelain text-sm text-ink/90 animate-dialogue-pop max-w-[56ch]">
                <span className="text-xs font-bold uppercase tracking-wider text-burgundy block mb-1.5">
                  Shree.exe Annotation
                </span>
                Because my brain genuinely feels like an operating system with
                twenty-seven open tabs — half technical docs, half design
                references, and one playlist keeping everything running.
              </div>
            )}

            {openAnnotation === 2 && (
              <div className="p-4 border border-burgundy/40 bg-porcelain text-sm text-ink/90 animate-dialogue-pop max-w-[56ch]">
                <span className="text-xs font-bold uppercase tracking-wider text-burgundy block mb-1.5">
                  Shree.exe Annotation
                </span>
                True-crime mysteries and debugging software rely on the exact
                same instinct: never trust the first convenient theory until the
                timeline actually adds up.
              </div>
            )}
          </div>

          {/* Right: Editorial Player Profile Card */}
          <div className="lg:col-span-5">
            <PixelWindow title="PLAYER_CARD" badge="CURIOUS">
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-5 pb-5 border-b border-ink/15">
                <div className="bg-porcelain border border-ink/20 px-4 pt-3 pb-1 shrink-0">
                  <ShreeSprite
                    pose="thinking"
                    size="lg"
                    alt="Shree.exe in thinking pose"
                  />
                </div>
                <div className="space-y-2 text-center sm:text-left lg:text-center xl:text-left">
                  <p className="text-xs font-bold uppercase tracking-wider text-burgundy">
                    Rajoshree Dhar
                  </p>
                  <p className="font-editorial text-2xl text-ink">“Shree”</p>
                  <p className="text-sm text-ink/80 leading-relaxed">
                    Software, Data &amp; AI/ML explorer with a weakness for
                    sharp typography and small pixel details.
                  </p>
                </div>
              </div>

              <dl className="mt-4 space-y-2.5 text-xs">
                <div className="flex justify-between gap-4 py-1.5 border-b border-ink/10">
                  <dt className="text-stone-text uppercase tracking-wider font-semibold">
                    Core Focus
                  </dt>
                  <dd className="font-semibold text-ink text-right">
                    AI/ML, Software, Data
                  </dd>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-ink/10">
                  <dt className="text-stone-text uppercase tracking-wider font-semibold">
                    Working Style
                  </dt>
                  <dd className="font-semibold text-ink text-right">
                    First principles &amp; craft
                  </dd>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-ink/10">
                  <dt className="text-stone-text uppercase tracking-wider font-semibold">
                    Daily Fuel
                  </dt>
                  <dd className="font-semibold text-ink text-right">
                    Iced coffee &amp; playlists
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 pt-2">
                  <dt className="text-stone-text uppercase tracking-wider font-semibold">
                    Hidden Token
                  </dt>
                  <dd>
                    <Collectible
                      id="star"
                      label="Pixel Star"
                      collected={starCollected}
                      onCollect={onCollect}
                    />
                  </dd>
                </div>
              </dl>
            </PixelWindow>
          </div>
        </div>

        {/* Three Editorial Themes (clean hairline rhythm, zero AI numbered-label clutter) */}
        <div className="mt-16 pt-12 border-t border-ink/15 grid grid-cols-1 md:grid-cols-3 gap-8">
          {THEMES.map((theme) => (
            <article key={theme.title} className="space-y-3">
              <div className="h-px w-10 bg-burgundy" aria-hidden="true" />
              <h3 className="font-editorial text-2xl text-ink">
                {theme.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink/82">{theme.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
