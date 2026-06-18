export default function InputOTPPreview() {
  return (
    <div className="flex gap-2">
      {["2", "4", "8", "0"].map((digit, index) => (
        <span key={`${digit}-${index}`} className="flex h-10 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-semibold shadow-sm">
          {digit}
        </span>
      ))}
    </div>
  );
}
