export default function ButtonGroupPreview() {
  return (
    <div className="inline-flex overflow-hidden rounded-lg border border-border">
      {["Day", "Week", "Month"].map((label) => (
        <button key={label} type="button" className="border-r border-border px-3 py-2 text-sm last:border-r-0 first:bg-muted">
          {label}
        </button>
      ))}
    </div>
  );
}
