"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
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

export function AdventureRouteView() {
  const router = useRouter();
  return <DynamicGameShell onReturnToTitle={() => router.push("/")} />;
}
