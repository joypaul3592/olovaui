export default function ShinyTextPreview() {
  return (
    <div className="relative flex h-32 w-full max-w-[238px] items-center justify-center overflow-hidden rounded-lg border border-border bg-background">
      <div className="absolute inset-x-7 top-8 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
      <div className="absolute inset-x-10 bottom-8 h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent" />
      <div className="text-center">
        <p className="bg-[linear-gradient(105deg,#18181b_20%,#f59e0b_38%,#ffffff_46%,#0ea5e9_54%,#18181b_72%)] bg-[length:220%_100%] bg-clip-text text-2xl font-bold text-transparent dark:bg-[linear-gradient(105deg,#f4f4f5_20%,#fbbf24_38%,#ffffff_46%,#38bdf8_54%,#f4f4f5_72%)] motion-safe:animate-[gradient_3s_ease_infinite]">
          Shiny Text
        </p>
        <p className="mt-2 text-xs text-muted-foreground">Animated highlight sweep</p>
      </div>
    </div>
  );
}
