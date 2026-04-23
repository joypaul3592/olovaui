import { DocsLayoutContent } from "@/components/layout/docs-layout-content";
import { ReactNode } from "react";

export default function UsageLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayoutContent>{children}</DocsLayoutContent>
  );
}
