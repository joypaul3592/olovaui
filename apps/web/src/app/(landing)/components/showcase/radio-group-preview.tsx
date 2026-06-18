import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RadioGroupPreview() {
  return (
    <div className="space-y-2">
      {["Free", "Pro", "Team"].map((label, index) => (
        <div key={label} className="flex items-center gap-2 text-sm">
          <Circle className={cn("h-4 w-4", index === 1 ? "fill-primary text-primary" : "text-muted-foreground")} />
          {label}
        </div>
      ))}
    </div>
  );
}
