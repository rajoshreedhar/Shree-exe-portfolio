import React from "react";

interface SectionLabelProps {
  chapterNumber: string;
  label: string;
  theme?: "light" | "dark";
}

export function SectionLabel({
  chapterNumber,
  label,
  theme = "light",
}: SectionLabelProps) {
  const isDark = theme === "dark";

  return (
    <div className="inline-flex items-center gap-3 mb-5">
      <span
        className={`font-pixel text-[11px] px-2.5 py-1.5 tabular-nums ${
          isDark
            ? "bg-burgundy text-porcelain border border-powder-pink/40"
            : "bg-ink text-porcelain"
        }`}
      >
        CH.{chapterNumber}
      </span>
      <span
        className={`h-px w-8 ${isDark ? "bg-chrome/45" : "bg-stone"}`}
        aria-hidden="true"
      />
      <span
        className={`text-xs uppercase tracking-[0.18em] font-semibold ${
          isDark ? "text-powder-pink" : "text-burgundy"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
