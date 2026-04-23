"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

type DialogContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  dismissible: boolean;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

const DialogContext = React.createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog components must be used within <Dialog>.");
  }
  return context;
}

type DialogContentContextValue = {
  titleId: string;
  descriptionId: string;
};

const DialogContentContext = React.createContext<DialogContentContextValue | null>(null);

function useDialogContentContext() {
  const context = React.useContext(DialogContentContext);
  if (!context) {
    throw new Error(
      "DialogTitle and DialogDescription must be used within <DialogContent>.",
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

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  dismissible?: boolean;
  children: React.ReactNode;
}

export function Dialog({
  open,
  defaultOpen = false,
  onOpenChange,
  dismissible = true,
  children,
}: DialogProps) {
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
    <DialogContext.Provider
      value={{ open: !!currentOpen, setOpen, dismissible, triggerRef }}
    >
      {children}
    </DialogContext.Provider>
  );
}

export interface DialogTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const DialogTrigger = React.forwardRef<
  HTMLButtonElement,
  DialogTriggerProps
>(({ className, onClick, type = "button", ...props }, ref) => {
  const { setOpen, triggerRef } = useDialogContext();

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

DialogTrigger.displayName = "DialogTrigger";

export interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  overlayClassName?: string;
  size?: "default" | "sm" | "lg";
}

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>(({ className, overlayClassName, size = "default", children, ...props }, ref) => {
  const { open, setOpen, dismissible, triggerRef } = useDialogContext();
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
      contentRef.current?.querySelector<HTMLElement>("[data-dialog-primary]") ||
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
      <DialogContentContext.Provider value={{ titleId, descriptionId }}>
        <div
          ref={composedRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          tabIndex={-1}
          className={cn(
            "relative w-full overflow-hidden rounded-2xl border border-border bg-card px-6 pb-0 pt-6 text-card-foreground shadow-2xl",
            size === "sm" && "max-w-sm",
            size === "lg" && "max-w-2xl",
            size === "default" && "max-w-lg",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </DialogContentContext.Provider>
    </div>,
    document.body,
  );
});

DialogContent.displayName = "DialogContent";

export interface DialogHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return <div className={cn("space-y-2", className)} {...props} />;
}

export interface DialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DialogBody({ className, ...props }: DialogBodyProps) {
  return (
    <div
      className={cn("max-h-[60vh] overflow-y-auto pr-2 text-sm", className)}
      {...props}
    />
  );
}

export interface DialogFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  sticky?: boolean;
}

export function DialogFooter({
  className,
  sticky = false,
  ...props
}: DialogFooterProps) {
  return (
    <div
      className={cn(
        "mt-6 flex flex-col gap-3 border-t border-border/60 px-6 py-4 sm:flex-row sm:justify-end",
        "-mx-6 rounded-b-2xl",
        sticky
          ? "sticky bottom-0 bg-card/95 backdrop-blur"
          : "bg-muted/40",
        className,
      )}
      {...props}
    />
  );
}

export interface DialogTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  DialogTitleProps
>(({ className, ...props }, ref) => {
  const { titleId } = useDialogContentContext();

  return (
    <h2
      ref={ref}
      id={titleId}
      className={cn("text-lg font-semibold tracking-tight", className)}
      {...props}
    />
  );
});

DialogTitle.displayName = "DialogTitle";

export interface DialogDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ className, ...props }, ref) => {
  const { descriptionId } = useDialogContentContext();

  return (
    <p
      ref={ref}
      id={descriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});

DialogDescription.displayName = "DialogDescription";

export interface DialogCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const DialogClose = React.forwardRef<
  HTMLButtonElement,
  DialogCloseProps
>(({ className, onClick, type = "button", ...props }, ref) => {
  const { setOpen } = useDialogContext();

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

DialogClose.displayName = "DialogClose";

export interface DialogActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const DialogAction = React.forwardRef<
  HTMLButtonElement,
  DialogActionProps
>(({ className, onClick, type = "button", ...props }, ref) => {
  const { setOpen } = useDialogContext();

  return (
    <button
      ref={ref}
      type={type}
      data-dialog-primary
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

DialogAction.displayName = "DialogAction";
