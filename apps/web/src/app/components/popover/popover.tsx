"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {}
export function Popover({ className, ...props }: PopoverProps) {
  return <div className={cn("relative inline-flex", className)} {...props} />;
}
export function PopoverTrigger({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={cn("inline-flex h-10 items-center rounded-md border px-3 text-sm", className)} {...props} />;
}
export function PopoverContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("absolute left-0 top-full z-10 mt-2 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-lg", className)} {...props} />;
}
