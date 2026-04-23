# Wiggle on Hover

An interactive wiggle animation triggered on hover. Each character or word wiggles with a playful rotation when you hover over it, creating a fun and engaging user interaction.

    Preview
    Code
  preview
    } reTrigger={true} />
  code

## Basic Usage

Import and use the WiggleHover component with customizable animation properties.

```tsx
"use client"


export function WiggleHoverView() {
  return (
    <div className='text-center'>
      <WiggleHover
        animateBy="characters"
        className="text-2xl md:text-6xl mb-8"
      >
        Hover Over Me!
      </WiggleHover>
    </div>
  );
}
```