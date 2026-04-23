"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/layout/tabs";
import { usePackageManager, type PackageManager } from "@/context/package-manager-context";
import { FaYarn } from "react-icons/fa";
import { SiNpm, SiPnpm, SiBun } from "react-icons/si";
import { cn } from "@/lib/utils";

interface PackageManagerTabsProps {
  children: React.ReactNode;
  className?: string;
}

interface TabContentProps {
  packageManager: PackageManager;
  children: React.ReactNode;
}

export function PMTabContent({ packageManager, children }: TabContentProps) {
  return (
    <TabsContent value={packageManager} className="mt-0 border-0 p-0 [&_div.group]:my-0">
      {children}
    </TabsContent>
  );
}

export function PackageManagerTabs({ children, className }: PackageManagerTabsProps) {
  const { packageManager, setPackageManager } = usePackageManager();

  const packageManagers: PackageManager[] = ["npm", "pnpm", "yarn", "bun"];

  const getIcon = (pm: PackageManager) => {
    switch (pm) {
      case "npm":
        return <SiNpm className="w-4 h-4" />;
      case "pnpm":
        return <SiPnpm className="w-4 h-4" />;
      case "yarn":
        return <FaYarn className="w-4 h-4" />;
      case "bun":
        // Bun is often just represented by the icon, but in monochrome it works as is.
        return <SiBun className="w-4 h-4" />;
    }
  };

  return (
    <div className={cn("relative flex flex-col rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 overflow-hidden shadow-sm my-6", className)}>
      <div className="flex items-center justify-start gap-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50 px-3 py-2 backdrop-blur-md">
        <Tabs
          value={packageManager}
          onValueChange={(value) => setPackageManager(value as PackageManager)}
          className="w-auto"
        >
          <TabsList className="bg-transparent border-none p-0 h-8 gap-2">
            {packageManagers.map((pm) => (
              <TabsTrigger
                key={pm}
                value={pm}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                  "text-muted-foreground hover:text-foreground hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50",
                  "data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800",
                  "data-[state=active]:text-foreground data-[state=active]:shadow-sm data-[state=active]:ring-1 data-[state=active]:ring-zinc-200 dark:data-[state=active]:ring-zinc-700"
                )}
              >
                {getIcon(pm)}
                <span className="capitalize">{pm}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="p-0">
        <Tabs value={packageManager} className="w-full">
          {/* This internal Tabs is just for the content logic/context, 
               driven by the shared packageManager state */}
          {children}
        </Tabs>
      </div>
    </div>
  );
}

export function NPMTabContent({ children }: { children: React.ReactNode }) {
  return <PMTabContent packageManager="npm">{children}</PMTabContent>;
}

export function PNPMTabContent({ children }: { children: React.ReactNode }) {
  return <PMTabContent packageManager="pnpm">{children}</PMTabContent>;
}

export function YarnTabContent({ children }: { children: React.ReactNode }) {
  return <PMTabContent packageManager="yarn">{children}</PMTabContent>;
}

export function BunTabContent({ children }: { children: React.ReactNode }) {
  return <PMTabContent packageManager="bun">{children}</PMTabContent>;
}

export { PackageManagerTabs as PMTabs };
