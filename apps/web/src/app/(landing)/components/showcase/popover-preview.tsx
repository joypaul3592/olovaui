import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PopoverPreview() {
  return (
    <div className="relative h-32 w-full max-w-[235px]">
      <div className="absolute bottom-3 left-4 flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium shadow-sm">
        <MessageSquare className="h-4 w-4 text-primary" aria-hidden="true" />
        Notify
      </div>
      <div className="absolute left-20 top-1 w-[145px] rounded-lg border border-border bg-card p-3 shadow-xl">
        <span className="absolute -bottom-1.5 left-7 h-3 w-3 rotate-45 border-b border-r border-border bg-card" />
        <p className="text-sm font-semibold">Quick settings</p>
        <div className="mt-3 space-y-2">
          {["Email", "Digest"].map((label, index) => (
            <div key={label} className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>{label}</span>
              <span className={cn("h-3.5 w-6 rounded-full", index === 0 ? "bg-primary" : "bg-muted")} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
