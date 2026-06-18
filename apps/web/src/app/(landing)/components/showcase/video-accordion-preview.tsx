import { Clapperboard, Film } from "lucide-react";

export default function VideoAccordionPreview() {
  return (
    <div className="flex h-32 w-full max-w-[242px] gap-1.5 overflow-hidden rounded-lg border border-border bg-zinc-950 p-2 text-white">
      <div className="relative flex-1 overflow-hidden rounded-md bg-[linear-gradient(135deg,#0ea5e9,#111827_58%,#f43f5e)] p-3">
        <Clapperboard className="h-4 w-4 text-white/75" aria-hidden="true" />
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-sm font-semibold">Wildlife reel</p>
          <div className="mt-2 h-1 rounded-full bg-white/25">
            <div className="h-1 w-3/5 rounded-full bg-white" />
          </div>
        </div>
      </div>
      {["01", "02", "03"].map((label) => (
        <div key={label} className="flex w-8 flex-col items-center justify-between rounded-md border border-white/10 bg-white/[0.08] py-2">
          <Film className="h-3.5 w-3.5 text-white/[0.65]" aria-hidden="true" />
          <span className="rotate-[-90deg] text-[10px] font-semibold text-white/[0.65]">{label}</span>
        </div>
      ))}
    </div>
  );
}
