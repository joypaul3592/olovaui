import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/card/card";

export default function CardPreview() {
  return (
    <Card className="w-full max-w-[230px] rounded-lg">
      <CardHeader className="p-4">
        <CardTitle className="text-base">Deploy ready</CardTitle>
        <CardDescription>Animated UI blocks.</CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="h-2 rounded-full bg-primary/70" />
      </CardContent>
    </Card>
  );
}
