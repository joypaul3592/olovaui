# Letter Glitch

A terminal-inspired text effect that scrambles letters with neon-tinted chaos before settling into the final message. It works well for boot screens, status labels, and dramatic hero copy.

    Preview
    Code
  preview
    } reTrigger={true} />
  code

## Usage

```tsx
"use client";


export function Example() {
  return (
    <GlitchText
      color="#ffffff"
      glitchColors={["#1a3a2a", "#61dca3", "#2a4a3a"]}
      duration={700}
      stagger={22}
      glitchSpeed={35}
      className="text-sm font-mono"
    >
      > STATUS: ONLINE
    </GlitchText>
  );
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | required | Text content to animate. |
| `glitchColors` | `string[]` | `["#2b4539", "#61dca3", "#61b3dc"]` | Colors used for the scrambling effect. |
| `glitchSpeed` | `number` | `50` | Refresh rate for the scrambling animation in ms. |
| `smooth` | `boolean` | `true` | Uses an eased reveal instead of a linear transition. |
| `characters` | `string` | `ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789` | Pool of characters used while scrambling. |
| `duration` | `number` | `1000` | Reveal duration for each character in ms. |
| `stagger` | `number` | `20` | Delay between each character reveal in ms. |
| `color` | `string` | `#fff` | Final text color. |
| `fontSize` | `CSSProperties["fontSize"]` | `inherit` | Font size for the rendered text. |
| `fontWeight` | `CSSProperties["fontWeight"]` | `inherit` | Font weight for the rendered text. |
| `triggerKey` | `number \| string` | `0` | Changing this value retriggers the animation. |
| `frozen` | `boolean` | `false` | Keeps the text in a continuous scrambled state. |
| `onComplete` | `() => void` | - | Called when the reveal finishes. |
| `className` | `string` | `""` | Additional classes for the wrapper. |