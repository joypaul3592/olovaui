import { DocsLayoutContent } from "@/components/layout/docs-layout-content";
import { componentsNavigation } from "@/constants/components-navigation";
import { ReactNode } from "react";

export default function ComponentsLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayoutContent items={componentsNavigation} showPagination={false}>
      {children}
    </DocsLayoutContent>
  );
}
