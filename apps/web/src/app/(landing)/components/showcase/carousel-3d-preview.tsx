import { Layers3 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Carousel3DPreview() {
  return (
    <div className="relative h-32 w-full max-w-[238px] overflow-hidden rounded-lg border border-border bg-zinc-950 p-4 [perspective:520px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.32),transparent_58%)]" />
      {[
        { className: "left-9 top-7 bg-rose-400", transform: "rotateY(-34deg) rotate(-8deg)" },
        { className: "left-[78px] top-4 z-10 bg-indigo-400", transform: "translateZ(36px)" },
        { className: "right-9 top-7 bg-emerald-400", transform: "rotateY(34deg) rotate(8deg)" },
      ].map(({ className, transform }) => (
        <div
          key={className}
          className={cn("absolute h-20 w-14 rounded-md border border-white/20 shadow-2xl", className)}
          style={{ transform }}
        >
          <div className="m-1.5 h-10 rounded bg-white/20" />
          <div className="mx-1.5 mt-2 h-1.5 rounded bg-white/[0.35]" />
        </div>
      ))}
      <Layers3 className="absolute bottom-3 left-3 h-4 w-4 text-white/70" aria-hidden="true" />
    </div>
  );
}
