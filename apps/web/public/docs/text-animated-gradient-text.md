# Animated Gradient Text

Animated Gradient Text applies a moving multicolor gradient to text, with optional gradient border mode. You can control direction, speed, yoyo behavior, and pause-on-hover.

    Preview
    Code
  preview
    <ComponentRenderer
      component={}
      reTrigger={true}
    />
  code

## Basic Usage

```tsx

export function Example() {
  return (
    <GradientText animationSpeed={5} className="text-4xl font-bold">
      Clean Syntax
    </GradientText>
  );
}
```

## Props

| Prop             | Type                                       | Default                             | Description                                        |
| :--------------- | :----------------------------------------- | :---------------------------------- | :------------------------------------------------- |
| `children`       | `ReactNode`                                | required                            | Text or inline content to render.                  |
| `className`      | `string`                                   | `""`                                | Additional classes for the wrapper.                |
| `colors`         | `string[]`                                 | `["#5227FF", "#FF9FFC", "#B497CF"]` | Gradient palette sequence.                         |
| `animationSpeed` | `number`                                   | `8`                                 | Duration in seconds for a forward pass.            |
| `showBorder`     | `boolean`                                  | `false`                             | Enables animated border treatment around the text. |
| `direction`      | `"horizontal" \| "vertical" \| "diagonal"` | `"horizontal"`                      | Direction of gradient movement.                    |
| `pauseOnHover`   | `boolean`                                  | `false`                             | Pauses animation while hovered.                    |
| `yoyo`           | `boolean`                                  | `true`                              | Reverses the animation back and forth each cycle.  |

## Border + Hover Pause

```tsx
<AnimatedGradientText
  showBorder
  pauseOnHover
  yoyo={false}
  animationSpeed={3}
  colors={["#FF512F", "#F09819", "#FF512F"]}
  className="text-2xl font-semibold"
>
  Hover to Pause • Endless Loop
</AnimatedGradientText>
```

## Vertical Direction

```tsx
<AnimatedGradientText
  direction="vertical"
  colors={["#00C9FF", "#92FE9D", "#00C9FF"]}
  className="text-5xl font-black uppercase tracking-widest"
>
  Vertical
</AnimatedGradientText>
```