"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Lightbulb,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export const Alert = ({
  children,
  variant = "info",
  title,
  dismissible = false,
  className,
  ...props
}: {
  children: React.ReactNode;
  variant?: "info" | "warning" | "success" | "error" | "tip" | "danger";
  title?: string;
  dismissible?: boolean;
  className?: string;
}) => {
  const [dismissed, setDismissed] = React.useState(false);

  if (dismissed) return null;

  const variants = {
    info: {
      icon: Info,
    },
    warning: {
      icon: AlertTriangle,
    },
    success: {
      icon: CheckCircle,
    },
    error: {
      icon: XCircle,
    },
    tip: {
      icon: Lightbulb,
    },
    danger: {
      icon: XCircle,
    },
  };

  const config = variants[variant];
  const Icon = config.icon;
  const variantClass = {
    info:
      "border-blue-200/70 bg-blue-50 text-blue-950 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-50",
    warning:
      "border-amber-200/70 bg-amber-50 text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-50",
    success:
      "border-emerald-200/70 bg-emerald-50 text-emerald-950 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-50",
    error:
      "border-red-200/70 bg-red-50 text-red-950 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-50",
    tip:
      "border-teal-200/70 bg-teal-50 text-teal-950 dark:border-teal-900/60 dark:bg-teal-950/30 dark:text-teal-50",
    danger:
      "border-red-200/70 bg-red-50 text-red-950 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-50",
  }[variant];

  return (
    <div
      className={cn(
        "mdx-callout relative my-5 w-full rounded-lg border px-4 py-4 text-sm shadow-sm",
        variantClass,
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <Icon className="mt-0.5 size-4 opacity-80" aria-hidden="true" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          {title && <p className="my-0 font-medium leading-none">{title}</p>}
          <div className="text-muted-foreground leading-relaxed prose-no-margin empty:hidden">
            {children}
          </div>
        </div>
      </div>
      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          className="text-xs text-muted-foreground hover:opacity-70 transition-opacity"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export const Collapsible = ({
  children,
  title,
  defaultOpen = false,
  className,
  ...props
}: {
  children: React.ReactNode;
  title: string;
  defaultOpen?: boolean;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className={cn("border rounded-lg my-4", className)} {...props}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left font-medium hover:bg-muted/50 transition-colors"
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>
      {isOpen && <div className="p-4 pt-0 border-t">{children}</div>}
    </div>
  );
};
