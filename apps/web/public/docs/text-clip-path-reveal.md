# Clip Path Reveal

A sleek clip-path reveal animation that unveils text with a wipe effect. Text is revealed from left to right using CSS clip-path, creating a modern and sophisticated entrance effect.

    Preview
    Code
  preview
    } reTrigger={true} />
  code

## Basic Usage

Import and use the ClipPathReveal component with customizable animation properties.

```tsx
"use client"


export function ClipPathRevealView() {
  return (
    <div className='text-center'>
      <ClipPathReveal
        delay={100}
        animateBy="words"
        onAnimationComplete={() => console.log('Done!')}
        className="text-2xl md:text-6xl mb-8"
      >
        Clip Path Reveal Animation
      </ClipPathReveal>
    </div>
  );
}
```