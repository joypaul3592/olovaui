import { DocsLayoutContent } from "@/components/layout/docs-layout-content";
import { ReactNode } from "react";


// Force static generation for all docs pages

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayoutContent>{children}</DocsLayoutContent>
  );
}
