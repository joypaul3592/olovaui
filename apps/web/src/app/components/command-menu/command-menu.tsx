"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type CommandMenuContextValue = {
  query: string;
  setQuery: (value: string) => void;
  matches: (value: string) => boolean;
  registerItem: (id: string) => void;
  unregisterItem: (id: string) => void;
  updateItemVisibility: (id: string, visible: boolean) => void;
  visibleCount: number;
};

const CommandMenuContext = React.createContext<CommandMenuContextValue | null>(
  null,
);

function useCommandMenuContext() {
  const context = React.useContext(CommandMenuContext);
  if (!context) {
    throw new Error("CommandMenu components must be used within <CommandMenu>.");
  }
  return context;
}

export interface CommandMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  filter?: (value: string, search: string) => boolean;
}

export function CommandMenu({
  value,
  defaultValue = "",
  onValueChange,
  filter,
  className,
  children,
  ...props
}: CommandMenuProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const query = isControlled ? value! : internalValue;

  const setQuery = React.useCallback(
    (nextValue: string) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      }
      onValueChange?.(nextValue);
    },
    [isControlled, onValueChange],
  );

  const itemsRef = React.useRef<Map<string, boolean>>(new Map());
  const [visibleCount, setVisibleCount] = React.useState(0);

  const matches = React.useCallback(
    (valueToMatch: string) => {
      const trimmed = query.trim();
      if (!trimmed) return true;
      if (filter) {
        return filter(valueToMatch, trimmed);
      }
      return valueToMatch.toLowerCase().includes(trimmed.toLowerCase());
    },
    [filter, query],
  );

  const recomputeCounts = React.useCallback(() => {
    const values = Array.from(itemsRef.current.values());
    setVisibleCount(values.filter(Boolean).length);
  }, []);

  const registerItem = React.useCallback(
    (id: string) => {
      itemsRef.current.set(id, false);
      recomputeCounts();
    },
    [recomputeCounts],
  );

  const unregisterItem = React.useCallback(
    (id: string) => {
      itemsRef.current.delete(id);
      recomputeCounts();
    },
    [recomputeCounts],
  );

  const updateItemVisibility = React.useCallback(
    (id: string, visible: boolean) => {
      if (!itemsRef.current.has(id)) return;
      itemsRef.current.set(id, visible);
      recomputeCounts();
    },
    [recomputeCounts],
  );

  return (
    <CommandMenuContext.Provider
      value={{
        query,
        setQuery,
        matches,
        registerItem,
        unregisterItem,
        updateItemVisibility,
        visibleCount,
      }}
    >
      <div
        className={cn(
          "w-full rounded-2xl border border-border bg-card text-card-foreground shadow-lg",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </CommandMenuContext.Provider>
  );
}

export interface CommandMenuInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const CommandMenuInput = React.forwardRef<
  HTMLInputElement,
  CommandMenuInputProps
>(({ className, icon, onChange, ...props }, ref) => {
  const { query, setQuery } = useCommandMenuContext();

  return (
    <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
      <span className="text-muted-foreground">{icon ?? <Search size={16} />}</span>
      <input
        ref={ref}
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          onChange?.(event);
        }}
        className={cn(
          "w-full bg-transparent text-sm text-foreground outline-none",
          "placeholder:text-muted-foreground",
          className,
        )}
        {...props}
      />
    </div>
  );
});

CommandMenuInput.displayName = "CommandMenuInput";

export interface CommandMenuListProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const CommandMenuList = React.forwardRef<
  HTMLDivElement,
  CommandMenuListProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="listbox"
    className={cn("max-h-80 overflow-y-auto px-2 py-2", className)}
    {...props}
  />
));

CommandMenuList.displayName = "CommandMenuList";

export interface CommandMenuGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  heading?: string;
}

export const CommandMenuGroup = React.forwardRef<
  HTMLDivElement,
  CommandMenuGroupProps
>(({ className, heading, children, ...props }, ref) => (
  <div
    ref={ref}
    role="group"
    className={cn("space-y-2 px-2 py-2", className)}
    {...props}
  >
    {heading ? (
      <p className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {heading}
      </p>
    ) : null}
    <div className="space-y-1">{children}</div>
  </div>
));

CommandMenuGroup.displayName = "CommandMenuGroup";

export interface CommandMenuItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSelect"> {
  value: string;
  onSelect?: (value: string) => void;
  leftIcon?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

export const CommandMenuItem = React.forwardRef<
  HTMLButtonElement,
  CommandMenuItemProps
>(
  (
    {
      className,
      value,
      leftIcon,
      rightSlot,
      onSelect,
      onClick,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
  const id = React.useId();
  const { matches, registerItem, unregisterItem, updateItemVisibility } =
    useCommandMenuContext();

  const isVisible = matches(value);

  React.useEffect(() => {
    registerItem(id);
    return () => unregisterItem(id);
  }, [id, registerItem, unregisterItem]);

  React.useEffect(() => {
    updateItemVisibility(id, isVisible);
  }, [id, isVisible, updateItemVisibility]);

  return (
    <button
      ref={ref}
      type="button"
      role="option"
      aria-selected={false}
      aria-disabled={disabled}
      data-hidden={!isVisible}
      className={cn(
        "flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-sm",
        "text-foreground transition",
        "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        "disabled:pointer-events-none disabled:opacity-50",
        !isVisible && "hidden",
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && !disabled) {
          onSelect?.(value);
        }
      }}
      {...props}
    >
      <span className="inline-flex items-center gap-2">
        {leftIcon ? (
          <span className="text-muted-foreground">{leftIcon}</span>
        ) : null}
        <span>{children}</span>
      </span>
      {rightSlot}
    </button>
  );
});

CommandMenuItem.displayName = "CommandMenuItem";

export interface CommandMenuShortcutProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

export function CommandMenuShortcut({ className, ...props }: CommandMenuShortcutProps) {
  return (
    <span
      className={cn(
        "rounded-md border border-border/60 bg-background/60 px-2 py-0.5 text-xs text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export interface CommandMenuSeparatorProps
  extends React.HTMLAttributes<HTMLHRElement> {}

export function CommandMenuSeparator({ className, ...props }: CommandMenuSeparatorProps) {
  return (
    <hr
      className={cn("my-2 border-border/60", className)}
      {...props}
    />
  );
}

export interface CommandMenuEmptyProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function CommandMenuEmpty({ className, ...props }: CommandMenuEmptyProps) {
  const { visibleCount } = useCommandMenuContext();

  if (visibleCount > 0) {
    return null;
  }

  return (
    <p
      className={cn(
        "px-4 py-6 text-center text-sm text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
