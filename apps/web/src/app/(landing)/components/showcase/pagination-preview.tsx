import { cn } from "@/lib/utils";

export default function PaginationPreview() {
  return (
    <div className="flex items-center gap-1">
      {["1", "2", "3"].map((page) => (
        <span key={page} className={cn("flex h-8 w-8 items-center justify-center rounded-md border text-sm", page === "2" ? "bg-foreground text-background" : "bg-background")}>
          {page}
        </span>
      ))}
    </div>
  );
}
