"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ContextMenuProps extends React.HTMLAttributes<HTMLDivElement> {}
export function ContextMenu({ className, ...props }: ContextMenuProps) {
  return <div className={cn("inline-flex items-center gap-2", className)} {...props} />;
}

export function ContextMenuTrigger({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={cn("inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm", className)} {...props}>
      Actions
      <ChevronDown className="h-4 w-4" />
    </button>
  );
}

export function ContextMenuContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("w-56 rounded-md border bg-popover p-1 text-popover-foreground shadow-md", className)} {...props} />;
}

export function ContextMenuItem({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={cn("flex w-full items-center rounded px-2 py-1.5 text-sm hover:bg-muted", className)} {...props} />;
}
