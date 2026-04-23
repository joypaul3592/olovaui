"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface ShineBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Width of the border in pixels
   * @default 1
   */
  borderWidth?: number;
  /**
   * Duration of the animation in seconds
   * @default 14
   */
  duration?: number;
  /**
   * Color of the border, can be a single color or an array of colors
   * @default "#000000"
   */
  shineColor?: string | string[];
  /**
   * Gradient start color (optional convenience prop)
   */
  colorFrom?: string;
  /**
   * Gradient end color (optional convenience prop)
   */
  colorTo?: string;
  /**
   * Overall opacity for the shine layer
   * @default 1
   */
  opacity?: number;
}

/**
 * Shine Border
 *
 * An animated background border effect component with configurable properties.
 */
export function ShineBorder({
  borderWidth = 1,
  duration = 14,
  shineColor = "#000000",
  colorFrom,
  colorTo,
  opacity = 1,
  className,
  style,
  ...props
}: ShineBorderProps) {
  const gradientColors = React.useMemo(() => {
    if (colorFrom || colorTo) {
      const start = colorFrom ?? "#000000";
      const end = colorTo ?? start;
      return [start, end].join(", ");
    }
    if (Array.isArray(shineColor)) {
      return shineColor.join(", ");
    }
    return shineColor;
  }, [shineColor, colorFrom, colorTo]);

  return (
    <div
      style={
        {
          "--border-width": `${borderWidth}px`,
          "--duration": `${duration}s`,
          backgroundImage: `radial-gradient(transparent, transparent, ${gradientColors}, transparent, transparent)`,
          backgroundSize: "300% 300%",
          opacity,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "var(--border-width)",
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position]",
        "motion-safe:animate-shine",
        className,
      )}
      {...props}
    />
  );
}
