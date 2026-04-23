# Rotating Cards

A cinematic, high-performance circular gallery built with Framer Motion. It features zero-react-render physics loops, smooth momentum-based dragging, mouse wheel support, and premium 3D hover effects.

    Preview
    Code
  preview
    } reTrigger={true} />
  code

## Features

- **Physics-Based Momentum**: Smooth starting, stopping, and "throwing" interactions.
- **Zero-Render Loop**: Uses `useAnimationFrame` and `useMotionValue` for 120fps performance without React re-renders.
- **Draggable & Mouse Wheel**: Multiple ways to interact with the gallery.
- **3D Hover Effects**: Cards tilt and scale with dynamic shadows on hover.
- **Infinite Auto-play**: Configurable speed and direction.

## Usage

```tsx

const CARDS = [
  { id: 1, img: "https://images.unsplash.com/photo-1..." },
  { id: 2, background: "linear-gradient(...)" },
  // ...
];

export function Example() {
  return (
    <RotatingCards
      cards={CARDS}
      radius={400}
      draggable={true}
      autoPlay={true}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `cards` | `RotatingCard[]` | `[]` | Array of card objects (`id`, `content`, `background`, `img`). |
| `radius` | `number` | `360` | The radius of the circular path. |
| `duration` | `number` | `20` | Time for one full rotation in seconds. |
| `cardWidth` | `number` | `160` | Width of each card. |
| `cardHeight` | `number` | `190` | Height of each card. |
| `pauseOnHover` | `boolean` | `true` | Pause auto-play when hovering. |
| `draggable` | `boolean` | `false` | Enable mouse/touch dragging. |
| `autoPlay` | `boolean` | `true` | Enable continuous rotation. |
| `mouseWheel` | `boolean` | `false` | Enable rotation via mouse wheel scroll. |
| `reverse` | `boolean` | `false` | Reverse the rotation direction. |

### RotatingCard Type

```tsx
export interface RotatingCard {
  id: number | string;
  content?: React.ReactNode;
  background?: string;
  img?: string;
}
```