import { Select } from "@/app/components/select/select";

export default function SelectPreview() {
  return (
    <Select defaultValue="react" className="max-w-[220px]" aria-label="Framework preview">
      <option value="react">React</option>
      <option value="next">Next.js</option>
    </Select>
  );
}
