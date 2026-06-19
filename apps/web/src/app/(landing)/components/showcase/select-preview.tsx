import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/app/components/select/select";

const frameworks = [
  { value: "react", label: "React" },
  { value: "next", label: "Next.js" },
];

export default function SelectPreview() {
  return (
    <div className="max-w-55">
      <Select defaultValue="react">
        <SelectTrigger>
          <SelectValue placeholder="Select a framework" options={frameworks} />
        </SelectTrigger>
        <SelectContent>
          {frameworks.map((framework) => (
            <SelectItem key={framework.value} value={framework.value}>
              {framework.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
