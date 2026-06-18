export default function AvatarPreview() {
  return (
    <div className="flex -space-x-3">
      {["N", "O", "UI"].map((label) => (
        <div key={label} className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-background bg-muted text-sm font-semibold">
          {label}
        </div>
      ))}
    </div>
  );
}
