import React from "react";
import type { ProjectCaseStudyData } from "@/data/projects";

export function ProjectVisual({
  variant,
}: {
  variant: ProjectCaseStudyData["visualVariant"];
}) {
  if (variant === "skytxt") {
    return (
      <div className="relative w-full h-full min-h-[268px] bg-[#1F1B1D] text-porcelain p-5 sm:p-6 flex flex-col justify-between border border-ink overflow-hidden">
        <div className="flex items-center justify-between border-b border-chrome/25 pb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 bg-burgundy inline-block" />
            <span className="h-2.5 w-2.5 bg-powder-pink inline-block" />
            <span className="h-2.5 w-2.5 bg-chrome inline-block" />
            <span className="font-semibold tracking-wider text-powder-pink ml-1.5">
              SKYTXT // TEXT BRIEFING
            </span>
          </div>
          <span className="font-mono text-[11px] text-chrome/80">
            LOW-OVERHEAD
          </span>
        </div>

        <div className="my-5 font-mono text-xs sm:text-[13px] space-y-2.5 leading-relaxed">
          <div className="flex items-baseline justify-between border-b border-chrome/15 pb-2">
            <span className="text-chrome/80">LOC :: KOLKATA / 22.57°N</span>
            <span className="text-powder-pink font-semibold tabular-nums">
              26°C · CLEAR DUSK
            </span>
          </div>
          <p className="text-porcelain/95">
            &gt; NOW: Mild SE breeze (11 km/h). Humidity steady at 58%.
          </p>
          <p className="text-chrome/85">
            &gt; NEXT 6H: Cooling smoothly to 22°C by 23:00. Rain &lt; 10%.
          </p>
          <p className="text-powder-pink">
            &gt; BRIEF: Light layer after sunset. No umbrella needed tonight.
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-chrome/20 text-[11px] text-chrome/80 font-mono">
          <span>PAYLOAD: 1.4 KB PLAIN TEXT</span>
          <span>DETERMINISTIC PARSER</span>
        </div>
      </div>
    );
  }

  if (variant === "pixel-world") {
    return (
      <div className="relative w-full h-full min-h-[268px] bg-porcelain-deep text-ink p-5 sm:p-6 flex flex-col justify-between border border-ink/80 overflow-hidden">
        <div className="flex items-center justify-between border-b border-ink/20 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-burgundy">
            Shree.exe // Design System
          </span>
          <span className="text-xs font-semibold text-ink/80">
            8 Chapters · Pixel Chic
          </span>
        </div>

        <div className="my-5 grid grid-cols-5 gap-2">
          {[
            { name: "Porcelain", hex: "#F4EFE7", dark: false },
            { name: "Ink", hex: "#24201F", dark: true },
            { name: "Pink", hex: "#D9BFC0", dark: false },
            { name: "Burgundy", hex: "#843F49", dark: true },
            { name: "Chrome", hex: "#C7C7C4", dark: false },
          ].map((swatch) => (
            <div
              key={swatch.name}
              style={{ backgroundColor: swatch.hex }}
              className={`h-22 p-2 border border-ink/25 flex flex-col justify-end ${
                swatch.dark ? "text-porcelain" : "text-ink"
              }`}
            >
              <span className="text-[11px] font-bold leading-tight block truncate">
                {swatch.name}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-ink/15 text-xs">
          <span className="font-editorial italic text-base text-burgundy">
            Editorial structure × Pixel personality
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 bg-ink text-porcelain">
            A11y First
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[268px] bg-porcelain-soft text-ink p-5 sm:p-6 flex flex-col justify-between border border-ink/80 overflow-hidden">
      <div className="flex items-center justify-between border-b border-ink/20 pb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-burgundy">
          ML Ledger // Experiment Log
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wide px-2.5 py-0.5 bg-powder-pink/55 border border-ink/25">
          In Progress
        </span>
      </div>

      <div className="my-4 space-y-2.5 text-xs font-mono">
        <div className="grid grid-cols-3 gap-2 p-2 bg-porcelain border border-ink/15 font-semibold">
          <span>RUN</span>
          <span>SPLIT CHECK</span>
          <span>NOTE</span>
        </div>
        <div className="grid grid-cols-3 gap-2 p-2 border-b border-ink/10">
          <span className="text-burgundy font-bold">01_baseline</span>
          <span>Stratified 5-fold</span>
          <span>Clean benchmark</span>
        </div>
        <div className="grid grid-cols-3 gap-2 p-2 border-b border-ink/10">
          <span className="text-ink font-bold">02_features</span>
          <span>Leakage audit</span>
          <span>Error slice log</span>
        </div>
        <div className="grid grid-cols-3 gap-2 p-2">
          <span className="text-stone-text font-bold">03_pytorch</span>
          <span>Active study</span>
          <span>Loss diagnostics</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-ink/15 text-xs text-ink/80">
        <span>Honest benchmarks &amp; qualitative failure slices</span>
        <span className="text-[11px] font-bold uppercase tracking-wider text-burgundy">
          Reproducible
        </span>
      </div>
    </div>
  );
}
