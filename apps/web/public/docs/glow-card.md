# Glow Card

Glow Card creates a pointer-tracking radial border effect with a soft halo and crisp inner highlight. It is useful for premium callouts, feature cards, and spotlight blocks on dark surfaces.

    Preview
    Code
  preview
    } reTrigger={true} />
  code

## Basic Usage

```tsx

export function Example() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07050d] p-8">
       <GlowCard>
          <h2>Your Title</h2>
          <p>Your content here</p>
        </GlowCard>
    </div>
  );
}
```

## Tips

- Keep the parent background dark for better glow contrast.
- Use a subtle always-on border so the card still reads when idle.
- Pair with gentle typography and spacing so the hover effect remains the focal point.