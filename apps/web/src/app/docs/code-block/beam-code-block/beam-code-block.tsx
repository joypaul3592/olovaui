"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

// Simple utility for merging classes
function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}

export interface BeamCodeBlockTab {
    label: string;
    command: string;
}

interface BeamCodeBlockProps {
    tabs: BeamCodeBlockTab[];
}

export function BeamCodeBlock({ tabs }: BeamCodeBlockProps) {
    const navRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoverX, setHoverX] = useState<number | null>(null);

    // Refs for the "light" positions so we can animate them imperatively
    const spotlightX = useRef(0);
    const ambienceX = useRef(0);

    useEffect(() => {
        if (!navRef.current) return;
        const nav = navRef.current;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = nav.getBoundingClientRect();
            const x = e.clientX - rect.left;
            setHoverX(x);
            // Direct update for immediate feedback (feels snappier)
            spotlightX.current = x;
            nav.style.setProperty("--spotlight-x", `${x}px`);
        };

        const handleMouseLeave = () => {
            setHoverX(null);
            // When mouse leaves, spring the spotlight back to the active item
            const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`) as HTMLElement | null;
            if (activeItem) {
                const navRect = nav.getBoundingClientRect();
                const itemRect = activeItem.getBoundingClientRect();
                const targetX = itemRect.left - navRect.left + itemRect.width / 2;

                animate(spotlightX.current, targetX, {
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    onUpdate: (v) => {
                        spotlightX.current = v;
                        nav.style.setProperty("--spotlight-x", `${v}px`);
                    },
                });
            }
        };

        nav.addEventListener("mousemove", handleMouseMove);
        nav.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            nav.removeEventListener("mousemove", handleMouseMove);
            nav.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [activeIndex]);

    // Handle the "Ambience" (Active Item) Movement
    useEffect(() => {
        if (!navRef.current) return;
        const nav = navRef.current;
        const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`) as HTMLElement | null;

        if (activeItem) {
            const navRect = nav.getBoundingClientRect();
            const itemRect = activeItem.getBoundingClientRect();
            const targetX = itemRect.left - navRect.left + itemRect.width / 2;

            animate(ambienceX.current, targetX, {
                type: "spring",
                stiffness: 200,
                damping: 20,
                onUpdate: (v) => {
                    ambienceX.current = v;
                    nav.style.setProperty("--ambience-x", `${v}px`);
                },
            });
        }
    }, [activeIndex]);

    // Helper to format the command so the first part is purple and the rest is white
    const renderCommand = (command: string) => {
        const parts = command.split(" ");
        const mainCommand = parts.slice(0, 2).join(" ");
        const restCommand = parts.slice(2).join(" ");

        return (
            <>
                <span className="text-[#7c3aed] dark:text-[#c095ff]">{mainCommand}</span>{" "}
                <span className="text-zinc-700 dark:text-[#e2e8f0]">{restCommand}</span>
            </>
        );
    };

    return (
        <div className="w-full max-w-2xl bg-white dark:bg-[#121214] border border-zinc-200 dark:border-[#27272a] rounded-xl overflow-hidden shadow-2xl">
            {/* Navigation Tabs Header */}
            <nav
                ref={navRef}
                className="relative flex items-center h-14 overflow-hidden"
            >
                <ul className="relative flex items-center h-full px-4 z-[10] gap-1">
                    {tabs.map((item, idx) => (
                        <li key={idx} className="h-full flex items-center justify-center">
                            <button
                                data-index={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={cn(
                                    "px-4 py-2 text-[14px] font-medium transition-colors duration-200 rounded-md",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400",
                                    activeIndex === idx
                                        ? "text-zinc-900 dark:text-white"
                                        : "text-zinc-400 hover:text-zinc-600 dark:text-[#888888] dark:hover:text-[#cccccc]"
                                )}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* 1. The Moving Spotlight (Follows Mouse) */}
                <div
                    className="pointer-events-none absolute bottom-0 left-0 w-full h-full z-[1] transition-opacity duration-300"
                    style={{
                        opacity: hoverX !== null ? 1 : 0,
                        background: `
                radial-gradient(
                  100px circle at var(--spotlight-x) 100%, 
                  rgba(255,255,255,0.06) 0%, 
                  transparent 100%
                )
              `,
                    }}
                />

                {/* 2. The Active State Ambience (Underline) */}
                <div
                    className="pointer-events-none absolute bottom-0 left-0 w-full h-[2px] z-[2]"
                    style={{
                        background: `
                radial-gradient(
                  45px circle at var(--ambience-x) 0%, 
                  #b48ced 0%, 
                  transparent 100%
                )
              `,
                    }}
                />

                {/* 3. Bottom Border Track (Subtle divider) */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-200 dark:bg-[#27272a] z-0" />
            </nav>

            {/* Terminal Content Area */}
            <div className="relative p-6 pt-5 bg-white dark:bg-[#121214]">
                {/* Bash Label */}
                <div className="absolute top-3 right-5 text-[11px] font-mono text-zinc-400 dark:text-[#666]">
                    bash
                </div>

                {/* Code Execution Text */}
                <div className="font-mono text-[14px] leading-relaxed tracking-wide pt-2">
                    <span className="text-[#7c3aed] dark:text-[#b48ced] font-semibold mr-3">$</span>
                    {renderCommand(tabs[activeIndex].command)}
                </div>
            </div>
        </div>
    );
}