"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

type DrawerContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  dismissible: boolean;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

const DrawerContext = React.createContext<DrawerContextValue | null>(null);

function useDrawerContext() {
  const context = React.useContext(DrawerContext);
  if (!context) {
    throw new Error("Drawer components must be used within <Drawer>.");
  }
  return context;
}

type DrawerContentContextValue = {
  titleId: string;
  descriptionId: string;
};

const DrawerContentContext = React.createContext<DrawerContentContextValue | null>(
  null,
);

function useDrawerContentContext() {
  const context = React.useContext(DrawerContentContext);
  if (!context) {
    throw new Error(
      "DrawerTitle and DrawerDescription must be used within <DrawerContent>.",
    );
  }
  return context;
}

function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(node);
      } else {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    });
  };
}

export interface DrawerProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  dismissible?: boolean;
  children: React.ReactNode;
}

export function Drawer({
  open,
  defaultOpen = false,
  onOpenChange,
  dismissible = true,
  children,
}: DrawerProps) {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const currentOpen = isControlled ? open : internalOpen;
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  return (
    <DrawerContext.Provider
      value={{ open: !!currentOpen, setOpen, dismissible, triggerRef }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

export interface DrawerTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const DrawerTrigger = React.forwardRef<
  HTMLButtonElement,
  DrawerTriggerProps
>(({ className, onClick, type = "button", ...props }, ref) => {
  const { setOpen, triggerRef } = useDrawerContext();

  return (
    <button
      ref={composeRefs(ref, triggerRef)}
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-2 text-sm font-medium text-foreground shadow-sm transition",
        "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          setOpen(true);
        }
      }}
      {...props}
    />
  );
});

DrawerTrigger.displayName = "DrawerTrigger";

export interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {
  overlayClassName?: string;
  side?: "right" | "left" | "top" | "bottom";
  size?: "sm" | "default" | "lg" | "full";
}

const horizontalSizes: Record<NonNullable<DrawerContentProps["size"]>, string> = {
  sm: "max-w-sm",
  default: "max-w-md",
  lg: "max-w-lg",
  full: "max-w-none",
};

const verticalSizes: Record<NonNullable<DrawerContentProps["size"]>, string> = {
  sm: "max-h-[40vh]",
  default: "max-h-[60vh]",
  lg: "max-h-[80vh]",
  full: "max-h-full",
};

export const DrawerContent = React.forwardRef<
  HTMLDivElement,
  DrawerContentProps
>(
  (
    {
      className,
      overlayClassName,
      side = "right",
      size = "default",
      children,
      ...props
    },
    ref,
  ) => {
    const { open, setOpen, dismissible, triggerRef } = useDrawerContext();
    const contentRef = React.useRef<HTMLDivElement>(null);
    const composedRef = composeRefs(ref, contentRef);
    const [mounted, setMounted] = React.useState(false);
    const previousFocusRef = React.useRef<HTMLElement | null>(null);
    const previousOverflowRef = React.useRef<string>("");
    const titleId = React.useId();
    const descriptionId = React.useId();

    React.useEffect(() => {
      setMounted(true);
    }, []);

    React.useEffect(() => {
      if (!open) return;

      previousFocusRef.current = document.activeElement as HTMLElement | null;
      previousOverflowRef.current = document.body.style.overflow;
      const triggerElement = triggerRef.current;
      document.body.style.overflow = "hidden";

      const focusTarget =
        contentRef.current?.querySelector<HTMLElement>("[data-drawer-primary]") ||
        contentRef.current?.querySelector<HTMLElement>(
          "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
        );

      if (focusTarget) {
        focusTarget.focus();
      } else {
        contentRef.current?.focus();
      }

      return () => {
        document.body.style.overflow = previousOverflowRef.current;
        const previous = previousFocusRef.current ?? triggerElement;
        previous?.focus();
      };
    }, [open, triggerRef]);

    React.useEffect(() => {
      if (!open) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && dismissible) {
          event.preventDefault();
          setOpen(false);
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [dismissible, open, setOpen]);

    if (!mounted || !open) {
      return null;
    }

    const isHorizontal = side === "left" || side === "right";

    return createPortal(
      <div
        className={cn(
          "fixed inset-0 z-[9999] flex",
          isHorizontal ? "items-stretch" : "justify-center",
          side === "right" && "justify-end",
          side === "left" && "justify-start",
          side === "top" && "items-start",
          side === "bottom" && "items-end",
        )}
      >
        <div
          className={cn(
            "fixed inset-0 bg-black/60 backdrop-blur-sm",
            overlayClassName,
          )}
          onMouseDown={() => {
            if (dismissible) {
              setOpen(false);
            }
          }}
        />
        <DrawerContentContext.Provider value={{ titleId, descriptionId }}>
          <div
            ref={composedRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
            className={cn(
              "relative flex w-full flex-col overflow-hidden border border-border bg-card px-6 pb-0 pt-6 text-card-foreground shadow-2xl",
              isHorizontal && "h-full",
              isHorizontal ? horizontalSizes[size] : verticalSizes[size],
              side === "right" && "rounded-l-2xl",
              side === "left" && "rounded-r-2xl",
              side === "top" && "rounded-b-2xl",
              side === "bottom" && "rounded-t-2xl",
              size === "full" && "h-full",
              className,
            )}
            {...props}
          >
            {children}
          </div>
        </DrawerContentContext.Provider>
      </div>,
      document.body,
    );
  },
);

DrawerContent.displayName = "DrawerContent";

export interface DrawerHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function DrawerHeader({ className, ...props }: DrawerHeaderProps) {
  return <div className={cn("space-y-2", className)} {...props} />;
}

export interface DrawerBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DrawerBody({ className, ...props }: DrawerBodyProps) {
  return (
    <div
      className={cn("mt-6 flex-1 overflow-y-auto pr-2 text-sm", className)}
      {...props}
    />
  );
}

export interface DrawerFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  sticky?: boolean;
}

export function DrawerFooter({
  className,
  sticky = false,
  ...props
}: DrawerFooterProps) {
  return (
    <div
      className={cn(
        "mt-6 flex flex-col gap-3 border-t border-border/60 px-6 py-4 sm:flex-row sm:justify-end",
        "-mx-6 rounded-b-2xl",
        sticky ? "sticky bottom-0 bg-card/95 backdrop-blur" : "bg-muted/40",
        className,
      )}
      {...props}
    />
  );
}

export interface DrawerTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export const DrawerTitle = React.forwardRef<
  HTMLHeadingElement,
  DrawerTitleProps
>(({ className, ...props }, ref) => {
  const { titleId } = useDrawerContentContext();

  return (
    <h2
      ref={ref}
      id={titleId}
      className={cn("text-lg font-semibold tracking-tight", className)}
      {...props}
    />
  );
});

DrawerTitle.displayName = "DrawerTitle";

export interface DrawerDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const DrawerDescription = React.forwardRef<
  HTMLParagraphElement,
  DrawerDescriptionProps
>(({ className, ...props }, ref) => {
  const { descriptionId } = useDrawerContentContext();

  return (
    <p
      ref={ref}
      id={descriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});

DrawerDescription.displayName = "DrawerDescription";

export interface DrawerCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const DrawerClose = React.forwardRef<
  HTMLButtonElement,
  DrawerCloseProps
>(({ className, onClick, type = "button", ...props }, ref) => {
  const { setOpen } = useDrawerContext();

  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-border bg-background text-sm font-medium text-foreground shadow-sm transition",
        "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          setOpen(false);
        }
      }}
      {...props}
    />
  );
});

DrawerClose.displayName = "DrawerClose";

export interface DrawerActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const DrawerAction = React.forwardRef<
  HTMLButtonElement,
  DrawerActionProps
>(({ className, onClick, type = "button", ...props }, ref) => {
  const { setOpen } = useDrawerContext();

  return (
    <button
      ref={ref}
      type={type}
      data-drawer-primary
      className={cn(
        "inline-flex h-9 min-w-[96px] items-center justify-center rounded-lg bg-foreground px-5 text-sm font-semibold text-background shadow-sm transition",
        "hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          setOpen(false);
        }
      }}
      {...props}
    />
  );
});

DrawerAction.displayName = "DrawerAction";
