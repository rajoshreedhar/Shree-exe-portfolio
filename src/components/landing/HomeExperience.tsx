"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { LandingScreen } from "@/components/landing/LandingScreen";
import { GameLoading } from "@/components/game/GameLoading";

const DynamicGameShell = dynamic(
  () => import("@/components/game/GameShell").then((mod) => mod.GameShell),
  {
    ssr: false,
    loading: () => (
      <div className="relative min-h-screen bg-porcelain">
        <GameLoading />
      </div>
    ),
  }
);

export function HomeExperience() {
  const [mode, setMode] = useState<"landing" | "adventure">("landing");

  if (mode === "adventure") {
    return <DynamicGameShell onReturnToTitle={() => setMode("landing")} />;
  }

  return <LandingScreen onStartNewGame={() => setMode("adventure")} />;
}
