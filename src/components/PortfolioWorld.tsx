"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { CHAPTERS, type ChapterMeta, type ShreePose } from "@/data/chapters";
import { COLLECTIBLES } from "@/data/interests";
import { isTypingTarget } from "@/lib/accessibility";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { ChapterIndex } from "@/components/navigation/ChapterIndex";
import { ChapterProgress } from "@/components/navigation/ChapterProgress";
import { ShreeCompanion } from "@/components/character/ShreeCompanion";
import { Hero } from "@/components/home/Hero";
import { AboutChapter } from "@/components/chapters/AboutChapter";
import { InventoryChapter } from "@/components/chapters/InventoryChapter";
import { LaboratoryChapter } from "@/components/chapters/LaboratoryChapter";
import { ProjectsChapter } from "@/components/chapters/ProjectsChapter";
import { SoundtrackChapter } from "@/components/chapters/SoundtrackChapter";
import { SideQuestsChapter } from "@/components/chapters/SideQuestsChapter";
import { ContactChapter } from "@/components/chapters/ContactChapter";

export function PortfolioWorld() {
  const [activeChapterId, setActiveChapterId] = useState<string>(CHAPTERS[0].id);
  const [indexOpen, setIndexOpen] = useState(false);
  const [overridePose, setOverridePose] = useState<ShreePose | null>(null);
  const [customMessage, setCustomMessage] = useState<string | null>(null);
  const [collected, setCollected] = useState<("star" | "coffee" | "heart")[]>([]);

  const indexButtonRef = useRef<HTMLButtonElement | null>(null);

  const activeChapter: ChapterMeta =
    CHAPTERS.find((c) => c.id === activeChapterId) ?? CHAPTERS[0];

  // Track active chapter cleanly as visitor scrolls natively (zero scroll-jacking!)
  useEffect(() => {
    const elements = CHAPTERS.map((ch) => document.getElementById(ch.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveChapterId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -45% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Global keyboard shortcut: "M" opens/closes Chapter Index
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        (event.key === "m" || event.key === "M") &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !isTypingTarget(event.target)
      ) {
        event.preventDefault();
        setIndexOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const navigateToChapter = useCallback((chapterId: string) => {
    const target = document.getElementById(chapterId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveChapterId(chapterId);
    }
  }, []);

  const handleCollect = useCallback(
    (id: "star" | "coffee" | "heart") => {
      const meta = COLLECTIBLES.find((item) => item.id === id);
      setCollected((prev) => (prev.includes(id) ? prev : [...prev, id]));
      setOverridePose("celebrate");
      if (meta) {
        setCustomMessage(meta.discoveryNote);
      }
      setTimeout(() => {
        setOverridePose((current) => (current === "celebrate" ? null : current));
      }, 2600);
    },
    []
  );

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader
        activeChapter={activeChapter}
        onOpenIndex={() => setIndexOpen(true)}
        indexButtonRef={indexButtonRef}
      />

      <ChapterProgress
        activeChapter={activeChapter}
        onNavigate={navigateToChapter}
      />

      <main id="main-content" className="flex-1">
        <Hero
          onEnterWorld={() => navigateToChapter("the-player")}
          onViewProjects={() => navigateToChapter("the-quests")}
          onOpenIndex={() => setIndexOpen(true)}
        />

        <AboutChapter
          starCollected={collected.includes("star")}
          onCollect={handleCollect}
        />

        <InventoryChapter />

        <LaboratoryChapter />

        <ProjectsChapter />

        <SoundtrackChapter />

        <SideQuestsChapter
          coffeeCollected={collected.includes("coffee")}
          onCollect={handleCollect}
        />

        <ContactChapter
          heartCollected={collected.includes("heart")}
          collectedCount={collected.length}
          totalCollectibles={COLLECTIBLES.length}
          onCollect={handleCollect}
          onNavigateChapter={navigateToChapter}
        />
      </main>

      <ChapterIndex
        open={indexOpen}
        activeChapter={activeChapter}
        onClose={() => setIndexOpen(false)}
        onNavigate={navigateToChapter}
        returnFocusRef={indexButtonRef}
      />

      <ShreeCompanion
        activeChapter={activeChapter}
        overridePose={overridePose}
        customMessage={customMessage}
        collectedCount={collected.length}
        totalCollectibles={COLLECTIBLES.length}
        onNavigateChapter={navigateToChapter}
        onSelectPose={setOverridePose}
        onClearCustomMessage={() => setCustomMessage(null)}
      />
    </div>
  );
}
