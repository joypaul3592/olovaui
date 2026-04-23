# Code Block Simple

A clean, tabbed code block for package manager commands with a copy-to-clipboard button.

    Preview
    Code
  preview
    } reTrigger={true} />
  code

## Usage

```tsx

export default function Example() {
  return (
    <SmCodeBlockCommand
      pnpm="pnpm dlx shadcn add @olovaui/code-block-command"
      yarn="yarn shadcn add @olovaui/code-block-command"
      npm="npx shadcn add @olovaui/code-block-command"
      bun="bunx --bun shadcn add @olovaui/code-block-command"
    />
  );
}
```

## Notes

- Pass in different command strings to update the tab content.