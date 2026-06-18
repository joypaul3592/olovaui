"use client";

import Link from "next/link";
import * as React from "react";
import { Badge } from "@/app/components/badge/badge";
import { cn } from "@/lib/utils";
import { Preview } from "./showcase-previews";
import type { ShowcaseCategory, ShowcaseItem } from "./showcase-types";

export type { ShowcaseCategory, ShowcaseItem };



const showcaseItems: ShowcaseItem[] = [
  { name: "Button", category: "Core", href: "/components/button", description: "Variants, sizes, loading, and icons." },
  { name: "Button Group", category: "Core", href: "/components/button-group", description: "Grouped actions with consistent spacing." },
  { name: "Badge", category: "Core", href: "/components/badge", description: "Compact status and category labels." },
  { name: "Card", category: "Core", href: "/components/card", description: "Composable content containers." },
  { name: "Avatar", category: "Core", href: "/components/avatar", description: "User identity and fallback states." },
  { name: "Separator", category: "Core", href: "/components/separator", description: "Simple visual grouping." },
  { name: "Input", category: "Forms", href: "/components/input", description: "Accessible text entry states." },
  { name: "Input Group", category: "Forms", href: "/components/input-group", description: "Inputs with inline actions." },
  { name: "Textarea", category: "Forms", href: "/components/textarea", description: "Long-form input patterns." },
  { name: "Checkbox", category: "Forms", href: "/components/checkbox", description: "Boolean selection controls." },
  { name: "Radio Group", category: "Forms", href: "/components/radio-group", description: "Single-choice option groups." },
  { name: "Select", category: "Forms", href: "/components/select", description: "Native select styling." },
  { name: "Combobox", category: "Forms", href: "/components/combobox", description: "Searchable option selection." },
  { name: "Date Picker", category: "Forms", href: "/components/date-picker", description: "Calendar-driven input." },
  { name: "Input OTP", category: "Forms", href: "/components/input-otp", description: "Verification code fields." },
  { name: "Switch", category: "Forms", href: "/components/switch", description: "Binary setting toggles." },
  { name: "Slider", category: "Forms", href: "/components/slider", description: "Continuous numeric input." },
  { name: "Label", category: "Forms", href: "/components/label", description: "Form labeling primitives." },
  { name: "Dialog", category: "Overlays", href: "/components/dialog", description: "Modal workflows and confirmations." },
  { name: "Alert Dialog", category: "Overlays", href: "/components/alert-dialog", description: "Destructive action confirmation." },
  { name: "Drawer", category: "Overlays", href: "/components/drawer", description: "Side panel interactions." },
  { name: "Popover", category: "Overlays", href: "/components/popover", description: "Anchored floating content." },
  { name: "Tooltip", category: "Overlays", href: "/components/tooltip", description: "Short contextual hints." },
  { name: "Dropdown Menu", category: "Overlays", href: "/components/dropdown-menu", description: "Action menus for controls." },
  { name: "Context Menu", category: "Overlays", href: "/components/context-menu", description: "Pointer-driven command menus." },
  { name: "Tabs", category: "Navigation", href: "/components/tabs", description: "Compact content switching." },
  { name: "Accordion", category: "Navigation", href: "/components/accordion", description: "Progressive content disclosure." },
  { name: "Collapsible", category: "Navigation", href: "/components/collapsible", description: "Controlled expandable regions." },
  { name: "Pagination", category: "Navigation", href: "/components/pagination", description: "Paged content navigation." },
  { name: "Table", category: "Navigation", href: "/components/table", description: "Structured data display." },
  { name: "Alert", category: "Feedback", href: "/components/alert", description: "Inline feedback messaging." },
  { name: "Toast", category: "Feedback", href: "/components/toast", description: "Temporary notifications." },
  { name: "Progress", category: "Feedback", href: "/components/progress", description: "Task completion status." },
  { name: "Skeleton", category: "Feedback", href: "/components/skeleton", description: "Loading placeholders." },
  { name: "Spinner", category: "Feedback", href: "/components/spinner", description: "Inline loading indicator." },
  { name: "Border Beam", category: "Advanced", href: "/docs/border-beam", description: "Animated border attention." },
  { name: "Shine Border", category: "Advanced", href: "/docs/shine-border", description: "Subtle highlight motion." },
  { name: "Glow Card", category: "Advanced", href: "/docs/glow-card", description: "Interactive illuminated cards." },
  { name: "Code Block", category: "Advanced", href: "/docs/code-block", description: "Syntax-focused documentation blocks." },
  { name: "Network Graph", category: "Advanced", href: "/docs/network-graph", description: "Node and edge visualization." },
  { name: "Hero Video Player", category: "Advanced", href: "/docs/hero-video-player", description: "Prominent video playback sections." },
  { name: "Flip Link", category: "Text", href: "/docs/text/flip-link", description: "Animated link transitions." },
  { name: "Shiny Text", category: "Text", href: "/docs/text/shiny-text", description: "Soft highlight text motion." },
  { name: "3D Carousel", category: "Media", href: "/docs/slider/3d-carousel", description: "Dimensional content rotation." },
  { name: "Focus Cards", category: "Media", href: "/docs/slider/focus-cards", description: "Image cards with focus states." },
  { name: "Video Accordion", category: "Media", href: "/docs/slider/video-accordion", description: "Media-first disclosure layouts." },
];


const itemsByCategory = showcaseItems.reduce<Record<string, ShowcaseItem[]>>(
  (acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  },
  {},
);

const categories: Array<ShowcaseCategory | "All"> = [
  "All", "Core", "Forms", "Overlays", "Navigation", "Feedback", "Advanced", "Text", "Media",
];



const MemoPreview = React.memo(Preview);

interface CategoryTabProps {
  category: ShowcaseCategory | "All";
  active: boolean;
  onClick: (c: ShowcaseCategory | "All") => void;
}

const CategoryTab = React.memo(function CategoryTab({ category, active, onClick }: CategoryTabProps) {
  const handleClick = React.useCallback(() => onClick(category), [category, onClick]);
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={handleClick}
      className={cn(
        "h-9 shrink-0 rounded-lg border px-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {category}
    </button>
  );
});

const ShowcaseCard = React.memo(function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  return (
    <Link
      href={item.href}
      className="group rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
    >
      <div className="flex min-h-40 items-center justify-center rounded-lg border border-border bg-background p-4">
        <MemoPreview item={item} />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">{item.name}</h3>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
        </div>
        <Badge variant="outline" className="shrink-0">
          {item.category}
        </Badge>
      </div>
    </Link>
  );
});



export function ComponentShowcase() {
  
  const [activeCategory, setActiveCategory] = React.useState<ShowcaseCategory | "All">("All");

  const visibleItems = React.useMemo(
    () => (activeCategory === "All" ? showcaseItems : (itemsByCategory[activeCategory] ?? [])),
    [activeCategory],
  );

  const handleCategoryClick = React.useCallback(
    (category: ShowcaseCategory | "All") => setActiveCategory(category),
    [],
  );

  return (
    <section className="border-t border-border px-4 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Component showcase
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
              Forty-six real previews from the catalog.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Browse the components buyers expect to see before they trust a UI library: buttons,
              cards, inputs, dialogs, drawers, tabs, accordions, and animated patterns.
            </p>
          </div>
          <Link
            href="/components"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-semibold text-foreground shadow-sm transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            Browse all components
          </Link>
        </div>

        {/* Category tabs */}
        <div
          className="mt-8 flex gap-2 overflow-x-auto pb-2 thin-scroll"
          role="tablist"
          aria-label="Component categories"
        >
          {categories.map((category) => (
            <CategoryTab
              key={category}
              category={category}
              active={category === activeCategory}
              onClick={handleCategoryClick}
            />
          ))}
        </div>

        {/* Card grid — rendered immediately on server and client, no loading gate */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item) => (
            <ShowcaseCard key={item.name} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
}