"use client";

import React, { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PixelWindow } from "@/components/ui/PixelWindow";
import { PixelSparkleIcon } from "@/components/ui/PixelIcons";
import {
  CURRENTLY_LEARNING,
  SKILL_CATEGORIES,
  SKILLS,
  type SkillCategory,
  type SkillItem,
  type SkillStatus,
} from "@/data/skills";
import { PROFILE } from "@/data/profile";

function statusStyles(status: SkillStatus): string {
  switch (status) {
    case "Used":
      return "bg-ink text-porcelain border-ink";
    case "Learning":
      return "bg-burgundy/12 text-burgundy border-burgundy/45";
    case "Exploring":
      return "bg-powder-pink/45 text-ink border-ink/30";
  }
}

export function InventoryChapter() {
  const [activeCategory, setActiveCategory] = useState<"All" | SkillCategory>(
    "All"
  );
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(SKILLS[0]);
  const [sparkleKey, setSparkleKey] = useState(0);

  const filteredSkills =
    activeCategory === "All"
      ? SKILLS
      : SKILLS.filter((skill) => skill.category === activeCategory);

  const handleSelectSkill = (skill: SkillItem) => {
    setSelectedSkill(skill);
    setSparkleKey((k) => k + 1);
  };

  return (
    <section
      id="the-inventory"
      aria-labelledby="inventory-heading"
      className="bg-porcelain paper-grain border-b border-ink/15 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <SectionLabel
              chapterNumber="02"
              label="The inventory · Skills & tools"
            />
            <h2
              id="inventory-heading"
              className="font-editorial text-4xl sm:text-5xl text-ink"
            >
              {PROFILE.microcopy.skills}
            </h2>
          </div>
          <p className="text-sm text-ink/80 max-w-md leading-relaxed">
            Honest capabilities, zero invented percentage bars. Select any item
            to inspect where it showed up or what I am actively learning.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter skills by category"
          className="flex flex-wrap gap-2 mb-8"
        >
          {SKILL_CATEGORIES.map((category) => {
            const active = activeCategory === category;
            return (
              <button
                key={category}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => {
                  setActiveCategory(category);
                  const firstMatch =
                    category === "All"
                      ? SKILLS[0]
                      : SKILLS.find((s) => s.category === category);
                  if (firstMatch) handleSelectSkill(firstMatch);
                }}
                className={`min-h-[42px] px-4 py-2 text-xs font-semibold border transition-all cursor-pointer ${
                  active
                    ? "bg-ink text-porcelain border-ink shadow-sm"
                    : "bg-porcelain-soft text-ink border-ink/25 hover:border-burgundy"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Inventory Grid + Detail Inspection Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredSkills.map((skill) => {
              const isSelected = selectedSkill.id === skill.id;
              return (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => handleSelectSkill(skill)}
                  aria-pressed={isSelected}
                  className={`group relative text-left p-4 border transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "bg-porcelain-soft border-ink shadow-[0_8px_20px_-10px_rgba(36,32,31,0.3)] -translate-y-0.5"
                      : "bg-porcelain-soft/80 border-ink/20 hover:border-burgundy hover:-translate-y-0.5"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`inline-flex h-9 w-9 items-center justify-center font-pixel text-[11px] border shrink-0 ${
                          isSelected
                            ? "bg-burgundy text-porcelain border-burgundy"
                            : "bg-porcelain border-ink/25 text-ink"
                        }`}
                      >
                        {skill.iconGlyph}
                      </span>
                      <div>
                        <span className="font-semibold text-sm text-ink block">
                          {skill.name}
                        </span>
                        <span className="text-xs text-stone-text">
                          {skill.category}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 border uppercase tracking-wide shrink-0 ${statusStyles(
                        skill.status
                      )}`}
                    >
                      {skill.status}
                    </span>
                  </div>

                  <p className="text-xs text-ink/80 leading-relaxed">
                    {skill.shortNote}
                  </p>

                  {isSelected && (
                    <span
                      key={sparkleKey}
                      aria-hidden="true"
                      className="absolute -top-2 -right-2 text-burgundy animate-sparkle-once"
                    >
                      <PixelSparkleIcon size={16} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Inspector Panel */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <PixelWindow
              title="ITEM_INSPECTOR"
              badge={selectedSkill.status.toUpperCase()}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-ink/15 pb-3.5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-burgundy mb-1">
                      {selectedSkill.category}
                    </p>
                    <h3 className="font-editorial text-3xl text-ink">
                      {selectedSkill.name}
                    </h3>
                  </div>
                  <span className="inline-flex h-11 w-11 items-center justify-center bg-ink text-porcelain font-pixel text-[11px] shrink-0">
                    {selectedSkill.iconGlyph}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-ink/88">
                  {selectedSkill.context}
                </p>

                <div className="p-3.5 bg-porcelain border border-ink/15 space-y-1.5">
                  <span className="text-[11px] font-bold text-stone-text uppercase tracking-wider block">
                    Where it showed up
                  </span>
                  <p className="text-sm font-medium text-ink">
                    {selectedSkill.whereUsed}
                  </p>
                </div>

                <div className="pt-2 border-t border-ink/15 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-ink/80">
                  <span>
                    <strong className="text-ink">Used:</strong> Applied in real
                    projects or coursework
                  </span>
                  <span>
                    <strong className="text-burgundy">Learning:</strong> Active
                    practice
                  </span>
                  <span>
                    <strong className="text-ink">Exploring:</strong> Early
                    curiosity
                  </span>
                </div>
              </div>
            </PixelWindow>
          </div>
        </div>

        {/* Visually Distinct "Currently Learning" Shelf */}
        <div className="mt-14 pt-10 border-t border-ink/15">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6">
            <div>
              <h3 className="font-editorial italic text-2xl sm:text-3xl text-ink">
                “{PROFILE.microcopy.learning}”
              </h3>
            </div>
            <span className="text-xs font-medium text-stone-text">
              Active learning queue — clearly separated from demonstrated skills
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CURRENTLY_LEARNING.map((item) => (
              <div
                key={item.topic}
                className="p-4 bg-porcelain-soft border border-dashed border-ink/35 space-y-2.5"
              >
                <span
                  className={`inline-block text-[11px] font-semibold px-2 py-0.5 border uppercase tracking-wide ${statusStyles(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
                <h4 className="font-semibold text-sm text-ink">{item.topic}</h4>
                <p className="text-xs text-ink/80 leading-relaxed">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
