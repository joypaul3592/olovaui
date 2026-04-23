"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  showValue?: boolean;
}
export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value, defaultValue = 50, showValue = false, onChange, ...props }, ref) => {
    const [internal, setInternal] = React.useState(Number(defaultValue));
    const current = typeof value === "number" ? value : internal;
    return (
      <div className="w-full space-y-2">
        <input
          ref={ref}
          type="range"
          value={current}
          className={cn("h-2 w-full cursor-pointer appearance-none rounded-full bg-muted", className)}
          onChange={(event) => {
            if (typeof value !== "number") setInternal(Number(event.target.value));
            onChange?.(event);
          }}
          {...props}
        />
        {showValue ? <p className="text-xs text-muted-foreground">Value: {current}</p> : null}
      </div>
    );
  },
);
Slider.displayName = "Slider";
