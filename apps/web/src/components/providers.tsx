"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import { PackageManagerProvider } from "@/context/package-manager-context";
import { ThemeProvider } from "@/context/theme-context";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <PackageManagerProvider>
        <LazyMotion features={domAnimation}>{children}</LazyMotion>
      </PackageManagerProvider>
    </ThemeProvider>
  );
}
