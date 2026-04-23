"use client"

import { PopIn } from './pop-in';

export function PopInView() {
  return (
    <div className='text-center'>
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
