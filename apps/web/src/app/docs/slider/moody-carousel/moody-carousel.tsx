"use client";

import { useEffect, useState, useCallback } from "react";

const SLIDES = [
  { id: 1, url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop", alt: "Abstract fluid waves" },
  { id: 2, url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop", alt: "Dark geometric shapes" },
  { id: 3, url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2694&auto=format&fit=crop", alt: "Silhouetted mountains" },
  { id: 4, url: "https://images.unsplash.com/photo-1505322022379-7c3353ee6291?q=80&w=2600&auto=format&fit=crop", alt: "Night sky with blurred lights" },
  { id: 5, url: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop", alt: "3D render abstract" },
  { id: 6, url: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2574&auto=format&fit=crop", alt: "Abstract dark painting" },
];

export default function MoodyCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goTo = (index: number) => {
    setCurrent(index);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goNext, 4000);
    return () => clearInterval(timer);
  }, [current, isPaused, goNext]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  return (
    <div className="flex items-center justify-center p-4 font-sans sm:p-8">
      <div className="w-full max-w-[900px]">
        <div 
          className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-900 shadow-2xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {SLIDES.map((slide) => (
              <div key={slide.id} className="relative h-full w-full flex-shrink-0">
                <img
                  src={slide.url}
                  alt={slide.alt}
                  className="absolute inset-0 block h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              </div>
            ))}
          </div>

          <div className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[13px] font-medium tracking-[0.03em] text-white/80 backdrop-blur-md">
            {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </div>

          <button 
            className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50" 
            onClick={goPrev} 
            aria-label="Previous"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>

          <button 
            className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50" 
            onClick={goNext} 
            aria-label="Next"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>

          <div className="absolute bottom-5 left-0 right-0 z-10 flex items-center justify-center gap-2">
            {SLIDES.map((_, i) => (
              <button 
                key={i} 
                className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${i === current ? "w-6 bg-white" : "w-2 bg-white/35 hover:bg-white/55"}`} 
                onClick={() => goTo(i)} 
                aria-label={`Slide ${i + 1}`} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
