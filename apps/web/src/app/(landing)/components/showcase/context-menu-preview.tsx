import { MousePointerClick } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ContextMenuPreview() {
  return (
    <div className="relative h-32 w-full max-w-[238px] overflow-hidden rounded-lg border border-dashed border-border bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#3f3f46_1px,transparent_1px)]">
      <div className="absolute left-4 top-4 rounded-md border border-border bg-background px-2 py-1 text-[11px] text-muted-foreground">
        Canvas area
      </div>
      <MousePointerClick className="absolute left-20 top-14 h-5 w-5 text-foreground" aria-hidden="true" />
      <div className="absolute left-[104px] top-10 w-[118px] rounded-lg border border-border bg-card p-1.5 shadow-xl">
        {["Insert", "Rename", "Delete"].map((label, index) => (
          <div key={label} className={cn("rounded px-2 py-1.5 text-xs", index === 0 && "bg-muted font-medium")}>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
