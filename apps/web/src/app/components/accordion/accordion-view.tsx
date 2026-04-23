"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

export function AccordionView() {
  return (
    <div className="w-full max-w-md">
      <Accordion type="single" defaultValue="item-2" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Base UI?</AccordionTrigger>
          <AccordionContent>
            Base UI is a collection of accessible, unstyled components designed to
            help you build consistent UI faster.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How do I get started?</AccordionTrigger>
          <AccordionContent>
            Install the component, copy the source, and customize it with your
            theme tokens.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Can I use it for my project?</AccordionTrigger>
          <AccordionContent>
            Of course! Olova UI is free, open source, and ready for production.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export function AccordionMultipleView() {
  return (
    <div className="w-full max-w-md">
      <Accordion type="multiple" defaultValue={["item-1", "item-3"]}>
        <AccordionItem value="item-1">
          <AccordionTrigger>First panel</AccordionTrigger>
          <AccordionContent>Open with other panels.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Second panel</AccordionTrigger>
          <AccordionContent>Multiple items can stay open.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Third panel</AccordionTrigger>
          <AccordionContent>Default open panels are supported.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default AccordionView;
