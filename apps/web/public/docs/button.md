# Button

A versatile button component that supports multiple variants, sizes, and states.

## Installation

    ```bash
    pnpm dlx shadcn@latest add "https://olovaui.olova.net/registry/button.json"
    ```
    ```bash
    npx shadcn@latest add "https://olovaui.olova.net/registry/button.json"
    ```
     ```bash
    yarn dlx shadcn@latest add "https://olovaui.olova.net/registry/button.json"
    ```
     ```bash
    bunx shadcn@latest add "https://olovaui.olova.net/registry/button.json"
    ```

## Usage

```tsx

export default function Example() {
  return (
    <Button variant="default" size="md">
      Click me
    </Button>
  )
}
```

## Examples

### Variants

The button component comes with several built-in variants:

- **Default**: The primary button style
- **Secondary**: A secondary button style
- **Outline**: An outlined button
- **Ghost**: A subtle button with no background
- **Destructive**: For dangerous actions

### Sizes

Available sizes:
- **sm**: Small button
- **md**: Default medium size
- **lg**: Large button
- **xl**: Extra large button

### States

Buttons support various states:
- **Default**: Normal interactive state
- **Loading**: Shows loading spinner
- **Disabled**: Non-interactive state

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'secondary' \| 'outline' \| 'ghost' \| 'destructive'` | `'default'` | The visual variant of the button |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | The size of the button |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `loading` | `boolean` | `false` | Whether to show loading state |
| `children` | `ReactNode` | - | Button content |
| `onClick` | `() => void` | - | Click handler function |

## Accessibility

The Button component follows WAI-ARIA guidelines:

- Uses semantic `button` element
- Supports keyboard navigation
- Provides proper focus management
- Includes appropriate ARIA attributes when disabled or loading

## Examples

### Basic Usage

```tsx
<Button>Default Button</Button>
```

### With Variants

```tsx
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
```

### Different Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
```

### Loading State

```tsx
<Button loading>Loading...</Button>
```

### Disabled State

```tsx
<Button disabled>Disabled</Button>
```