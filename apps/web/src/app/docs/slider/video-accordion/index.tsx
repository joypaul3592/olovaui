"use client";

import { VideoAccordion, type VideoAccordionCard } from "./video-accordion";

const DEMO_CARDS: VideoAccordionCard[] = [
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

export function VideoAccordionView() {
  return <VideoAccordion cards={DEMO_CARDS} className="min-h-[780px] lg:min-h-[680px]" />;
}

export default VideoAccordionView;
