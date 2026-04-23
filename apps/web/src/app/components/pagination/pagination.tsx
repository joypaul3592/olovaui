"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {}
export function Pagination({ className, ...props }: PaginationProps) {
  return <nav aria-label="Pagination" className={cn("flex items-center justify-center", className)} {...props} />;
}
export function PaginationList({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("flex items-center gap-1", className)} {...props} />;
}
export function PaginationItem({ className, active = false, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <li>
      <button type="button" className={cn("inline-flex h-9 min-w-9 items-center justify-center rounded-md border px-3 text-sm", active ? "border-primary bg-primary text-primary-foreground" : "border-input hover:bg-muted", className)} {...props} />
    </li>
  );
}
