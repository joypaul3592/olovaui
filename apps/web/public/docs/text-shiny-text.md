# Shiny Text

Shiny Text animates a moving gradient highlight across text. You can control the sweep speed, direction, spread angle, idle delay, and optional yoyo behavior for back-and-forth motion.

    Preview
    Code
  preview
    } reTrigger={true} />
  code

## Basic Usage

```tsx

export function Example() {
  return (
    <ShinyText
      text="Premium Unlock"
      speed={1.2}
      color="#b48600"
      shineColor="#ffe566"
    />
  );
}
```

## Props

| Prop           | Type                | Default     | Description                                   |
| :------------- | :------------------ | :---------- | :-------------------------------------------- |
| `text`         | `string`            | required    | Text content to render with the shine effect. |
| `disabled`     | `boolean`           | `false`     | Disables animation and keeps text static.     |
| `speed`        | `number`            | `5`         | Sweep duration in seconds.                    |
| `className`    | `string`            | `""`        | Additional classes for the text element.      |
| `color`        | `string`            | `"#4b5563"` | Base text color used in gradient stops.       |
| `shineColor`   | `string`            | `"#ffffff"` | Highlight color at the center of the sweep.   |
| `spread`       | `number`            | `120`       | Gradient angle in degrees.                    |
| `yoyo`         | `boolean`           | `false`     | Reverses the sweep back after each pass.      |
| `pauseOnHover` | `boolean`           | `false`     | Pauses motion while hovered.                  |
| `direction`    | `"left" \| "right"` | `"left"`    | Controls sweep direction.                     |
| `delay`        | `number`            | `0`         | Idle delay in seconds between sweeps.         |

## Direction + Hover Pause

```tsx
<ShinyText
  text="Hover me to pause"
  direction="right"
  pauseOnHover
  speed={1.5}
  color="#064e3b"
  shineColor="#34d399"
  className="cursor-pointer"
/>
```

## Yoyo Sweep

```tsx
<ShinyText
  text="Bouncing light ray"
  yoyo
  speed={2.5}
  color="#1e3a8a"
  shineColor="#60a5fa"
/>
```