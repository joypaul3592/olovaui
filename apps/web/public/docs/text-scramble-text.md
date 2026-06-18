# Scramble Text

Scramble Text creates a mouse-reactive interference effect by scrambling nearby characters, then resolving them back to the original text.

    Preview
    Code
  preview
    } reTrigger={true} />
  code

## Basic Usage

```tsx

export function Example() {
  return (
    <ScrambleText className="text-xl text-zinc-400">
      Move your cursor over this sentence.
    </ScrambleText>
  );
}
```

## Props

| Prop          | Type                  | Default      | Description                                                   |
| :------------ | :-------------------- | :----------- | :------------------------------------------------------------ |
| `children`    | `string`              | required     | Text content to render and scramble.                          |
| `chars`       | `string`              | `"01001101"` | Character pool used while scrambling.                         |
| `speed`       | `number`              | `35`         | Interval in milliseconds between scrambled character updates. |
| `radius`      | `number`              | `130`        | Cursor proximity radius that activates scrambling.            |
| `as`          | `React.ElementType`   | `"p"`        | Wrapper element tag (for example `"h1"` or `"span"`).         |
| `className`   | `string`              | `""`         | Additional classes for the wrapper element.                   |
| `style`       | `React.CSSProperties` | `undefined`  | Inline style overrides for the wrapper.                       |
| `accentColor` | `string`              | `"#ff6b35"`  | Accent color used for active scrambled glow.                  |

## Customized Variant

```tsx
<ScrambleText
  as="h1"
  chars="+-*#%@$!?<>[]{}"
  speed={20}
  radius={180}
  accentColor="#00ffcc"
  className="text-4xl font-bold text-center"
>
  You can easily reuse this component anywhere in your app.
</ScrambleText>
```