"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, ArrowUp } from "lucide-react";
import { getAdjacentPages } from "@/lib/docs-navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DocPaginationProps {
  showBackToTop?: boolean;
  showKeyboardHints?: boolean;
}

export function DocPagination({
  showBackToTop = true,
  showKeyboardHints = true,
}: DocPaginationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { previous, next } = getAdjacentPages(pathname);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 400;
      setShowScrollTop((current) =>
        current === scrolled ? current : scrolled,
      );
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // schedule prefetch in next tick to avoid firing router actions before initialization
      setTimeout(() => {
        try {
          if (previous?.href && typeof router?.prefetch === "function")
            router.prefetch(previous.href);
          if (next?.href && typeof router?.prefetch === "function")
            router.prefetch(next.href);
        } catch {
          // router might not be ready yet; ignore
        }
      }, 0);
    }
  }, [next?.href, previous?.href, router]);

  useEffect(() => {
    if (!showKeyboardHints) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "ArrowLeft" && previous) {
        e.preventDefault();
        try {
          if (typeof router?.push === "function") router.push(previous.href);
        } catch {
          // ignore if router not initialized
        }
      }
      if (e.altKey && e.key === "ArrowRight" && next) {
        e.preventDefault();
        try {
          if (typeof router?.push === "function") router.push(next.href);
        } catch {
          // ignore if router not initialized
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, previous, router, showKeyboardHints]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!previous && !next) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        {showBackToTop && showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 rounded-full bg-black dark:bg-white text-white dark:text-black shadow-lg hover:shadow-xl transition-shadow z-40"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="mt-16 pt-8 border-t border-black/10 dark:border-white/10">
        {showKeyboardHints && (previous || next) && (
          <div className="mb-4 text-center">
            <p className="text-xs text-black/40 dark:text-white/40">
              Tip: Use{" "}
              <kbd className="px-2 py-1 text-xs font-semibold text-black/60 dark:text-white/60 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded">
                Alt
              </kbd>{" "}
              +{" "}
              <kbd className="px-2 py-1 text-xs font-semibold text-black/60 dark:text-white/60 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded">
                ←
              </kbd>{" "}
              /{" "}
              <kbd className="px-2 py-1 text-xs font-semibold text-black/60 dark:text-white/60 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded">
                →
              </kbd>{" "}
              to navigate
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={cn(!previous && "md:col-start-2")}>
            {previous && (
              <Link
                href={previous.href}
                className="group relative flex items-center gap-3 p-4 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 hover:border-black/20 dark:hover:border-white/20 transition-all duration-200 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-transparent transition-all duration-300" />
                <ChevronLeft className="w-5 h-5 text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white group-hover:-translate-x-1 transition-all duration-200 relative z-10" />
                <div className="flex flex-col items-start relative z-10">
                  <span className="text-xs text-black/60 dark:text-white/60 mb-1">
                    Previous
                  </span>
                  <span className="text-sm font-medium text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {previous.label}
                  </span>
                </div>
              </Link>
            )}
          </div>

          <div>
            {next && (
              <Link
                href={next.href}
                className="group relative flex items-center justify-end gap-3 p-4 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 hover:border-black/20 dark:hover:border-white/20 transition-all duration-200 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-l from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-transparent transition-all duration-300" />
                <div className="flex flex-col items-end relative z-10">
                  <span className="text-xs text-black/60 dark:text-white/60 mb-1">
                    Next
                  </span>
                  <span className="text-sm font-medium text-black dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {next.label}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-1 transition-all duration-200 relative z-10" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
