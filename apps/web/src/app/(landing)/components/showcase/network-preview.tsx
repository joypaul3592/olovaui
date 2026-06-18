import { cn } from "@/lib/utils";

export default function NetworkPreview() {
  return (
    <div className="relative h-28 w-56">
      <div className="absolute left-4 top-12 h-px w-40 rotate-[-12deg] bg-border" />
      <div className="absolute left-12 top-5 h-px w-32 rotate-[26deg] bg-border" />
      {[
        "left-2 top-10",
        "left-20 top-3",
        "right-4 top-12",
        "left-24 bottom-2",
      ].map((position, index) => (
        <span key={position} className={cn("absolute flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold", position)}>
          {index + 1}
        </span>
      ))}
    </div>
  );
}
