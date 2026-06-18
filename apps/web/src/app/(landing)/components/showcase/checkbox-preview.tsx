import { Checkbox } from "@/app/components/checkbox/checkbox";

export default function CheckboxPreview() {
  return (
    <label className="flex min-h-[44px] items-center gap-3 text-sm cursor-pointer" htmlFor="enable-motion-preview">
      <Checkbox id="enable-motion-preview" checked readOnly aria-label="Enable motion checkbox preview" />
      Enable motion
    </label>
  );
}
