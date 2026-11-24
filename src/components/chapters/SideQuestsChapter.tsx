"use client";

import React, { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Collectible } from "@/components/ui/Collectible";
import {
  PixelBookIcon,
  PixelCoffeeIcon,
  PixelHeartIcon,
  PixelSparkleIcon,
  PixelStarIcon,
} from "@/components/ui/PixelIcons";
import { SIDE_QUESTS, type SideQuestItem } from "@/data/interests";

interface SideQuestsChapterProps {
  coffeeCollected: boolean;
  onCollect: (id: "star" | "coffee" | "heart") => void;
}

const CATEGORIES: ("All" | SideQuestItem["category"])[] = [
  "All",
  "Fashion & Design",
  "Mysteries & Puzzles",
  "Cinema & Pop Culture",
  "Coffee & Rituals",
];

function MotifIcon({ motif }: { motif: SideQuestItem["pixelMotif"] }) {
  switch (motif) {
    case "coffee":
      return <PixelCoffeeIcon size={18} />;
    case "ribbon":
      return <PixelHeartIcon size={18} />;
    case "notebook":
      return <PixelBookIcon size={18} />;
    case "sparkle":
      return <PixelSparkleIcon size={16} className="text-burgundy" />;
    default:
      return <PixelStarIcon size={18} />;
  }
}

export function SideQuestsChapter({
  coffeeCollected,
  onCollect,
}: SideQuestsChapterProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | SideQuestItem["category"]
  >("All");

  const visibleItems =
    selectedCategory === "All"
      ? SIDE_QUESTS
      : SIDE_QUESTS.filter((item) => item.category === selectedCategory);

  return (
    <section
      id="the-side-quests"
      aria-labelledby="side-quests-heading"
      className="bg-porcelain paper-grain border-b border-ink/15 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <SectionLabel
              chapterNumber="06"
              label="The side quests · Editorial scrapbook"
            />
            <h2
              id="side-quests-heading"
              className="font-editorial text-4xl sm:text-5xl text-ink leading-[1.06] max-w-[22ch]"
            >
              Everything outside the IDE{" "}
              <span className="text-burgundy">
                that still shapes how I think.
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:items-end gap-2.5">
            <p className="text-xs text-ink/78 max-w-xs sm:text-right leading-relaxed">
              Optional personal lore. Filter by what catches your eye, or grab
              the hidden espresso token.
            </p>
            <Collectible
              id="coffee"
              label="Espresso Cup"
              collected={coffeeCollected}
              onCollect={onCollect}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                aria-pressed={active}
                className={`min-h-[42px] px-4 py-2 text-xs font-semibold border transition-colors cursor-pointer ${
                  active
                    ? "bg-burgundy text-porcelain border-burgundy"
                    : "bg-porcelain-soft text-ink border-ink/25 hover:border-burgundy"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleItems.map((item) => (
            <article
              key={item.id}
              className="p-6 bg-porcelain-soft border border-ink/20 hover:border-ink/80 hover:shadow-[0_10px_24px_-12px_rgba(36,32,31,0.28)] transition-all duration-200 flex flex-col justify-between gap-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-wider text-burgundy uppercase">
                    {item.label}
                  </span>
                  <MotifIcon motif={item.pixelMotif} />
                </div>
                <h3 className="font-editorial text-2xl text-ink leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-ink/82 leading-relaxed">
                  {item.note}
                </p>
              </div>
              <p className="pt-3 border-t border-ink/15 text-xs italic text-stone-text">
                “{item.detail}”
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
