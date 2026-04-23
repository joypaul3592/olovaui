"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useAnimationFrame, PanInfo } from "framer-motion";

export interface RotatingCard {
  id: number | string;
  content?: React.ReactNode;
  background?: string;
  img?: string;
}

export interface RotatingCardsProps {
  cards?: RotatingCard[];
  radius?: number;
  duration?: number;
  cardWidth?: number;
  cardHeight?: number;
  pauseOnHover?: boolean;
  reverse?: boolean;
  draggable?: boolean;
  autoPlay?: boolean;
  onCardClick?: (card: RotatingCard, index: number) => void;
  mouseWheel?: boolean;
  className?: string;
  cardClassName?: string;
  initialRotation?: number;
  centerClassName?: string;
}

export function RotatingCards({
  cards = [],
  radius = 360,
  duration = 20,
  cardWidth = 160,
  cardHeight = 190,
  pauseOnHover = true,
  reverse = false,
  draggable = false,
  autoPlay = true,
  onCardClick = undefined,
  mouseWheel = false,
  className = "",
  cardClassName = "",
  initialRotation = 0,
  centerClassName = "top-1/2 left-1/2",
}: RotatingCardsProps) {
  const rotation = useMotionValue(initialRotation);
  const currentVelocity = useRef(0);
  const isHovered = useRef(false);
  const isDragging = useRef(false);
  const wasDragged = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    const safeDelta = Math.min(delta, 50);
    const timeScale = safeDelta / 1000;

    if (isDragging.current) return;

    let targetVelocity = 0;
    if (autoPlay && (!pauseOnHover || !isHovered.current)) {
      targetVelocity = (360 / duration) * (reverse ? -1 : 1);
    }

    const lerpFactor = 3 * timeScale;
    currentVelocity.current +=
      (targetVelocity - currentVelocity.current) * lerpFactor;

    rotation.set(rotation.get() + currentVelocity.current * timeScale);
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !mouseWheel) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      currentVelocity.current -= e.deltaY * 0.5;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [mouseWheel]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ touchAction: draggable ? "none" : "auto" }}
      onHoverStart={() => (isHovered.current = true)}
      onHoverEnd={() => {
        isHovered.current = false;
        isDragging.current = false;
      }}
      onPanStart={() => {
        wasDragged.current = false;
      }}
      onPan={(_, info: PanInfo) => {
        if (!draggable) return;
        isDragging.current = true;
        if (Math.abs(info.offset.x) > 5) wasDragged.current = true;

        const angleChange = (info.delta.x / radius) * (180 / Math.PI);
        rotation.set(rotation.get() + angleChange);
      }}
      onPanEnd={(_, info: PanInfo) => {
        if (!draggable) return;
        isDragging.current = false;

        const angularVelocity = (info.velocity.x / radius) * (180 / Math.PI);
        currentVelocity.current = angularVelocity;

        setTimeout(() => (wasDragged.current = false), 50);
      }}
    >
      <div className={`absolute w-0 h-0 z-10 ${centerClassName}`}>
        <motion.div style={{ rotate: rotation }}>
          {cards.map((card, index) => {
            const angle = (360 / cards.length) * index;
            return (
              <div
                key={card.id}
                className="absolute group cursor-pointer"
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  left: -cardWidth / 2,
                  top: -cardHeight / 2,
                  transform: `rotate(${angle}deg) translateY(${-radius}px)`,
                }}
                onClick={() => {
                  if (wasDragged.current) return;
                  onCardClick && onCardClick(card, index);
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: 100, rotateZ: -15 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotateZ: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.04,
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }}
                  className="w-full h-full"
                >
                  <div
                    className={`w-full h-full rounded-2xl overflow-hidden relative bg-[#1a1a1a] border border-white/5 
                               transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] 
                               shadow-[0_15px_35px_rgba(0,0,0,0.6)] 
                               group-hover:[transform:scale(1.15)_translateY(-15px)_rotateX(5deg)] 
                               group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.9)] group-hover:border-white/20
                               ${cardClassName}`}
                    style={{ background: card.background }}
                  >
                    {card.img && (
                      <img
                        alt={`Card ${card.id}`}
                        src={card.img}
                        draggable={false}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 grayscale-[40%] group-hover:grayscale-0 brightness-[0.7] group-hover:brightness-110"
                      />
                    )}
                    {card.content && (
                      <div className="absolute inset-0 flex items-center justify-center text-5xl font-black text-white/90 drop-shadow-[0_10px_40px_rgba(0,0,0,0.95)] z-10 pointer-events-none transition-all duration-400 ease-out group-hover:opacity-0 group-hover:scale-75">
                        {card.content}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}
