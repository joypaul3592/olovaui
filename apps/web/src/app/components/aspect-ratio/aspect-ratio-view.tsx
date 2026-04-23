"use client";
import { AspectRatio } from "./aspect-ratio";
export function AspectRatioDefaultView() {
  return (
    <div className="mx-auto w-full max-w-xl">
      <AspectRatio>
        <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 via-muted to-primary/10 text-sm font-medium">16:9 Media Surface</div>
      </AspectRatio>
    </div>
  );
}
export default AspectRatioDefaultView;
