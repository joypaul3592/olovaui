"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export interface VideoAccordionCard {
  id: number | string;
  title: string;
  video: string;
  desc: string;
}

export interface VideoAccordionProps {
  cards?: VideoAccordionCard[];
  pexelsApiKey?: string;
  query?: string;
  perPage?: number;
  loadingText?: string;
  className?: string;
  onActiveChange?: (cardId: VideoAccordionCard["id"] | null) => void;
}

const DEFAULT_CARDS: VideoAccordionCard[] = [
  {
    id: 1,
    title: "Nature & Wildlife",
    video:
      "https://res.cloudinary.com/demo/video/upload/w_1200,q_auto/v1/elephants.mp4",
    desc: "Transform your audio tracks into compelling visual stories automatically.",
  },
  {
    id: 2,
    title: "Animal Companions",
    video:
      "https://videos.pexels.com/video-files/7592608/7592608-uhd_1440_2496_30fps.mp4",
    desc: "Create impactful short-form content perfect for social media campaigns.",
  },
  {
    id: 3,
    title: "Beautiful Child",
    video:
      "https://videos.pexels.com/video-files/4811865/4811865-hd_1920_1080_30fps.mp4",
    desc: "Capture the pure joy and innocence of childhood moments in stunning clarity and smooth motion.",
  },
  {
    id: 4,
    title: "Blooming Flower",
    video:
      "https://videos.pexels.com/video-files/856030/856030-hd_1920_1080_25fps.mp4",
    desc: "Experience the vibrant colors and delicate details of nature's most beautiful blooming flowers.",
  },
];

type PexelsVideoFile = {
  link: string;
  quality: string;
};

type PexelsVideoItem = {
  id: number;
  user?: {
    name?: string;
  };
  video_files: PexelsVideoFile[];
};

type PexelsResponse = {
  videos?: PexelsVideoItem[];
};

export function VideoAccordion({
  cards = DEFAULT_CARDS,
  pexelsApiKey,
  query = "nature",
  perPage = 10,
  loadingText = "Loading stunning videos...",
  className = "",
  onActiveChange,
}: VideoAccordionProps) {
  const [activeId, setActiveId] = useState<VideoAccordionCard["id"] | null>(null);
  const [resolvedCards, setResolvedCards] = useState<VideoAccordionCard[]>(cards);
  const [isLoading, setIsLoading] = useState(Boolean(pexelsApiKey));

  useEffect(() => {
    setResolvedCards(cards);
    if (!pexelsApiKey) {
      setIsLoading(false);
    }
  }, [cards, pexelsApiKey]);

  useEffect(() => {
    onActiveChange?.(activeId);
  }, [activeId, onActiveChange]);

  useEffect(() => {
    let isCancelled = false;

    async function fetchPexelsVideos() {
      if (!pexelsApiKey) {
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch(
          `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=${perPage}`,
          {
            headers: {
              Authorization: pexelsApiKey,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Pexels request failed with status ${response.status}`);
        }

        const data = (await response.json()) as PexelsResponse;

        if (isCancelled || !data.videos?.length) {
          return;
        }

        const dynamicCards: VideoAccordionCard[] = data.videos.map((video, index) => {
          const videoFile =
            video.video_files.find((file) => file.quality === "hd") ||
            video.video_files[0];

          return {
            id: video.id,
            title: `Nature View ${index + 1}`,
            video: videoFile.link,
            desc: `Stunning nature footage captured by ${video.user?.name || "the Pexels community"}.`,
          };
        });

        setResolvedCards(dynamicCards);
      } catch (error) {
        console.error("Failed to fetch from Pexels:", error);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchPexelsVideos();

    return () => {
      isCancelled = true;
    };
  }, [perPage, pexelsApiKey, query]);

  return (
    <div className={`w-full overflow-hidden bg-white p-4 dark:bg-black md:p-6 ${className}`}>
      {isLoading ? (
        <div className="flex h-[85vh] items-center justify-center text-black/50 dark:text-white/50 lg:h-[670px]">
          {loadingText}
        </div>
      ) : (
        <div
          className="flex h-[85vh] flex-col items-stretch justify-center gap-2 md:gap-3 lg:h-[670px] lg:flex-row"
          onMouseLeave={() => setActiveId(null)}
        >
          {resolvedCards.map((card, index) => {
            const isActive = activeId === card.id;
            const isHoveringAny = activeId !== null;
            const isClear = isHoveringAny ? isActive : index === 0;

            return (
              <motion.div
                key={card.id}
                onMouseEnter={() => setActiveId(card.id)}
                onClick={() => setActiveId(card.id)}
                initial={false}
                animate={{
                  flex: !isHoveringAny ? 1 : isActive ? (resolvedCards.length > 5 ? 8 : 5) : 1,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative min-h-[50px] w-full shrink-0 cursor-pointer overflow-hidden rounded-[14px] bg-zinc-100 dark:bg-[#111] lg:min-h-full lg:w-auto"
              >
                <motion.video
                  src={card.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                  animate={{
                    scale: isClear ? 1 : 1.15,
                    filter: isClear ? "blur(0px)" : "blur(12px)",
                    opacity: isClear ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute inset-0">
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isActive ? 0 : 1,
                      y: isActive ? 10 : 0,
                      filter: isActive ? "blur(4px)" : "blur(0px)",
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-end md:bottom-8 md:left-8 md:right-8"
                  >
                    <h2
                      className="text-[16px] font-normal leading-[1.2] text-white md:text-[20px] lg:text-[24px]"
                      style={{
                        writingMode:
                          resolvedCards.length > 5 && !isHoveringAny
                            ? "vertical-rl"
                            : "horizontal-tb",
                        transform:
                          resolvedCards.length > 5 && !isHoveringAny
                            ? "rotate(180deg)"
                            : "none",
                      }}
                    >
                      {resolvedCards.length <= 5 || isHoveringAny ? card.title : index + 1}
                    </h2>
                  </motion.div>

                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : 20,
                      filter: isActive ? "blur(0px)" : "blur(5px)",
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                      delay: isActive ? 0.1 : 0,
                    }}
                    className="absolute bottom-5 left-5 right-5 w-[calc(100%-40px)] md:bottom-8 md:left-8 md:right-auto md:w-[520px]"
                    style={{ pointerEvents: isActive ? "auto" : "none" }}
                  >
                    <h2 className="mb-2 text-[20px] font-normal leading-tight text-white md:mb-3 md:text-[30px]">
                      {card.title}
                    </h2>

                    <p className="line-clamp-2 text-[14px] font-medium leading-[1.5] text-white/85 md:text-[18px] md:line-clamp-none">
                      {card.desc}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
