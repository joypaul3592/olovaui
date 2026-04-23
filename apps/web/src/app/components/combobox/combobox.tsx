"use client";

import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ComboboxValue = string | string[] | undefined | null;

type ComboboxContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  query: string;
  setQuery: (value: string) => void;
  multiple: boolean;
  selectedValues: string[];
  selectedLabels: string[];
  listId: string;
  matches: (value: string, label: string) => boolean;
  registerOption: (value: string, label: string) => void;
  unregisterOption: (value: string) => void;
  updateVisibility: (value: string, visible: boolean) => void;
  visibleCount: number;
  isSelected: (value: string) => boolean;
  selectValue: (value: string, label: string) => void;
  clear: () => void;
};

const ComboboxContext = React.createContext<ComboboxContextValue | null>(null);

function useComboboxContext() {
  const context = React.useContext(ComboboxContext);
  if (!context) {
    throw new Error("Combobox components must be used within <Combobox>.");
  }
  return context;
}

export interface ComboboxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "value"> {
  value?: ComboboxValue;
  defaultValue?: ComboboxValue;
  onValueChange?: (value: string | string[]) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  multiple?: boolean;
  filter?: (value: string, search: string, label: string) => boolean;
  render?: (props: {
    open: boolean;
    setOpen: (open: boolean) => void;
    value: string | string[];
    selectedLabels: string[];
  }) => React.ReactNode;
}

function normalizeValue(value: ComboboxValue, multiple: boolean) {
  if (multiple) {
    if (Array.isArray(value)) return value;
    if (typeof value === "string") return value ? [value] : [];
    return [];
  }
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export function Combobox({
  value,
  defaultValue,
  onValueChange,
  open,
  defaultOpen = false,
  onOpenChange,
  multiple = false,
  filter,
  render,
  className,
  children,
  ...props
}: ComboboxProps) {
  const isValueControlled = value !== undefined;
  const isOpenControlled = open !== undefined;

  const [internalValue, setInternalValue] = React.useState<ComboboxValue>(
    defaultValue ?? (multiple ? [] : ""),
  );
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const [query, setQuery] = React.useState("");

  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const listId = React.useId();
  const [optionsMap, setOptionsMap] = React.useState<Map<string, string>>(
    () => new Map(),
  );
  const visibilityRef = React.useRef<Map<string, boolean>>(new Map());
  const [visibleCount, setVisibleCount] = React.useState(0);

  const normalizedValue = normalizeValue(
    isValueControlled ? value : internalValue,
    multiple,
  );

  const selectedValues = React.useMemo(() => {
    return multiple
      ? (normalizedValue as string[])
      : [(normalizedValue as string) || ""].filter(Boolean);
  }, [multiple, normalizedValue]);

  const selectedLabels = React.useMemo(() => {
    return selectedValues.map(
      (val) => optionsMap.get(val) ?? val,
    );
  }, [optionsMap, selectedValues]);

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isOpenControlled) {
        setInternalOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isOpenControlled, onOpenChange],
  );

  const updateVisibleCount = React.useCallback(() => {
    const values = Array.from(visibilityRef.current.values());
    setVisibleCount(values.filter(Boolean).length);
  }, []);

  const setSelectedValues = React.useCallback(
    (nextValues: string[]) => {
      if (!isValueControlled) {
        setInternalValue(multiple ? nextValues : nextValues[0] ?? "");
      }
      onValueChange?.(multiple ? nextValues : nextValues[0] ?? "");
    },
    [isValueControlled, multiple, onValueChange],
  );

  const matches = React.useCallback(
    (valueToMatch: string, label: string) => {
      const trimmed = query.trim();
      if (!trimmed) return true;
      if (filter) {
        return filter(valueToMatch, trimmed, label);
      }
      return (
        label.toLowerCase().includes(trimmed.toLowerCase()) ||
        valueToMatch.toLowerCase().includes(trimmed.toLowerCase())
      );
    },
    [filter, query],
  );

  const setOptionLabel = React.useCallback((optionValue: string, label: string) => {
    setOptionsMap((prev) => {
      const existing = prev.get(optionValue);
      if (existing === label) return prev;
      const next = new Map(prev);
      next.set(optionValue, label);
      return next;
    });
  }, []);

  const removeOptionLabel = React.useCallback((optionValue: string) => {
    setOptionsMap((prev) => {
      if (!prev.has(optionValue)) return prev;
      const next = new Map(prev);
      next.delete(optionValue);
      return next;
    });
  }, []);

  const registerOption = React.useCallback(
    (optionValue: string, label: string) => {
      setOptionLabel(optionValue, label);
      visibilityRef.current.set(optionValue, true);
      if (
        !multiple &&
        selectedValues[0] === optionValue &&
        !(isOpenControlled ? open : internalOpen)
      ) {
        setQuery(label);
      }
      updateVisibleCount();
    },
    [
      internalOpen,
      isOpenControlled,
      multiple,
      open,
      selectedValues,
      setOptionLabel,
      updateVisibleCount,
    ],
  );

  const unregisterOption = React.useCallback(
    (optionValue: string) => {
      removeOptionLabel(optionValue);
      visibilityRef.current.delete(optionValue);
      updateVisibleCount();
    },
    [removeOptionLabel, updateVisibleCount],
  );

  const updateVisibility = React.useCallback(
    (optionValue: string, visible: boolean) => {
      if (!visibilityRef.current.has(optionValue)) return;
      visibilityRef.current.set(optionValue, visible);
      updateVisibleCount();
    },
    [updateVisibleCount],
  );

  const isSelected = React.useCallback(
    (optionValue: string) => selectedValues.includes(optionValue),
    [selectedValues],
  );

  const selectValue = React.useCallback(
    (optionValue: string, label: string) => {
      if (multiple) {
        const nextValues = selectedValues.includes(optionValue)
          ? selectedValues.filter((item) => item !== optionValue)
          : [...selectedValues, optionValue];
        setSelectedValues(nextValues);
        setQuery("");
      } else {
        setSelectedValues([optionValue]);
        setQuery(label);
        setOpen(false);
      }
    },
    [multiple, selectedValues, setSelectedValues, setOpen],
  );

  const clear = React.useCallback(() => {
    setSelectedValues([]);
    setQuery("");
  }, [setSelectedValues]);

  React.useEffect(() => {
    if (multiple || (isOpenControlled ? open : internalOpen)) return;
    const selected = selectedValues[0];
    if (!selected) {
      setQuery("");
      return;
    }
    const label = optionsMap.get(selected) ?? selected;
    setQuery(label);
  }, [internalOpen, isOpenControlled, multiple, open, optionsMap, selectedValues]);

  React.useEffect(() => {
    const isOpen = isOpenControlled ? open : internalOpen;
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current) return;
      if (rootRef.current.contains(event.target as Node)) return;
      setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [internalOpen, isOpenControlled, open, setOpen]);

  return (
    <ComboboxContext.Provider
      value={{
        open: isOpenControlled ? open ?? false : internalOpen,
        setOpen,
        query,
        setQuery,
        multiple,
        selectedValues,
        selectedLabels,
        listId,
        matches,
        registerOption,
        unregisterOption,
        updateVisibility,
        visibleCount,
        isSelected,
        selectValue,
        clear,
      }}
    >
      <div
        ref={rootRef}
        className={cn("relative w-full", className)}
        {...props}
      >
        {render
          ? render({
              open: isOpenControlled ? open ?? false : internalOpen,
              setOpen,
              value: multiple ? selectedValues : selectedValues[0] ?? "",
              selectedLabels,
            })
          : null}
        {children}
      </div>
    </ComboboxContext.Provider>
  );
}

export interface ComboboxInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showClear?: boolean;
  containerClassName?: string;
  children?: React.ReactNode;
}

export const ComboboxInput = React.forwardRef<
  HTMLInputElement,
  ComboboxInputProps
>(
  (
    {
      className,
      containerClassName,
      showClear = false,
      children,
      onFocus,
      onClick: onInputClick,
      onChange,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const {
      open,
      setOpen,
      query,
      setQuery,
      multiple,
      selectedValues,
      listId,
      clear,
    } = useComboboxContext();

    const hasValue = query.length > 0 || selectedValues.length > 0;

    const inputRef = React.useRef<HTMLInputElement | null>(null);

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    return (
      <div
        className={cn(
          "flex min-h-11 w-full items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm text-foreground shadow-sm",
          "focus-within:ring-2 focus-within:ring-ring/40",
          "transition",
          multiple && "flex-wrap py-2",
          containerClassName,
        )}
        onMouseDown={(event) => {
          const target = event.target as HTMLElement;
          if (target.tagName === "BUTTON" || target.tagName === "INPUT") return;
          event.preventDefault();
          inputRef.current?.focus();
        }}
        onClick={() => {
          setOpen(true);
        }}
      >
        {children}
        <input
          ref={inputRef}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-controls={listId}
          value={query}
          onFocus={(event) => {
            setOpen(true);
            onFocus?.(event);
          }}
          onChange={(event) => {
            setQuery(event.target.value);
            onChange?.(event);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false);
            }
            if (event.key === "ArrowDown") {
              setOpen(true);
            }
            onKeyDown?.(event);
          }}
          onClick={(event) => {
            onInputClick?.(event);
            if (!event.defaultPrevented) {
              setOpen(true);
            }
          }}
          className={cn(
            "min-w-[6rem] flex-1 bg-transparent text-sm outline-none",
            "placeholder:text-muted-foreground",
            className,
          )}
          {...props}
        />
        {showClear && hasValue ? (
          <button
            type="button"
            className="rounded-full p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            aria-label="Clear selection"
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              clear();
            }}
          >
            <X size={14} />
          </button>
        ) : null}
        <span className="text-muted-foreground">
          <ChevronDown size={16} />
        </span>
      </div>
    );
  },
);

ComboboxInput.displayName = "ComboboxInput";

export interface ComboboxContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const ComboboxContent = React.forwardRef<
  HTMLDivElement,
  ComboboxContentProps
>(({ className, ...props }, ref) => {
  const { open } = useComboboxContext();

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-card shadow-xl",
        className,
      )}
      {...props}
    />
  );
});

ComboboxContent.displayName = "ComboboxContent";

export interface ComboboxListProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const ComboboxList = React.forwardRef<
  HTMLDivElement,
  ComboboxListProps
>(({ className, ...props }, ref) => {
  const { listId } = useComboboxContext();

  return (
    <div
      ref={ref}
      id={listId}
      role="listbox"
      className={cn("max-h-64 overflow-y-auto p-2", className)}
      {...props}
    />
  );
});

ComboboxList.displayName = "ComboboxList";

export interface ComboboxItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  label?: string;
}

export const ComboboxItem = React.forwardRef<
  HTMLButtonElement,
  ComboboxItemProps
>(
  ({ value, label, className, disabled, children, onClick, ...props }, ref) => {
    const {
      matches,
      registerOption,
      unregisterOption,
      updateVisibility,
      isSelected,
      selectValue,
    } = useComboboxContext();

    const resolvedLabel = React.useMemo(() => {
      if (label) return label;
      if (typeof children === "string") return children;
      return value;
    }, [children, label, value]);

    const visible = matches(value, resolvedLabel);
    const selected = isSelected(value);

    React.useEffect(() => {
      registerOption(value, resolvedLabel);
      return () => unregisterOption(value);
    }, [registerOption, resolvedLabel, unregisterOption, value]);

    React.useEffect(() => {
      updateVisibility(value, visible);
    }, [updateVisibility, value, visible]);

    return (
      <button
        ref={ref}
        type="button"
        role="option"
        aria-selected={selected}
        aria-disabled={disabled}
        data-selected={selected}
        data-hidden={!visible}
        className={cn(
          "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm",
          "text-foreground transition",
          "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
          "disabled:pointer-events-none disabled:opacity-50",
          !visible && "hidden",
          className,
        )}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented && !disabled) {
            selectValue(value, resolvedLabel);
          }
        }}
        {...props}
      >
        <span className="inline-flex items-center gap-2">{children}</span>
        {selected ? <Check size={16} className="text-muted-foreground" /> : null}
      </button>
    );
  },
);

ComboboxItem.displayName = "ComboboxItem";

export interface ComboboxEmptyProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function ComboboxEmpty({ className, ...props }: ComboboxEmptyProps) {
  const { visibleCount } = useComboboxContext();

  if (visibleCount > 0) {
    return null;
  }

  return (
    <p
      className={cn(
        "px-3 py-6 text-center text-sm text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export interface ComboboxChipsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function ComboboxChips({ className, ...props }: ComboboxChipsProps) {
  const { selectedValues, selectedLabels, selectValue } = useComboboxContext();

  if (selectedValues.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)} {...props}>
      {selectedValues.map((value, index) => (
        <span
          key={value}
          className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-muted px-3 py-1 text-xs"
        >
          <span>{selectedLabels[index]}</span>
          <button
            type="button"
            className="rounded-full p-0.5 text-muted-foreground transition hover:text-foreground"
            aria-label={`Remove ${selectedLabels[index] ?? value}`}
            onClick={(event) => {
              event.preventDefault();
              selectValue(value, selectedLabels[index] ?? value);
            }}
          >
            <X size={12} />
          </button>
        </span>
      ))}
    </div>
  );
}
