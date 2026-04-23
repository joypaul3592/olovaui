"use client";

import { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ShinyTextProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  speed?: number;
  angle?: number;
  colors?: string[];
  disabled?: boolean;
}

/**
 * ShinyText - A text component with a shimmering gradient effect that passes through the text.
 * 
 * @param children - The text content to display
 * @param className - Additional CSS classes
 * @param style - Inline styles
 * @param speed - Animation speed in seconds (default: 3)
 * @param angle - Gradient angle in degrees (default: -45)
 * @param colors - Array of colors for the gradient effect
 * @param disabled - Disable the animation effect
 */
export const ShinyText = ({
  children,
  className,
  style,
  speed = 3,
  angle = -45,
  colors = ["#9d9d9d", "rgba(217, 217, 217, 0)", "#9d9d9d"],
  disabled = false,
}: ShinyTextProps) => {
  // Build the gradient string based on the angle and colors
  const gradientStops = colors.map((color, index) => {
    const position = index === 0 ? "0%" : index === 1 ? "50%" : "100%";
    return `${color} ${position}`;
  }).join(", ");

  const gradientStyle = `linear-gradient(${angle}deg, ${gradientStops})`;

  // Calculate background size based on angle for proper animation
  const bgSize = disabled ? "100% 100%" : "200% 100%";

  return (
    <span
      className={cn("shiny-text-wrapper inline-block", className)}
      style={{
        ...style,
        backgroundImage: disabled ? "none" : gradientStyle,
        backgroundSize: bgSize,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0% 0%",
        ...(disabled ? {} : {
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
          animation: `shiny-slide ${speed}s linear infinite`,
        }),
      }}
    >
      <style>{`
        @keyframes shiny-slide {
          0% {
            background-position: 100% 0%;
          }
          100% {
            background-position: -100% 0%;
          }
        }
      `}</style>
      {children}
    </span>
  );
};
