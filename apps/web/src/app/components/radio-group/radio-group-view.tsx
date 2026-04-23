"use client";
import { RadioGroup, RadioGroupItem } from "./radio-group";
export function RadioGroupDefaultView() {
  return (
    <div className="mx-auto w-full max-w-sm rounded-md border p-4">
      <RadioGroup defaultValue="starter" name="plan">
        <RadioGroupItem value="starter" label="Starter" />
        <RadioGroupItem value="pro" label="Pro" />
        <RadioGroupItem value="enterprise" label="Enterprise" />
      </RadioGroup>
    </div>
  );
}
export default RadioGroupDefaultView;
