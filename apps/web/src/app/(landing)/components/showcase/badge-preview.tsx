import { Badge } from "@/app/components/badge/badge";

export default function BadgePreview() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Badge>New</Badge>
      <Badge variant="secondary">Motion</Badge>
      <Badge variant="outline">React</Badge>
    </div>
  );
}
