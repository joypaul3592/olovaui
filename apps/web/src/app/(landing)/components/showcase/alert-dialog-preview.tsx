export default function AlertDialogPreview() {
  return (
    <div className="relative h-32 w-full max-w-[238px] overflow-hidden rounded-lg border border-border bg-muted/60 p-3 shadow-sm">
      <div className="space-y-2 opacity-45">
        <div className="h-3 w-24 rounded bg-foreground/20" />
        <div className="grid grid-cols-2 gap-2">
          <div className="h-20 rounded-md bg-background" />
          <div className="h-20 rounded-md bg-background" />
        </div>
      </div>
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" />
      <div className="absolute left-1/2 top-1/2 w-[202px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl">
        <div className="p-4">
          <p className="text-sm font-semibold tracking-tight">Are you sure?</p>
          <p className="mt-1.5 text-[11px] leading-4 text-muted-foreground">
            This action cannot be undone.
          </p>
        </div>
        <div className="flex justify-end gap-2 border-t border-border/60 bg-muted/40 px-3 py-2">
          <span className="h-7 w-16 rounded-lg border border-border bg-background shadow-sm" />
          <span className="h-7 w-16 rounded-lg bg-foreground shadow-sm" />
        </div>
      </div>
    </div>
  );
}
