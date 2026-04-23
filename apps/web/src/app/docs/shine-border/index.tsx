"use client";

import { ShineBorder } from "./shine-border";

export function ShineBorderView() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/80 p-10 text-zinc-900 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-950 dark:text-zinc-100">
        <ShineBorder
          borderWidth={2}
          duration={10}
          colorFrom="rgb(16 185 129)"
          colorTo="rgb(59 130 246)"
          opacity={0.7}
        />

        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
            Shine Border
          </span>
          <h3 className="text-2xl font-semibold">Soft animated glow</h3>
          <p className="max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
            A subtle animated border background that keeps the focus on the content.
          </p>
          <div className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-zinc-900">
            Explore shine
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShineBorderView;
