"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}
export function Toast({ title, description, className, ...props }: ToastProps) {
  return (
    <div role="status" className={cn("w-full max-w-sm rounded-md border bg-card p-4 shadow-lg", className)} {...props}>
      <p className="text-sm font-semibold">{title}</p>
      {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
    </div>
  );
}
