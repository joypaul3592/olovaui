"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

const DEFAULT_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789";
const DEFAULT_GLITCH_COLORS = ["#8b5cf6", "#3b82f6", "#10b981", "#f43f5e", "#a855f7"];

type RgbColor = {
    r: number;
    g: number;
    b: number;
};

export interface GlitchBlockTab {
    label: string;
    command: string;
}

export interface GlitchBlockProps {
    tabs: GlitchBlockTab[];
    defaultTab?: string;
    glitchColors?: string[];
    glitchSpeed?: number;
    duration?: number;
    stagger?: number;
    smooth?: boolean;
    textColor?: string;
    characters?: string;
    className?: string;
}

interface GlitchTextProps {
    children: string;
    glitchColors: string[];
    glitchSpeed: number;
    smooth: boolean;
    characters: string;
    duration: number;
    stagger: number;
    color: string;
    triggerKey: number;
}

const hexToRgb = (hex: string): RgbColor | null => {
    const expandedHex = hex.replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (_, r: string, g: string, b: string) => r + r + g + g + b + b
    );
    const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(expandedHex);

    if (!match) {
        return null;
    }

    return {
        r: parseInt(match[1], 16),
        g: parseInt(match[2], 16),
        b: parseInt(match[3], 16),
    };
};

const lerpColor = (start: string, end: string, t: number): string => {
    const from = hexToRgb(start);
    const to = hexToRgb(end);

    if (!from || !to) {
        return start;
    }

    return `rgb(${Math.round(from.r + (to.r - from.r) * t)},${Math.round(from.g + (to.g - from.g) * t)},${Math.round(from.b + (to.b - from.b) * t)})`;
};

const GlitchText = ({
    children,
    glitchColors,
    glitchSpeed,
    smooth,
    characters,
    duration,
    stagger,
    color,
    triggerKey,
}: GlitchTextProps) => {
    const text = String(children);
    const charPool = useMemo(() => Array.from(characters), [characters]);

    const rndChar = useCallback(
        () => charPool[Math.floor(Math.random() * charPool.length)] ?? "",
        [charPool]
    );
    const rndColor = useCallback(
        () => glitchColors[Math.floor(Math.random() * glitchColors.length)] ?? color,
        [color, glitchColors]
    );
    const createInitialStates = useCallback(
        () =>
            Array.from(text).map((char) => ({
                char: char === " " ? " " : rndChar(),
                color: rndColor(),
                progress: 0,
            })),
        [rndChar, rndColor, text]
    );

    const [charStates, setCharStates] = useState(createInitialStates);

    const rafRef = useRef<number | null>(null);
    const startRef = useRef<number | null>(null);
    const lastFrameRef = useRef<number | null>(null);

    useEffect(() => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }

        startRef.current = null;
        lastFrameRef.current = null;

        const revealDelays = Array.from(text).map((_, index) => index * stagger + Math.random() * stagger * 0.3);
        const totalMs = (revealDelays[revealDelays.length - 1] ?? 0) + duration;

        const tick = (now: number) => {
            if (!startRef.current) {
                startRef.current = now;
                setCharStates(createInitialStates());
            }

            const elapsed = now - startRef.current;

            if (now - (lastFrameRef.current ?? 0) >= glitchSpeed) {
                lastFrameRef.current = now;

                setCharStates(
                    Array.from(text).map((realChar, index) => {
                        if (realChar === " ") {
                            return { char: " ", color, progress: 1 };
                        }

                        const progress = smooth
                            ? 1 - Math.pow(1 - Math.max(0, Math.min(1, (elapsed - revealDelays[index]) / duration)), 3)
                            : Math.max(0, Math.min(1, (elapsed - revealDelays[index]) / duration));

                        if (progress >= 1) {
                            return { char: realChar, color, progress: 1 };
                        }

                        const chaos = 1 - Math.pow(progress, 2);

                        return {
                            char: Math.random() > 0.25 + chaos * 0.75 ? realChar : rndChar(),
                            color: lerpColor(rndColor(), color, progress),
                            progress,
                        };
                    })
                );
            }

            if (elapsed < totalMs) {
                rafRef.current = requestAnimationFrame(tick);
            } else {
                setCharStates(Array.from(text).map((char) => ({ char, color, progress: 1 })));
            }
        };

        rafRef.current = requestAnimationFrame(tick);

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [color, createInitialStates, duration, glitchColors, glitchSpeed, rndChar, rndColor, smooth, stagger, text, triggerKey]);

    return (
        <span className="inline font-inherit">
            {charStates.map((charState, index) => (
                <span
                    key={`${charState.char}-${index}-${charState.progress}`}
                    style={{ color: charState.color }}
                    className="inline-block whitespace-pre"
                >
                    {charState.char}
                </span>
            ))}
        </span>
    );
};

export function GlitchBlock({
    tabs,
    defaultTab,
    glitchColors = DEFAULT_GLITCH_COLORS,
    glitchSpeed = 30,
    duration = 700,
    stagger = 20,
    smooth = true,
    textColor = "#e2e8f0",
    characters = DEFAULT_CHARACTERS,
    className = "",
}: GlitchBlockProps) {
    const initialTab = useMemo(() => {
        if (defaultTab && tabs.some((tab) => tab.label === defaultTab)) {
            return defaultTab;
        }

        return tabs[0]?.label ?? "";
    }, [defaultTab, tabs]);

    const [active, setActive] = useState(initialTab);
    const [triggerKey, setTriggerKey] = useState(0);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setActive(initialTab);
    }, [initialTab]);

    useEffect(() => {
        setTriggerKey((current) => current + 1);
    }, [active]);

    const activeCommand = tabs.find((tab) => tab.label === active)?.command ?? "";

    const switchTab = (tab: string) => {
        if (tab === active) {
            return;
        }

        setActive(tab);
    };

    const copy = async () => {
        if (!activeCommand || typeof navigator === "undefined" || !navigator.clipboard) {
            return;
        }

        await navigator.clipboard.writeText(activeCommand);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`w-full ${className}`}>
            <div className="relative w-full max-w-2xl group mx-auto">
                <div className="relative bg-[#0f0f13] border border-white/10 rounded-xl overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between bg-white/[0.02] border-b border-white/5 pr-2">
                        <div className="flex-1 flex overflow-x-auto hide-scrollbar pl-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.label}
                                    onClick={() => switchTab(tab.label)}
                                    className={`
                                        relative px-4 py-3 text-sm font-medium transition-colors duration-200 whitespace-nowrap
                                        ${active === tab.label ? "text-violet-400" : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"}
                                    `}
                                >
                                    {tab.label}
                                    {active === tab.label && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-500" />
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="hidden sm:flex items-center px-4 text-slate-500">
                            <Terminal size={16} />
                        </div>
                    </div>

                    <div className="p-6 md:p-8 flex items-center justify-between gap-6 bg-[#0f0f13]">
                        <div className="flex items-center gap-4 font-mono text-sm md:text-base flex-1 overflow-x-auto">
                            <span className="text-violet-500 font-bold select-none opacity-80">$</span>
                            <div className="flex-1 font-medium tracking-wide">
                                <GlitchText
                                    glitchColors={glitchColors}
                                    color={textColor}
                                    duration={duration}
                                    stagger={stagger}
                                    glitchSpeed={glitchSpeed}
                                    smooth={smooth}
                                    triggerKey={triggerKey}
                                    characters={characters}
                                >
                                    {activeCommand}
                                </GlitchText>
                            </div>
                        </div>

                        <div className="relative group/btn flex-shrink-0">
                            <button
                                onClick={copy}
                                className={`
                                    p-2.5 rounded-lg border transition-all duration-200 flex items-center justify-center
                                    ${copied
                                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                        : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white hover:border-white/10"}
                                `}
                                aria-label="Copy to clipboard"
                            >
                                {copied ? <Check size={18} /> : <Copy size={18} />}
                            </button>

                            <div
                                className={`
                                    absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-md text-xs font-medium
                                    bg-slate-800 text-slate-200 border border-white/10 whitespace-nowrap
                                    transition-all duration-200 pointer-events-none
                                    ${copied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}
                                `}
                            >
                                Copied!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GlitchBlock;
