import React from "react";
import type { Metadata } from "next";
import { PortfolioWorld } from "@/components/PortfolioWorld";

export const metadata: Metadata = {
  title: "Quick Portfolio — Rajoshree Dhar | Shree.exe",
  description:
    "Quick Portfolio for Rajoshree Dhar: About, Skills, Laboratory notes, Selected Projects, and Contact — lightweight and independent of Adventure Mode.",
};

export default function PortfolioPage() {
  return <PortfolioWorld />;
}
