import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DropdownMenuPreview() {
  return (
    <div className="relative h-32 w-full max-w-[230px]">
      <div className="absolute right-3 top-2 flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium shadow-sm">
        Actions
        <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
      </div>
      <div className="absolute right-3 top-14 w-[170px] overflow-hidden rounded-lg border border-border bg-card py-1.5 shadow-xl">
        {[
          ["Duplicate", "D"],
          ["Move to", "M"],
          ["Archive", "A"],
        ].map(([label, key], index) => (
          <div key={label} className={cn("flex items-center justify-between px-3 py-1.5 text-xs", index === 1 && "bg-muted")}>
            <span>{label}</span>
            <span className="text-[10px] text-muted-foreground">{key}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
