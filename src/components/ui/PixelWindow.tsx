import React from "react";

interface PixelWindowProps {
  title: string;
  badge?: string;
  theme?: "light" | "dark";
  className?: string;
  children: React.ReactNode;
}

export function PixelWindow({
  title,
  badge,
  theme = "light",
  className = "",
  children,
}: PixelWindowProps) {
  const isDark = theme === "dark";

  return (
    <div
      className={`overflow-hidden ${
        isDark
          ? "bg-ink-soft/90 text-porcelain pixel-window-frame-dark"
          : "bg-porcelain-soft text-ink pixel-window-frame"
      } ${className}`}
    >
      <div
        className={`flex items-center justify-between gap-3 px-4 py-2.5 border-b ${
          isDark
            ? "border-chrome/25 bg-ink"
            : "border-ink/20 bg-porcelain-deep"
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="flex items-center gap-1" aria-hidden="true">
            <span className="inline-block h-2 w-2 bg-burgundy" />
            <span className="inline-block h-2 w-2 bg-powder-pink" />
            <span className="inline-block h-2 w-2 bg-chrome" />
          </span>
          <span className="font-pixel text-[11px] uppercase truncate">
            {title}
          </span>
        </div>
        {badge && (
          <span
            className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 shrink-0 ${
              isDark
                ? "bg-burgundy/40 text-powder-pink border border-powder-pink/35"
                : "bg-ink text-porcelain"
            }`}
          >
            {badge}
          </span>
        )}
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}
