"use client";
import { ScrollArea } from "@/components/layout/scroll-area";
import { navigation, type NavigationItem } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback, useMemo, useSyncExternalStore } from "react";

const useCurrentPath = () => {
  const pathname = usePathname();
  const normalizedPathname =
    pathname.endsWith("/") && pathname !== "/"
      ? pathname.slice(0, -1)
      : pathname;
  return normalizedPathname;
};

// Module-level listener management for persisted state
const storageListeners = new Map<string, Set<() => void>>();

function getStorageListeners(key: string) {
  if (!storageListeners.has(key)) {
    storageListeners.set(key, new Set());
  }
  return storageListeners.get(key)!;
}

// Persistent state hook using useSyncExternalStore — avoids hydration mismatch
// and satisfies both react-hooks/set-state-in-effect and react-hooks/refs rules.
const usePersistedState = <T,>(
  key: string,
  defaultValue: T,
): [T, (value: T) => void] => {
  const serializedDefault = JSON.stringify(defaultValue);

  const subscribe = useCallback((callback: () => void) => {
    const listeners = getStorageListeners(key);
    listeners.add(callback);
    return () => {
      listeners.delete(callback);
    };
  }, [key]);

  const getSnapshot = useCallback(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ?? serializedDefault;
    } catch {
      return serializedDefault;
    }
  }, [key, serializedDefault]);

  const getServerSnapshot = useCallback(() => {
    return serializedDefault;
  }, [serializedDefault]);

  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const state: T = useMemo(() => {
    try { return JSON.parse(raw); } catch { return JSON.parse(serializedDefault); }
  }, [raw, serializedDefault]);

  const setValue = useCallback((value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    const listeners = getStorageListeners(key);
    for (const listener of listeners) listener();
  }, [key]);

  return [state, setValue];
};

interface MenuItem {
  label: string;
  href: string;
  badge?: string;
  badges?: string[];
  children?: MenuItem[];
}

const transformNavigation = (items: NavigationItem[]): MenuItem[] => {
  return items.map((section) => ({
    label: section.label,
    href: section.children[0]?.href || "#",
    children: section.children.map((child) => ({
      label: child.label,
      href: child.href,
      badge: child.badge,
      badges: undefined,
    })),
  }));
};

const MenuItem: React.FC<{
  item: MenuItem;
  expandedState: Record<string, boolean>;
  setExpandedState: (state: Record<string, boolean>) => void;
}> = ({ item, expandedState, setExpandedState }) => {
  const pathName = useCurrentPath();
  const isExpanded = expandedState[item.label] ?? true;
  const hasChildren = item.children && item.children.length > 0;

  // Determine if this item is a "Section" (top level with children) or a "Link"
  // In the user's HTML, top level items are expandable groups.
  const isGroup = hasChildren;

  const toggleExpanded = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isGroup) {
      setExpandedState({
        ...expandedState,
        [item.label]: !isExpanded,
      });
    }
  };

  // 1. Render Expandable Group (Top Level)
  if (isGroup) {
    return (
      <li
        className={cn(
          "rounded-lg overflow-hidden w-full transition-colors duration-250",
          // Active state styling for groups if needed, though usually groups aren't "active" themselves in this pattern unless a child is.
          // keeping it neutral for now as per provided HTML structure for groups
        )}
        data-state={isExpanded ? "expanded" : "collapsed"}
      >
        <button
          aria-expanded={isExpanded}
          onClick={toggleExpanded}
          className={cn(
            "group/expander cursor-pointer rounded-lg bg-transparent min-h-[34px] py-0 w-full outline-none text-sm px-3 gap-2.5",
            "flex items-center text-muted-foreground hover:text-foreground",
            "hover:bg-accent",
            "focus-visible:text-foreground focus-visible:bg-accent"
          )}
        >
          <div className={cn(
            "flex items-center min-w-0 gap-3 transition-transform duration-250",
            // The user HTML has a translate fix for nested icons, but we don't have icons for groups. 
            // We'll keep the chevron interaction.
          )}>
            {/* Toggle Icon - Visible by default as requested */}
            <ChevronRight
              className={cn(
                "shrink-0 w-3.5 h-3.5 text-muted-foreground transition-transform duration-200",
                isExpanded && "rotate-90"
              )}
            />

            <span className="text-sm font-medium text-left whitespace-nowrap">
              {item.label}
            </span>
          </div>
        </button>

        {/* Content Container with Grid Transition */}
        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-250 ease-[cubic-bezier(0.77,0,0.175,1)]",
            isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            {/* Key part of the user's design: Nested list needs padding-left and the vertical line */}
            <ul className="relative flex flex-col gap-y-px mx-0 mt-px mb-0 pl-7 pr-0 py-0 list-none">
              {/* Vertical Line */}
              <div className="absolute left-[19px] inset-y-px w-px bg-border z-10"></div>

              {item.children?.map((child, idx) => (
                <li key={idx} className="not-first-of-type:mt-px">
                  <Link
                    href={child.href}
                    className={cn(
                      "flex items-center gap-2 min-h-[34px] px-3 py-0 outline-none font-medium text-sm rounded-lg text-left transition-colors",
                      "no-underline cursor-pointer", // Reset defaults
                      pathName === child.href
                        ? "bg-accent text-foreground" // Active
                        : "text-muted-foreground hover:text-foreground hover:bg-accent" // Inactive
                    )}
                  >
                    <span className="truncate">{child.label}</span>
                    {child.badge && (
                      <span className="inline-flex items-center w-fit whitespace-nowrap flex-none shrink-0 justify-self-start text-[11px]/none font-[550] px-[7px] py-[3px] rounded-full border border-dashed bg-transparent border-border text-foreground ml-auto">
                        {child.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </li>
    );
  }

  // 2. Render Single Link (Leaf Node that isn't nested) - Though our data structure usually implies top level is always a group.
  return null;
};

const Sidebar = ({ items = navigation }: { items?: NavigationItem[] }) => {
  const [expandedState, setExpandedState] = usePersistedState<
    Record<string, boolean>
  >("sidebar-expanded-state", {});

  const menuData = useMemo(() => transformNavigation(items), [items]);

  return (
    <aside className="hidden md:block w-[260px] h-[calc(100dvh-57px)] sticky top-[57px] border-r border-l border-border bg-background">


      <ScrollArea className="h-full w-full">
        <div className="py-2 px-3">
          <ul className="list-none relative w-full mx-0 mb-[60px] mt-0 flex flex-col gap-y-px items-stretch group-data-[state=expanded]/sidebar:px-0 transition-[padding] duration-250">
            {menuData.map((item, index) => (
              <MenuItem
                key={index}
                item={item}
                expandedState={expandedState}
                setExpandedState={setExpandedState}
              />
            ))}
          </ul>
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
