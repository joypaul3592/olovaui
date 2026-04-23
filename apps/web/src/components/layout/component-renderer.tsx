"use client";

import { cn } from "@/lib/utils";
import { cloneElement, useCallback, useEffect, useRef, useState } from "react";

// --- Inline SVG Icons ---

const MonitorIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="14" x="2" y="3" rx="2" />
    <line x1="8" x2="16" y1="21" y2="21" />
    <line x1="12" x2="12" y1="17" y2="21" />
  </svg>
);

const TabletIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
    <line x1="12" x2="12.01" y1="18" y2="18" />
  </svg>
);

const SmartphoneIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
);

const RotateCcwIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

const GripVerticalIcon = ({ size = 14, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="9" cy="12" r="1" />
    <circle cx="9" cy="5" r="1" />
    <circle cx="9" cy="19" r="1" />
    <circle cx="15" cy="12" r="1" />
    <circle cx="15" cy="5" r="1" />
    <circle cx="15" cy="19" r="1" />
  </svg>
);

// --- Types ---

type ComponentPreviewProps = {
  component: React.ReactElement;
  reTrigger?: boolean;
  className?: string;
};

// --- Component ---

export function ComponentRenderer({
  component,
  reTrigger = false,
  className,
}: ComponentPreviewProps) {
  const [key, setKey] = useState(0);
  const [width, setWidth] = useState<number | null>(null);
  const [isDraggingState, setIsDraggingState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [containerWidth, setContainerWidth] = useState(9999);
  const [contentHeight, setContentHeight] = useState(350);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const MIN_HEIGHT = 200;

  // Initialize width from container on mount and sync containerWidth
  useEffect(() => {
    if (containerRef.current) {
      const w = containerRef.current.offsetWidth;
      setContainerWidth(w);
      setWidth(w);
    }
  }, []);

  // Observe content height changes with ResizeObserver
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const h = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
        setContentHeight(Math.max(MIN_HEIGHT, Math.ceil(h)));
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Re-sync on window resize
  useEffect(() => {
    const onResize = () => {
      if (containerRef.current && !isDragging.current) {
        const cw = containerRef.current.offsetWidth;
        setContainerWidth(cw);
        setWidth((prev) => (prev && prev > cw ? cw : prev));
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Refresh handler
  const changeKey = useCallback(() => {
    setIsLoading(true);
    setKey((prev) => prev + 1);
    setTimeout(() => setIsLoading(false), 300);
  }, []);

  // Drag-to-resize logic
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      setIsDraggingState(true);
      startX.current = e.clientX;
      startWidth.current = width ?? 0;
      document.body.style.cursor = "ew-resize";
      document.body.style.userSelect = "none";
      e.preventDefault();
    },
    [width],
  );

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const delta = e.clientX - startX.current;
      const maxWidth = containerRef.current
        ? containerRef.current.offsetWidth
        : window.innerWidth - 64;
      const newWidth = Math.max(300, Math.min(startWidth.current + delta, maxWidth));
      setWidth(newWidth);
    };

    const onPointerUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      setIsDraggingState(false);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  // Viewport preset handlers
  const setDesktop = useCallback(() => {
    if (containerRef.current) setWidth(containerRef.current.offsetWidth);
  }, []);

  const setTablet = useCallback(() => {
    if (containerRef.current) setWidth(Math.min(768, containerRef.current.offsetWidth));
  }, []);

  const setMobile = useCallback(() => {
    if (containerRef.current) setWidth(Math.min(375, containerRef.current.offsetWidth));
  }, []);

  // Active viewport detection
  const isDesktop = width !== null && width >= Math.min(1024, containerWidth);
  const isTablet = width !== null && width >= 640 && width < 1024;
  const isMobile = width !== null && width < 640;

  // The resolved height for the preview area (content-driven, with a floor)
  const resolvedHeight = Math.max(MIN_HEIGHT, contentHeight);

  return (
    <div className={cn("relative w-full not-prose", className)}>
      {/* Toolbar */}
      <div className="absolute right-0 top-[-46px] flex items-center gap-2 z-10">
        {/* Width indicator */}
        {width !== null && (
          <div className="text-[13px] font-medium text-zinc-400 dark:text-zinc-500 mr-2 flex items-center select-none pointer-events-none">
            {Math.round(width)}px
          </div>
        )}
        <div className="flex items-center rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] overflow-hidden">
          {/* Device viewport buttons */}
          <button
            onClick={setDesktop}
            className={cn(
              "p-2 border-r border-zinc-200 dark:border-zinc-700 transition-colors",
              isDesktop
                ? "text-zinc-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-800"
                : "text-zinc-400 dark:text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-300",
            )}
            title="Desktop view"
          >
            <MonitorIcon size={18} />
          </button>
          <button
            onClick={setTablet}
            className={cn(
              "p-2 border-r border-zinc-200 dark:border-zinc-700 transition-colors",
              isTablet
                ? "text-zinc-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-800"
                : "text-zinc-400 dark:text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-300",
            )}
            title="Tablet view"
          >
            <TabletIcon size={18} />
          </button>
          <button
            onClick={setMobile}
            className={cn(
              "p-2 transition-colors",
              isMobile
                ? "text-zinc-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-800"
                : "text-zinc-400 dark:text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-300",
            )}
            title="Mobile view"
          >
            <SmartphoneIcon size={18} />
          </button>
        </div>

        {/* Refresh button */}
        {reTrigger && (
          <button
            onClick={changeKey}
            disabled={isLoading}
            className={cn(
              "p-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-colors",
              "text-zinc-400 dark:text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-300",
              isLoading && "animate-spin",
            )}
            title="Refresh component"
          >
            <RotateCcwIcon size={18} />
          </button>
        )}
      </div>

      {/* Main preview area */}
      <div
        ref={containerRef}
        className="relative w-full transition-[height] duration-300 ease-in-out"
        style={{ height: `${resolvedHeight}px` }}
      >
        {/* Outer canvas with dashed grid background */}
        <div
          className="absolute inset-0 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M32 0v32M0 32h32' fill='none' stroke='%23e5e7eb' stroke-dasharray='4 4'/%3e%3c/svg%3e")`,
          }}
        />

        {/* Resizable inner panel */}
        <div
          className={cn(
            "absolute left-0 top-0 h-full bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 shadow-[4px_0_16px_rgba(0,0,0,0.03)] dark:shadow-[4px_0_16px_rgba(0,0,0,0.2)] overflow-hidden rounded-l-2xl",
            !isDraggingState && "transition-[width] duration-300 ease-in-out",
          )}
          style={{ width: width !== null ? `${width}px` : "100%" }}
        >
          {/* Component render area */}
          <div
            ref={contentRef}
            className={cn(
              "w-full flex items-center justify-center p-6",
              isLoading && "opacity-50",
            )}
            style={{ minHeight: `${MIN_HEIGHT}px` }}
          >
            {reTrigger ? cloneElement(component, { key }) : component}
          </div>

          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/20 dark:bg-black/20 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-800 dark:border-zinc-200" />
            </div>
          )}
        </div>

        {/* Resize drag handle */}
        {width !== null && (
          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 w-5 h-10 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-sm flex items-center justify-center cursor-ew-resize z-20",
              "text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-500",
              !isDraggingState && "transition-all duration-300 ease-in-out",
              isDraggingState && "transition-colors",
            )}
            style={{ left: `calc(${width}px - 10px)` }}
            onPointerDown={onPointerDown}
            title="Drag to resize"
          >
            <GripVerticalIcon size={14} />
          </div>
        )}
      </div>
    </div>
  );
}
