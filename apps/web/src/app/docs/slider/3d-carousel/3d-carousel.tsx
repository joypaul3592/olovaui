"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface Carousel3DCard {
  id: string | number;
  imageUrl: string;
  glowColor?: string;
  title?: string;
  description?: string;
}

export interface Carousel3DProps {
  /** Array of card data objects */
  cards: Carousel3DCard[];
  /** Whether the carousel should cycle automatically */
  autoPlay?: boolean;
  /** Delay between transitions in ms (default: 2500) */
  autoPlayInterval?: number;
  /** Height of the component container (default: 600) */
  containerHeight?: number | string;
  /** Width of an individual card (default: 320) */
  cardWidth?: number;
  /** Height of an individual card (default: 420) */
  cardHeight?: number;
  /** Toggle the ambient background glow (default: true) */
  showGlow?: boolean;
  /** Toggle the grainy noise overlay (default: true) */
  showNoise?: boolean;
  /** Custom class for the main container */
  className?: string;
  /** Configuration for the fanned layout offsets */
  fanConfig?: {
    x?: number;
    y?: number;
    rotate?: number;
  };
}

const NoiseOverlay = ({ opacity = 0.15 }: { opacity?: number }) => (
  <div
    className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay"
    style={{
      opacity,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

export function Carousel3D({
  cards = [],
  autoPlay = true,
  autoPlayInterval = 2500,
  containerHeight = 600,
  cardWidth = 320,
  cardHeight = 420,
  showGlow = true,
  showNoise = true,
  className = "",
  fanConfig,
}: Carousel3DProps) {
  const [position, setPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const offsetConfig = useMemo(() => {
    const isMobile = windowWidth < 768;
    return {
      x: fanConfig?.x ?? (isMobile ? 90 : 160),
      y: fanConfig?.y ?? (isMobile ? 15 : 24),
      rotate: fanConfig?.rotate ?? (isMobile ? 4 : 6),
    };
  }, [windowWidth, fanConfig]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setPosition((p) => p + 1);
      if (e.key === "ArrowLeft") setPosition((p) => p - 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!autoPlay || isPaused || cards.length === 0) return;

    const interval = setInterval(() => {
      setPosition((p) => p + 1);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, isPaused, autoPlayInterval, cards.length]);

  const activeCardIndex = useMemo(() => {
    if (cards.length === 0) return 0;
    return ((position % cards.length) + cards.length) % cards.length;
  }, [position, cards.length]);

  const activeGlow = cards[activeCardIndex]?.glowColor || "rgba(255, 255, 255, 0.05)";

  const visibleCards = useMemo(() => {
    if (cards.length === 0) return [];
    const result = [];
    // We show a window of 9 cards to ensure smooth infinite scrolling visuals
    for (let i = -4; i <= 4; i++) {
      const infiniteIndex = position + i;
      const cardIndex = ((infiniteIndex % cards.length) + cards.length) % cards.length;
      result.push({
        card: cards[cardIndex],
        infiniteIndex,
        slot: i,
      });
    }
    return result;
  }, [position, cards]);

  const handleDragEnd = useCallback(
    (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
      setIsPaused(false);
      const swipePower = Math.abs(info.offset.x) * info.velocity.x;
      if (info.offset.x > 80 || swipePower > 1000) {
        setPosition((p) => p - 1);
      } else if (info.offset.x < -80 || swipePower < -1000) {
        setPosition((p) => p + 1);
      }
    },
    []
  );

  if (cards.length === 0) {
    return (
      <div 
        className={`flex items-center justify-center bg-neutral-900 text-neutral-500 rounded-xl ${className}`}
        style={{ height: containerHeight }}
      >
        No cards provided
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden flex flex-col items-center justify-center font-sans selection:bg-white/20 ${className}`}
      style={{ height: containerHeight }}
    >
      {/* Dynamic Ambient Background Glow */}
      {showGlow && (
        <motion.div
          animate={{
            background: `radial-gradient(circle at 50% 50%, ${activeGlow} 0%, transparent 65%)`,
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 opacity-40 pointer-events-none"
        />
      )}

      {/* Global Background Noise */}
      {showNoise && <NoiseOverlay opacity={0.05} />}

      {/* Main Carousel Stage */}
      <div
        className="relative w-full max-w-6xl h-full flex items-center justify-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Invisible drag overlay */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragStart={() => setIsPaused(true)}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing"
        />

        {/* Render Cards */}
        <AnimatePresence mode="popLayout">
          {visibleCards.map(({ card, infiniteIndex, slot }) => {
            const isCenter = slot === 0;
            const absDist = Math.abs(slot);

            return (
              <motion.div
                key={infiniteIndex}
                onClick={() => !isCenter && setPosition((prev) => prev + slot)}
                animate={{
                  x: slot * offsetConfig.x,
                  y: absDist * offsetConfig.y,
                  rotate: slot * offsetConfig.rotate,
                  scale: isCenter ? 1 : 1 - absDist * 0.08,
                  opacity: absDist >= 4 ? 0 : 1 - absDist * 0.15,
                  zIndex: isCenter ? 30 : 20 - absDist,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  mass: 1,
                }}
                className="absolute rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/10 cursor-pointer bg-cover bg-center origin-bottom"
                style={{
                  width: windowWidth < 768 ? cardWidth * 0.7 : cardWidth,
                  height: windowWidth < 768 ? cardHeight * 0.7 : cardHeight,
                  backgroundImage: `url(${card.imageUrl})`,
                }}
              >
                {/* Visual Enhancements */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-white/5 pointer-events-none" />
                {showNoise && <NoiseOverlay opacity={0.2} />}
                <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none" />

                {/* Optional Title/Desc Overlay */}
                {(card.title || card.description) && isCenter && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent text-white"
                  >
                    {card.title && <h4 className="text-lg font-bold">{card.title}</h4>}
                    {card.description && <p className="text-sm text-neutral-300 line-clamp-2">{card.description}</p>}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
