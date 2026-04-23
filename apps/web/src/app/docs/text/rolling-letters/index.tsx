"use client"

import { RollingLetters } from './rolling-letters';

export function RollingLettersView() {
  return (
    <div className='flex flex-col items-center justify-center gap-6 py-20'>
      <div className='text-center'>
        <RollingLetters
          delay={30}
          onAnimationComplete={() => { }}
          className="text-lg md:text-3xl font-medium text-neutral-500 italic"
        >
          &quot;Creativity is intelligence having fun.&quot;
        </RollingLetters>
        <div className="mt-2 text-sm text-neutral-400">
          - Albert Einstein
        </div>
      </div>
    </div>
  );
}
