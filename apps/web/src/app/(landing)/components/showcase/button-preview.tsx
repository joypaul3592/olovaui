import { Button } from "@/app/components/button/button";

export default function ButtonPreview() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button size="md">Default</Button>
      <Button size="md" variant="outline">Outline</Button>
    </div>
  );
}
