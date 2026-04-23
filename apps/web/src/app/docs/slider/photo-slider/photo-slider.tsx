"use client"

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface PhotoCard {
    id: number;
    title: string;
    image: string;
    link: string;
}

const photoCardsData: PhotoCard[] = [
    {
        id: 1,
        title: "Engineering",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
        link: "#",
    },
    {
        id: 2,
        title: "Productivity",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
        link: "#",
    },
    {
        id: 3,
        title: "Tips & Tricks",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
        link: "#",
    },
    {
        id: 4,
        title: "UI Development",
        image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop",
        link: "#",
    },
    {
        id: 5,
        title: "Announcements",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
        link: "#",
    }
];

export function PhotoSlider() {
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
        }
    }, []);

    return (
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 overflow-hidden bg-black text-white">
            <motion.div
                ref={containerRef}
                className="cursor-grab active:cursor-grabbing"
            >
                <motion.div
                    className="flex gap-6"
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    dragElastic={0.2}
                    dragTransition={{
                        power: 0.3,
                        timeConstant: 200,
                        bounceStiffness: 400,
                        bounceDamping: 25
                    }}
                    whileTap={{ cursor: "grabbing" }}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {photoCardsData.map((card) => (
                        <Card
                            key={card.id}
                            card={card}
                            hoveredId={hoveredId}
                            setHoveredId={setHoveredId}
                        />
                    ))}
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-12 text-center"
            >
                <p className="text-neutral-500 mb-4 text-xs tracking-wide uppercase font-medium">
                    View full gallery
                </p>
                <a
                    href="#"
                    className="inline-flex items-center gap-2 text-white font-medium text-lg hover:text-neutral-300 transition-colors group"
                >
                    <span className="bg-white text-black p-1.5 rounded-full group-hover:bg-neutral-200 transition-colors">
                        <ArrowRight size={14} className="ml-0.5" />
                    </span>
                    Gallery <ArrowRight size={18} className="text-neutral-500 group-hover:text-white transition-colors" />
                </a>
            </motion.div>
        </div>
    );
}

function Card({
    card,
    hoveredId,
    setHoveredId
}: {
    card: PhotoCard,
    hoveredId: number | null,
    setHoveredId: (id: number | null) => void
}) {
    const isHovered = hoveredId === card.id;
    const isBlurring = hoveredId !== null && hoveredId !== card.id;

    return (
        <motion.div
            className={`relative group transition-all duration-500 w-[280px] sm:w-[320px] shrink-0 will-change-transform transform-gpu
        ${isBlurring ? 'blur-[2px] opacity-40 scale-[0.98] grayscale' : 'opacity-100 scale-100 grayscale-0'}
        ${isHovered ? 'z-10' : 'z-0'}
      `}
            onMouseEnter={() => setHoveredId(card.id)}
            onMouseLeave={() => setHoveredId(null)}
        >
            <div className="relative aspect-video w-full rounded-none overflow-hidden bg-neutral-900 border border-neutral-800 transition-colors">
                {/* Image */}
                <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 saturate-0 group-hover:saturate-100"
                    draggable={false}
                    unoptimized={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
            </div>
            <div className="mt-4 space-y-2">
                <h3 className="text-white text-sm font-medium leading-relaxed group-hover:text-neutral-300 transition-colors">
                    {card.title}
                </h3>
            </div>
        </motion.div>
    );
}
