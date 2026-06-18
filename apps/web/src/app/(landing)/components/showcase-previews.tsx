"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import type { ShowcaseItem } from "./showcase-types";

// Dynamic imports for each preview component to keep the main bundle thin
const previews: Record<string, React.ComponentType<any>> = {
  "Button": dynamic(() => import("@/app/(landing)/components/showcase/button-preview")),
  "Button Group": dynamic(() => import("@/app/(landing)/components/showcase/button-group-preview")),
  "Badge": dynamic(() => import("@/app/(landing)/components/showcase/badge-preview")),
  "Card": dynamic(() => import("@/app/(landing)/components/showcase/card-preview")),
  "Avatar": dynamic(() => import("@/app/(landing)/components/showcase/avatar-preview")),
  "Separator": dynamic(() => import("@/app/(landing)/components/showcase/separator-preview")),
  "Input": dynamic(() => import("@/app/(landing)/components/showcase/input-preview")),
  "Input Group": dynamic(() => import("@/app/(landing)/components/showcase/input-preview")),
  "Textarea": dynamic(() => import("@/app/(landing)/components/showcase/textarea-preview")),
  "Checkbox": dynamic(() => import("@/app/(landing)/components/showcase/checkbox-preview")),
  "Radio Group": dynamic(() => import("@/app/(landing)/components/showcase/radio-group-preview")),
  "Select": dynamic(() => import("@/app/(landing)/components/showcase/select-preview")),
  "Combobox": dynamic(() => import("@/app/(landing)/components/showcase/combobox-preview")),
  "Date Picker": dynamic(() => import("@/app/(landing)/components/showcase/date-picker-preview")),
  "Input OTP": dynamic(() => import("@/app/(landing)/components/showcase/input-otp-preview")),
  "Switch": dynamic(() => import("@/app/(landing)/components/showcase/switch-preview")),
  "Slider": dynamic(() => import("@/app/(landing)/components/showcase/slider-preview")),
  "Label": dynamic(() => import("@/app/(landing)/components/showcase/label-preview")),
  "Dialog": dynamic(() => import("@/app/(landing)/components/showcase/dialog-preview")),
  "Alert Dialog": dynamic(() => import("@/app/(landing)/components/showcase/alert-dialog-preview")),
  "Drawer": dynamic(() => import("@/app/(landing)/components/showcase/drawer-preview")),
  "Popover": dynamic(() => import("@/app/(landing)/components/showcase/popover-preview")),
  "Tooltip": dynamic(() => import("@/app/(landing)/components/showcase/tooltip-preview")),
  "Dropdown Menu": dynamic(() => import("@/app/(landing)/components/showcase/dropdown-menu-preview")),
  "Context Menu": dynamic(() => import("@/app/(landing)/components/showcase/context-menu-preview")),
  "Tabs": dynamic(() => import("@/app/(landing)/components/showcase/tabs-preview")),
  "Accordion": dynamic(() => import("@/app/(landing)/components/showcase/accordion-preview")),
  "Collapsible": dynamic(() => import("@/app/(landing)/components/showcase/collapsible-preview")),
  "Pagination": dynamic(() => import("@/app/(landing)/components/showcase/pagination-preview")),
  "Table": dynamic(() => import("@/app/(landing)/components/showcase/table-preview")),
  "Alert": dynamic(() => import("@/app/(landing)/components/showcase/alert-preview")),
  "Toast": dynamic(() => import("@/app/(landing)/components/showcase/toast-preview")),
  "Progress": dynamic(() => import("@/app/(landing)/components/showcase/progress-preview")),
  "Skeleton": dynamic(() => import("@/app/(landing)/components/showcase/skeleton-preview")),
  "Spinner": dynamic(() => import("@/app/(landing)/components/showcase/spinner-preview")),
  "Border Beam": dynamic(() => import("@/app/(landing)/components/showcase/border-beam-preview")),
  "Shine Border": dynamic(() => import("@/app/(landing)/components/showcase/shine-border-preview")),
  "Glow Card": dynamic(() => import("@/app/(landing)/components/showcase/glow-card-preview")),
  "Code Block": dynamic(() => import("@/app/(landing)/components/showcase/code-block-preview")),
  "Network Graph": dynamic(() => import("@/app/(landing)/components/showcase/network-preview")),
  "Hero Video Player": dynamic(() => import("@/app/(landing)/components/showcase/hero-video-preview")),
  "Flip Link": dynamic(() => import("@/app/(landing)/components/showcase/flip-link-preview")),
  "Shiny Text": dynamic(() => import("@/app/(landing)/components/showcase/shiny-text-preview")),
  "3D Carousel": dynamic(() => import("@/app/(landing)/components/showcase/carousel-3d-preview")),
  "Focus Cards": dynamic(() => import("@/app/(landing)/components/showcase/focus-cards-preview")),
  "Video Accordion": dynamic(() => import("@/app/(landing)/components/showcase/video-accordion-preview")),
};

export function Preview({ item }: { item: ShowcaseItem }) {
  const Component = previews[item.name];
  
  if (!Component) {
     return <div className="text-xs text-muted-foreground">{item.name} Preview</div>;
  }

  return <Component />;
}
