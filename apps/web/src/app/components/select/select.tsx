"use client";

import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useCallback,
  useContext,
  createContext,
  useMemo,
  useId,
  useSyncExternalStore,
  forwardRef,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// ── Icons

type IconProps = React.SVGProps<SVGSVGElement>;

const CheckIcon = ({ className, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    className={className}
    {...props}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 6L9 17l-5-5"
    />
  </svg>
);

// Animated double-chevron
const ChevronToggleIcon = ({
  open,
  duration = 0.3,
  ...props
}: IconProps & { open?: boolean; duration?: number }) => {
  const state = open ? "animate" : "normal";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden
      {...props}
    >
      <motion.path
        initial={false}
        animate={state}
        transition={{ duration }}
        variants={{
          normal: { d: "M7 15L12 20L17 15" },
          animate: { d: "M7 20L12 15L17 20" },
        }}
      />
      <motion.path
        initial={false}
        animate={state}
        transition={{ duration }}
        variants={{
          normal: { d: "M7 9L12 4L17 9" },
          animate: { d: "M7 4L12 9L17 4" },
        }}
      />
    </svg>
  );
};

// ── Types

export type SelectOption = {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
};

type Placement = "top" | "bottom";

interface DropdownStyle {
  top: number;
  left: number;
  width: number;
  position: "absolute" | "fixed";
  zIndex: number;
}

// ── Constants

const SPACING = 5; // gap between trigger and popup
const MIN_TOP_PADDING = 5; // min distance from viewport top when flipped
const MIN_SIDE_PADDING = 8; // min distance from viewport left/right edges
const OPEN_ANIMATION_MS = 180; // popup reveal duration
const CLOSE_ANIMATION_MS = 220; // popup dismiss duration + unmount delay (kept equal)
const DEFAULT_POPUP_WIDTH = 280; // fallback width before the trigger is measured
const ESTIMATED_POPUP_HEIGHT = 280; // pre-open height guess used to pick a side
const BASE_Z_INDEX = 9999; // popup stacking outside a dialog
const MODAL_Z_INDEX = 100000; // popup stacking when rendered inside a dialog
const SEARCH_FOCUS_DELAY_MS = 60; // delay before focusing the in-list search input
const CHEVRON_DURATION = 0.15; // chevron morph duration (seconds)
const TYPEAHEAD_RESET_MS = 500; // idle gap that resets the type-to-select buffer

// ── Highlight store
//
// The "active" option changes on every arrow key, hover, and typeahead match —
// the hottest piece of state in the component. Keeping it in React state would
// re-render every consumer (i.e. every option) on each change. Instead it lives
// in a tiny external store so options subscribe individually and only the two
// rows whose highlight actually flips re-render. As a bonus, reads via `get()`
// are always current, so the keyboard handler never sees a stale closure value.

interface HighlightStore {
  subscribe: (cb: () => void) => () => void;
  get: () => string;
  set: (next: string | ((prev: string) => string)) => void;
}

function useHighlightStore(): HighlightStore {
  const valueRef = useRef("");
  const listenersRef = useRef<Set<() => void>>(new Set());

  return useMemo<HighlightStore>(
    () => ({
      subscribe(cb) {
        listenersRef.current.add(cb);
        return () => {
          listenersRef.current.delete(cb);
        };
      },
      get: () => valueRef.current,
      set(next) {
        const value =
          typeof next === "function" ? next(valueRef.current) : next;
        if (value === valueRef.current) return;
        valueRef.current = value;
        listenersRef.current.forEach((l) => l());
      },
    }),
    [],
  );
}

// ── Context
//
// Split into two providers so the option rows are shielded from the churniest
// state. The main context holds stable callbacks/ids plus the rarely-changing
// selection + search; the position context holds the per-scroll/per-resize
// layout values consumed only by the popup itself. Result: scrolling while open
// repositions the popup without re-rendering any of the options.

interface SelectContextType {
  selectedValue: string;
  searchQuery: string;
  updateSearchQuery: (q: string) => void;
  isOpen: boolean;
  highlight: HighlightStore;
  triggerRef: React.RefObject<HTMLDivElement | null>;
  portalRef: React.RefObject<HTMLDivElement | null>;
  listboxRef: React.RefObject<HTMLDivElement | null>;
  disabled?: boolean;
  selectId: string;
  labelId: string;
  helperId: string;
  errorId: string;
  popupId: string;
  openDropdown: () => void;
  closeDropdown: () => void;
  handleOptionSelect: (value: string) => void;
  resolvedPortalTarget: HTMLElement | null;
}

interface SelectPositionContextType {
  isVisible: boolean;
  placement: Placement;
  hasCoords: boolean;
  dropdownStyle: DropdownStyle;
}

const SelectContext = createContext<SelectContextType | null>(null);
const SelectPositionContext = createContext<SelectPositionContextType | null>(
  null,
);

function useSelectContext() {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error("Must be used within <Select>");
  return ctx;
}

function useSelectPosition() {
  const ctx = useContext(SelectPositionContext);
  if (!ctx) throw new Error("Must be used within <Select>");
  return ctx;
}

/** Subscribe to the full active value (used by the trigger's aria-activedescendant). */
function useHighlightValue(): string {
  const { highlight } = useSelectContext();
  return useSyncExternalStore(highlight.subscribe, highlight.get, () => "");
}

/** Subscribe to just "is this value active?" so a row re-renders only when its own flag flips. */
function useIsHighlighted(value: string): boolean {
  const { highlight } = useSelectContext();
  const getSnapshot = useCallback(
    () => highlight.get() === value,
    [highlight, value],
  );
  return useSyncExternalStore(highlight.subscribe, getSnapshot, () => false);
}

// ── Helpers

/**
 * Decides whether the popup opens below or above the trigger and the resulting
 * top offset. Shared by the pre-open estimate and the post-render measurement
 * so the flip logic lives in exactly one place.
 */
function resolveVerticalPlacement({
  rect,
  position,
  height,
  scrollY,
  viewportHeight,
  forced,
}: {
  rect: DOMRect;
  position: "absolute" | "fixed";
  height: number;
  scrollY: number;
  viewportHeight: number;
  // When set, skip auto-detection and keep this side. The side is decided once
  // on open and then locked, so scrolling repositions the popup without ever
  // flipping it to the other side.
  forced?: Placement;
}): { top: number; placement: Placement } {
  const isFixed = position === "fixed";
  const bottomPos = rect.bottom + (isFixed ? 0 : scrollY) + SPACING;
  const topPos = isFixed
    ? Math.max(MIN_TOP_PADDING, rect.top - height - SPACING)
    : Math.max(
        scrollY + MIN_TOP_PADDING,
        rect.top + scrollY - height - SPACING,
      );
  const spaceBelow = viewportHeight - (rect.bottom + SPACING);
  const spaceAbove = rect.top - SPACING;

  const useTop = forced
    ? forced === "top"
    : spaceBelow < height && spaceAbove >= height;

  return useTop
    ? { top: topPos, placement: "top" }
    : { top: bottomPos, placement: "bottom" };
}

/**
 * Keeps the popup inside the viewport horizontally. The popup tracks the
 * trigger's left edge, but a custom width or a trigger near the right edge can
 * push it off-screen, so clamp to the visible band.
 */
function clampLeft({
  left,
  width,
  position,
  viewportWidth,
  scrollX,
}: {
  left: number;
  width: number;
  position: "absolute" | "fixed";
  viewportWidth: number;
  scrollX: number;
}): number {
  const origin = position === "fixed" ? 0 : scrollX;
  const min = origin + MIN_SIDE_PADDING;
  const max = origin + viewportWidth - width - MIN_SIDE_PADDING;
  if (max < min) return min; // popup wider than viewport — pin to the left
  return Math.min(Math.max(left, min), max);
}

function getActualScrollY(): number {
  const bodyStyle = window.getComputedStyle(document.body);
  if (bodyStyle.position === "fixed") {
    const topValue = document.body.style.top;
    return topValue ? Math.abs(parseInt(topValue, 10)) : 0;
  }
  return window.scrollY;
}

/**
 * Builds a DOM-safe id for an option element. Option `value`s are arbitrary and
 * may contain spaces or other characters that are illegal in an `id` /
 * `aria-activedescendant` token, so we encode them. The same encoding is used
 * everywhere the id is produced or referenced, so they always match.
 */
function getOptionId(popupId: string, value: string): string {
  return `${popupId}-opt-${encodeURIComponent(value).replace(/%/g, "_")}`;
}

/** Case-insensitive match across label, value, and description. */
function matchesQuery(
  opt: { label: string; value: string; description?: string },
  query: string,
): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    opt.label.toLowerCase().includes(q) ||
    opt.value.toLowerCase().includes(q) ||
    (opt.description?.toLowerCase().includes(q) ?? false)
  );
}

function getVisibleOptions(
  listboxRef: React.RefObject<HTMLDivElement | null>,
): HTMLElement[] {
  return Array.from(
    listboxRef.current?.querySelectorAll<HTMLElement>(
      '[role="option"]:not([aria-disabled="true"])',
    ) ?? [],
  );
}

/** Shared DOM props for an option row — keeps SelectItem and custom renderers in sync. */
function useOptionDomProps(
  value: string,
  label: string,
  disabled: boolean | undefined,
  isSelected: boolean,
) {
  const { popupId, highlight, handleOptionSelect } = useSelectContext();
  return {
    id: getOptionId(popupId, value),
    "data-value": value,
    "data-label": label,
    role: "option" as const,
    "aria-selected": isSelected,
    "aria-disabled": disabled ?? undefined,
    tabIndex: -1,
    onClick: () => {
      if (!disabled) handleOptionSelect(value);
    },
    // Hover highlights, but we deliberately don't clear on mouse-leave: doing so
    // would wipe out a keyboard-set highlight the moment the pointer drifts off.
    onMouseEnter: () => {
      if (!disabled) highlight.set(value);
    },
  };
}

// ── Shared keyboard navigation
//
// One handler for every focusable surface that drives the listbox (the trigger
// button and any search input), so arrow/Home/End/Enter/Escape behave
// identically everywhere. `spaceSelects` lets the button select on Space while
// inputs keep Space as a typed character; `typeahead` enables type-to-select on
// the non-editable button; `onUnhandled` lets inputs stop propagation for
// normal typing.
function useListboxKeyHandler(opts?: {
  spaceSelects?: boolean;
  typeahead?: boolean;
  onUnhandled?: (e: React.KeyboardEvent) => void;
}) {
  const { listboxRef, highlight, handleOptionSelect, closeDropdown } =
    useSelectContext();
  const typeaheadRef = useRef({ buffer: "", timer: 0 });

  return (e: React.KeyboardEvent) => {
    const focusIndex = (index: number, items: HTMLElement[]) => {
      const el = items[index];
      if (!el) return;
      highlight.set(el.getAttribute("data-value") ?? "");
      el.scrollIntoView({ block: "nearest" });
    };
    const move = (dir: "down" | "up") => {
      const items = getVisibleOptions(listboxRef);
      if (!items.length) return;
      const current = highlight.get();
      const idx = items.findIndex(
        (el) => el.getAttribute("data-value") === current,
      );
      const next =
        dir === "down"
          ? idx < items.length - 1
            ? idx + 1
            : 0
          : idx > 0
            ? idx - 1
            : items.length - 1;
      focusIndex(next, items);
    };
    const selectHighlighted = () => {
      const current = highlight.get();
      if (current) handleOptionSelect(current);
    };
    const typeToSelect = (char: string) => {
      const ta = typeaheadRef.current;
      window.clearTimeout(ta.timer);
      ta.buffer += char.toLowerCase();
      ta.timer = window.setTimeout(() => {
        ta.buffer = "";
      }, TYPEAHEAD_RESET_MS);
      const items = getVisibleOptions(listboxRef);
      const match = items.find((el) =>
        (el.getAttribute("data-label") ?? el.textContent ?? "")
          .trim()
          .toLowerCase()
          .startsWith(ta.buffer),
      );
      if (match) {
        highlight.set(match.getAttribute("data-value") ?? "");
        match.scrollIntoView({ block: "nearest" });
      }
    };

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        closeDropdown();
        break;
      case "ArrowDown":
        e.preventDefault();
        move("down");
        break;
      case "ArrowUp":
        e.preventDefault();
        move("up");
        break;
      case "Home": {
        e.preventDefault();
        focusIndex(0, getVisibleOptions(listboxRef));
        break;
      }
      case "End": {
        e.preventDefault();
        const items = getVisibleOptions(listboxRef);
        focusIndex(items.length - 1, items);
        break;
      }
      case "Enter":
        e.preventDefault();
        selectHighlighted();
        break;
      case " ":
        if (opts?.spaceSelects) {
          e.preventDefault();
          selectHighlighted();
        } else {
          opts?.onUnhandled?.(e);
        }
        break;
      default:
        if (
          opts?.typeahead &&
          e.key.length === 1 &&
          !e.metaKey &&
          !e.ctrlKey &&
          !e.altKey
        ) {
          e.preventDefault();
          typeToSelect(e.key);
        } else {
          opts?.onUnhandled?.(e);
        }
    }
  };
}

// ── Select Root

interface SelectProps {
  children: ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onChange?: (event: { target: { value: string } }) => void;
  disabled?: boolean;
  id?: string;
  portalTarget?: HTMLElement | null;
}

function Select({
  children,
  value,
  defaultValue,
  onValueChange,
  onChange,
  disabled,
  id,
  portalTarget,
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? `select-${generatedId}`;
  const labelId = `${selectId}-label`;
  const helperId = `${selectId}-helper`;
  const errorId = `${selectId}-error`;
  const popupId = `${selectId}-popup`;

  const resolvedPortalTarget =
    portalTarget ?? (typeof document !== "undefined" ? document.body : null);

  const triggerRef = useRef<HTMLDivElement | null>(null);
  const portalRef = useRef<HTMLDivElement | null>(null);
  const listboxRef = useRef<HTMLDivElement | null>(null);

  // Pending timers for the open/close lifecycle. Tracked in refs so a quick
  // re-open can cancel an in-flight close (and vice versa) — otherwise the
  // deferred close reset fires on the freshly opened popup and tears it down.
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openRafRef = useRef<number | null>(null);

  const highlight = useHighlightStore();

  // Derive selectedValue: controlled when `value` prop is provided, uncontrolled otherwise
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const selectedValue = value !== undefined ? value : internalValue;

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [placement, setPlacement] = useState<Placement>("bottom");
  const [hasCoords, setHasCoords] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownStyle, setDropdownStyle] = useState<DropdownStyle>({
    top: 0,
    left: 0,
    width: 0,
    position: "absolute",
    zIndex: BASE_Z_INDEX,
  });

  // Refs mirror the latest committed values so the positioning layout effect
  // can compare against them without listing them as dependencies (which would
  // make the effect re-trigger itself — a cascading render). Synced in an
  // effect so we never write to a ref during render.
  const dropdownStyleRef = useRef(dropdownStyle);
  const placementRef = useRef(placement);
  // The chosen side is locked after the first measured layout pass so later
  // scroll/resize repositions never flip it. Reset to null on each open so the
  // next open detects fresh.
  const lockedPlacementRef = useRef<Placement | null>(null);
  useEffect(() => {
    dropdownStyleRef.current = dropdownStyle;
    placementRef.current = placement;
  }, [dropdownStyle, placement]);

  const updateSearchQuery = useCallback((q: string) => {
    // Highlight is reconciled against the filtered DOM by SelectContent's
    // effect, so we only own the query string here.
    setSearchQuery(q);
  }, []);

  const calculatePositionBase = useCallback(() => {
    if (!triggerRef.current) return null;
    const rect = triggerRef.current.getBoundingClientRect();
    const isInModal = !!triggerRef.current.closest('[role="dialog"]');
    let top: number, left: number, position: "absolute" | "fixed";
    if (isInModal) {
      top = rect.bottom;
      left = rect.left;
      position = "fixed";
    } else {
      const scrollY = getActualScrollY();
      top = rect.bottom + scrollY;
      left = rect.left + window.scrollX;
      position = "absolute";
    }
    return { rect, top, left, position, isInModal };
  }, []);

  const calculatePosition = useCallback(
    (estimatedHeight = ESTIMATED_POPUP_HEIGHT) => {
      const base = calculatePositionBase();
      if (!base) return;
      const { rect, left, position, isInModal } = base;
      const scrollY = position === "fixed" ? 0 : getActualScrollY();
      const viewportHeight = window.innerHeight;
      // Clamp the estimate to whatever space is actually available so a guessed
      // height never forces an awkward flip; the measured pass corrects it.
      const spaceBelow = viewportHeight - (rect.bottom + SPACING);
      const spaceAbove = rect.top - SPACING;
      const height = Math.min(
        estimatedHeight,
        Math.max(spaceBelow, spaceAbove) - SPACING,
      );

      const { top, placement } = resolveVerticalPlacement({
        rect,
        position,
        height,
        scrollY,
        viewportHeight,
        forced: lockedPlacementRef.current ?? undefined,
      });

      const width = rect.width || DEFAULT_POPUP_WIDTH;

      setDropdownStyle({
        top,
        left: clampLeft({
          left,
          width,
          position,
          viewportWidth: window.innerWidth,
          scrollX: window.scrollX,
        }),
        width,
        position,
        zIndex: isInModal ? MODAL_Z_INDEX : BASE_Z_INDEX,
      });
      setPlacement(placement);
      setHasCoords(true);
    },
    [calculatePositionBase],
  );

  // Measured repositioning — the single source of truth once the popup is on
  // screen. Always measures the real popup element (not the inner listbox, whose
  // height excludes the popup's own padding/border); using the wrong height on a
  // top-placed popup would shift it down onto the trigger as the user scrolls.
  const applyMeasuredPosition = useCallback(() => {
    if (!portalRef.current || !triggerRef.current) return;
    const popupEl = portalRef.current;
    const base = calculatePositionBase();
    if (!base) return;
    const { rect, left, position, isInModal } = base;
    const scrollY = position === "fixed" ? 0 : getActualScrollY();

    const { top, placement: decided } = resolveVerticalPlacement({
      rect,
      position,
      height: popupEl.offsetHeight, // full popup height, incl. padding + border
      scrollY,
      viewportHeight: window.innerHeight,
      forced: lockedPlacementRef.current ?? undefined,
    });
    // Lock the side after this first measured pass — from now on every
    // reposition reuses it instead of re-detecting.
    lockedPlacementRef.current = decided;

    const width = rect.width || popupEl.offsetWidth || DEFAULT_POPUP_WIDTH;

    const newStyle: DropdownStyle = {
      top,
      left: clampLeft({
        left,
        width,
        position,
        viewportWidth: window.innerWidth,
        scrollX: window.scrollX,
      }),
      width,
      position,
      zIndex: isInModal ? MODAL_Z_INDEX : BASE_Z_INDEX,
    };

    const current = dropdownStyleRef.current;
    const styleChanged =
      current.top !== newStyle.top ||
      current.left !== newStyle.left ||
      current.width !== newStyle.width ||
      current.position !== newStyle.position ||
      current.zIndex !== newStyle.zIndex;

    if (styleChanged) setDropdownStyle(newStyle);
    if (placementRef.current !== decided) setPlacement(decided);
  }, [calculatePositionBase]);

  useLayoutEffect(() => {
    if (!isOpen) return;
    applyMeasuredPosition();
  }, [isOpen, isVisible, applyMeasuredPosition]);

  useEffect(() => {
    if (!isOpen) return;
    // rAF-throttle so a fast scroll/resize coalesces into one reposition per
    // frame instead of recomputing (and reading layout) on every event.
    let frame = 0;
    const handler = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        applyMeasuredPosition();
      });
    };
    window.addEventListener("scroll", handler, {
      capture: true,
      passive: true,
    });
    window.addEventListener("resize", handler);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handler, { capture: true });
      window.removeEventListener("resize", handler);
    };
  }, [isOpen, applyMeasuredPosition]);

  const openDropdown = useCallback(() => {
    if (disabled) return;
    // Cancel any in-flight close so a quick re-open isn't torn down by the
    // previous close's deferred state reset (the open/close race).
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    // Fresh side detection for this open; the layout pass re-locks it.
    lockedPlacementRef.current = null;
    calculatePosition(ESTIMATED_POPUP_HEIGHT);
    setIsOpen(true);
    setSearchQuery("");
    // Pre-highlight the current selection so keyboard nav starts from it.
    highlight.set(selectedValue);
    if (openRafRef.current !== null) cancelAnimationFrame(openRafRef.current);
    openRafRef.current = requestAnimationFrame(() => {
      openRafRef.current = null;
      setIsVisible(true);
    });
  }, [disabled, calculatePosition, selectedValue, highlight]);

  const closeDropdown = useCallback(() => {
    // Already closing — don't stack a second timer.
    if (closeTimerRef.current !== null) return;
    // Cancel a pending open-reveal frame so it can't flip visibility back on
    // after we've started closing.
    if (openRafRef.current !== null) {
      cancelAnimationFrame(openRafRef.current);
      openRafRef.current = null;
    }
    setIsVisible(false);
    closeTimerRef.current = setTimeout(() => {
      closeTimerRef.current = null;
      setIsOpen(false);
      setHasCoords(false);
      setSearchQuery("");
      highlight.set("");
      setDropdownStyle((s) => ({ ...s, top: 0, left: 0, width: 0 }));
      // Return focus to the trigger so keyboard users aren't dropped to <body>.
      triggerRef.current
        ?.querySelector<HTMLElement>('[role="combobox"]')
        ?.focus();
    }, CLOSE_ANIMATION_MS);
  }, [highlight]);

  // Flush any pending open/close timers on unmount so they never fire state
  // updates against a torn-down component.
  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) clearTimeout(closeTimerRef.current);
      if (openRafRef.current !== null) cancelAnimationFrame(openRafRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (
        portalRef.current &&
        !portalRef.current.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen, closeDropdown]);

  const handleOptionSelect = useCallback(
    (optionValue: string) => {
      if (value === undefined) setInternalValue(optionValue);
      onChange?.({ target: { value: optionValue } });
      onValueChange?.(optionValue);
      closeDropdown();
    },
    [value, onChange, onValueChange, closeDropdown],
  );

  const ctxValue = useMemo<SelectContextType>(
    () => ({
      selectedValue,
      searchQuery,
      updateSearchQuery,
      isOpen,
      highlight,
      triggerRef,
      portalRef,
      listboxRef,
      disabled,
      selectId,
      labelId,
      helperId,
      errorId,
      popupId,
      openDropdown,
      closeDropdown,
      handleOptionSelect,
      resolvedPortalTarget,
    }),
    [
      selectedValue,
      searchQuery,
      updateSearchQuery,
      isOpen,
      highlight,
      disabled,
      selectId,
      labelId,
      helperId,
      errorId,
      popupId,
      openDropdown,
      closeDropdown,
      handleOptionSelect,
      resolvedPortalTarget,
    ],
  );

  const positionValue = useMemo<SelectPositionContextType>(
    () => ({ isVisible, placement, hasCoords, dropdownStyle }),
    [isVisible, placement, hasCoords, dropdownStyle],
  );

  return (
    <SelectContext.Provider value={ctxValue}>
      <SelectPositionContext.Provider value={positionValue}>
        {children}
      </SelectPositionContext.Provider>
    </SelectContext.Provider>
  );
}

// ── SelectLabel

interface SelectLabelProps {
  children: ReactNode;
  className?: string;
  requiredSign?: boolean;
  required?: boolean;
}

function SelectLabel({
  children,
  className,
  requiredSign,
  required,
}: SelectLabelProps) {
  const { selectId, labelId } = useSelectContext();
  return (
    <label
      id={labelId}
      htmlFor={selectId}
      className={cn(
        "text-sm font-medium text-foreground cursor-pointer",
        className,
      )}
    >
      {children}
      {(requiredSign || required) && (
        <span className="ml-1 text-danger" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

// ── SelectTrigger

interface SelectTriggerProps {
  children?: ReactNode;
  className?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  fieldClass?: string;
  error?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
}

const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  (
    {
      children,
      className,
      startIcon,
      endIcon,
      fieldClass = "",
      error,
      searchable,
      searchPlaceholder = "Search...",
    },
    ref,
  ) => {
    const {
      isOpen,
      disabled,
      selectId,
      labelId,
      helperId,
      errorId,
      popupId,
      openDropdown,
      closeDropdown,
      triggerRef,
      searchQuery,
      updateSearchQuery,
    } = useSelectContext();
    const highlightedValue = useHighlightValue();

    // Editable (searchable) combobox: typing falls through to the input;
    // the button variant selects on Space and supports type-to-select.
    const handleSearchKeyDown = useListboxKeyHandler({
      onUnhandled: (e) => e.stopPropagation(),
    });
    const handleNavKeyDown = useListboxKeyHandler({
      spaceSelects: true,
      typeahead: true,
    });

    const onButtonKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;
      if (!isOpen) {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openDropdown();
        }
        return;
      }
      handleNavKeyDown(e);
    };

    // The active option drives the screen-reader announcement; it must live on
    // the focused combobox element, not the (unfocused) listbox.
    const activeDescendant =
      isOpen && highlightedValue
        ? getOptionId(popupId, highlightedValue)
        : undefined;

    const fieldClassName = cn(
      "flex h-10 w-full items-center justify-between",
      "rounded-md border border-border",
      "bg-background pl-3 pr-8 py-2",
      "text-sm transition-colors",
      "focus:outline-none focus-visible:ring focus-visible:ring-ring",
      "disabled:cursor-not-allowed disabled:opacity-50",
      error && "border-danger focus-visible:ring-danger",
      startIcon && "pl-10",
      fieldClass,
      className,
    );

    const comboboxAria = {
      id: selectId,
      role: "combobox" as const,
      "aria-labelledby": labelId,
      "aria-controls": isOpen ? popupId : undefined,
      "aria-expanded": isOpen,
      "aria-haspopup": "listbox" as const,
      "aria-invalid": !!error,
      "aria-describedby": error ? errorId : helperId,
      "aria-activedescendant": activeDescendant,
    };

    return (
      <div ref={triggerRef} className="relative">
        {startIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground z-10">
            {startIcon}
          </span>
        )}

        {/* Editable combobox is a sibling <input>, never an <input> nested
            inside a <button> (invalid HTML / broken focus). */}
        {isOpen && searchable ? (
          <input
            {...comboboxAria}
            autoFocus
            type="text"
            value={searchQuery}
            onChange={(e) => updateSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder={searchPlaceholder}
            className={cn(fieldClassName, "cursor-text")}
          />
        ) : (
          <button
            {...comboboxAria}
            type="button"
            disabled={disabled}
            onClick={() => (isOpen ? closeDropdown() : openDropdown())}
            onKeyDown={onButtonKeyDown}
            ref={ref}
            className={cn(fieldClassName, "cursor-pointer text-left")}
          >
            {children}
          </button>
        )}

        {/* Icon slot — animated double-chevron morphs on open */}
        <span className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center pointer-events-none text-muted-foreground">
          {endIcon ? (
            endIcon
          ) : (
            <ChevronToggleIcon
              open={isOpen}
              duration={CHEVRON_DURATION}
              className={cn("size-4 shrink-0", isOpen && "text-foreground")}
            />
          )}
        </span>
      </div>
    );
  },
);

SelectTrigger.displayName = "SelectTrigger";

// ── SelectValue

interface SelectValueProps {
  placeholder?: string;
  options?: SelectOption[];
  className?: string;
}

function SelectValue({
  placeholder = "Select an option",
  options = [],
  className,
}: SelectValueProps) {
  const { selectedValue } = useSelectContext();
  const selectedOption = options.find((o) => o.value === selectedValue);
  return (
    <span
      className={cn(
        "truncate flex-1 text-left",
        selectedOption ? "text-foreground" : "text-muted-foreground",
        className,
      )}
    >
      {selectedOption?.label ?? placeholder}
    </span>
  );
}

// ── SelectSearch

interface SelectSearchProps {
  placeholder?: string;
  className?: string;
}

function SelectSearch({
  placeholder = "Search...",
  className,
}: SelectSearchProps) {
  const { searchQuery, updateSearchQuery } = useSelectContext();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(
      () => inputRef.current?.focus(),
      SEARCH_FOCUS_DELAY_MS,
    );
    return () => clearTimeout(t);
  }, []);

  const onKeyDown = useListboxKeyHandler({
    onUnhandled: (e) => e.stopPropagation(),
  });

  return (
    <div className="px-1 pb-1.5">
      <input
        ref={inputRef}
        type="text"
        value={searchQuery}
        onChange={(e) => updateSearchQuery(e.target.value)}
        onKeyDown={onKeyDown}
        onClick={(e) => e.stopPropagation()}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-md border border-border bg-muted/50 px-3 py-1.5",
          "text-sm placeholder:text-muted-foreground",
          "focus:outline-none focus-visible:ring focus-visible:ring-ring",
          className,
        )}
      />
    </div>
  );
}

// ── SelectContent

interface SelectContentProps {
  children: ReactNode;
  className?: string;
}

function SelectContent({ children, className }: SelectContentProps) {
  const {
    isOpen,
    searchQuery,
    highlight,
    resolvedPortalTarget,
    portalRef,
    listboxRef,
    labelId,
    popupId,
  } = useSelectContext();
  const { isVisible, placement, hasCoords, dropdownStyle } =
    useSelectPosition();

  // After the list re-renders for a new query, make sure the active option is
  // still on screen — otherwise highlight the first match so Enter has a target
  // and aria-activedescendant never points at a filtered-out row.
  useEffect(() => {
    if (!isOpen) return;
    const frame = requestAnimationFrame(() => {
      const items = getVisibleOptions(listboxRef);
      const current = highlight.get();
      const stillVisible = items.some(
        (el) => el.getAttribute("data-value") === current,
      );
      if (!stillVisible) {
        highlight.set(items[0]?.getAttribute("data-value") ?? "");
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [searchQuery, isOpen, highlight, listboxRef]);

  if (
    !resolvedPortalTarget ||
    !isOpen ||
    !(hasCoords && dropdownStyle.width > 0)
  )
    return null;

  // Shadcn-style reveal: the popup grows from the edge nearest the trigger and
  // slides in from that side. When placed on top (opening upward) it enters
  // from below (+y) and is anchored at its bottom edge; when placed on bottom
  // it enters from above (-y) and is anchored at its top edge. `isVisible`
  // drives both the open and close transitions — the popup stays mounted for
  // CLOSE_ANIMATION_MS so the exit animation can play before unmount.
  const hidden = {
    opacity: 0,
    scale: 0.95,
    y: placement === "top" ? 8 : -8,
  };

  return createPortal(
    // aria-activedescendant lives on the focused combobox (trigger/search
    // input), not here — the listbox itself never holds focus.
    <motion.div
      ref={portalRef}
      id={popupId}
      role="listbox"
      aria-labelledby={labelId}
      data-placement={placement}
      initial={false}
      animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : hidden}
      transition={
        isVisible
          ? { duration: OPEN_ANIMATION_MS / 1000, ease: [0.16, 1, 0.3, 1] }
          : { duration: CLOSE_ANIMATION_MS / 1000, ease: [0.4, 0, 0.2, 1] }
      }
      style={{
        ...dropdownStyle,
        transformOrigin: placement === "top" ? "bottom left" : "top left",
      }}
      className={cn(
        "rounded-md border border-border bg-background text-card-foreground shadow-lg p-1.5 will-change-transform",
        className,
      )}
    >
      <div
        ref={listboxRef}
        className="max-h-60 overflow-y-auto sideBar rounded-sm space-y-0.5"
      >
        {children}
      </div>
    </motion.div>,
    resolvedPortalTarget,
  );
}

// ── SelectItem

interface SelectItemProps {
  value: string;
  children?: ReactNode;
  description?: string;
  disabled?: boolean;
  className?: string;
}

function SelectItem({
  value,
  children,
  description,
  disabled: itemDisabled,
  className,
}: SelectItemProps) {
  const { selectedValue, searchQuery } = useSelectContext();

  const label = typeof children === "string" ? children : value;
  const isSelected = selectedValue === value;
  const isHighlighted = useIsHighlighted(value);
  const domProps = useOptionDomProps(value, label, itemDisabled, isSelected);

  // Hooks must run unconditionally, so filter after they're called.
  if (!matchesQuery({ label, value, description }, searchQuery)) return null;

  return (
    <div
      {...domProps}
      className={cn(
        "w-full flex items-center justify-between",
        "rounded px-3 py-2 text-sm select-none",
        "transition-colors cursor-pointer",
        isSelected && "bg-muted ",
        !isSelected && isHighlighted && "bg-muted",
        !isSelected && !isHighlighted && "text-foreground/90",
        itemDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className,
      )}
    >
      <div className="flex items-center gap-2 truncate">
        <span className="truncate">{children ?? value}</span>
        {description && (
          <span className="text-xs text-muted-foreground shrink-0">
            {description}
          </span>
        )}
      </div>
      {isSelected && <CheckIcon className="size-4 shrink-0 ml-2" />}
    </div>
  );
}

// ── SelectItems (array-based helper with built-in filtering + empty state)

interface SelectItemsProps {
  options: SelectOption[];
  emptyText?: string;
  optionRenderer?: (
    option: SelectOption,
    isSelected: boolean,
    isHighlighted: boolean,
  ) => ReactNode;
}

/** Wrapper used only for the custom-renderer path; shares option DOM props with SelectItem. */
function CustomOption({
  option,
  optionRenderer,
}: {
  option: SelectOption;
  optionRenderer: NonNullable<SelectItemsProps["optionRenderer"]>;
}) {
  const { selectedValue } = useSelectContext();
  const isSelected = selectedValue === option.value;
  const isHighlighted = useIsHighlighted(option.value);
  const domProps = useOptionDomProps(
    option.value,
    option.label,
    option.disabled,
    isSelected,
  );
  return (
    <div {...domProps}>{optionRenderer(option, isSelected, isHighlighted)}</div>
  );
}

function SelectItems({
  options,
  emptyText = "No results found",
  optionRenderer,
}: SelectItemsProps) {
  const { searchQuery } = useSelectContext();

  const filtered = useMemo(
    () => options.filter((o) => matchesQuery(o, searchQuery)),
    [options, searchQuery],
  );

  if (filtered.length === 0) {
    return (
      <div className="px-3 py-2 text-sm text-muted-foreground">{emptyText}</div>
    );
  }

  return (
    <>
      {filtered.map((option) =>
        optionRenderer ? (
          <CustomOption
            key={option.value}
            option={option}
            optionRenderer={optionRenderer}
          />
        ) : (
          <SelectItem
            key={option.value}
            value={option.value}
            description={option.description}
            disabled={option.disabled}
          >
            {option.label}
          </SelectItem>
        ),
      )}
    </>
  );
}

// ── SelectGroup

interface SelectGroupProps {
  children: ReactNode;
  label?: string;
  className?: string;
}

function SelectGroup({ children, label, className }: SelectGroupProps) {
  const generatedId = useId();
  const groupLabelId = label ? `select-group-${generatedId}` : undefined;
  return (
    <div
      role="group"
      aria-labelledby={groupLabelId}
      className={cn("py-1", className)}
    >
      {label && (
        <div
          id={groupLabelId}
          className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
        >
          {label}
        </div>
      )}
      {children}
    </div>
  );
}

// ── SelectSeparator

function SelectSeparator({ className }: { className?: string }) {
  return (
    <div
      role="separator"
      className={cn("my-1 h-px bg-border mx-1", className)}
    />
  );
}

// ── SelectField (label + trigger slot + helper/error)

interface SelectFieldProps {
  children: ReactNode;
  label?: string;
  helperText?: string;
  error?: string;
  className?: string;
  fullWidth?: boolean;
  requiredSign?: boolean;
  required?: boolean;
}

function SelectField({
  children,
  label,
  helperText,
  error,
  className,
  fullWidth,
  requiredSign,
  required,
}: SelectFieldProps) {
  const { helperId, errorId } = useSelectContext();
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5",
        fullWidth ? "w-full" : "",
        className,
      )}
    >
      {label && (
        <SelectLabel requiredSign={requiredSign} required={required}>
          {label}
        </SelectLabel>
      )}
      {children}
      {helperText && !error && (
        <p id={helperId} className="text-xs text-muted-foreground">
          {helperText}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs font-medium text-danger"
        >
          {error}
        </p>
      )}
    </div>
  );
}

// ── Display names

Select.displayName = "Select";
SelectLabel.displayName = "SelectLabel";
SelectValue.displayName = "SelectValue";
SelectSearch.displayName = "SelectSearch";
SelectContent.displayName = "SelectContent";
SelectItem.displayName = "SelectItem";
SelectItems.displayName = "SelectItems";
SelectGroup.displayName = "SelectGroup";
SelectSeparator.displayName = "SelectSeparator";
SelectField.displayName = "SelectField";

export {
  Select,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectSearch,
  SelectContent,
  SelectItem,
  SelectItems,
  SelectGroup,
  SelectSeparator,
  SelectField,
};
