import { Play } from "lucide-react";

export default function HeroVideoPreview() {
  return (
    <div className="relative h-32 w-full max-w-[242px] overflow-hidden rounded-lg border border-border bg-zinc-950 text-white shadow-sm">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#111827,#0f766e_48%,#f59e0b)] opacity-80" />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.75),transparent_62%)]" />
      <div className="absolute left-3 top-3 flex gap-1.5">
        {[0, 1, 2].map((dot) => (
          <span key={dot} className="h-2 w-2 rounded-full bg-white/[0.45]" />
        ))}
      </div>
      <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-zinc-950 shadow-lg">
        <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
      </div>
      <div className="absolute bottom-3 left-3 right-3">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-medium">Launch film</span>
          <span className="text-white/[0.65]">01:24</span>
        </div>
        <div className="h-1 rounded-full bg-white/20">
          <div className="h-1 w-2/5 rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}
