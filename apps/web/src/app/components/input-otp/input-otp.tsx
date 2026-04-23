"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputOtpProps extends React.HTMLAttributes<HTMLDivElement> {
  length?: number;
}
export function InputOtp({ length = 6, className, ...props }: InputOtpProps) {
  const [values, setValues] = React.useState(() => Array.from({ length }, () => ""));
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      {values.map((value, index) => (
        <input
          key={index}
          inputMode="numeric"
          maxLength={1}
          value={value}
          className="h-11 w-11 rounded-md border border-input bg-background text-center text-lg outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          onChange={(event) => {
            const nextChar = event.target.value.replace(/\D/g, "").slice(-1);
            setValues((current) => {
              const next = [...current];
              next[index] = nextChar;
              return next;
            });
            if (nextChar) {
              const nextInput = event.currentTarget.nextElementSibling;
              if (nextInput instanceof HTMLInputElement) nextInput.focus();
            }
          }}
        />
      ))}
    </div>
  );
}
