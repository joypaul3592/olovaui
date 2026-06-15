export type NavigationChild = {
  label: string;
  href: string;
  badge?: string;
};
export type NavigationItem = {
  label: string;
  children: NavigationChild[];
};

export const navigation: NavigationItem[] = [
  {
    label: "Getting Started",
    children: [
      { label: "Introduction", href: "/docs" },
      {
        label: "Installation",
        href: "/docs/installation",
      },
    ],
  },
  {
    label: "Text Animation",
    children: [
      {
        label: "Flip Link",
        href: "/docs/text/flip-link",
      },
      {
        label: "Shiny Text",
        href: "/docs/text/shiny-text",
      },
      {
        label: "Gradient Text",
        href: "/docs/text/animated-gradient-text",
      },
      {
        label: "Scramble Text",
        href: "/docs/text/scramble-text",
      },
      {
        label: "Slide In View",
        href: "/docs/text/slide-in-text",
      },
      {
        label: "Blur Text View",
        href: "/docs/text/blur-text",
      },
      {
        label: "Rolling Letters",
        href: "/docs/text/rolling-letters",
      },
      {
        label: "Letter Glitch",
        href: "/docs/text/letter-glitch",
      },
    ],
  },
  {
    label: "Components",
    children: [
      {
        label: "Border Beam",
        href: "/docs/border-beam",
      },
      {
        label: "Shine Border",
        href: "/docs/shine-border",
      },
      {
        label: "Hero Video Player",
        href: "/docs/hero-video-player",
      },
      {
        label: "Network Graph",
        href: "/docs/network-graph",
      },
      {
        label: "Glow Card",
        href: "/docs/glow-card",
      },
      {
        label: "Code Block",
        href: "/docs/code-block",
      },
    ],
  },
  {
    label: "Slider",
    children: [
      {
        label: "3D Carousel",
        href: "/docs/slider/3d-carousel",
      },
      {
        label: "Rotating Cards",
        href: "/docs/slider/rotating-cards",
      },
      {
        label: "Memories Card",
        href: "/docs/slider/memories-card",
      },
      {
        label: "Photo Slider",
        href: "/docs/slider/photo-slider",
      },
      {
        label: "Moody Carousel",
        href: "/docs/slider/moody-carousel",
      },
      {
        label: "Focus Cards",
        href: "/docs/slider/focus-cards",
      },
      {
        label: "Video Accordion",
        href: "/docs/slider/video-accordion",
      },
      {
        label: "Momentum Carousel",
        href: "/docs/slider/momentum-carousel",
      },
    ],
  },
  {
    label: "Badge",
    children: [
      {
        label: "Badge",
        href: "/docs/badge",
        badge: "New",
      },
    ],
  },
];
