export default function SkeletonPreview() {
  return (
    <div className="w-full max-w-[230px] space-y-3">
      <div className="h-20 rounded-lg bg-muted" />
      <div className="h-3 w-4/5 rounded bg-muted" />
      <div className="h-3 w-2/3 rounded bg-muted" />
    </div>
  );
}
