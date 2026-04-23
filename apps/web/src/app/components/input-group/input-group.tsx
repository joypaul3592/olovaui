"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  invalid?: boolean;
  loading?: boolean;
}

export function InputGroup({
  className,
  invalid = false,
  loading = false,
  ...props
}: InputGroupProps) {
  return (
    <div
      className={cn(
        "group relative flex h-11 w-full items-center overflow-hidden rounded-xl border bg-background/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-colors",
        "border-zinc-800/90 hover:border-zinc-700/90",
        "focus-within:border-zinc-600 focus-within:ring-1 focus-within:ring-zinc-700/60",
        invalid &&
          "border-destructive/60 focus-within:border-destructive/70 focus-within:ring-destructive/30",
        loading && "opacity-90",
        className,
      )}
      aria-busy={loading}
      {...props}
    />
  );
}

export function InputGroupAddon({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex h-full items-center px-2 text-sm text-zinc-400",
        className,
      )}
      {...props}
    />
  );
}

export function InputGroupMeta({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex h-full shrink-0 items-center whitespace-nowrap px-2 text-right text-sm font-medium leading-none text-zinc-300/90",
        className,
      )}
      {...props}
    />
  );
}

export function InputGroupAction({
  className,
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cn(
        "mr-1 inline-flex h-8 items-center rounded-lg border border-zinc-700 bg-zinc-800/70 px-2.5 text-sm font-medium text-zinc-100 transition-colors",
        "hover:bg-zinc-700/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export function InputGroupIconButton({
  className,
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cn(
        "mr-1 inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors",
        "hover:bg-zinc-800/80 hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export const InputGroupField = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-full w-full bg-transparent px-2 text-sm outline-none placeholder:text-zinc-500",
        className,
      )}
      {...props}
    />
  ),
);
InputGroupField.displayName = "InputGroupField";
