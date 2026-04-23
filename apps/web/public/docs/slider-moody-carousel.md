# Moody Carousel

A cinematic carousel that layers abstract photography, subtle gradients, and responsive controls so high-contrast hero imagery feels premium yet immersive.

    Preview
    Code
  preview
    } reTrigger={true} />
  code

## Features

- **Cinematic layers**: a graded vignette and glassy overlay keep text-safe areas legible while deepening the moody palette.
- **Interactive controls**: hover-triggered arrows, a slide counter, and animated pagination let people swipe confidently.
- **Progress-aware auto-play**: every cycle resets the progress bar, pauses on hover, and can be scrubbed via the indicators.
- **Fluid motion**: spring-led transitions, ken burns zoom, and indicator fills maintain a tactile, high-fidelity feel.
- **Accessibility polish**: keyboard navigation hooks into left/right arrows and buttons expand on hover for easier targeting.

## Usage

Import the `MoodyCarousel` component wherever you want a hero-grade slider experience. Copy the file out of `src/app/docs/slider/moody-carousel/moody-carousel.tsx` if you want to reuse it elsewhere, then drop the component into your layout.

```tsx

export function Page() {
  return <MoodyCarousel />;
}
```