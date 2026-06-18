import { MousePointer2 } from "lucide-react";

export default function LabelPreview() {
  return (
    <div className="flex w-full max-w-[230px] items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm">
      <MousePointer2 className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
      Labelled input
    </div>
  );
}
