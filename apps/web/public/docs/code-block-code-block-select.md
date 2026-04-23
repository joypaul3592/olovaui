# Code Block Select

A sleek code block with a dropdown selector for switching between package manager commands. Features a compact design with a dropdown menu for selecting the package manager.

    Preview
    Code
  preview
    } reTrigger={true} />
  code

## Usage

```tsx

export default function Example() {
  return (
    <CodeBlockSelect
      pnpm="pnpm add olova"
      yarn="yarn add olova"
      npm="npm install olova"
      bun="bun add olova"
    />
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `npm` | `string` | The npm command to display |
| `pnpm` | `string` | The pnpm command to display |
| `yarn` | `string` | The yarn command to display |
| `bun` | `string` | The bun command to display |

## Features

- Dropdown selector with package manager icons
- Copy to clipboard functionality
- Dark theme by default
- Compact and sleek design
- Click outside to close dropdown