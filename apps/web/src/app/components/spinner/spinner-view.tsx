"use client";
import { Spinner } from "./spinner";
export function SpinnerDefaultView() {
  return (
    <div className="flex w-full items-center justify-center gap-4">
      <Spinner className="h-4 w-4" />
      <Spinner className="h-6 w-6" />
      <Spinner className="h-8 w-8" />
    </div>
  );
}
export default SpinnerDefaultView;
