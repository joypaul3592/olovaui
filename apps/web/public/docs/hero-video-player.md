# Hero Video Player

A beautiful hero video player with a glassmorphism play button and a smooth modal dialog. Perfect for product demos, hero sections, and feature highlights.

    Preview
    Code
  preview
    } reTrigger={true} />
  code

## Basic Usage

```tsx

export function Example() {
  return (
    <HeroVideoDialog
      videoSrc="https://www.youtube.com/embed/MFLVmAE4cqg"
      thumbnailSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
      title="Watch our product demo"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `videoSrc` | `string` | - | The URL of the video to play (e.g., YouTube embed URL). |
| `thumbnailSrc` | `string` | - | The URL of the thumbnail image to display. |
| `thumbnailAlt` | `string` | `"Video thumbnail"` | Alt text for the thumbnail image. |
| `title` | `string` | `"Play Video"` | Accessibility title for the video trigger. |
| `className` | `string` | `""` | Additional CSS classes for the container. |