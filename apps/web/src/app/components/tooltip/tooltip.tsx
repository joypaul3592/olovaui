"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {}
export function Tooltip({ className, ...props }: TooltipProps) {
  return <div className={cn("group relative inline-flex", className)} {...props} />;
}
export function TooltipTrigger({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={cn("inline-flex h-9 items-center rounded-md border px-3 text-sm", className)} {...props} />;
}
export function TooltipContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100", className)} {...props} />;
}
