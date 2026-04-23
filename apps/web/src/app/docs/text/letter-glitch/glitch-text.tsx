"use client";

import { CSSProperties, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789";
const DEFAULT_COLORS = ["#2b4539", "#61dca3", "#61b3dc"];

type LetterState = {
  char: string;
  color: string;
  progress: number;
};

export interface GlitchTextProps {
  children: ReactNode;
  glitchColors?: string[];
  glitchSpeed?: number;
  smooth?: boolean;
  characters?: string;
  duration?: number;
  stagger?: number;
  color?: string;
  fontSize?: CSSProperties["fontSize"];
  fontWeight?: CSSProperties["fontWeight"];
  className?: string;
  style?: CSSProperties;
  onComplete?: () => void;
  triggerKey?: number | string;
  frozen?: boolean;
}

const hexToRgb = (hex: string) => {
  const normalized = hex.replace(
    /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    (_, r, g, b) => r + r + g + g + b + b,
  );

  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalized);

  return match
    ? {
        r: Number.parseInt(match[1], 16),
        g: Number.parseInt(match[2], 16),
        b: Number.parseInt(match[3], 16),
      }
    : null;
};

const lerpColor = (from: string, to: string, t: number) => {
  const start = hexToRgb(from);
  const end = hexToRgb(to);

  if (!start || !end) {
    return from;
  }

  return `rgb(${Math.round(start.r + (end.r - start.r) * t)}, ${Math.round(
    start.g + (end.g - start.g) * t,
  )}, ${Math.round(start.b + (end.b - start.b) * t)})`;
};

const buildStates = (
  text: string,
  charPool: string[],
  glitchColors: string[],
): LetterState[] =>
  Array.from(text).map((char) => ({
    char: char === " " ? " " : charPool[Math.floor(Math.random() * charPool.length)] ?? char,
    color: glitchColors[Math.floor(Math.random() * glitchColors.length)] ?? DEFAULT_COLORS[0],
    progress: 0,
  }));

export const GlitchText = ({
  children,
  glitchColors = DEFAULT_COLORS,
  glitchSpeed = 50,
  smooth = true,
  characters = DEFAULT_CHARACTERS,
  duration = 1000,
  stagger = 20,
  color = "#fff",
  fontSize = "inherit",
  fontWeight = "inherit",
  className = "",
  style = {},
  onComplete,
  triggerKey = 0,
  frozen = false,
}: GlitchTextProps) => {
  const text = typeof children === "string" ? children : String(children ?? "");
  const charPool = useMemo(() => Array.from(characters), [characters]);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number | null>(null);
  const frozenTickRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);

  const [charStates, setCharStates] = useState<LetterState[]>(() =>
    buildStates(text, charPool, glitchColors),
  );

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (frozenTickRef.current) {
      clearTimeout(frozenTickRef.current);
      frozenTickRef.current = null;
    }

    startRef.current = null;
    lastFrameRef.current = null;

    if (!text.length) {
      onCompleteRef.current?.();
      return;
    }

    const safeDuration = Math.max(duration, 1);
    const safeGlitchSpeed = Math.max(glitchSpeed, 1);

    if (frozen) {
      const tick = () => {
        setCharStates(
          Array.from(text).map((char) =>
            char === " "
              ? { char: " ", color: glitchColors[0] ?? DEFAULT_COLORS[0], progress: 0 }
              : {
                  char: charPool[Math.floor(Math.random() * charPool.length)] ?? char,
                  color: glitchColors[Math.floor(Math.random() * glitchColors.length)] ?? color,
                  progress: 0,
                },
          ),
        );

        frozenTickRef.current = window.setTimeout(tick, safeGlitchSpeed);
      };

      tick();

      return () => {
        if (frozenTickRef.current) {
          clearTimeout(frozenTickRef.current);
          frozenTickRef.current = null;
        }
      };
    }

    const initialFrame = window.setTimeout(() => {
      setCharStates(buildStates(text, charPool, glitchColors));
    }, 0);

    const revealDelays = Array.from(text).map((_, index) => index * stagger + Math.random() * stagger * 0.4);
    const totalMs = (revealDelays[revealDelays.length - 1] ?? 0) + safeDuration;

    const tick = (now: number) => {
      if (startRef.current === null) {
        startRef.current = now;
      }

      const elapsed = now - startRef.current;

      if (now - (lastFrameRef.current ?? 0) >= safeGlitchSpeed) {
        lastFrameRef.current = now;

        setCharStates(
          Array.from(text).map((realChar, index) => {
            if (realChar === " ") {
              return { char: " ", color, progress: 1 };
            }

            const localElapsed = elapsed - revealDelays[index];
            const rawProgress = Math.max(0, Math.min(1, localElapsed / safeDuration));
            const easedProgress = smooth ? 1 - Math.pow(1 - rawProgress, 3) : rawProgress;

            if (easedProgress >= 1) {
              return { char: realChar, color, progress: 1 };
            }

            const chaos = 1 - Math.pow(easedProgress, 2);
            const showReal = Math.random() > 0.25 + chaos * 0.75;

            return {
              char: showReal ? realChar : charPool[Math.floor(Math.random() * charPool.length)] ?? realChar,
              color: lerpColor(
                glitchColors[Math.floor(Math.random() * glitchColors.length)] ?? color,
                color,
                easedProgress,
              ),
              progress: easedProgress,
            };
          }),
        );
      }

      if (elapsed < totalMs) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      setCharStates(Array.from(text).map((char) => ({ char, color, progress: 1 })));
      onCompleteRef.current?.();
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      clearTimeout(initialFrame);

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [text, triggerKey, frozen, glitchColors, glitchSpeed, smooth, charPool, duration, stagger, color]);

  const visibleStates = text.length ? charStates : [];

  return (
    <span
      className={cn("inline-flex flex-wrap items-baseline", className)}
      style={{ fontFamily: "inherit", fontSize, fontWeight, ...style }}
      aria-label={text}
      role="text"
    >
      {visibleStates.map((state, index) => (
        <span
          key={index}
          aria-hidden="true"
          style={{
            color: state.color,
            display: "inline-block",
            willChange: "color, transform, opacity",
          }}
        >
          {state.char === " " ? "\u00A0" : state.char}
        </span>
      ))}
    </span>
  );
};
