import { ShineBorder } from "@/app/docs/shine-border/shine-border";

export default function ShineBorderPreview() {
  return (
    <div className="relative h-32 w-full max-w-[238px] overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/80 p-4 text-zinc-900 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-950 dark:text-zinc-100">
      <ShineBorder
        borderWidth={2}
        duration={10}
        colorFrom="rgb(16 185 129)"
        colorTo="rgb(59 130 246)"
        opacity={0.7}
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-between text-center">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Shine Border
          </p>
          <p className="mt-2 text-base font-semibold">Soft animated glow</p>
          <p className="mt-1 text-[11px] leading-4 text-zinc-600 dark:text-zinc-400">
            A subtle border background for calm focus.
          </p>
        </div>
      </div>
    </div>
  );
}
