"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

type AlertDialogContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  dismissible: boolean;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

const AlertDialogContext = React.createContext<AlertDialogContextValue | null>(null);

function useAlertDialogContext() {
  const context = React.useContext(AlertDialogContext);
  if (!context) {
    throw new Error("AlertDialog components must be used within <AlertDialog>.");
  }
  return context;
}

type AlertDialogContentContextValue = {
  titleId: string;
  descriptionId: string;
};

const AlertDialogContentContext =
  React.createContext<AlertDialogContentContextValue | null>(null);

function useAlertDialogContentContext() {
  const context = React.useContext(AlertDialogContentContext);
  if (!context) {
    throw new Error(
      "AlertDialogTitle and AlertDialogDescription must be used within <AlertDialogContent>.",
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

export interface AlertDialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  dismissible?: boolean;
  children: React.ReactNode;
}

export function AlertDialog({
  open,
  defaultOpen = false,
  onOpenChange,
  dismissible = false,
  children,
}: AlertDialogProps) {
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
    <AlertDialogContext.Provider
      value={{ open: !!currentOpen, setOpen, dismissible, triggerRef }}
    >
      {children}
    </AlertDialogContext.Provider>
  );
}

export interface AlertDialogTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const AlertDialogTrigger = React.forwardRef<
  HTMLButtonElement,
  AlertDialogTriggerProps
>(({ className, onClick, type = "button", ...props }, ref) => {
  const { setOpen, triggerRef } = useAlertDialogContext();

  return (
    <button
      ref={composeRefs(ref, triggerRef)}
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
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

AlertDialogTrigger.displayName = "AlertDialogTrigger";

export interface AlertDialogContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  overlayClassName?: string;
  size?: "default" | "sm";
}

export const AlertDialogContent = React.forwardRef<
  HTMLDivElement,
  AlertDialogContentProps
>(({ className, overlayClassName, size = "default", children, ...props }, ref) => {
  const { open, setOpen, dismissible, triggerRef } = useAlertDialogContext();
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
      contentRef.current?.querySelector<HTMLElement>(
        "[data-alert-dialog-primary]",
      ) ||
      contentRef.current?.querySelector<HTMLElement>(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
      );

    focusTarget?.focus();

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

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
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
      <AlertDialogContentContext.Provider value={{ titleId, descriptionId }}>
        <div
          ref={composedRef}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          className={cn(
            "relative w-full overflow-hidden rounded-2xl border border-border bg-card px-6 pb-0 pt-6 text-card-foreground shadow-2xl",
            size === "sm" ? "max-w-sm" : "max-w-lg",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </AlertDialogContentContext.Provider>
    </div>,
    document.body,
  );
});

AlertDialogContent.displayName = "AlertDialogContent";

export interface AlertDialogHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function AlertDialogHeader({
  className,
  ...props
}: AlertDialogHeaderProps) {
  return <div className={cn("space-y-2", className)} {...props} />;
}

export interface AlertDialogFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function AlertDialogFooter({
  className,
  ...props
}: AlertDialogFooterProps) {
  return (
    <div
      className={cn(
        "mt-6 flex flex-col gap-3 border-t border-border/60 bg-muted/40 px-6 py-4 sm:flex-row sm:justify-end",
        "-mx-6 rounded-b-2xl",
        className,
      )}
      {...props}
    />
  );
}

export interface AlertDialogTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export const AlertDialogTitle = React.forwardRef<
  HTMLHeadingElement,
  AlertDialogTitleProps
>(({ className, ...props }, ref) => {
  const { titleId } = useAlertDialogContentContext();

  return (
    <h2
      ref={ref}
      id={titleId}
      className={cn("text-lg font-semibold tracking-tight", className)}
      {...props}
    />
  );
});

AlertDialogTitle.displayName = "AlertDialogTitle";

export interface AlertDialogDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const AlertDialogDescription = React.forwardRef<
  HTMLParagraphElement,
  AlertDialogDescriptionProps
>(({ className, ...props }, ref) => {
  const { descriptionId } = useAlertDialogContentContext();

  return (
    <p
      ref={ref}
      id={descriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});

AlertDialogDescription.displayName = "AlertDialogDescription";

export interface AlertDialogCancelProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const AlertDialogCancel = React.forwardRef<
  HTMLButtonElement,
  AlertDialogCancelProps
>(({ className, onClick, type = "button", ...props }, ref) => {
  const { setOpen } = useAlertDialogContext();

  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex h-9 min-w-[96px] items-center justify-center rounded-lg border border-border bg-background px-5 text-sm font-medium text-foreground shadow-sm transition",
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

AlertDialogCancel.displayName = "AlertDialogCancel";

export interface AlertDialogActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const AlertDialogAction = React.forwardRef<
  HTMLButtonElement,
  AlertDialogActionProps
>(({ className, onClick, type = "button", ...props }, ref) => {
  const { setOpen } = useAlertDialogContext();

  return (
    <button
      ref={ref}
      type={type}
      data-alert-dialog-primary
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

AlertDialogAction.displayName = "AlertDialogAction";
