"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Ctx = { value: string; setValue: (v: string) => void; name?: string };
const RadioCtx = React.createContext<Ctx | null>(null);

function useRadioCtx() {
  const ctx = React.useContext(RadioCtx);
  if (!ctx) throw new Error("RadioGroupItem must be used within RadioGroup.");
  return ctx;
}

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
}

export function RadioGroup({ value, defaultValue = "", onValueChange, name, className, children, ...props }: RadioGroupProps) {
  const controlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const current = controlled ? value : internal;
  const setValue = (next: string) => {
    if (!controlled) setInternal(next);
    onValueChange?.(next);
  };

  return (
    <RadioCtx.Provider value={{ value: current, setValue, name }}>
      <div role="radiogroup" className={cn("grid gap-2", className)} {...props}>
        {children}
      </div>
    </RadioCtx.Provider>
  );
}

export interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value"> {
  value: string;
  label?: React.ReactNode;
}

export function RadioGroupItem({ value, label, id, className, ...props }: RadioGroupItemProps) {
  const ctx = useRadioCtx();
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const checked = ctx.value === value;

  return (
    <label htmlFor={inputId} className={cn("inline-flex items-center gap-2 text-sm", className)}>
      <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full border border-border">
        <input
          id={inputId}
          type="radio"
          checked={checked}
          name={ctx.name}
          className="sr-only"
          onChange={() => ctx.setValue(value)}
          {...props}
        />
        <span className={cn("h-2 w-2 rounded-full bg-primary transition-opacity", checked ? "opacity-100" : "opacity-0")} />
      </span>
      <span>{label ?? value}</span>
    </label>
  );
}
