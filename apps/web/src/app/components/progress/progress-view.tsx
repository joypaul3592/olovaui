"use client";
import { Progress } from "./progress";
export function ProgressDefaultView() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-3 rounded-md border p-4">
      <Progress value={24} />
      <Progress value={67} />
      <Progress value={96} />
    </div>
  );
}
export default ProgressDefaultView;
