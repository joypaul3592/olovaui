# Network Graph

Network Graph is a layered orbital avatar visual that spreads items evenly across concentric rings. It works well for community showcases, team maps, social proof sections, and dense relationship-driven hero layouts.

    Preview
    Code
  preview
    } reTrigger={true} />
  code

## Basic Usage

```tsx

const items = [
  {
    id: "ada",
    image: "https://i.pravatar.cc/160?u=ada",
    alt: "Ada Lovelace",
  },
  {
    id: "grace",
    image: "https://i.pravatar.cc/160?u=grace",
    alt: "Grace Hopper",
  },
];

export function Example() {
  return (
    <div className="relative h-[720px] w-full overflow-hidden rounded-3xl bg-white dark:bg-black">
      <NetworkGraph items={items} />
    </div>
  );
}
```

## Tips

- Use a fixed-height container so the larger outer rings have enough room to render cleanly.
- Adjust `capacity` and `radius` together when customizing rings to keep spacing balanced.
- Pass `onClick` handlers per item when you want each node to open a profile, modal, or filtered view.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `NetworkGraphItem[]` | `[]` | Node data rendered across the configured rings. |
| `ringConfig` | `NetworkGraphRingConfig[]` | `DEFAULT_RING_CONFIG` | Ring layout, spacing, blur, opacity, and animation settings. |

### NetworkGraphItem Type

```tsx
type NetworkGraphItem = {
  id: string;
  image: string;
  alt?: string;
  onClick?: (node: NetworkGraphItem & { x: number; y: number }) => void;
};
```

### NetworkGraphRingConfig Type

```tsx
type NetworkGraphRingConfig = {
  radius: number;
  capacity: number;
  blur: string;
  opacity: string;
  size: number;
  dashedColor: string;
  spinClass: string;
  counterSpinClass: string;
};
```