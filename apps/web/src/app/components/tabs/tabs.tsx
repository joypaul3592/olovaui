"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type TabsInternalProps = {
  value?: string;
  setValue?: (value: string) => void;
};

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
}
export function Tabs({ defaultValue, className, children, ...props }: TabsProps) {
  const [value, setValue] = React.useState(defaultValue);
  return (
    <div className={cn("w-full", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, { value, setValue } as Record<string, unknown>);
      })}
    </div>
  );
}
export function TabsList({
  className,
  children,
  value,
  setValue,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & TabsInternalProps) {
  return (
    <div className={cn("inline-flex rounded-md border border-border bg-muted/50 p-1", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, { value, setValue } as Record<string, unknown>);
      })}
    </div>
  );
}
export function TabsTrigger({ className, tabValue, value, setValue, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { tabValue: string } & TabsInternalProps) {
  const active = value === tabValue;
  return <button type="button" className={cn("rounded px-3 py-1.5 text-sm", active ? "bg-background shadow" : "text-muted-foreground", className)} onClick={() => setValue?.(tabValue)} {...props} />;
}
export function TabsContent({ className, tabValue, value, setValue: _setValue, ...props }: React.HTMLAttributes<HTMLDivElement> & { tabValue: string } & TabsInternalProps) {
  if (value !== tabValue) return null;
  return <div className={cn("mt-3 rounded-md border p-3", className)} {...props} />;
}
