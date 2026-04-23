# Flip Link

An interactive text animation component that flips each letter on hover with a smooth blur transition. Perfect for navigation menus and hero links.

    Preview
    Code
  preview
    } reTrigger={true} />
  code

## Features

- **Staggered Animation**: Each letter animate sequentially for a professional feel.
- **Blur Transition**: Smoothly fades letters with a Gaussian blur during the flip.
- **Fully Customizable**: Control timing, stagger, font-size and hover colors.
- **Accessible**: Renders as a standard anchor tag.

## Usage

```tsx

export function Example() {
  return (
    <div className="bg-zinc-950 p-24">
      <FlipLink
        href="#"
        fontSize="text-6xl md:text-8xl"
        hoverColor="hover:text-rose-500"
      >
        Projects
      </FlipLink>
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `string` | `undefined` | The text to be displayed and animated. |
| `href` | `string` | `"#"` | The URL the link points to. |
| `fontSize` | `string` | `"text-5xl sm:text-7xl md:text-8xl lg:text-9xl"` | Custom Tailwind font-size classes. |
| `hoverColor` | `string` | `"hover:text-emerald-400"` | Tailwind hover text color class. |
| `duration` | `number` | `0.25` | Duration of each letter's flip animation. |
| `stagger` | `number` | `0.025` | Delay between each letter's animation. |
| `className` | `string` | `""` | Additional CSS classes for the link. |