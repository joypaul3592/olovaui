"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "./button";

const panelClassName =
  "flex w-full flex-wrap items-center justify-center gap-4";

export function ButtonDefaultView() {
  return (
    <div className={panelClassName}>
      <Button>Button</Button>
    </div>
  );
}

export function ButtonVariantsView() {
  return (
    <div className={panelClassName}>
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}

export function ButtonSizesView() {
  return (
    <div className={panelClassName}>
      <Button size="xs" rightIcon={<ArrowUpRight className="h-3.5 w-3.5" />}>
        Extra Small
      </Button>
      <Button size="sm" rightIcon={<ArrowUpRight className="h-3.5 w-3.5" />}>
        Small
      </Button>
      <Button size="md" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
        Default
      </Button>
      <Button size="lg" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
        Large
      </Button>
    </div>
  );
}

export function ButtonIconView() {
  return (
    <div className={panelClassName}>
      <Button rightIcon={<ArrowUpRight className="h-4 w-4" />}>Button</Button>
      <Button size="icon" aria-label="Go">
        <ArrowUpRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function ButtonLoadingView() {
  return (
    <div className={panelClassName}>
      <Button isLoading loadingText="Saving">
        Save changes
      </Button>
      <Button variant="outline" isLoading loadingText="Loading">
        Button
      </Button>
    </div>
  );
}

export default ButtonDefaultView;
