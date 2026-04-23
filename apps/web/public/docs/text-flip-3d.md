# 3D Flip In

A stunning 3D flip animation that reveals text with perspective. Text flips in from the top with a 3D rotation effect, creating a dramatic and eye-catching entrance.

    Preview
    Code
  preview
    } reTrigger={true} />
  code

## Basic Usage

Import and use the Flip3D component with customizable animation properties.

```tsx
"use client"


export function Flip3DView() {
  return (
    <div className='text-center'>
      <Flip3D
        delay={100}
        animateBy="words"
        onAnimationComplete={() => console.log('Done!')}
        className="text-2xl md:text-6xl mb-8"
      >
        3D Flip Animation
      </Flip3D>
    </div>
  );
}
```