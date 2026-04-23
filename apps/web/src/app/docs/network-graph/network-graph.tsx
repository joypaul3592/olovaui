"use client";

import { useMemo } from "react";

export type NetworkGraphItem = {
  id: string;
  image: string;
  alt?: string;
  onClick?: (node: NetworkGraphItem & { x: number; y: number }) => void;
};

export type NetworkGraphRingConfig = {
  radius: number;
  capacity: number;
  blur: string;
  opacity: string;
  size: number;
  dashedColor: string;
  spinClass: string;
  counterSpinClass: string;
};

export const DEFAULT_RING_CONFIG: NetworkGraphRingConfig[] = [
  {
    radius: 110,
    capacity: 6,
    blur: "blur-none",
    opacity: "opacity-100",
    size: 64,
    dashedColor: "border-black/20 dark:border-white/20",
    spinClass: "animate-[spin_40s_linear_infinite]",
    counterSpinClass: "animate-[spin_40s_linear_infinite_reverse]",
  },
  {
    radius: 210,
    capacity: 12,
    blur: "blur-[3px]",
    opacity: "opacity-90",
    size: 56,
    dashedColor: "border-black/10 dark:border-white/10",
    spinClass: "animate-[spin_70s_linear_infinite_reverse]",
    counterSpinClass: "animate-[spin_70s_linear_infinite]",
  },
  {
    radius: 320,
    capacity: 18,
    blur: "blur-[6px]",
    opacity: "opacity-70",
    size: 48,
    dashedColor: "border-black/5 dark:border-white/5",
    spinClass: "animate-[spin_110s_linear_infinite]",
    counterSpinClass: "animate-[spin_110s_linear_infinite_reverse]",
  },
  {
    radius: 440,
    capacity: 24,
    blur: "blur-[10px]",
    opacity: "opacity-40",
    size: 40,
    dashedColor: "border-black/[0.03] dark:border-white/[0.03]",
    spinClass: "animate-[spin_160s_linear_infinite_reverse]",
    counterSpinClass: "animate-[spin_160s_linear_infinite]",
  },
  {
    radius: 570,
    capacity: 32,
    blur: "blur-[16px]",
    opacity: "opacity-20",
    size: 36,
    dashedColor: "border-black/[0.02] dark:border-white/[0.02]",
    spinClass: "animate-[spin_220s_linear_infinite]",
    counterSpinClass: "animate-[spin_220s_linear_infinite_reverse]",
  },
];

type PositionedNode = NetworkGraphItem & {
  x: number;
  y: number;
};

type ConfiguredRing = NetworkGraphRingConfig & {
  nodes: PositionedNode[];
};

export interface NetworkGraphProps {
  items?: NetworkGraphItem[];
  ringConfig?: NetworkGraphRingConfig[];
}

export function NetworkGraph({
  items = [],
  ringConfig = DEFAULT_RING_CONFIG,
}: NetworkGraphProps) {
  const rings = useMemo<ConfiguredRing[]>(() => {
    let currentItemIndex = 0;
    const configuredRings: ConfiguredRing[] = [];

    for (let ringIdx = 0; ringIdx < ringConfig.length; ringIdx += 1) {
      if (currentItemIndex >= items.length) {
        break;
      }

      const ringDef = ringConfig[ringIdx];
      const remainingItems = items.length - currentItemIndex;
      const nodeCount = Math.min(ringDef.capacity, remainingItems);
      const nodes: PositionedNode[] = [];

      for (let i = 0; i < nodeCount; i += 1) {
        const item = items[currentItemIndex];
        currentItemIndex += 1;

        const baseAngle = (i / nodeCount) * 2 * Math.PI;
        const angleOffset = ringIdx % 2 !== 0 ? Math.PI / nodeCount : 0;
        const angle = baseAngle + angleOffset;

        nodes.push({
          ...item,
          x: ringDef.radius * Math.cos(angle),
          y: ringDef.radius * Math.sin(angle),
        });
      }

      configuredRings.push({ ...ringDef, nodes });
    }

    return configuredRings;
  }, [items, ringConfig]);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {rings.map((ring, ringIndex) => (
        <div
          key={`ring-container-${ringIndex}`}
          className={`pointer-events-none absolute h-full w-full ${ring.spinClass}`}
        >
          <div
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed ${ring.dashedColor}`}
            style={{ width: `${ring.radius * 2}px`, height: `${ring.radius * 2}px` }}
          />

          {ring.nodes.map((node) => (
            <button
              key={node.id}
              type="button"
              onClick={() => node.onClick?.(node)}
              className={`group absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto transition-all duration-500 ease-out hover:!z-50 hover:!blur-none hover:!opacity-100 hover:scale-[1.3] ${ring.blur} ${ring.opacity}`}
              style={{
                left: `calc(50% + ${node.x}px)`,
                top: `calc(50% + ${node.y}px)`,
                width: `${ring.size}px`,
                height: `${ring.size}px`,
              }}
              title={node.alt || `Node ${node.id}`}
            >
              <span
                className={`block h-full w-full overflow-hidden rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-slate-800 shadow-2xl ${ring.counterSpinClass}`}
              >
                <img
                  src={node.image}
                  alt={node.alt || "Network node"}
                  className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-80"
                  loading="lazy"
                />
              </span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
