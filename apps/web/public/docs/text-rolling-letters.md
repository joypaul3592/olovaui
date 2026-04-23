# Rolling Letters

A smooth rolling animation that reveals text letter by letter from bottom to top. Each character rolls up into view with a smooth easing, creating a dynamic and engaging text reveal effect.

    Preview
    Code
  preview
    } reTrigger={true} />
  code

## Basic Usage

Import and use the RollingLetters component with customizable animation properties.

```tsx

export function RollingLettersView() {
  return (
    <div className='text-center'>
      <RollingLetters
        delay={50}
        className="text-2xl md:text-6xl"
      >
        Rolling Letters
      </RollingLetters>
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| children | `ReactNode` | required | The text content to animate. |
| delay | `number` | `50` | Delay between each letter animation in ms. |
| smokey | `boolean` | `true` | Enables the blur and scale "smokey" effect. |
| threshold | `number` | `0.1` | Intersection observer threshold. |
| rootMargin | `string` | `'0px'` | Intersection observer root margin. |
| onAnimationComplete | `() => void` | - | Callback when animation completes. |