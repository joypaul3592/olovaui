# Blur Text

A smooth blur-in animation that reveals text with a customizable blur effect and directional entrance. Characters or words fade in from blurred to sharp, creating an elegant and modern text reveal effect. Perfect for hero sections, headlines, and attention-grabbing content.

    Preview
    Code
  preview
    } reTrigger={true} />
  code

## Basic Usage

Import and use the BlurText component with customizable animation properties. Control the blur direction, animation speed, and whether to animate by characters or words.

```tsx
"use client";


export function BlurTextView() {
  return (
    <div className="text-center">
      <BlurText
        delay={150}
        animateBy="words"
        direction="top"
        onAnimationComplete={() => {}}
        className="text-2xl md:text-6xl mb-8"
      >
        Love This UI?
      </BlurText>
    </div>
  );
}
```

## Custom Animation Snapshots

Create your own animation effects by defining custom animation snapshots. Combine blur, opacity, and scale transformations to achieve unique text reveal effects.

```tsx

const customAnimation: AnimationSnapshot = {
  filter: "blur(20px)",
  opacity: 0,
  scale: 0.8,
};

<BlurText
  delay={150}
  animateBy="words"
  direction="top"
  onAnimationComplete={() => {}}
  className="text-2xl mb-8"
  animationFrom={customAnimation}
>
  Hello world
</BlurText>;
```