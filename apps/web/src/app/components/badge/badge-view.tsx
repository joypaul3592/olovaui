"use client";

import { Sparkles } from "lucide-react";
import { Badge } from "./badge";

const panelClassName =
  "flex w-full flex-wrap items-center justify-center gap-3";

export function BadgeDefaultView() {
  return (
    <div className={panelClassName}>
      <Badge>Badge</Badge>
    </div>
  );
}

export function BadgeVariantsView() {
  return (
    <div className={panelClassName}>
      <Badge>Badge</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}

export function BadgeSizesView() {
  return (
    <div className={panelClassName}>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Default</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  );
}

export function BadgeCustomView() {
  return (
    <div className={panelClassName}>
      <Badge className="rounded-md bg-muted text-foreground">
        Custom
      </Badge>
      <Badge className="bg-emerald-500 text-white">
        <Sparkles className="h-3 w-3" />
        Verified
      </Badge>
      <a
        href="#"
        className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full border border-dashed border-border bg-transparent px-2.5 py-0.5 text-xs font-medium text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Link badge
      </a>
    </div>
  );
}

export default BadgeDefaultView;
