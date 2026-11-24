"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { LAB_NOTES, type LabNote, type LabStatus } from "@/data/interests";

function LabSchematic({ type }: { type: LabNote["diagramType"] }) {
  if (type === "neural") {
    return (
      <svg viewBox="0 0 180 68" className="w-full h-16" aria-hidden="true">
        <g stroke="#C7C7C4" strokeOpacity="0.4" strokeWidth="1">
          <line x1="26" y1="16" x2="88" y2="20" />
          <line x1="26" y1="16" x2="88" y2="48" />
          <line x1="26" y1="50" x2="88" y2="20" />
          <line x1="26" y1="50" x2="88" y2="48" />
          <line x1="88" y1="20" x2="152" y2="34" />
          <line x1="88" y1="48" x2="152" y2="34" />
        </g>
        <circle cx="26" cy="16" r="5" fill="#F4EFE7" />
        <circle cx="26" cy="50" r="5" fill="#F4EFE7" />
        <circle cx="88" cy="20" r="6" fill="#D9BFC0" />
        <circle cx="88" cy="48" r="6" fill="#D9BFC0" />
        <circle
          cx="152"
          cy="34"
          r="7"
          fill="#843F49"
          stroke="#F4EFE7"
          strokeWidth="1.5"
        />
      </svg>
    );
  }
  if (type === "data") {
    return (
      <svg viewBox="0 0 180 68" className="w-full h-16" aria-hidden="true">
        <line
          x1="16"
          y1="56"
          x2="164"
          y2="56"
          stroke="#C7C7C4"
          strokeOpacity="0.45"
        />
        <rect x="26" y="34" width="16" height="22" fill="#C7C7C4" fillOpacity="0.6" />
        <rect x="54" y="22" width="16" height="34" fill="#D9BFC0" />
        <rect x="82" y="14" width="16" height="42" fill="#843F49" />
        <rect x="110" y="28" width="16" height="28" fill="#D9BFC0" />
        <rect x="138" y="18" width="16" height="38" fill="#F4EFE7" />
      </svg>
    );
  }
  if (type === "quantum") {
    return (
      <svg viewBox="0 0 180 68" className="w-full h-16" aria-hidden="true">
        <line
          x1="16"
          y1="22"
          x2="164"
          y2="22"
          stroke="#C7C7C4"
          strokeOpacity="0.5"
        />
        <line
          x1="16"
          y1="48"
          x2="164"
          y2="48"
          stroke="#C7C7C4"
          strokeOpacity="0.5"
        />
        <rect x="40" y="12" width="20" height="20" fill="#843F49" stroke="#F4EFE7" />
        <text
          x="50"
          y="26"
          textAnchor="middle"
          fill="#F4EFE7"
          fontSize="11"
          fontFamily="monospace"
        >
          H
        </text>
        <line x1="104" y1="22" x2="104" y2="48" stroke="#D9BFC0" strokeWidth="1.5" />
        <circle cx="104" cy="22" r="4" fill="#D9BFC0" />
        <circle cx="104" cy="48" r="8" fill="none" stroke="#D9BFC0" strokeWidth="1.5" />
        <line x1="104" y1="40" x2="104" y2="56" stroke="#D9BFC0" strokeWidth="1.5" />
        <line x1="96" y1="48" x2="112" y2="48" stroke="#D9BFC0" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 180 68" className="w-full h-16" aria-hidden="true">
      <rect
        x="18"
        y="12"
        width="44"
        height="44"
        fill="none"
        stroke="#C7C7C4"
        strokeOpacity="0.6"
      />
      <rect
        x="68"
        y="20"
        width="44"
        height="28"
        fill="#843F49"
        fillOpacity="0.6"
        stroke="#D9BFC0"
      />
      <rect
        x="118"
        y="12"
        width="44"
        height="44"
        fill="none"
        stroke="#F4EFE7"
        strokeOpacity="0.75"
      />
      <line x1="62" y1="34" x2="68" y2="34" stroke="#D9BFC0" />
      <line x1="112" y1="34" x2="118" y2="34" stroke="#D9BFC0" />
    </svg>
  );
}

function labStatusBadge(status: LabStatus): string {
  switch (status) {
    case "Built":
      return "bg-porcelain text-ink border-porcelain";
    case "In progress":
      return "bg-burgundy text-porcelain border-powder-pink/55";
    case "Investigating":
      return "bg-powder-pink/20 text-powder-pink border-powder-pink/50";
    case "Exploring":
      return "bg-transparent text-chrome border-chrome/50";
  }
}

export function LaboratoryChapter() {
  const [expandedId, setExpandedId] = useState<string | null>(LAB_NOTES[0].id);

  return (
    <section
      id="the-laboratory"
      aria-labelledby="laboratory-heading"
      className="relative ink-surface text-porcelain border-b border-chrome/20 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <SectionLabel
              chapterNumber="03"
              label="The laboratory · Technical interests"
              theme="dark"
            />
            <h2
              id="laboratory-heading"
              className="font-editorial text-4xl sm:text-5xl lg:text-[3.35rem] leading-[1.06] text-porcelain max-w-[20ch]"
            >
              Experiments, research questions &amp;{" "}
              <span className="text-powder-pink">honest work in progress.</span>
            </h2>
          </div>

          <p className="text-sm text-chrome/90 max-w-md leading-relaxed">
            Every note separates what is{" "}
            <strong className="text-porcelain">Built</strong> from what I am{" "}
            <strong className="text-porcelain">In progress</strong>,{" "}
            <strong className="text-powder-pink">Investigating</strong>, or{" "}
            <strong className="text-chrome">Exploring</strong>. Expand any card
            to read the hypothesis and next step.
          </p>
        </div>

        <div
          className="h-px w-full chrome-hairline opacity-40 mb-10"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LAB_NOTES.map((note) => {
            const isOpen = expandedId === note.id;
            return (
              <article
                key={note.id}
                className={`border transition-colors duration-200 ${
                  isOpen
                    ? "border-powder-pink/70 bg-ink-soft"
                    : "border-chrome/25 bg-ink-soft/65 hover:border-chrome/55"
                }`}
              >
                <div className="p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-bold tracking-wider text-powder-pink tabular-nums">
                        {note.code}
                      </span>
                      <span className="text-xs uppercase tracking-wider text-chrome/80">
                        {note.domain}
                      </span>
                    </div>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 border uppercase tracking-wide ${labStatusBadge(
                        note.status
                      )}`}
                    >
                      {note.status}
                    </span>
                  </div>

                  <div className="py-2 px-3 bg-ink/75 border border-chrome/20">
                    <LabSchematic type={note.diagramType} />
                  </div>

                  <div>
                    <h3 className="font-editorial text-2xl sm:text-[1.7rem] text-porcelain">
                      {note.title}
                    </h3>
                    <p className="mt-2 text-sm text-chrome/90 leading-relaxed max-w-[56ch]">
                      {note.preview}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpandedId(isOpen ? null : note.id)}
                    aria-expanded={isOpen}
                    className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 text-xs font-semibold uppercase tracking-wider border border-chrome/40 text-porcelain hover:border-powder-pink hover:text-powder-pink transition-colors cursor-pointer"
                  >
                    <span>
                      {isOpen ? "Hide lab dossier" : "Open lab dossier"}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  {isOpen && (
                    <dl className="pt-4 mt-2 border-t border-chrome/20 space-y-3.5 text-sm animate-dialogue-pop">
                      <div>
                        <dt className="text-[11px] font-bold tracking-wider text-powder-pink uppercase mb-1">
                          Question
                        </dt>
                        <dd className="text-porcelain/95 leading-relaxed">
                          {note.question}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-bold tracking-wider text-powder-pink uppercase mb-1">
                          Hypothesis
                        </dt>
                        <dd className="text-chrome/90 leading-relaxed">
                          {note.hypothesis}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-bold tracking-wider text-powder-pink uppercase mb-1">
                          Method
                        </dt>
                        <dd className="text-chrome/90 leading-relaxed">
                          {note.method}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-bold tracking-wider text-powder-pink uppercase mb-1">
                          Next step
                        </dt>
                        <dd className="text-porcelain leading-relaxed">
                          {note.nextStep}
                        </dd>
                      </div>
                    </dl>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
