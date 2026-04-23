"use client";

import { PackageManagerProvider } from "@/context/package-manager-context";
import { ThemeProvider } from "@/context/theme-context";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <PackageManagerProvider>{children}</PackageManagerProvider>
    </ThemeProvider>
  );
}
