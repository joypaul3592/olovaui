"use client"

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useTransform, animate, PanInfo } from 'framer-motion';
import Image from 'next/image';

interface ImageCard {
    id: number;
    src: string;
    alt: string;
    description: string;
}

const originalItems: ImageCard[] = [
    { id: 1, src: "https://i.pinimg.com/736x/65/48/d6/6548d69c619e736c05cb97704017dad5.jpg", alt: "Raycast Focus", description: "Mastering focus" },
    { id: 2, src: "https://i.pinimg.com/1200x/05/54/58/0554581a2474cb57f878735fe721045b.jpg", alt: "Quicklinks", description: "Shortcuts mastery" },
    { id: 3, src: "https://i.pinimg.com/736x/fe/40/f8/fe40f891f7a36f1f0c3c469d53430306.jpg", alt: "Raycast Notes", description: "Finally out" },
    { id: 4, src: "https://i.pinimg.com/1200x/4e/39/dd/4e39dd4fcef1826b3b51542109046a08.jpg", alt: "Window Mgmt", description: "Sequoia comparison" },
    { id: 5, src: "https://i.pinimg.com/1200x/af/ef/f2/afeff243f75d834cadea4174dd1f161a.jpg", alt: "Extensions", description: "Store update" },
    { id: 6, src: "https://i.pinimg.com/736x/94/1b/9d/941b9ddf10b97eeaf328d8b6e110ab0e.jpg", alt: "Themes", description: "Dark mode pro" }
];

const CARD_WIDTH = 400;
const GAP = 24;
const ONE_ITEM_WIDTH = CARD_WIDTH + GAP;

const items = [...originalItems, ...originalItems, ...originalItems];

export function FocusCards() {
    const containerRef = useRef<HTMLDivElement>(null);
    const SET_WIDTH = originalItems.length * ONE_ITEM_WIDTH;
    const START_X = -SET_WIDTH;
    const x = useMotionValue(START_X);
    const [currentIndex, setCurrentIndex] = useState(0);

    useMotionValueEvent(x, "change", (latest) => {
        if (latest <= -(SET_WIDTH * 2)) {
            x.set(latest + SET_WIDTH);
        } else if (latest >= 0) {
            x.set(latest - SET_WIDTH);
        }
    });

    useMotionValueEvent(x, "change", (latest) => {
        const relativeX = Math.abs(latest % SET_WIDTH);
        const index = Math.round(relativeX / ONE_ITEM_WIDTH) % originalItems.length;
        if (index !== currentIndex) {
            setCurrentIndex(index);
        }
    });

    const handleDragEnd = (e: any, info: PanInfo) => {
        const velocity = info.velocity.x;
        const currentX = x.get();
        let targetIndex = Math.round(currentX / ONE_ITEM_WIDTH);

        if (Math.abs(velocity) > 400) {
            const direction = velocity < 0 ? -1 : 1;
            const rawIndex = currentX / ONE_ITEM_WIDTH;
            if (direction === -1 && targetIndex > rawIndex) {
                targetIndex -= 1;
            } else if (direction === 1 && targetIndex < rawIndex) {
                targetIndex += 1;
            }
        }

        const targetX = targetIndex * ONE_ITEM_WIDTH;
        animate(x, targetX, { type: "spring", stiffness: 300, damping: 30 });
    };

    const scrollNext = useCallback(() => {
        const current = x.get();
        const target = Math.round(current / ONE_ITEM_WIDTH) * ONE_ITEM_WIDTH - ONE_ITEM_WIDTH;
        animate(x, target, { type: "spring", stiffness: 300, damping: 30 });
    }, [x]);

    const scrollPrev = useCallback(() => {
        const current = x.get();
        const target = Math.round(current / ONE_ITEM_WIDTH) * ONE_ITEM_WIDTH + ONE_ITEM_WIDTH;
        animate(x, target, { type: "spring", stiffness: 300, damping: 30 });
    }, [x]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") scrollNext();
            if (e.key === "ArrowLeft") scrollPrev();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [scrollNext, scrollPrev]);

    return (
        <div className="w-full bg-[#050505] py-24 flex flex-col items-center justify-center font-sans overflow-hidden min-h-[600px]">
            <div className="w-full max-w-[1400px] flex flex-col gap-16 relative z-10">

                <div className="flex flex-col items-center justify-center space-y-2">
                    <h2 className="text-3xl font-bold text-white tracking-tight">Recent Updates</h2>
                    <p className="text-zinc-500 font-medium">Swipe to explore the latest features</p>
                </div>

                <div
                    ref={containerRef}
                    className="relative w-full h-[350px] flex items-center overflow-hidden"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
                    }}
                >
                    <motion.div
                        className="flex absolute left-1/2"
                        style={{ x }}
                        drag="x"
                        dragConstraints={{ left: -100000, right: 100000 }}
                        onDragEnd={handleDragEnd}
                        whileTap={{ cursor: "grabbing" }}
                    >
                        {items.map((item, index) => (
                            <LandscapeCard
                                key={`${item.id}-${index}`}
                                item={item}
                                index={index}
                                x={x}
                            />
                        ))}
                    </motion.div>
                </div>

                <div className="flex justify-center gap-2">
                    {originalItems.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                            }}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-white' : 'w-1.5 bg-zinc-800'
                                }`}
                        />
                    ))}
                </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-red-900/20 blur-[120px] rounded-full -z-10 pointer-events-none" />
        </div>
    );
}

function LandscapeCard({ item, index, x }: { item: ImageCard, index: number, x: any }) {
    const range = [
        (index - 1) * -ONE_ITEM_WIDTH,
        index * -ONE_ITEM_WIDTH,
        (index + 1) * -ONE_ITEM_WIDTH
    ];

    const scale = useTransform(x, range, [0.9, 1, 0.9]);
    const opacity = useTransform(x, range, [0.5, 1, 0.5]);

    return (
        <motion.div
            style={{
                width: CARD_WIDTH,
                scale,
                opacity,
                marginRight: GAP
            }}
            className="group relative flex flex-col items-center"
        >
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl group-hover:border-zinc-700 transition-colors duration-300 cursor-grab active:cursor-grabbing">
                <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
            </div>
            <div className="mt-4 text-center space-y-1 transition-opacity duration-300">
                <h3 className="text-white font-semibold text-lg leading-tight tracking-tight">{item.alt}</h3>
                <p className="text-zinc-500 text-sm font-medium">{item.description}</p>
            </div>
        </motion.div>
    );
}
