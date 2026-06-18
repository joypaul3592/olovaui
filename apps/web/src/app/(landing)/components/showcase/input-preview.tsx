import { Input } from "@/app/components/input/input";

export default function InputPreview() {
  return (
    <div className="w-full max-w-[240px]">
      <Input value="olova-ui" readOnly aria-label="Olova UI input preview" />
    </div>
  );
}
