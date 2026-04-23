# Beam Code Block

A stunning, animated terminal-style code block with beam spotlight effects and spring-animated tab navigation.

    Preview
    Code
  preview
    } reTrigger={true} />
  code

## Usage

```tsx

export default function Example() {
  return (
    <BeamCodeBlock
      tabs={[
        { label: "npm", command: "npm create vite@latest" },
        { label: "Yarn", command: "yarn create vite" },
        { label: "pnpm", command: "pnpm create vite" },
        { label: "Bun", command: "bun create vite" },
        { label: "Deno", command: "deno run -A npm:create-vite" },
      ]}
    />
  );
}
```

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `tabs` | `{ label: string; command: string }[]` | Array of tab objects, each with a `label` (displayed in the tab) and a `command` (displayed in the terminal area). |

## Notes

- The spotlight beam follows your mouse cursor across the tab bar.
- The active tab underline animates with a spring physics animation.
- Command text is syntax-highlighted with the first two words in purple and the rest in white.
- Requires `framer-motion` for spring animations.