"use client";
import { Skeleton } from "./skeleton";
export function SkeletonDefaultView() {
  return (
    <div className="mx-auto w-full max-w-sm space-y-3 rounded-md border p-4">
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
}
export default SkeletonDefaultView;
