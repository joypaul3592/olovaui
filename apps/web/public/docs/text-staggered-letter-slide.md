# Staggered Letter Slide

A dynamic letter-by-letter slide animation with directional control. Each character slides in from the specified direction with a staggered delay, creating an impactful and engaging text reveal effect.

    Preview
    Code
  preview
    } reTrigger={true} />
  code

## Basic Usage

Import and use the StaggeredLetterSlide component with customizable animation properties.

```tsx
"use client"


export function StaggeredLetterSlideView() {
  return (
    <div className='text-center'>
      <StaggeredLetterSlide
        delay={50}
        direction="bottom"
        onAnimationComplete={() => console.log('Done!')}
        className="text-2xl md:text-6xl mb-8"
      >
        Letter Slide Animation
      </StaggeredLetterSlide>
    </div>
  );
}
```