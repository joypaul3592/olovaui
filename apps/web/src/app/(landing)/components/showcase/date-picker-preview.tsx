import { CalendarDays } from "lucide-react";

export default function DatePickerPreview() {
  return (
    <div className="flex w-full max-w-[230px] items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm">
      <CalendarDays className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
      Jun 12, 2026
    </div>
  );
}
