export default function TextareaPreview() {
  return (
    <textarea
      readOnly
      aria-label="Component description textarea preview"
      value="Beautifully crafted components"
      className="min-h-20 w-full max-w-[240px] resize-none rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none"
    />
  );
}
