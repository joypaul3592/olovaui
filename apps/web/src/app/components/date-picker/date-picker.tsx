"use client";

import * as React from "react";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(({ className, ...props }, ref) => (
  <span className="relative inline-flex w-full items-center">
    <Calendar className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
    <input
      ref={ref}
      type="date"
      className={cn("h-10 w-full rounded-md border border-input bg-background px-3 pl-9 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40", className)}
      {...props}
    />
  </span>
));
DatePicker.displayName = "DatePicker";
