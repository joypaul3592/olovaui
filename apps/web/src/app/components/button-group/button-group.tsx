"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonGroupVariants = cva(
  "inline-flex items-center justify-center isolate",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col items-stretch",
      },
      attached: {
        true: "",
        false: "gap-2",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      attached: true,
    },
    compoundVariants: [
      {
        orientation: "horizontal",
        attached: true,
        className:
          "gap-0 [&>button]:rounded-none [&>button:first-child]:rounded-l-md [&>button:last-child]:rounded-r-md [&>button:not(:first-child)]:-ml-px",
      },
      {
        orientation: "vertical",
        attached: true,
        className:
          "gap-0 [&>button]:rounded-none [&>button:first-child]:rounded-t-md [&>button:last-child]:rounded-b-md [&>button:not(:first-child)]:-mt-px",
      },
    ],
  },
);

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {}

export function ButtonGroup({
  className,
  orientation,
  attached,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      className={cn(buttonGroupVariants({ orientation, attached }), className)}
      {...props}
    />
  );
}

export { buttonGroupVariants };
