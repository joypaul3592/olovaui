"use client";

import { ReactNode } from "react";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { DocPagination } from "@/components/documentation/doc-pagination";
import { navigation, type NavigationItem } from "@/constants/navigation";

export function DocsLayoutContent({
  children,
  items = navigation,
  showPagination = true,
}: {
  children: ReactNode;
  items?: NavigationItem[];
  showPagination?: boolean;
}) {
  return (
    <div className="w-full flex-col bg-background text-foreground relative">
      <Header />
      <div className="mx-auto max-w-[1536px] flex flex-1 md:space-x-16">
        <Sidebar items={items} />
        <main className="flex-1 py-6 pb-16 pt-8 min-w-0 px-4 text-foreground max-w-none pr-8 border-r border-border">
          <div className="prose prose-zinc dark:prose-invert prose-h1:text-3xl prose-h1:font-semibold prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-14 prose-h3:text-lg prose-h3:font-medium prose-h3:scroll-m-20 max-w-full">
            {children}
          </div>
          {showPagination && (
            <div className="not-prose">
              <DocPagination />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

