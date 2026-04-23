# Memories Card

A premium, interactive card stack component featuring 3D tilt effects, a dynamic "fan" background spread, and smooth swipe-to-next-card functionality. Perfect for showcasing memories, galleries, or highlighted features.

    Preview
    Code
  preview
    } reTrigger={true} />
  code

## Usage

Step 1: Copy the component code into your project (e.g., at `src/components/olovaui/memories-card.tsx`).

Step 2: Import and use it in your page.

```tsx

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
      <MemoriesCard />
    </div>
  );
}
```

## Features

- **3D Perspective Tilt**: Interactive card tilting based on mouse position.
- **Dynamic Fan Spread**: Background cards fan out beautifully on hover or drag.
- **Swipe-to-Next**: Intuitive pointer-based swipe interaction to cycle through items.
- **Auto Mode Ready**: seamlessly supports light and dark themes.
- **Portable**: Zero-config container logic, fits into any layout.