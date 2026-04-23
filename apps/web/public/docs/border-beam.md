# Border Beam

An animated beam of light that travels along the border of its container. Ideal for feature callouts, pricing cards, and premium UI highlights.

    Preview
    Code
  preview
    } reTrigger={true} />
  code

## Basic Usage

```tsx

export function Example() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200 p-8">
      <BorderBeam size={220} duration={12} />
      <div className="relative z-10">
        Your content here
      </div>
    </div>
  );
}
```

## Tips

- Use a `relative` container with `overflow-hidden` so the beam stays clipped to the edges.
- Adjust `size` to control how thick and long the beam appears.
- Combine with a gradient background or soft glow for extra depth.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `number` | `50` | Beam size in pixels. |
| `duration` | `number` | `6` | Animation duration in seconds. |
| `delay` | `number` | `0` | Animation delay in seconds. |
| `colorFrom` | `string` | `"#ffaa40"` | Gradient start color. |
| `colorTo` | `string` | `"#9c40ff"` | Gradient end color. |
| `reverse` | `boolean` | `false` | Reverse the animation direction. |
| `initialOffset` | `number` | `0` | Start offset as a percentage (0-100). |
| `paused` | `boolean` | `false` | Pause the animation. |
| `borderRadius` | `number | "auto"` | `"auto"` | Border radius for the motion path. |
| `opacity` | `number` | `1` | Beam opacity. |
| `transition` | `Transition` | `undefined` | Motion transition overrides. |
| `className` | `string` | `undefined` | Additional classes for the beam. |
| `style` | `React.CSSProperties` | `undefined` | Inline styles for the beam. |