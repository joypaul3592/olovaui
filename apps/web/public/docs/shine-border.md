# Shine Border

Shine Border is an animated background border effect. It creates a subtle rotating glow around any container.

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
      <ShineBorder borderWidth={2} duration={8} />
      <div className="relative z-10">Your content here</div>
    </div>
  );
}
```

## Tips

- Keep the container `relative` with `overflow-hidden` so the border stays clipped.
- Increase `borderWidth` for thicker borders.
- Slower `duration` creates a calmer shine.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `borderWidth` | `number` | `2` | Width of the animated border. |
| `duration` | `number` | `8` | Animation duration in seconds. |
| `colorFrom` | `string` | `"#60a5fa"` | Gradient start color. |
| `colorTo` | `string` | `"#a855f7"` | Gradient end color. |
| `paused` | `boolean` | `false` | Pause the animation. |
| `opacity` | `number` | `0.8` | Border opacity. |
| `className` | `string` | `undefined` | Additional classes for the shine layer. |
| `style` | `React.CSSProperties` | `undefined` | Inline styles for the shine layer. |