"use client";
import React, { useState, useMemo } from "react";
import { ScrollArea } from "@/components/layout/scroll-area";
import { navigation, type NavigationItem } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, X } from "lucide-react";

const useCurrentPath = () => {
  const pathname = usePathname();
  const normalizedPathname =
    pathname.endsWith("/") && pathname !== "/"
      ? pathname.slice(0, -1)
      : pathname;
  return normalizedPathname;
};

const usePersistedState = <T,>(
  key: string,
  defaultValue: T,
): [T, (value: T) => void] => {
  const [state, setState] = useState<T>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(`mobile-${key}`);
        return saved ? JSON.parse(saved) : defaultValue;
      } catch {
        return defaultValue;
      }
    }
    return defaultValue;
  });

  const setValue = (value: T) => {
    setState(value);
    if (typeof window !== "undefined") {
      localStorage.setItem(`mobile-${key}`, JSON.stringify(value));
    }
  };

  return [state, setValue];
};

interface MenuItem {
  label: string;
  href: string;
  badge?: string;
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
    })),
  }));
};

const getBadgeStyle = (badge: string) => {
  switch (badge) {
    case "New":
      return "bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400";
    case "Updated":
      return "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400";
    case "Tool":
      return "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800";
    case "Premium":
      return "bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 dark:from-purple-950/60 dark:to-indigo-950/60 dark:text-purple-400 border border-purple-200 dark:border-purple-800/50";
    case "Pro":
      return "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-bold shadow-lg shadow-amber-500/25 border border-amber-300 dark:from-amber-500 dark:via-yellow-400 dark:to-amber-500 dark:text-black dark:shadow-amber-400/30 dark:border-amber-400";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-950/60 dark:text-gray-400";
  }
};

const MenuItem: React.FC<{
  item: MenuItem;
  isNested?: boolean;
  onClose: () => void;
  expandedState: Record<string, boolean>;
  setExpandedState: (state: Record<string, boolean>) => void;
}> = ({ item, isNested = false, onClose, expandedState, setExpandedState }) => {
  const pathName = useCurrentPath();
  const isActive = pathName === item.href;
  const hasActiveChild = item.children?.some(
    (child) => pathName === child.href,
  );
  const isExpanded = expandedState[item.label] ?? true;


  const toggleExpanded = () => {
    if (item.children) {
      setExpandedState({
        ...expandedState,
        [item.label]: !isExpanded,
      });
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (item.children) {
      e.preventDefault();
      toggleExpanded();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (item.children) {
        toggleExpanded();
      }
    }
    if (e.key === "ArrowRight" && item.children && !isExpanded) {
      toggleExpanded();
    }
    if (e.key === "ArrowLeft" && item.children && isExpanded) {
      toggleExpanded();
    }
  };

  return (
    <li>
      <div
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role={item.children ? "button" : undefined}
        aria-expanded={item.children ? isExpanded : undefined}
        className={cn(
          "flex items-center justify-between py-2 text-sm transition-all duration-200 cursor-pointer rounded-lg px-3 -mx-3",
          "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-blue-50 dark:focus:bg-blue-950/20",
          "hover:bg-muted dark:hover:bg-muted/50 active:scale-[0.98]",
          isNested ? "pl-8" : "font-medium",
          isActive || hasActiveChild
            ? "text-foreground bg-blue-50 dark:bg-blue-950/30"
            : isNested
              ? "text-muted-foreground hover:text-foreground"
              : "text-muted-foreground hover:text-foreground",
        )}
      >
        <span className="flex items-center gap-3">
          {!isNested && (isActive || hasActiveChild) && (
            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
          )}
          {!isNested && item.children && (
            <span className="transition-transform duration-200">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 opacity-60" />
              ) : (
                <ChevronRight className="w-4 h-4 opacity-60" />
              )}
            </span>
          )}
          {isNested && (
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></span>
          )}
          <span>{item.label}</span>
          {item.badge && (
            <span
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full",
                getBadgeStyle(item.badge),
              )}
            >
              {item.badge}
            </span>
          )}
        </span>
      </div>

      {item.children && (
        <ul
          className={cn(
            "mt-1 space-y-1 overflow-hidden transition-all duration-300 ease-in-out",
            isNested
              ? "pl-2"
              : "ml-6 border-l-2 border-border mt-2 pl-4 relative",
            isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          {item.children?.map((child, index) => {
            const isChildActive = pathName === child.href;

            return isNested ? (
              <MenuItem
                key={index}
                item={child}
                isNested
                onClose={onClose}
                expandedState={expandedState}
                setExpandedState={setExpandedState}
              />
            ) : (
              <li key={child.href} className="relative py-0">
                <div className="flex items-center">
                  {isChildActive && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0" />
                  )}
                  <Link
                    href={child.href}
                    onClick={onClose}
                    className={cn(
                      "flex-1 block py-2 text-sm rounded-lg px-3 -mx-3 transition-all duration-200",
                      "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-blue-50 dark:focus:bg-blue-950/20",
                      "hover:bg-muted dark:hover:bg-muted/50 active:scale-[0.98]",
                      isChildActive
                        ? "text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-950/30"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    aria-current={isChildActive ? "page" : undefined}
                  >
                    <span className="flex items-center justify-between">
                      <span>{child.label}</span>
                      {child.badge && (
                        <span
                          className={cn(
                            "text-xs font-medium px-2 py-0.5 rounded-full",
                            getBadgeStyle(child.badge),
                          )}
                        >
                          {child.badge}
                        </span>
                      )}
                    </span>
                  </Link>
                </div>
              </li>
            );
          },
          )}
        </ul>
      )}
    </li>
  );
};

type SidebarFooterLink = {
  label: string;
  href: string;
};

export const SidebarMobile = ({
  onClose,
  items = navigation,
  footerLink,
}: {
  onClose: () => void;
  items?: NavigationItem[];
  footerLink?: SidebarFooterLink;
}) => {
  const currentPath = useCurrentPath();
  const [expandedState, setExpandedState] = usePersistedState<
    Record<string, boolean>
  >("sidebar-expanded-state", {});

  const menuData = useMemo(() => transformNavigation(items), [items]);

  return (
    <aside className="w-full h-[calc(100%-60px)] sticky top-[60px] border-t border-border overflow-visible bg-background">
      <ScrollArea className="h-full w-full">
        <div className="py-4 px-4 relative overflow-visible">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Navigation
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <nav role="navigation" aria-label="Mobile documentation navigation">
            <ul className="space-y-2">
              {menuData.map((item, index) => (
                <MenuItem
                  key={index}
                  item={item}
                  onClose={onClose}
                  expandedState={expandedState}
                  setExpandedState={setExpandedState}
                />
              ))}
            </ul>
          </nav>

          {footerLink && (
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center">
                {currentPath === footerLink.href && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0" />
                )}
                <Link
                  href={footerLink.href}
                  className={cn(
                    "flex-1 block py-3 text-sm font-medium rounded-xl px-4 -mx-4 transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-blue-50 dark:focus:bg-blue-950/20",
                    "hover:bg-muted dark:hover:bg-muted/50 active:scale-[0.98]",
                    currentPath === footerLink.href
                      ? "text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-950/30"
                      : "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300",
                  )}
                  onClick={onClose}
                >
                  <span className="flex items-center justify-between">
                    <span>{footerLink.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-60" />
                  </span>
                </Link>
              </div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center px-2 leading-relaxed">
              Tap any item to navigate and automatically close this menu
            </p>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};
