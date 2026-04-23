"use client";

import { useMemo } from "react";

import { NetworkGraph, type NetworkGraphItem } from "./network-graph";

export function NetworkGraphView() {
  const demoItems = useMemo<NetworkGraphItem[]>(
    () =>
      Array.from({ length: 75 }, (_, index) => ({
        id: `user-node-${index}`,
        image: `https://i.pravatar.cc/160?u=network_graph_${index + 500}`,
        alt: `User profile ${index + 1}`,
      })),
    [],
  );

  return (
    <div className="w-full">
      <div className="relative mx-auto flex min-h-[820px] w-full max-w-6xl items-center justify-center overflow-hidden rounded-[32px] border border-black/10 dark:border-white/10 bg-white dark:bg-[#030303] px-4 py-12 shadow-[0_30px_120px_rgba(0,0,0,0.05)] dark:shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/[0.02] dark:bg-white/[0.02] blur-[120px]" />
        <NetworkGraph items={demoItems} />
      </div>
    </div>
  );
}

export default NetworkGraphView;
