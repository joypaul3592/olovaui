export default function ProgressPreview() {
  return (
    <div className="w-full max-w-[230px] space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Install</span>
        <span>72%</span>
      </div>
      <div className="h-2 rounded-full bg-muted">
        <div className="h-2 w-[72%] rounded-full bg-primary" />
      </div>
    </div>
  );
}
