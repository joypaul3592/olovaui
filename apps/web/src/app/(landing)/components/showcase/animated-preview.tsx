import { Sparkles } from "lucide-react";

interface AnimatedPreviewProps {
  name: string;
  category: string;
}

export default function AnimatedPreview({ name, category }: AnimatedPreviewProps) {
  return (
    <div className="flex min-h-24 w-full max-w-[240px] flex-col items-center justify-center rounded-lg border border-border bg-card px-4 text-center">
      <Sparkles className="h-5 w-5 text-primary motion-safe:animate-pulse" aria-hidden="true" />
      <p className="mt-3 text-sm font-semibold">{name}</p>
      <p className="mt-1 text-xs text-muted-foreground">{category} animation</p>
    </div>
  );
}
