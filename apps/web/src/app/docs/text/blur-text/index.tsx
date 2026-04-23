"use client"

import { BlurText } from './blur-text';

export function BlurTextView() {
    return (
      <div className='text-center'>
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
