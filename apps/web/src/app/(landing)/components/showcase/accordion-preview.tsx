import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/components/accordion/accordion";

export default function AccordionPreview() {
  return (
    <Accordion defaultValue="one" className="max-w-[250px] rounded-lg">
      <AccordionItem value="one">
        <AccordionTrigger className="py-3">Install</AccordionTrigger>
        <AccordionContent>Copy from the registry.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
