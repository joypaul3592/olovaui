# 3D Carousel

A premium 3D carousel with a fanned layout, smooth interactive animations, and a sleek dark aesthetic. It supports auto-play, keyboard navigation, and mouse/touch drag interactions.

    Preview
    Code
  preview
    } reTrigger={true} />
  code

## Features

- **3D Fanned Layout**: A unique stacked appearance with depth and rotation.
- **Interactive Dragging**: Supports smooth drag interactions on both mouse and touch.
- **Auto-play**: Infinite looping with pause on hover.
- **Keyboard Navigation**: Use ArrowLeft and ArrowRight keys to browse.
- **Responsive**: Adapts the fan spacing and scale for mobile devices.

## Usage

Simply import the `Carousel3D` component and pass your cards.

```tsx

const CARDS = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853",
    glowColor: "rgba(148, 163, 184, 0.4)",
  },
  // ... more cards
];

export function Page() {
  return (
    <Carousel3D cards={CARDS} autoPlayInterval={3000} />
  );
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `cards` | `Carousel3DCard[]` | `DEFAULT_CARDS` | Array of card objects with `id`, `imageUrl`, and optional `glowColor`. |
| `autoPlay` | `boolean` | `true` | Whether the carousel should automatically cycle through cards. |
| `autoPlayInterval` | `number` | `2500` | Duration (in ms) between transitions when auto-play is enabled. |
| `className` | `string` | `""` | Additional CSS classes for the container. |

### Carousel3DCard Type

```tsx
export interface Carousel3DCard {
  id: string | number;
  imageUrl: string;
  glowColor?: string;
}
```