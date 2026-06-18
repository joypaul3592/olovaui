export default function CollapsiblePreview() {
  return (
    <div className="w-full max-w-[230px] rounded-lg border border-border bg-card p-3 shadow-sm">
      <div className="h-3 w-32 rounded bg-muted" />
      <div className="mt-3 h-12 rounded-md bg-muted/70 p-2 text-xs text-muted-foreground">Expanded content</div>
    </div>
  );
}
