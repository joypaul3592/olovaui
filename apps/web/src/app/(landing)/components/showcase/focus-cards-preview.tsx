import { cn } from "@/lib/utils";

export default function FocusCardsPreview() {
  return (
    <div className="flex h-32 w-full max-w-[242px] items-center gap-2 overflow-hidden rounded-lg border border-border bg-background p-3">
      {[
        ["w-12 opacity-[0.55]", "bg-sky-200 dark:bg-sky-950"],
        ["w-24 shadow-lg", "bg-amber-200 dark:bg-amber-900"],
        ["w-12 opacity-[0.55]", "bg-emerald-200 dark:bg-emerald-950"],
      ].map(([sizeClass, colorClass], index) => (
        <div key={index} className={cn("relative h-24 overflow-hidden rounded-md border border-border transition", sizeClass, colorClass)}>
          <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.42),transparent_48%)]" />
          {index === 1 ? (
            <div className="absolute bottom-2 left-2 right-2">
              <div className="h-2 rounded bg-foreground/60" />
              <div className="mt-1 h-1.5 w-2/3 rounded bg-foreground/30" />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
