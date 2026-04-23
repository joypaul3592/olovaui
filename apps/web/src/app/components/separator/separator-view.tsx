"use client";
import { Separator } from "./separator";
export function SeparatorDefaultView() {
  return (
    <div className="mx-auto flex w-full max-w-sm items-center gap-3 rounded-md border p-4 text-sm">
      <span>Profile</span>
      <Separator orientation="vertical" />
      <span>Billing</span>
      <Separator orientation="vertical" />
      <span>Team</span>
    </div>
  );
}
export default SeparatorDefaultView;
