import { Button } from "@/app/components/button/button";

export default function TooltipPreview() {
  return (
    <div className="relative">
      <Button size="sm" variant="outline">Hover target</Button>
      <span className="absolute -top-9 left-1/2 -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-xs text-background whitespace-nowrap">
        Helpful hint
      </span>
    </div>
  );
}
