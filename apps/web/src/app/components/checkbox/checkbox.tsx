"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const checkboxVariants = cva(
  "peer shrink-0 appearance-none rounded-md border border-border bg-background shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background checked:border-foreground checked:bg-foreground disabled:cursor-not-allowed disabled:opacity-50 data-[indeterminate=true]:border-foreground data-[indeterminate=true]:bg-foreground",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const checkboxIconSizes: Record<NonNullable<CheckboxVariants["size"]>, string> = {
  sm: "h-3 w-3",
  md: "h-3.5 w-3.5",
  lg: "h-4 w-4",
};

type CheckboxVariants = VariantProps<typeof checkboxVariants>;

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    CheckboxVariants {
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, size, indeterminate = false, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = Boolean(indeterminate);
      }
    }, [indeterminate]);

    return (
      <span
        className="group relative inline-flex items-center justify-center"
        data-indeterminate={indeterminate ? "true" : "false"}
      >
        <input
          ref={inputRef}
          type="checkbox"
          data-indeterminate={indeterminate ? "true" : "false"}
          aria-checked={indeterminate ? "mixed" : props["aria-checked"]}
          className={cn(checkboxVariants({ size }), className)}
          {...props}
        />
        <CheckIcon
          className={cn(
            "pointer-events-none absolute text-background opacity-0 transition-opacity peer-checked:opacity-100 group-data-[indeterminate=true]:opacity-0",
            checkboxIconSizes[size ?? "md"],
          )}
        />
        <MinusIcon
          className={cn(
            "pointer-events-none absolute text-background opacity-0 transition-opacity group-data-[indeterminate=true]:opacity-100",
            checkboxIconSizes[size ?? "md"],
          )}
        />
      </span>
    );
  },
);

Checkbox.displayName = "Checkbox";

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M5 12h14"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
