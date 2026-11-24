import React from "react";

interface PixelIconProps {
  className?: string;
  size?: number;
}

export function PixelStarIcon({ className = "", size = 16 }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`pixel-art shrink-0 ${className}`}
      shapeRendering="crispEdges"
    >
      <rect x="7" y="1" width="2" height="3" fill="#E8C266" />
      <rect x="6" y="4" width="4" height="2" fill="#F4D88A" />
      <rect x="2" y="6" width="12" height="2" fill="#F4D88A" />
      <rect x="4" y="8" width="8" height="2" fill="#E8C266" />
      <rect x="4" y="10" width="3" height="2" fill="#E8C266" />
      <rect x="9" y="10" width="3" height="2" fill="#E8C266" />
      <rect x="3" y="12" width="2" height="2" fill="#C99F45" />
      <rect x="11" y="12" width="2" height="2" fill="#C99F45" />
      <rect x="7" y="6" width="2" height="2" fill="#FFF7DE" />
    </svg>
  );
}

export function PixelHeartIcon({ className = "", size = 16 }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`pixel-art shrink-0 ${className}`}
      shapeRendering="crispEdges"
    >
      <rect x="3" y="3" width="4" height="2" fill="#843F49" />
      <rect x="9" y="3" width="4" height="2" fill="#843F49" />
      <rect x="2" y="5" width="12" height="3" fill="#843F49" />
      <rect x="3" y="8" width="10" height="2" fill="#843F49" />
      <rect x="5" y="10" width="6" height="2" fill="#843F49" />
      <rect x="7" y="12" width="2" height="2" fill="#843F49" />
      <rect x="4" y="5" width="2" height="2" fill="#D9BFC0" />
    </svg>
  );
}

export function PixelCoffeeIcon({ className = "", size = 16 }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`pixel-art shrink-0 ${className}`}
      shapeRendering="crispEdges"
    >
      <rect x="5" y="1" width="1" height="2" fill="#AAA49C" />
      <rect x="8" y="2" width="1" height="2" fill="#AAA49C" />
      <rect x="3" y="5" width="8" height="8" fill="#24201F" />
      <rect x="4" y="6" width="6" height="6" fill="#F4EFE7" />
      <rect x="4" y="6" width="6" height="2" fill="#843F49" />
      <rect x="11" y="6" width="2" height="1" fill="#24201F" />
      <rect x="12" y="7" width="1" height="3" fill="#24201F" />
      <rect x="11" y="10" width="2" height="1" fill="#24201F" />
      <rect x="2" y="13" width="10" height="1" fill="#24201F" />
    </svg>
  );
}

export function PixelMusicNoteIcon({ className = "", size = 14 }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`pixel-art shrink-0 ${className}`}
      shapeRendering="crispEdges"
    >
      <rect x="6" y="2" width="7" height="2" fill="currentColor" />
      <rect x="6" y="4" width="2" height="8" fill="currentColor" />
      <rect x="11" y="4" width="2" height="7" fill="currentColor" />
      <rect x="3" y="10" width="4" height="3" fill="currentColor" />
      <rect x="8" y="9" width="4" height="3" fill="currentColor" />
    </svg>
  );
}

export function PixelLaptopIcon({ className = "", size = 18 }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 14"
      fill="none"
      aria-hidden="true"
      className={`pixel-art shrink-0 ${className}`}
      shapeRendering="crispEdges"
    >
      <rect x="3" y="1" width="12" height="8" fill="#24201F" />
      <rect x="4" y="2" width="10" height="6" fill="#D9BFC0" />
      <rect x="5" y="3" width="4" height="1" fill="#24201F" />
      <rect x="5" y="5" width="7" height="1" fill="#843F49" />
      <rect x="1" y="9" width="16" height="3" fill="#C7C7C4" />
      <rect x="1" y="12" width="16" height="1" fill="#24201F" />
    </svg>
  );
}

export function PixelBookIcon({ className = "", size = 16 }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`pixel-art shrink-0 ${className}`}
      shapeRendering="crispEdges"
    >
      <rect x="2" y="3" width="6" height="10" fill="#843F49" />
      <rect x="8" y="3" width="6" height="10" fill="#6B3039" />
      <rect x="3" y="4" width="4" height="8" fill="#F4EFE7" />
      <rect x="9" y="4" width="4" height="8" fill="#F4EFE7" />
      <rect x="7" y="3" width="2" height="10" fill="#24201F" />
      <rect x="4" y="6" width="2" height="1" fill="#AAA49C" />
      <rect x="10" y="6" width="2" height="1" fill="#AAA49C" />
    </svg>
  );
}

export function PixelSparkleIcon({ className = "", size = 14 }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={`pixel-art shrink-0 ${className}`}
      shapeRendering="crispEdges"
    >
      <rect x="6" y="1" width="2" height="12" fill="currentColor" />
      <rect x="1" y="6" width="12" height="2" fill="currentColor" />
      <rect x="4" y="4" width="6" height="6" fill="currentColor" fillOpacity="0.45" />
    </svg>
  );
}
