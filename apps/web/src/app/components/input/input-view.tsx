"use client";
import { Input } from "./input";
export function InputDefaultView() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-3">
      <Input placeholder="name@example.com" />
      <Input type="password" placeholder="••••••••" />
    </div>
  );
}
export default InputDefaultView;
