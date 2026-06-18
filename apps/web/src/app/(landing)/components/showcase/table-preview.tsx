export default function TablePreview() {
  return (
    <div className="w-full max-w-[240px] rounded-lg border border-border">
      {[0, 1, 2].map((row) => (
        <div key={row} className="grid grid-cols-3 border-b border-border last:border-b-0">
          {[0, 1, 2].map((cell) => (
            <span key={cell} className="h-8 border-r border-border p-2 last:border-r-0">
              <span className="block h-2 rounded bg-muted" />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
