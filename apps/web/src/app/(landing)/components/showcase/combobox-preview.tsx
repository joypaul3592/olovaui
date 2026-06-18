import { ChevronDown } from "lucide-react";

export default function ComboboxPreview() {
  return (
    <div className="w-full max-w-[240px] rounded-lg border border-border bg-card p-2">
      <div className="flex items-center justify-between rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">
        Search components
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </div>
      <div className="mt-2 rounded-md px-3 py-2 text-sm">Button</div>
    </div>
  );
}
