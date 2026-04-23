"use client"
import React, { useState, useRef } from 'react';

interface Memory {
    id: number;
    year: string;
    title: string;
    image: string;
}

interface DragState {
    x: number;
    startX: number;
    isDragging: boolean;
}

interface TiltState {
    x: number;
    y: number;
}

interface FanLayer {
    rotate: number;
    zIndex: number;
}

const MEMORIES: Memory[] = [
    {
        id: 1,
        year: "2016",
        title: "Neon Nights",
        image: "https://i.pinimg.com/736x/3d/a5/9d/3da59df8a0b184b8aaf779e49d25288f.jpg"
    },
    {
        id: 2,
        year: "2017",
        title: "Tokyo Dreams",
        image: "https://i.pinimg.com/1200x/d7/99/79/d7997903507dc5099c9d331b95b9fcfd.jpg"
    },
    {
        id: 3,
        year: "2018",
        title: "Cyber City",
        image: "https://i.pinimg.com/736x/03/64/e4/0364e4e6568ddcda660a61dced339efc.jpg"
    },
    {
        id: 4,
        year: "2019",
        title: "Digital Soul",
        image: "https://i.pinimg.com/1200x/30/cf/5a/30cf5ad34983c01dc32f21fdf782312f.jpg"
    },
    {
        id: 5,
        year: "2020",
        title: "Future Pop",
        image: "https://i.pinimg.com/1200x/30/e7/5c/30e75ca758d2e8e703aa9cb1ae47bafe.jpg"
    }
];


const FAN_LAYERS: FanLayer[] = [
    { rotate: 10, zIndex: 10 },
    { rotate: 25, zIndex: 9 },
    { rotate: 40, zIndex: 8 },
    { rotate: 60, zIndex: 7 },
    { rotate: -10, zIndex: 10 },
    { rotate: -25, zIndex: 9 },
    { rotate: -40, zIndex: 8 },
    { rotate: -60, zIndex: 7 },
];

export default function MemoriesCard() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [drag, setDrag] = useState<DragState>({ x: 0, startX: 0, isDragging: false });
    const [tilt, setTilt] = useState<TiltState>({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [animatingOut, setAnimatingOut] = useState<'left' | 'right' | null>(null);

    const cardRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const currentItem = MEMORIES[currentIndex % MEMORIES.length];
    const nextItem = MEMORIES[(currentIndex + 1) % MEMORIES.length];

    const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (drag.isDragging || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        setTilt({ x: rotateX, y: rotateY });
    };

    const handleContainerMouseLeave = () => {
        if (!drag.isDragging) {
            setTilt({ x: 0, y: 0 });
            setIsHovering(false);
        }
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (animatingOut) return;
        setDrag({
            x: 0,
            startX: e.clientX,
            isDragging: true
        });
        setTilt({ x: 0, y: 0 });
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!drag.isDragging) return;

        const clientX = e.clientX;
        const currentX = clientX - drag.startX;

        setDrag(prev => ({ ...prev, x: currentX }));
    };

    const handlePointerUp = () => {
        if (!drag.isDragging) return;

        const threshold = 150;
        const velocity = drag.x;

        if (Math.abs(velocity) > threshold) {
            const direction = velocity > 0 ? 'right' : 'left';
            finishSwipe(direction);
        } else {
            setDrag(prev => ({ ...prev, x: 0, isDragging: false }));
        }
    };

    const finishSwipe = (direction: 'left' | 'right') => {
        setAnimatingOut(direction);
        setDrag(prev => ({ ...prev, isDragging: false }));

        setTimeout(() => {
            setCurrentIndex(prev => prev + 1);
            setDrag({ x: 0, startX: 0, isDragging: false });
            setAnimatingOut(null);
            setTilt({ x: 0, y: 0 });
        }, 400);
    };

    const getCardStyle = (): React.CSSProperties => {
        if (animatingOut) {
            const translateX = animatingOut === 'right' ? 500 : -500;
            const rotate = animatingOut === 'right' ? 45 : -45;
            return {
                transform: `translate(${translateX}px, 0px) rotate(${rotate}deg)`,
                transition: 'transform 0.4s ease-in, opacity 0.4s ease-in',
                opacity: 0,
                cursor: 'grabbing'
            };
        }

        if (drag.isDragging) {
            const rotate = drag.x * 0.05;
            return {
                transform: `translate(${drag.x}px, 0px) rotate(${rotate}deg)`,
                transition: 'none',
                cursor: 'grabbing',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            };
        }

        return {
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovering ? 1.05 : 1})`,
            transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
            cursor: 'grab',
            boxShadow: isHovering
                ? '0 20px 40px -12px rgba(0,0,0,0.7)'
                : '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
        };
    };

    const getFanStyle = (layer: FanLayer): React.CSSProperties => {
        const spreadMultiplier = isHovering || drag.isDragging ? 1.2 : 1;
        const currentRotation = layer.rotate * spreadMultiplier;

        return {
            transform: `rotate(${currentRotation}deg) scale(${isHovering ? 1.05 : 1})`,
            zIndex: layer.zIndex,
            transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        };
    };

    return (
        <div className="w-full flex items-center justify-center overflow-hidden py-16">
            <div
                ref={containerRef}
                onMouseMove={handleContainerMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={handleContainerMouseLeave}
                className="relative w-48 h-60 sm:w-56 sm:h-72 flex-shrink-0 perspective-1000 z-10 select-none"
            >
                <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
                    {FAN_LAYERS.map((layer, index) => (
                        <div
                            key={index}
                            className="absolute w-full h-full rounded-2xl overflow-hidden shadow-lg border border-white/5"
                            style={{
                                ...getFanStyle(layer),
                                backgroundImage: `url(${nextItem.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                    ))}
                </div>
                <div
                    ref={cardRef}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                    style={getCardStyle()}
                    className="absolute inset-0 z-50 w-full h-full rounded-2xl overflow-hidden touch-none will-change-transform"
                >
                    <div className="absolute inset-0 border-[1px] border-white/20 rounded-2xl z-20 pointer-events-none" />

                    <img
                        src={currentItem.image}
                        alt={currentItem.title}
                        className="w-full h-full object-cover pointer-events-none select-none"
                        draggable={false}
                    />
                </div>
            </div>
        </div>
    );
};
