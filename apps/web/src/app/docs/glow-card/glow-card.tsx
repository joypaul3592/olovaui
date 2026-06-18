"use client";

import { useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";

type PointerPosition = {
  x: number;
  y: number;
};

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  borderGlowColor?: string;
  backgroundColor?: string;
  borderRadius?: string;
  maxWidth?: string;
}

export function GlowCard({
  children,
  className = "",
  glowColor = "rgba(255, 182, 255, 0.4)",
  borderGlowColor = "rgba(255, 230, 245, 0.9)",
  backgroundColor,
  borderRadius = "24px",
  maxWidth = "420px",
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState<PointerPosition>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) {
      return;
    }

    const rect = cardRef.current.getBoundingClientRect();

    setMousePos({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const innerRadius = `calc(${borderRadius} - 1.5px)`;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full rounded-[${borderRadius}] p-[1.5px] ${className}`}
      style={{ maxWidth }}
    >
      <div className="absolute inset-0 bg-black/5 dark:bg-white/5" style={{ borderRadius }} />

      <div
        className="absolute inset-0 blur-xl transition-opacity duration-500 ease-in-out"
        style={{
          borderRadius,
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(
            300px circle at ${mousePos.x}px ${mousePos.y}px,
            ${glowColor},
            transparent 50%
          )`,
        }}
      />

      <div
        className="absolute inset-0 transition-opacity duration-300 ease-in-out"
        style={{
          borderRadius,
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(
            350px circle at ${mousePos.x}px ${mousePos.y}px,
            ${borderGlowColor},
            transparent 40%
          )`,
        }}
      />

      <div
        className="relative z-10 flex h-full w-full flex-col p-8 bg-card text-card-foreground"
        style={{ borderRadius: innerRadius, ...(backgroundColor ? { backgroundColor } : {}) }}
      >
        {children}
      </div>
    </div>
  );
}

export default GlowCard;
