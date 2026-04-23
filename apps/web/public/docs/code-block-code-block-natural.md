# Code Block Natural
Code Block Natural is a beautiful, tabbed code block component for displaying package manager commands with copy functionality.


    Preview
    Code
  preview
    } reTrigger={true} />
  code

## Usage

```tsx

export function CodeBlockNatural() {
  return (
    <CodeBlockCommand
      pnpm="pnpm dlx shadcn add @ncdai/code-block-command"
      yarn="yarn shadcn add @ncdai/code-block-command"
      npm="npx shadcn add @ncdai/code-block-command"
      bun="bunx --bun shadcn add @ncdai/code-block-command"
    />
  );
}
```

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `pnpm` | `string` | Command for pnpm package manager |
| `yarn` | `string` | Command for yarn package manager |
| `npm` | `string` | Command for npm package manager |
| `bun` | `string` | Command for bun package manager |