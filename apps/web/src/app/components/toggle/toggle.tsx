"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (value: boolean) => void;
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, pressed, defaultPressed = false, onPressedChange, ...props }, ref) => {
    const controlled = pressed !== undefined;
    const [internal, setInternal] = React.useState(defaultPressed);
    const value = controlled ? pressed : internal;
    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={value}
        className={cn(
          "inline-flex h-10 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring/40",
          value ? "border-primary bg-primary/10 text-primary" : "border-input hover:bg-muted",
          className,
        )}
        onClick={() => {
          const next = !value;
          if (!controlled) setInternal(next);
          onPressedChange?.(next);
        }}
        {...props}
      />
    );
  },
);
Toggle.displayName = "Toggle";
