# Pop In

A bouncy pop-in animation that reveals text with a spring effect. Characters or words scale up from zero with an elastic bounce, creating a playful and energetic entrance. Perfect for attention-grabbing headlines and dynamic content.

    Preview
    Code
  preview
    } reTrigger={true} />
  code

## Basic Usage

Import and use the PopIn component with customizable animation properties.

```tsx
"use client";


export function PopInView() {
  return (
    <div className="text-center">
      <PopIn
        delay={100}
        animateBy="words"
        onAnimationComplete={() => {}}
        className="text-2xl md:text-6xl mb-8"
      >
        Pop In Animation
      </PopIn>
    </div>
  );
}
```