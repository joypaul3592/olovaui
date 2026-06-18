import { Bell } from "lucide-react";

export default function AlertPreview() {
  return (
    <div className="flex w-full max-w-[240px] items-start gap-3 rounded-lg border border-border bg-card p-3 shadow-sm">
      <Bell className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
      <div>
        <p className="text-sm font-medium">Update available</p>
        <p className="mt-1 text-xs text-muted-foreground">Ready for production.</p>
      </div>
    </div>
  );
}
