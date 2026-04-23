"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {}
export function ToggleGroup({ className, ...props }: ToggleGroupProps) {
  return <div className={cn("inline-flex items-center gap-2 rounded-md border border-border p-1", className)} {...props} />;
}

export interface ToggleGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
}
export function ToggleGroupItem({ className, pressed = false, ...props }: ToggleGroupItemProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      className={cn("inline-flex h-8 items-center justify-center rounded px-3 text-sm", pressed ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted", className)}
      {...props}
    />
  );
}
