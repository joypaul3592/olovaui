"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const WebVitals = dynamic(() => import("@/components/performance/web-vitals").then(m => m.WebVitals), {
  ssr: false,
  loading: () => null,
});
const GoogleAnalytics = dynamic(() => import("@/components/analytics/google-analytics").then(m => m.GoogleAnalytics), {
  ssr: false,
  loading: () => null,
});

export default function ClientShell() {
  const enablePerf =
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_ENABLE_PERF === "true";
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const enableAnalytics = !!gaId && process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== "false";
  const [canLoadAnalytics, setCanLoadAnalytics] = useState(false);

  useEffect(() => {
    if (!enableAnalytics) return;
    if (typeof window === "undefined") return;

    type IdleCallbackHandle = number;
    type IdleCallback = (deadline: IdleDeadline) => void;
    type IdleRequestOptions = { timeout?: number };
    type IdleWindow = Window & {
      requestIdleCallback?: (cb: IdleCallback, options?: IdleRequestOptions) => IdleCallbackHandle;
      cancelIdleCallback?: (handle: IdleCallbackHandle) => void;
    };

    const w = window as IdleWindow;
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(() => setCanLoadAnalytics(true), { timeout: 2000 });
      return () => w.cancelIdleCallback?.(id);
    }

    const t = setTimeout(() => setCanLoadAnalytics(true), 2000);
    return () => clearTimeout(t);
  }, [enableAnalytics]);

  return (
    <>
      {enablePerf ? <WebVitals /> : null}
      {enableAnalytics && canLoadAnalytics ? <GoogleAnalytics id={gaId!} /> : null}
    </>
  );
}
