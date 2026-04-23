"use client";

import { BorderBeam } from "./border-beam";

export function BorderBeamView() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/80 p-10 text-zinc-900 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-950 dark:text-zinc-100">
        <BorderBeam
          size={260}
          duration={12}
          colorFrom="rgb(59 130 246)"
          colorTo="rgb(147 51 234)"
          opacity={0.6}
        />

        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
            Border Beam
          </span>
          <h3 className="text-2xl font-semibold">Spotlight the perimeter</h3>
          <p className="max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
            An animated beam of light that travels along the border of any container.
          </p>
          <div className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-zinc-900">
            Start the flow
          </div>
        </div>
      </div>
    </div>
  );
}

export default BorderBeamView;
