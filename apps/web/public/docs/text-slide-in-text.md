# Slide In Text

A smooth character-by-character slide-in animation that reveals text from left to right with a subtle staggered delay. Perfect for hero sections and attention-grabbing headlines.

    Preview
    Code
  preview
    } reTrigger={true} />
  code

# Usage

```tsx

export function SlideInView() {
    return (
      <div className='text-center'>
        <Animation slideInView>
          Simplicity is the ultimate sophistication.
        </Animation>

        <Animation
          slideInView
          charByChar={false}
          className="mt-8 text-gray-600 text-sm md:text-base"
          delay={1}
        >
          — Leonardo da Vinci
        </Animation>
      </div>
    );
  }
```