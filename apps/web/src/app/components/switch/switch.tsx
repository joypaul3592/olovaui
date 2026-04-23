"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (value: boolean) => void;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked, defaultChecked = false, onCheckedChange, ...props }, ref) => {
    const isControlled = checked !== undefined;
    const [internal, setInternal] = React.useState(defaultChecked);
    const value = isControlled ? checked : internal;

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={value}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-ring/40",
          value ? "bg-primary" : "bg-muted",
          className,
        )}
        onClick={() => {
          const next = !value;
          if (!isControlled) setInternal(next);
          onCheckedChange?.(next);
        }}
        {...props}
      >
        <span className={cn("h-5 w-5 rounded-full bg-background shadow transition-transform", value ? "translate-x-5" : "translate-x-0")} />
      </button>
    );
  },
);
Switch.displayName = "Switch";
