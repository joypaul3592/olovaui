import { cn } from "@/lib/utils";

export default function FlipLinkPreview() {
  return (
    <div className="grid w-full max-w-[238px] place-content-center gap-2 rounded-2xl border border-zinc-200/80 bg-white/80 px-5 py-4 text-zinc-950 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-950 dark:text-zinc-100">
      <FlipLine label="Projects" className="text-primary" />
      <FlipLine label="About Me" className="" />
      <FlipLine label="Services" className="" />
    </div>
  );
}

function FlipLine({ label, className }: { label: string; className: string }) {
  return (
    <span
      className={cn(
        "relative block overflow-hidden whitespace-nowrap text-[24px] font-black uppercase leading-[0.85] tracking-normal transition-colors duration-300",
        className,
      )}
      aria-label={label}
    >
      {label}
    </span>
  );
}
