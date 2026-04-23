"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type CollapsibleContextValue = {
  isOpen: boolean;
  toggle: () => void;
  disabled: boolean;
  contentId: string;
  triggerId: string;
};

const CollapsibleContext = React.createContext<CollapsibleContextValue | null>(null);

function useCollapsibleContext() {
  const context = React.useContext(CollapsibleContext);
  if (!context) {
    throw new Error("Collapsible components must be used within <Collapsible>.");
  }
  return context;
}

export interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}

export const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      open,
      defaultOpen = false,
      onOpenChange,
      disabled = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const isControlled = open !== undefined;
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const isOpen = isControlled ? Boolean(open) : internalOpen;
    const id = React.useId();

    const toggle = () => {
      if (disabled) return;
      const nextOpen = !isOpen;
      if (!isControlled) {
        setInternalOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    };

    return (
      <CollapsibleContext.Provider
        value={{
          isOpen,
          toggle,
          disabled,
          contentId: `${id}-content`,
          triggerId: `${id}-trigger`,
        }}
      >
        <div
          ref={ref}
          data-slot="collapsible"
          data-state={isOpen ? "open" : "closed"}
          data-disabled={disabled ? "" : undefined}
          className={cn(
            "w-full rounded-xl border border-border bg-card text-card-foreground shadow-sm",
            disabled && "opacity-60",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </CollapsibleContext.Provider>
    );
  },
);

Collapsible.displayName = "Collapsible";

export interface CollapsibleTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  showIcon?: boolean;
  icon?: React.ReactNode;
}

export const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(({ className, children, showIcon = true, icon, ...props }, ref) => {
  const { isOpen, toggle, disabled, contentId, triggerId } = useCollapsibleContext();
  const iconNode = icon ?? (
    <ChevronDown
      className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 data-[state=open]:rotate-180"
      data-state={isOpen ? "open" : "closed"}
      aria-hidden="true"
    />
  );

  return (
    <button
      ref={ref}
      type="button"
      id={triggerId}
      aria-controls={contentId}
      aria-expanded={isOpen}
      data-state={isOpen ? "open" : "closed"}
      onClick={toggle}
      disabled={disabled}
      className={cn(
        "group/collapsible-trigger flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium",
        "transition-colors hover:bg-muted/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "data-[state=open]:bg-muted/30",
        "disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    >
      <span className="flex-1 leading-6">{children}</span>
      {showIcon ? iconNode : null}
    </button>
  );
});

CollapsibleTrigger.displayName = "CollapsibleTrigger";

export interface CollapsibleContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  CollapsibleContentProps
>(({ className, children, ...props }, ref) => {
  const { isOpen, contentId, triggerId } = useCollapsibleContext();

  return (
    <div
      ref={ref}
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "grid text-sm text-muted-foreground transition-all duration-300 ease-out",
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        className,
      )}
      {...props}
    >
      <div className="overflow-hidden">
        <div className="px-4 pb-4 pt-1 leading-6">{children}</div>
      </div>
    </div>
  );
});

CollapsibleContent.displayName = "CollapsibleContent";
