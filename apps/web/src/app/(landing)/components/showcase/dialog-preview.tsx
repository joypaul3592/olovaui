export default function DialogPreview() {
  return (
    <div className="relative h-32 w-full max-w-[240px] overflow-hidden rounded-lg border border-border bg-muted/60 p-3">
      <div className="space-y-2 opacity-50">
        <div className="h-3 w-20 rounded bg-foreground/20" />
        <div className="grid grid-cols-2 gap-2">
          <div className="h-20 rounded-md bg-background" />
          <div className="h-20 rounded-md bg-background" />
        </div>
      </div>
      <div className="absolute inset-0 bg-background/[0.55]" />
      <div className="absolute left-1/2 top-1/2 w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-card p-3 shadow-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">Publish update</p>
            <p className="mt-1 text-[11px] leading-4 text-muted-foreground">Review release notes.</p>
          </div>
          <span className="mt-0.5 h-4 w-4 rounded-full border border-border" />
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="h-1.5 rounded bg-muted" />
          <div className="h-1.5 w-4/5 rounded bg-muted" />
        </div>
        <div className="mt-3 flex justify-end gap-1.5">
          <span className="h-6 w-12 rounded-md border border-border bg-background" />
          <span className="h-6 w-14 rounded-md bg-foreground" />
        </div>
      </div>
    </div>
  );
}
