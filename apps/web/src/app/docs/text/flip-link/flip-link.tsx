"use client";

import { motion } from "framer-motion";

export interface FlipLinkProps {
  children: string;
  href?: string;
  hoverColor?: string;
  fontSize?: string;
  className?: string;
  duration?: number;
  stagger?: number;
}

export const FlipLink = ({
  children,
  href = "#",
  hoverColor = "hover:text-emerald-400",
  fontSize = "text-5xl sm:text-7xl md:text-8xl lg:text-9xl",
  className = "",
  duration = 0.25,
  stagger = 0.025,
}: FlipLinkProps) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      className={`relative block overflow-hidden whitespace-nowrap font-black uppercase tracking-tighter transition-colors duration-300 ${fontSize} ${hoverColor} ${className}`}
      style={{
        lineHeight: 0.85,
      }}
    >
      <div className="flex">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
                filter: "blur(0px)",
                opacity: 1,
              },
              hovered: {
                y: "-100%",
                filter: "blur(8px)",
                opacity: 0,
              },
            }}
            transition={{
              duration: duration,
              ease: "easeInOut",
              delay: stagger * i,
            }}
            className="inline-block origin-bottom"
            key={i}
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0 flex">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
                filter: "blur(8px)",
                opacity: 0,
              },
              hovered: {
                y: 0,
                filter: "blur(0px)",
                opacity: 1,
              },
            }}
            transition={{
              duration: duration,
              ease: "easeInOut",
              delay: stagger * i,
            }}
            className="inline-block origin-top"
            key={i}
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};
