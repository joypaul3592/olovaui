"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Search, Command, FileText, Home, Settings } from "lucide-react";
import {
  getAllSearchableItems,
  searchItems,
  SearchableItem,
} from "@/lib/search-registry";
import { navigation } from "@/constants/navigation";
import { componentsNavigation } from "@/constants/components-navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PagefindSearchData {
  url: string;
  excerpt?: string;
  meta?: {
    title?: string;
  };
}

interface SearchResultItem {
  id: string;
  title: string;
  description: string;
  href: string;
  category: string;
  source: "pagefind" | "fallback";
}

type SearchItem = SearchResultItem | SearchableItem;

interface SearchSidebarSection {
  label: string;
  items: Array<{
    label: string;
    href: string;
  }>;
}

type PagefindModule = {
  search: (query: string) => Promise<{
    results: Array<{
      id: string;
      data: () => Promise<PagefindSearchData>;
    }>;
  }>;
};

const getItemIcon = (item: SearchItem) => {
  const title = item.title.toLowerCase();
  const href = item.href.toLowerCase();

  if (title.includes("introduction") || title.includes("home")) {
    return <Home className="w-4 h-4" />;
  }
  if (title.includes("installation") || title.includes("setup")) {
    return <Settings className="w-4 h-4" />;
  }
  if (href === "/" || href === "/docs") {
    return <Home className="w-4 h-4" />;
  }
  return <FileText className="w-4 h-4" />;
};

const getCategoryFromHref = (href: string) => {
  if (href === "/") return "Home";
  if (href.startsWith("/components")) return "Components";
  if (href.startsWith("/docs")) return "Docs";
  if (href.startsWith("/changelog")) return "Changelog";
  return "Page";
};

const cleanExcerpt = (excerpt?: string) =>
  (excerpt || "No preview available.")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const normalizeHref = (href: string) => {
  const normalized = href.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
  if (normalized.length > 1 && normalized.endsWith("/")) {
    return normalized.slice(0, -1);
  }
  return normalized || "/";
};

const formatHref = (href: string) => (href === "/" ? "/" : href);

const searchSidebarSections: SearchSidebarSection[] = [
  ...navigation.map((section) => ({
    label: section.label,
    items: section.children.map((child) => ({
      label: child.label,
      href: child.href,
    })),
  })),
  ...componentsNavigation
    .filter(
      (section) =>
        !navigation.some((navSection) => navSection.label === section.label),
    )
    .map((section) => ({
      label: section.label,
      items: section.children.map((child) => ({
        label: child.label,
        href: child.href,
      })),
    })),
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [allItems] = useState(() => getAllSearchableItems());
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isPagefindReady, setIsPagefindReady] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const pagefindRef = useRef<PagefindModule | null>(null);
  const searchRequestRef = useRef(0);

  const fallbackItems = React.useMemo(() => {
    if (query.trim()) {
      return searchItems(query, allItems).map((item) => ({
        ...item,
        source: "fallback" as const,
      }));
    }

    const componentItems = allItems.filter(
      (item) => item.category === "Components",
    );
    const otherItems = allItems.filter(
      (item) => item.category !== "Components",
    );
    return [...componentItems, ...otherItems].slice(0, 12).map((item) => ({
      ...item,
      source: "fallback" as const,
    }));
  }, [query, allItems]);

  const filteredItems =
    query.trim() && isPagefindReady ? results : fallbackItems;
  const filteredSidebarSections = React.useMemo(() => {
    if (!query.trim()) {
      return searchSidebarSections;
    }

    const searchTerm = query.trim().toLowerCase();

    return searchSidebarSections
      .map((section) => {
        const matchingItems = section.items.filter((item) => {
          const titleMatch = item.label.toLowerCase().includes(searchTerm);
          const hrefMatch = item.href.toLowerCase().includes(searchTerm);
          const sectionMatch = section.label.toLowerCase().includes(searchTerm);
          return titleMatch || hrefMatch || sectionMatch;
        });

        if (
          section.label.toLowerCase().includes(searchTerm) &&
          matchingItems.length === 0
        ) {
          return section;
        }

        return {
          ...section,
          items: matchingItems,
        };
      })
      .filter(
        (section) =>
          section.items.length > 0 ||
          section.label.toLowerCase().includes(searchTerm),
      );
  }, [query]);

  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || pagefindRef.current) {
      return;
    }

    let cancelled = false;

    const loadPagefind = async () => {
      try {
        // Build path dynamically to avoid TypeScript trying to resolve the module at compile time.
        const pagefindPath = "/pagefind" + "/pagefind.js";
        // @ts-ignore Pagefind is generated into /public-like output after the static build.
        const pagefindModule = (await import(
          /* webpackIgnore: true */ pagefindPath
        )) as PagefindModule;
        if (!cancelled) {
          pagefindRef.current = pagefindModule;
          setIsPagefindReady(true);
        }
      } catch {
        if (!cancelled) {
          setIsPagefindReady(false);
        }
      }
    };

    void loadPagefind();

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (!query.trim() || !pagefindRef.current) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    const requestId = searchRequestRef.current + 1;
    searchRequestRef.current = requestId;
    setIsSearching(true);

    const timeoutId = window.setTimeout(() => {
      const runSearch = async () => {
        try {
          const search = await pagefindRef.current?.search(query);
          const data = await Promise.all(
            (search?.results || []).slice(0, 12).map(async (result) => {
              const item = await result.data();
              const href = normalizeHref(item.url);

              return {
                id: result.id,
                title:
                  item.meta?.title ||
                  href.split("/").filter(Boolean).pop() ||
                  "Untitled",
                description: cleanExcerpt(item.excerpt),
                href,
                category: getCategoryFromHref(href),
                source: "pagefind" as const,
              };
            }),
          );

          if (searchRequestRef.current === requestId) {
            setResults(data);
          }
        } catch {
          if (searchRequestRef.current === requestId) {
            setResults([]);
            setIsPagefindReady(false);
          }
        } finally {
          if (searchRequestRef.current === requestId) {
            setIsSearching(false);
          }
        }
      };

      void runSearch();
    }, 150);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isOpen, isPagefindReady, query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredItems.length - 1 ? prev + 1 : prev,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          e.preventDefault();
          if (filteredItems[selectedIndex]) {
            try {
              if (typeof router?.push === "function")
                router.push(filteredItems[selectedIndex].href);
            } catch {
              // ignore if router not ready
            }
            onClose();
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose, router]);

  useEffect(() => {
    if (!isOpen) return;

    if (typeof window !== "undefined") {
      setTimeout(() => {
        for (const item of filteredItems.slice(0, 6)) {
          try {
            if (typeof router?.prefetch === "function")
              router.prefetch(item.href);
          } catch {
            // ignore if router not ready
          }
        }
      }, 0);
    }
  }, [filteredItems, isOpen, router]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-black/28 backdrop-blur-xl"
      >
        <div className="flex min-h-screen items-start justify-center px-4 pt-[8vh] md:items-start">
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: prefersReducedMotion ? "linear" : "easeOut" }}
            className="w-full max-w-[860px] overflow-hidden rounded-[28px] border border-border bg-popover/80 shadow-[0_24px_80px_rgba(15,23,42,0.18)] backdrop-blur-2xl"
          >
            <div className="flex items-center gap-3 border-b border-black/5 px-5 py-4 dark:border-white/10">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Search className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search documentation..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent text-[15px] font-medium text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="rounded-full border border-border bg-background/50 px-2.5 py-1 text-muted-foreground">
                  {isSearching ? "Searching..." : `${filteredItems.length} results`}
                </span>
                <kbd className="hidden rounded-full border border-border bg-background/50 px-2.5 py-1 text-muted-foreground sm:inline-flex">
                  <Command className="w-3 h-3 inline mr-1" />K
                </kbd>
              </div>
            </div>

            <div className="grid max-h-[520px] min-h-[380px] grid-cols-1 overflow-hidden bg-transparent md:grid-cols-[220px_minmax(0,1fr)]">
              <aside className="border-b border-border bg-muted/30 px-3 py-3 md:border-b-0 md:border-r">
                <div className="mb-3 px-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Categories
                </div>
                <div className="max-h-[500px] space-y-3 overflow-y-auto pr-1">
                  {filteredSidebarSections.map((section) => (
                    <div key={section.label} className="px-1">
                      <div className="flex items-center justify-between px-1.5 text-xs font-medium text-foreground">
                        <span>{section.label}</span>
                        <span className="rounded-full bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground">
                          {section.items.length}
                        </span>
                      </div>
                      <div className="mt-2 space-y-0.5">
                        {section.items.slice(0, 6).map((item) => (
                          <div
                            key={item.href}
                            className="truncate rounded-lg px-2 py-1.5 text-xs text-muted-foreground"
                            title={item.label}
                          >
                            {item.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </aside>

              <div className="max-h-[520px] overflow-y-auto">
                {!query.trim() ? (
                  <div className="px-5 pt-4 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Suggestions
                  </div>
                ) : null}
                {filteredItems.length > 0 ? (
                  <div className="py-3">
                    {filteredItems.map((item, index) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={onClose}
                        className={`mx-3 flex items-start gap-3 rounded-2xl border px-3.5 py-3.5 transition-all ${index === selectedIndex
                          ? "border-border bg-accent shadow-sm"
                          : "border-transparent hover:bg-accent/50"
                          }`}
                      >
                        <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-background text-muted-foreground">
                          {getItemIcon(item)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="truncate text-sm font-medium text-foreground">
                              {item.title}
                            </div>
                            <span className="rounded-full bg-background px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                              {item.category}
                            </span>
                          </div>
                          <div className="mt-1.5 line-clamp-2 text-sm leading-6 text-muted-foreground">
                            {item.description}
                          </div>
                          <div className="mt-2 truncate text-xs text-muted-foreground">
                            {formatHref(item.href)}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : isSearching ? (
                  <div className="py-8 text-center text-muted-foreground">
                    <Search className="w-8 h-8 mx-auto mb-2 opacity-50 animate-pulse" />
                    <p>Searching the documentation index...</p>
                  </div>
                ) : (
                  <div className="py-10 text-center text-muted-foreground">
                    <Search className="mx-auto mb-3 h-8 w-8 opacity-40" />
                    <p className="text-sm text-muted-foreground">
                      {query.trim() ? `No results found for "${query}"` : "Start typing to search"}
                    </p>
                    {query.trim() && !isPagefindReady ? (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Using fallback suggestions while the search index is unavailable.
                      </p>
                    ) : null}
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-border px-5 py-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="rounded-full border border-border bg-muted px-2 py-0.5">↑</kbd>
                    <kbd className="rounded-full border border-border bg-muted px-2 py-0.5">↓</kbd>
                    to navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded-full border border-border bg-muted px-2 py-0.5">↵</kbd>
                    to select
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <kbd className="rounded-full border border-border bg-muted px-2 py-0.5">esc</kbd>
                  to close
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
