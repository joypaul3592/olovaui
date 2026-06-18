import { BorderBeam } from "@/app/docs/border-beam/border-beam";

export default function BorderBeamPreview() {
  return (
    <div className="relative h-32 w-full max-w-[238px] overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/80 p-4 text-zinc-900 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-950 dark:text-zinc-100">
      <BorderBeam
        size={180}
        duration={9}
        colorFrom="rgb(59 130 246)"
        colorTo="rgb(147 51 234)"
        opacity={0.65}
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-between text-center">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-600 dark:text-zinc-400">
            Border Beam
          </p>
          <p className="mt-2 text-base font-semibold">Spotlight the perimeter</p>
        </div>
        <button type="button" className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-4 text-[11px] font-semibold text-white transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">
          Start flow
        </button>
      </div>
    </div>
  );
}
