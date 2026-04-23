"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}
export function AspectRatio({ ratio = 16 / 9, className, children, ...props }: AspectRatioProps) {
  return (
    <div className={cn("relative w-full overflow-hidden rounded-md border bg-muted", className)} style={{ paddingBottom: (100 / ratio) + "%" }} {...props}>
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
