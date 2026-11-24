import React from "react";
import type { Metadata } from "next";
import { AdventureRouteView } from "@/components/game/AdventureRouteView";

export const metadata: Metadata = {
  title: "Arrival Cove — SHREE.EXE: The Little Island",
  description:
    "Explore Arrival Cove in SHREE.EXE — The First Morning playable prototype.",
};

export default function AdventurePage() {
  return <AdventureRouteView />;
}
