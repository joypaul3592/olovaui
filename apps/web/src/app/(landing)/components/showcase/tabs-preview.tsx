import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/tabs/tabs";

export default function TabsPreview() {
  return (
    <Tabs defaultValue="preview" className="max-w-[250px]">
      <TabsList>
        <TabsTrigger tabValue="preview">Preview</TabsTrigger>
        <TabsTrigger tabValue="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent tabValue="preview" className="text-sm p-4">Live component output.</TabsContent>
      <TabsContent tabValue="code" className="text-sm p-4">{"<Button />"}</TabsContent>
    </Tabs>
  );
}
