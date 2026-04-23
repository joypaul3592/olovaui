# Shiny Text Animation

A stunning animated text component with a shimmering shine effect that creates a metallic, glossy appearance. The effect simulates light reflecting off a surface, giving text a premium, high-end look. Perfect for headlines, titles, and eye-catching text elements that demand attention.

    Preview
    Code
  preview
    } reTrigger={true} />
  code


## Basic Usage

Import and use the ShinyText component with customizable properties. Adjust the duration, colors, and animation timing to match your design requirements.

```tsx
"use client"


export function ShinyTextView() {
    return (
      <div className='text-center'>
       <ShinyText
       delay={0}
       duration={2}
       shimmerColor="#ffffff"
       shineColor="#facc15"
       className="text-2xl md:text-6xl font-bold mb-8"
       >
       Shiny Text Effect
       </ShinyText>
      </div>
    );
}
```

## Custom Properties

Fine-tune the shine effect with various customization options to create unique visual experiences.

```tsx

<ShinyText
  delay={0.5}
  duration={1.5}
  shimmerColor="#a78bfa"
  shineColor="#c084fc"
  className="text-4xl font-bold"
  animateBy="words"
>
  Custom Shine Colors
</ShinyText>

```

## Advanced Configuration

Create sophisticated shiny text effects by combining multiple parameters for unique visual outcomes.

```tsx

// Golden shine effect
<ShinyText
  duration={3}
  shimmerColor="#fbbf24"
  shineColor="#f59e0b"
  className="text-5xl font-black"
>
  Golden Text
</ShinyText>

// Neon shine effect
<ShinyText
  duration={1.2}
  shimmerColor="#22d3ee"
  shineColor="#06b6d4"
  className="text-4xl font-bold"
>
  Neon Glow
</ShinyText>
```