"use client";
import { Label } from "./label";
import { Input } from "../input/input";
export function LabelDefaultView() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="label-email">Email</Label>
      <Input id="label-email" placeholder="you@company.com" />
    </div>
  );
}
export default LabelDefaultView;
