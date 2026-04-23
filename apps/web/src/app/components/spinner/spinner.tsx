"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SpinnerProps extends React.SVGProps<SVGSVGElement> {}
export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5 animate-spin", className)} fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="12" cy="12" r="9" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" />
    </svg>
  );
}
