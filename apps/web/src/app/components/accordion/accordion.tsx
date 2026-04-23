"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type AccordionType = "single" | "multiple";
type AccordionValue = string | string[] | null;

type AccordionContextValue = {
  type: AccordionType;
  openValues: string[];
  toggleItem: (value: string) => void;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within <Accordion>.");
  }
  return context;
}

function normalizeValue(value: AccordionValue): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: AccordionType;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: AccordionValue) => void;
  collapsible?: boolean;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      type = "single",
      value,
      defaultValue,
      onValueChange,
      collapsible = true,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<AccordionValue>(() => {
      if (defaultValue !== undefined) return defaultValue;
      return type === "single" ? null : [];
    });

    const currentValue = isControlled ? value : internalValue;
    const openValues = normalizeValue(currentValue ?? null);

    const updateValue = (nextValue: AccordionValue) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      }
      onValueChange?.(nextValue);
    };

    const toggleItem = (itemValue: string) => {
      if (type === "single") {
        const isOpen = openValues[0] === itemValue;
        const nextValue = isOpen
          ? (collapsible ? null : openValues[0] ?? null)
          : itemValue;
        updateValue(nextValue);
        return;
      }

      const isOpen = openValues.includes(itemValue);
      const nextValues = isOpen
        ? openValues.filter((value) => value !== itemValue)
        : [...openValues, itemValue];
      updateValue(nextValues);
    };

    return (
      <AccordionContext.Provider value={{ type, openValues, toggleItem }}>
        <div
          ref={ref}
          data-slot="accordion"
          className={cn(
            "w-full rounded-xl border border-border bg-card text-card-foreground shadow-sm",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);

Accordion.displayName = "Accordion";

type AccordionItemContextValue = {
  isOpen: boolean;
  contentId: string;
  triggerId: string;
  toggle: () => void;
  disabled: boolean;
};

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

function useAccordionItemContext() {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error("AccordionItem components must be used within <AccordionItem>.");
  }
  return context;
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, disabled = false, className, children, ...props }, ref) => {
    const { openValues, toggleItem } = useAccordionContext();
    const isOpen = openValues.includes(value);
    const id = React.useId();
    const contentId = `${id}-content`;
    const triggerId = `${id}-trigger`;

    const handleToggle = () => {
      if (disabled) return;
      toggleItem(value);
    };

    return (
      <AccordionItemContext.Provider
        value={{
          isOpen,
          contentId,
          triggerId,
          toggle: handleToggle,
          disabled,
        }}
      >
        <div
          ref={ref}
          data-slot="accordion-item"
          data-state={isOpen ? "open" : "closed"}
          data-disabled={disabled ? "" : undefined}
          className={cn(
            "border-b border-border last:border-b-0",
            disabled && "opacity-60",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  },
);

AccordionItem.displayName = "AccordionItem";

export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ className, children, ...props }, ref) => {
  const { isOpen, contentId, triggerId, toggle, disabled } = useAccordionItemContext();

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
        "group/accordion-trigger flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm font-medium",
        "transition-colors hover:bg-muted/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "data-[state=open]:bg-muted/30",
        "disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    >
      <span className="leading-6 group-hover/accordion-trigger:underline underline-offset-4">
        {children}
      </span>
      <Plus
        className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 data-[state=open]:rotate-45"
        data-state={isOpen ? "open" : "closed"}
        aria-hidden="true"
      />
    </button>
  );
});

AccordionTrigger.displayName = "AccordionTrigger";

export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ className, children, ...props }, ref) => {
  const { isOpen, contentId, triggerId } = useAccordionItemContext();

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
        <div className="px-4 pb-4 pt-1">{children}</div>
      </div>
    </div>
  );
});

AccordionContent.displayName = "AccordionContent";
