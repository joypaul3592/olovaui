"use client";
import React, { useSyncExternalStore, useCallback } from "react";
import Link from "next/link";
import { X, Heart } from "lucide-react";

const BANNER_STORAGE_KEY = "olova-ui-support-banner-dismissed";

// Custom store for banner dismissed state
let listeners: Array<() => void> = [];
function emitChange() {
  for (const listener of listeners) listener();
}
function subscribeBanner(callback: () => void) {
  listeners = [...listeners, callback];
  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
}
function getIsDismissed() {
  try {
    return !!localStorage.getItem(BANNER_STORAGE_KEY);
  } catch {
    return false;
  }
}
// Render by default for static HTML; the early UI script hides it before paint
// when the user has already dismissed it.
function getServerIsDismissed() {
  return false;
}

const SupportAlertBanner = () => {
  const isDismissed = useSyncExternalStore(subscribeBanner, getIsDismissed, getServerIsDismissed);

  const handleClose = useCallback(() => {
    try {
      localStorage.setItem(BANNER_STORAGE_KEY, "true");
    } catch {
      // Keep the current session stable even if storage is unavailable.
    }
    document.documentElement.dataset.supportBannerDismissed = "true";
    emitChange();
  }, []);

  if (isDismissed) return null;

  return (
    <>
      <style jsx global>{`
        :root {
          --fd-banner-height: 3rem;
        }
        :root[data-support-banner-dismissed="true"] .support-alert-banner {
          display: none;
        }
        @keyframes fd-moving-banner {
          from {
            background-position: 0% 0;
          }
          to {
            background-position: 100% 0;
          }
        }
      `}</style>
      <div
        className="support-alert-banner sticky top-0 z-40 flex flex-row items-center justify-center px-4 text-center text-sm font-medium bg-background text-foreground relative"
        style={{ height: "3rem" }}
      >
        <div
          className="absolute inset-0 z-[-1]"
          style={{
            maskImage:
              "linear-gradient(to bottom, white, transparent), radial-gradient(circle at top center, white, transparent)",
            maskComposite: "intersect",
            animation: "fd-moving-banner 20s linear infinite",
            backgroundImage:
              "repeating-linear-gradient(70deg, rgba(0, 191, 99, 0.5) 0%, rgba(0, 191, 99, 0.5) 7.142857142857143%, transparent 14.285714285714286%, rgba(0, 191, 99, 0.5) 21.428571428571427%, transparent 28.571428571428573%, rgba(0, 191, 99, 0.5) 35.714285714285715%, transparent 42.857142857142854%, rgba(0, 191, 99, 0.5) 50%)",
            backgroundSize: "200% 100%",
            filter: "saturate(2)",
          }}
        />
        <div className="flex items-center justify-between w-full max-w-[1536px]">
          <div className="flex items-center gap-2">
            <Heart
              className="h-4 w-4 fill-current animate-pulse"
              style={{ color: "#00BF63" }}
            />
            <span className="font-medium">
              Love This UI? Help It Grow and Reach More Developers Worldwide —{" "}
              <Link
                href="/sponsor"
                className="underline hover:no-underline transition-all duration-200"
              >
                Check out
              </Link>
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-accent rounded-full transition-colors duration-200 ml-4"
            aria-label="Close banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default SupportAlertBanner;
